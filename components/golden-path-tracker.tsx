'use client'

import React from 'react'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface PathStep {
  id: string
  title: string
  description: string
  status: 'completed' | 'in_progress' | 'pending' | 'blocked'
  date?: string
  actor?: string
  details?: string[]
}

const goldenPathSteps: PathStep[] = [
  {
    id: 'submission',
    title: 'Data Submission',
    description: 'Entity submits Q1 FY2026-27 carbon credit data',
    status: 'completed',
    date: '2025-01-15',
    actor: 'Rajesh Kumar (ECWL)',
    details: [
      'Submitted 4 evidence files (CSV, PDF, reports)',
      'Total submission size: 12.1 MB',
      'Initial data validation: PASSED'
    ]
  },
  {
    id: 'quality',
    title: 'Data Quality Assessment',
    description: 'Automated and manual quality checks',
    status: 'completed',
    date: '2025-01-16',
    actor: 'System + Manual Review',
    details: [
      'Data Quality Score: 87%',
      '2 Minor exceptions identified and resolved',
      'All requirements satisfied'
    ]
  },
  {
    id: 'verification',
    title: 'Third-Party Verification',
    description: 'Independent verifier reviews submission',
    status: 'completed',
    date: '2025-01-25',
    actor: 'Michael Chen (Global Carbon Verification Ltd)',
    details: [
      'Verification completed in 9 days',
      'All documents validated',
      'CCC amount approved: 14,850'
    ]
  },
  {
    id: 'approval',
    title: 'BEE Regulatory Approval',
    description: 'Bureau of Energy Efficiency final approval',
    status: 'completed',
    date: '2025-02-01',
    actor: 'Dr. Amelia Singh (BEE)',
    details: [
      'Compliance verified',
      'Approved for blockchain registration',
      'Ready for registry publication'
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain Registry',
    description: 'CCCs registered on immutable ledger',
    status: 'completed',
    date: '2025-02-05',
    actor: 'Sarah Thompson (Registry Operator)',
    details: [
      'Hash: 0x8a9c4d2f7e1b3a9c4d2f7e1b3a9c4d2f...',
      'TX Hash: 0x5f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c...',
      'Permanently recorded and immutable'
    ]
  }
]

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-900/10 backdrop-blur-sm',
    borderColor: 'border-emerald-500/40'
  },
  in_progress: {
    icon: Clock,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/10 backdrop-blur-sm',
    borderColor: 'border-blue-500/40'
  },
  pending: {
    icon: AlertCircle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/10 backdrop-blur-sm',
    borderColor: 'border-amber-500/40'
  },
  blocked: {
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-900/10 backdrop-blur-sm',
    borderColor: 'border-red-500/40'
  }
}
}

export function GoldenPathTracker() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Golden Path: Eastern Cement Works Ltd</h2>
        <p className="text-muted-foreground">Q1 FY2026-27 submission exemplar through complete verification lifecycle</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {goldenPathSteps.map((step, idx) => {
          const config = statusConfig[step.status]
          const Icon = config.icon

          return (
            <div key={step.id} className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-6`}>
              {/* Step Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 rounded-full p-1 ${config.bgColor}`}>
                    <Icon className={`${config.color}`} size={24} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${config.color}`}>{step.title}</h3>
                    <p className="text-sm text-foreground">{step.description}</p>
                  </div>
                </div>
                {step.date && <time className="text-sm font-medium text-foreground">{step.date}</time>}
              </div>

              {/* Step Details */}
              {step.actor && (
                <div className="ml-14 mb-4 space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{step.actor}</p>
                  </div>

                  {step.details && step.details.length > 0 && (
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <div className={`h-1.5 w-1.5 rounded-full ${config.color}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Connection to Next Step */}
              {idx < goldenPathSteps.length - 1 && (
                <div className="ml-8 mt-4 flex items-center gap-2">
                  <div className="h-6 w-0.5 bg-muted" />
                  <span className="text-xs font-medium text-foreground">→ Next Step</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4 rounded-lg border border-emerald-500/40 bg-emerald-900/10 backdrop-blur-sm p-6">
        <div>
          <p className="text-xs font-medium text-emerald-400 mb-1">Total Duration</p>
          <p className="text-2xl font-bold text-emerald-300">21 days</p>
        </div>
        <div>
          <p className="text-xs font-medium text-emerald-400 mb-1">Data Quality</p>
          <p className="text-2xl font-bold text-emerald-300">87%</p>
        </div>
        <div>
          <p className="text-xs font-medium text-emerald-400 mb-1">CCCs Verified</p>
          <p className="text-2xl font-bold text-emerald-300">14,850</p>
        </div>
        <div>
          <p className="text-xs font-medium text-emerald-400 mb-1">Status</p>
          <p className="text-2xl font-bold text-emerald-300">Registered</p>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold text-foreground">Key Takeaways</h3>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-1 text-primary">✓</span>
            <span>Complete end-to-end workflow from submission to blockchain registration</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-primary">✓</span>
            <span>All data quality issues resolved through collaborative problem-solving</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-primary">✓</span>
            <span>Transparent verification process with clear communication at each stage</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-primary">✓</span>
            <span>Permanent immutable record on blockchain for perpetual auditability</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
