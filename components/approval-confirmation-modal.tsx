'use client'

import React, { useState } from 'react'
import { X, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataPreviewViewer } from '@/components/data-preview-viewer'

export interface ApprovalConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  submission: {
    id: string
    period: string
    dataQuality: number
    cccs: number
    submittedDate: string
    uploadedFiles?: Array<{ name: string; type: string }>
  }
  isLoading?: boolean
}

export function ApprovalConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  submission,
  isLoading = false,
}: ApprovalConfirmationModalProps) {
  const [hasReviewed, setHasReviewed] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 border-b border-border bg-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Final Approval Confirmation</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Submission Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold">Submission Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded border border-border">
                <p className="text-sm text-muted-foreground">Period</p>
                <p className="text-lg font-semibold">{submission.period}</p>
              </div>
              <div className="p-4 bg-muted rounded border border-border">
                <p className="text-sm text-muted-foreground">Data Quality</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-semibold">{submission.dataQuality}%</p>
                  <Badge variant={submission.dataQuality >= 85 ? 'default' : 'secondary'}>
                    {submission.dataQuality >= 85 ? 'High Quality' : 'Good Quality'}
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-muted rounded border border-border">
                <p className="text-sm text-muted-foreground">Carbon Credits</p>
                <p className="text-lg font-semibold text-green-500">{submission.cccs.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-muted rounded border border-border">
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-lg font-semibold">{submission.submittedDate}</p>
              </div>
            </div>
          </div>

          {/* Data Preview Section */}
          {submission.uploadedFiles && submission.uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <h3 className="font-semibold">Review Uploaded Data</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Click the eye icon to review sample data from each uploaded file before approving.
              </p>
              <div className="space-y-2 bg-muted/30 p-4 rounded border border-border">
                {submission.uploadedFiles.map((file, idx) => (
                  <DataPreviewViewer
                    key={idx}
                    fileName={file.name}
                    fileType={file.type}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Compliance Check */}
          <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold text-blue-900">Pre-Approval Checklist</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasReviewed}
                onChange={(e) => setHasReviewed(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-blue-900">
                I have reviewed all data and confirm this submission is ready for blockchain registry
              </span>
            </label>
          </div>

          {/* Warning Message */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-900">
              <strong>Important:</strong> Once approved and published, this submission will be registered 
              on the blockchain with immutable records. This action cannot be undone.
            </p>
          </div>

          {/* Action Items */}
          <div className="space-y-2 p-4 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-green-900">After Approval</h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>• Carbon Credits: {submission.cccs.toLocaleString()} CCCs will be issued</li>
              <li>• Certificate: Digital certificate will be generated</li>
              <li>• Registry: Record will be registered on blockchain</li>
              <li>• Status: Updated to "Approved"</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-border bg-card p-6 flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!hasReviewed || isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? 'Processing...' : 'Approve & Publish'}
          </Button>
        </div>
      </div>
    </div>
  )
}
