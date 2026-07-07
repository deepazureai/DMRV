'use client'

import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSubmissions, SubmissionState } from '@/lib/submission-context'
import { useRole } from '@/lib/role-context'

interface BlockchainRegistrationPanelProps {
  submission: SubmissionState
}

export function BlockchainRegistrationPanel({ submission }: BlockchainRegistrationPanelProps) {
  const { registerOnBlockchain } = useSubmissions()
  const { userId } = useRole()
  const [isRegistering, setIsRegistering] = useState(false)
  const [copiedHash, setCopiedHash] = useState(false)

  const handleRegister = () => {
    setIsRegistering(true)
    setTimeout(() => {
      registerOnBlockchain(submission.id)
      setIsRegistering(false)
    }, 2000)
  }

  const copyHash = () => {
    if (submission.blockchainHash) {
      navigator.clipboard.writeText(submission.blockchainHash)
      setCopiedHash(true)
      setTimeout(() => setCopiedHash(false), 2000)
    }
  }

  if (submission.status === 'draft' || submission.status === 'submitted' || submission.status === 'under-review') {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>This submission must be approved before blockchain registration.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Blockchain Status */}
      <div className={`p-6 rounded-lg border-2 ${
        submission.status === 'registered'
          ? 'bg-green-50 border-green-200'
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-start gap-3">
          {submission.status === 'registered' ? (
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h3 className="font-semibold">
              {submission.status === 'registered' ? 'Registered on Blockchain' : 'Ready for Registration'}
            </h3>
            <p className={`text-sm mt-1 ${
              submission.status === 'registered' ? 'text-green-700' : 'text-yellow-700'
            }`}>
              {submission.status === 'registered'
                ? 'This submission has been immutably recorded on the blockchain.'
                : 'This submission is approved and ready for permanent blockchain registration.'}
            </p>
          </div>
        </div>
      </div>

      {/* Blockchain Packet Details */}
      <div className="space-y-3">
        <h3 className="font-semibold">Immutable Blockchain Record</h3>
        <div className="space-y-2">
          <div className="p-3 bg-muted rounded border">
            <p className="text-xs text-muted-foreground mb-1">Submission ID</p>
            <p className="font-mono text-sm font-semibold">{submission.id}</p>
          </div>

          <div className="p-3 bg-muted rounded border">
            <p className="text-xs text-muted-foreground mb-1">Carbon Credits Issued</p>
            <p className="font-bold text-lg text-green-600">{submission.cccAmount.toLocaleString()} CCCs</p>
          </div>

          {submission.blockchainHash && (
            <div className="p-3 bg-muted rounded border">
              <p className="text-xs text-muted-foreground mb-1">Blockchain Hash (SHA-256)</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs break-all flex-1">{submission.blockchainHash}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyHash}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              {copiedHash && <p className="text-xs text-green-600 mt-2">Copied to clipboard</p>}
            </div>
          )}

          {submission.registeredAt && (
            <div className="p-3 bg-muted rounded border">
              <p className="text-xs text-muted-foreground mb-1">Registration Timestamp</p>
              <p className="font-mono text-sm">{new Date(submission.registeredAt).toISOString()}</p>
            </div>
          )}

          <div className="p-3 bg-muted rounded border">
            <p className="text-xs text-muted-foreground mb-1">Registration Authority</p>
            <p className="font-medium text-sm">National Voluntary Carbon Credit Registry (NVCCC)</p>
          </div>
        </div>
      </div>

      {/* Blockchain Features */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
        <h4 className="font-semibold text-sm text-blue-900">Immutable Record Benefits</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Permanent and tamper-proof record of carbon credit issuance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Transparent verification of emissions reduction</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Enables secure carbon credit trading and retirement</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Auditable trail for regulatory compliance</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      {submission.status === 'approved' ? (
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleRegister}
            disabled={isRegistering}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isRegistering ? (
              <>
                <span className="inline-block animate-spin mr-2">⛓</span>
                Registering on Blockchain...
              </>
            ) : (
              <>
                <span className="mr-2">⛓</span>
                Register on Blockchain
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-700">Blockchain Registration Complete</p>
            <p className="text-xs text-green-600 mt-0.5">This record is now immutable and permanently stored</p>
          </div>
        </div>
      )}
    </div>
  )
}
