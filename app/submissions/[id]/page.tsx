'use client'

import React, { useState, useEffect } from 'react'
import { useRole } from '@/lib/role-context'
import { AppShell } from '@/components/app-shell'
import { mockLifecycleEvents } from '@/lib/mock-data'
import { ArrowLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AcvaReviewEditor } from '@/components/acva-review-editor'
import { generateAutoReviewComments, ReviewComment } from '@/lib/review-comments-schema'

interface SubmissionDetail {
  id: string
  submitterName: string
  entity: string
  submissionDate: string
  quarter: string
  status: 'submitted' | 'in-review' | 'verified' | 'rejected'
  dataQualityScore: number
  recordCount: number
  totalCarbonCredits: number
  gei: string
  description: string
}

// Mock submission data
const mockSubmissions: Record<string, SubmissionDetail> = {
  'SUB-2024-Q1-ECW': {
    id: 'SUB-2024-Q1-ECW',
    submitterName: 'Amit Singh',
    entity: 'Eastern Cement Works',
    submissionDate: '2024-03-28',
    quarter: 'Q1 2024',
    status: 'submitted',
    dataQualityScore: 94,
    recordCount: 90,
    totalCarbonCredits: 19288,
    gei: '1,361.84 kg CO2e/tonne',
    description:
      'Quarterly submission for cement production facility. Includes coal consumption, electricity usage, and kiln operations data for Jan-Mar 2024 period.',
  },
  'SUB-2024-Q2-ECW': {
    id: 'SUB-2024-Q2-ECW',
    submitterName: 'Amit Singh',
    entity: 'Eastern Cement Works',
    submissionDate: '2024-06-25',
    quarter: 'Q2 2024',
    status: 'in-review',
    dataQualityScore: 91,
    recordCount: 92,
    totalCarbonCredits: 18954,
    gei: '1,374.52 kg CO2e/tonne',
    description: 'Q2 submission with additional kiln efficiency improvements during Apr-Jun period.',
  },
}

export default function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { currentRole } = useRole()
  const resolvedParams = React.use(params)
  const [submission, setSubmission] = useState<SubmissionDetail | null>(null)
  const [autoComments, setAutoComments] = useState<ReviewComment[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedComments, setEditedComments] = useState<ReviewComment[]>([])

  useEffect(() => {
    // Load submission detail
    const sub = mockSubmissions[resolvedParams.id]
    if (sub) {
      setSubmission(sub)
      // Generate auto-review comments
      const comments = generateAutoReviewComments(resolvedParams.id, sub.entity)
      setAutoComments(comments)
      setEditedComments(comments)
    }
  }, [resolvedParams.id])

  // Only ACVA and Check-Verifier can review submissions
  const canReview = currentRole === 'acva-verifier' || currentRole === 'check-verifier'

  if (!submission) {
    return (
      <AppShell currentPage="submissions" lifecycleEvents={mockLifecycleEvents}>
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Submission not found</p>
          </div>
        </div>
      </AppShell>
    )
  }

  const statusColors: Record<string, string> = {
    submitted: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'in-review': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    verified: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
  }

  const statusIcons: Record<string, React.ReactNode> = {
    submitted: <Clock className="w-4 h-4" />,
    'in-review': <AlertCircle className="w-4 h-4" />,
    verified: <CheckCircle className="w-4 h-4" />,
    rejected: <AlertCircle className="w-4 h-4" />,
  }

  return (
    <AppShell currentPage="submissions" lifecycleEvents={mockLifecycleEvents}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/submissions">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Submissions
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Submission Info Card */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{submission.entity}</h1>
                <p className="text-sm text-muted-foreground">
                  Submission ID: <span className="font-mono">{submission.id}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Submitted by: <span className="font-semibold">{submission.submitterName}</span>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Status</div>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${statusColors[submission.status]}`}
                  >
                    {statusIcons[submission.status]}
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1).replace('-', ' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Quarter</p>
                <p className="text-lg font-semibold text-foreground">{submission.quarter}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Data Quality</p>
                <p className="text-lg font-semibold text-emerald-400">{submission.dataQualityScore}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Records</p>
                <p className="text-lg font-semibold text-foreground">{submission.recordCount}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">GEI</p>
                <p className="text-lg font-semibold text-foreground">{submission.gei}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-foreground">{submission.description}</p>
            </div>
          </div>

          {/* Review Section - Only for reviewers */}
          {canReview && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Review Comments</h2>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                    Edit & Send Review
                  </Button>
                )}
              </div>

              {isEditing ? (
                <AcvaReviewEditor
                  autoComments={editedComments}
                  submissionId={submission.id}
                  onCancel={() => {
                    setIsEditing(false)
                    setEditedComments(autoComments)
                  }}
                  onSave={(comments) => {
                    setEditedComments(comments)
                    setAutoComments(comments)
                    setIsEditing(false)
                    alert('Review comments sent to submitter!')
                  }}
                />
              ) : (
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {autoComments.length} auto-generated comments ready for review
                    </p>
                    {autoComments.map((comment) => (
                      <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-semibold text-foreground text-sm">{comment.commentText.substring(0, 60)}...</p>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              comment.severity === 'CRITICAL'
                                ? 'bg-red-500/20 text-red-300'
                                : comment.severity === 'MAJOR'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-yellow-500/20 text-yellow-300'
                            }`}
                          >
                            {comment.severity}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Field: {comment.relatedField}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* View-Only Mode for Non-Reviewers */}
          {!canReview && (
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-muted-foreground text-sm">
                Only ACVA Verifiers and Check-Verifiers can review submissions.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
