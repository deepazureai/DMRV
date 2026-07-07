'use client'

import { AppShell } from '@/components/app-shell'
import { DashboardOverview } from '@/components/dashboard-overview'
import { mockLifecycleEvents } from '@/lib/mock-data'

export default function Page() {
  return (
    <AppShell currentPage="dashboard" lifecycleEvents={mockLifecycleEvents}>
      <DashboardOverview />
    </AppShell>
  )
}
