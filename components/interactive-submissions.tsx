'use client'

import React, { useState } from 'react'
import { Eye, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubmissions } from '@/lib/submission-context'
import { useRole } from '@/lib/role-context'
import { SubmissionWizard } from '@/components/submission-wizard'
import { SubmissionDetailModal } from '@/components/submission-detail-modal'
import { mockEntities, mockProjects } from '@/lib/mock-data'
import {
  getMySubmissions,
  getForVerifierReview,
  getForApproverReview,
  getForRegistryReview,
  getStatusColor,
  getStatusLabel,
} from '@/lib/submission-queue-filters'

type QueueTab = 'my-submissions' | 'for-verification' | 'for-approval' | 'for-registry'

export function InteractiveSubmissions() {
  const { submissions, createSubmission } = useSubmissions()
  const { currentRole } = useRole()
  const [showWizard, setShowWizard] = useState(false)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [activeQueue, setActiveQueue] = useState<QueueTab>('my-submissions')
  const [wizardEntity] = useState(mockEntities[0])
  const [wizardProject] = useState(mockProjects[0])

  const isSubmitter = currentRole === 'entity-submitter'
  const isVerifier = currentRole === 'verifier-auditor'
  const isApprover = currentRole === 'bee-regulator'
  const isRegistry = currentRole === 'registry-operator'

  // Filter submissions based on current role
  let displayedSubmissions = submissions
  let queueLabel = 'My Submissions'

  if (isSubmitter) {
    displayedSubmissions = getMySubmissions(submissions, wizardEntity.id)
    queueLabel = 'My Submissions'
  } else if (isVerifier) {
    displayedSubmissions = getForVerifierReview(submissions)
    queueLabel = 'For Verification'
  } else if (isApprover) {
    displayedSubmissions = getForApproverReview(submissions)
    queueLabel = 'For Approval'
  } else if (isRegistry) {
    displayedSubmissions = getForRegistryReview(submissions)
    queueLabel = 'For Registry'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
      case 'pending_verification':
      case 'pending_approval':
      case 'pending_registration':
        return <Clock className="w-4 h-4" />
      case 'verified':
      case 'approved':
      case 'registered':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{queueLabel}</h2>
        {isSubmitter && (
          <Button onClick={() => setShowWizard(true)} className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Submission
          </Button>
        )}
      </div>

      {showWizard ? (
        <SubmissionWizard
          entityId={wizardEntity.id}
          projectId={wizardProject.id}
          onSubmissionCreated={(id) => {
            setSelectedSubmissionId(id)
            setShowWizard(false)
          }}
          onCancel={() => setShowWizard(false)}
        />
      ) : (
        <div className="space-y-2">
          {displayedSubmissions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border rounded-lg bg-muted/50">
              <p>No {queueLabel.toLowerCase()} at the moment.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {displayedSubmissions.map(sub => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedSubmissionId(sub.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{sub.id}</h3>
                      <Badge className={`text-xs ${getStatusColor(sub.status)}`}>
                        {getStatusIcon(sub.status)}
                        <span className="ml-1">{getStatusLabel(sub.status)}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Entity: {sub.entityId} • Project: {sub.projectId} • Files: {sub.uploadedFiles.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">{sub.qualityScore}%</p>
                      <p className="text-xs text-muted-foreground">Quality</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedSubmissionId && (
        <SubmissionDetailModal
          submissionId={selectedSubmissionId}
          onClose={() => setSelectedSubmissionId(null)}
        />
      )}
    </div>
  )
}
