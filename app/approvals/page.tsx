'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { ApprovalsQueuePage } from '@/components/approvals-queue-page'

export default function ApprovalsPage() {
  return (
    <AppShell currentPage="approvals">
      <div className="p-6">
        <ApprovalsQueuePage />
      </div>
    </AppShell>
  )
}
