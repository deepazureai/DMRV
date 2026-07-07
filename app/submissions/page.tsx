'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockSubmissions, getEntityById, getProjectById } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

function getProjectById(id: string) {
  return mockSubmissions.find(s => s.id === id)?.projectId || null
}

const statusIcons: Record<string, React.ReactNode> = {
  draft: <Clock className="text-gray-500" size={16} />,
  submitted: <Clock className="text-blue-500" size={16} />,
  under_review: <Clock className="text-amber-500" size={16} />,
  verified: <CheckCircle className="text-emerald-500" size={16} />,
  approved: <CheckCircle className="text-green-500" size={16} />,
  rejected: <AlertCircle className="text-red-500" size={16} />
}

export default function SubmissionsPage() {
  return (
    <AppShell currentPage="submissions">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Submissions</h2>
          <p className="text-muted-foreground">Track carbon credit verification submissions and their lifecycle status</p>
        </div>

        <div className="space-y-4">
          {mockSubmissions.map((submission, idx) => {
            const entity = getEntityById(submission.entityId)
            const isGoldenPath = submission.id === 'sub-001-golden'

            return (
              <div
                key={submission.id}
                className={`rounded-lg border p-6 shadow-sm transition-all ${
                  isGoldenPath
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border bg-card hover:shadow-md'
                }`}
              >
                {isGoldenPath && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    ⭐ Golden Path Example
                  </div>
                )}

                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {statusIcons[submission.status]}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{entity?.name}</h3>
                        <p className="text-sm text-muted-foreground">Period: {submission.period}</p>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={submission.status === 'verified' || submission.status === 'approved' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {submission.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Submitted</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{new Date(submission.submissionDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Data Quality</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {submission.dataQualityScore > 0 ? `${submission.dataQualityScore}%` : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">CCC Estimate</p>
                    <p className="mt-1 text-sm font-semibold text-green-600">{submission.cccEstimate.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                      {submission.status === 'draft' ? 'Edit' : 'View'}
                    </button>
                  </div>
                </div>

                {submission.exceptions.length > 0 && (
                  <div className="rounded-lg bg-amber-50 p-3 border border-amber-200">
                    <p className="text-xs font-semibold text-amber-900 mb-2">Exceptions ({submission.exceptions.length}):</p>
                    <ul className="space-y-1">
                      {submission.exceptions.map((exc, i) => (
                        <li key={i} className="text-xs text-amber-800">• {exc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
