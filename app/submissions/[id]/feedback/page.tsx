'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, Send, Upload } from 'lucide-react'

const mockComments = [
  {
    id: 'comment-1',
    reviewerName: 'Dr. Priya Sharma',
    reviewerRole: 'ACVA',
    severity: 'critical',
    field: 'Fuel Consumption Data',
    comment: 'Missing quality assurance records for fuel sampling in Q1. Per CCTS guidelines, quarterly fuel samples must have lab analysis reports.',
    createdAt: new Date('2024-01-20'),
    dueDate: new Date('2024-02-03'),
    status: 'open',
    responded: false,
  },
  {
    id: 'comment-2',
    reviewerName: 'Dr. Priya Sharma',
    reviewerRole: 'ACVA',
    severity: 'major',
    field: 'Natural Gas Consumption',
    comment: 'Electricity meter calibration certificate expired in November 2023. Updated calibration required before data validation.',
    createdAt: new Date('2024-01-20'),
    dueDate: new Date('2024-02-03'),
    status: 'open',
    responded: false,
  },
  {
    id: 'comment-3',
    reviewerName: 'Dr. Priya Sharma',
    reviewerRole: 'ACVA',
    severity: 'major',
    field: 'Production Data',
    comment: 'Production data shows 15% variation from 3-year average. Please provide explanation and supporting documents for Q1 spike.',
    createdAt: new Date('2024-01-20'),
    dueDate: new Date('2024-02-03'),
    status: 'open',
    responded: false,
  },
]

export default function EntityFeedbackPage() {
  const params = useParams()
  const submissionId = params.id as string
  const [comments, setComments] = useState(mockComments)
  const [selectedComment, setSelectedComment] = useState<string | null>(null)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [attachments, setAttachments] = useState<Record<string, string[]>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedData = comments.find(c => c.id === selectedComment)

  const handleAddResponse = (commentId: string, text: string) => {
    setResponses(prev => ({ ...prev, [commentId]: text }))
  }

  const handleAddAttachment = (commentId: string) => {
    // Mock attachment
    const newAttachment = `evidence-${Date.now()}.pdf`
    setAttachments(prev => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), newAttachment],
    }))
  }

  const handleSubmitResponses = async () => {
    setSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const allResponded = comments.every(c => responses[c.id] && responses[c.id].trim().length > 0)
  const daysRemaining = Math.ceil(
    (mockComments[0].dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/submissions">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Review Comments - Response Required</h1>
          </div>
          <p className="text-muted-foreground">Address verification findings and resubmit corrected data</p>
        </div>
      </div>

      {/* Success Alert */}
      {submitted && (
        <Alert className="border-emerald-500/30 bg-emerald-900/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <AlertDescription className="text-emerald-300">
            All responses submitted successfully to DMRV Portal (dmrv.bee.gov.in). Submission reference: <span className="font-semibold">{submissionId}</span>. ACVA verifier (Dr. Priya Sharma, TUV-SUD) will review your evidence and supporting documents within 3-5 business days. You'll be notified at your registered email address.
          </AlertDescription>
        </Alert>
      )}

      {/* Timeline Alert */}
      <Alert className={daysRemaining > 3 ? 'border-blue-500/30 bg-blue-900/20' : 'border-amber-500/30 bg-amber-900/20'}>
        <Clock className="w-4 h-4" />
        <AlertDescription className={daysRemaining > 3 ? 'text-blue-300' : 'text-amber-300'}>
          <span className="font-semibold">{daysRemaining} days remaining</span> to respond to all comments. Due date: {mockComments[0].dueDate.toLocaleDateString()}
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left: Comments List */}
        <div className="md:col-span-1">
          <Card className="border-border bg-card h-full">
            <CardHeader>
              <CardTitle className="text-base">Comments to Address</CardTitle>
              <CardDescription>
                {comments.length} items | {Object.keys(responses).filter(id => responses[id]?.trim()).length} responded
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {comments.map(comment => (
                <button
                  onClick={() => setSelectedComment(comment.id)}
                  key={comment.id}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedComment === comment.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-border hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={
                        comment.severity === 'critical'
                          ? 'bg-red-900/20 text-red-400 border-red-500/30'
                          : 'bg-amber-900/20 text-amber-400 border-amber-500/30'
                      }
                    >
                      {comment.severity.toUpperCase()}
                    </Badge>
                    {responses[comment.id] && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{comment.field}</p>
                  <p className="text-xs font-medium text-foreground line-clamp-2">
                    {comment.comment}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Response Editor */}
        <div className="md:col-span-2">
          {selectedData ? (
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Respond to Comment</CardTitle>
                      <CardDescription>
                        From: <span className="font-medium">{selectedData.reviewerName}</span> ({selectedData.reviewerRole})
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        selectedData.severity === 'critical'
                          ? 'bg-red-600'
                          : 'bg-amber-600'
                      }
                    >
                      {selectedData.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Comment</p>
                    <p className="text-sm text-foreground">{selectedData.comment}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-medium text-muted-foreground mb-0.5">Related Field</p>
                      <p className="text-foreground">{selectedData.field}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground mb-0.5">Due Date</p>
                      <p className="text-foreground">{selectedData.dueDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Response Text */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Response</label>
                  <textarea
                    value={responses[selectedData.id] || ''}
                    onChange={e => handleAddResponse(selectedData.id, e.target.value)}
                    placeholder="Explain how you've addressed this comment. Include steps taken, corrected data, or evidence provided..."
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm resize-none focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {responses[selectedData.id]?.length || 0} characters
                  </p>
                </div>

                {/* Attachments */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Supporting Evidence</label>
                    <Button
                      onClick={() => handleAddAttachment(selectedData.id)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Upload className="w-3 h-3" />
                      Attach File
                    </Button>
                  </div>
                  {attachments[selectedData.id] && attachments[selectedData.id].length > 0 && (
                    <div className="space-y-1">
                      {attachments[selectedData.id].map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50 text-xs"
                        >
                          <span className="text-foreground">{file}</span>
                          <button className="text-red-400 hover:text-red-300">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-xs text-blue-300">
                    {responses[selectedData.id]?.trim() ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        Response ready for submission
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        Response required before submission
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center py-12">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Select a comment to view details and provide response</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Save Draft
        </Button>
        <Button
          onClick={handleSubmitResponses}
          disabled={!allResponded || submitting}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Submitting...' : 'Submit All Responses'}
        </Button>
      </div>
    </div>
  )
}
