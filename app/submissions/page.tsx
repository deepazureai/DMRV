'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InteractiveSubmissions } from '@/components/interactive-submissions'
import { CarbonFileUploader } from '@/components/carbon-file-uploader'
import { mockLifecycleEvents } from '@/lib/mock-data'

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState('timeline')

  return (
    <AppShell currentPage="submissions" lifecycleEvents={mockLifecycleEvents}>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Submissions & Data Management</h1>
            <p className="text-muted-foreground">Upload activity data and manage formal submissions through the DMRV verification workflow</p>
          </div>

          {/* Workflow Explanation */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/5">
              <h3 className="font-semibold text-blue-400 mb-2">Activity Data Repository</h3>
              <p className="text-sm text-muted-foreground">Upload raw fuel, electricity, and production data. Records are parsed, validated, and stored for reference.</p>
            </div>
            <div className="p-4 rounded-lg border border-green-200 bg-green-50/5">
              <h3 className="font-semibold text-green-400 mb-2">Formal Submissions</h3>
              <p className="text-sm text-muted-foreground">Create formal submissions that bundle activity data, calculate GEI, and enter the DMRV verification workflow.</p>
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
        </div>
      </div>
    </AppShell>
  )
}
