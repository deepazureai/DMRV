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
            <h1 className="text-3xl font-bold text-foreground">Submissions</h1>
            <p className="text-muted-foreground">Manage your carbon credit submissions and data uploads</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="timeline">Submission Timeline</TabsTrigger>
              <TabsTrigger value="carbon-data">Carbon Data Upload</TabsTrigger>
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
