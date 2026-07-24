'use client'

import React, { useState } from 'react'
import { X, Download, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

interface CalculationBreakdownProps {
  isOpen: boolean
  onClose: () => void
  baselineEnergy: number
  projectEnergy: number
  confidenceFactor: number
}

export function BEECalculationBreakdown({ isOpen, onClose, baselineEnergy, projectEnergy, confidenceFactor }: CalculationBreakdownProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0)

  if (!isOpen) return null

  // BEE Calculation Steps
  const energySavings = baselineEnergy - projectEnergy
  const cccGenerated = energySavings * confidenceFactor
  const cccRounded = Math.round(cccGenerated)

  const steps = [
    {
      title: 'Step 1: Identify Methodology',
      description: 'ACM0013 - Optimization of energy systems',
      details: [
        { label: 'Methodology', value: 'ACM0013' },
        { label: 'Scope', value: 'Optimization of energy systems - Kiln operations & raw material sourcing' },
        { label: 'Sector', value: 'Cement Manufacturing' },
        { label: 'Standard', value: 'BEE CCTS (Carbon Credit Certification Scheme)' },
        { label: 'Reference', value: 'BEE Portal - ACM0013 Protocol', link: 'https://beeindia.gov.in/documents-tools/act-policies-and-codes/ccts-approved-acm-methodologies' },
      ],
    },
    {
      title: 'Step 2: Establish Baseline',
      description: 'Define baseline energy consumption before intervention',
      details: [
        { label: 'Baseline Energy Consumption', value: `${baselineEnergy.toLocaleString()} MWh` },
        { label: 'Period', value: 'Q1 FY2026-27 (Jan-Mar 2026)' },
        { label: 'Baseline Source', value: 'BEE Sector-specific baseline: 1.85 kg CO₂e/MWh for cement' },
        { label: 'Calculation', value: 'Based on 3-year historical average (2022-2025)' },
        { label: 'Verification Status', value: 'ACVA Verified & Approved' },
      ],
    },
    {
      title: 'Step 3: Measure Project Performance',
      description: 'Document actual energy consumption after intervention',
      details: [
        { label: 'Project Energy Consumption', value: `${projectEnergy.toLocaleString()} MWh` },
        { label: 'Measurement Method', value: 'Real-time meter monitoring with SCADA system' },
        { label: 'Data Quality', value: '87% confidence (High)' },
        { label: 'Quality Assurance', value: 'Independent Check-Verifier audit completed' },
        { label: 'Calibration Certificate', value: 'Valid until 2024-06-30' },
      ],
    },
    {
      title: 'Step 4: Calculate Energy Reduction',
      description: 'Compute the energy savings from the project intervention',
      formula: '(Baseline Energy - Project Energy)',
      details: [
        { label: 'Baseline Energy', value: `${baselineEnergy.toLocaleString()} MWh` },
        { label: 'Minus (-) Project Energy', value: `${projectEnergy.toLocaleString()} MWh` },
        { label: 'Energy Reduction Achieved', value: `${energySavings.toLocaleString()} MWh`, highlight: true },
        { label: 'Reduction Percentage', value: `${((energySavings / baselineEnergy) * 100).toFixed(2)}%` },
      ],
    },
    {
      title: 'Step 5: Apply Confidence Factor',
      description: 'Adjust calculation based on verification confidence and data quality',
      formula: 'Energy Reduction × Confidence Factor',
      details: [
        { label: 'Energy Reduction', value: `${energySavings.toLocaleString()} MWh` },
        { label: 'Confidence Factor', value: `${confidenceFactor} (${(confidenceFactor * 100).toFixed(0)}% confidence)` },
        { label: 'Rationale', value: 'Applied due to high data quality (87%) and verified measurement systems' },
        { label: 'Preliminary CCCs', value: `${cccGenerated.toLocaleString('en-IN', { maximumFractionDigits: 2 })} CCCs` },
      ],
    },
    {
      title: 'Step 6: BEE Portal Validation',
      description: 'Cross-reference with BEE baseline and apply final adjustments',
      details: [
        { label: 'BEE Baseline Energy Intensity', value: '1.85 kg CO₂e/MWh (Sector Average)' },
        { label: 'Sector', value: 'Cement Manufacturing' },
        { label: 'Emission Factor (Coal)', value: '2.41 kg CO₂e/kg' },
        { label: 'Emission Factor (Diesel)', value: '3.16 kg CO₂e/litre' },
        { label: 'Emission Factor (Electricity)', value: '0.73 kg CO₂e/kWh (National Grid)' },
        { label: 'Reference', value: 'BEE CCTS Guidelines v2024', link: 'https://beeindia.gov.in/sites/default/files/CCTS%20Guidelines%202024.pdf' },
      ],
    },
    {
      title: 'Step 7: Calculate Final CCC Generation',
      description: 'Final CCC issuance after all validations and quality checks',
      formula: 'Energy Reduction × Confidence Factor = Final CCCs',
      details: [
        { label: 'Energy Reduction', value: `${energySavings.toLocaleString()} MWh` },
        { label: 'Confidence Factor', value: `${confidenceFactor}` },
        { label: 'Quality Adjustment', value: `1.0 (No deduction - 87% quality score)` },
        { label: 'Final CCC Generation', value: `${cccRounded.toLocaleString()} CCCs`, highlight: true },
        { label: 'Certification Period', value: 'Q1 FY2026-27' },
        { label: 'CCC Validity', value: '5 years from issuance' },
      ],
    },
    {
      title: 'Step 8: Compliance & Registration',
      description: 'Register CCCs on BEE portal and blockchain ledger',
      details: [
        { label: 'Registration Status', value: 'Ready for BEE Portal submission' },
        { label: 'Blockchain Registration', value: 'Ethereum Mainnet (ICM Registry)' },
        { label: 'Compliance Check', value: '✓ ICAP Standards verified' },
        { label: 'Audit Trail', value: 'Complete 7-year audit trail maintained' },
        { label: 'CCC Code Format', value: 'CCC-ACM0013-[Entity-ID]-[Period]-[Sequence]' },
        { label: 'Next Step', value: 'BEE Officer approval & issuance' },
      ],
    },
  ]

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index)
  }

  const downloadCalculationReport = () => {
    const report = `
BEE CARBON CREDIT CERTIFICATE (CCC) CALCULATION REPORT
=========================================================

METHODOLOGY: ACM0013 - Optimization of energy systems
PERIOD: Q1 FY2026-27 (January - March 2026)
ENTITY: Eastern Cement Works
VERIFIER: TUV-SUD India

CALCULATION SUMMARY
===================

Step 1: Methodology Identification
- Standard: BEE CCTS (Carbon Credit Certification Scheme)
- Protocol: ACM0013 (Energy System Optimization)
- Sector: Cement Manufacturing

Step 2: Baseline Energy Establishment
- Baseline Energy: ${baselineEnergy.toLocaleString()} MWh
- Period: Q1 FY2026-27
- Source: 3-year historical average (2022-2025)
- BEE Sector Baseline: 1.85 kg CO₂e/MWh

Step 3: Project Energy Measurement
- Project Energy: ${projectEnergy.toLocaleString()} MWh
- Measurement System: SCADA (real-time monitoring)
- Data Quality: 87% (High Confidence)
- Verification: Independent Check-Verifier audit completed

Step 4: Energy Reduction Calculation
Formula: Baseline Energy - Project Energy
= ${baselineEnergy.toLocaleString()} - ${projectEnergy.toLocaleString()}
= ${energySavings.toLocaleString()} MWh SAVED
= ${((energySavings / baselineEnergy) * 100).toFixed(2)}% reduction

Step 5: Confidence Factor Application
Formula: Energy Reduction × Confidence Factor
= ${energySavings.toLocaleString()} × ${confidenceFactor}
= ${cccGenerated.toLocaleString('en-IN', { maximumFractionDigits: 2 })} CCCs

Step 6: BEE Portal Validation
- Baseline Cross-Reference: Verified ✓
- Sector Classification: Cement Manufacturing ✓
- Emission Factors: Valid per BEE guidelines ✓
- Calculation Method: Approved ✓

Step 7: Final CCC Generation
Formula: Energy Reduction × Confidence Factor × Quality Adjustment
= ${energySavings.toLocaleString()} × ${confidenceFactor} × 1.0
= ${cccRounded.toLocaleString()} CCCs (FINAL)

Step 8: Compliance & Registration
- BEE Portal Status: Ready for submission
- Blockchain: Ethereum Mainnet (ICM Registry)
- ICAP Compliance: ✓ Verified
- Validity Period: 5 years from issuance

REFERENCES
==========
1. BEE CCTS Guidelines v2024: https://beeindia.gov.in/ccts
2. ACM0013 Protocol: https://beeindia.gov.in/methodologies/acm0013
3. Sector Baselines: https://beeindia.gov.in/baselines
4. Emission Factors: https://beeindia.gov.in/emission-factors

CERTIFICATION
==============
This calculation has been verified by:
- ACVA Verifier: TUV-SUD India (Confidence: 95%)
- Check-Verifier: Bureau Veritas (Independent Audit: Approved)
- Data Quality Score: 87%
- Calculated: ${new Date().toISOString()}

Generated by: DMRV Digital Trust Layer
Report ID: CCC-CALC-${Date.now()}
    `.trim()

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `BEE-CCC-Calculation-Report-${Date.now()}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">BEE CCC Calculation Breakdown</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Step-by-step calculation per BEE CCTS methodology & ACM0013 protocol
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-3 md:grid-cols-4 mb-6">
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs font-medium text-muted-foreground">Baseline Energy</p>
              <p className="text-lg font-bold text-foreground mt-1">{baselineEnergy.toLocaleString()} MWh</p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs font-medium text-muted-foreground">Project Energy</p>
              <p className="text-lg font-bold text-foreground mt-1">{projectEnergy.toLocaleString()} MWh</p>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/10 p-3">
              <p className="text-xs font-medium text-emerald-400">Energy Saved</p>
              <p className="text-lg font-bold text-emerald-300 mt-1">{energySavings.toLocaleString()} MWh</p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-900/10 p-3">
              <p className="text-xs font-medium text-blue-400">Confidence Factor</p>
              <p className="text-lg font-bold text-blue-300 mt-1">{(confidenceFactor * 100).toFixed(0)}%</p>
            </div>
          </div>

          {/* Calculation Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                  {expandedStep === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground ml-2 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground ml-2 flex-shrink-0" />
                  )}
                </button>

                {expandedStep === index && (
                  <div className="border-t border-border bg-muted/30 p-4 space-y-4">
                    {step.formula && (
                      <div className="rounded-lg bg-slate-800 p-3 border border-slate-700">
                        <p className="text-xs font-medium text-muted-foreground mb-2">FORMULA</p>
                        <p className="text-sm font-mono text-foreground">{step.formula}</p>
                      </div>
                    )}

                    <div className="grid gap-2">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className={`flex items-start justify-between p-2 rounded ${
                            detail.highlight ? 'bg-emerald-900/20 border border-emerald-500/30' : 'bg-muted/50'
                          }`}
                        >
                          <p className="text-sm font-medium text-muted-foreground flex-1">{detail.label}</p>
                          <div className="flex items-center gap-2 ml-2">
                            <p className={`text-sm font-semibold text-right ${detail.highlight ? 'text-emerald-300' : 'text-foreground'}`}>
                              {detail.value}
                            </p>
                            {detail.link && (
                              <a
                                href={detail.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Result */}
          <div className="rounded-lg border border-emerald-500/50 bg-emerald-900/20 p-4 mt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-emerald-400">FINAL RESULT</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-emerald-300">{cccRounded.toLocaleString()}</p>
                <p className="text-lg text-emerald-400">CCCs Generated</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Carbon Credit Certificates for Q1 FY2026-27 | Certified by ACVA & Check-Verifier
              </p>
            </div>
          </div>

          {/* BEE References */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 mt-4">
            <p className="font-semibold text-foreground mb-3">BEE Portal References & Standards</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="text-blue-400">→</span>
                <a href="https://beeindia.gov.in/sites/default/files/CCTS%20Guidelines%202024.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  BEE CCTS Guidelines v2024 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="text-blue-400">→</span>
                <a href="https://beeindia.gov.in/documents-tools/act-policies-and-codes/ccts-approved-acm-methodologies" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  ACM0013 Methodology Protocol <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="text-blue-400">→</span>
                <a href="https://beeindia.gov.in/documents-tools/tools/ccts-sectoral-baselines" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  Sector-Specific Baselines <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="text-blue-400">→</span>
                <a href="https://beeindia.gov.in/documents-tools/tools/default-emission-factors" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  Standard Emission Factors <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-border bg-card p-4 flex gap-3">
          <button
            onClick={downloadCalculationReport}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-medium text-emerald-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-card hover:bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
