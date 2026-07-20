'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { useRole } from '@/lib/role-context'
import { mockSubmissions, getEvidenceBySubmissionId, getIssuesBySubmissionId } from '@/lib/mock-data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function VerificationPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const [selectedEvidence, setSelectedEvidence] = useState<any | null>(null)
  const [selectedCalculation, setSelectedCalculation] = useState<any | null>(null)
  const [showEvidenceModal, setShowEvidenceModal] = useState(false)
  const [showCalculationModal, setShowCalculationModal] = useState(false)

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
                  <button
                    onClick={() => {
                      setSelectedEvidence({ ...evidence, submissionId: submission.id, submissionPeriod: submission.period })
                      setShowEvidenceModal(true)
                    }}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    View Evidence
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCalculation({
                        submissionId: submission.id,
                        period: submission.period,
                        emissions: (Math.random() * 1000).toFixed(2),
                        carbonCredits: submission.cccEstimate,
                        emissionFactor: '0.562',
                        methodology: 'CDM Module',
                      })
                      setShowCalculationModal(true)
                    }}
                    className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    View Calculation
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Evidence Modal */}
        <Dialog open={showEvidenceModal} onOpenChange={setShowEvidenceModal}>
          <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Supporting Evidence</DialogTitle>
              <DialogDescription>
                Submission ID: {selectedEvidence?.submissionId} - Period: {selectedEvidence?.submissionPeriod}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {selectedEvidence?.evidence && selectedEvidence.evidence.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvidence.evidence.map((doc: any, idx: number) => (
                    <div key={idx} className="p-3 border border-border rounded-lg">
                      <p className="font-medium text-sm">{doc}</p>
                      <p className="text-xs text-muted-foreground mt-1">Uploaded documentation</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">No evidence documents uploaded</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEvidenceModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Calculation Modal */}
        <Dialog open={showCalculationModal} onOpenChange={setShowCalculationModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Carbon Credit Calculation</DialogTitle>
              <DialogDescription>
                Submission ID: {selectedCalculation?.submissionId} - Period: {selectedCalculation?.period}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-medium text-blue-900 mb-1">Total Emissions</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedCalculation?.emissions} tCO2e</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs font-medium text-green-900 mb-1">Carbon Credits</p>
                  <p className="text-2xl font-bold text-green-600">{selectedCalculation?.carbonCredits.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span className="font-medium">Emission Factor:</span>
                  <span>{selectedCalculation?.emissionFactor} kg CO2/kWh</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span className="font-medium">Methodology:</span>
                  <span>{selectedCalculation?.methodology}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs font-medium text-amber-900">Calculation Formula:</p>
                <p className="text-xs text-amber-800 mt-2">
                  Carbon Credits = (Total Emissions × Emission Factor) / Conversion Rate
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCalculationModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  )
}
