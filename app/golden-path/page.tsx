'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { GoldenPathTracker } from '@/components/golden-path-tracker'
import { mockLifecycleEvents } from '@/lib/mock-data'

export default function GoldenPathPage() {
  return (
    <AppShell currentPage="dashboard" lifecycleEvents={mockLifecycleEvents}>
      <div className="space-y-8 p-6">
        {/* Hero Section */}
        <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
              <span className="text-lg">⭐</span>
              <span className="text-sm font-semibold text-primary">Exemplar Submission</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">The Golden Path</h1>
            <p className="text-lg text-muted-foreground mb-6">
              A complete walkthrough of an enterprise carbon credit submission demonstrating best practices across all nine modules of the ICM Digital Trust Layer
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">ENTITY</p>
                <p className="font-semibold text-foreground">Eastern Cement Works Ltd</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">PERIOD</p>
                <p className="font-semibold text-foreground">Q1 FY2026-27</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">VERIFIED CCCs</p>
                <p className="font-semibold text-foreground text-green-600">14,850</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <GoldenPathTracker />

        {/* Module Coverage */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Coverage: All 9 Modules</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { num: 1, name: 'Entity Onboarding', status: '✓ Complete' },
              { num: 2, name: 'Project Registration', status: '✓ Complete' },
              { num: 3, name: 'Boundary Setup', status: '✓ Complete' },
              { num: 4, name: 'Data Ingestion', status: '✓ Complete' },
              { num: 5, name: 'Data Quality', status: '✓ Complete' },
              { num: 6, name: 'Methodology Calc', status: '✓ Complete' },
              { num: 7, name: 'Evidence Mgmt', status: '✓ Complete' },
              { num: 8, name: 'Verifier Review', status: '✓ Complete' },
              { num: 9, name: 'BEE Approval', status: '✓ Complete' }
            ].map((mod) => (
              <div key={mod.num} className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-emerald-50 font-bold text-sm">
                    {mod.num}
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">{mod.status}</span>
                </div>
                <p className="font-medium text-foreground text-sm">{mod.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Key Metrics</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">87%</p>
              <p className="text-sm text-muted-foreground">Initial Data Quality Score</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">2</p>
              <p className="text-sm text-muted-foreground">Minor Exceptions Resolved</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600 mb-2">14,850</p>
              <p className="text-sm text-muted-foreground">Carbon Credits Verified</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">21</p>
              <p className="text-sm text-muted-foreground">Days from Submission to Registry</p>
            </div>
          </div>
        </div>

        {/* Stakeholder Journey */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Stakeholder Journey</h2>
          <div className="space-y-3">
            {[
              {
                role: 'Entity (ECWL)',
                actions: ['Register entity', 'Submit project', 'Upload evidence', 'Receive CCCs'],
                days: '1-15'
              },
              {
                role: 'Quality Assurance',
                actions: ['Validate data', 'Identify issues', 'Resolve exceptions', 'Approve quality'],
                days: '15-18'
              },
              {
                role: 'Verifier',
                actions: ['Review submission', 'Validate evidence', 'Calculate CCC', 'Issue verification'],
                days: '18-25'
              },
              {
                role: 'BEE Regulator',
                actions: ['Review verification', 'Ensure compliance', 'Approve registration', 'Authorize publish'],
                days: '25-28'
              },
              {
                role: 'Registry Operator',
                actions: ['Create packet', 'Sign transaction', 'Register on blockchain', 'Confirm immutability'],
                days: '28-35'
              }
            ].map((stake) => (
              <div key={stake.role} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{stake.role}</h3>
                  <span className="text-xs font-medium text-muted-foreground">Days {stake.days}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stake.actions.map((action) => (
                    <span key={action} className="inline-flex rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-blue-900">Best Practices from This Submission</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-2xl">📋</div>
              <div>
                <h3 className="font-semibold text-blue-900">Complete Documentation</h3>
                <p className="text-sm text-blue-800 mt-1">All required evidence files submitted with high-quality sensor data, certificates, and audit reports</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-blue-900">Proactive Issue Resolution</h3>
                <p className="text-sm text-blue-800 mt-1">Minor data quality issues identified and resolved collaboratively with clear explanations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">🔍</div>
              <div>
                <h3 className="font-semibold text-blue-900">Rigorous Methodology Application</h3>
                <p className="text-sm text-blue-800 mt-1">ACM0013 energy optimization methodology correctly applied with transparent calculations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">⛓</div>
              <div>
                <h3 className="font-semibold text-blue-900">Blockchain Immutability</h3>
                <p className="text-sm text-blue-800 mt-1">Final registration on blockchain ensures perpetual auditability and transparent history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
