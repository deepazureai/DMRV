'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ReviewComment, MOCK_REVIEW_COMMENTS, MOCK_PENDING_COMMENTS, ReviewCommentStatus } from './review-comments-schema'

export interface ReviewContextType {
  reviewComments: ReviewComment[]
  addReviewComment: (comment: ReviewComment) => void
  resolveComment: (commentId: string, entityResponse: string) => void
  getCommentsBySubmission: (submissionId: string) => ReviewComment[]
  getPendingCommentsBySubmission: (submissionId: string) => ReviewComment[]
  getPendingCommentCount: (submissionId: string) => number
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: ReactNode }) {
  // Initialize with mock data - in production this would come from backend
  const [reviewComments, setReviewComments] = useState<ReviewComment[]>([
    ...MOCK_REVIEW_COMMENTS,
    ...MOCK_PENDING_COMMENTS,
  ])

  const addReviewComment = (comment: ReviewComment) => {
    setReviewComments(prev => [comment, ...prev])
  }

  const resolveComment = (commentId: string, entityResponse: string) => {
    setReviewComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              entityResponse,
              entityResponseDate: new Date(),
              resolutionStatus: ReviewCommentStatus.RESOLVED,
              resolvedAt: new Date(),
            }
          : comment,
      ),
    )
  }

  const getCommentsBySubmission = (submissionId: string): ReviewComment[] => {
    return reviewComments.filter(c => c.submissionId === submissionId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const getPendingCommentsBySubmission = (submissionId: string): ReviewComment[] => {
    return reviewComments
      .filter(c => c.submissionId === submissionId && c.resolutionStatus === ReviewCommentStatus.OPEN)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const getPendingCommentCount = (submissionId: string): number => {
    return getPendingCommentsBySubmission(submissionId).length
  }

  return (
    <ReviewContext.Provider
      value={{
        reviewComments,
        addReviewComment,
        resolveComment,
        getCommentsBySubmission,
        getPendingCommentsBySubmission,
        getPendingCommentCount,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviewComments() {
  const context = useContext(ReviewContext)
  if (!context) {
    throw new Error('useReviewComments must be used within ReviewProvider')
  }
  return context
}
