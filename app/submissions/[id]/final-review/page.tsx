'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, CheckCircle2, AlertTriangle, Award, Download, Send } from 'lucide-react'

const mockReviewSummary = {
  entityName: 'Cement Manufacturing Ltd',
  period: 'Q1 FY2024-25',
  submissionId: 'SUB-001',
  acvaVerifier: 'Dr. Priya Sharma (TUV-SUD India)',
  checkVerifier: 'Mr. Rajesh Kumar (Bureau Veritas India)',
  acvaComments: 3,
  acvaChallenged: 1,
  entityResponses: 3,
  allResolved: true,
  calculatedCCCs: 14850,
  confidenceFactor: 0.95,
  dataQuality: 87,
  gei: 0.58,
}

const mockAuditTrail = [
  {
    date: new Date('2024-01-15'),
    actor: 'Obligated Entity',
    action: 'Submitted data for Q1 FY2024-25',
    status: 'completed',
  },
  {
    date: new Date('2024-01-20'),
    actor: 'ACVA Verifier (Dr. Priya Sharma)',
    action: 'Generated review comments and sent to entity',
    status: 'completed',
  },
  {
    date: new Date('2024-01-25'),
    actor: 'Obligated Entity',
    action: 'Responded to all ACVA comments with evidence',
    status: 'completed',
  },
  {
    date: new Date('2024-01-26'),
    actor: 'Check-Verifier (Rajesh Kumar)',
    action: 'Challenged 1 ACVA finding, approved 2 others',
    status: 'completed',
  },
  {
    date: new Date('2024-01-27'),
    actor: 'ACVA Verifier',
    action: 'Reviewed check-verification feedback, closed all items',
    status: 'completed',
  },
  {
    date: new Date().toISOString().split('T')[0] === new Date('2024-01-27').toISOString().split('T')[0]
      ? new Date()
      : new Date('2024-01-27'),
    actor: 'BEE Officer',
    action: 'Final compliance review - all clear for CCC issuance',
    status: 'in-progress',
  },
]

export default function BEEOfficerFinalReviewPage() {
  const params = useParams()
  const submissionId = params.id as string
  const [complianceNotes, setComplianceNotes] = useState('')
  const [showCCCModal, setShowCCCModal] = useState(false)
  const [isIssuing, setIsIssuing] = useState(false)

  const handleIssueCCC = async () => {
    setIsIssuing(true)
    // Simulate API call and NSCICM submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsIssuing(false)
    setShowCCCModal(false)
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/submissions">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">BEE Officer - Final Review & CCC Issuance</h1>
          </div>
          <p className="text-muted-foreground">
            {mockReviewSummary.entityName} | {mockReviewSummary.period}
          </p>
        </div>
      </div>

      {/* Status Alert */}
      <Alert className="border-emerald-500/30 bg-emerald-900/20">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <AlertDescription className="text-emerald-300">
          All verification stages completed. Submission ready for final compliance review and CCC issuance.
        </AlertDescription>
      </Alert>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="verification-trail">Verification Trail</TabsTrigger>
          <TabsTrigger value="compliance-notes">Compliance Notes</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">Verification Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">ACVA Verifier</p>
                  <p className="text-sm font-semibold text-foreground">{mockReviewSummary.acvaVerifier}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Check-Verifier</p>
                  <p className="text-sm font-semibold text-foreground">{mockReviewSummary.checkVerifier}</p>
                </div>
                <div className="border-t border-border pt-3 mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">ACVA Comments</p>
                    <p className="text-lg font-bold text-foreground">{mockReviewSummary.acvaComments}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Challenged</p>
                    <p className="text-lg font-bold text-amber-400">{mockReviewSummary.acvaChallenged}</p>
                  </div>
                </div>
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded p-2">
                  <p className="text-xs text-emerald-300">
                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                    All items resolved and closed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">CCC Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-emerald-900/10 border border-emerald-500/30 rounded p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Estimated CCC Generation</p>
                  <p className="text-4xl font-bold text-emerald-300">
                    {mockReviewSummary.calculatedCCCs.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-400 mt-1">Carbon Credit Certificates</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/30 rounded p-2">
                    <p className="text-muted-foreground mb-1">Confidence Factor</p>
                    <p className="font-semibold text-foreground">
                      {(mockReviewSummary.confidenceFactor * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded p-2">
                    <p className="text-muted-foreground mb-1">Data Quality</p>
                    <p className="font-semibold text-foreground">{mockReviewSummary.dataQuality}%</p>
                  </div>
                  <div className="bg-muted/30 rounded p-2 col-span-2">
                    <p className="text-muted-foreground mb-1">GEI</p>
                    <p className="font-semibold text-foreground">{mockReviewSummary.gei} kg CO₂e/tonne</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Final Compliance Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Data Quality Score ≥ 70%',
                  'All ACVA Comments Resolved',
                  'Check-Verifier Approved',
                  'GEI Calculation Verified',
                  'Entity Compliance Status: Green',
                  'Documentation Complete',
                  'Blockchain Registry Ready',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Verification Trail */}
        <TabsContent value="verification-trail" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Complete Verification Timeline</CardTitle>
              <CardDescription>Audit trail of all actions and status changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAuditTrail.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === 'completed'
                            ? 'bg-emerald-500'
                            : 'bg-blue-500'
                        }`}
                      />
                      {idx < mockAuditTrail.length - 1 && (
                        <div className="w-0.5 h-12 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.actor}</p>
                          <p className="text-xs text-muted-foreground">
                            {typeof item.date === 'string'
                              ? item.date
                              : item.date.toLocaleDateString()}
                          </p>
                        </div>
                        {item.status === 'completed' && (
                          <Badge variant="outline" className="bg-emerald-900/20 text-emerald-400 border-emerald-500/30">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground">{item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Notes */}
        <TabsContent value="compliance-notes" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">BEE Officer Compliance Notes</CardTitle>
              <CardDescription>Final remarks before CCC issuance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Compliance Remarks</label>
                <textarea
                  value={complianceNotes}
                  onChange={e => setComplianceNotes(e.target.value)}
                  placeholder="Add any final compliance remarks or conditions for CCC issuance..."
                  rows={4}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-foreground text-sm resize-none focus:border-blue-500 focus:outline-none"
                />
              </div>

              <Alert className="border-blue-500/30 bg-blue-900/20">
                <AlertTriangle className="w-4 h-4 text-blue-400" />
                <AlertDescription className="text-blue-300 text-xs">
                  These remarks will be recorded in the compliance certificate and blockchain registry.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CCC Issuance Section */}
      <Card className="border-emerald-500/30 bg-emerald-900/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-emerald-300">
                <Award className="w-5 h-5" />
                Ready for CCC Issuance
              </CardTitle>
              <CardDescription>Proceed with multi-step government approval workflow</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4 text-xs">
            <div className="bg-background/50 rounded p-3">
              <p className="font-medium text-muted-foreground mb-1">Step 1: BEE Prepares</p>
              <Badge variant="outline" className="text-xs bg-emerald-900/20 text-emerald-400 border-emerald-500/30">
                Ready
              </Badge>
            </div>
            <div className="bg-background/50 rounded p-3">
              <p className="font-medium text-muted-foreground mb-1">Step 2: NSCICM Review</p>
              <Badge variant="outline" className="text-xs">Pending</Badge>
            </div>
            <div className="bg-background/50 rounded p-3">
              <p className="font-medium text-muted-foreground mb-1">Step 3: Central Govt</p>
              <Badge variant="outline" className="text-xs">Pending</Badge>
            </div>
            <div className="bg-background/50 rounded p-3">
              <p className="font-medium text-muted-foreground mb-1">Step 4: Issue CCC</p>
              <Badge variant="outline" className="text-xs">Pending</Badge>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-border">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button
              onClick={() => setShowCCCModal(true)}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="w-4 h-4" />
              Submit to NSCICM for Approval
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CCC Issuance Confirmation Modal */}
      {showCCCModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Confirm CCC Issuance Submission
              </CardTitle>
              <CardDescription>This will initiate the 6-week government approval process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 rounded p-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Summary</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>Entity: {mockReviewSummary.entityName}</li>
                  <li>CCCs: {mockReviewSummary.calculatedCCCs.toLocaleString()}</li>
                  <li>Period: {mockReviewSummary.period}</li>
                  <li>Status: Ready for NSCICM Review</li>
                </ul>
              </div>

              <Alert className="border-blue-500/30 bg-blue-900/20 text-xs">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription className="text-blue-300">
                  Once submitted, the approval workflow will be:
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• NSCICM Expert Review (2 weeks)</li>
                    <li>• Central Government Approval (2 weeks)</li>
                    <li>• BEE Formal Issuance (2 weeks)</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="flex gap-3 justify-end pt-3 border-t border-border">
                <Button variant="outline" onClick={() => setShowCCCModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleIssueCCC}
                  disabled={isIssuing}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  {isIssuing ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit to NSCICM
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
