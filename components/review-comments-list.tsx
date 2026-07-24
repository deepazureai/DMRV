'use client'

import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import { useReviewComments } from '@/lib/review-context'
import { ReviewComment, ReviewCommentStatus, formatCommentDate } from '@/lib/review-comments-schema'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ReviewCommentsListProps {
  submissionId: string
  onClose?: () => void
  isEntity?: boolean
}

export function ReviewCommentsList({ submissionId, onClose, isEntity = true }: ReviewCommentsListProps) {
  const { getCommentsBySubmission, resolveComment } = useReviewComments()
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(null)
  const [responseText, setResponseText] = useState<string>('')
  const [respondingToId, setRespondingToId] = useState<string | null>(null)

  const comments = getCommentsBySubmission(submissionId)

  if (comments.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <CheckCircle className="mx-auto mb-3 text-emerald-600" size={24} />
        <p className="text-muted-foreground">No review comments for this submission.</p>
      </div>
    )
  }

  const handleSubmitResponse = (commentId: string) => {
    if (responseText.trim()) {
      resolveComment(commentId, responseText)
      setResponseText('')
      setRespondingToId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Review Comments & Feedback</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Close"
          >
            ✕
          </button>
        )}
      </div>

      {comments.map(comment => (
        <div
          key={comment.id}
          className={cn(
            'rounded-lg border p-4 transition-all',
            comment.resolutionStatus === ReviewCommentStatus.RESOLVED
              ? 'border-emerald-200 bg-emerald-50/5'
              : comment.severity === 'CRITICAL'
                ? 'border-red-200 bg-red-50/5'
                : comment.severity === 'MAJOR'
                  ? 'border-amber-200 bg-amber-50/5'
                  : 'border-yellow-200 bg-yellow-50/5',
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">
                {comment.resolutionStatus === ReviewCommentStatus.RESOLVED ? (
                  <CheckCircle className="text-emerald-600" size={18} />
                ) : comment.severity === 'CRITICAL' ? (
                  <AlertCircle className="text-red-600 animate-pulse" size={18} />
                ) : comment.severity === 'MAJOR' ? (
                  <AlertCircle className="text-amber-600" size={18} />
                ) : (
                  <Clock className="text-yellow-600" size={18} />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">{comment.commentText.substring(0, 80)}...</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {comment.reviewerName} • {comment.reviewerOrganization} • {comment.commentType}
                </p>
              </div>
            </div>
            <span
              className={cn(
                'text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ml-2',
                comment.resolutionStatus === ReviewCommentStatus.RESOLVED
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700',
              )}
            >
              {comment.resolutionStatus}
            </span>
          </div>

          {/* Details */}
          <div className="text-xs text-muted-foreground mb-3">
            <p>
              Related to: <span className="font-semibold text-foreground">{comment.relatedField}</span>
            </p>
            <p>Submitted: {formatCommentDate(comment.createdAt)}</p>
          </div>

          {/* Full Comment Text (Expandable) */}
          <button
            onClick={() => setExpandedCommentId(expandedCommentId === comment.id ? null : comment.id)}
            className="w-full text-left mb-3 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm text-foreground line-clamp-2">{comment.commentText}</p>
            {expandedCommentId !== comment.id && (
              <p className="text-xs text-muted-foreground mt-1">Click to expand...</p>
            )}
          </button>

          {expandedCommentId === comment.id && (
            <div className="mb-3 p-3 bg-muted/30 rounded border-l-2 border-primary">
              <p className="text-sm text-foreground whitespace-pre-wrap">{comment.commentText}</p>
            </div>
          )}

          {/* Entity Response (if exists) */}
          {comment.entityResponse && (
            <div className="mb-3 p-3 bg-emerald-50/30 rounded border-l-2 border-emerald-500">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Your Response:</p>
              <p className="text-sm text-foreground">{comment.entityResponse}</p>
              {comment.entityResponseDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Submitted: {formatCommentDate(comment.entityResponseDate)}
                </p>
              )}
            </div>
          )}

          {/* Response Input (for pending comments) */}
          {isEntity && comment.resolutionStatus === ReviewCommentStatus.OPEN && respondingToId === comment.id && (
            <div className="mb-3 p-3 bg-blue-50/30 rounded border-l-2 border-blue-500">
              <p className="text-xs font-semibold text-foreground mb-2">Add Your Response:</p>
              <textarea
                value={responseText}
                onChange={e => setResponseText(e.target.value)}
                placeholder="Provide your response to this comment or corrective action..."
                className="w-full min-h-20 p-2 text-sm rounded border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => handleSubmitResponse(comment.id)}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit Response
                </Button>
                <Button
                  onClick={() => {
                    setRespondingToId(null)
                    setResponseText('')
                  }}
                  size="sm"
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Response Button */}
          {isEntity && comment.resolutionStatus === ReviewCommentStatus.OPEN && respondingToId !== comment.id && (
            <Button
              onClick={() => setRespondingToId(comment.id)}
              size="sm"
              variant="outline"
              className="w-full gap-2"
            >
              <MessageSquare size={14} />
              Add Response
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
