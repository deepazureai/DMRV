'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { ReviewCommentsEditor } from '@/components/review-comments-editor'
import { ReviewComment, generateAutoReviewComments } from '@/lib/review-comments-schema'
import { useRole } from '@/lib/role-context'
import { AlertCircle, CheckCircle, Send, Settings } from 'lucide-react'

export default function ReviewCommentsPage() {
  const { currentRole, userName, userOrganization } = useRole()
  const [submissionId] = useState('ECW-2024-Q1')
  const [entityName] = useState('Eastern Cement Works')
  const [autoComments, setAutoComments] = useState<ReviewComment[]>(() =>
    generateAutoReviewComments(submissionId, entityName)
  )
  const [showPublishConfirm, setShowPublishConfirm] = useState(false)
  const [commentsSent, setCommentsSent] = useState(false)

  // Only allow reviewers to access this
  if (currentRole !== 'acva-verifier' && currentRole !== 'check-verifier' && currentRole !== 'bee-officer') {
    return (
      <AppShell currentPage="review-comments">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-600" size={24} />
              <div>
                <h3 className="font-semibold text-red-900">Access Denied</h3>
                <p className="text-sm text-red-700 mt-1">
                  Only ACVA Verifiers, Check-Verifiers, and BEE Officers can access this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  const handlePublishComments = () => {
    setCommentsSent(true)
    // In real app, this would send comments to entity
    setTimeout(() => {
      setShowPublishConfirm(false)
    }, 1000)
  }

  const pendingCount = autoComments.filter(c => c.resolutionStatus === 'OPEN').length
  const actionRequiredCount = autoComments.filter(c => c.actionRequired).length

  return (
    <AppShell currentPage="review-comments">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Review Comments Generation & Management</h1>
            <p className="text-muted-foreground mt-2">
              {currentRole === 'acva-verifier'
                ? 'ACVA dMRV Validation & Verification Review'
                : currentRole === 'check-verifier'
                  ? 'Independent Check-Verification Review'
                  : 'BEE Officer Approval Review'}
            </p>
          </div>

          {/* Submission Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <p className="text-xs text-muted-foreground font-semibold mb-1">SUBMISSION ID</p>
              <p className="text-lg font-semibold text-foreground">{submissionId}</p>
              <p className="text-xs text-muted-foreground mt-2">{entityName}</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <p className="text-xs text-muted-foreground font-semibold mb-1">YOUR ROLE</p>
              <p className="text-lg font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground mt-2">{userOrganization}</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <p className="text-xs text-muted-foreground font-semibold mb-1">COMMENTS STATUS</p>
              <p className="text-lg font-semibold text-amber-600">{pendingCount} Pending</p>
              <p className="text-xs text-muted-foreground mt-2">{actionRequiredCount} action items</p>
            </div>
          </div>

          {/* Info Box: How Auto-Generated Comments Work */}
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <Settings size={20} className="text-blue-600 mt-0.5" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">About Auto-Generated Review Comments</h3>
                <p className="text-sm text-blue-800 mt-1">
                  The system has automatically generated review comments based on dMRV validation results (ML analysis,
                  rule-based checks, and data quality assessment). These comments cover all validation aspects:
                </p>
                <ul className="text-sm text-blue-800 mt-2 ml-4 space-y-1 list-disc">
                  <li>Data schema and completeness validation</li>
                  <li>Quality scoring and confidence assessment</li>
                  <li>ML-detected anomalies and outliers</li>
                  <li>Evidence and documentation review</li>
                  <li>Baseline and GEI consistency checks</li>
                  <li>Duplicate detection and reconciliation</li>
                  <li>ICAP principles compliance</li>
                </ul>
                <p className="text-sm text-blue-800 mt-3">
                  <strong>You can:</strong> Modify, delete, or add comments before sending to the entity. Comments will be
                  sent with modification history for audit trail.
                </p>
              </div>
            </div>
          </div>

          {/* Review Comments Editor */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <ReviewCommentsEditor
              comments={autoComments}
              onCommentsChange={setAutoComments}
              readOnly={false}
              entityName={entityName}
            />
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: 'Total Comments',
                value: autoComments.length,
                icon: CheckCircle,
              },
              {
                label: 'Auto-Generated',
                value: autoComments.filter(c => c.isAutoGenerated).length,
                icon: Settings,
              },
              {
                label: 'Action Required',
                value: actionRequiredCount,
                icon: AlertCircle,
              },
              {
                label: 'Critical Issues',
                value: autoComments.filter(c => c.severity === 'CRITICAL').length,
                icon: AlertCircle,
              },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="border border-border rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className="text-primary" />
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowPublishConfirm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors"
            >
              <Send size={18} />
              Send Review Comments to {entityName}
            </button>
            <button className="px-6 py-3 border border-input rounded-lg hover:bg-muted font-semibold transition-colors text-foreground">
              Save as Draft
            </button>
          </div>

          {/* Publish Confirmation Dialog */}
          {showPublishConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg p-6 max-w-md border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Send Review Comments</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You are about to send {autoComments.length} review comments to {entityName} ({submissionId}).
                </p>
                <div className="bg-muted rounded p-3 mb-4 text-sm">
                  <p className="font-semibold text-foreground mb-2">Comments Summary:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>
                      • <span className="text-red-600 font-semibold">{autoComments.filter(c => c.severity === 'CRITICAL').length}</span> CRITICAL
                      issues
                    </li>
                    <li>
                      • <span className="text-amber-600 font-semibold">{autoComments.filter(c => c.severity === 'MAJOR').length}</span> MAJOR
                      issues
                    </li>
                    <li>
                      • <span className="text-yellow-600 font-semibold">{autoComments.filter(c => c.severity === 'MINOR').length}</span> MINOR
                      issues
                    </li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Submission status will change to "Needs Resubmission". {entityName} will receive these comments and have 14 days to respond.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handlePublishComments}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold"
                  >
                    Confirm & Send
                  </button>
                  <button
                    onClick={() => setShowPublishConfirm(false)}
                    className="flex-1 px-4 py-2 border border-input rounded-lg hover:bg-muted font-semibold text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {commentsSent && (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold text-green-900">Review Comments Sent Successfully</h3>
                  <p className="text-sm text-green-700 mt-1">
                    {autoComments.length} review comments have been sent to {entityName}. Submission status changed to "Needs
                    Resubmission". Entity has 14 days to address all action items.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
