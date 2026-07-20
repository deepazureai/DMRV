'use client'

import React from 'react'
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { AnomalyResult, getSeverityColor } from '@/lib/anomaly-detection'

interface AnomaliesPanelProps {
  anomalies: AnomalyResult[]
  expandedRecord: number | null
  onRecordClick: (index: number) => void
}

export function AnomaliesPanel({ anomalies, expandedRecord, onRecordClick }: AnomaliesPanelProps) {
  if (anomalies.length === 0) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-900">All Clear</p>
            <p className="text-sm text-green-800">No anomalies detected in the data</p>
          </div>
        </div>
      </div>
    )
  }

  // Group anomalies by record
  const groupedByRecord = new Map<number, AnomalyResult[]>()
  anomalies.forEach(anom => {
    if (!groupedByRecord.has(anom.recordIndex)) {
      groupedByRecord.set(anom.recordIndex, [])
    }
    groupedByRecord.get(anom.recordIndex)!.push(anom)
  })

  // Count by severity
  const criticalCount = anomalies.filter(a => a.severity === 'critical').length
  const highCount = anomalies.filter(a => a.severity === 'high').length
  const mediumCount = anomalies.filter(a => a.severity === 'medium').length
  const lowCount = anomalies.filter(a => a.severity === 'low').length

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium text-foreground mb-3">Anomaly Summary</p>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {criticalCount > 0 && (
            <div className="p-2 bg-red-100 text-red-900 rounded border border-red-300">
              <p className="font-bold">{criticalCount}</p>
              <p>Critical</p>
            </div>
          )}
          {highCount > 0 && (
            <div className="p-2 bg-red-100 text-red-900 rounded border border-red-300">
              <p className="font-bold">{highCount}</p>
              <p>High</p>
            </div>
          )}
          {mediumCount > 0 && (
            <div className="p-2 bg-amber-100 text-amber-900 rounded border border-amber-300">
              <p className="font-bold">{mediumCount}</p>
              <p>Medium</p>
            </div>
          )}
          {lowCount > 0 && (
            <div className="p-2 bg-blue-100 text-blue-900 rounded border border-blue-300">
              <p className="font-bold">{lowCount}</p>
              <p>Low</p>
            </div>
          )}
        </div>
      </div>

      {/* Anomalies List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {Array.from(groupedByRecord.entries()).map(([recordIdx, recordAnomalies]) => (
          <div key={recordIdx} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => onRecordClick(expandedRecord === recordIdx ? -1 : recordIdx)}
              className="w-full text-left p-3 bg-muted hover:bg-muted/80 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-sm font-medium">Record #{recordIdx + 1}</span>
                <span className="text-xs text-muted-foreground">({recordAnomalies.length} issue{recordAnomalies.length !== 1 ? 's' : ''})</span>
              </div>
              <span className="text-xs text-muted-foreground">{expandedRecord === recordIdx ? '▼' : '▶'}</span>
            </button>

            {expandedRecord === recordIdx && (
              <div className="p-3 space-y-2 border-t">
                {recordAnomalies.map((anom, idx) => (
                  <div key={idx} className={`p-3 rounded border text-xs ${getSeverityColor(anom.severity)}`}>
                    <div className="flex items-start gap-2">
                      {anom.type === 'error' ? (
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">{anom.message}</p>
                        <p className="text-xs opacity-75 mt-1">Field: {anom.field}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
