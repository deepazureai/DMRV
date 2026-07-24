'use client'

import React, { useState } from 'react'
import { ChevronDown, AlertTriangle, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CarbonRecord } from '@/lib/carbon-file-manager'

interface CarbonRecordsGridProps {
  records: CarbonRecord[]
  companyName: string
  fileName: string
}

export function CarbonRecordsGrid({ records, companyName, fileName }: CarbonRecordsGridProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [sortColumn, setSortColumn] = useState<string>('measurement_date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDir('asc')
    }
  }

  const sortedRecords = [...records].sort((a, b) => {
    let aVal = (a as any)[sortColumn]
    let bVal = (b as any)[sortColumn]

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = (bVal as string).toLowerCase()
    }

    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sortDir === 'asc' ? comparison : -comparison
  })

  const metrics = {
    total: records.length,
    valid: records.filter((r) => r.status === 'Valid').length,
    warnings: records.filter((r) => r.status === 'Warning').length,
    avgQuality: (records.reduce((sum, r) => sum + r.data_quality_score, 0) / records.length).toFixed(1),
    totalCredits: records
      .reduce((sum, r) => sum + r.carbon_credits_generated, 0)
      .toLocaleString(undefined, { maximumFractionDigits: 1 }),
    totalEmissions: records
      .reduce((sum, r) => sum + r.co2_emissions_kg, 0)
      .toLocaleString(undefined, { maximumFractionDigits: 0 }),
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <h2 className="text-lg font-semibold text-foreground">{companyName} Records</h2>
        <p className="text-sm text-muted-foreground mt-1">{fileName}</p>
      </div>

      {/* Metrics Summary */}
      <div className="px-6 py-4 bg-card border-b border-border grid grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded p-3">
          <p className="text-xs text-muted-foreground">Total / Valid / Warnings</p>
          <p className="font-semibold text-foreground">
            {metrics.total} / <span className="text-green-600">{metrics.valid}</span> /{' '}
            <span className="text-amber-600">{metrics.warnings}</span>
          </p>
        </div>
        <div className="bg-muted/50 rounded p-3">
          <p className="text-xs text-muted-foreground">Total Carbon Credits Generated</p>
          <p className="font-semibold text-green-600">{metrics.totalCredits}</p>
        </div>
        <div className="bg-muted/50 rounded p-3">
          <p className="text-xs text-muted-foreground">Average Data Quality</p>
          <p className="font-semibold text-foreground">{metrics.avgQuality}%</p>
        </div>
      </div>

      {/* Records Table */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        {records.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-muted-foreground">No records available</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground w-12"></th>
                <th
                  className="px-4 py-3 text-left font-semibold text-foreground cursor-pointer hover:bg-muted"
                  onClick={() => handleSort('facility_name')}
                >
                  <div className="flex items-center gap-2">
                    Facility
                    {sortColumn === 'facility_name' && (
                      <span className="text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold text-foreground cursor-pointer hover:bg-muted"
                  onClick={() => handleSort('measurement_date')}
                >
                  <div className="flex items-center gap-2">
                    Date
                    {sortColumn === 'measurement_date' && (
                      <span className="text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Source</th>
                <th
                  className="px-4 py-3 text-right font-semibold text-foreground cursor-pointer hover:bg-muted"
                  onClick={() => handleSort('carbon_credits_generated')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Carbon Credits
                    {sortColumn === 'carbon_credits_generated' && (
                      <span className="text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Quality</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((record, index) => {
                const isExpanded = expandedRows.has(index)
                const hasFlags = record.deviation_flag || record.duplicate_flag

                return (
                  <React.Fragment key={index}>
                    <tr
                      className={`border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                        isExpanded ? 'bg-muted/30' : ''
                      }`}
                      onClick={() => toggleRow(index)}
                    >
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleRow(index)
                          }}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </Button>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{record.facility_name}</td>
                      <td className="px-4 py-3 text-foreground">{record.measurement_date}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          {record.energy_source}
                          {record.fuel_type === 'Renewable' && (
                            <span className="text-green-600 text-xs ml-1">●</span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        {(record.carbon_credits_generated ?? 0).toFixed(1)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`text-sm font-medium ${
                            record.data_quality_score >= 95
                              ? 'text-green-600'
                              : record.data_quality_score >= 85
                                ? 'text-amber-600'
                                : 'text-red-600'
                          }`}
                        >
                          {record.data_quality_score}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {hasFlags && (
                            <AlertTriangle className="h-4 w-4 text-amber-600" title="Flags present" />
                          )}
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              record.status === 'Valid'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
                            }`}
                          >
                            {record.status}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row Details */}
                    {isExpanded && (
                      <tr className="border-b border-border bg-muted/20">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Energy Consumed</p>
                              <p className="font-semibold text-foreground">
                                {(record.energy_consumed_kwh ?? 0).toLocaleString()} kWh
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">CO2 Emissions</p>
                              <p className="font-semibold text-foreground">
                                {(record.co2_emissions_kg ?? 0).toLocaleString()} kg
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Emission Factor</p>
                              <p className="font-semibold text-foreground">
                                {record.emission_factor_kg_co2_per_kwh} kg/kWh
                              </p>
                            </div>
                            {record.deviation_flag && (
                              <div className="bg-amber-50 dark:bg-amber-950 p-2 rounded border border-amber-200 dark:border-amber-800">
                                <p className="text-xs font-semibold text-amber-900 dark:text-amber-100">
                                  ⚠ Deviation Detected
                                </p>
                              </div>
                            )}
                            {record.duplicate_flag && (
                              <div className="bg-orange-50 dark:bg-orange-950 p-2 rounded border border-orange-200 dark:border-orange-800">
                                <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">
                                  ⚠ Duplicate Record
                                </p>
                              </div>
                            )}
                            {record.exception_type !== 'None' && (
                              <div className="bg-red-50 dark:bg-red-950 p-2 rounded border border-red-200 dark:border-red-800">
                                <p className="text-xs font-semibold text-red-900 dark:text-red-100">
                                  Exception: {record.exception_type}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
