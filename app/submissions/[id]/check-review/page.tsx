'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, CheckCircle2, AlertTriangle, MessageSquare, Flag } from 'lucide-react'

const mockACVAComments = [
  {
    id: 'acva-1',
    severity: 'critical',
    field: 'Fuel Consumption Data',
    comment: 'Missing quality assurance records for fuel sampling in Q1.',
    status: 'open',
  },
  {
    id: 'acva-2',
    severity: 'major',
    field: 'Natural Gas Consumption',
    comment: 'Electricity meter calibration certificate expired.',
    status: 'open',
  },
]

const mockEntityResponse = [
  {
    id: 'resp-1',
    acvaCommentId: 'acva-1',
    entityResponse: 'We have uploaded the lab analysis reports for all fuel samples. Please refer to attachment section.',
    attachmentCount: 3,
    dateResponded: new Date('2024-01-25'),
  },
  {
    id: 'resp-2',
    acvaCommentId: 'acva-2',
    entityResponse: 'Meter recalibrated on Jan 23, 2024. Certificate attached.',
    attachmentCount: 1,
    dateResponded: new Date('2024-01-24'),
  },
]

const checklistItems = [
  {
    id: 'data-schema',
    name: 'Data Schema Verification',
    description: 'Confirm all required fields present and valid format',
    required: true,
  },
  {
    id: 'baseline-consistency',
    name: 'Baseline Consistency Review',
    description: 'Cross-check against industry baseline and BEE standards',
    required: true,
  },
  {
    id: 'emission-factor',
    name: 'Emission Factor Validation',
    description: 'Verify correct emission factors used per latest guidelines',
    required: false,
  },
  {
    id: 'variance-analysis',
    name: 'Variance Analysis',
    description: 'Investigate any unusual outliers or seasonal variations',
    required: false,
  },
  {
    id: 'acva-resolution',
    name: 'ACVA Comments Resolution',
    description: '3 comments to review and validate',
    required: true,
  },
]

export default function CheckVerifierReviewPage() {
  const params = useParams()
  const submissionId = params.id as string
  const [challengeMode, setChallengeMode] = useState(false)
  const [challengedComments, setChallengedComments] = useState<string[]>([])
  const [challengeTexts, setChallengeTexts] = useState<Record<string, string>>({})
  const [newComments, setNewComments] = useState<string>('')
  const [independentIssues, setIndependentIssues] = useState<string>('')
  const [auditDecision, setAuditDecision] = useState<string | null>(null)
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null)
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'data-schema': true,
    'baseline-consistency': true,
    'emission-factor': false,
    'variance-analysis': false,
    'acva-resolution': false,
  })
  const [auditStatus, setAuditStatus] = useState<'in-progress' | 'completed' | 'submitted'>('in-progress')
  const [auditLog, setAuditLog] = useState<Array<{
    timestamp: Date
    action: string
    details: string
  }>>([
    {
      timestamp: new Date('2025-01-15'),
      action: 'Audit Started',
      details: 'Check-Verifier Rajesh Kumar started independent audit review',
    },
  ])

  const toggleChallenge = (commentId: string) => {
    setChallengedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  const handleChallengeText = (commentId: string, text: string) => {
    setChallengeTexts(prev => ({ ...prev, [commentId]: text }))
  }

  const handleAuditDecision = (decision: string, message: string) => {
    setAuditDecision(decision)
    setAuditStatus('completed')
    setAuditLog(prev => [
      ...prev,
      {
        timestamp: new Date(),
        action: `Audit Decision: ${decision}`,
        details: message,
      },
    ])
    setSubmittedMessage(message)
    setTimeout(() => {
      setSubmittedMessage(null)
    }, 5000)
  }

  const requiredItemsComplete = checklistItems
    .filter(item => item.required)
    .every(item => checklist[item.id])

  const allItemsComplete = checklistItems.every(item => checklist[item.id])

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
            <h1 className="text-3xl font-bold text-foreground">Check-Verifier Independent Review</h1>
          </div>
          <p className="text-muted-foreground">
            Submission ID: {submissionId} | Cement Manufacturing Ltd | Q1 FY2024-25
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="acva-comments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="acva-comments">ACVA Comments</TabsTrigger>
          <TabsTrigger value="entity-responses">Entity Responses</TabsTrigger>
          <TabsTrigger value="independent">Independent Issues</TabsTrigger>
        </TabsList>

        {/* ACVA Comments */}
        <TabsContent value="acva-comments" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">ACVA Verification Comments - Challenge/Accept</CardTitle>
              <CardDescription>
                Review ACVA findings. You can challenge any finding if you disagree with the assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockACVAComments.map(comment => (
                <div key={comment.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={
                            comment.severity === 'critical'
                              ? 'bg-red-900/20 text-red-400 border-red-500/30'
                              : 'bg-amber-900/20 text-amber-400 border-amber-500/30'
                          }
                        >
                          {comment.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{comment.field}</span>
                      </div>
                      <p className="text-sm text-foreground">{comment.comment}</p>
                    </div>
                    <Button
                      onClick={() => toggleChallenge(comment.id)}
                      variant={challengedComments.includes(comment.id) ? 'default' : 'outline'}
                      size="sm"
                      className={
                        challengedComments.includes(comment.id)
                          ? 'bg-amber-600 hover:bg-amber-700 gap-2'
                          : 'gap-2'
                      }
                    >
                      <Flag className="w-4 h-4" />
                      {challengedComments.includes(comment.id) ? 'Challenged' : 'Challenge'}
                    </Button>
                  </div>

                  {challengedComments.includes(comment.id) && (
                    <div className="mt-3 p-3 bg-amber-900/20 border border-amber-500/30 rounded space-y-2">
                      <label className="text-xs font-medium text-amber-300 block">
                        Your Challenge Rationale
                      </label>
                      <textarea
                        value={challengeTexts[comment.id] || ''}
                        onChange={e => handleChallengeText(comment.id, e.target.value)}
                        placeholder="Explain why you disagree with this finding..."
                        rows={2}
                        className="w-full px-3 py-2 bg-background border border-amber-500/30 rounded text-foreground text-xs resize-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Entity Responses */}
        <TabsContent value="entity-responses" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Entity Responses to ACVA Comments</CardTitle>
              <CardDescription>
                Review how the entity responded to ACVA findings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockEntityResponse.map(resp => {
                const acvaComment = mockACVAComments.find(c => c.id === resp.acvaCommentId)
                return (
                  <div key={resp.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="bg-muted/30 rounded p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">ACVA Comment</p>
                      <p className="text-sm text-foreground">{acvaComment?.comment}</p>
                    </div>

                    <div className="bg-emerald-900/10 border border-emerald-500/30 rounded p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-emerald-400 mb-1">Entity Response</p>
                          <p className="text-sm text-foreground">{resp.entityResponse}</p>
                        </div>
                      </div>
                      {resp.attachmentCount > 0 && (
                        <p className="text-xs text-emerald-300 mt-2">
                          {resp.attachmentCount} supporting document(s) attached
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Responded: {resp.dateResponded.toLocaleDateString()}
                      </p>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Add Follow-up Comment
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Independent Issues */}
        <TabsContent value="independent" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Independent Findings</CardTitle>
              <CardDescription>
                Add any independent issues you found during check-verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-500/30 bg-blue-900/20">
                <AlertTriangle className="w-4 h-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                  As per CCTS procedures, Check-Verifiers can raise independent findings not covered by ACVA
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Independent Verification Findings
                </label>
                <textarea
                  value={independentIssues}
                  onChange={e => setIndependentIssues(e.target.value)}
                  placeholder="Document any independent issues found. You can reference:
- Sampling methodology deviations
- Data consistency issues
- Documentation gaps
- Calculation errors
- Compliance non-conformities"
                  rows={6}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-foreground text-sm resize-none focus:border-blue-500 focus:outline-none"
                />
              </div>

              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <CheckCircle2 className="w-4 h-4" />
                Submit Check-Verification Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Independent Verification Checklist */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Independent Verification Checklist</CardTitle>
          <CardDescription>
            Complete all required items before submitting audit decision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map(item => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded border border-border hover:bg-muted/30 cursor-pointer transition"
              onClick={() => {
                console.log('[v0] Toggling checklist item:', item.id, 'current state:', checklist[item.id])
                setChecklist(prev => ({
                  ...prev,
                  [item.id]: !prev[item.id],
                }))
              }}
            >
              <input
                type="checkbox"
                checked={checklist[item.id] || false}
                onChange={() => {}}
                className="mt-1 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground text-sm">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
              {item.required && (
                <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-300 text-xs">
                  Required
                </Badge>
              )}
            </div>
          ))}

          <div className="mt-4 p-3 bg-muted/30 rounded border border-border">
            <div className="text-xs font-medium text-muted-foreground mb-2">Checklist Completion</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all"
                  style={{
                    width: `${(Object.values(checklist).filter(Boolean).length / checklistItems.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground">
                {Object.values(checklist).filter(Boolean).length}/{checklistItems.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Decision Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Audit Decision</CardTitle>
          <CardDescription>
            Select your independent verification audit decision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submittedMessage && (
            <Alert className={`border-emerald-500/30 bg-emerald-900/20`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <AlertDescription className="text-emerald-300">
                {submittedMessage}
              </AlertDescription>
            </Alert>
          )}

          {!requiredItemsComplete && (
            <Alert className="border-amber-500/30 bg-amber-900/20">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <AlertDescription className="text-amber-300">
                Complete all required checklist items before making an audit decision
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-3">
            <Button
              type="button"
              onClick={() => {
                console.log('[v0] Approve button clicked')
                handleAuditDecision(
                  'approved',
                  'Independent audit passed successfully. Submission forwarded to BEE Officer for CCC issuance. Reference: CV-' +
                    submissionId +
                    '-APPROVED'
                )
              }}
              disabled={!requiredItemsComplete}
              className="w-full h-auto py-4 gap-2 bg-emerald-600/20 border-2 border-emerald-500 hover:bg-emerald-600/40 text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-left">
                <div className="font-semibold">Approve - Pass Independent Audit</div>
                <div className="text-xs opacity-80">Submission meets all CCTS requirements</div>
              </span>
            </Button>

            <Button
              type="button"
              onClick={() => {
                console.log('[v0] Conditional button clicked')
                handleAuditDecision(
                  'conditional',
                  'Conditional approval - Submission returned to ACVA for clarification. Reference: CV-' +
                    submissionId +
                    '-CONDITIONAL. ACVA must respond within 7 days.'
                )
              }}
              disabled={!requiredItemsComplete}
              className="w-full h-auto py-4 gap-2 bg-amber-600/20 border-2 border-amber-500 hover:bg-amber-600/40 text-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-left">
                <div className="font-semibold">Conditional - Return to ACVA for Clarification</div>
                <div className="text-xs opacity-80">Minor issues found - requires ACVA revision</div>
              </span>
            </Button>

            <Button
              type="button"
              onClick={() => {
                console.log('[v0] Reject button clicked')
                handleAuditDecision(
                  'rejected',
                  'Independent audit FAILED. Submission rejected due to significant compliance gaps. Reference: CV-' +
                    submissionId +
                    '-REJECTED. Entity must resubmit with full data rectification.'
                )
              }}
              disabled={!requiredItemsComplete}
              className="w-full h-auto py-4 gap-2 bg-red-600/20 border-2 border-red-500 hover:bg-red-600/40 text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-left">
                <div className="font-semibold">Reject - Fails Independent Audit</div>
                <div className="text-xs opacity-80">Critical issues found - resubmission required</div>
              </span>
            </Button>

            {auditDecision && (
              <Button
                type="button"
                onClick={() => {
                  console.log('[v0] Send to BEE Officer button clicked')
                  handleAuditDecision(
                    'submitted-bee',
                    'Independent audit report submitted to BEE Officer. Submission moved to Final Review stage. Reference: CV-' +
                      submissionId +
                      '-SUBMITTED-BEE. ETA for CCC issuance: 2-3 weeks'
                  )
                }}
                className="w-full h-auto py-4 gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-left">
                  <div className="font-semibold">Send to BEE Officer</div>
                  <div className="text-xs opacity-90">
                    Submit final audit decision ({auditDecision})
                  </div>
                </span>
              </Button>
            )}
          </div>

          <div className="bg-muted/30 rounded p-3 border border-border space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Audit Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${auditDecision ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{
                      width: auditDecision ? '100%' : '60%',
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {auditDecision ? 'Complete' : 'In Progress'}
                </span>
              </div>
            </div>

            {auditDecision && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Audit Log</p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {auditLog.map((entry, idx) => (
                    <div key={idx} className="text-xs border-l-2 border-emerald-500/30 pl-2">
                      <div className="font-medium text-foreground">{entry.action}</div>
                      <div className="text-muted-foreground text-xs">
                        {entry.timestamp.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {auditDecision && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-emerald-300 mb-1">Current Decision</p>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {auditDecision.replace('-', ' ')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ready to submit to BEE Officer for final processing
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary & Actions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Review Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="bg-muted/30 rounded p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">ACVA Comments</p>
              <p className="text-2xl font-bold text-foreground">{mockACVAComments.length}</p>
            </div>
            <div className="bg-muted/30 rounded p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Challenged</p>
              <p className="text-2xl font-bold text-amber-400">{challengedComments.length}</p>
            </div>
            <div className="bg-muted/30 rounded p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Entity Responses</p>
              <p className="text-2xl font-bold text-emerald-400">{mockEntityResponse.length}</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-border">
            <Button variant="outline">
              Save Draft Report
            </Button>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              Submit Report to BEE Officer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
