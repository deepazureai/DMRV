// Anomaly Detection and Quality Analysis Utilities

export interface AnomalyResult {
  type: 'error' | 'warning' | 'info'
  message: string
  field: string
  recordIndex: number
  severity: 'critical' | 'high' | 'medium' | 'low'
}

export interface QualityMetrics {
  totalRecords: number
  validRecords: number
  recordsWithWarnings: number
  recordsWithErrors: number
  validPercentage: number
  warningPercentage: number
  errorPercentage: number
  anomalyCount: number
  quality: 'excellent' | 'good' | 'fair' | 'poor'
}

export interface RecordStatus {
  index: number
  status: 'valid' | 'warning' | 'error'
  anomalies: AnomalyResult[]
}

// Detect anomalies in carbon data records
export function detectAnomalies(records: any[]): AnomalyResult[] {
  const anomalies: AnomalyResult[] = []

  records.forEach((record, idx) => {
    // Check for missing required fields
    const requiredFields = ['facility_id', 'energy_source', 'consumption', 'emissions', 'credits']
    requiredFields.forEach(field => {
      if (!record[field] || record[field] === '') {
        anomalies.push({
          type: 'error',
          message: `Missing required field: ${field}`,
          field,
          recordIndex: idx,
          severity: 'critical',
        })
      }
    })

    // Check for invalid values
    const consumption = parseFloat(record.consumption)
    const emissions = parseFloat(record.emissions)
    const credits = parseFloat(record.credits)

    if (consumption < 0) {
      anomalies.push({
        type: 'error',
        message: 'Negative consumption value',
        field: 'consumption',
        recordIndex: idx,
        severity: 'high',
      })
    }

    if (emissions < 0) {
      anomalies.push({
        type: 'error',
        message: 'Negative emissions value',
        field: 'emissions',
        recordIndex: idx,
        severity: 'high',
      })
    }

    if (credits < 0) {
      anomalies.push({
        type: 'error',
        message: 'Negative carbon credits value',
        field: 'credits',
        recordIndex: idx,
        severity: 'high',
      })
    }

    // Detect outliers (values significantly different from average)
    if (consumption > 100000) {
      anomalies.push({
        type: 'warning',
        message: 'Unusually high consumption value (potential outlier)',
        field: 'consumption',
        recordIndex: idx,
        severity: 'medium',
      })
    }

    if (emissions > 50000) {
      anomalies.push({
        type: 'warning',
        message: 'Unusually high emissions value (potential outlier)',
        field: 'emissions',
        recordIndex: idx,
        severity: 'medium',
      })
    }

    // Check calculation consistency: credits should roughly equal emissions * 0.8
    const expectedCredits = emissions * 0.8
    const creditDeviation = Math.abs(credits - expectedCredits) / expectedCredits
    if (creditDeviation > 0.2 && !isNaN(expectedCredits)) {
      anomalies.push({
        type: 'warning',
        message: `Carbon credits calculation deviation detected (${(creditDeviation * 100).toFixed(1)}% off expected)`,
        field: 'credits',
        recordIndex: idx,
        severity: 'medium',
      })
    }

    // Check date format if present
    if (record.date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(record.date)) {
        anomalies.push({
          type: 'warning',
          message: 'Invalid date format (expected YYYY-MM-DD)',
          field: 'date',
          recordIndex: idx,
          severity: 'low',
        })
      }
    }
  })

  return anomalies
}

// Get record status based on anomalies
export function getRecordStatus(recordIndex: number, anomalies: AnomalyResult[]): RecordStatus {
  const recordAnomalies = anomalies.filter(a => a.recordIndex === recordIndex)

  if (recordAnomalies.length === 0) {
    return {
      index: recordIndex,
      status: 'valid',
      anomalies: [],
    }
  }

  const hasErrors = recordAnomalies.some(a => a.type === 'error')
  const status = hasErrors ? 'error' : 'warning'

  return {
    index: recordIndex,
    status,
    anomalies: recordAnomalies,
  }
}

// Calculate overall quality metrics
export function calculateQualityMetrics(records: any[]): QualityMetrics {
  const anomalies = detectAnomalies(records)

  // Get unique records with issues
  const recordsWithAnomalies = new Set(anomalies.map(a => a.recordIndex))
  const recordsWithErrors = new Set(anomalies.filter(a => a.type === 'error').map(a => a.recordIndex))
  const recordsWithWarnings = new Set(
    anomalies.filter(a => a.type === 'warning' && !recordsWithErrors.has(a.recordIndex)).map(a => a.recordIndex)
  )

  const validRecords = records.length - recordsWithAnomalies.size
  const totalRecords = records.length
  const warningsCount = recordsWithWarnings.size
  const errorsCount = recordsWithErrors.size

  const validPercentage = (validRecords / totalRecords) * 100
  const warningPercentage = (warningsCount / totalRecords) * 100
  const errorPercentage = (errorsCount / totalRecords) * 100

  // Determine quality level
  let quality: 'excellent' | 'good' | 'fair' | 'poor'
  if (errorPercentage === 0 && warningPercentage === 0) {
    quality = 'excellent'
  } else if (errorPercentage === 0 && warningPercentage < 10) {
    quality = 'good'
  } else if (errorPercentage < 5 && warningPercentage < 20) {
    quality = 'fair'
  } else {
    quality = 'poor'
  }

  return {
    totalRecords,
    validRecords,
    recordsWithWarnings: warningsCount,
    recordsWithErrors: errorsCount,
    validPercentage,
    warningPercentage,
    errorPercentage,
    anomalyCount: anomalies.length,
    quality,
  }
}

// Get severity color for UI
export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-900 border-red-300'
    case 'high':
      return 'bg-red-100 text-red-900 border-red-300'
    case 'medium':
      return 'bg-amber-100 text-amber-900 border-amber-300'
    case 'low':
      return 'bg-blue-100 text-blue-900 border-blue-300'
    default:
      return 'bg-gray-100 text-gray-900 border-gray-300'
  }
}

// Get quality color for UI
export function getQualityColor(quality: string): string {
  switch (quality) {
    case 'excellent':
      return 'bg-green-100 text-green-900'
    case 'good':
      return 'bg-emerald-100 text-emerald-900'
    case 'fair':
      return 'bg-yellow-100 text-yellow-900'
    case 'poor':
      return 'bg-red-100 text-red-900'
    default:
      return 'bg-gray-100 text-gray-900'
  }
}

// Get status badge color
export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'valid':
      return 'bg-green-100 text-green-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'error':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
