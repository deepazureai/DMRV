'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'

export default function SettingsPage() {
  return (
    <AppShell currentPage="settings">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Settings</h2>
          <p className="text-muted-foreground">Configure system parameters and user preferences</p>
        </div>

        <div className="grid gap-6 max-w-2xl">
          {/* System Configuration */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">System Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">API Endpoint</label>
                <input
                  type="text"
                  defaultValue="https://api.icm-digital-trust.local/v1"
                  className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Blockchain Network</label>
                <select className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                  <option>Mainnet (Production)</option>
                  <option>Testnet (Staging)</option>
                  <option>Local (Development)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Data Management</h3>
            <div className="space-y-3">
              <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Export Data
              </button>
              <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Generate Report
              </button>
              <button className="w-full rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                Clear Cache
              </button>
            </div>
          </div>

          {/* About */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">About</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Application:</strong> ICM Digital Trust Layer</p>
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Environment:</strong> Production</p>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
