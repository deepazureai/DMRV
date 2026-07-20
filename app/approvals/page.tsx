'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { useRole } from '@/lib/role-context'
import { ApprovalsQueuePage } from '@/components/approvals-queue-page'

export default function ApprovalsPage() {
  const router = useRouter()
  const { currentRole } = useRole()

  // Only BEE Regulator and Sector Officer can access approvals
  React.useEffect(() => {
    if (currentRole && currentRole !== 'bee-regulator' && currentRole !== 'sector-officer') {
      router.push('/')
    }
  }, [currentRole, router])

  // If user doesn't have proper role, show access denied
  if (currentRole && currentRole !== 'bee-regulator' && currentRole !== 'sector-officer') {
    return (
      <AppShell currentPage="approvals">
        <div className="space-y-6 p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-900">Access Denied</h2>
            <p className="mt-2 text-sm text-red-800">
              Only BEE Regulator can access the approval queue. Please switch to the correct role.
            </p>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell currentPage="approvals">
      <div className="p-6">
        <ApprovalsQueuePage />
      </div>
    </AppShell>
  )
}
