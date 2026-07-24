'use client'

import React from 'react'
import { useRole } from '@/lib/role-context'
import { AppShell } from '@/components/app-shell'
import { AdminDashboard } from '@/components/admin-dashboard'
import { AlertCircle } from 'lucide-react'

export default function AdminPage() {
  const { currentRole } = useRole()

  // Only allow admin role to access this page
  const isAdmin = currentRole === 'dmrv-admin'

  if (!isAdmin) {
    return (
      <AppShell currentPage="dashboard">
        <div className="flex items-center justify-center min-h-screen">
          <div className="rounded-lg border border-red-500/30 bg-red-900/10 p-8 max-w-md text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              Only DMRV Administrators can access data integration management.
            </p>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell currentPage="admin">
      <AdminDashboard />
    </AppShell>
  )
}
