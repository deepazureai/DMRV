'use client'

import React, { useState, useEffect } from 'react'
import { Upload, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CarbonFileList } from '@/components/carbon-file-list'
import { CarbonRecordsGrid } from '@/components/carbon-records-grid'
import { createUploadedFile, loadSampleDataset, UploadedFile } from '@/lib/carbon-file-manager'

export function CarbonFileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load sample datasets on mount
  useEffect(() => {
    const loadSamples = async () => {
      try {
        const dataset1 = await loadSampleDataset('1')
        const dataset2 = await loadSampleDataset('2')
        const dataset3 = await loadSampleDataset('3')

        const files: UploadedFile[] = []
        if (dataset1) files.push(dataset1)
        if (dataset2) files.push(dataset2)
        if (dataset3) files.push(dataset3)

        setUploadedFiles(files)
        if (files.length > 0) {
          setSelectedFileId(files[0].id)
        }
      } catch (error) {
        console.error('Error loading sample datasets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSamples()
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files) {
      processFiles(files)
    }
  }

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
    const files = e.dataTransfer.files
    if (files) {
      processFiles(files)
    }
  }

  const processFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.name.endsWith('.csv')) {
        alert(`${file.name} is not a CSV file. Please upload CSV files only.`)
        continue
      }

      try {
        const csvContent = await file.text()
        const uploadedFile = createUploadedFile(file.name, csvContent)
        setUploadedFiles((prev) => [uploadedFile, ...prev])
        setSelectedFileId(uploadedFile.id)
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error)
        alert(`Error processing ${file.name}`)
      }
    }
  }

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
    if (selectedFileId === fileId) {
      setSelectedFileId(uploadedFiles.length > 1 ? uploadedFiles[0].id : null)
    }
  }

  const selectedFile = uploadedFiles.find((f) => f.id === selectedFileId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sample datasets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`p-8 text-center transition-all ${
            isDragging
              ? 'bg-primary/10 border-primary border-2'
              : 'border-dashed border-2 border-border hover:border-primary/50'
          }`}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="font-semibold text-foreground mb-1">Upload Carbon Credit Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop CSV files here, or click to browse
          </p>

          <div className="flex gap-3 justify-center">
            <label>
              <input
                type="file"
                multiple
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button asChild className="cursor-pointer">
                <span>
                  <Plus className="h-4 w-4 mr-2" />
                  Select CSV Files
                </span>
              </Button>
            </label>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Supported format: CSV with facility data, energy source, emissions, and carbon credits
          </p>
        </div>
      </div>

      {/* Dual Panel Layout */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Left Panel: File List */}
          <CarbonFileList
            files={uploadedFiles}
            selectedFileId={selectedFileId}
            onSelectFile={setSelectedFileId}
            onDeleteFile={handleDeleteFile}
          />

          {/* Right Panel: Records Grid */}
          {selectedFile ? (
            <CarbonRecordsGrid
              records={selectedFile.records}
              companyName={selectedFile.companyName}
              fileName={selectedFile.filename}
            />
          ) : (
            <div className="flex items-center justify-center bg-background rounded-lg border border-border">
              <div className="text-center">
                <p className="text-muted-foreground">Select a file to view records</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {uploadedFiles.length === 0 && (
        <div className="flex items-center justify-center bg-background rounded-lg border border-dashed border-border p-12 text-center">
          <div>
            <p className="text-muted-foreground mb-2">No files uploaded yet</p>
            <p className="text-sm text-muted-foreground">
              Upload a CSV file to start viewing carbon credit data
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
