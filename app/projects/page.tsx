'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockProjects, getEntityById } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'

export default function ProjectsPage() {
  return (
    <AppShell currentPage="projects">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Projects</h2>
          <p className="text-muted-foreground">Offset and renewable energy projects registered in the system</p>
        </div>

        <div className="grid gap-4">
          {mockProjects.map((project) => {
            const entity = getEntityById(project.entityId)
            return (
              <div key={project.id} className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{entity?.name}</p>
                  </div>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                    {project.status}
                  </Badge>
                </div>

                <p className="mb-4 text-sm text-foreground">{project.description}</p>

                <div className="grid gap-4 md:grid-cols-4 mb-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Start Date</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Methodology</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{project.methodology}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Expected CCCs</p>
                    <p className="mt-1 text-sm font-semibold text-foreground text-green-600">{project.expectedCCCs.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
