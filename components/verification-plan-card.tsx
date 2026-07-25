'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, Info, FileText, BarChart3 } from 'lucide-react'

interface VerificationPlanCardProps {
  submissionId: string
  entityName: string
  dataQualityScore: number
  riskLevel: 'low' | 'medium' | 'high'
}

export function VerificationPlanCard({
  submissionId,
  entityName,
  dataQualityScore,
  riskLevel,
}: VerificationPlanCardProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview')

  const riskFactors = {
    low: { color: 'bg-emerald-900/20 border-emerald-500/30 text-emerald-300', label: 'Low Risk', factors: ['Complete data submission', '90%+ data quality score', 'No flagged discrepancies'] },
    medium: { color: 'bg-amber-900/20 border-amber-500/30 text-amber-300', label: 'Medium Risk', factors: ['Some data gaps', '75-90% data quality', 'Minor discrepancies noted'] },
    high: { color: 'bg-red-900/20 border-red-500/30 text-red-300', label: 'High Risk', factors: ['Significant gaps', '<75% data quality', 'Major discrepancies'] },
  }

  const riskInfo = riskFactors[riskLevel]

  const verificationChecklist = [
    { category: 'Data Completeness', items: ['All activity data provided', 'Time-series consistency', 'No missing reporting periods'] },
    { category: 'Data Quality', items: ['Source documentation available', 'Measurement uncertainty <5%', 'Calibration certificates attached'] },
    { category: 'Calculation Accuracy', items: ['Formula application correct', 'Default values justified', 'Emission factors per BEE guidelines'] },
    { category: 'Baseline Representativeness', items: ['3-year historical average', 'Project boundaries defined', 'Performance standardization correct'] },
    { category: 'Additionality', items: ['Baseline scenario documented', 'Project scenario distinct', 'No business-as-usual assumptions'] },
    { category: 'Methodology Compliance', items: ['ACM0013 protocol followed', 'No methodological deviations', 'Justified exceptions documented'] },
    { category: 'Leakage & Gaming Analysis', items: ['Leakage risks identified', 'Gaming indicators assessed', 'Mitigation measures documented'] },
    { category: 'Documentation & Records', items: ['Audit trail complete', 'Electronic records secured', 'Metadata appropriately tagged'] },
    { category: 'Monitoring Equipment', items: ['Calibration schedules confirmed', 'Data loggers validated', 'Quality assurance protocols followed'] },
    { category: 'Stakeholder Concerns', items: ['Public comments addressed', 'Indigenous rights respected', 'Environmental impacts assessed'] },
    { category: 'Regulatory Compliance', items: ['BEE CCTS requirements met', 'State regulations compliance', 'Environmental clearances obtained'] },
    { category: 'Special Provisions', items: ['Renewable energy correctly treated', 'Exported power adjustments applied', 'CERs/Verified Emissions considered'] },
    { category: 'Historical Consistency', items: ['Retroactive changes justified', 'Data revision procedures followed', 'Version control maintained'] },
    { category: 'Uncertainty Analysis', items: ['Parameter uncertainties calculated', 'Conservative approaches applied', 'Sensitivity analysis completed'] },
  ]

  const samplingStrategy = {
    documents: 25,
    records: 50,
    onsite: 20,
    interviews: 10,
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Verification Plan & Risk Assessment
            </CardTitle>
            <CardDescription>{entityName} | Submission {submissionId}</CardDescription>
          </div>
          <Badge className={`${riskInfo.color} border`}>{riskInfo.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Risk Assessment Overview */}
        <div className={`rounded-lg border p-4 ${riskInfo.color}`}>
          <div className="flex items-start gap-3">
            {riskLevel === 'low' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />}
            {riskLevel === 'medium' && <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
            {riskLevel === 'high' && <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
            <div className="flex-1">
              <p className="font-semibold">Risk Assessment: {riskInfo.label}</p>
              <div className="mt-2 space-y-1">
                {riskInfo.factors.map((factor, i) => (
                  <p key={i} className="text-xs">• {factor}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overall Data Quality Score
            </p>
            <p className="text-lg font-bold text-blue-300">{dataQualityScore}%</p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                dataQualityScore >= 90 ? 'bg-emerald-500' : dataQualityScore >= 75 ? 'bg-blue-500' : 'bg-amber-500'
              }`}
              style={{ width: `${dataQualityScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {dataQualityScore >= 90
              ? 'Excellent data quality - minimal verification scope required'
              : dataQualityScore >= 75
              ? 'Good data quality - standard verification scope recommended'
              : 'Data quality concerns - expanded verification scope required'}
          </p>
        </div>

        {/* Verification Approach */}
        <div className="rounded-lg bg-muted/30 border border-border p-3">
          <p className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Verification Approach
          </p>
          <div className="space-y-2 text-xs">
            <div className="grid gap-2 md:grid-cols-2">
              {Object.entries(samplingStrategy).map(([key, value]) => (
                <div key={key} className="rounded bg-slate-700/50 p-2">
                  <p className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="font-bold text-blue-300">{value}%</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-2">
              Verification will include document review, record sampling, on-site assessment, and stakeholder interviews in proportion to identified risk areas.
            </p>
          </div>
        </div>

        {/* 14-Point Verification Checklist */}
        <div className="space-y-2">
          <p className="font-semibold text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            14-Point Methodology Verification Checklist (Per BEE CCTS Guidelines)
          </p>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {verificationChecklist.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedSection(expandedSection === section.category ? null : section.category)}
                className="w-full text-left rounded border border-border bg-muted/20 hover:bg-muted/40 transition-colors p-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-blue-500/30 text-xs text-blue-300 font-bold">
                      {idx + 1}
                    </span>
                    {section.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{expandedSection === section.category ? '−' : '+'}</span>
                </div>
                {expandedSection === section.category && (
                  <div className="mt-2 ml-7 space-y-1 text-xs text-muted-foreground">
                    {section.items.map((item, i) => (
                      <p key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span> {item}
                      </p>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Timeline */}
        <div className="rounded-lg bg-slate-700/30 border border-border p-3 text-xs">
          <p className="font-semibold mb-2">Expected Verification Timeline</p>
          <div className="grid gap-2 md:grid-cols-4">
            <div>
              <p className="text-muted-foreground">Desk Review</p>
              <p className="font-bold text-blue-300">1-2 weeks</p>
            </div>
            <div>
              <p className="text-muted-foreground">On-site Visit</p>
              <p className="font-bold text-blue-300">3-5 days</p>
            </div>
            <div>
              <p className="text-muted-foreground">Report Prep</p>
              <p className="font-bold text-blue-300">2-3 weeks</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Duration</p>
              <p className="font-bold text-emerald-300">4-6 weeks</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
