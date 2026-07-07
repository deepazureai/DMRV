'use client'

import React, { useState } from 'react'
import { Award, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSubmissions, SubmissionState } from '@/lib/submission-context'
import { useRole } from '@/lib/role-context'
import { calculateCCCAmount, generateBlockchainHash } from '@/lib/calculations'

interface RegulatorApprovalPanelProps {
  submission: SubmissionState
}

export function RegulatorApprovalPanel({ submission }: RegulatorApprovalPanelProps) {
  const { approveSubmission } = useSubmissions()
  const { userId } = useRole()
  const [notes, setNotes] = useState(submission.regulatorNotes || '')
  const [isApproving, setIsApproving] = useState(false)

  // Calculate CCC amount based on quality score and emissions
  const estimatedEmissions = submission.uploadedFiles.length * 5000 // Mock calculation
  const cccAmount = calculateCCCAmount({
    emissionsReduction: estimatedEmissions,
    verificationFactor: submission.qualityScore >= 80 ? 1.0 : 0.8,
    qualityScore: submission.qualityScore,
    projectType: 'renewable',
  })

  const handleApprove = () => {
    setIsApproving(true)
    setTimeout(() => {
      approveSubmission(submission.id, notes, userId, cccAmount)
      setIsApproving(false)
    }, 1000)
  }

  if (submission.status === 'draft' || submission.status === 'submitted') {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>This submission must be verified before regulatory approval.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* CCC Certificate Preview */}
      <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Carbon Credit Certificate</h3>
            <p className="text-sm text-muted-foreground">Digital Certification of Emissions Reduction</p>
          </div>
          <Award className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-3 bg-card p-4 rounded border">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Submission ID</span>
            <span className="font-mono font-semibold">{submission.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Estimated Emissions Reduction</span>
            <span className="font-semibold">{estimatedEmissions.toLocaleString()} tonnes CO₂</span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="text-sm text-muted-foreground font-medium">Carbon Credits (CCCs) Issued</span>
            <span className="text-2xl font-bold text-green-600">{cccAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Quality Score</span>
            <span className="font-semibold">{submission.qualityScore}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Certification Date</span>
            <span className="font-semibold">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Verification Summary */}
      {submission.verifierNotes && (
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Verifier Notes</h3>
          <p className="text-sm">{submission.verifierNotes}</p>
        </div>
      )}

      {/* Regulatory Notes */}
      <div>
        <label className="block text-sm font-medium mb-2">Regulatory Approval Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add regulatory decision and certification notes..."
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          disabled={submission.status === 'approved'}
        />
      </div>

      {/* Impact Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-muted rounded-lg text-center">
          <p className="text-xs text-muted-foreground">CO₂ Reduction</p>
          <p className="font-bold text-lg">{estimatedEmissions.toLocaleString()}</p>
          <p className="text-xs">tonnes</p>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <p className="text-xs text-muted-foreground">CCCs Issued</p>
          <p className="font-bold text-lg text-green-600">{cccAmount.toLocaleString()}</p>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <p className="text-xs text-muted-foreground">Market Value*</p>
          <p className="font-bold text-lg">₹{(cccAmount * 250).toLocaleString()}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">*Indicative at ₹250/CCC</p>

      {/* Actions */}
      {submission.status === 'verified' ? (
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" disabled={isApproving}>
            Defer
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isApproving}
            className="bg-green-600 hover:bg-green-700"
          >
            {isApproving ? 'Issuing Certification...' : 'Issue Carbon Credit Certificate'}
          </Button>
        </div>
      ) : (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700">Carbon credits have been issued and certified.</span>
        </div>
      )}
    </div>
  )
}
