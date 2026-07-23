'use client'

import React, { useState } from 'react'
import { DmrvSubmission, Query, DmrvActor } from '@/lib/dmrv-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertCircle,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  Download,
} from 'lucide-react'
import { formatCCCAmount } from '@/lib/gei-calculation-engine'

interface EntityDashboardProps {
  actor: DmrvActor
  submissions: DmrvSubmission[]
  queries: Query[]
  onViewSubmission: (submission: DmrvSubmission) => void
  onViewQuery: (query: Query) => void
}

export function EntityDashboard({
  actor,
  submissions,
  queries,
  onViewSubmission,
  onViewQuery,
}: EntityDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024-Q1')

  const currentSubmission = submissions.find(s => s.reportingPeriod === selectedPeriod)
  const openQueries = queries.filter(q => q.status === 'open')
  const respondedQueries = queries.filter(q => q.status === 'responded' && !q.closedAt)
  const closedQueries = queries.filter(q => q.status === 'closed' || q.closedAt)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      'data-validation': 'bg-yellow-100 text-yellow-800',
      'acva-review': 'bg-purple-100 text-purple-800',
      'acva-queries': 'bg-orange-100 text-orange-800',
      'acva-verification-report': 'bg-indigo-100 text-indigo-800',
      'check-verification': 'bg-teal-100 text-teal-800',
      'bee-assessment': 'bg-green-100 text-green-800',
      approved: 'bg-emerald-100 text-emerald-800',
      'ccc-issued': 'bg-lime-100 text-lime-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      draft: 'Draft',
      submitted: 'Submitted',
      'data-validation': 'Data Validation',
      'acva-review': 'Under ACVA Review',
      'acva-queries': 'ACVA Queries Raised',
      'acva-verification-report': 'Verification Report',
      'check-verification': 'Check Verification',
      'bee-assessment': 'BEE Assessment',
      approved: 'Approved by BEE',
      'ccc-issued': 'CCCs Issued',
      rejected: 'Rejected',
    }
    return labels[status] || status
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Obligated Entity Portal</h1>
        <p className="text-muted-foreground">
          {actor.organization} - Submission & Verification Dashboard
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{submissions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">All reporting periods</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{openQueries.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Requiring response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">CCC Projected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {currentSubmission?.geiCalculation?.cccSurplus
                ? `+${currentSubmission.geiCalculation.cccSurplus.toLocaleString()}`
                : currentSubmission?.geiCalculation?.cccDeficit
                  ? `-${currentSubmission.geiCalculation.cccDeficit.toLocaleString()}`
                  : '—'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{selectedPeriod} Q1 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {currentSubmission?.geiCalculation?.performanceStatus === 'over-performer' ? (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <p className="font-bold text-green-600">Exceeds Target</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <p className="font-bold text-red-600">Below Target</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">vs BEE baseline</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="raw-data">Raw Activity Data</TabsTrigger>
          <TabsTrigger value="queries">
            Queries & CARs
            {openQueries.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {openQueries.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="calculations">GEI Calculations</TabsTrigger>
        </TabsList>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>All submissions and their current status in the verification workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No submissions yet</p>
                ) : (
                  submissions.map(sub => (
                    <div
                      key={sub.id}
                      className="border rounded-lg p-4 flex items-start justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-foreground">{sub.id}</h4>
                          <Badge className={getStatusColor(sub.status)}>
                            {getStatusLabel(sub.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {sub.sector.charAt(0).toUpperCase() + sub.sector.slice(1)} • Period: {sub.reportingPeriod}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Submitted: {new Date(sub.submittedAt || '').toLocaleDateString()}</span>
                          <span>Files: {sub.uploadedFiles.length}</span>
                          {sub.geiCalculation && (
                            <span>GEI: {sub.geiCalculation.gei.toFixed(2)} kg CO2e/{sub.geiCalculation.geiUnit?.split('/')[1]}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewSubmission(sub)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Raw Activity Data Tab */}
        <TabsContent value="raw-data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Raw Activity Data</CardTitle>
              <CardDescription>Actual emissions data as submitted</CardDescription>
            </CardHeader>
            <CardContent>
              {currentSubmission ? (
                <div className="space-y-6">
                  {/* Fuel Consumption */}
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-foreground mb-3">Fuel Consumption</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {currentSubmission.activityData.coal !== undefined && (
                        <div className="bg-muted p-3 rounded">
                          <p className="text-xs text-muted-foreground">Coal</p>
                          <p className="text-lg font-bold">{currentSubmission.activityData.coal.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">tonne</p>
                        </div>
                      )}
                      {currentSubmission.activityData.naturalGas !== undefined && (
                        <div className="bg-muted p-3 rounded">
                          <p className="text-xs text-muted-foreground">Natural Gas</p>
                          <p className="text-lg font-bold">{currentSubmission.activityData.naturalGas.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">m³</p>
                        </div>
                      )}
                      {currentSubmission.activityData.diesel !== undefined && currentSubmission.activityData.diesel > 0 && (
                        <div className="bg-muted p-3 rounded">
                          <p className="text-xs text-muted-foreground">Diesel</p>
                          <p className="text-lg font-bold">{currentSubmission.activityData.diesel.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">litre</p>
                        </div>
                      )}
                      {currentSubmission.activityData.biomass !== undefined && currentSubmission.activityData.biomass > 0 && (
                        <div className="bg-muted p-3 rounded border-2 border-green-500">
                          <p className="text-xs text-muted-foreground">Biomass (Renewable)</p>
                          <p className="text-lg font-bold text-green-600">{currentSubmission.activityData.biomass.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">tonne</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Electricity Consumption */}
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-foreground mb-3">Electricity Consumption</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {currentSubmission.activityData.gridElectricity !== undefined && (
                        <div className="bg-muted p-3 rounded">
                          <p className="text-xs text-muted-foreground">Grid Electricity</p>
                          <p className="text-lg font-bold">{currentSubmission.activityData.gridElectricity.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">MWh</p>
                        </div>
                      )}
                      {currentSubmission.activityData.captiveElectricity !== undefined && currentSubmission.activityData.captiveElectricity > 0 && (
                        <div className="bg-muted p-3 rounded">
                          <p className="text-xs text-muted-foreground">Captive Generation</p>
                          <p className="text-lg font-bold">{currentSubmission.activityData.captiveElectricity.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">MWh</p>
                        </div>
                      )}
                      {currentSubmission.activityData.renewableElectricity !== undefined && currentSubmission.activityData.renewableElectricity > 0 && (
                        <div className="bg-muted p-3 rounded border-2 border-green-500">
                          <p className="text-xs text-muted-foreground">Renewable Energy</p>
                          <p className="text-lg font-bold text-green-600">{currentSubmission.activityData.renewableElectricity.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">MWh</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Production Output */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Production Output</h4>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-muted-foreground">Total Output</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {currentSubmission.activityData.productionOutput.toLocaleString()}{' '}
                        <span className="text-sm">{currentSubmission.activityData.outputUnit}</span>
                      </p>
                    </div>
                  </div>

                  {/* Evidence Files */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-3">Supporting Documentation</h4>
                    <div className="space-y-2">
                      {currentSubmission.uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border rounded bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB • {file.documentType}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Select a reporting period with submissions to view raw data
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Queries & CARs Tab */}
        <TabsContent value="queries" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Open Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">{openQueries.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Awaiting ACVA Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{respondedQueries.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Resolved Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{closedQueries.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Open Queries */}
          {openQueries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Pending Your Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {openQueries.map(query => (
                    <div
                      key={query.id}
                      className="border rounded p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onViewQuery(query)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-semibold text-sm">{query.title}</h5>
                        <span className="text-xs text-red-600 font-medium">
                          Due {new Date(query.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{query.description}</p>
                      <Badge variant="outline">{query.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Responded Queries Awaiting ACVA Close */}
          {respondedQueries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Awaiting ACVA Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {respondedQueries.map(query => (
                    <div
                      key={query.id}
                      className="border rounded p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onViewQuery(query)}
                    >
                      <h5 className="font-semibold text-sm mb-2">{query.title}</h5>
                      <p className="text-xs text-muted-foreground mb-2">
                        You responded on {new Date(query.respondedAt || '').toLocaleDateString()}
                      </p>
                      <Badge variant="secondary">Response Submitted</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resolved Queries */}
          {closedQueries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Resolved Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {closedQueries.map(query => (
                    <div
                      key={query.id}
                      className="border rounded p-3 bg-green-50 dark:bg-green-950 hover:opacity-75 transition-opacity cursor-pointer"
                      onClick={() => onViewQuery(query)}
                    >
                      <h5 className="font-semibold text-sm mb-1">{query.title}</h5>
                      {query.acvaComment && (
                        <p className="text-xs text-muted-foreground mb-2">ACVA: {query.acvaComment}</p>
                      )}
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Closed
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* GEI Calculations Tab */}
        <TabsContent value="calculations" className="space-y-4">
          {currentSubmission?.geiCalculation ? (
            <Card>
              <CardHeader>
                <CardTitle>GEI Calculation Breakdown - {currentSubmission.reportingPeriod}</CardTitle>
                <CardDescription>Emission Intensity = Total Emissions ÷ Production Output</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculation Components */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded border border-red-200 dark:border-red-800">
                    <p className="text-sm text-muted-foreground mb-2">Fuel Emissions</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {currentSubmission.geiCalculation.fuelEmissions.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">tCO2e</p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded border border-orange-200 dark:border-orange-800">
                    <p className="text-sm text-muted-foreground mb-2">Electricity Emissions</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {currentSubmission.geiCalculation.electricityEmissions.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">tCO2e</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded border border-purple-200 dark:border-purple-800">
                    <p className="text-sm text-muted-foreground mb-2">Total Emissions</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {currentSubmission.geiCalculation.totalEmissions.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">tCO2e</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-muted-foreground mb-2">Production Output</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {currentSubmission.activityData.productionOutput.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{currentSubmission.activityData.outputUnit}</p>
                  </div>
                </div>

                {/* GEI Result */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Calculated GEI</h4>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 p-6 rounded border border-indigo-200 dark:border-indigo-800">
                    <p className="text-sm text-muted-foreground mb-2">GHG Emission Intensity</p>
                    <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {currentSubmission.geiCalculation.gei.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">kg CO2e per {currentSubmission.activityData.outputUnit}</p>
                  </div>
                </div>

                {/* Performance vs Baseline */}
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-semibold">Performance vs BEE Baseline</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded border">
                      <p className="text-xs text-muted-foreground mb-2">BEE Baseline ({currentSubmission.geiCalculation.baselineVersion})</p>
                      <p className="text-xl font-bold">{currentSubmission.geiCalculation.beeBaselineGei}</p>
                      <p className="text-xs text-muted-foreground">kg CO2e per {currentSubmission.activityData.outputUnit}</p>
                    </div>

                    <div className="p-4 rounded border">
                      <p className="text-xs text-muted-foreground mb-2">Status</p>
                      <div className="flex items-center gap-2">
                        {currentSubmission.geiCalculation.performanceStatus === 'over-performer' ? (
                          <>
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-bold text-green-600">Over-Performer</p>
                              <p className="text-xs text-muted-foreground">Exceeds target (+{formatCCCAmount(currentSubmission.geiCalculation.cccSurplus)})</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-5 h-5 text-red-600" />
                            <div>
                              <p className="font-bold text-red-600">Under-Performer</p>
                              <p className="text-xs text-muted-foreground">Below target ({formatCCCAmount(currentSubmission.geiCalculation.cccDeficit)})</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ICAP Scores */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">EU ICAP Principles Compliance</h4>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Completeness</TableCell>
                        <TableCell>{currentSubmission.geiCalculation.completenessPercentage}%</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Complete
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Consistency</TableCell>
                        <TableCell>{currentSubmission.geiCalculation.consistencyScore}%</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Consistent
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Accuracy</TableCell>
                        <TableCell>{currentSubmission.geiCalculation.accuracyScore}%</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            Accurate
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-sm text-muted-foreground text-center">
                  Select a reporting period with submitted data to view GEI calculations
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
