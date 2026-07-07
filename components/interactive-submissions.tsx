'use client'

import React, { useState } from 'react'
import { Eye, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubmissions } from '@/lib/submission-context'
import { SubmissionWizard } from '@/components/submission-wizard'
import { SubmissionDetailModal } from '@/components/submission-detail-modal'
import { mockEntities, mockProjects } from '@/lib/mock-data'

export function InteractiveSubmissions() {
  const { submissions, createSubmission } = useSubmissions()
  const [showWizard, setShowWizard] = useState(false)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [wizardEntity] = useState(mockEntities[0])
  const [wizardProject] = useState(mockProjects[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800'
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'approved':
        return 'bg-purple-100 text-purple-800'
      case 'registered':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4" />
      case 'under-review':
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
        <h2 className="text-2xl font-bold">Submissions</h2>
        <Button onClick={() => setShowWizard(true)} className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Submission
        </Button>
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
          {submissions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border rounded-lg bg-muted/50">
              <p>No submissions yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {submissions.map(sub => (
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
                        <span className="ml-1 capitalize">{sub.status.replace('-', ' ')}</span>
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
