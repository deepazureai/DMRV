/**
 * DMRV Data Mapping - Source of Truth for All Metrics
 * Defines realistic user profiles, dashboard metrics, and page-specific data for each role
 */

export type UserRole = 'obligated-entity' | 'acva-verifier' | 'check-verifier' | 'bee-officer' | 'icm-registry'

export interface UserProfile {
  role: UserRole
  userId: string
  userName: string
  organization: string
  email: string
  domain: string
  avatar: string
  position: string
}

export const USER_PROFILES: Record<UserRole, UserProfile> = {
  'obligated-entity': {
    role: 'obligated-entity',
    userId: 'ECW-001',
    userName: 'Amit Singh',
    organization: 'Eastern Cement Works',
    email: 'amit.singh@ecwl.com',
    domain: 'CCTS Obligated Entity | GEI Reporting',
    avatar: 'AS',
    position: 'Carbon Compliance Manager',
  },
  'acva-verifier': {
    role: 'acva-verifier',
    userId: 'TUV-001',
    userName: 'Dr. Priya Sharma',
    organization: 'TUV-SUD India',
    email: 'priya.sharma@tuv-sud.in',
    domain: 'Accredited Carbon Verification Agency | dMRV Validation',
    avatar: 'PS',
    position: 'Senior Verification Engineer',
  },
  'check-verifier': {
    role: 'check-verifier',
    userId: 'BV-001',
    userName: 'Rajesh Kumar',
    organization: 'Bureau Veritas India',
    email: 'rajesh.kumar@bureauveritas.com',
    domain: 'Independent Check-Verification | ICAP Standards',
    avatar: 'RK',
    position: 'Lead Auditor',
  },
  'bee-officer': {
    role: 'bee-officer',
    userId: 'BEE-001',
    userName: 'Ms. Neha Patel',
    organization: 'Bureau of Energy Efficiency',
    email: 'neha.patel@bee.gov.in',
    domain: 'Bureau of Energy Efficiency | CCC Issuance & Regulatory Oversight',
    avatar: 'NP',
    position: 'Senior Regulatory Officer',
  },
  'icm-registry': {
    role: 'icm-registry',
    userId: 'ICM-001',
    userName: 'Vikram Desai',
    organization: 'Indian Carbon Market Registry',
    email: 'vikram.desai@icm.gov.in',
    domain: 'Indian Carbon Market | Blockchain Registration & Trading',
    avatar: 'VD',
    position: 'Ledger Operations Manager',
  },
}

/**
 * Dashboard Data Mapping
 * Realistic metrics for each role's dashboard
 */

export interface DashboardMetrics {
  role: UserRole
  title: string
  subtitle: string
  cards: Array<{
    label: string
    value: string | number
    description: string
    icon: string
  }>
}

export const DASHBOARD_METRICS: Record<UserRole, DashboardMetrics> = {
  'obligated-entity': {
    role: 'obligated-entity',
    title: 'GEI Submission & Verification Status',
    subtitle: 'Eastern Cement Works | 2024-Q1 Submission | Obligated Entity Portal',
    cards: [
      {
        label: 'Submission Status',
        value: 'VERIFIED',
        description: 'ACVA verified on 2024-03-28',
        icon: 'CheckCircle',
      },
      {
        label: 'Data Quality Score',
        value: '94%',
        description: 'Confidence: HIGH',
        icon: 'BarChart3',
      },
      {
        label: 'GEI Calculated',
        value: '1,361.84',
        description: 'kg CO2e/tonne',
        icon: 'Zap',
      },
      {
        label: 'Outstanding Queries',
        value: '0',
        description: 'All CARs resolved',
        icon: 'CheckCircle',
      },
    ],
  },

  'acva-verifier': {
    role: 'acva-verifier',
    title: 'Verification Workspace & Queue',
    subtitle: 'TUV-SUD India (ACVA) | Accredited Carbon Verification Agency',
    cards: [
      {
        label: 'CRITICAL - Blocked',
        value: 2,
        description: 'Immediate action required',
        icon: 'AlertCircle',
      },
      {
        label: 'MAJOR - In Review',
        value: 5,
        description: 'CAR deadline: 7 days',
        icon: 'Clock',
      },
      {
        label: 'MINOR - Noted',
        value: 3,
        description: 'Documented issues',
        icon: 'AlertCircle',
      },
      {
        label: 'Verified - Ready',
        value: 18,
        description: 'Awaiting check-verification',
        icon: 'CheckCircle',
      },
    ],
  },

  'check-verifier': {
    role: 'check-verifier',
    title: 'Independent Check-Verification & Audit',
    subtitle: 'Bureau Veritas (Check-Verifier) | ACVA Report Review | EU AVR Compliance',
    cards: [
      {
        label: 'Pending Review',
        value: 12,
        description: 'ACVA reports waiting',
        icon: 'Clock',
      },
      {
        label: 'Under Review',
        value: 5,
        description: 'In progress (avg 3 days)',
        icon: 'FileText',
      },
      {
        label: 'APPROVED',
        value: 34,
        description: 'Released to BEE officer',
        icon: 'CheckCircle',
      },
      {
        label: 'REJECTED/REFERRED',
        value: 2,
        description: 'Returned to ACVA',
        icon: 'AlertCircle',
      },
    ],
  },

  'bee-officer': {
    role: 'bee-officer',
    title: 'CCC Approval & Issuance Gateway',
    subtitle: 'Bureau of Energy Efficiency | Regulatory Approval & CCC Issuance',
    cards: [
      {
        label: 'Check-Verified',
        value: 28,
        description: 'Awaiting BEE approval',
        icon: 'FileText',
      },
      {
        label: 'CCCs Ready to Issue',
        value: '2.14M',
        description: 'From over-performers',
        icon: 'Zap',
      },
      {
        label: 'Approved & Issued',
        value: '18.7M',
        description: 'YTD 2024 (hash-registered)',
        icon: 'CheckCircle',
      },
      {
        label: 'Under-performer Deficit',
        value: '3.2M',
        description: 'Purchase requirements',
        icon: 'AlertCircle',
      },
    ],
  },

  'icm-registry': {
    role: 'icm-registry',
    title: 'Blockchain Ledger & Market Operations',
    subtitle: 'Indian Carbon Market (ICM) Registry | Distributed Ledger & Trading Platform',
    cards: [
      {
        label: 'From BEE (Pending)',
        value: '2.14M',
        description: 'Awaiting ledger registration',
        icon: 'Clock',
      },
      {
        label: 'Registered on Ledger',
        value: '18.7M',
        description: 'Hash-verified & immutable',
        icon: 'Lock',
      },
      {
        label: 'Active Market CCCs',
        value: '15.2M',
        description: 'Available for trading',
        icon: 'Zap',
      },
      {
        label: 'Banked (Carryover)',
        value: '3.5M',
        description: 'Compliance reserve',
        icon: 'BarChart3',
      },
    ],
  },
}

/**
 * Submission Data for each role
 */

export const SUBMISSION_DATA = {
  'obligated-entity': {
    currentSubmission: {
      id: 'ECW-2024-Q1',
      quarter: '2024-Q1',
      status: 'VERIFIED',
      submittedDate: '2024-02-15',
      verifiedDate: '2024-03-28',
      geiAchieved: 1361.84,
      geiBaseline: 1520,
      geiUnit: 'kg CO2e/tonne',
      energyConsumed: 152000,
      energyUnit: 'kWh',
      co2Emissions: 0,
      carbonCredits: 19288,
      dataQualityScore: 94,
      confidence: 'HIGH',
      performanceStatus: 'Over-performer',
    },
    historicalMetrics: {
      avgDataQuality: 91,
      avgGEI: 1389,
      totalCCCsEarned: 52144,
    },
    reviewComments: 0, // Will be updated by review context
  },

  'acva-verifier': {
    monthlyMetrics: {
      submissionsReceived: 28,
      verifiedPassed: 18,
      clearanceRate: 64,
      avgVerificationDays: 12,
      avgDataQuality: 88,
    },
    currentQueue: {
      critical: 2,
      major: 5,
      minor: 3,
      verified: 18,
    },
  },

  'check-verifier': {
    monthlyMetrics: {
      reportsReviewed: 28,
      approvalRate: 86,
      avgReviewDays: 4.2,
      materialityIssues: 1,
    },
    currentQueue: {
      pending: 12,
      underReview: 5,
      approved: 34,
      rejected: 2,
    },
  },

  'bee-officer': {
    issuancePipeline: {
      checkVerified: 28,
      cccsReadyToIssue: 2140000, // 2.14M
      approvedIssued: 18700000, // 18.7M YTD
      underperformerDeficit: 3200000, // 3.2M
    },
    sectorPerformance: {
      cement: { overPerformers: 48, totalEntities: 49, avgGeiDeviation: -8.2, cccsGenerated: 680000 },
      steel: { overPerformers: 18, totalEntities: 40, avgGeiDeviation: 15.3, cccsDeficit: 1200000 },
      power: { overPerformers: 31, totalEntities: 50, avgGeiDeviation: -3.8, cccsGenerated: 920000 },
    },
  },

  'icm-registry': {
    registrationPipeline: {
      fromBeePending: 2140000,
      registeredOnLedger: 18700000,
      activeMarket: 15200000,
      banked: 3500000,
    },
    ledgerMetrics: {
      hashVerificationStatus: '100%',
      reconciliationStatus: 'VERIFIED',
      totalTransactions: 8432,
      immutability: '100%',
    },
    tradingActivity: {
      complianceTransactions: 2108,
      bankingTransactions: 847,
      bankingVolume: 2800000,
      avgTradingPrice: 285,
      totalVolume: 3200000,
    },
  },
}

/**
 * Review Comments Severity Levels
 */
export enum ReviewCommentSeverity {
  CRITICAL = 'CRITICAL',
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  QUERY = 'QUERY',
  CAR = 'CAR',
}

/**
 * Review Comments Status
 */
export enum ReviewCommentStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
  IN_RESPONSE = 'IN_RESPONSE',
}

/**
 * Submission Status including resubmission workflow
 */
export enum SubmissionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  IN_VERIFICATION = 'IN_VERIFICATION',
  NEEDS_RESUBMISSION = 'NEEDS_RESUBMISSION',
  RESUBMITTED = 'RESUBMITTED',
  IN_RE_VERIFICATION = 'IN_RE_VERIFICATION',
  CHECK_VERIFICATION = 'CHECK_VERIFICATION',
  IN_CHECK_VERIFICATION = 'IN_CHECK_VERIFICATION',
  VERIFIED = 'VERIFIED',
  AWAITING_APPROVAL = 'AWAITING_APPROVAL',
  APPROVED = 'APPROVED',
  REGISTERED = 'REGISTERED',
}
