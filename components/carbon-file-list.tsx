'use client'

import React from 'react'
import { Trash2, FileText, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UploadedFile } from '@/lib/carbon-file-manager'

interface CarbonFileListProps {
  files: UploadedFile[]
  selectedFileId: string | null
  onSelectFile: (fileId: string) => void
  onDeleteFile: (fileId: string) => void
}

export function CarbonFileList({
  files,
  selectedFileId,
  onSelectFile,
  onDeleteFile,
}: CarbonFileListProps) {
  const handleDelete = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this file?')) {
      onDeleteFile(fileId)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <h2 className="text-lg font-semibold text-foreground">Uploaded Carbon Data</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {files.length} {files.length === 1 ? 'file' : 'files'} uploaded
        </p>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {files.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No files uploaded yet</p>
            <p className="text-xs text-muted-foreground mt-1">Upload CSV files to get started</p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFileId === file.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                {/* File Name and Company */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm truncate">{file.companyName}</p>
                    <p className="text-xs text-muted-foreground truncate">{file.filename}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDelete(e, file.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Records</p>
                    <p className="font-semibold text-foreground">{file.recordCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carbon Credits</p>
                    <p className="font-semibold text-green-600">
                      {file.totalCarbonCredits.toLocaleString(undefined, {
                        maximumFractionDigits: 1,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Quality</p>
                    <p className="font-semibold text-foreground">{file.averageQuality}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uploaded</p>
                    <p className="font-semibold text-foreground">{file.uploadDate}</p>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedFileId === file.id && (
                  <div className="mt-3 pt-3 border-t border-primary/20 flex items-center text-xs text-primary">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Selected - View records below
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
