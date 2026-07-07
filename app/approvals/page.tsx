'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockSubmissions } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'

export default function ApprovalsPage() {
  const approvalPending = mockSubmissions.filter(s => ['verified', 'under_review'].includes(s.status))

  return (
    <AppShell currentPage="approvals">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">BEE Approval Queue</h2>
          <p className="text-muted-foreground">Review and approve verified submissions for blockchain registry</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
            <p className="mt-2 text-2xl font-bold text-amber-600">{approvalPending.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Ready for Registry</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {mockSubmissions.filter(s => s.status === 'approved').length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Submissions Awaiting Approval</h3>
          {approvalPending.length === 0 ? (
            <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
              <p className="text-muted-foreground">All verified submissions have been processed</p>
            </div>
          ) : (
            approvalPending.map((submission) => (
              <div key={submission.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Period: {submission.period}</h3>
                    <p className="text-sm text-muted-foreground">Status: {submission.status.replace('_', ' ')}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {submission.status === 'verified' ? 'Ready' : 'In Review'}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-4 mb-6">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Data Quality</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{submission.dataQualityScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">CCCs</p>
                    <p className="mt-1 text-lg font-semibold text-green-600">{submission.cccEstimate.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Submitted</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{new Date(submission.submissionDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    {submission.status === 'verified' && (
                      <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                        Approve & Publish
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  )
}
