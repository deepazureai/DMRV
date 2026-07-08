'use client'

import React, { useState } from 'react'
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { useSubmissions, SubmissionState } from '@/lib/submission-context'
import { RegulatorApprovalPanel } from '@/components/regulator-approval-panel'

export function ApprovalsQueuePage() {
  const { submissions } = useSubmissions()
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionState | null>(null)
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null)

  // Separate submissions by status
  const pendingApprovals = submissions.filter(s => s.status === 'verified')
  const readyForRegistry = submissions.filter(s => s.status === 'approved')

  const handleApproveSubmission = (submissionId: string) => {
    // This would be handled by the modal's onConfirm callback
    // which calls approveSubmission from context
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">BEE Approval Queue</h1>
        <p className="text-muted-foreground">Review and approve verified submissions for blockchain registry</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-1">Pending Approvals</p>
              <p className="text-4xl font-bold text-amber-900">{pendingApprovals.length}</p>
              <p className="text-xs text-amber-700 mt-2">Awaiting regulatory approval</p>
            </div>
            <AlertCircle className="w-8 h-8 text-amber-600 opacity-20" />
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium mb-1">Ready for Registry</p>
              <p className="text-4xl font-bold text-green-900">{readyForRegistry.length}</p>
              <p className="text-xs text-green-700 mt-2">Ready for blockchain registration</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Pending Approvals Section */}
      {pendingApprovals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Submissions Awaiting Approval
          </h2>

          <div className="space-y-3">
            {pendingApprovals.map((submission) => (
              <div key={submission.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Submission Card Header */}
                <button
                  onClick={() => setExpandedSubmission(expandedSubmission === submission.id ? null : submission.id)}
                  className="w-full text-left p-4 bg-card hover:bg-muted/50 transition-colors border-b flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-lg">{submission.projectName || 'Unnamed Project'}</p>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        Ready for Approval
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Status: verified</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                    <p className="font-semibold">{submission.submittedDate || new Date().toLocaleDateString()}</p>
                  </div>
                </button>

                {/* Submission Details - Grid Layout */}
                <div className="p-4 bg-muted/30 grid grid-cols-4 gap-4 border-b">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Data Quality</p>
                    <p className="text-2xl font-bold">{submission.qualityScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">CCCs</p>
                    <p className="text-2xl font-bold text-green-600">14,850</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Records</p>
                    <p className="text-2xl font-bold">{submission.uploadedFiles.length * 10}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Files</p>
                    <p className="text-2xl font-bold">{submission.uploadedFiles.length}</p>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedSubmission === submission.id && (
                  <div className="p-6 bg-background">
                    <RegulatorApprovalPanel submission={submission} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ready for Registry Section */}
      {readyForRegistry.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Ready for Blockchain Registry
          </h2>

          <div className="space-y-3">
            {readyForRegistry.map((submission) => (
              <div key={submission.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{submission.projectName || 'Unnamed Project'}</p>
                    <p className="text-sm text-green-700 mt-1">Status: approved</p>
                    <div className="mt-3 grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-green-600 font-medium">Data Quality</p>
                        <p className="text-lg font-bold">{submission.qualityScore}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">CCCs</p>
                        <p className="text-lg font-bold">14,850</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">Approved Date</p>
                        <p className="text-lg font-bold">{submission.approvedDate || new Date().toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">Hash</p>
                        <p className="text-xs font-mono text-green-900 truncate">4a7b9c2d...</p>
                      </div>
                    </div>
                  </div>
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {pendingApprovals.length === 0 && readyForRegistry.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-1">No submissions to review</p>
          <p className="text-sm text-muted-foreground">Verified submissions will appear here for approval</p>
        </div>
      )}
    </div>
  )
}
