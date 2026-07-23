'use client'

import React, { useState } from 'react'
import { Query, CommentThread, DmrvActor } from '@/lib/dmrv-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, Clock, CheckCircle, AlertCircle, SendIcon } from 'lucide-react'
import { format } from 'date-fns'

interface QueryCommentThreadProps {
  query: Query
  commentThread: CommentThread
  currentActor: DmrvActor
  onReply: (message: string) => void
  onClose: () => void
}

export function QueryCommentThread({
  query,
  commentThread,
  currentActor,
  onReply,
  onClose,
}: QueryCommentThreadProps) {
  const [replyText, setReplyText] = useState('')
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      onReply(replyText)
      setReplyText('')
      setShowReplyBox(false)
      setIsSubmitting(false)
    }, 500)
  }

  const isEntity = currentActor.role === 'obligated-entity'
  const isAcva = currentActor.role === 'acva'

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      case 'responded':
        return <Clock className="w-5 h-5 text-blue-600" />
      case 'closed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      open: 'Awaiting Response',
      responded: 'Response Submitted',
      closed: 'Resolved',
    }
    return labels[status] || status
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm')
    } catch {
      return timestamp
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <DialogTitle className="text-lg flex items-center gap-2">
                {getStatusIcon(query.status)}
                {query.title}
              </DialogTitle>
              <DialogDescription>
                <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Query ID:</span>
                    <p className="font-mono text-foreground">{query.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-semibold text-foreground">{query.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-semibold text-foreground">{getStatusLabel(query.status)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Due:</span>
                    <p className="font-semibold text-foreground">{formatTimestamp(query.dueDate)}</p>
                  </div>
                </div>
              </DialogDescription>
            </div>
            <Badge className="mt-2">{query.type}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Query Details */}
          <Card className="border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Query Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Description</p>
                <p className="text-sm text-foreground">{query.description}</p>
              </div>
              {query.fieldName && (
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Related Field</p>
                  <Badge variant="secondary">{query.fieldName}</Badge>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Raised By</p>
                  <p className="font-semibold">ACVA ({query.raisedBy})</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Raised On</p>
                  <p className="font-semibold">{formatTimestamp(query.raisedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comment Thread */}
          <div className="space-y-3 max-h-64 overflow-y-auto border rounded-lg p-4">
            {commentThread.comments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No comments yet</p>
            ) : (
              commentThread.comments.map((comment, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    comment.authorRole === 'obligated-entity'
                      ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                      : 'bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {comment.authorRole === 'obligated-entity' ? 'Obligated Entity' : 'ACVA'} •{' '}
                        {formatTimestamp(comment.timestamp)}
                      </p>
                    </div>
                    {comment.isSystemMessage && (
                      <Badge variant="outline" className="text-xs">
                        System
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground">{comment.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Response Section */}
          {query.status !== 'closed' && (
            <div className="space-y-3 border-t pt-4">
              {!showReplyBox ? (
                <Button
                  onClick={() => setShowReplyBox(true)}
                  className="w-full"
                  variant={query.status === 'open' && isEntity ? 'default' : 'outline'}
                >
                  {query.status === 'open' && isEntity
                    ? 'Submit Response'
                    : query.status === 'responded' && isAcva
                      ? 'Close Query'
                      : 'Add Comment'}
                </Button>
              ) : (
                <>
                  <Textarea
                    placeholder={
                      query.status === 'open' && isEntity
                        ? "Provide your response to address the ACVA's query..."
                        : query.status === 'responded' && isAcva
                          ? 'Verify the response and close the query...'
                          : 'Add a comment...'
                    }
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitReply}
                      disabled={!replyText.trim() || isSubmitting}
                      className="flex-1"
                    >
                      <SendIcon className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowReplyBox(false)
                        setReplyText('')
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Timeline */}
          {query.respondedAt && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-2">Timeline</h4>
              <div className="space-y-2 text-xs">
                <div className="flex gap-3">
                  <div className="text-muted-foreground font-medium">Raised:</div>
                  <div>{formatTimestamp(query.raisedAt)}</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-muted-foreground font-medium">Response:</div>
                  <div>{formatTimestamp(query.respondedAt)}</div>
                </div>
                {query.closedAt && (
                  <div className="flex gap-3">
                    <div className="text-muted-foreground font-medium">Closed:</div>
                    <div>{formatTimestamp(query.closedAt)}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
