'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { useRole } from '@/lib/role-context'
import { useSubmissions } from '@/lib/submission-context'
import { ApprovalDetailModal } from '@/components/approval-detail-modal'
import { getForApproverReview, getStatusLabel, getStatusColor } from '@/lib/submission-queue-filters'
import { Eye, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ApprovalsPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const { submissions, approveSubmission } = useSubmissions()
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [isApproving, setIsApproving] = useState(false)

  // Only BEE Regulator and Sector Officer can access approvals
  React.useEffect(() => {
    if (currentRole && currentRole !== 'bee-regulator' && currentRole !== 'sector-officer') {
      router.push('/')
    }
  }, [currentRole, router])

  // If user doesn't have proper role, show access denied
  if (currentRole && currentRole !== 'bee-regulator' && currentRole !== 'sector-officer') {
    return (
      <AppShell currentPage="approvals">
        <div className="space-y-6 p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-900">Access Denied</h2>
            <p className="mt-2 text-sm text-red-800">
              Only BEE Regulator can access the approval queue. Please switch to the correct role.
            </p>
          </div>
        </div>
      </AppShell>
    )
  }

  const forApproval = getForApproverReview(submissions)
  const approved = submissions.filter(s => s.status === 'approved')

  const selectedSubmission = submissions.find(s => s.id === selectedSubmissionId)

  const handleApprove = (cccAmount: number) => {
    if (selectedSubmissionId) {
      setIsApproving(true)
      setTimeout(() => {
        approveSubmission(selectedSubmissionId, 'Approved for carbon credit generation', 'regulator-1', cccAmount)
        setIsApproving(false)
        setSelectedSubmissionId(null)
      }, 1000)
    }
  }

  return (
    <AppShell currentPage="approvals">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">BEE Regulator Approval Queue</h2>
          <p className="text-muted-foreground">Review verified submissions and generate carbon credits</p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">For Approval</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">{forApproval.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Already Approved</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{approved.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Credits</p>
            <p className="mt-2 text-3xl font-bold">
              {submissions.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.cccAmount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* For Approval Queue */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Pending Approval</h3>
          {forApproval.length === 0 ? (
            <div className="p-8 text-center bg-muted rounded-lg border border-border">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-muted-foreground">No submissions pending approval</p>
            </div>
          ) : (
            <div className="space-y-3">
              {forApproval.map(sub => (
                <div key={sub.id} className="p-5 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{sub.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        Entity: {sub.entityId} • Project: {sub.projectId}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(sub.status)}`}>
                      {getStatusLabel(sub.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="p-2 bg-muted rounded">
                      <p className="text-muted-foreground text-xs">Quality Score</p>
                      <p className="font-bold">{sub.qualityScore}%</p>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <p className="text-muted-foreground text-xs">Verified Status</p>
                      <p className="font-bold">Ready</p>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <p className="text-muted-foreground text-xs">Emissions</p>
                      <p className="font-bold">Pending</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedSubmissionId(sub.id)}
                    className="w-full bg-primary"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review & Approve
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approval Detail Modal */}
        {selectedSubmission && (
          <ApprovalDetailModal
            submission={selectedSubmission}
            isOpen={!!selectedSubmissionId}
            onClose={() => setSelectedSubmissionId(null)}
            onApprove={handleApprove}
            isApproving={isApproving}
          />
        )}
      </div>
    </AppShell>
  )
}
