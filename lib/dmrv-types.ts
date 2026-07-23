// DMRV (Digital Monitoring, Reporting & Verification) - Indian Carbon Market
// Aligned with BEE framework, EU MRV standards, and CCTS compliance

import { ReactNode } from 'react'

// ============================================================================
// DOMAIN IDENTITIES & ROLES
// ============================================================================

export type DmrvRole = 'obligated-entity' | 'acva' | 'check-verifier' | 'bee-officer' | 'registry-operator'

export interface DmrvActor {
  id: string
  name: string
  role: DmrvRole
  organization: string
  email: string
  accreditationId?: string // For ACVA & Check-Verifiers (EU AVR equivalent)
  registeredAt?: string
}

// ============================================================================
// CALCULATION ENGINE - GHG EMISSION INTENSITY (GEI)
// ============================================================================

export interface ActivityData {
  // Fuel consumption (tonne)
  coal?: number
  naturalGas?: number
  diesel?: number
  biomass?: number
  
  // Electricity (MWh)
  gridElectricity?: number
  captiveElectricity?: number
  renewableElectricity?: number
  
  // Output (tonne or MWh)
  productionOutput: number
  outputUnit: 'tonne' | 'MWh' | 'other'
  
  period: string // YYYY-MM format (e.g., "2024-01")
  submittedAt: string
}

export interface EmissionFactor {
  code: string // e.g., "EF-COAL-v3.2"
  source: 'coal' | 'naturalGas' | 'diesel' | 'biomass' | 'gridElectricity' | 'renewableElectricity'
  value: number // kg CO2e per unit
  unit: string // per tonne or per MWh
  version: string // "v3.2" (BEE-approved versioned library)
  validFrom: string
  validUntil: string
  region: string // 'INDIA' or 'SECTOR_DEFAULT'
}

export interface GeiCalculation {
  id: string
  submissionId: string
  activityData: ActivityData
  
  // Formula: (Coal×EF_coal + Gas×EF_gas + ...) × Adjustments ÷ Output
  fuelEmissions: number // tCO2e
  electricityEmissions: number // tCO2e
  renewableAdjustment: number // deduction for renewable (zero-emission)
  totalEmissions: number // tCO2e
  
  gei: number // kg CO2e per tonne of output
  geiUnit: string // "kg CO2e/tonne"
  
  // EU ICAP Principles
  completenessPercentage: number // 0-100%
  consistencyScore: number // 0-100%
  accuracyScore: number // 0-100%
  
  // Baseline Comparison
  beeBaselineGei: number // BEE-notified baseline for sector/year
  baselineVersion: string // "2024-Q1"
  performanceStatus: 'over-performer' | 'under-performer' | 'baseline-met'
  
  // Credit Calculation
  cccSurplus?: number // For over-performers (positive)
  cccDeficit?: number // For under-performers (negative)
  
  calculatedAt: string
  validatedAt?: string
}

// ============================================================================
// VALIDATION PIPELINE - 6-STEP AUTOMATED ENGINE
// ============================================================================

export type ValidationStep = 'schema' | 'completeness' | 'range-outliers' | 'duplicates' | 'evidence' | 'confidence'
export type AnomalySeverity = 'critical' | 'major' | 'minor'
export type AnomalyType = 'ml-spike' | 'ml-trend' | 'ml-outlier' | 'rule-calibration' | 'rule-missing-evidence' | 'rule-negative' | 'rule-unit-mismatch'

export interface DataQualityAnomaly {
  id: string
  submissionId: string
  type: AnomalyType
  severity: AnomalySeverity // CRITICAL blocks submission, MAJOR requires CAR, MINOR is noted
  step: ValidationStep
  fieldName: string
  description: string
  detectedValue?: number | string
  expectedRange?: [number, number]
  
  // ML-specific
  deviationPercentage?: number // e.g., 25% above historical average
  historicalContext?: string // e.g., "25% spike vs. 6-month average"
  
  // Rule-specific
  complianceRule?: string // e.g., "Calibration expired >12 months"
  
  status: 'raised' | 'acknowledged' | 'resolved'
  severity_threshold?: number // e.g., ±5% for EU materiality
  
  createdAt: string
  resolvedAt?: string
}

export interface ValidationResult {
  submissionId: string
  step: ValidationStep
  passed: boolean
  anomalies: DataQualityAnomaly[]
  confidenceScore: number // 0-100%: (valid_records / total_records) × validation_passing_rate
  
  completedAt: string
  nextStep?: ValidationStep
}

export interface ConfidenceScore {
  submissionId: string
  credibilityFactor: number // Entity history (0-100%)
  validationPassRate: number // Records passing checks (0-100%)
  overallScore: number // (credibility × pass_rate) / 100
  scoreBreakdown: {
    schemaValidation: number
    completenessCheck: number
    rangeValidation: number
    duplicateDetection: number
    evidenceCredibility: number
  }
}

// ============================================================================
// SUBMISSION WORKFLOW
// ============================================================================

export type SubmissionStatus = 
  | 'draft' 
  | 'submitted' 
  | 'data-validation' 
  | 'acva-review' 
  | 'acva-queries' 
  | 'acva-verification-report' 
  | 'check-verification' 
  | 'bee-assessment' 
  | 'approved' 
  | 'rejected'
  | 'ccc-issued'

export interface DmrvSubmission {
  id: string // "SUB-2024-001"
  entityId: string
  sector: string // 'cement' | 'steel' | 'chemicals' | 'power' | 'textile'
  reportingPeriod: string // "2024-Q1" or "2024-01"
  
  // Raw Activity Data
  activityData: ActivityData
  
  // Calculated GEI
  geiCalculation?: GeiCalculation
  
  // Validation Pipeline
  validationResults: ValidationResult[]
  confidenceScore?: ConfidenceScore
  
  // Evidence Files
  uploadedFiles: {
    name: string
    type: string // invoice, meter-log, calibration-cert, lab-report, production-log, etc.
    documentType: 'mandatory' | 'supportive'
    url: string
    uploadedAt: string
    verified: boolean
  }[]
  
  // Workflow Status
  status: SubmissionStatus
  
  // Timestamps
  submittedAt?: string
  dataValidationCompletedAt?: string
  acvaAssignedAt?: string
  verificationReportIssuedAt?: string
  checkVerificationCompletedAt?: string
  beeApprovedAt?: string
  
  // Actors
  submittedBy: string // obligated-entity actor id
  assignedToAcva?: string // ACVA actor id
  checkVerifiedBy?: string // Check-Verifier actor id
  approvedBy?: string // BEE officer actor id
}

// ============================================================================
// QUERY & CAR (CORRECTIVE ACTION REQUEST) SYSTEM
// ============================================================================

export type QueryType = 'clarification' | 'document-request' | 'calculation-verification'
export type CarType = 'major' | 'minor' | 'observation'

export interface Query {
  id: string // "Q-2024-001"
  submissionId: string
  raisedBy: string // ACVA actor id
  
  type: QueryType
  title: string
  description: string
  fieldName?: string // if specific field
  raisedAt: string
  dueDate: string // 7 days per CCTS regulation
  
  responseNotes?: string
  respondedAt?: string
  respondedBy?: string // entity actor id
  
  status: 'open' | 'responded' | 'closed'
  acvaComment?: string // ACVA assessment of entity response
  closedAt?: string
}

export interface CAR {
  id: string // "CAR-2024-001"
  submissionId: string
  raisedBy: string // ACVA actor id
  
  type: CarType // per EU ETS Monitoring & Reporting Regulation
  title: string
  description: string
  nonConformity: string // specific requirement not met
  evidenceOfNonConformity: string // e.g., "Calculation error: ±7% vs materiality ±5%"
  
  raisedAt: string
  dueDate: string // 14 days per CCTS regulation
  
  correctionProposed?: string // Entity response
  revisedDataProvided?: boolean
  correctedSubmittedAt?: string
  
  status: 'open' | 'responded' | 'accepted' | 'rejected'
  acvaVerification?: string // ACVA re-verification notes
  verifiedAt?: string
  
  // EU compliance tracking
  materiality?: {
    threshold: number // ±5% per EU standards
    deviationFound: number
    withinThreshold: boolean
  }
}

export interface CommentThread {
  id: string
  queryId?: string
  carId?: string
  submissionId: string
  
  comments: {
    id: string
    author: DmrvActor
    authorRole: DmrvRole
    message: string
    timestamp: string
    isSystemMessage?: boolean // for status changes
  }[]
  
  lastActivityAt: string
}

// ============================================================================
// VERIFICATION REPORT (ACVA OUTPUT)
// ============================================================================

export interface VerificationReport {
  id: string // "VR-2024-001"
  submissionId: string
  issuedBy: string // ACVA actor id
  acvaName: string
  acvaAccreditationId: string
  
  reportDate: string
  verificationScope: string // "GHG Emission Intensity calculation per CCTS standards"
  
  // Findings
  anomaliesFound: DataQualityAnomaly[]
  queriessRaised: number
  carsRaised: number // Corrective Actions
  
  // Conclusion
  conclusion: 'verified' | 'conditionally-verified' | 'not-verified'
  verifiedGei: number
  verifiedCccAmount: number
  
  // EU Compliance Assessment
  euCompliance: {
    icapPrinciples: {
      completeness: 'pass' | 'fail'
      consistency: 'pass' | 'fail'
      accuracy: 'pass' | 'fail'
      transparency: 'pass' | 'fail'
    }
    materilityThreshold: 'pass' | 'fail' // ±5%
    validatorIndependence: 'pass' | 'fail'
    auditTrailComplete: 'pass' | 'fail'
  }
  
  recommendations: string
  issuedAt: string
}

// ============================================================================
// CHECK-VERIFICATION (Independent Secondary Review)
// ============================================================================

export interface CheckVerification {
  id: string
  submissionId: string
  verificationReportId: string
  checkedBy: string // Check-Verifier actor id
  
  acvaFindingsReviewed: string
  acvaConclusion: string
  
  // Independent Assessment
  confirmationResult: 'confirmed' | 'not-confirmed' | 'partially-confirmed'
  confirmationNotes: string
  
  // EU AVR (Accredited Verification Representative) Perspective
  complianceNote?: string
  auditTrailReviewed: boolean
  evidenceWalkthrough: boolean
  
  completedAt: string
}

// ============================================================================
// EU STANDARDS FRAMEWORK IN BEE
// ============================================================================

export interface EuStandardsProfile {
  name: string
  description: string
  applicableStandards: string[] // e.g., ["EU ETS MRR", "EU FQD", "ISO 14064"]
}

export const EU_STANDARDS_IN_BEE = {
  ICAP: {
    name: 'ICAP Principles (Completeness, Consistency, Accuracy, Precision)',
    enforced: true,
    validationStep: 'confidence',
    requirements: [
      'Complete data covering all material sources',
      'Consistent methodology across periods',
      'Accurate within ±5% materiality threshold',
      'Transparent calculation lineage'
    ]
  },
  MATERIALITY_THRESHOLD: {
    value: 5, // ±5%
    standard: 'EU ETS Monitoring & Reporting Regulation',
    application: 'Deviation from baseline or expected values'
  },
  VALIDATOR_INDEPENDENCE: {
    requirement: 'ACVA cannot be entity\'s regular auditor',
    verification: 'Check during ACVA assignment',
    standard: 'EU AVR (Accredited Verification Representative)'
  },
  DIGITAL_MRV: {
    features: [
      'Parallel validation (automated + manual)',
      'Immutable audit trail with timestamps',
      'Cryptographic hashing for data integrity',
      'Blockchain registration for final CCC issuance'
    ],
    standard: 'World Bank CMI dMRV framework adopted by BEE'
  }
}

export const SECTOR_SPECIFIC_BASELINES = {
  cement: {
    sector_name: 'Cement Manufacturing',
    gei_baseline_2024: 520, // kg CO2e per tonne of cement
    emission_sources: ['fuel', 'electricity', 'process-emissions'],
    output_unit: 'tonne'
  },
  steel: {
    sector_name: 'Steel Production',
    gei_baseline_2024: 1850, // kg CO2e per tonne of steel
    emission_sources: ['coal', 'coke', 'electricity'],
    output_unit: 'tonne'
  },
  chemicals: {
    sector_name: 'Chemicals Manufacturing',
    gei_baseline_2024: 450, // kg CO2e per tonne of product
    emission_sources: ['fuel', 'electricity', 'feedstock'],
    output_unit: 'tonne'
  },
  power: {
    sector_name: 'Power Generation',
    gei_baseline_2024: 0.65, // kg CO2e per kWh
    emission_sources: ['fuel'],
    output_unit: 'MWh'
  },
  textile: {
    sector_name: 'Textile Manufacturing',
    gei_baseline_2024: 2.8, // kg CO2e per metre of fabric
    emission_sources: ['fuel', 'electricity', 'steam'],
    output_unit: 'tonne'
  }
}
