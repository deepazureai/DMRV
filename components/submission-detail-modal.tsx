'use client'

import React, { useState } from 'react'
import { X, Download, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubmissions } from '@/lib/submission-context'
import { useRole } from '@/lib/role-context'
import { DataPreviewViewer } from '@/components/data-preview-viewer'
import { VerifierReviewPanel } from '@/components/verifier-review-panel'
import { RegulatorApprovalPanel } from '@/components/regulator-approval-panel'
import { BlockchainRegistrationPanel } from '@/components/blockchain-registration-panel'

interface SubmissionDetailModalProps {
  submissionId: string
  onClose: () => void
}

export function SubmissionDetailModal({ submissionId, onClose }: SubmissionDetailModalProps) {
  const { getSubmission } = useSubmissions()
  const { currentRole } = useRole()
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'approval' | 'blockchain'>('overview')

  const submission = getSubmission(submissionId)

  if (!submission) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-card rounded-lg p-6">
          <p>Submission not found</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    )
  }

  const canReview = currentRole === 'verifier-auditor'
  const canApprove = currentRole === 'bee-regulator'
  const canRegister = currentRole === 'registry-operator'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">{submission.id}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Entity: {submission.entityId} • Project: {submission.projectId}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-muted/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
          >
            Overview
          </button>
          {(canReview || submission.status !== 'draft') && (
            <button
              onClick={() => setActiveTab('verification')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'verification' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              Verification
            </button>
          )}
          {(canApprove || submission.status === 'verified') && (
            <button
              onClick={() => setActiveTab('approval')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'approval' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              Approval
            </button>
          )}
          {(canRegister || submission.status === 'approved') && (
            <button
              onClick={() => setActiveTab('blockchain')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'blockchain' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              Blockchain
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status Bar */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <Badge className="mt-2 capitalize">{submission.status.replace('-', ' ')}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality Score</p>
                  <p className="text-3xl font-bold text-primary">{submission.qualityScore}%</p>
                </div>
              </div>

              {/* Files */}
              <div>
                <h3 className="font-semibold mb-3">Uploaded Files ({submission.uploadedFiles.length})</h3>
                <div className="space-y-2">
                  {submission.uploadedFiles.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No files uploaded</p>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground mb-3">Click the eye icon to preview sample data from each file</p>
                      <div className="space-y-2">
                        {submission.uploadedFiles.map((file, idx) => (
                          <DataPreviewViewer
                            key={idx}
                            fileName={file.name}
                            fileType={file.type}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold mb-3">Timeline</h3>
                <div className="space-y-2 text-sm">
                  {submission.submittedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Submitted on {new Date(submission.submittedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  {submission.verifiedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Verified on {new Date(submission.verifiedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  {submission.approvedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Approved on {new Date(submission.approvedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  {submission.registeredAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Registered on {new Date(submission.registeredAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <VerifierReviewPanel submission={submission} />
          )}

          {activeTab === 'approval' && (
            <RegulatorApprovalPanel submission={submission} />
          )}

          {activeTab === 'blockchain' && (
            <BlockchainRegistrationPanel submission={submission} />
          )}
        </div>
      </div>
    </div>
  )
}
