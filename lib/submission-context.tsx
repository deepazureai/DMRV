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

export function SubmissionProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<SubmissionState[]>([])

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
