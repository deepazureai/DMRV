'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { useRole } from '@/lib/role-context'
import { mockSubmissions, getEvidenceBySubmissionId, getIssuesBySubmissionId } from '@/lib/mock-data'

export default function VerificationPage() {
  const router = useRouter()
  const { currentRole } = useRole()

  // Only Verifier Auditor and Sector Officer can access verification
  React.useEffect(() => {
    if (currentRole && currentRole !== 'verifier-auditor' && currentRole !== 'sector-officer') {
      router.push('/')
    }
  }, [currentRole, router])

  // If user doesn't have proper role, show access denied
  if (currentRole && currentRole !== 'verifier-auditor' && currentRole !== 'sector-officer') {
    return (
      <AppShell currentPage="verification">
        <div className="space-y-6 p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-900">Access Denied</h2>
            <p className="mt-2 text-sm text-red-800">
              Only Verifier Auditor can access the verification workbench. Please switch to the correct role.
            </p>
          </div>
        </div>
      </AppShell>
    )
  }

  const verifiedSubmissions = mockSubmissions.filter(s => s.status === 'verified' || s.status === 'approved')

  return (
    <AppShell currentPage="verification">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Third-Party Verifier Workbench</h2>
          <p className="text-muted-foreground">Review, verify, and approve carbon credit submissions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Verified Submissions</p>
            <p className="mt-2 text-2xl font-bold text-primary">{verifiedSubmissions.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Total CCCs Verified</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {verifiedSubmissions.reduce((sum, s) => sum + s.cccEstimate, 0).toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Avg Quality Score</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {Math.round(verifiedSubmissions.reduce((sum, s) => sum + s.dataQualityScore, 0) / verifiedSubmissions.length)}%
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {verifiedSubmissions.map((submission) => {
            const evidence = getEvidenceBySubmissionId(submission.id)
            const issues = getIssuesBySubmissionId(submission.id)
            const resolvedIssues = issues.filter(i => i.resolved).length

            return (
              <div key={submission.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Period: {submission.period}</h3>
                    <p className="text-sm text-muted-foreground">Submission ID: {submission.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      ✓ Verified
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs font-medium text-muted-foreground">Data Quality</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{submission.dataQualityScore}%</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs font-medium text-muted-foreground">Issues Resolved</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{resolvedIssues}/{issues.length}</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3 border border-primary/20">
                    <p className="text-xs font-medium text-primary">Verified CCCs</p>
                    <p className="mt-2 text-lg font-semibold text-primary">{submission.cccEstimate.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    View Evidence
                  </button>
                  <button className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    View Calculation
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
