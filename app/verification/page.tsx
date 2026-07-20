'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { useRole } from '@/lib/role-context'
import { useSubmissions } from '@/lib/submission-context'
import { VerificationDetailModal } from '@/components/verification-detail-modal'
import { getForVerifierReview, getStatusLabel, getStatusColor } from '@/lib/submission-queue-filters'
import { Eye, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function VerificationPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const { submissions, verifySubmission } = useSubmissions()
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

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

  const forVerification = getForVerifierReview(submissions)
  const verified = submissions.filter(s => s.status === 'verified')

  const selectedSubmission = submissions.find(s => s.id === selectedSubmissionId)

  const handleVerify = (notes: string) => {
    if (selectedSubmissionId) {
      setIsVerifying(true)
      setTimeout(() => {
        verifySubmission(selectedSubmissionId, notes, currentRole === 'verifier-auditor' ? 'verifier-1' : 'sector-1')
        setIsVerifying(false)
        setSelectedSubmissionId(null)
      }, 1000)
    }
  }

  return (
    <AppShell currentPage="verification">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Verifier Auditor Workbench</h2>
          <p className="text-muted-foreground">Review and verify carbon credit submissions with data quality analysis</p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">For Verification</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">{forVerification.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Already Verified</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{verified.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Submissions</p>
            <p className="mt-2 text-3xl font-bold">{submissions.length}</p>
          </div>
        </div>

        {/* For Verification Queue */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Pending Verification</h3>
          {forVerification.length === 0 ? (
            <div className="p-8 text-center bg-muted rounded-lg border border-border">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-muted-foreground">No submissions pending verification</p>
            </div>
          ) : (
            <div className="space-y-3">
              {forVerification.map(sub => (
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
                      <p className="text-muted-foreground text-xs">Files</p>
                      <p className="font-bold">{sub.uploadedFiles.length}</p>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <p className="text-muted-foreground text-xs">Carbon Credits</p>
                      <p className="font-bold">{sub.cccAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedSubmissionId(sub.id)}
                    className="w-full bg-primary"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review & Verify
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verification Detail Modal */}
        {selectedSubmission && (
          <VerificationDetailModal
            submission={selectedSubmission}
            isOpen={!!selectedSubmissionId}
            onClose={() => setSelectedSubmissionId(null)}
            onVerify={handleVerify}
            isVerifying={isVerifying}
          />
        )}
      </div>
    </AppShell>
  )
}
