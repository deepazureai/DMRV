'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockSubmissions, getIssuesBySubmissionId } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'

const severityColors: Record<string, string> = {
  low: 'bg-blue-100 text-blue-900 border-blue-200',
  medium: 'bg-amber-100 text-amber-900 border-amber-200',
  high: 'bg-orange-100 text-orange-900 border-orange-200',
  critical: 'bg-red-100 text-red-900 border-red-200'
}

const severityIcons: Record<string, React.ReactNode> = {
  low: <AlertCircle size={16} />,
  medium: <AlertTriangle size={16} />,
  high: <AlertTriangle size={16} />,
  critical: <AlertTriangle size={16} />
}

export default function DataQualityPage() {
  return (
    <AppShell currentPage="data-quality">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Data Quality Management</h2>
          <p className="text-muted-foreground">Identify, track, and resolve data quality issues across submissions</p>
        </div>

        {mockSubmissions.map((submission) => {
          const issues = getIssuesBySubmissionId(submission.id)
          if (issues.length === 0) return null

          return (
            <div key={submission.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Submission: {submission.period}</h3>
                <span className="text-sm text-muted-foreground">ID: {submission.id}</span>
              </div>

              <div className="space-y-3">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`rounded-lg border p-4 ${severityColors[issue.severity]}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="mt-0.5">{severityIcons[issue.severity]}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{issue.issueType.replace('_', ' ')}</h4>
                          <Badge variant="outline" className="capitalize text-xs">
                            {issue.severity}
                          </Badge>
                          {issue.resolved && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold">
                              <CheckCircle size={14} /> Resolved
                            </span>
                          )}
                        </div>
                        <p className="text-sm">{issue.description}</p>
                      </div>
                    </div>

                    {issue.resolution && (
                      <div className="ml-6 rounded-lg bg-white/50 p-3">
                        <p className="text-xs font-semibold mb-1 opacity-75">Resolution:</p>
                        <p className="text-sm">{issue.resolution}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </AppShell>
  )
}
