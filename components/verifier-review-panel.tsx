'use client'

import React, { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSubmissions, SubmissionState } from '@/lib/submission-context'
import { useRole } from '@/lib/role-context'
import { validateSubmission } from '@/lib/calculations'

interface VerifierReviewPanelProps {
  submission: SubmissionState
}

export function VerifierReviewPanel({ submission }: VerifierReviewPanelProps) {
  const { verifySubmission } = useSubmissions()
  const { userId } = useRole()
  const [notes, setNotes] = useState(submission.verifierNotes || '')
  const [isReviewing, setIsReviewing] = useState(false)
  const [exceptions, setExceptions] = useState<any[]>([])

  React.useEffect(() => {
    const exceptionsList = validateSubmission(submission.uploadedFiles)
    setExceptions(exceptionsList)
  }, [submission])

  const handleApprove = () => {
    setIsReviewing(true)
    setTimeout(() => {
      verifySubmission(submission.id, notes, userId)
      setIsReviewing(false)
    }, 1000)
  }

  if (submission.status === 'draft') {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>This submission is still in draft. Submit it first for verification.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-3">Verification Status</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Quality Score</p>
            <p className="text-3xl font-bold text-primary">{submission.qualityScore}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recommendation</p>
            <p className={`text-lg font-bold ${submission.qualityScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
              {submission.qualityScore >= 70 ? 'APPROVE' : 'REVIEW'}
            </p>
          </div>
        </div>
      </div>

      {/* Exceptions */}
      {exceptions.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Data Quality Exceptions</h3>
          <div className="space-y-2">
            {exceptions.map((exc, idx) => (
              <div
                key={idx}
                className={`p-3 rounded border-l-4 ${
                  exc.severity === 'critical'
                    ? 'border-red-500 bg-red-50'
                    : exc.severity === 'major'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      exc.severity === 'critical'
                        ? 'text-red-600'
                        : exc.severity === 'major'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{exc.description}</p>
                    {exc.resolution && (
                      <p className="text-xs text-muted-foreground mt-1">Resolution: {exc.resolution}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verification Notes */}
      <div>
        <label className="block text-sm font-medium mb-2">Verification Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add your review notes and findings..."
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          disabled={submission.status === 'verified'}
        />
      </div>

      {/* Actions */}
      {submission.status === 'submitted' || submission.status === 'under-review' ? (
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" disabled={isReviewing}>
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isReviewing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isReviewing ? 'Verifying...' : 'Approve for Verification'}
          </Button>
        </div>
      ) : (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700">This submission has been verified.</span>
        </div>
      )}
    </div>
  )
}
