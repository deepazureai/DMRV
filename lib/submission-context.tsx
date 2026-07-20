'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type SubmissionStatus =
  | 'draft'
  | 'submitted'
  | 'pending_verification'
  | 'verification_requested_corrections'
  | 'verified'
  | 'verification_rejected'
  | 'pending_approval'
  | 'approval_requested_corrections'
  | 'approved'
  | 'approval_rejected'
  | 'pending_registration'
  | 'registered'
  | 'registration_failed'

export interface SubmissionState {
  id: string
  status: SubmissionStatus
  entityId: string
  projectId: string
  uploadedFiles: { name: string; type: string; size: number; uploadedAt: string }[]
  qualityScore: number
  exceptions: string[]
  verifierNotes: string
  verifierId?: string
  verifiedAt?: string
  rejectionReason?: string
  regulatorNotes: string
  regulatorId?: string
  approvedAt?: string
  blockchainHash?: string
  registeredAt?: string
  cccAmount: number
  submittedAt?: string
  rejectedAt?: string
  rejectedBy?: string
  rejectionMessage?: string
}

export interface SubmissionContextType {
  submissions: SubmissionState[]
  createSubmission: (entityId: string, projectId: string) => SubmissionState
  updateSubmission: (id: string, updates: Partial<SubmissionState>) => void
  getSubmission: (id: string) => SubmissionState | undefined
  submitForReview: (id: string) => void
  moveToVerification: (id: string) => void
  moveToApproval: (id: string) => void
  moveToRegistration: (id: string) => void
  verifySubmission: (id: string, notes: string, verifierId: string) => void
  requestVerificationCorrections: (id: string, reason: string, verifierId: string) => void
  rejectVerification: (id: string, reason: string, verifierId: string) => void
  approveSubmission: (id: string, notes: string, regulatorId: string, cccAmount: number) => void
  requestApprovalCorrections: (id: string, reason: string, regulatorId: string) => void
  rejectApproval: (id: string, reason: string, regulatorId: string) => void
  approveSubmissionToBlockchain: (id: string) => void
  registerOnBlockchain: (id: string) => void
  uploadFiles: (id: string, files: { name: string; type: string; size: number }[]) => void
  calculateQualityScore: (id: string) => void
  getExceptions: (id: string) => string[]
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined)

// Mock submissions for testing
const MOCK_SUBMISSIONS: SubmissionState[] = [
  {
    id: 'SUB-2024001',
    status: 'pending_verification',
    entityId: 'ECWL-001',
    projectId: 'PROJ-SOLAR-A',
    uploadedFiles: [
      { name: 'carbon_data_2024_q1.xlsx', type: 'application/vnd.ms-excel', size: 245000, uploadedAt: '2024-01-15T10:30:00Z' },
      { name: 'energy_records.pdf', type: 'application/pdf', size: 512000, uploadedAt: '2024-01-15T10:31:00Z' },
    ],
    qualityScore: 87,
    exceptions: [],
    verifierNotes: '',
    regulatorNotes: '',
    cccAmount: 100000,
  },
  {
    id: 'SUB-2024002',
    status: 'pending_verification',
    entityId: 'ECWL-002',
    projectId: 'PROJ-WIND-B',
    uploadedFiles: [
      { name: 'wind_farm_emissions.xlsx', type: 'application/vnd.ms-excel', size: 180000, uploadedAt: '2024-01-14T14:20:00Z' },
    ],
    qualityScore: 92,
    exceptions: [],
    verifierNotes: '',
    regulatorNotes: '',
    cccAmount: 85000,
  },
  {
    id: 'SUB-2024003',
    status: 'verified',
    entityId: 'ECWL-003',
    projectId: 'PROJ-HYDRO-C',
    uploadedFiles: [
      { name: 'hydro_carbon_data.xlsx', type: 'application/vnd.ms-excel', size: 156000, uploadedAt: '2024-01-13T09:15:00Z' },
    ],
    qualityScore: 95,
    exceptions: [],
    verifierNotes: 'All data validated. No anomalies detected. Ready for approval.',
    verifierId: 'verifier-1',
    verifiedAt: '2024-01-15T16:45:00Z',
    regulatorNotes: '',
    cccAmount: 120000,
  },
  {
    id: 'SUB-2024004',
    status: 'pending_approval',
    entityId: 'ECWL-004',
    projectId: 'PROJ-FACTORY-D',
    uploadedFiles: [
      { name: 'factory_emissions_2024.xlsx', type: 'application/vnd.ms-excel', size: 298000, uploadedAt: '2024-01-12T11:45:00Z' },
      { name: 'methodology.pdf', type: 'application/pdf', size: 450000, uploadedAt: '2024-01-12T11:46:00Z' },
    ],
    qualityScore: 88,
    exceptions: [],
    verifierNotes: 'Data quality excellent. Calculations verified. Ready for regulatory approval.',
    verifierId: 'verifier-1',
    verifiedAt: '2024-01-14T15:30:00Z',
    regulatorNotes: '',
    cccAmount: 145000,
  },
  {
    id: 'SUB-2024005',
    status: 'pending_approval',
    entityId: 'ECWL-005',
    projectId: 'PROJ-RENEWABLE-E',
    uploadedFiles: [
      { name: 'renewable_energy_data.xlsx', type: 'application/vnd.ms-excel', size: 215000, uploadedAt: '2024-01-11T13:20:00Z' },
    ],
    qualityScore: 91,
    exceptions: [],
    verifierNotes: 'All anomalies reviewed and accepted. Methodology compliant. Approved for final step.',
    verifierId: 'verifier-2',
    verifiedAt: '2024-01-13T14:00:00Z',
    regulatorNotes: '',
    cccAmount: 105000,
  },
]

export function SubmissionProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<SubmissionState[]>(MOCK_SUBMISSIONS)

  const createSubmission = (entityId: string, projectId: string): SubmissionState => {
    const newSubmission: SubmissionState = {
      id: `SUB-${Date.now()}`,
      status: 'draft',
      entityId,
      projectId,
      uploadedFiles: [],
      qualityScore: 0,
      exceptions: [],
      verifierNotes: '',
      regulatorNotes: '',
      cccAmount: 0,
    }
    setSubmissions(prev => [...prev, newSubmission])
    return newSubmission
  }

  const uploadFiles = (id: string, files: { name: string; type: string; size: number }[]) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              uploadedFiles: [
                ...sub.uploadedFiles,
                ...files.map(f => ({ ...f, uploadedAt: new Date().toISOString() })),
              ],
            }
          : sub
      )
    )
  }

  const submitForReview = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'submitted',
              submittedAt: new Date().toISOString(),
            }
          : sub
      )
    )
  }

  const moveToVerification = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'pending_verification',
            }
          : sub
      )
    )
  }

  const moveToApproval = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'pending_approval',
            }
          : sub
      )
    )
  }

  const moveToRegistration = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'pending_registration',
            }
          : sub
      )
    )
  }

  const requestVerificationCorrections = (
    id: string,
    reason: string,
    verifierId: string
  ) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'verification_requested_corrections',
              verifierNotes: reason,
              verifierId,
            }
          : sub
      )
    )
  }

  const rejectVerification = (
    id: string,
    reason: string,
    verifierId: string
  ) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'verification_rejected',
              rejectionReason: reason,
              rejectedBy: verifierId,
              rejectedAt: new Date().toISOString(),
            }
          : sub
      )
    )
  }

  const requestApprovalCorrections = (
    id: string,
    reason: string,
    regulatorId: string
  ) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'approval_requested_corrections',
              regulatorNotes: reason,
              regulatorId,
            }
          : sub
      )
    )
  }

  const rejectApproval = (
    id: string,
    reason: string,
    regulatorId: string
  ) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'approval_rejected',
              rejectionMessage: reason,
              rejectedBy: regulatorId,
              rejectedAt: new Date().toISOString(),
            }
          : sub
      )
    )
  }

  const calculateQualityScore = (id: string) => {
    const submission = submissions.find(s => s.id === id)
    if (!submission) return

    let score = 100
    if (submission.uploadedFiles.length === 0) score -= 20
    if (submission.exceptions.length > 0) score -= submission.exceptions.length * 5
    score = Math.max(0, Math.min(100, score))

    setSubmissions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, qualityScore: score } : sub))
    )
  }

  const getExceptions = (id: string): string[] => {
    const submission = submissions.find(s => s.id === id)
    return submission?.exceptions || []
  }

  const verifySubmission = (id: string, notes: string, verifierId: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'verified',
              verifierNotes: notes,
              verifierId,
              verifiedAt: new Date().toISOString(),
            }
          : sub
      )
    )
  }

  const approveSubmissionToBlockchain = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'pending_registration',
            }
          : sub
      )
    )
  }

  const approveSubmission = (
    id: string,
    notes: string,
    regulatorId: string,
    cccAmount: number
  ) => {
    const blockchainHash = generateBlockchainHash(id)
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'approved',
              regulatorNotes: notes,
              regulatorId,
              approvedAt: new Date().toISOString(),
              cccAmount,
              blockchainHash,
            }
          : sub
      )
    )
  }

  const registerOnBlockchain = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? {
              ...sub,
              status: 'registered',
              blockchainHash: sub.blockchainHash || generateBlockchainHash(id),
              registeredAt: new Date().toISOString(),
            }
          : sub
      )
    )
  }

  const updateSubmission = (id: string, updates: Partial<SubmissionState>) => {
    setSubmissions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, ...updates } : sub))
    )
  }

  const getSubmission = (id: string) => {
    return submissions.find(s => s.id === id)
  }

  return (
    <SubmissionContext.Provider
      value={{
        submissions,
        createSubmission,
        updateSubmission,
        getSubmission,
        submitForReview,
        moveToVerification,
        moveToApproval,
        moveToRegistration,
        verifySubmission,
        requestVerificationCorrections,
        rejectVerification,
        approveSubmission,
        requestApprovalCorrections,
        rejectApproval,
        approveSubmissionToBlockchain,
        registerOnBlockchain,
        uploadFiles,
        calculateQualityScore,
        getExceptions,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  )
}

export function useSubmissions() {
  const context = useContext(SubmissionContext)
  if (!context) {
    throw new Error('useSubmissions must be used within SubmissionProvider')
  }
  return context
}

function generateBlockchainHash(id: string): string {
  const timestamp = Date.now()
  const randomPart = Math.random().toString(36).substring(2, 15)
  const hash = `0x${btoa(`${id}-${timestamp}-${randomPart}`).substring(0, 64)}`
  return hash
}
