'use client'

import React, { useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SubmissionState } from '@/lib/submission-context'
import { CarbonRecordsGrid } from '@/components/carbon-records-grid'

interface ApprovalDetailModalProps {
  submission: SubmissionState
  isOpen: boolean
  onClose: () => void
  onApprove: (cccAmount: number) => void
  isApproving: boolean
}

export function ApprovalDetailModal({
  submission,
  isOpen,
  onClose,
  onApprove,
  isApproving,
}: ApprovalDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'data' | 'findings' | 'regulatory'>('data')
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Mock carbon records
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

  const totalEmissions = mockRecords.reduce((sum, r) => sum + r.emissions, 0)
  const totalCredits = mockRecords.reduce((sum, r) => sum + r.credits, 0)

  const handleApproveClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirmApprove = () => {
    onApprove(totalCredits)
    setShowConfirmation(false)
  }

  return (
    <>
      {/* Main Approval Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Approve Submission & Generate Credits</DialogTitle>
            <DialogDescription>
              Submission ID: {submission.id} | Entity: {submission.entityId} | Status: Verified
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
              onClick={() => setActiveTab('findings')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'findings' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              Verification Findings
            </button>
            <button
              onClick={() => setActiveTab('regulatory')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'regulatory' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              Regulatory Checks
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

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900 font-medium mb-1">Total Emissions</p>
                    <p className="text-3xl font-bold text-blue-600">{totalEmissions.toLocaleString()}</p>
                    <p className="text-xs text-blue-800 mt-1">tCO2e</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-900 font-medium mb-1">Carbon Credits</p>
                    <p className="text-3xl font-bold text-green-600">{totalCredits.toLocaleString()}</p>
                    <p className="text-xs text-green-800 mt-1">Credits to issue</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-900 font-medium mb-1">Conversion Rate</p>
                    <p className="text-3xl font-bold text-purple-600">0.80</p>
                    <p className="text-xs text-purple-800 mt-1">Credits per tCO2e</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'findings' && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Verifier's Assessment</p>
                      <p className="text-sm text-green-800 mt-1">
                        Data quality is excellent. All records have been reviewed and validated. No critical anomalies detected.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Findings:</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm font-medium text-foreground">Data Quality: Excellent</p>
                      <p className="text-xs text-muted-foreground mt-1">100% of records valid with no errors</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm font-medium text-foreground">Anomalies: 0 Critical, 0 High</p>
                      <p className="text-xs text-muted-foreground mt-1">Minor warnings reviewed and accepted</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm font-medium text-foreground">Calculations: Verified</p>
                      <p className="text-xs text-muted-foreground mt-1">All emission factors and conversion rates confirmed</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm font-medium text-foreground">Methodology: CDM Compliant</p>
                      <p className="text-xs text-muted-foreground mt-1">Methodology matches stated energy sources and operations</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'regulatory' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Regulatory Compliance Checks</h3>

                <div className="space-y-3">
                  {/* Entity Certification */}
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-green-900">Entity Certification</p>
                        <p className="text-sm text-green-800 mt-1">Entity is registered and BEE certified</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Reporting Period */}
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-green-900">Reporting Period</p>
                        <p className="text-sm text-green-800 mt-1">Submission period (Q1 2024) is within valid range</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Data Completeness */}
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-green-900">Data Completeness</p>
                        <p className="text-sm text-green-800 mt-1">All required fields present and valid</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Calculation Compliance */}
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-green-900">Calculation Compliance</p>
                        <p className="text-sm text-green-800 mt-1">Emissions calculated using approved methodologies</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                  </div>

                  {/* BEE Registry */}
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-green-900">BEE Registry Clearance</p>
                        <p className="text-sm text-green-800 mt-1">No existing duplicates or conflicts in registry</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-2">Ready for Approval</p>
                  <p className="text-sm text-blue-800">
                    All regulatory checks passed. The submission is compliant and ready for carbon credit generation and blockchain registration.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="border-t p-4 gap-2">
            <Button variant="outline" onClick={onClose} disabled={isApproving}>
              Cancel
            </Button>
            <Button variant="outline" disabled={isApproving}>
              Request Corrections
            </Button>
            <Button
              onClick={handleApproveClick}
              disabled={isApproving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isApproving ? 'Approving...' : `Approve & Issue ${totalCredits.toLocaleString()} Credits`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Confirm Credit Approval
            </DialogTitle>
            <DialogDescription>
              You are about to approve this submission and generate carbon credits on the blockchain.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm font-medium text-amber-900 mb-3">Approval Summary:</p>
              <div className="space-y-2 text-sm text-amber-800">
                <div className="flex justify-between">
                  <span>Submission ID:</span>
                  <span className="font-medium">{submission.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entity:</span>
                  <span className="font-medium">{submission.entityId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Emissions:</span>
                  <span className="font-medium">{totalEmissions.toLocaleString()} tCO2e</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-bold">Carbon Credits to Issue:</span>
                  <span className="font-bold text-green-700">{totalCredits.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Final Approval Checklist:</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Verification findings are satisfactory</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>All regulatory checks have passed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Carbon credits amount is accurate</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Ready to register on blockchain</span>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmApprove} className="bg-green-600 hover:bg-green-700">
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
