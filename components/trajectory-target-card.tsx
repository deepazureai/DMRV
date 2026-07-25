'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Target, AlertCircle, CheckCircle2 } from 'lucide-react'

interface TrajectoryTargetCardProps {
  complianceCycle: string
  annualTarget: number // kg CO2e/tonne product
  baselineIntensity: number
  projectedIntensity: number
  isCompliant: boolean
}

export function TrajectoryTargetCard({
  complianceCycle,
  annualTarget,
  baselineIntensity,
  projectedIntensity,
  isCompliant,
}: TrajectoryTargetCardProps) {
  const improvement = ((baselineIntensity - projectedIntensity) / baselineIntensity * 100).toFixed(1)
  const status = projectedIntensity <= annualTarget ? 'On Track' : 'Above Target'
  const statusColor = projectedIntensity <= annualTarget ? 'text-emerald-400' : 'text-amber-400'
  const statusBgColor = projectedIntensity <= annualTarget ? 'bg-emerald-900/20' : 'bg-amber-900/20'

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Annual GHG Intensity Target
            </CardTitle>
            <CardDescription>{complianceCycle} Compliance Cycle</CardDescription>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${statusBgColor} ${statusColor}`}>
            {isCompliant ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {status}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Target Metrics */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-muted/50 p-3 border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Annual Target Intensity</p>
            <p className="text-lg font-bold text-foreground">{annualTarget}</p>
            <p className="text-xs text-muted-foreground">kg CO₂e/tonne</p>
          </div>

          <div className="rounded-lg bg-muted/50 p-3 border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Baseline Intensity</p>
            <p className="text-lg font-bold text-foreground">{baselineIntensity}</p>
            <p className="text-xs text-muted-foreground">kg CO₂e/tonne (3-year avg)</p>
          </div>

          <div className={`rounded-lg p-3 border ${isCompliant ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-amber-900/10 border-amber-500/30'}`}>
            <p className="text-xs font-medium text-muted-foreground mb-1">Projected Intensity</p>
            <p className={`text-lg font-bold ${isCompliant ? 'text-emerald-300' : 'text-amber-300'}`}>{projectedIntensity}</p>
            <p className="text-xs text-muted-foreground">Current performance</p>
          </div>
        </div>

        {/* Improvement Visualization */}
        <div className="rounded-lg bg-muted/30 p-3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">Projected Improvement</p>
            <p className="text-sm font-bold text-blue-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {improvement}%
            </p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(parseFloat(improvement), 100)}%` }}
            />
          </div>
        </div>

        {/* Compliance Note */}
        <div className={`rounded p-2 text-xs ${isCompliant ? 'bg-emerald-900/20 text-emerald-300' : 'bg-amber-900/20 text-amber-300'}`}>
          {isCompliant
            ? `✓ Projected to meet FY2026-27 target. Entity qualifies for CCC generation if verification confirms findings.`
            : `⚠ Projected intensity above target. Verification required to assess if offset by project activities or energy efficiency improvements.`}
        </div>
      </CardContent>
    </Card>
  )
}
