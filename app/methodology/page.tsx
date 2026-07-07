'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'

export default function MethodologyPage() {
  return (
    <AppShell currentPage="methodology">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Methodology & CCC Calculation</h2>
          <p className="text-muted-foreground">Apply approved methodologies and calculate Carbon Credit Certificate estimates</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">ACM0013 - Optimization of energy systems</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Energy efficiency improvements in kiln operations and raw material sourcing optimization for cement production
            </p>
            <div className="space-y-3 mb-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs font-medium text-muted-foreground">Formula</p>
                <p className="mt-2 text-sm font-mono text-foreground">CCCs = (Baseline Energy - Project Energy) × CF</p>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Baseline Energy</p>
                  <p className="text-sm font-semibold text-foreground">450,000 MWh</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Project Energy</p>
                  <p className="text-sm font-semibold text-foreground">405,000 MWh</p>
                </div>
              </div>
            </div>
            <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              View Full Calculation
            </button>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Calculation Result</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                <p className="text-xs font-medium text-muted-foreground">Estimated CCC Generation</p>
                <p className="mt-2 text-3xl font-bold text-primary">14,850 CCCs</p>
                <p className="mt-2 text-xs text-muted-foreground">Q1 FY2026-27 Period</p>
              </div>
              <div className="grid gap-2 md:grid-cols-2 text-xs">
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-medium text-muted-foreground mb-1">Confidence Factor</p>
                  <p className="font-semibold text-foreground">0.95 (95%)</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-medium text-muted-foreground mb-1">Quality Score</p>
                  <p className="font-semibold text-foreground">87%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
