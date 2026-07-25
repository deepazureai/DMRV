'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, FileCheck, Building2, Zap, Download } from 'lucide-react'

interface MultiStepCCCIssuanceProps {
  submissionId: string
  entityName: string
  estimatedCCCs: number
  currentStatus: 'check-verified' | 'dossier' | 'nscicm' | 'central-govt' | 'issued'
}

export function MultiStepCCCIssuance({
  submissionId,
  entityName,
  estimatedCCCs,
  currentStatus,
}: MultiStepCCCIssuanceProps) {
  const [status, setStatus] = useState<string>(currentStatus)
  const [showTimeline, setShowTimeline] = useState(true)

  const getStepStatus = (step: string) => {
    const steps = ['check-verified', 'dossier', 'nscicm', 'central-govt', 'issued']
    const currentIndex = steps.indexOf(status)
    const stepIndex = steps.indexOf(step)

    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'active'
    return 'pending'
  }

  const steps = [
    {
      id: 'check-verified',
      label: 'Check-Verification Complete',
      description: 'Independent verification findings confirmed',
      duration: 'Completed',
      icon: CheckCircle2,
    },
    {
      id: 'dossier',
      label: 'BEE Prepares Dossier',
      description: 'Bureau compiles submission dossier with all supporting documents',
      duration: '1-2 weeks',
      icon: FileCheck,
    },
    {
      id: 'nscicm',
      label: 'NSCICM Expert Review',
      description: 'National Steering Committee reviews methodology and calculations',
      duration: '2 weeks',
      icon: Building2,
    },
    {
      id: 'central-govt',
      label: 'Central Government Approval',
      description: 'Ministry reviews and approves CCC issuance recommendation',
      duration: '2 weeks',
      icon: Zap,
    },
    {
      id: 'issued',
      label: 'CCC Formally Issued',
      description: 'Bureau issues Certificate of Carbon Credit and registers on blockchain',
      duration: 'Immediate',
      icon: CheckCircle2,
    },
  ]

  const handleSubmitToDossier = () => {
    setStatus('dossier')
  }

  const simulateWorkflow = () => {
    const stepsSequence = ['check-verified', 'dossier', 'nscicm', 'central-govt', 'issued']
    const currentIdx = stepsSequence.indexOf(status)
    if (currentIdx < stepsSequence.length - 1) {
      setStatus(stepsSequence[currentIdx + 1])
    }
  }

  const downloadCertificate = () => {
    const cert = `
CERTIFICATE OF CARBON CREDIT
=============================

Certificate Number: CCC-${submissionId}-2024
Entity: ${entityName}
CCCs Issued: ${estimatedCCCs}
Validity Period: 2024-2025
Issue Date: ${new Date().toLocaleDateString()}

This certificate is registered on the Ethereum blockchain
and is legally binding under the BEE CCTS framework.
    `
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cert))
    element.setAttribute('download', `CCC-${submissionId}.txt`)
    element.click()
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              CCC Issuance Workflow
            </CardTitle>
            <CardDescription>{entityName} | {estimatedCCCs.toLocaleString()} CCCs</CardDescription>
          </div>
          <Badge variant={status === 'issued' ? 'default' : 'secondary'}>
            {status === 'issued' ? 'ISSUED' : status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Timeline */}
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const stepStatus = getStepStatus(step.id)
            const StepIcon = step.icon

            return (
              <div key={step.id} className="flex gap-4">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-all ${
                      stepStatus === 'completed'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : stepStatus === 'active'
                        ? 'bg-blue-500/20 border-blue-500 text-blue-300 animate-pulse'
                        : 'bg-slate-700 border-slate-600 text-slate-400'
                    }`}
                  >
                    {stepStatus === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-12 mt-1 ${
                        stepStatus === 'completed' ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1 pb-2">
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className={`font-semibold ${stepStatus === 'active' ? 'text-blue-300' : 'text-foreground'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-border flex gap-2">
          {status === 'check-verified' && (
            <Button onClick={handleSubmitToDossier} className="flex-1">
              Submit to Dossier Preparation
            </Button>
          )}

          {status !== 'issued' && status !== 'check-verified' && (
            <Button
              onClick={simulateWorkflow}
              variant="outline"
              className="flex-1"
            >
              Advance Status (Demo)
            </Button>
          )}

          {status === 'issued' && (
            <>
              <Button onClick={downloadCertificate} className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download Certificate
              </Button>
              <Button variant="outline" className="flex-1">
                View on Blockchain
              </Button>
            </>
          )}
        </div>

        {/* Status Summary */}
        {status === 'issued' && (
          <div className="rounded-lg bg-emerald-900/20 border border-emerald-500/30 p-3">
            <p className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              CCCs Successfully Issued
            </p>
            <p className="text-xs text-emerald-300/80 mt-1">
              Certificate CCC-{submissionId}-2024 registered on blockchain. Entity can now trade or bank CCCs for next compliance period.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
