'use client'

import React, { useState } from 'react'
import { ChevronDown, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MockDataRow {
  [key: string]: string | number | boolean
}

interface DataPreviewViewerProps {
  fileName: string
  fileType: string
}

// Mock data templates for different file types
const mockDataTemplates: Record<string, { headers: string[]; rows: MockDataRow[] }> = {
  csv: {
    headers: ['Timestamp', 'Parameter', 'Value', 'Unit', 'Status'],
    rows: [
      { Timestamp: '2025-01-15 09:00', Parameter: 'CO2 Emissions', Value: 125.5, Unit: 'tCO2e', Status: 'Valid' },
      { Timestamp: '2025-01-15 10:30', Parameter: 'Fuel Consumption', Value: 450.2, Unit: 'Tonnes', Status: 'Valid' },
      { Timestamp: '2025-01-15 12:00', Parameter: 'Energy Generated', Value: 3250, Unit: 'MWh', Status: 'Valid' },
      { Timestamp: '2025-01-15 14:15', Parameter: 'Grid Import', Value: 215.8, Unit: 'MWh', Status: 'Warning' },
      { Timestamp: '2025-01-15 16:45', Parameter: 'Production Output', Value: 2850, Unit: 'Tonnes', Status: 'Valid' },
    ],
  },
  xlsx: {
    headers: ['Product ID', 'Production Date', 'Quantity', 'Quality Grade', 'Comments'],
    rows: [
      { 'Product ID': 'PROD-2025-001', 'Production Date': '2025-01-10', Quantity: 500, 'Quality Grade': 'A', Comments: 'Standard batch' },
      { 'Product ID': 'PROD-2025-002', 'Production Date': '2025-01-11', Quantity: 480, 'Quality Grade': 'A', Comments: 'Standard batch' },
      { 'Product ID': 'PROD-2025-003', 'Production Date': '2025-01-12', Quantity: 510, 'Quality Grade': 'B', Comments: 'Minor deviation' },
      { 'Product ID': 'PROD-2025-004', 'Production Date': '2025-01-13', Quantity: 495, 'Quality Grade': 'A', Comments: 'Standard batch' },
      { 'Product ID': 'PROD-2025-005', 'Production Date': '2025-01-14', Quantity: 520, 'Quality Grade': 'A', Comments: 'Standard batch' },
    ],
  },
  json: {
    headers: ['Record ID', 'Facility', 'Metric', 'Value', 'Verified'],
    rows: [
      { 'Record ID': 'REC-001', Facility: 'Main Plant', Metric: 'Daily CO2', Value: 125.5, Verified: 'Yes' },
      { 'Record ID': 'REC-002', Facility: 'Power Plant', Metric: 'Fuel Used', Value: 450.2, Verified: 'Yes' },
      { 'Record ID': 'REC-003', Facility: 'Main Plant', Metric: 'Waste Generated', Value: 85.3, Verified: 'No' },
      { 'Record ID': 'REC-004', Facility: 'Power Plant', Metric: 'Energy Output', Value: 3250, Verified: 'Yes' },
      { 'Record ID': 'REC-005', Facility: 'Main Plant', Metric: 'Water Usage', Value: 1200, Verified: 'Yes' },
    ],
  },
  pdf: {
    headers: ['Section', 'Page', 'Content Type', 'Status', 'Notes'],
    rows: [
      { Section: '1. Executive Summary', Page: 1, 'Content Type': 'Text', Status: 'Readable', Notes: 'Clear and complete' },
      { Section: '2. Methodology', Page: 3, 'Content Type': 'Text/Tables', Status: 'Readable', Notes: 'CDM methodology applied' },
      { Section: '3. Calculations', Page: 5, 'Content Type': 'Tables/Charts', Status: 'Readable', Notes: 'All formulas documented' },
      { Section: '4. Evidence', Page: 8, 'Content Type': 'Images/Tables', Status: 'Readable', Notes: 'Supporting documents attached' },
      { Section: '5. Verification', Page: 10, 'Content Type': 'Text', Status: 'Readable', Notes: 'Ready for review' },
    ],
  },
}

export function DataPreviewViewer({ fileName, fileType }: DataPreviewViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Get mock data based on file type
  const getMockData = () => {
    const normalizedType = fileType.toLowerCase()
    return mockDataTemplates[normalizedType] || mockDataTemplates.csv
  }

  const mockData = getMockData()

  return (
    <div className="w-full border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <ChevronDown
            className={`w-5 h-5 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
          <div className="text-left min-w-0">
            <p className="font-medium truncate">{fileName}</p>
            <p className="text-xs text-muted-foreground">{fileType.toUpperCase()} • {mockData.rows.length} records</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            setShowPreview(!showPreview)
          }}
          className="flex-shrink-0 ml-2"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </button>

      {/* Preview Content */}
      {isExpanded && showPreview && (
        <div className="border-t p-4 bg-muted/30 overflow-x-auto">
          <div className="mb-2">
            <p className="text-xs text-muted-foreground font-medium mb-3">Sample Data Preview</p>
          </div>

          {/* Table */}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                {mockData.headers.map((header) => (
                  <th
                    key={header}
                    className="text-left px-3 py-2 font-semibold bg-background border-r last:border-r-0 text-xs"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  {mockData.headers.map((header) => (
                    <td
                      key={`${rowIdx}-${header}`}
                      className="px-3 py-2 border-r last:border-r-0 border-border text-xs"
                    >
                      <span
                        className={`${
                          typeof row[header] === 'boolean'
                            ? row[header]
                              ? 'text-green-600 font-medium'
                              : 'text-red-600 font-medium'
                            : row[header] === 'Warning'
                              ? 'text-yellow-600 font-medium'
                              : row[header] === 'Valid'
                                ? 'text-green-600 font-medium'
                                : ''
                        }`}
                      >
                        {String(row[header])}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="mt-4 p-3 bg-background rounded border text-xs text-muted-foreground space-y-1">
            <p>
              <span className="font-medium text-foreground">Total Records:</span> {mockData.rows.length}
            </p>
            <p>
              <span className="font-medium text-foreground">Columns:</span> {mockData.headers.length}
            </p>
            <p className="text-xs pt-2">
              This is a sample of the uploaded file. The actual file contains the complete dataset ready for processing.
            </p>
          </div>
        </div>
      )}

      {/* Collapsed Preview Summary */}
      {!isExpanded && showPreview && (
        <div className="p-3 bg-muted/30 border-t text-xs text-muted-foreground flex items-center justify-between">
          <span>Preview hidden • {mockData.rows.length} records ready</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="h-7 text-xs"
          >
            Show Preview
          </Button>
        </div>
      )}
    </div>
  )
}
