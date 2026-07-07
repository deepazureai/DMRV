'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface SubmissionState {
  id: string
  status: 'draft' | 'submitted' | 'under-review' | 'verified' | 'approved' | 'registered'
  entityId: string
  projectId: string
  uploadedFiles: { name: string; type: string; size: number; uploadedAt: string }[]
  qualityScore: number
  exceptions: string[]
  verifierNotes: string
  verifierId?: string
  verifiedAt?: string
  regulatorNotes: string
  regulatorId?: string
  approvedAt?: string
  blockchainHash?: string
  registeredAt?: string
  cccAmount: number
  submittedAt?: string
}

export interface SubmissionContextType {
  submissions: SubmissionState[]
  createSubmission: (entityId: string, projectId: string) => SubmissionState
  updateSubmission: (id: string, updates: Partial<SubmissionState>) => void
  getSubmission: (id: string) => SubmissionState | undefined
  submitForReview: (id: string) => void
  verifySubmission: (id: string, notes: string, verifierId: string) => void
  approveSubmission: (id: string, notes: string, regulatorId: string, cccAmount: number) => void
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
        verifySubmission,
        approveSubmission,
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
