'use client'

import React, { useState } from 'react'
import { useRole } from '@/lib/role-context'
import { AppShell } from '@/components/app-shell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InteractiveSubmissions } from '@/components/interactive-submissions'
import { CarbonFileUploader } from '@/components/carbon-file-uploader'
import { mockLifecycleEvents } from '@/lib/mock-data'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, AlertCircle } from 'lucide-react'

// Mock submissions for ACVA review queue
const acvaSubmissions = [
  {
    id: 'SUB-2024-Q1-ECW',
    entity: 'Eastern Cement Works',
    submitter: 'Amit Singh',
    quarter: 'Q1 2024',
    status: 'submitted',
    submittedDate: '2024-03-28',
    dataQuality: 94,
    recordCount: 90,
  },
  {
    id: 'SUB-2024-Q2-ECW',
    entity: 'Eastern Cement Works',
    submitter: 'Amit Singh',
    quarter: 'Q2 2024',
    status: 'in-review',
    submittedDate: '2024-06-25',
    dataQuality: 91,
    recordCount: 92,
  },
  {
    id: 'SUB-2024-Q1-GSM',
    entity: 'Green Steel Manufacturing',
    submitter: 'Rajesh Verma',
    quarter: 'Q1 2024',
    status: 'submitted',
    submittedDate: '2024-03-30',
    dataQuality: 89,
    recordCount: 88,
  },
]

export default function SubmissionsPage() {
  const { currentRole } = useRole()
  const [activeTab, setActiveTab] = useState('timeline')

  // For ACVA Verifier, show review queue instead of file uploader
  const isAcvaVerifier = currentRole === 'acva-verifier'
  const isEntity = currentRole === 'obligated-entity'

  return (
    <AppShell currentPage="submissions" lifecycleEvents={mockLifecycleEvents}>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {isAcvaVerifier ? 'Verification Queue' : 'Submissions & Data Management'}
            </h1>
            <p className="text-muted-foreground">
              {isAcvaVerifier
                ? 'Review submitted data and issue verification comments'
                : 'Upload activity data and manage formal submissions through the DMRV verification workflow'}
            </p>
          </div>

          {/* ACVA Verification Queue */}
          {isAcvaVerifier && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Submissions Awaiting Review</h2>
                <div className="space-y-2">
                  {acvaSubmissions.map((submission) => (
                    <Link key={submission.id} href={`/submissions/${submission.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-blue-500 hover:bg-slate-700/30 transition-all cursor-pointer group">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">{submission.entity}</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              submission.status === 'submitted'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {submission.status === 'submitted' ? 'New' : 'In Review'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {submission.quarter} • Submitted by {submission.submitter} on {submission.submittedDate}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs text-slate-400">
                            <span>Data Quality: {submission.dataQuality}%</span>
                            <span>Records: {submission.recordCount}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Entity Submission Interface */}
          {isEntity && (
            <>
              {/* Workflow Explanation */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/5">
                  <h3 className="font-semibold text-blue-400 mb-2">Activity Data Repository</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload raw fuel, electricity, and production data. Records are parsed, validated, and stored for reference.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-green-200 bg-green-50/5">
                  <h3 className="font-semibold text-green-400 mb-2">Formal Submissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Create formal submissions that bundle activity data, calculate GEI, and enter the DMRV verification workflow.
                  </p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="timeline">Formal Submissions</TabsTrigger>
                  <TabsTrigger value="carbon-data">Activity Data</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-6">
                  <InteractiveSubmissions />
                </TabsContent>

                <TabsContent value="carbon-data" className="mt-6">
                  <CarbonFileUploader />
                </TabsContent>
              </Tabs>
            </>
          )}

          {/* Other Roles */}
          {!isEntity && !isAcvaVerifier && (
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Submissions management is only available for Obligated Entities and ACVA Verifiers.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
