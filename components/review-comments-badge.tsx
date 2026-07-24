'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { useReviewComments } from '@/lib/review-context'
import { cn } from '@/lib/utils'

interface ReviewCommentsBadgeProps {
  submissionId: string
  onClick?: () => void
  className?: string
}

export function ReviewCommentsBadge({ submissionId, onClick, className }: ReviewCommentsBadgeProps) {
  const { getPendingCommentCount, getPendingCommentsBySubmission } = useReviewComments()

  const pendingCount = getPendingCommentCount(submissionId)
  const pendingComments = getPendingCommentsBySubmission(submissionId)

  if (pendingCount === 0) {
    return null
  }

  // Get severity level for styling
  const hasCritical = pendingComments.some(c => c.severity === 'CRITICAL')
  const hasMajor = pendingComments.some(c => c.severity === 'MAJOR')

  const bgColor = hasCritical ? 'bg-red-500' : hasMajor ? 'bg-amber-500' : 'bg-yellow-500'
  const hoverColor = hasCritical ? 'hover:bg-red-600' : hasMajor ? 'hover:bg-amber-600' : 'hover:bg-yellow-600'

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white font-semibold text-sm transition-colors cursor-pointer',
        bgColor,
        hoverColor,
        className,
      )}
      title={`${pendingCount} review comments pending`}
    >
      <AlertCircle size={16} />
      <span>{pendingCount}</span>
      <span className="text-xs">Review Comments</span>
    </button>
  )
}
