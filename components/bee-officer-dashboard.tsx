'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, AlertCircle, Clock, ArrowRight, FileText, Zap, Lock } from 'lucide-react'
import Link from 'next/link'
import { MultiStepCCCIssuance } from '@/components/multi-step-ccc-issuance'

// Mock BEE approval queue
const mockApprovalQueue = [
  {
    id: 'BEE-2024-001',
    submissionId: 'SUB-2024-Q1-ECW',
    entity: 'Eastern Cement Works',
    quarter: 'Q1 2024',
    acvaVerifier: 'Dr. Priya Sharma (TUV-SUD)',
    checkVerifier: 'Bureau Veritas',
    checkStatus: 'approved',
    gei: 1361.84,
    geiUnit: 'kg CO2e/tonne',
    performanceStatus: 'over-performer',
    baseline: 1520.50,
    cccSurplus: 19288,
    status: 'awaiting-approval',
    dataQuality: 94,
    priority: 'high',
    submittedDate: '2024-02-15',
    checkVerifiedDate: '2024-04-01'
  },
  {
    id: 'BEE-2024-002',
    submissionId: 'SUB-2024-Q1-GSM',
    entity: 'Green Steel Manufacturing',
    quarter: 'Q1 2024',
    acvaVerifier: 'Dr. Priya Sharma (TUV-SUD)',
    checkVerifier: 'Bureau Veritas',
    checkStatus: 'approved',
    gei: 2145.30,
    geiUnit: 'kg CO2e/tonne',
    performanceStatus: 'under-performer',
    baseline: 1850.00,
    cccDeficit: 5200,
    status: 'awaiting-approval',
    dataQuality: 91,
    priority: 'medium',
    submittedDate: '2024-02-20',
    checkVerifiedDate: '2024-03-31'
  },
  {
    id: 'BEE-2024-003',
    submissionId: 'SUB-2024-Q1-SES',
    entity: 'Sustainable Energy Solutions',
    quarter: 'Q1 2024',
    acvaVerifier: 'Dr. Priya Sharma (TUV-SUD)',
    checkVerifier: 'Bureau Veritas',
    checkStatus: 'approved',
    gei: 1.567,
    geiUnit: 'kg CO2e/MWh',
    performanceStatus: 'over-performer',
    baseline: 2.150,
    cccSurplus: 12450,
    status: 'approved',
    dataQuality: 96,
    priority: 'medium',
    submittedDate: '2024-02-10',
    checkVerifiedDate: '2024-03-25',
    approvalDate: '2024-04-02',
    cccCertificateId: 'CCC-2024-Q1-001'
  }
]

export function BEEOfficerDashboard() {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [approvingId, setApprovingId] = useState<string | null>(null)

  const awaitingCount = mockApprovalQueue.filter(a => a.status === 'awaiting-approval').length
  const approvedCount = mockApprovalQueue.filter(a => a.status === 'approved').length
  const totalCCCs = mockApprovalQueue.reduce((sum, a) => {
    if (a.cccSurplus) return sum + a.cccSurplus
    return sum
  }, 0)

  const selectedApp = mockApprovalQueue.find(a => a.id === selectedApplication)

  const handleApprove = async () => {
    if (!selectedApp) return
    setApprovingId(selectedApp.id)
    // Simulate approval process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setApprovingId(null)
    alert(`CCC Certificate Generated!\nCertificate ID: CCC-2024-Q1-${String(approvedCount + 1).padStart(3, '0')}\n\nEntity: ${selectedApp.entity}\nCCCs: ${selectedApp.cccSurplus || selectedApp.cccDeficit}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Carbon Credit Certificate (CCC) Approval & Issuance</h1>
        <p className="text-muted-foreground">BEE Officer Portal | Final Verification & CCC Generation</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{awaitingCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Check-verified submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">CCCs Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">{approvedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total CCCs Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{totalCCCs.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting + Approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">94%</p>
            <p className="text-xs text-muted-foreground mt-1">Confidence score</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Approval Queue */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approval Queue</CardTitle>
              <CardDescription>Submissions ready for CCC issuance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockApprovalQueue.map(application => (
                <button
                  key={application.id}
                  onClick={() => setSelectedApplication(application.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedApplication === application.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-border hover:border-slate-500 hover:bg-slate-700/30'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm text-foreground">{application.entity}</p>
                      {application.status === 'awaiting-approval' ? (
                        <Badge variant="destructive" className="text-xs">Pending</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs bg-emerald-600/20 text-emerald-300">Approved</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{application.quarter}</p>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        application.performanceStatus === 'over-performer'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {application.performanceStatus === 'over-performer' ? '↑ Over-performer' : '↓ Under-performer'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                        DQ: {application.dataQuality}%
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Approval Details */}
        <div className="lg:col-span-2 space-y-4">
          {selectedApp ? (
            <>
              {/* Application Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedApp.entity}</CardTitle>
                      <CardDescription className="mt-2">{selectedApp.quarter}</CardDescription>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      selectedApp.status === 'awaiting-approval'
                        ? 'bg-orange-500/20 text-orange-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {selectedApp.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
              </Card>

              {/* Verification Status */}
              <Alert className="border-blue-500/30 bg-blue-900/10">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="ml-2 text-blue-300">
                  ACVA: {selectedApp.acvaVerifier} • Check-Verified: {selectedApp.checkVerifier} ✓
                </AlertDescription>
              </Alert>

              {/* GEI & Performance Analysis */}
              <Card className="border-emerald-500/30 bg-emerald-900/10">
                <CardHeader>
                  <CardTitle className="text-emerald-300">GEI Analysis & CCC Calculation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Calculated GEI</p>
                      <p className="text-2xl font-bold text-emerald-300">
                        {selectedApp.gei.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedApp.geiUnit}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                      <p className="text-xs font-medium text-muted-foreground mb-1">BEE Baseline</p>
                      <p className="text-2xl font-bold text-blue-300">
                        {selectedApp.baseline.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedApp.geiUnit}</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    selectedApp.performanceStatus === 'over-performer'
                      ? 'border-emerald-500/30 bg-emerald-900/10'
                      : 'border-red-500/30 bg-red-900/10'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedApp.performanceStatus === 'over-performer' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <p className="font-semibold text-emerald-300">Over-Performer (Below Baseline)</p>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <p className="font-semibold text-red-300">Under-Performer (Above Baseline)</p>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedApp.performanceStatus === 'over-performer'
                        ? `Entity qualifies for ${(selectedApp.cccSurplus || 0).toLocaleString()} CCC credits`
                        : `Entity has deficit of ${(selectedApp.cccDeficit || 0).toLocaleString()} credits`}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Data Quality Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${selectedApp.dataQuality}%` }}
                        />
                      </div>
                      <p className="text-lg font-bold text-blue-400">{selectedApp.dataQuality}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance & Final Checks */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Final Compliance Checks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { item: 'ACVA Verification Complete', status: true },
                    { item: 'Check-Verifier Approval Obtained', status: true },
                    { item: 'GEI Calculation Verified', status: true },
                    { item: 'Data Quality Above Threshold (>90%)', status: selectedApp.dataQuality >= 90 },
                    { item: 'No Outstanding Issues', status: selectedApp.status === 'awaiting-approval' || selectedApp.status === 'approved' }
                  ].map((check, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {check.status ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                      <span className={check.status ? 'text-foreground' : 'text-red-300'}>{check.item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* CCC Certificate */}
              {selectedApp.status === 'approved' && selectedApp.cccCertificateId ? (
                <Card className="border-emerald-500/30 bg-emerald-900/10">
                  <CardHeader>
                    <CardTitle className="text-emerald-300">CCC Certificate Issued</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-5 h-5 text-emerald-400" />
                        <p className="font-semibold text-emerald-300">Certificate ID</p>
                      </div>
                      <p className="text-lg font-mono text-foreground">{selectedApp.cccCertificateId}</p>
                      <p className="text-xs text-muted-foreground mt-2">Issued: {selectedApp.approvalDate}</p>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Link href="/icm-registry" className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Register on Blockchain
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Phase 2: Multi-Step CCC Issuance */}
                  <MultiStepCCCIssuance
                    submissionId={selectedApp.submissionId}
                    entityName={selectedApp.entity}
                    estimatedCCCs={selectedApp.cccSurplus || selectedApp.cccDeficit || 0}
                    currentStatus="check-verified"
                  />
                  <Button variant="outline" className="w-full">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Request Clarification
                  </Button>
                </>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-semibold mb-2">Select an application</p>
                <p className="text-sm text-muted-foreground">Choose a submission from the queue to review and approve</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
