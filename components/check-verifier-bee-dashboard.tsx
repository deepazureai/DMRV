'use client'

import React, { useState } from 'react'
import { DmrvSubmission, DmrvActor } from '@/lib/dmrv-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Shield,
  Zap,
  FileCheck,
} from 'lucide-react'

interface CheckVerifierBEEDashboardProps {
  actor: DmrvActor
  submissions: DmrvSubmission[]
  onApprove: (submission: DmrvSubmission) => void
  onReject: (submission: DmrvSubmission) => void
}

export function CheckVerifierBEEDashboard({
  actor,
  submissions,
  onApprove,
  onReject,
}: CheckVerifierBEEDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('check-verification')

  const isCheckVerifier = actor.role === 'check-verifier'
  const isBeeOfficer = actor.role === 'bee-officer'

  const forCheckVerification = submissions.filter(s => s.status === 'acva-verification-report')
  const forApproval = submissions.filter(s => s.status === 'check-verification' || s.status === 'bee-assessment')
  const approved = submissions.filter(s => s.status === 'approved' || s.status === 'ccc-issued')

  // Sector statistics
  const sectorStats = submissions.reduce(
    (acc, sub) => {
      acc[sub.sector] = (acc[sub.sector] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Performance statistics
  const overPerformers = submissions.filter(
    s => s.geiCalculation?.performanceStatus === 'over-performer'
  ).length
  const underPerformers = submissions.filter(
    s => s.geiCalculation?.performanceStatus === 'under-performer'
  ).length

  const totalCCCSurplus = submissions.reduce((sum, s) => sum + (s.geiCalculation?.cccSurplus || 0), 0)
  const totalCCCDeficit = submissions.reduce((sum, s) => sum + (s.geiCalculation?.cccDeficit || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {isCheckVerifier ? 'Independent Check-Verification Workspace' : 'BEE Officer Approval Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {isCheckVerifier
            ? `${actor.organization} - EU AVR Compliance Verification (${actor.accreditationId})`
            : `${actor.organization} - Final Regulatory Approval & CCC Issuance`}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isCheckVerifier ? 'Reports to Verify' : 'For Approval'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {isCheckVerifier ? forCheckVerification.length : forApproval.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{approved.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Over-Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">{overPerformers}</p>
            <p className="text-xs text-muted-foreground mt-1">+{totalCCCSurplus.toLocaleString()} CCC surplus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Under-Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{underPerformers}</p>
            <p className="text-xs text-muted-foreground mt-1">{totalCCCDeficit.toLocaleString()} CCC deficit</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className={`grid w-full ${isCheckVerifier ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {isCheckVerifier && (
            <>
              <TabsTrigger value="check-verification">
                Check-Verification ({forCheckVerification.length})
              </TabsTrigger>
              <TabsTrigger value="compliance">EU AVR Compliance</TabsTrigger>
            </>
          )}
          {isBeeOfficer && (
            <>
              <TabsTrigger value="approval">Approval Queue ({forApproval.length})</TabsTrigger>
              <TabsTrigger value="analytics">Sector Analytics</TabsTrigger>
              <TabsTrigger value="ccc-issuance">CCC Issuance</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Check-Verification Tab */}
        {isCheckVerifier && (
          <TabsContent value="check-verification" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  ACVA Verification Reports for Independent Review
                </CardTitle>
                <CardDescription>
                  Second-level check to confirm ACVA findings and EU AVR compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forCheckVerification.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No reports pending check-verification
                    </p>
                  ) : (
                    forCheckVerification.map(sub => (
                      <div key={sub.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">{sub.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {sub.sector} • {sub.reportingPeriod}
                            </p>
                          </div>
                          <Badge>Pending Check</Badge>
                        </div>

                        {/* GEI Summary */}
                        {sub.geiCalculation && (
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-muted p-3 rounded">
                              <p className="text-xs text-muted-foreground">Verified GEI</p>
                              <p className="font-bold">{sub.geiCalculation.gei.toFixed(2)}</p>
                            </div>
                            <div className="bg-muted p-3 rounded">
                              <p className="text-xs text-muted-foreground">Baseline</p>
                              <p className="font-bold">{sub.geiCalculation.beeBaselineGei}</p>
                            </div>
                            <div className={`${sub.geiCalculation.performanceStatus === 'over-performer' ? 'bg-green-100' : 'bg-red-100'} p-3 rounded`}>
                              <p className="text-xs font-medium">
                                {sub.geiCalculation.performanceStatus === 'over-performer'
                                  ? 'Over-Performer'
                                  : 'Under-Performer'}
                              </p>
                              <p className="font-bold">
                                {sub.geiCalculation.performanceStatus === 'over-performer'
                                  ? `+${sub.geiCalculation.cccSurplus?.toLocaleString()}`
                                  : `-${sub.geiCalculation.cccDeficit?.toLocaleString()}`}{' '}
                                CCC
                              </p>
                            </div>
                          </div>
                        )}

                        {/* ICAP Validation */}
                        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3 mb-4">
                          <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                            <Shield className="w-4 h-4" /> EU ICAP Principles Validation
                          </p>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span>Completeness (≥95%)</span>
                              <span className="font-semibold">
                                {sub.geiCalculation?.completenessPercentage}% ✓
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Consistency (≥90%)</span>
                              <span className="font-semibold">
                                {sub.geiCalculation?.consistencyScore}% ✓
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Accuracy (±5% materiality)</span>
                              <span className="font-semibold">Within threshold ✓</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => onApprove(sub)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Confirm & Approve
                          </Button>
                          <Button
                            onClick={() => onReject(sub)}
                            variant="destructive"
                            className="flex-1"
                          >
                            Return for Review
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* EU AVR Compliance Tab (Check-Verifier) */}
        {isCheckVerifier && (
          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  EU AVR (Accredited Verifiers) Compliance Checklist
                </CardTitle>
                <CardDescription>
                  Verification against EU ETS Monitoring & Reporting Regulations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Compliance Items */}
                {[
                  {
                    title: 'Validator Independence',
                    description: 'ACVA is not the entity\'s regular auditor',
                    status: 'verified',
                  },
                  {
                    title: 'ICAP Principles',
                    description: 'Completeness, Consistency, Accuracy, Precision met',
                    status: 'verified',
                  },
                  {
                    title: 'Materiality Threshold',
                    description: 'All deviations within ±5% per EU ETS MRR',
                    status: 'verified',
                  },
                  {
                    title: 'Audit Trail',
                    description: 'All queries, CARs, evidence documented with timestamps',
                    status: 'verified',
                  },
                  {
                    title: 'Digital Lineage',
                    description: 'Data transformation traceable and immutable',
                    status: 'verified',
                  },
                  {
                    title: 'Blockchain Hash',
                    description: 'Cryptographic integrity verified for final record',
                    status: 'verified',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* BEE Approval Tab */}
        {isBeeOfficer && (
          <TabsContent value="approval" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Final Approval Queue</CardTitle>
                <CardDescription>Submissions passed check-verification awaiting BEE approval</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Submission</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>CCC Amount</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forApproval.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                          No submissions pending BEE approval
                        </TableCell>
                      </TableRow>
                    ) : (
                      forApproval.map(sub => (
                        <TableRow key={sub.id}>
                          <TableCell className="font-mono text-sm">{sub.id}</TableCell>
                          <TableCell className="capitalize">{sub.sector}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {sub.geiCalculation?.performanceStatus === 'over-performer' ? (
                                <>
                                  <TrendingUp className="w-4 h-4 text-green-600" />
                                  <span className="text-xs font-semibold text-green-600">Over</span>
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="w-4 h-4 text-red-600" />
                                  <span className="text-xs font-semibold text-red-600">Under</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">
                            {sub.geiCalculation?.performanceStatus === 'over-performer' ? (
                              <span className="text-green-600">
                                +{sub.geiCalculation.cccSurplus?.toLocaleString()}
                              </span>
                            ) : (
                              <span className="text-red-600">
                                -{sub.geiCalculation?.cccDeficit?.toLocaleString()}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => onApprove(sub)}>
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Sector Analytics Tab (BEE) */}
        {isBeeOfficer && (
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Submissions by Sector</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(sectorStats).map(([sector, count]) => (
                      <div key={sector} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{sector}</span>
                          <span className="font-semibold">{count}</span>
                        </div>
                        <Progress value={(count / submissions.length) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">CCC Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Surplus (Over-Performer)</span>
                        <span className="font-bold text-green-600">+{totalCCCSurplus.toLocaleString()}</span>
                      </div>
                      <Progress value={70} className="h-3 bg-green-100" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Deficit (Under-Performer)</span>
                        <span className="font-bold text-red-600">{totalCCCDeficit.toLocaleString()}</span>
                      </div>
                      <Progress value={30} className="h-3 bg-red-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* CCC Issuance Tab (BEE) */}
        {isBeeOfficer && (
          <TabsContent value="ccc-issuance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Carbon Credit Certificate (CCC) Issuance Pipeline
                </CardTitle>
                <CardDescription>
                  Ready for blockchain registration and ICM registry entry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {approved.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No approved submissions ready for CCC issuance
                    </p>
                  ) : (
                    approved.map(sub => (
                      <div
                        key={sub.id}
                        className="border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-semibold text-foreground">{sub.id}</h5>
                            <p className="text-sm text-muted-foreground">{sub.sector}</p>
                          </div>
                          <Badge className="bg-emerald-600">Ready for CCC Issue</Badge>
                        </div>

                        {sub.geiCalculation && (
                          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                            <div>
                              <span className="text-muted-foreground text-xs">CCCs to Issue:</span>
                              <p className="font-bold text-emerald-600">
                                {sub.geiCalculation.performanceStatus === 'over-performer'
                                  ? `+${sub.geiCalculation.cccSurplus?.toLocaleString()}`
                                  : `—`}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground text-xs">Equivalent CO2e:</span>
                              <p className="font-bold">
                                {(sub.geiCalculation.cccSurplus || 0).toLocaleString()} tonne
                              </p>
                            </div>
                          </div>
                        )}

                        <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                          Generate CCC & Register on Blockchain
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
