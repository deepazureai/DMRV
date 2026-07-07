'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockEntities } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'

export default function EntitiesPage() {
  return (
    <AppShell currentPage="entities">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Entities Management</h2>
          <p className="text-muted-foreground">Register and manage participating organizations for carbon credit verification</p>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Entity Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Sector</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockEntities.map((entity) => (
                  <tr key={entity.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{entity.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{entity.sector.replace('_', ' ')}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{entity.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge
                        variant={entity.status === 'active' ? 'default' : entity.status === 'pending' ? 'outline' : 'secondary'}
                        className="capitalize"
                      >
                        {entity.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {entity.certifications.length > 0 ? entity.certifications.join(', ') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
