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
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'complete' | 'error'>('idle')
  const [showValidationReport, setShowValidationReport] = useState(false)

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

  const handleImportFromICM = async () => {
    setIsImporting(true)
    setImportStatus('importing')
    setImportProgress(0)

    // Simulate import progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setImportProgress(i)
    }

    // Simulate completion
    await new Promise(resolve => setTimeout(resolve, 500))
    setImportProgress(100)
    setImportStatus('complete')
    setIsImporting(false)

    // Reset after 2 seconds
    setTimeout(() => {
      setImportStatus('idle')
      setImportProgress(0)
    }, 2000)
  }

  const handleExportValidationReport = () => {
    setShowValidationReport(true)
  }

  const downloadValidationReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      batchId: `BATCH-${Date.now()}`,
      totalEntities: stagingEntities.length,
      pendingReview: stagingEntities.filter(e => e.status === 'pending_review').length,
      approved: stagingEntities.filter(e => e.status === 'approved').length,
      rejected: stagingEntities.filter(e => e.status === 'rejected').length,
      entities: stagingEntities.map(e => ({
        id: e.id,
        name: e.name,
        status: e.status,
        dataQuality: e.dataQuality,
        duplicateFlags: e.duplicateFlags,
        validationIssues: e.validationIssues,
      })),
    }

    const dataStr = JSON.stringify(report, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `validation-report-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
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
      <div className="space-y-3">
        <div className="rounded-lg border border-border bg-card p-4 flex gap-3">
          <Button 
            className="gap-2 flex-1" 
            onClick={handleImportFromICM}
            disabled={isImporting}
          >
            <Upload className="w-4 h-4" />
            {isImporting ? 'Importing...' : 'Import New Batch from ICM'}
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 flex-1"
            onClick={handleExportValidationReport}
          >
            <Download className="w-4 h-4" />
            Export Validation Report
          </Button>
        </div>

        {/* Import Progress Bar */}
        {importStatus !== 'idle' && (
          <div className="rounded-lg border border-border bg-card p-4">
            {importStatus === 'importing' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Importing entities from ICM...</p>
                  <p className="text-sm font-semibold text-blue-400">{importProgress}%</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${importProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Processing batch data and running validation checks...</p>
              </div>
            )}
            {importStatus === 'complete' && (
              <div className="flex items-start gap-3 p-3 bg-emerald-900/20 rounded border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Import completed successfully!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stagingEntities.length} entities imported and ready for review. 
                    {stagingEntities.filter(e => e.status === 'pending_review').length} pending approval.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
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

      {/* Validation Report Modal */}
      {showValidationReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Validation Report</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Generated: {new Date().toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowValidationReport(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded border border-border p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total Entities</p>
                  <p className="text-2xl font-bold text-blue-400">{stagingEntities.length}</p>
                </div>
                <div className="rounded border border-amber-500/30 bg-amber-900/10 p-3">
                  <p className="text-xs text-amber-400 mb-1">Pending Review</p>
                  <p className="text-2xl font-bold text-amber-300">{pendingCount}</p>
                </div>
                <div className="rounded border border-emerald-500/30 bg-emerald-900/10 p-3">
                  <p className="text-xs text-emerald-400 mb-1">Approved</p>
                  <p className="text-2xl font-bold text-emerald-300">{approvedCount}</p>
                </div>
                <div className="rounded border border-red-500/30 bg-red-900/10 p-3">
                  <p className="text-xs text-red-400 mb-1">Rejected</p>
                  <p className="text-2xl font-bold text-red-300">{rejectedCount}</p>
                </div>
              </div>

              {/* Detailed Entity Report */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Entity Details</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {stagingEntities.map((entity) => (
                    <div key={entity.id} className="border border-border rounded p-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{entity.name}</p>
                          <p className="text-muted-foreground">{entity.registrationNumber}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(entity.status)}`}>
                          {entity.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full ${
                              entity.dataQuality >= 90
                                ? 'bg-emerald-500'
                                : entity.dataQuality >= 80
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${entity.dataQuality}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground">{entity.dataQuality}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  className="flex-1 gap-2"
                  onClick={downloadValidationReport}
                >
                  <Download className="w-4 h-4" />
                  Download JSON Report
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowValidationReport(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
