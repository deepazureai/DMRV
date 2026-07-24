'use client'

import React, { useState, useEffect } from 'react'
import { Upload, Plus, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CarbonFileList } from '@/components/carbon-file-list'
import { CarbonRecordsGrid } from '@/components/carbon-records-grid'
import { createUploadedFile, loadEntityDatasets, UploadedFile } from '@/lib/carbon-file-manager'

interface PendingUpload {
  files: FileList
  filenames: string[]
}

export function CarbonFileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingUpload, setPendingUpload] = useState<PendingUpload | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Load entity datasets on mount
  useEffect(() => {
    const loadSamples = async () => {
      try {
        const files = await loadEntityDatasets()
        setUploadedFiles(files)
        if (files.length > 0) {
          setSelectedFileId(files[0].id)
        }
      } catch (error) {
        console.error('Error loading entity datasets:', error)
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

  const handleButtonClick = () => {
    fileInputRef.current?.click()
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
    const filenames: string[] = []
    let hasInvalidFiles = false

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.name.endsWith('.csv')) {
        alert(`${file.name} is not a CSV file. Please upload CSV files only.`)
        hasInvalidFiles = true
        continue
      }
      filenames.push(file.name)
    }

    if (hasInvalidFiles || filenames.length === 0) {
      return
    }

    // Show confirmation dialog before uploading
    setPendingUpload({ files, filenames })
    setShowConfirmation(true)
  }

  const confirmUpload = async () => {
    if (!pendingUpload) return

    const { files } = pendingUpload
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
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

    setPendingUpload(null)
    setShowConfirmation(false)
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
      {/* Upload Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Confirm File Upload
            </DialogTitle>
            <DialogDescription>
              Please verify the following before uploading:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Files to Upload:</p>
              <ul className="space-y-1">
                {pendingUpload?.filenames.map((filename, idx) => (
                  <li key={idx} className="text-sm text-blue-800">
                    • {filename}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Verification Checklist:</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>File format is valid CSV</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Data includes facility IDs, energy sources, and emissions</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Carbon credit calculations are accurate</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>All required fields are populated</span>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUpload} className="bg-primary">
              Confirm & Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          <h3 className="font-semibold text-foreground mb-1">Upload Activity Data Files</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop DMRV-format CSV files here, or click to browse. Data will be parsed and available for creating formal submissions.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button onClick={handleButtonClick} className="cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Choose DMRV Data Files
          </Button>

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
