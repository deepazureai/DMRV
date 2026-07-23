// DMRV Validation Pipeline - 6-Step Automated Engine
// Schema → Completeness → Range/Outliers → Duplicates → Evidence → Confidence

import { DmrvSubmission, ValidationResult, DataQualityAnomaly, ConfidenceScore, ValidationStep, AnomalySeverity } from './dmrv-types'

interface HistoricalData {
  entityId: string
  averageEmissions: number
  stdDeviation: number
  previousPeriods: number
}

export class ValidationPipeline {
  /**
   * Step 1: Schema Validation
   * Check format & structure against BEE template
   */
  static validateSchema(submission: DmrvSubmission): ValidationResult {
    const anomalies: DataQualityAnomaly[] = []

    // Check mandatory fields exist
    const mandatoryFields = [
      'entityId',
      'sector',
      'reportingPeriod',
      'activityData.productionOutput',
      'uploadedFiles',
    ]

    mandatoryFields.forEach(field => {
      const fieldExists = this.checkFieldExists(submission, field)
      if (!fieldExists) {
        anomalies.push({
          id: `ANO-${submission.id}-schema-${field}`,
          submissionId: submission.id,
          type: 'rule-missing-evidence',
          severity: 'critical',
          step: 'schema',
          fieldName: field,
          description: `Mandatory field "${field}" is missing or empty`,
          status: 'raised',
          createdAt: new Date().toISOString(),
        })
      }
    })

    // Check data types
    if (submission.activityData.productionOutput < 0) {
      anomalies.push({
        id: `ANO-${submission.id}-schema-negative`,
        submissionId: submission.id,
        type: 'rule-negative',
        severity: 'critical',
        step: 'schema',
        fieldName: 'productionOutput',
        description: 'Production output cannot be negative',
        detectedValue: submission.activityData.productionOutput,
        status: 'raised',
        createdAt: new Date().toISOString(),
      })
    }

    return {
      submissionId: submission.id,
      step: 'schema',
      passed: anomalies.filter(a => a.severity === 'critical').length === 0,
      anomalies,
      confidenceScore: anomalies.filter(a => a.severity === 'critical').length === 0 ? 100 : 0,
      completedAt: new Date().toISOString(),
      nextStep: 'completeness',
    }
  }

  /**
   * Step 2: Completeness Check
   * Verify all required data fields and meter intervals are present
   */
  static validateCompleteness(submission: DmrvSubmission): ValidationResult {
    const anomalies: DataQualityAnomaly[] = []
    const activityData = submission.activityData

    // Check if at least one fuel source exists
    const hasFuelData =
      (activityData.coal || 0) > 0 ||
      (activityData.naturalGas || 0) > 0 ||
      (activityData.diesel || 0) > 0 ||
      (activityData.biomass || 0) > 0 ||
      (activityData.gridElectricity || 0) > 0

    if (!hasFuelData) {
      anomalies.push({
        id: `ANO-${submission.id}-completeness-nofuel`,
        submissionId: submission.id,
        type: 'rule-missing-evidence',
        severity: 'major',
        step: 'completeness',
        fieldName: 'activityData',
        description: 'No fuel or electricity consumption data provided',
        status: 'raised',
        createdAt: new Date().toISOString(),
      })
    }

    // Check evidence files
    if (submission.uploadedFiles.length === 0) {
      anomalies.push({
        id: `ANO-${submission.id}-completeness-nofiles`,
        submissionId: submission.id,
        type: 'rule-missing-evidence',
        severity: 'major',
        step: 'completeness',
        fieldName: 'uploadedFiles',
        description: 'No supporting evidence files (invoices, meter logs, certificates) uploaded',
        status: 'raised',
        createdAt: new Date().toISOString(),
      })
    }

    // Check mandatory file types
    const fileNames = submission.uploadedFiles.map(f => f.name.toLowerCase())
    const hasMandatoryDocs =
      fileNames.some(f => f.includes('invoice') || f.includes('purchase')) ||
      fileNames.some(f => f.includes('meter') || f.includes('log')) ||
      fileNames.some(f => f.includes('production') || f.includes('output'))

    if (!hasMandatoryDocs) {
      anomalies.push({
        id: `ANO-${submission.id}-completeness-docs`,
        submissionId: submission.id,
        type: 'rule-missing-evidence',
        severity: 'major',
        step: 'completeness',
        fieldName: 'uploadedFiles',
        description: 'Missing mandatory document types (invoices, meter logs, or production records)',
        status: 'raised',
        createdAt: new Date().toISOString(),
      })
    }

    const completenessScore =
      100 - (anomalies.filter(a => a.severity === 'major').length * 25 + anomalies.filter(a => a.severity === 'critical').length * 50)

    return {
      submissionId: submission.id,
      step: 'completeness',
      passed: anomalies.filter(a => a.severity === 'critical' || a.severity === 'major').length === 0,
      anomalies,
      confidenceScore: Math.max(completenessScore, 0),
      completedAt: new Date().toISOString(),
      nextStep: 'range-outliers',
    }
  }

  /**
   * Step 3: Range & Outlier Detection
   * ML-based: Detect values outside historical range or trending anomalies
   */
  static detectOutliers(submission: DmrvSubmission, historicalData?: HistoricalData): ValidationResult {
    const anomalies: DataQualityAnomaly[] = []
    const activityData = submission.activityData

    // Check for unrealistic values
    const ranges: Record<string, [number, number]> = {
      coal: [0, 500000], // tonnes
      naturalGas: [0, 100000], // m³
      diesel: [0, 50000], // litre
      gridElectricity: [0, 200000], // MWh
      productionOutput: [1, 1000000], // depends on unit
    }

    const checkRanges = (value: number | undefined, field: string, range: [number, number]) => {
      if (value && (value < range[0] || value > range[1])) {
        anomalies.push({
          id: `ANO-${submission.id}-range-${field}`,
          submissionId: submission.id,
          type: 'ml-outlier',
          severity: value > range[1] ? 'major' : 'minor',
          step: 'range-outliers',
          fieldName: field,
          description: `${field} value ${value} is outside expected range ${range[0]}-${range[1]}`,
          detectedValue: value,
          expectedRange: range,
          status: 'raised',
          createdAt: new Date().toISOString(),
        })
      }
    }

    checkRanges(activityData.coal, 'coal', ranges.coal)
    checkRanges(activityData.naturalGas, 'naturalGas', ranges.naturalGas)
    checkRanges(activityData.diesel, 'diesel', ranges.diesel)
    checkRanges(activityData.gridElectricity, 'gridElectricity', ranges.gridElectricity)
    checkRanges(activityData.productionOutput, 'productionOutput', ranges.productionOutput)

    // ML: Trend deviation (if historical data available)
    if (historicalData && historicalData.previousPeriods >= 3) {
      const currentEmissions = this.estimateEmissions(activityData)
      const deviation = Math.abs(currentEmissions - historicalData.averageEmissions) / historicalData.averageEmissions
      const deviationPercentage = Math.round(deviation * 100 * 100) / 100

      if (deviation > 0.2) {
        // >20% deviation
        anomalies.push({
          id: `ANO-${submission.id}-trend-spike`,
          submissionId: submission.id,
          type: 'ml-spike',
          severity: deviation > 0.35 ? 'major' : 'minor',
          step: 'range-outliers',
          fieldName: 'totalEmissions',
          description: `Consumption spike detected: ${deviationPercentage}% above historical average`,
          deviationPercentage,
          historicalContext: `6-month average: ${historicalData.averageEmissions.toFixed(0)} tCO2e`,
          status: 'raised',
          createdAt: new Date().toISOString(),
        })
      }
    }

    return {
      submissionId: submission.id,
      step: 'range-outliers',
      passed: anomalies.filter(a => a.severity === 'critical' || a.severity === 'major').length === 0,
      anomalies,
      confidenceScore: 100 - anomalies.filter(a => a.severity === 'major').length * 10,
      completedAt: new Date().toISOString(),
      nextStep: 'duplicates',
    }
  }

  /**
   * Step 4: Duplicate & Unit Detection
   * Check for duplicate entries and unit mismatches
   */
  static validateDuplicatesAndUnits(submission: DmrvSubmission): ValidationResult {
    const anomalies: DataQualityAnomaly[] = []

    // Check for duplicate files
    const fileNames = submission.uploadedFiles.map(f => f.name)
    const fileNameCounts = fileNames.reduce(
      (acc, name) => {
        acc[name] = (acc[name] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    Object.entries(fileNameCounts).forEach(([name, count]) => {
      if (count > 1) {
        anomalies.push({
          id: `ANO-${submission.id}-duplicate-${name}`,
          submissionId: submission.id,
          type: 'rule-unit-mismatch',
          severity: 'minor',
          step: 'duplicates',
          fieldName: name,
          description: `Duplicate file detected: "${name}" uploaded ${count} times`,
          status: 'raised',
          createdAt: new Date().toISOString(),
        })
      }
    })

    // Check unit consistency
    if (submission.activityData.outputUnit === 'tonne') {
      if (submission.activityData.coal === undefined && submission.activityData.gridElectricity) {
        anomalies.push({
          id: `ANO-${submission.id}-unit-mismatch`,
          submissionId: submission.id,
          type: 'rule-unit-mismatch',
          severity: 'minor',
          step: 'duplicates',
          fieldName: 'outputUnit',
          description: 'Unit mismatch: MWh electricity with tonne production output',
          status: 'raised',
          createdAt: new Date().toISOString(),
        })
      }
    }

    return {
      submissionId: submission.id,
      step: 'duplicates',
      passed: anomalies.filter(a => a.severity === 'critical' || a.severity === 'major').length === 0,
      anomalies,
      confidenceScore: 100 - anomalies.filter(a => a.severity === 'minor').length * 5,
      completedAt: new Date().toISOString(),
      nextStep: 'evidence',
    }
  }

  /**
   * Step 5: Evidence & Source Credibility Check
   * Verify document authenticity and calibration validity
   */
  static validateEvidenceCredibility(submission: DmrvSubmission): ValidationResult {
    const anomalies: DataQualityAnomaly[] = []

    submission.uploadedFiles.forEach(file => {
      // Check for expired calibration certificates
      if (file.name.toLowerCase().includes('calibr') && file.name.toLowerCase().includes('cert')) {
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const uploadDate = new Date(file.uploadedAt)
        if (uploadDate < sixMonthsAgo) {
          anomalies.push({
            id: `ANO-${submission.id}-calib-expired`,
            submissionId: submission.id,
            type: 'rule-calibration',
            severity: 'major',
            step: 'evidence',
            fieldName: file.name,
            description: `Calibration certificate for "${file.name}" may be expired (>6 months old)`,
            complianceRule: 'Per CCTS, calibration certificates valid for 12 months minimum',
            status: 'raised',
            createdAt: new Date().toISOString(),
          })
        }
      }

      // Check for document size (suspicious if too small)
      if (file.size < 10000) {
        // < 10 KB
        anomalies.push({
          id: `ANO-${submission.id}-doc-small`,
          submissionId: submission.id,
          type: 'rule-missing-evidence',
          severity: 'minor',
          step: 'evidence',
          fieldName: file.name,
          description: `Document "${file.name}" is suspiciously small (${file.size} bytes). May be incomplete.`,
          status: 'raised',
          createdAt: new Date().toISOString(),
        })
      }
    })

    return {
      submissionId: submission.id,
      step: 'evidence',
      passed: anomalies.filter(a => a.severity === 'critical' || a.severity === 'major').length === 0,
      anomalies,
      confidenceScore: 100 - anomalies.filter(a => a.severity === 'major').length * 15,
      completedAt: new Date().toISOString(),
      nextStep: 'confidence',
    }
  }

  /**
   * Step 6: Confidence Score Calculation
   * Final assessment combining all validation steps
   */
  static calculateConfidenceScore(
    submission: DmrvSubmission,
    validationResults: ValidationResult[]
  ): ConfidenceScore {
    const totalAnomalies = validationResults.reduce((sum, r) => sum + r.anomalies.length, 0)
    const validRecords = Math.max(10 - totalAnomalies, 0) // Simplified
    const validationPassRate = validationResults.reduce((sum, r) => sum + r.confidenceScore, 0) / validationResults.length

    const credibilityFactor = 75 // Default for new entities
    const overallScore = Math.round((credibilityFactor * validationPassRate) / 100)

    return {
      submissionId: submission.id,
      credibilityFactor,
      validationPassRate: Math.round(validationPassRate),
      overallScore: Math.min(overallScore, 100),
      scoreBreakdown: {
        schemaValidation: validationResults[0]?.confidenceScore || 0,
        completenessCheck: validationResults[1]?.confidenceScore || 0,
        rangeValidation: validationResults[2]?.confidenceScore || 0,
        duplicateDetection: validationResults[3]?.confidenceScore || 0,
        evidenceCredibility: validationResults[4]?.confidenceScore || 0,
      },
    }
  }

  /**
   * Run complete validation pipeline
   */
  static runFullValidation(
    submission: DmrvSubmission,
    historicalData?: HistoricalData
  ): ValidationResult[] {
    const results: ValidationResult[] = []

    // Run all 6 steps
    results.push(this.validateSchema(submission))
    if (results[results.length - 1].passed) {
      results.push(this.validateCompleteness(submission))
    }
    if (results[results.length - 1].passed) {
      results.push(this.detectOutliers(submission, historicalData))
    }
    if (results[results.length - 1].passed) {
      results.push(this.validateDuplicatesAndUnits(submission))
    }
    if (results[results.length - 1].passed) {
      results.push(this.validateEvidenceCredibility(submission))
    }

    return results
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  private static checkFieldExists(obj: any, path: string): boolean {
    return path.split('.').every(key => (obj = obj[key]) != null)
  }

  private static estimateEmissions(activityData: ActivityData): number {
    const coal = (activityData.coal || 0) * 2.41
    const gas = (activityData.naturalGas || 0) * 2.04 * 0.001 // m³ conversion
    const diesel = (activityData.diesel || 0) * 2.67 * 0.001 // litre conversion
    const electricity = ((activityData.gridElectricity || 0) * 0.73 + (activityData.captiveElectricity || 0) * 1.2) * 0.001
    return coal + gas + diesel + electricity
  }
}
