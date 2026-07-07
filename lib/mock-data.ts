// ICM Digital Trust Layer - Mock Data
// Comprehensive mock data for all 9 modules and 7 dashboards

export type PersonaType = 'entity' | 'bee-regulator' | 'verifier' | 'registry-operator' | 'sector-officer'

export interface User {
  id: string
  name: string
  email: string
  persona: PersonaType
  organization: string
  avatar?: string
}

export interface Entity {
  id: string
  name: string
  sector: string
  location: string
  registrationDate: string
  status: 'active' | 'pending' | 'suspended'
  certifications: string[]
  contact: {
    name: string
    email: string
    phone: string
  }
}

export interface Project {
  id: string
  entityId: string
  name: string
  description: string
  startDate: string
  endDate?: string
  status: 'planning' | 'active' | 'completed' | 'paused'
  methodology: string
  expectedCCCs: number
}

export interface Submission {
  id: string
  projectId: string
  entityId: string
  period: string
  submissionDate: string
  status: 'draft' | 'submitted' | 'under_review' | 'verified' | 'approved' | 'rejected'
  dataQualityScore: number
  exceptions: string[]
  cccEstimate: number
  verifierId?: string
  approvedBy?: string
}

export interface DataQualityIssue {
  id: string
  submissionId: string
  issueType: 'missing_data' | 'outlier' | 'inconsistency' | 'validation_error'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  resolved: boolean
  resolution?: string
}

export interface Evidence {
  id: string
  submissionId: string
  type: 'sensor_data' | 'document' | 'report' | 'certificate' | 'other'
  fileName: string
  uploadDate: string
  size: number
  verified: boolean
}

export interface BlockchainPacket {
  id: string
  submissionId: string
  entityId: string
  status: 'pending' | 'signed' | 'registered' | 'failed'
  cccAmount: number
  hash?: string
  registryTxHash?: string
  createdAt: string
  registeredAt?: string
}

// Mock Users
export const mockUsers: Record<PersonaType, User> = {
  entity: {
    id: 'user-001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@ecwl.in',
    persona: 'entity',
    organization: 'Eastern Cement Works Ltd',
    avatar: 'RK'
  },
  'bee-regulator': {
    id: 'user-002',
    name: 'Dr. Amelia Singh',
    email: 'amelia.singh@bee.gov.in',
    persona: 'bee-regulator',
    organization: 'Bureau of Energy Efficiency',
    avatar: 'AS'
  },
  verifier: {
    id: 'user-003',
    name: 'Michael Chen',
    email: 'michael.chen@verifier.com',
    persona: 'verifier',
    organization: 'Global Carbon Verification Ltd',
    avatar: 'MC'
  },
  'registry-operator': {
    id: 'user-004',
    name: 'Sarah Thompson',
    email: 'sarah@registry.carbon',
    persona: 'registry-operator',
    organization: 'International Carbon Registry',
    avatar: 'ST'
  },
  'sector-officer': {
    id: 'user-005',
    name: 'Priya Desai',
    email: 'priya.desai@sector.gov',
    persona: 'sector-officer',
    organization: 'Ministry of Environment',
    avatar: 'PD'
  }
}

// Mock Entities
export const mockEntities: Entity[] = [
  {
    id: 'entity-001',
    name: 'Eastern Cement Works Ltd',
    sector: 'cement',
    location: 'Odisha, India',
    registrationDate: '2023-05-15',
    status: 'active',
    certifications: ['ISO 14001', 'ISO 50001'],
    contact: {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@ecwl.in',
      phone: '+91-9876543210'
    }
  },
  {
    id: 'entity-002',
    name: 'Green Steel Manufacturing',
    sector: 'steel',
    location: 'Karnataka, India',
    registrationDate: '2023-08-20',
    status: 'active',
    certifications: ['ISO 14001'],
    contact: {
      name: 'Vikram Patel',
      email: 'vikram@greensteel.in',
      phone: '+91-9876543211'
    }
  },
  {
    id: 'entity-003',
    name: 'Sustainable Energy Solutions',
    sector: 'renewable_energy',
    location: 'Tamil Nadu, India',
    registrationDate: '2023-06-10',
    status: 'active',
    certifications: ['ISO 50001'],
    contact: {
      name: 'Anita Sharma',
      email: 'anita@sesolutions.in',
      phone: '+91-9876543212'
    }
  },
  {
    id: 'entity-004',
    name: 'Eco Chemicals Private Ltd',
    sector: 'chemicals',
    location: 'Maharashtra, India',
    registrationDate: '2024-01-05',
    status: 'pending',
    certifications: [],
    contact: {
      name: 'Suresh Menon',
      email: 'suresh@ecochemicals.in',
      phone: '+91-9876543213'
    }
  }
]

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    entityId: 'entity-001',
    name: 'ECWL Q1 FY2026-27 Offset Initiative',
    description: 'Energy efficiency improvements in kiln operations and raw material sourcing optimization',
    startDate: '2024-10-01',
    endDate: '2025-03-31',
    status: 'active',
    methodology: 'ACM0013 - Optimization of energy systems',
    expectedCCCs: 15500
  },
  {
    id: 'proj-002',
    entityId: 'entity-002',
    name: 'Steel Production Process Optimization',
    description: 'Blast furnace efficiency improvement and waste heat recovery',
    startDate: '2024-09-15',
    endDate: '2025-06-30',
    status: 'active',
    methodology: 'ACM0014 - Fuel switch',
    expectedCCCs: 22000
  },
  {
    id: 'proj-003',
    entityId: 'entity-003',
    name: 'Solar Farm Expansion Phase 2',
    description: 'Installation of 5MW solar capacity with battery storage',
    startDate: '2024-11-01',
    status: 'active',
    methodology: 'ACM0002 - Grid-connected renewable electricity generation',
    expectedCCCs: 8500
  }
]

// Mock Submissions - Golden Path
export const mockSubmissions: Submission[] = [
  {
    id: 'sub-001-golden',
    projectId: 'proj-001',
    entityId: 'entity-001',
    period: 'Q1 FY2026-27',
    submissionDate: '2025-01-15',
    status: 'verified',
    dataQualityScore: 87,
    exceptions: ['Minor sensor calibration variance', 'One day missing weather data'],
    cccEstimate: 14850,
    verifierId: 'user-003'
  },
  {
    id: 'sub-002',
    projectId: 'proj-002',
    entityId: 'entity-002',
    period: 'Q1 FY2026-27',
    submissionDate: '2025-01-18',
    status: 'under_review',
    dataQualityScore: 92,
    exceptions: [],
    cccEstimate: 21200,
    verifierId: 'user-003'
  },
  {
    id: 'sub-003',
    projectId: 'proj-003',
    entityId: 'entity-003',
    period: 'Q1 FY2026-27',
    submissionDate: '2025-01-20',
    status: 'submitted',
    dataQualityScore: 0,
    exceptions: [],
    cccEstimate: 8200
  },
  {
    id: 'sub-004',
    projectId: 'proj-001',
    entityId: 'entity-001',
    period: 'Q2 FY2026-27',
    submissionDate: '2025-02-10',
    status: 'draft',
    dataQualityScore: 0,
    exceptions: [],
    cccEstimate: 0
  }
]

// Mock Data Quality Issues
export const mockDataQualityIssues: DataQualityIssue[] = [
  {
    id: 'dqi-001',
    submissionId: 'sub-001-golden',
    issueType: 'validation_error',
    severity: 'low',
    description: 'Temperature sensor reading variance of 0.3°C on Day 8',
    resolved: true,
    resolution: 'Sensor recalibrated, data adjusted using validated historical correlation'
  },
  {
    id: 'dqi-002',
    submissionId: 'sub-001-golden',
    issueType: 'missing_data',
    severity: 'low',
    description: 'Weather data unavailable for January 8, 2025',
    resolved: true,
    resolution: 'Interpolated using adjacent day patterns and regional meteorological data'
  },
  {
    id: 'dqi-003',
    submissionId: 'sub-002',
    issueType: 'outlier',
    severity: 'medium',
    description: 'Energy consumption spike on January 15 - 12% above normal',
    resolved: false,
    resolution: undefined
  }
]

// Mock Evidence
export const mockEvidence: Evidence[] = [
  {
    id: 'ev-001',
    submissionId: 'sub-001-golden',
    type: 'sensor_data',
    fileName: 'ECWL_Q1_2026_27_hourly_readings.csv',
    uploadDate: '2025-01-15',
    size: 2400000,
    verified: true
  },
  {
    id: 'ev-002',
    submissionId: 'sub-001-golden',
    type: 'document',
    fileName: 'Project_Boundary_Documentation.pdf',
    uploadDate: '2025-01-15',
    size: 5200000,
    verified: true
  },
  {
    id: 'ev-003',
    submissionId: 'sub-001-golden',
    type: 'report',
    fileName: 'Third_Party_Audit_Report.pdf',
    uploadDate: '2025-01-16',
    size: 3100000,
    verified: true
  },
  {
    id: 'ev-004',
    submissionId: 'sub-001-golden',
    type: 'certificate',
    fileName: 'ISO_50001_Certification_2024.pdf',
    uploadDate: '2025-01-14',
    size: 1800000,
    verified: true
  }
]

// Mock Blockchain Packets
export const mockBlockchainPackets: BlockchainPacket[] = [
  {
    id: 'bp-001-golden',
    submissionId: 'sub-001-golden',
    entityId: 'entity-001',
    status: 'registered',
    cccAmount: 14850,
    hash: '0x8a9c4d2f7e1b3a9c4d2f7e1b3a9c4d2f7e1b3a9c4d2f7e1b3a9c4d2f',
    registryTxHash: '0x5f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d9c8b7a6f5e4d3c2b',
    createdAt: '2025-02-01',
    registeredAt: '2025-02-05'
  }
]

// Dashboard Statistics
export interface DashboardStats {
  totalEntities: number
  activeProjects: number
  pendingSubmissions: number
  verifiedCCCs: number
  registeredCCCs: number
  averageDataQuality: number
  totalExceptions: number
  blockedIssues: number
}

export const mockDashboardStats: DashboardStats = {
  totalEntities: 248,
  activeProjects: 684,
  pendingSubmissions: 157,
  verifiedCCCs: 2847500,
  registeredCCCs: 2105000,
  averageDataQuality: 81.5,
  totalExceptions: 342,
  blockedIssues: 28
}

// Module Workflow States
export type WorkflowState = 'pending' | 'in_progress' | 'completed' | 'blocked'

export interface ModuleWorkflow {
  moduleId: string
  moduleName: string
  status: WorkflowState
  progress: number
  currentStep: string
  nextStep?: string
}

export const mockModuleWorkflows: ModuleWorkflow[] = [
  { moduleId: 'm1', moduleName: 'Entity Onboarding', status: 'completed', progress: 100, currentStep: 'Verification Complete' },
  { moduleId: 'm2', moduleName: 'Project Registration', status: 'completed', progress: 100, currentStep: 'Project Registered' },
  { moduleId: 'm3', moduleName: 'Boundary Setup', status: 'completed', progress: 100, currentStep: 'Boundaries Defined' },
  { moduleId: 'm4', moduleName: 'Data Ingestion', status: 'in_progress', progress: 85, currentStep: 'Processing Submissions', nextStep: 'Quality Check' },
  { moduleId: 'm5', moduleName: 'Data Quality Review', status: 'in_progress', progress: 72, currentStep: 'Resolving Exceptions', nextStep: 'Verification' },
  { moduleId: 'm6', moduleName: 'Methodology Calc', status: 'completed', progress: 100, currentStep: 'CCC Calculated' },
  { moduleId: 'm7', moduleName: 'Evidence Mgmt', status: 'completed', progress: 100, currentStep: 'Documents Verified' },
  { moduleId: 'm8', moduleName: 'Verifier Review', status: 'completed', progress: 100, currentStep: 'Verification Approved' },
  { moduleId: 'm9', moduleName: 'BEE Approval', status: 'in_progress', progress: 50, currentStep: 'Awaiting Final Review', nextStep: 'Registry Write' }
]

// Lifecycle Ribbon Events
export interface LifecycleEvent {
  id: string
  timestamp: string
  status: string
  actor: string
  action: string
}

export const mockLifecycleEvents: LifecycleEvent[] = [
  { id: 'le-001', timestamp: '2025-01-15', status: 'submitted', actor: 'Rajesh Kumar (ECWL)', action: 'Submission created for Q1 FY2026-27' },
  { id: 'le-002', timestamp: '2025-01-16', status: 'submitted', actor: 'System', action: 'Initial data quality assessment: 87% - 2 exceptions identified' },
  { id: 'le-003', timestamp: '2025-01-18', status: 'under_review', actor: 'Michael Chen (Verifier)', action: 'Verifier assigned and review initiated' },
  { id: 'le-004', timestamp: '2025-01-25', status: 'verified', actor: 'Michael Chen (Verifier)', action: 'Verification completed - CCCs approved at 14,850' },
  { id: 'le-005', timestamp: '2025-02-01', status: 'approved', actor: 'System', action: 'BEE approval pending final review' },
  { id: 'le-006', timestamp: '2025-02-05', status: 'registered', actor: 'Sarah Thompson (Registry)', action: 'Blockchain packet registered - TxHash: 0x5f2e1d...' }
]

// Helper functions
export function getEntityById(id: string): Entity | undefined {
  return mockEntities.find(e => e.id === id)
}

export function getProjectsByEntityId(entityId: string): Project[] {
  return mockProjects.filter(p => p.entityId === entityId)
}

export function getSubmissionsByProjectId(projectId: string): Submission[] {
  return mockSubmissions.filter(s => s.projectId === projectId)
}

export function getIssuesBySubmissionId(submissionId: string): DataQualityIssue[] {
  return mockDataQualityIssues.filter(i => i.submissionId === submissionId)
}

export function getEvidenceBySubmissionId(submissionId: string): Evidence[] {
  return mockEvidence.filter(e => e.submissionId === submissionId)
}

export function getBlockchainPacketBySubmissionId(submissionId: string): BlockchainPacket | undefined {
  return mockBlockchainPackets.find(bp => bp.submissionId === submissionId)
}
