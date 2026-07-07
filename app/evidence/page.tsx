'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockEvidence, mockSubmissions, getEvidenceBySubmissionId } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, FileText, Database, FileJson, Award, File } from 'lucide-react'

const typeIcons: Record<string, React.ReactNode> = {
  sensor_data: <Database className="text-blue-600" size={20} />,
  document: <FileText className="text-red-600" size={20} />,
  report: <FileJson className="text-purple-600" size={20} />,
  certificate: <Award className="text-green-600" size={20} />,
  other: <File className="text-gray-600" size={20} />
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export default function EvidencePage() {
  return (
    <AppShell currentPage="evidence">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Evidence Repository</h2>
          <p className="text-muted-foreground">Manage and verify supporting documents and data files for submissions</p>
        </div>

        {mockSubmissions
          .filter(s => getEvidenceBySubmissionId(s.id).length > 0)
          .map((submission) => {
            const evidence = getEvidenceBySubmissionId(submission.id)
            const verifiedCount = evidence.filter(e => e.verified).length

            return (
              <div key={submission.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Submission: {submission.period}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {verifiedCount} of {evidence.length} files verified
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Size:</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatFileSize(evidence.reduce((sum, e) => sum + e.size, 0))}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {evidence.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">{typeIcons[file.type]}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="truncate font-medium text-foreground">{file.fileName}</h4>
                          {file.verified && <CheckCircle className="text-emerald-600 flex-shrink-0" size={16} />}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Type: {file.type.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>Size: {formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>Uploaded: {new Date(file.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {file.verified ? (
                          <Badge variant="default" className="text-xs">✓ Verified</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Pending</Badge>
                        )}
                        <button className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-border transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </AppShell>
  )
}
