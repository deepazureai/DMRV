'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockBlockchainPackets, mockSubmissions } from '@/lib/mock-data'

export default function RegistryPage() {
  const registeredPackets = mockBlockchainPackets.filter(p => p.status === 'registered')

  return (
    <AppShell currentPage="registry">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Registry Operator Dashboard</h2>
          <p className="text-muted-foreground">Manage blockchain registry operations and carbon credit transactions</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Registered</p>
            <p className="mt-2 text-2xl font-bold text-primary">{registeredPackets.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Total CCCs Registered</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {registeredPackets.reduce((sum, p) => sum + p.cccAmount, 0).toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Network Status</p>
            <p className="mt-2 text-sm font-semibold text-emerald-600">✓ Connected</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Last Sync</p>
            <p className="mt-2 text-sm font-semibold text-foreground">Just now</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Registered Transactions</h3>
          {registeredPackets.map((packet) => (
            <div key={packet.id} className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Packet: {packet.id}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Registered on {new Date(packet.registeredAt || '').toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">CCCs</p>
                  <p className="text-lg font-bold text-green-600">{packet.cccAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
