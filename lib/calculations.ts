export interface QualityScoreInputs {
  fileCount: number
  exceptionCount: number
  dataCompleteness: number // 0-100
  methodologyAlignment: number // 0-100
  evidenceQuality: number // 0-100
}

export function calculateQualityScore(inputs: QualityScoreInputs): number {
  const fileWeight = inputs.fileCount > 0 ? Math.min(20, inputs.fileCount * 5) : 0
  const exceptionPenalty = Math.min(20, inputs.exceptionCount * 3)
  const completenessScore = inputs.dataCompleteness * 0.2
  const methodologyScore = inputs.methodologyAlignment * 0.3
  const evidenceScore = inputs.evidenceQuality * 0.25

  let totalScore = fileWeight + completenessScore + methodologyScore + evidenceScore
  totalScore = Math.max(0, totalScore - exceptionPenalty)

  return Math.round(Math.min(100, Math.max(0, totalScore)))
}

export interface CCCCalculationInputs {
  emissionsReduction: number // in tonnes
  verificationFactor: number // 0.5-1.0 based on verification level
  qualityScore: number // 0-100
  projectType: 'renewable' | 'energy-efficiency' | 'waste-management' | 'forestry'
}

export function calculateCCCAmount(inputs: CCCCalculationInputs): number {
  const baseMultiplier: Record<string, number> = {
    renewable: 1.0,
    'energy-efficiency': 0.8,
    'waste-management': 0.6,
    forestry: 1.2,
  }

  const multiplier = baseMultiplier[inputs.projectType] || 1.0
  const qualityAdjustment = inputs.qualityScore / 100
  const cccAmount = inputs.emissionsReduction * multiplier * inputs.verificationFactor * qualityAdjustment

  return Math.round(cccAmount)
}

export function generateBlockchainHash(
  submissionId: string,
  cccAmount: number,
  timestamp: string
): string {
  const data = `${submissionId}-${cccAmount}-${timestamp}`
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  const hexHash = Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64)
  return `0x${hexHash}`
}

export function calculateEmissionsFromData(
  files: { name: string; type: string; size: number }[]
): number {
  // Mock calculation based on file sizes (in tonnes CO2)
  const totalSize = files.reduce((sum, f) => sum + f.size, 0)
  return Math.round((totalSize / 1024) * 0.5) // Simulates emissions calculation
}

export interface ValidationException {
  id: string
  type: 'data-missing' | 'inconsistency' | 'outlier' | 'missing-evidence'
  severity: 'critical' | 'major' | 'minor'
  description: string
  resolution?: string
}

export function validateSubmission(files: { name: string; type: string }[]): ValidationException[] {
  const exceptions: ValidationException[] = []
  const fileTypes = files.map(f => f.type.toLowerCase())

  if (!fileTypes.some(t => t.includes('csv'))) {
    exceptions.push({
      id: 'EXC-001',
      type: 'data-missing',
      severity: 'critical',
      description: 'Emissions data CSV file is required',
      resolution: 'Upload emissions_data.csv',
    })
  }

  if (!fileTypes.some(t => t.includes('json'))) {
    exceptions.push({
      id: 'EXC-002',
      type: 'data-missing',
      severity: 'major',
      description: 'Methodology metadata file is missing',
      resolution: 'Upload methodology.json',
    })
  }

  if (!fileTypes.some(t => t.includes('pdf'))) {
    exceptions.push({
      id: 'EXC-003',
      type: 'missing-evidence',
      severity: 'major',
      description: 'Supporting evidence documents required',
      resolution: 'Upload evidence_*.pdf files',
    })
  }

  // Mock random exceptions for testing
  if (Math.random() > 0.7) {
    exceptions.push({
      id: 'EXC-004',
      type: 'inconsistency',
      severity: 'minor',
      description: 'Data point Q2 shows 15% variance from Q1 - please verify',
      resolution: 'Review data and confirm accuracy',
    })
  }

  return exceptions
}

export function calculateMethodologyScore(
  methodologyType: string,
  emissionsData: number
): number {
  // Score based on methodology alignment
  const baseScore = 85
  const adjustments = {
    cdm: 10,
    'vcs-standard': 8,
    'iso-14064': 9,
    custom: -5,
  }

  return Math.min(100, baseScore + (adjustments[methodologyType as keyof typeof adjustments] || 0))
}

export interface VerificationReport {
  submissionId: string
  qualityScore: number
  verifiedEmissions: number
  verifiedCCCs: number
  exceptions: ValidationException[]
  recommendedApproval: boolean
  notes: string
}

export function generateVerificationReport(
  submissionId: string,
  qualityScore: number,
  emissions: number,
  exceptions: ValidationException[]
): VerificationReport {
  const criticalExceptions = exceptions.filter(e => e.severity === 'critical')
  const recommendedApproval = criticalExceptions.length === 0 && qualityScore >= 70

  return {
    submissionId,
    qualityScore,
    verifiedEmissions: Math.round(emissions * (qualityScore / 100)),
    verifiedCCCs: Math.round(emissions * (qualityScore / 100) * 1.0),
    exceptions,
    recommendedApproval,
    notes: recommendedApproval
      ? 'Submission meets all verification criteria. Recommend approval for CCC issuance.'
      : 'Please address identified exceptions before proceeding with approval.',
  }
}
