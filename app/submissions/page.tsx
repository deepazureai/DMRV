'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { InteractiveSubmissions } from '@/components/interactive-submissions'
import { mockLifecycleEvents } from '@/lib/mock-data'

export default function SubmissionsPage() {
  return (
    <AppShell currentPage="submissions" lifecycleEvents={mockLifecycleEvents}>
      <div className="p-6 max-w-7xl mx-auto">
        <InteractiveSubmissions />
      </div>
    </AppShell>
  )
}
