'use client'

import React, { useState } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSubmissions, SubmissionState } from '@/lib/submission-context'
import { useRole } from '@/lib/role-context'
import { detectAnomalies, calculateQualityMetrics, getRecordStatus } from '@/lib/anomaly-detection'
import { AnomaliesPanel } from '@/components/anomalies-panel'
import { DataQualityAnalysis } from '@/components/data-quality-analysis'
import { CarbonRecordsGrid } from '@/components/carbon-records-grid'

interface VerificationDetailModalProps {
  submission: SubmissionState
  isOpen: boolean
  onClose: () => void
  onVerify: (notes: string) => void
  isVerifying: boolean
}

export function VerificationDetailModal({
  submission,
  isOpen,
  onClose,
  onVerify,
  isVerifying,
}: VerificationDetailModalProps) {
  const { userId } = useRole()
  const [activeTab, setActiveTab] = useState<'data' | 'analysis'>('data')
  const [notes, setNotes] = useState('')
  const [expandedAnomalyRecord, setExpandedAnomalyRecord] = useState<number | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Get mock carbon records for demonstration
  const mockRecords = [
    {
      facility_id: 'FAC-001',
      facility_name: 'Solar Farm A',
      energy_source: 'Solar',
      consumption: 15000,
      emissions: 0,
      credits: 0,
      date: '2024-01-15',
    },
    {
      facility_id: 'FAC-002',
      facility_name: 'Wind Farm B',
      energy_source: 'Wind',
      consumption: 25000,
      emissions: 500,
      credits: 400,
      date: '2024-01-15',
    },
    {
      facility_id: 'FAC-003',
      facility_name: 'Factory C',
      energy_source: 'Coal',
      consumption: 85000,
      emissions: 125000,
      credits: 100000,
      date: '2024-01-15',
    },
  ]

  const anomalies = detectAnomalies(mockRecords)
  const qualityMetrics = calculateQualityMetrics(mockRecords)

  const handleVerifyClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirmVerify = () => {
    onVerify(notes)
    setShowConfirmation(false)
  }

  return (
    <>
      {/* Main Verification Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Verify Submission</DialogTitle>
            <DialogDescription>
              Submission ID: {submission.id} | Entity: {submission.entityId} | Quality Score: {submission.qualityScore}%
            </DialogDescription>
          </DialogHeader>

          {/* Tabs */}
          <div className="flex border-b bg-muted/50">
            <button
              onClick={() => setActiveTab('data')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'data' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              Carbon Records
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'analysis' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              Quality Analysis
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Carbon Records Data</h3>
                  <CarbonRecordsGrid records={mockRecords} />
                </div>

                {anomalies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Detected Anomalies</h3>
                    <AnomaliesPanel
                      anomalies={anomalies}
                      expandedRecord={expandedAnomalyRecord}
                      onRecordClick={setExpandedAnomalyRecord}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Quality Analysis</h3>
                  <DataQualityAnalysis metrics={qualityMetrics} />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Verification Guidance</h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Check if data quality is acceptable for processing</li>
                    <li>Review all flagged anomalies and determine if they are legitimate</li>
                    <li>Verify methodology matches the declared energy sources</li>
                    <li>Confirm calculations are correct based on emission factors</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Verifier Notes */}
          <div className="border-t p-4">
            <label className="text-sm font-medium mb-2 block">Verification Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your verification findings, observations, or recommendations..."
              className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>

          {/* Footer */}
          <DialogFooter className="border-t p-4 gap-2">
            <Button variant="outline" onClick={onClose} disabled={isVerifying}>
              Cancel
            </Button>
            <Button variant="outline" disabled={isVerifying}>
              Request Corrections
            </Button>
            <Button
              onClick={handleVerifyClick}
              disabled={isVerifying}
              className="bg-green-600 hover:bg-green-700"
            >
              {isVerifying ? 'Verifying...' : 'Mark as Verified'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verification Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-green-600" />
              Confirm Verification
            </DialogTitle>
            <DialogDescription>
              You are about to verify this submission and move it to the approval queue.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900 mb-3">Verification Summary:</p>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>Submission ID:</span>
                  <span className="font-medium">{submission.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Quality:</span>
                  <span className="font-medium">{qualityMetrics.quality.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid Records:</span>
                  <span className="font-medium">
                    {qualityMetrics.validRecords}/{qualityMetrics.totalRecords}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Anomalies:</span>
                  <span className="font-medium">{qualityMetrics.anomalyCount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Verification Checklist:</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Data quality is acceptable</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>All anomalies have been reviewed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Calculations are correct</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Ready for regulatory approval</span>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmVerify} className="bg-green-600 hover:bg-green-700">
              Confirm Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
