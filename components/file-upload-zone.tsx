'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface UploadedFile {
  name: string
  type: string
  size: number
  uploadedAt: string
  id: string
}

interface FileUploadZoneProps {
  onFilesSelected: (files: UploadedFile[]) => void
  acceptedFormats?: string
}

export function FileUploadZone({ onFilesSelected, acceptedFormats = '.csv,.xlsx,.json,.pdf' }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }

  const processFiles = (fileList: FileList) => {
    const newErrors: string[] = []
    const newFiles: UploadedFile[] = []

    Array.from(fileList).forEach(file => {
      const ext = file.name.split('.').pop()?.toLowerCase()
      const validFormats = ['csv', 'xlsx', 'xls', 'json', 'pdf']

      if (!validFormats.includes(ext || '')) {
        newErrors.push(`${file.name} - unsupported format`)
        return
      }

      if (file.size > 50 * 1024 * 1024) {
        newErrors.push(`${file.name} - exceeds 50MB limit`)
        return
      }

      const uploadedFile: UploadedFile = {
        name: file.name,
        type: ext || 'unknown',
        size: file.size,
        uploadedAt: new Date().toISOString(),
        id: `FILE-${Date.now()}-${Math.random()}`,
      }

      newFiles.push(uploadedFile)
    })

    setErrors(newErrors)
    const combinedFiles = [...selectedFiles, ...newFiles]
    setSelectedFiles(combinedFiles)
    onFilesSelected(combinedFiles)

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (fileId: string) => {
    const updated = selectedFiles.filter(f => f.id !== fileId)
    setSelectedFiles(updated)
    onFilesSelected(updated)
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="w-full space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border bg-muted/50 hover:bg-muted'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats}
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
        <p className="font-semibold text-foreground">Drop files here or click to browse</p>
        <p className="text-sm text-muted-foreground mt-1">Supports: CSV, Excel, JSON, PDF (max 50MB)</p>
      </div>

      {errors.length > 0 && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          {errors.map((error, idx) => (
            <p key={idx} className="text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          ))}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Uploaded Files ({selectedFiles.length})</h4>
          <div className="space-y-2">
            {selectedFiles.map(file => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
