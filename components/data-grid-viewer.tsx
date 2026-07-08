'use client'

import React, { useState } from 'react'
import { ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react'

interface DataGridViewerProps {
  data: Array<Record<string, any>>
  fileName?: string
}

export function DataGridViewer({ data, fileName }: DataGridViewerProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  if (!data || data.length === 0) {
    return (
      <div className="p-6 border border-dashed border-muted-foreground/30 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    )
  }

  const columns = Object.keys(data[0]) || []
  const importantColumns = [
    'Facility_ID',
    'Date',
    'Energy_Source',
    'CO2_Emissions_kg',
    'Carbon_Credits_Generated',
    'Deviation_Flag',
    'Duplicate_Flag',
    'Exception_Type',
    'Data_Quality_Score',
    'Status'
  ]

  const displayColumns = columns.filter(col => importantColumns.includes(col) || !col.startsWith('_'))

  const sortedData = React.useMemo(() => {
    let sorted = [...data]
    if (sortConfig) {
      sorted.sort((a, b) => {
        const aVal = a[sortConfig.key]
        const bVal = b[sortConfig.key]
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        return sortConfig.direction === 'asc' ? comparison : -comparison
      })
    }
    return sorted
  }, [data, sortConfig])

  const handleSort = (column: string) => {
    setSortConfig(prev =>
      prev?.key === column && prev?.direction === 'asc'
        ? { key: column, direction: 'desc' }
        : { key: column, direction: 'asc' }
    )
  }

  const toggleRowExpand = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'valid':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getDeviationIcon = (flag: any) => {
    return flag === 1 || flag === '1' ? '⚠️' : ''
  }

  return (
    <div className="space-y-4">
      {fileName && (
        <div className="flex items-center justify-between p-3 bg-muted rounded">
          <p className="font-medium text-sm">{fileName}</p>
          <span className="text-xs text-muted-foreground">{data.length} records</span>
        </div>
      )}

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-xs text-blue-600 font-medium">Total Records</p>
          <p className="text-lg font-semibold text-blue-900">{data.length}</p>
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-xs text-green-600 font-medium">Valid Records</p>
          <p className="text-lg font-semibold text-green-900">
            {data.filter((row: any) => row.Status?.toLowerCase() === 'valid').length}
          </p>
        </div>
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-xs text-yellow-600 font-medium">Warnings</p>
          <p className="text-lg font-semibold text-yellow-900">
            {data.filter((row: any) => row.Deviation_Flag === 1 || row.Duplicate_Flag === 1).length}
          </p>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded">
          <p className="text-xs text-purple-600 font-medium">Avg Quality</p>
          <p className="text-lg font-semibold text-purple-900">
            {(data.reduce((sum: number, row: any) => sum + (parseInt(row.Data_Quality_Score) || 0), 0) / data.length).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b">
              <th className="w-12 px-3 py-2 text-left"></th>
              {displayColumns.map(column => (
                <th
                  key={column}
                  className="px-3 py-2 text-left font-medium cursor-pointer hover:bg-muted/80 whitespace-nowrap"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.replace(/_/g, ' ')}</span>
                    {sortConfig?.key === column && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row: any, idx: number) => (
              <React.Fragment key={idx}>
                <tr className={`border-b hover:bg-muted/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => toggleRowExpand(idx)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expandedRows.has(idx) ? '▼' : '▶'}
                    </button>
                  </td>
                  {displayColumns.map(column => {
                    const value = row[column]
                    const isDeviation = column === 'Deviation_Flag' && (value === 1 || value === '1')
                    const isDuplicate = column === 'Duplicate_Flag' && (value === 1 || value === '1')
                    const isStatus = column === 'Status'

                    return (
                      <td key={column} className="px-3 py-2 whitespace-nowrap">
                        {isDeviation || isDuplicate ? (
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-yellow-600 font-medium">{value}</span>
                          </div>
                        ) : isStatus ? (
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(value)}`}>
                            {value}
                          </span>
                        ) : typeof value === 'number' && column.includes('Score') ? (
                          <span className={`font-medium ${parseInt(value) >= 90 ? 'text-green-600' : parseInt(value) >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {value}%
                          </span>
                        ) : (
                          <span className="text-foreground">{String(value || '-')}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
                {expandedRows.has(idx) && (
                  <tr className="bg-muted/50 border-b">
                    <td colSpan={displayColumns.length + 1} className="px-3 py-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        {Object.entries(row).map(([key, value]) => (
                          <div key={key} className="p-2 bg-background rounded border">
                            <p className="font-medium text-muted-foreground">{key.replace(/_/g, ' ')}</p>
                            <p className="font-semibold text-foreground">{String(value || '-')}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
