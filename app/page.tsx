'use client'

import React from 'react'
import { useRole } from '@/lib/role-context'
import { RoleSelector } from '@/components/role-selector'
import { AppShell } from '@/components/app-shell'
import { DashboardOverview } from '@/components/dashboard-overview'
import { mockLifecycleEvents } from '@/lib/mock-data'

export default function Page() {
  const { currentRole } = useRole()

  if (!currentRole) {
    return <RoleSelector />
  }

  return (
    <AppShell currentPage="dashboard" lifecycleEvents={mockLifecycleEvents}>
      <DashboardOverview />
    </AppShell>
  )
}
