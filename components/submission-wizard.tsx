'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FileUploadZone, UploadedFile } from '@/components/file-upload-zone'
import { DataPreviewViewer } from '@/components/data-preview-viewer'
import { useSubmissions } from '@/lib/submission-context'
import { validateSubmission, calculateEmissionsFromData } from '@/lib/calculations'

interface SubmissionWizardProps {
  entityId: string
  projectId: string
  onSubmissionCreated: (submissionId: string) => void
  onCancel: () => void
}

export function SubmissionWizard({
  entityId,
  projectId,
  onSubmissionCreated,
  onCancel,
}: SubmissionWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [exceptions, setExceptions] = useState<string[]>([])
  const [methodology, setMethodology] = useState('cdm')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { createSubmission, submitForReview, uploadFiles, calculateQualityScore } = useSubmissions()

  const handleFilesSelected = (files: UploadedFile[]) => {
    setUploadedFiles(files)
    const exceptionsList = validateSubmission(files).map(e => e.description)
    setExceptions(exceptionsList)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const submission = createSubmission(entityId, projectId)
      uploadFiles(submission.id, uploadedFiles)
      calculateQualityScore(submission.id)
      submitForReview(submission.id)

      setTimeout(() => {
        setIsSubmitting(false)
        onSubmissionCreated(submission.id)
      }, 1000)
    } catch (error) {
      console.error('Error submitting:', error)
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: 'Project Info', icon: '📋' },
    { number: 2, title: 'Upload Data', icon: '📤' },
    { number: 3, title: 'Methodology', icon: '📐' },
    { number: 4, title: 'Review & Submit', icon: '✅' },
  ]

  return (
    <div className="w-full max-w-2xl bg-card border rounded-lg p-6 space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((s, idx) => (
          <React.Fragment key={s.number}>
            <div
              className={`flex flex-col items-center ${
                step >= s.number ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step >= s.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > s.number ? <CheckCircle2 className="w-5 h-5" /> : s.number}
              </div>
              <p className="text-xs mt-2 text-center">{s.title}</p>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded ${
                  step > s.number ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-96 space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Project Information</h3>
            <div>
              <label className="text-sm font-medium">Entity ID</label>
              <input
                type="text"
                value={entityId}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded bg-muted text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Project ID</label>
              <input
                type="text"
                value={projectId}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded bg-muted text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Submission Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the emissions reduction initiative..."
                className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Upload Supporting Data</h3>
            <FileUploadZone onFilesSelected={handleFilesSelected} />
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Data Preview - Click eye icon to see sample data</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <DataPreviewViewer
                      key={file.id}
                      fileName={file.name}
                      fileType={file.type}
                    />
                  ))}
                </div>
              </div>
            )}

            {exceptions.length > 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-sm text-yellow-900 mb-2">Outstanding Items</p>
                <ul className="text-sm text-yellow-800 space-y-1">
                  {exceptions.map((exc, idx) => (
                    <li key={idx}>• {exc}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Select Methodology</h3>
            <div className="space-y-2">
              {[
                { value: 'cdm', label: 'Clean Development Mechanism (CDM)' },
                { value: 'vcs', label: 'Verified Carbon Standard (VCS)' },
                { value: 'iso', label: 'ISO 14064-2 Quantification' },
              ].map(opt => (
                <label key={opt.value} className="flex items-center p-3 border rounded cursor-pointer hover:bg-muted">
                  <input
                    type="radio"
                    name="methodology"
                    value={opt.value}
                    checked={methodology === opt.value}
                    onChange={e => setMethodology(e.target.value)}
                    className="mr-3"
                  />
                  <span className="font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Review Submission</h3>
            <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Files Uploaded:</span>
                <span className="font-medium">{uploadedFiles.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Methodology:</span>
                <span className="font-medium capitalize">{methodology}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-yellow-600">Ready for Submission</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              By submitting, your data will be sent for validation and quality assessment. You can track the progress in the Submissions dashboard.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1) as 1 | 2 | 3 | 4)}
            disabled={step === 1 || isSubmitting}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < 4 ? (
            <Button
              onClick={() => setStep(Math.min(4, step + 1) as 1 | 2 | 3 | 4)}
              disabled={step === 2 && uploadedFiles.length === 0}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
