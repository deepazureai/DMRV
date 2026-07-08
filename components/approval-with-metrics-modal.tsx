'use client'

import React, { useState } from 'react'
import { X, CheckCircle2, AlertCircle, TrendingDown, Copy, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataGridViewer } from '@/components/data-grid-viewer'

interface ApprovalWithMetricsModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  submission?: {
    id: string
    period: string
    dataQuality: number
    cccs: number
    submittedDate: string
    uploadedFiles?: Array<{
      name: string
      type: string
    }>
  }
  dataMetrics?: {
    deviation: number
    duplicateRecords: number
    exceptionRecords: number
    totalRecords: number
    averageQuality: number
  }
  gridData?: Array<Record<string, any>>
}

export function ApprovalWithMetricsModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  submission,
  dataMetrics,
  gridData
}: ApprovalWithMetricsModalProps) {
  const [checked, setChecked] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'summary' | 'data' | 'metrics'>('summary')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Final Approval Confirmation</h2>
              <p className="text-sm text-muted-foreground">Review all details before publishing to blockchain</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setSelectedTab('summary')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                selectedTab === 'summary'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setSelectedTab('metrics')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                selectedTab === 'metrics'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Data Quality Metrics
            </button>
            <button
              onClick={() => setSelectedTab('data')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                selectedTab === 'data'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Data Records
            </button>
          </div>

          {/* Summary Tab */}
          {selectedTab === 'summary' && submission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium mb-1">Period</p>
                  <p className="text-lg font-semibold text-blue-900">{submission.period}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-600 font-medium mb-1">Data Quality</p>
                  <p className="text-lg font-semibold text-green-900">{submission.dataQuality}%</p>
                  <span className="text-xs text-green-600">High Quality</span>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-xs text-emerald-600 font-medium mb-1">Carbon Credits</p>
                  <p className="text-lg font-semibold text-emerald-900">{submission.cccs.toLocaleString()}</p>
                  <span className="text-xs text-emerald-600">CCCs</span>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-xs text-purple-600 font-medium mb-1">Submitted</p>
                  <p className="text-sm font-semibold text-purple-900">{submission.submittedDate}</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 mb-1">Blockchain Immutability Warning</p>
                  <p className="text-sm text-amber-800">
                    Once approved and published, this submission will be registered on the blockchain with immutable records.
                    This action cannot be undone. Please verify all data is correct before proceeding.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metrics Tab */}
          {selectedTab === 'metrics' && dataMetrics && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Deviation (ML Outcome)</p>
                    <TrendingDown className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600 mb-1">{dataMetrics.deviation}</p>
                  <p className="text-sm text-muted-foreground">Records with deviation flags</p>
                  {dataMetrics.deviation > 0 && (
                    <div className="mt-2 p-2 bg-orange-50 rounded border border-orange-200">
                      <p className="text-xs text-orange-700">
                        {dataMetrics.deviation} record(s) show statistical deviation. Review recommended.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Duplicate Records</p>
                    <Copy className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600 mb-1">{dataMetrics.duplicateRecords}</p>
                  <p className="text-sm text-muted-foreground">Potential duplicate entries</p>
                  {dataMetrics.duplicateRecords > 0 && (
                    <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                      <p className="text-xs text-red-700">
                        {dataMetrics.duplicateRecords} duplicate record(s) detected. Consider deduplication.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Exception Records</p>
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-600 mb-1">{dataMetrics.exceptionRecords}</p>
                  <p className="text-sm text-muted-foreground">Records with exceptions</p>
                  {dataMetrics.exceptionRecords > 0 && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-xs text-yellow-700">
                        {dataMetrics.exceptionRecords} exception(s) found. Review details in data tab.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Quality Overview</p>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-1">{dataMetrics.averageQuality.toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">Average data quality score</p>
                  <p className="text-sm font-medium mt-2 text-green-700">
                    {dataMetrics.averageQuality >= 90 ? 'Excellent' : dataMetrics.averageQuality >= 80 ? 'Good' : 'Fair'} quality data
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900 mb-2">Recommendation</p>
                <p className="text-sm text-blue-800">
                  {dataMetrics.deviation > 0 || dataMetrics.duplicateRecords > 0
                    ? 'Consider reviewing flagged records before approval.'
                    : 'All metrics look good. Safe to approve and publish.'}
                </p>
              </div>
            </div>
          )}

          {/* Data Records Tab */}
          {selectedTab === 'data' && gridData && (
            <div className="space-y-4">
              <DataGridViewer data={gridData} fileName="Submission Records" />
            </div>
          )}

          {/* Checklist */}
          <div className="border-t pt-4">
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded border border-muted hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mt-1 rounded"
              />
              <span className="text-sm">
                I have reviewed all data, metrics, and records. I confirm this submission is ready for blockchain registry and
                understand this action is permanent and cannot be undone.
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-muted border-t px-6 py-4 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!checked || isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? 'Publishing...' : 'Approve & Publish'}
          </Button>
        </div>
      </div>
    </div>
  )
}
