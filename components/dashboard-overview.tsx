'use client'

import React from 'react'
import { DashboardStats, mockDashboardStats, mockModuleWorkflows } from '@/lib/mock-data'
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
}

function StatCard({ label, value, change, icon, trend = 'up' }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {change && (
            <p className={`text-xs font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  )
}

interface WorkflowCardProps {
  moduleName: string
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  progress: number
  currentStep: string
}

function WorkflowCard({ moduleName, status, progress, currentStep }: WorkflowCardProps) {
  const statusColors = {
    pending: 'bg-slate-100 text-slate-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    blocked: 'bg-red-100 text-red-700'
  }

  const statusIcons = {
    pending: <Clock size={16} />,
    in_progress: <TrendingUp size={16} />,
    completed: <CheckCircle size={16} />,
    blocked: <AlertCircle size={16} />
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{moduleName}</h3>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${statusColors[status]}`}>
          {statusIcons[status]}
          {status.replace('_', ' ')}
        </span>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{currentStep}</p>
      <div className="mb-2 flex items-center justify-between">
        <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="ml-2 text-xs font-medium text-muted-foreground">{progress}%</span>
      </div>
    </div>
  )
}

export function DashboardOverview() {
  const stats = mockDashboardStats
  const workflows = mockModuleWorkflows

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Executive Command Centre</h2>
        <p className="text-muted-foreground">Real-time overview of carbon verification and registry operations</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Entities"
          value={stats.totalEntities}
          change="+15 this month"
          trend="up"
          icon={<TrendingUp className="text-emerald-600" size={24} />}
        />
        <StatCard
          label="Active Projects"
          value={stats.activeProjects}
          change="+42 this quarter"
          trend="up"
          icon={<CheckCircle className="text-blue-600" size={24} />}
        />
        <StatCard
          label="Pending Submissions"
          value={stats.pendingSubmissions}
          change="-8 from last week"
          trend="down"
          icon={<Clock className="text-amber-600" size={24} />}
        />
        <StatCard
          label="Verified CCCs"
          value={`${(stats.verifiedCCCs / 1000000).toFixed(2)}M`}
          change={`+${(stats.verifiedCCCs / 100000).toFixed(0)}K this quarter`}
          trend="up"
          icon={<TrendingUp className="text-green-600" size={24} />}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Registered CCCs"
          value={`${(stats.registeredCCCs / 1000000).toFixed(2)}M`}
          change="73.7% of verified CCCs"
          trend="stable"
        />
        <StatCard
          label="Avg Data Quality"
          value={`${stats.averageDataQuality}%`}
          change="Target: 85%"
          trend="stable"
        />
        <StatCard
          label="Active Issues"
          value={stats.blockedIssues}
          change={`${stats.totalExceptions} total exceptions`}
          trend="up"
        />
      </div>

      {/* Module Workflow Status */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Module Workflow Status</h3>
          <p className="text-sm text-muted-foreground">Progress tracking across all 9 operational modules</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((wf) => (
            <WorkflowCard
              key={wf.moduleId}
              moduleName={wf.moduleName}
              status={wf.status}
              progress={wf.progress}
              currentStep={wf.currentStep}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Golden Path: ECWL Q1 FY2026-27</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplar submission demonstrating complete verification workflow from submission to blockchain registry
          </p>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            View Details
          </button>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Health</span>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                ✓ Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Blockchain Gateway</span>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                ✓ Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Processing</span>
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                ⟳ Processing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
