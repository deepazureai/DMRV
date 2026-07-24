'use client'

import React, { useState } from 'react'
import { Download, Upload, CheckCircle2, AlertCircle, Clock, Trash2, Copy, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StagingEntity {
  id: string
  name: string
  sector: string
  location: string
  registrationNumber: string
  icmRegistrationDate: string
  status: 'pending_review' | 'approved' | 'rejected'
  dataQuality: number
  duplicateFlags: string[]
  validationIssues: string[]
  importedAt: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

const mockStagingEntities: StagingEntity[] = [
  {
    id: 'STAGE-001',
    name: 'RenewTech Solar Solutions',
    sector: 'renewable_energy',
    location: 'Karnataka',
    registrationNumber: 'ICM-2024-RE-001',
    icmRegistrationDate: '2024-03-15',
    status: 'pending_review',
    dataQuality: 92,
    duplicateFlags: [],
    validationIssues: [],
    importedAt: '2024-03-20T08:15:00Z',
  },
  {
    id: 'STAGE-002',
    name: 'Green Hydrogen Manufacturing',
    sector: 'renewable_energy',
    location: 'Tamil Nadu',
    registrationNumber: 'ICM-2024-GH-002',
    icmRegistrationDate: '2024-03-18',
    status: 'pending_review',
    dataQuality: 87,
    duplicateFlags: ['Possible duplicate: Hydrogen Tech Ltd in ICM'],
    validationIssues: ['Missing calibration certificate expiry date'],
    importedAt: '2024-03-20T08:15:00Z',
  },
  {
    id: 'STAGE-003',
    name: 'Sustainable Cement Industries',
    sector: 'industrial_processes',
    location: 'Madhya Pradesh',
    registrationNumber: 'ICM-2024-CI-003',
    icmRegistrationDate: '2024-03-19',
    status: 'pending_review',
    dataQuality: 95,
    duplicateFlags: [],
    validationIssues: [],
    importedAt: '2024-03-20T09:45:00Z',
  },
  {
    id: 'STAGE-004',
    name: 'Biogas Energy Corp',
    sector: 'renewable_energy',
    location: 'Punjab',
    registrationNumber: 'ICM-2024-BG-004',
    icmRegistrationDate: '2024-03-17',
    status: 'approved',
    dataQuality: 89,
    duplicateFlags: [],
    validationIssues: [],
    importedAt: '2024-03-19T14:30:00Z',
    reviewedBy: 'Admin User',
    reviewedAt: '2024-03-20T10:00:00Z',
    notes: 'All validation checks passed. Approved for production database.'
  },
]

export function AdminDashboard() {
  const [stagingEntities, setStagingEntities] = useState<StagingEntity[]>(mockStagingEntities)
  const [selectedEntity, setSelectedEntity] = useState<StagingEntity | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const pendingCount = stagingEntities.filter(e => e.status === 'pending_review').length
  const approvedCount = stagingEntities.filter(e => e.status === 'approved').length
  const rejectedCount = stagingEntities.filter(e => e.status === 'rejected').length

  const handleApprove = (entityId: string) => {
    setStagingEntities(entities =>
      entities.map(e =>
        e.id === entityId
          ? {
              ...e,
              status: 'approved' as const,
              reviewedBy: 'Current Admin',
              reviewedAt: new Date().toISOString(),
              notes: reviewNotes || e.notes,
            }
          : e
      )
    )
    setReviewNotes('')
    setSelectedEntity(null)
  }

  const handleReject = (entityId: string) => {
    setStagingEntities(entities =>
      entities.map(e =>
        e.id === entityId
          ? {
              ...e,
              status: 'rejected' as const,
              reviewedBy: 'Current Admin',
              reviewedAt: new Date().toISOString(),
              notes: reviewNotes || 'Rejected by administrator',
            }
          : e
      )
    )
    setReviewNotes('')
    setSelectedEntity(null)
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      case 'approved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-emerald-400'
    if (quality >= 80) return 'text-blue-400'
    return 'text-amber-400'
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">ICM-DMRV Data Integration</h1>
        <p className="text-muted-foreground">Manage entity batch imports from ICM registry into DMRV production database</p>
      </div>

      {/* Import Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
          <p className="text-xs text-muted-foreground mt-2">entities awaiting validation</p>
        </div>
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/10 p-4">
          <p className="text-xs font-medium text-emerald-400 mb-1">Approved</p>
          <p className="text-2xl font-bold text-emerald-300">{approvedCount}</p>
          <p className="text-xs text-muted-foreground mt-2">moved to production</p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-900/10 p-4">
          <p className="text-xs font-medium text-red-400 mb-1">Rejected</p>
          <p className="text-2xl font-bold text-red-300">{rejectedCount}</p>
          <p className="text-xs text-muted-foreground mt-2">data quality issues</p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-900/10 p-4">
          <p className="text-xs font-medium text-blue-400 mb-1">Total Ingested</p>
          <p className="text-2xl font-bold text-blue-300">{stagingEntities.length}</p>
          <p className="text-xs text-muted-foreground mt-2">from ICM this batch</p>
        </div>
      </div>

      {/* Batch Import Actions */}
      <div className="rounded-lg border border-border bg-card p-4 flex gap-3">
        <Button className="gap-2 flex-1">
          <Upload className="w-4 h-4" />
          Import New Batch from ICM
        </Button>
        <Button variant="outline" className="gap-2 flex-1">
          <Download className="w-4 h-4" />
          Export Validation Report
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Staging Entities List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Staging Queue</h2>
          <div className="space-y-2">
            {stagingEntities.map((entity) => (
              <div
                key={entity.id}
                onClick={() => setSelectedEntity(entity)}
                className={`rounded-lg border p-3 cursor-pointer transition-all ${
                  selectedEntity?.id === entity.id
                    ? 'border-blue-500/50 bg-blue-900/10'
                    : 'border-border hover:border-blue-500/30 hover:bg-slate-900/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{entity.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(entity.status)}`}>
                        {entity.status === 'pending_review' ? 'Pending Review' : entity.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {entity.sector.replace('_', ' ')} • {entity.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${getQualityColor(entity.dataQuality)}`}>
                      {entity.dataQuality}%
                    </p>
                    <p className="text-xs text-muted-foreground">data quality</p>
                  </div>
                </div>

                {/* Issues or success indicator */}
                <div className="flex items-center gap-2 text-xs">
                  {entity.status === 'approved' && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approved • {entity.reviewedAt && new Date(entity.reviewedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  {entity.duplicateFlags.length > 0 && (
                    <div className="flex items-center gap-1 text-amber-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{entity.duplicateFlags.length} duplicate flag(s)</span>
                    </div>
                  )}
                  {entity.validationIssues.length > 0 && (
                    <div className="flex items-center gap-1 text-amber-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{entity.validationIssues.length} issue(s)</span>
                    </div>
                  )}
                  {entity.status === 'pending_review' && entity.duplicateFlags.length === 0 && entity.validationIssues.length === 0 && (
                    <div className="flex items-center gap-1 text-blue-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Ready for approval</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Panel */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Review Details</h3>

          {selectedEntity ? (
            <div className="space-y-4">
              {/* Entity Info */}
              <div className="space-y-2 pb-4 border-b border-border">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Entity Name</p>
                  <p className="text-sm font-semibold text-foreground">{selectedEntity.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">ICM Registration Number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono text-foreground">{selectedEntity.registrationNumber}</p>
                    <button
                      onClick={() => handleCopy(selectedEntity.registrationNumber, selectedEntity.id)}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      {copiedId === selectedEntity.id ? (
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Sector</p>
                    <p className="text-xs text-foreground capitalize">{selectedEntity.sector.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Location</p>
                    <p className="text-xs text-foreground">{selectedEntity.location}</p>
                  </div>
                </div>
              </div>

              {/* Validation Issues */}
              {selectedEntity.duplicateFlags.length > 0 && (
                <div className="space-y-2 pb-4 border-b border-border">
                  <p className="text-xs font-semibold text-amber-400">Duplicate Flags</p>
                  {selectedEntity.duplicateFlags.map((flag, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">• {flag}</p>
                  ))}
                </div>
              )}

              {selectedEntity.validationIssues.length > 0 && (
                <div className="space-y-2 pb-4 border-b border-border">
                  <p className="text-xs font-semibold text-amber-400">Data Quality Issues</p>
                  {selectedEntity.validationIssues.map((issue, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">• {issue}</p>
                  ))}
                </div>
              )}

              {/* Data Quality Score */}
              <div className="pb-4 border-b border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">Data Quality Score</p>
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                      style={{ width: `${selectedEntity.dataQuality}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold ${getQualityColor(selectedEntity.dataQuality)}`}>
                    {selectedEntity.dataQuality}%
                  </span>
                </div>
              </div>

              {/* Review Notes */}
              {selectedEntity.status === 'pending_review' && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Admin Review Notes</label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add validation notes before approval/rejection..."
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500"
                    rows={3}
                  />
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleApprove(selectedEntity.id)}
                      className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve to Prod
                    </Button>
                    <Button
                      onClick={() => handleReject(selectedEntity.id)}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}

              {/* Review Status */}
              {selectedEntity.status !== 'pending_review' && selectedEntity.reviewedAt && (
                <div className="p-3 bg-slate-900/50 rounded space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Review Status</p>
                  <p className="text-xs text-foreground">
                    <span className="font-semibold">{selectedEntity.reviewedBy}</span> • {new Date(selectedEntity.reviewedAt).toLocaleString()}
                  </p>
                  {selectedEntity.notes && (
                    <p className="text-xs text-muted-foreground mt-2">"{selectedEntity.notes}"</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Select an entity to review</p>
          )}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Integration Audit Trail</h3>
        <div className="space-y-2 text-xs text-muted-foreground max-h-48 overflow-y-auto">
          <p>✓ Batch import started: 2024-03-20 08:15 UTC</p>
          <p>✓ {stagingEntities.length} entities received from ICM registry</p>
          <p>✓ Data quality validation completed</p>
          <p>✓ Duplicate detection scanned</p>
          <p>✓ {approvedCount} entities approved and moved to production database</p>
          <p>• {pendingCount} entities pending administrator review</p>
          <p>✗ {rejectedCount} entities rejected - data quality issues flagged</p>
          <p>• Last sync: 2024-03-20 08:15 UTC from ICM master registry</p>
        </div>
      </div>
    </div>
  )
}
