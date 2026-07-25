'use client'

import React, { useState } from 'react'
import { DmrvSubmission, Query, CAR, VerificationReport, DmrvActor, DataQualityAnomaly } from '@/lib/dmrv-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  Zap,
  TrendingUp,
  TrendingDown,
  MessageSquare,
} from 'lucide-react'
import { formatGEI, formatCCCAmount, getPerformanceStatusLabel } from '@/lib/gei-calculation-engine'
import { VerificationPlanCard } from '@/components/verification-plan-card'

interface ACVADashboardProps {
  actor: DmrvActor
  submissions: DmrvSubmission[]
  queries: Query[]
  cars: CAR[]
  onViewSubmission: (submission: DmrvSubmission) => void
  onRaiseQuery: () => void
  onRaiseCAR: () => void
}

export function ACVADashboard({
  actor,
  submissions,
  queries,
  cars,
  onViewSubmission,
  onRaiseQuery,
  onRaiseCAR,
}: ACVADashboardProps) {
  const [selectedRisk, setSelectedRisk] = useState<'critical' | 'high' | 'medium'>('critical')

  // Filter submissions by ACVA review status
  const underReview = submissions.filter(s => s.status === 'acva-review' || s.status === 'acva-queries')
  const pendingQueries = queries.filter(q => q.status === 'open')
  const pendingCARs = cars.filter(c => c.status === 'open')
  const verificationComplete = submissions.filter(s => s.status === 'acva-verification-report')

  const getAnomalySeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-100 text-red-800 border-red-300',
      major: 'bg-orange-100 text-orange-800 border-orange-300',
      minor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    }
    return colors[severity] || 'bg-gray-100 text-gray-800'
  }

  const countAnomalies = (submission: DmrvSubmission, severity: string) => {
    const allAnomalies = submission.validationResults.flatMap(r => r.anomalies)
    return allAnomalies.filter(a => a.severity === severity).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">ACVA Verification Workspace</h1>
        <p className="text-muted-foreground">
          {actor.organization} - Accredited Carbon Verification Agency ({actor.accreditationId})
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{underReview.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Assigned for verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{pendingQueries.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting entity response (7-day deadline)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open CARs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{pendingCARs.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Non-conformities (14-day deadline)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reports Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{verificationComplete.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Ready for check-verification</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="risk-queue" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="risk-queue">Risk Queue</TabsTrigger>
          <TabsTrigger value="verification-plan">Plan & Risk</TabsTrigger>
          <TabsTrigger value="queries">
            Queries
            {pendingQueries.length > 0 && <Badge className="ml-2 bg-orange-600">{pendingQueries.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="cars">
            CARs
            {pendingCARs.length > 0 && <Badge className="ml-2 bg-red-600">{pendingCARs.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="anomalies">Data Anomalies</TabsTrigger>
          <TabsTrigger value="verification">Verification Reports</TabsTrigger>
        </TabsList>

        {/* Risk-Ranked Queue */}
        <TabsContent value="risk-queue" className="space-y-4">
          <div className="flex gap-2 mb-4">
            {['critical', 'high', 'medium'].map(risk => (
              <Button
                key={risk}
                variant={selectedRisk === risk ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRisk(risk as any)}
                className={
                  risk === 'critical'
                    ? selectedRisk === risk
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'border-red-300 text-red-700'
                    : risk === 'high'
                      ? selectedRisk === risk
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'border-orange-300 text-orange-700'
                      : selectedRisk === risk
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'border-yellow-300 text-yellow-700'
                }
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {selectedRisk.charAt(0).toUpperCase() + selectedRisk.slice(1)} Risk Submissions
              </CardTitle>
              <CardDescription>Risk-ranked by anomaly severity and validation failures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {underReview.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No submissions under review</p>
                ) : (
                  underReview.map((sub, idx) => {
                    const criticalAnomalies = countAnomalies(sub, 'critical')
                    const majorAnomalies = countAnomalies(sub, 'major')
                    const riskLevel =
                      criticalAnomalies > 0 ? 'critical' : majorAnomalies > 0 ? 'high' : 'medium'

                    if (riskLevel !== selectedRisk) return null

                    return (
                      <div key={sub.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">{sub.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {sub.sector} • {sub.reportingPeriod}
                            </p>
                          </div>
                          <Badge
                            className={
                              riskLevel === 'critical'
                                ? 'bg-red-600'
                                : riskLevel === 'high'
                                  ? 'bg-orange-600'
                                  : 'bg-yellow-600'
                            }
                          >
                            {riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>

                        {/* Anomaly Summary */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {criticalAnomalies > 0 && (
                            <div className="bg-red-50 dark:bg-red-950 p-2 rounded border border-red-200 dark:border-red-800">
                              <p className="text-xs font-semibold text-red-700">CRITICAL</p>
                              <p className="text-lg font-bold text-red-600">{criticalAnomalies}</p>
                            </div>
                          )}
                          {majorAnomalies > 0 && (
                            <div className="bg-orange-50 dark:bg-orange-950 p-2 rounded border border-orange-200 dark:border-orange-800">
                              <p className="text-xs font-semibold text-orange-700">MAJOR</p>
                              <p className="text-lg font-bold text-orange-600">{majorAnomalies}</p>
                            </div>
                          )}
                          {sub.geiCalculation && (
                            <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded border border-blue-200 dark:border-blue-800">
                              <p className="text-xs font-semibold text-blue-700">GEI</p>
                              <p className="text-lg font-bold text-blue-600">{sub.geiCalculation.gei.toFixed(0)}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => onViewSubmission(sub)}
                            className="flex-1"
                          >
                            Review & Verify
                          </Button>
                          <Button variant="outline" size="sm" onClick={onRaiseQuery}>
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={onRaiseCAR}>
                            <AlertTriangle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phase 3: Verification Plan & Risk Assessment Tab */}
        <TabsContent value="verification-plan" className="space-y-4">
          {underReview.length === 0 ? (
            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-semibold mb-2">No submissions under review</p>
                <p className="text-sm text-muted-foreground">Verification plans appear when submissions are assigned</p>
              </CardContent>
            </Card>
          ) : (
            underReview.slice(0, 1).map(sub => (
              <VerificationPlanCard
                key={sub.id}
                submissionId={sub.id}
                entityName={sub.entityName}
                dataQualityScore={sub.dataQualityScore || 87}
                riskLevel={countAnomalies(sub, 'critical') > 0 ? 'high' : countAnomalies(sub, 'major') > 0 ? 'medium' : 'low'}
              />
            ))
          )}
        </TabsContent>

        {/* Queries Tab */}
        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Clarification Queries
              </CardTitle>
              <CardDescription>Questions awaiting entity response (7-day regulatory deadline)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingQueries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                        No open queries
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingQueries.map(query => (
                      <TableRow key={query.id}>
                        <TableCell className="font-mono text-sm">{query.id}</TableCell>
                        <TableCell className="font-medium text-sm max-w-xs truncate">{query.title}</TableCell>
                        <TableCell className="text-sm">{query.fieldName || '—'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{query.type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(query.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Responded Queries Awaiting Close */}
          {queries.filter(q => q.status === 'responded').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Awaiting ACVA Closure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {queries
                    .filter(q => q.status === 'responded')
                    .map(query => (
                      <div key={query.id} className="border rounded p-3 bg-blue-50 dark:bg-blue-950">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-sm">{query.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">
                              Entity response: {query.responseNotes}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Close & Confirm
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* CARs Tab */}
        <TabsContent value="cars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Corrective Action Requests (CARs)
              </CardTitle>
              <CardDescription>
                Non-conformities requiring correction per BEE/CCTS standards (14-day deadline)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCARs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No open CARs</p>
                ) : (
                  pendingCARs.map(car => (
                    <div key={car.id} className="border-2 border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            {car.id}
                            <Badge
                              className={
                                car.type === 'major'
                                  ? 'bg-red-600'
                                  : car.type === 'minor'
                                    ? 'bg-orange-600'
                                    : 'bg-yellow-600'
                              }
                            >
                              {car.type.toUpperCase()}
                            </Badge>
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{car.title}</p>
                        </div>
                        <span className="text-xs font-semibold text-red-600">
                          Due {new Date(car.dueDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        <p className="text-sm">
                          <span className="font-semibold">Non-Conformity:</span> {car.nonConformity}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Evidence:</span> {car.evidenceOfNonConformity}
                        </p>
                      </div>

                      {/* Materiality Threshold */}
                      {car.materiality && (
                        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded p-2 mb-3">
                          <p className="text-xs text-muted-foreground">
                            EU Materiality Threshold: {car.materiality.threshold}% allowed deviation
                          </p>
                          <p
                            className={`text-xs font-semibold ${
                              car.materiality.withinThreshold
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            Found: {car.materiality.deviationFound}% {car.materiality.withinThreshold ? '✓ WITHIN' : '✗ EXCEEDS'} threshold
                          </p>
                        </div>
                      )}

                      <Button variant="outline" size="sm" className="w-full">
                        Review Response & Close
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Anomalies Tab */}
        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detected Data Anomalies</CardTitle>
              <CardDescription>ML and rule-based anomalies from validation pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {underReview.flatMap((sub, idx) =>
                  sub.validationResults.flatMap(vr =>
                    vr.anomalies.map((anom, aidx) => (
                      <div
                        key={`${idx}-${aidx}`}
                        className={`border-2 rounded-lg p-3 ${getAnomalySeverityColor(anom.severity)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-2">
                            {anom.severity === 'critical' ? (
                              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <h5 className="font-semibold text-sm">{anom.description}</h5>
                              <p className="text-xs mt-1">
                                {sub.id} • {anom.fieldName}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              anom.type.includes('ml') ? 'bg-purple-100' : 'bg-gray-100'
                            }`}
                          >
                            {anom.type.replace('-', ' ')}
                          </Badge>
                        </div>

                        {anom.deviationPercentage && (
                          <p className="text-xs mt-2">
                            Deviation: <span className="font-semibold">{anom.deviationPercentage}%</span>
                            {anom.historicalContext && ` - ${anom.historicalContext}`}
                          </p>
                        )}

                        {anom.detectedValue !== undefined && (
                          <p className="text-xs mt-1">
                            Detected: <span className="font-mono">{anom.detectedValue}</span>
                            {anom.expectedRange && (
                              <> (expected: {anom.expectedRange[0]}-{anom.expectedRange[1]})</>
                            )}
                          </p>
                        )}
                      </div>
                    ))
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Reports Tab */}
        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Verification Reports Ready for Check-Verification
              </CardTitle>
              <CardDescription>Reports completed and awaiting independent check-verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {verificationComplete.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No verification reports complete yet
                  </p>
                ) : (
                  verificationComplete.map(sub => (
                    <div key={sub.id} className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{sub.id}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {sub.sector} • {sub.reportingPeriod}
                          </p>
                          {sub.geiCalculation && (
                            <div className="mt-2 flex gap-3">
                              <div>
                                <p className="text-xs text-muted-foreground">Verified GEI</p>
                                <p className="font-semibold">
                                  {sub.geiCalculation.gei.toFixed(2)} kg CO2e/tonne
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Performance</p>
                                <p className="font-semibold">
                                  {sub.geiCalculation.performanceStatus === 'over-performer' ? (
                                    <span className="text-green-600">
                                      {formatCCCAmount(sub.geiCalculation.cccSurplus)}
                                    </span>
                                  ) : (
                                    <span className="text-red-600">
                                      {formatCCCAmount(sub.geiCalculation.cccDeficit)}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button variant="default" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Download Report
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
