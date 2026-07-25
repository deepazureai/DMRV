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

export default function CheckVerifierReviewPage() {
  const params = useParams()
  const submissionId = params.id as string
  const [challengeMode, setChallengeMode] = useState(false)
  const [challengedComments, setChallengedComments] = useState<string[]>([])
  const [challengeTexts, setChallengeTexts] = useState<Record<string, string>>({})
  const [newComments, setNewComments] = useState<string>('')
  const [independentIssues, setIndependentIssues] = useState<string>('')

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
