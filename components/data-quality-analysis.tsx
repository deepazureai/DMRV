'use client'

import React from 'react'
import { QualityMetrics, getQualityColor } from '@/lib/anomaly-detection'
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'

interface DataQualityAnalysisProps {
  metrics: QualityMetrics
}

export function DataQualityAnalysis({ metrics }: DataQualityAnalysisProps) {
  const qualityIcons = {
    excellent: <CheckCircle className="w-6 h-6 text-green-600" />,
    good: <CheckCircle className="w-6 h-6 text-emerald-600" />,
    fair: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
    poor: <AlertCircle className="w-6 h-6 text-red-600" />,
  }

  return (
    <div className="space-y-4">
      {/* Main Quality Card */}
      <div className={`p-6 rounded-lg border-2 ${getQualityColor(metrics.quality)}`}>
        <div className="flex items-center gap-4">
          {qualityIcons[metrics.quality as keyof typeof qualityIcons]}
          <div>
            <p className="text-sm font-medium opacity-75">Overall Quality</p>
            <p className="text-3xl font-bold capitalize">{metrics.quality}</p>
            <p className="text-xs opacity-75 mt-1">
              {metrics.validRecords} of {metrics.totalRecords} records valid
            </p>
          </div>
        </div>
      </div>

      {/* Quality Breakdown */}
      <div className="grid grid-cols-3 gap-3">
        {/* Valid Records */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs font-medium text-green-900 mb-2">Valid Records</p>
          <p className="text-2xl font-bold text-green-600">{metrics.validRecords}</p>
          <p className="text-xs text-green-800 mt-1">{metrics.validPercentage.toFixed(1)}%</p>
        </div>

        {/* Warnings */}
        {metrics.recordsWithWarnings > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-medium text-amber-900 mb-2">With Warnings</p>
            <p className="text-2xl font-bold text-amber-600">{metrics.recordsWithWarnings}</p>
            <p className="text-xs text-amber-800 mt-1">{metrics.warningPercentage.toFixed(1)}%</p>
          </div>
        )}

        {/* Errors */}
        {metrics.recordsWithErrors > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs font-medium text-red-900 mb-2">With Errors</p>
            <p className="text-2xl font-bold text-red-600">{metrics.recordsWithErrors}</p>
            <p className="text-xs text-red-800 mt-1">{metrics.errorPercentage.toFixed(1)}%</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Total Records</p>
            <p className="text-2xl font-bold">{metrics.totalRecords}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Anomalies Found</p>
            <p className="text-2xl font-bold">{metrics.anomalyCount}</p>
          </div>
        </div>
      </div>

      {/* Quality Assessment Message */}
      <div className="p-4 border rounded-lg">
        {metrics.quality === 'excellent' && (
          <p className="text-sm text-green-800 bg-green-50 p-3 rounded border border-green-200">
            Excellent data quality. No issues detected. Ready for approval.
          </p>
        )}
        {metrics.quality === 'good' && (
          <p className="text-sm text-emerald-800 bg-emerald-50 p-3 rounded border border-emerald-200">
            Good data quality. Minor warnings detected but acceptable for processing.
          </p>
        )}
        {metrics.quality === 'fair' && (
          <p className="text-sm text-yellow-800 bg-yellow-50 p-3 rounded border border-yellow-200">
            Fair data quality. Some issues detected. Review anomalies before verification.
          </p>
        )}
        {metrics.quality === 'poor' && (
          <p className="text-sm text-red-800 bg-red-50 p-3 rounded border border-red-200">
            Poor data quality. Critical errors detected. Corrections required before verification.
          </p>
        )}
      </div>
    </div>
  )
}
