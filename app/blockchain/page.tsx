'use client'

import React from 'react'
import { AppShell } from '@/components/app-shell'
import { mockBlockchainPackets, mockSubmissions, getBlockchainPacketBySubmissionId } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Copy, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="text-amber-600" size={20} />,
  signed: <Clock className="text-blue-600" size={20} />,
  registered: <CheckCircle className="text-emerald-600" size={20} />,
  failed: <AlertCircle className="text-red-600" size={20} />
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

export default function BlockchainPage() {
  return (
    <AppShell currentPage="blockchain">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Blockchain Registry</h2>
          <p className="text-muted-foreground">Track carbon credit registration and blockchain transaction history</p>
        </div>

        <div className="space-y-4">
          {mockBlockchainPackets.map((packet) => {
            const submission = mockSubmissions.find(s => s.id === packet.submissionId)

            return (
              <div key={packet.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{statusIcons[packet.status]}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Packet ID: {packet.id}</h3>
                      <p className="text-sm text-muted-foreground">Submission: {submission?.period}</p>
                    </div>
                  </div>
                  <Badge
                    variant={packet.status === 'registered' ? 'default' : packet.status === 'failed' ? 'destructive' : 'secondary'}
                    className="capitalize"
                  >
                    {packet.status}
                  </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  {/* CCC Information */}
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Carbon Credit Certificate Amount</p>
                        <p className="mt-2 text-2xl font-bold text-primary">{packet.cccAmount.toLocaleString()} CCCs</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Created At</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{new Date(packet.createdAt).toLocaleString()}</p>
                      </div>
                      {packet.registeredAt && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Registered At</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">{new Date(packet.registeredAt).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hash Information */}
                  <div className="space-y-4">
                    {packet.hash && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Packet Hash</p>
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                          <code className="flex-1 truncate font-mono text-xs text-foreground">{packet.hash}</code>
                          <button
                            onClick={() => copyToClipboard(packet.hash || '')}
                            className="p-1.5 hover:bg-muted transition-colors rounded"
                          >
                            <Copy size={14} className="text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    )}

                    {packet.registryTxHash && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Registry Transaction Hash</p>
                        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 border border-emerald-200">
                          <code className="flex-1 truncate font-mono text-xs text-emerald-900">{packet.registryTxHash}</code>
                          <button
                            onClick={() => copyToClipboard(packet.registryTxHash || '')}
                            className="p-1.5 hover:bg-emerald-100 transition-colors rounded"
                          >
                            <Copy size={14} className="text-emerald-700" />
                          </button>
                          <a
                            href="#"
                            className="p-1.5 hover:bg-emerald-100 transition-colors rounded"
                            title="View on blockchain explorer"
                          >
                            <ExternalLink size={14} className="text-emerald-700" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {packet.status === 'registered' && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-900 mb-2">✓ Successfully Registered</p>
                    <p className="text-xs text-emerald-800">
                      Carbon credits have been permanently recorded on the blockchain registry and are now tracked in the immutable ledger.
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
