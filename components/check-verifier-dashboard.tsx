'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock Check-Verifier assignments  
const mockAssignments = [
  {
    id: 'CV-2024-001',
    submissionId: 'SUB-2024-Q1-ECW',
    entity: 'Eastern Cement Works',
    quarter: 'Q1 2024',
    acvaVerifier: 'Dr. Priya Sharma (TUV-SUD)',
    acvaStatus: 'verified-with-comments',
    comments: 3,
    status: 'pending-audit',
    assignedDate: '2024-03-30',
    priority: 'high'
  },
  {
    id: 'CV-2024-002',
    submissionId: 'SUB-2024-Q2-GSM',
    entity: 'Green Steel Manufacturing',
    quarter: 'Q2 2024',
    acvaVerifier: 'Dr. Priya Sharma (TUV-SUD)',
    acvaStatus: 'verified',
    comments: 0,
    status: 'ready-for-audit',
    assignedDate: '2024-06-25',
    priority: 'medium'
  }
]

export function CheckVerifierDashboard() {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null)

  const pendingCount = mockAssignments.filter(a => a.status === 'pending-audit').length
  const readyCount = mockAssignments.filter(a => a.status === 'ready-for-audit').length
  const completedCount = mockAssignments.filter(a => a.status === 'completed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Independent Verification Audit</h1>
        <p className="text-muted-foreground">Review ACVA findings and conduct independent verification checks</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ready for Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{readyCount}</p>
            <p className="text-xs text-muted-foreground mt-1">No ACVA comments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Audits Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Sent to BEE Officer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">94%</p>
            <p className="text-xs text-muted-foreground mt-1">Data integrity score</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Assignment Queue */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Audit Queue</CardTitle>
              <CardDescription>Submissions assigned for independent verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockAssignments.map(assignment => (
                <button
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedAssignment === assignment.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-border hover:border-slate-500 hover:bg-slate-700/30'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm text-foreground">{assignment.entity}</p>
                      <Badge variant={assignment.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {assignment.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{assignment.quarter}</p>
                    <div className="flex gap-2">
                      {assignment.status === 'pending-audit' ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">
                          Pending Review
                        </span>
                      ) : assignment.status === 'ready-for-audit' ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                          Ready for Audit
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                          Audit Complete
                        </span>
                      )}
                      {assignment.comments > 0 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-300">
                          {assignment.comments} ACVA Comments
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Audit Details */}
        <div className="lg:col-span-2 space-y-4">
          {selectedAssignment && mockAssignments.find(a => a.id === selectedAssignment) ? (
            (() => {
              const assignment = mockAssignments.find(a => a.id === selectedAssignment)!
              return (
                <>
                  {/* Assignment Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{assignment.entity}</CardTitle>
                          <CardDescription className="mt-2">{assignment.quarter}</CardDescription>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          assignment.status === 'pending-audit'
                            ? 'bg-orange-500/20 text-orange-300'
                            : assignment.status === 'ready-for-audit'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {assignment.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* ACVA Review Status */}
                  <Alert className="border-blue-500/30 bg-blue-900/10">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="ml-2 text-blue-300">
                      ACVA Verifier: {assignment.acvaVerifier}
                      {assignment.comments > 0 && ` • ${assignment.comments} comments issued`}
                    </AlertDescription>
                  </Alert>

                  {/* Audit Workflow */}
                  <Card className="border-emerald-500/30 bg-emerald-900/10">
                    <CardHeader>
                      <CardTitle className="text-emerald-300">Independent Verification Checklist</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {/* Verification items */}
                        {[
                          { title: 'Data Schema Verification', desc: 'Confirm all required fields present and valid format' },
                          { title: 'Baseline Consistency Review', desc: 'Cross-check against industry baseline and BEE standards' },
                          { title: 'Emission Factor Validation', desc: 'Verify correct emission factors used per latest guidelines' },
                          { title: 'Variance Analysis', desc: 'Investigate any unusual outliers or seasonal variations' },
                          { title: 'ACVA Comments Resolution', desc: `${assignment.comments > 0 ? assignment.comments : 'No'} comments to review and validate` }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                            <input
                              type="checkbox"
                              className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
                              defaultChecked={idx < 2}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground">{item.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Audit Decision */}
                      <div className="space-y-3 pt-4 border-t border-slate-600">
                        <label className="text-sm font-semibold text-foreground">Audit Decision</label>
                        <div className="space-y-2">
                          <button className="w-full px-4 py-3 rounded-lg border-2 border-emerald-500 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold transition-all">
                            <CheckCircle2 className="w-4 h-4 inline mr-2" />
                            Approve - Pass Independent Audit
                          </button>
                          <button className="w-full px-4 py-3 rounded-lg border-2 border-amber-500 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 font-semibold transition-all">
                            <AlertCircle className="w-4 h-4 inline mr-2" />
                            Conditional - Return to ACVA for Clarification
                          </button>
                          <button className="w-full px-4 py-3 rounded-lg border-2 border-red-500 bg-red-600/20 hover:bg-red-600/30 text-red-300 font-semibold transition-all">
                            <AlertCircle className="w-4 h-4 inline mr-2" />
                            Reject - Fails Independent Audit
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Send to BEE Officer */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Send to BEE Officer
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                  </div>
                </>
              )
            })()
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-semibold mb-2">Select an assignment</p>
                <p className="text-sm text-muted-foreground">Choose a submission from the queue to review audit findings</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
