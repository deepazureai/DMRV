'use client'

import React from 'react'
import { useRole } from '@/lib/role-context'
import { LoginScreen } from '@/components/login-screen'
import { AppShell } from '@/components/app-shell'
import { RoleSpecificDashboard } from '@/components/role-specific-dashboard'
import { mockLifecycleEvents } from '@/lib/mock-data'

export default function Page() {
  const { currentRole } = useRole()

  if (!currentRole) {
    return <LoginScreen />
  }

  return (
    <AppShell currentPage="dashboard" lifecycleEvents={mockLifecycleEvents}>
      <RoleSpecificDashboard />
    </AppShell>
  )
}
