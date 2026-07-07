'use client'

import React from 'react'
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface DashboardProps {
  stakeholder: 'entity' | 'verifier' | 'bee' | 'registry' | 'sector'
}

export function StakeholderDashboard({ stakeholder }: DashboardProps) {
  const configs: Record<string, any> = {
    entity: {
      title: 'Entity Dashboard',
      subtitle: 'Your project submissions and verification status',
      stats: [
        { label: 'Projects Active', value: 3, icon: '📁' },
        { label: 'Submissions Pending', value: 2, icon: '⏳' },
        { label: 'CCCs Verified', value: '47,350', icon: '✓' },
        { label: 'CCCs Registered', value: '14,850', icon: '⛓' }
      ],
      quickActions: [
        'Submit New Data',
        'View Evidence',
        'Track Verification',
        'Download Reports'
      ]
    },
    verifier: {
      title: 'Verifier Workbench',
      subtitle: 'Review and verify carbon credit submissions',
      stats: [
        { label: 'Pending Review', value: 8, icon: '🔍' },
        { label: 'Verified This Month', value: 24, icon: '✓' },
        { label: 'CCCs Approved', value: '142,600', icon: '💚' },
        { label: 'Avg Review Time', value: '7.2 days', icon: '⏱' }
      ],
      quickActions: [
        'Start Review',
        'View Evidence',
        'Calculate CCCs',
        'Issue Verification'
      ]
    },
    bee: {
      title: 'BEE Regulator Dashboard',
      subtitle: 'Regulatory oversight and compliance monitoring',
      stats: [
        { label: 'Awaiting Approval', value: 5, icon: '👮' },
        { label: 'Approved This Month', value: 18, icon: '✅' },
        { label: 'Total Entities', value: 248, icon: '🏢' },
        { label: 'Compliance Rate', value: '98.5%', icon: '📊' }
      ],
      quickActions: [
        'Review Approval Queue',
        'Check Compliance',
        'Generate Reports',
        'Monitor Trends'
      ]
    },
    registry: {
      title: 'Registry Operator Dashboard',
      subtitle: 'Blockchain registry operations and transactions',
      stats: [
        { label: 'Pending Registration', value: 3, icon: '⏳' },
        { label: 'Registered This Month', value: 45, icon: '⛓' },
        { label: 'Total CCCs Registered', value: '2.1M', icon: '💰' },
        { label: 'Network Status', value: 'Operational', icon: '✓' }
      ],
      quickActions: [
        'Create Packet',
        'Sign Transaction',
        'View Registry',
        'Check Network'
      ]
    },
    sector: {
      title: 'Sector Officer Dashboard',
      subtitle: 'Sector-wide carbon credit analytics and reporting',
      stats: [
        { label: 'Sector Projects', value: 687, icon: '📈' },
        { label: 'Q1 Submissions', value: 156, icon: '📤' },
        { label: 'Sector CCCs', value: '2.8M', icon: '🌍' },
        { label: 'Growth Rate', value: '+12.4%', icon: '📊' }
      ],
      quickActions: [
        'View Analytics',
        'Generate Report',
        'Monitor Trends',
        'Stakeholder Coordination'
      ]
    }
  }

  const config = configs[stakeholder]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
        <p className="text-muted-foreground">{config.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {config.stats.map((stat: any, idx: number) => (
          <div key={idx} className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {config.quickActions.map((action: string, idx: number) => (
            <button
              key={idx}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
