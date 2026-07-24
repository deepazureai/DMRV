'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, AlertCircle, Clock, Link as LinkIcon, Zap, Lock, Copy, Download } from 'lucide-react'

// Mock blockchain registrations
const mockBlockchainRecords = [
  {
    id: 'BLOCK-2024-001',
    cccId: 'CCC-2024-Q1-001',
    entity: 'Eastern Cement Works',
    cccAmount: 19288,
    quarter: 'Q1 2024',
    status: 'registered',
    blockchainHash: '0x4a3d2c1b9e8f7a6d5c4b3a2f1e0d9c8b',
    registrationDate: '2024-04-02',
    blockHeight: 15847392,
    transactionId: 'TX-2024-0001',
    immutable: true
  },
  {
    id: 'BLOCK-2024-002',
    cccId: 'CCC-2024-Q1-002',
    entity: 'Green Steel Manufacturing',
    cccAmount: 5200,
    quarter: 'Q1 2024',
    status: 'pending',
    blockchainHash: null,
    registrationDate: null,
    blockHeight: null,
    transactionId: null,
    immutable: false
  },
  {
    id: 'BLOCK-2024-003',
    cccId: 'CCC-2024-Q1-003',
    entity: 'Sustainable Energy Solutions',
    cccAmount: 12450,
    quarter: 'Q1 2024',
    status: 'registered',
    blockchainHash: '0x9f8e7d6c5b4a3e2f1d0c9b8a7e6f5d4c',
    registrationDate: '2024-04-01',
    blockHeight: 15847285,
    transactionId: 'TX-2024-0002',
    immutable: true
  }
]

export function ICMRegistryDashboard() {
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const [registering, setRegistering] = useState<string | null>(null)

  const registeredCount = mockBlockchainRecords.filter(r => r.status === 'registered').length
  const pendingCount = mockBlockchainRecords.filter(r => r.status === 'pending').length
  const totalCCCs = mockBlockchainRecords.reduce((sum, r) => sum + r.cccAmount, 0)

  const selectedData = mockBlockchainRecords.find(r => r.id === selectedRecord)

  const handleRegisterBlockchain = async () => {
    if (!selectedData) return
    setRegistering(selectedData.id)
    // Simulate blockchain registration
    await new Promise(resolve => setTimeout(resolve, 3000))
    setRegistering(null)
    alert(`CCC Registered on Blockchain!\nHash: ${selectedData.blockchainHash}\nThis is immutable and permanent.`)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">ICM Registry & Blockchain Ledger</h1>
        <p className="text-muted-foreground">International Carbon Market Registry | Immutable CCC Recording & Verification</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Registered on Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">{registeredCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Immutable records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting blockchain</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total CCCs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{totalCCCs.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">In registry</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">99.98%</p>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Registration Queue */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CCC Registry Queue</CardTitle>
              <CardDescription>Certificates pending and registered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockBlockchainRecords.map(record => (
                <button
                  key={record.id}
                  onClick={() => setSelectedRecord(record.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedRecord === record.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-border hover:border-slate-500 hover:bg-slate-700/30'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm text-foreground">{record.entity}</p>
                      {record.status === 'registered' ? (
                        <Badge variant="secondary" className="text-xs bg-emerald-600/20 text-emerald-300">Registered</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">Pending</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{record.cccId}</p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                        {record.cccAmount.toLocaleString()} CCC
                      </span>
                      {record.immutable && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                          <Lock className="w-3 h-3 inline mr-1" />
                          Immutable
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Registration Details */}
        <div className="lg:col-span-2 space-y-4">
          {selectedData ? (
            <>
              {/* CCC Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedData.entity}</CardTitle>
                      <CardDescription className="mt-2">{selectedData.cccId}</CardDescription>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      selectedData.status === 'registered'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      {selectedData.status.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
              </Card>

              {/* Blockchain Details */}
              {selectedData.status === 'registered' && selectedData.blockchainHash && (
                <Card className="border-emerald-500/30 bg-emerald-900/10">
                  <CardHeader>
                    <CardTitle className="text-emerald-300">Blockchain Registration Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Blockchain Hash */}
                    <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Blockchain Hash (SHA-256)</p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-foreground break-all">{selectedData.blockchainHash}</code>
                        <button
                          onClick={() => copyToClipboard(selectedData.blockchainHash!)}
                          className="p-1 hover:bg-slate-600 rounded transition-colors"
                        >
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Transaction ID</p>
                        <p className="text-sm font-mono text-foreground">{selectedData.transactionId}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Block Height</p>
                        <p className="text-sm font-mono text-foreground">{selectedData.blockHeight?.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Registration Timestamp */}
                    <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Registered On</p>
                      <p className="text-sm text-foreground">{selectedData.registrationDate}</p>
                      <p className="text-xs text-muted-foreground mt-1">Immutable and permanent</p>
                    </div>

                    {/* Verification Badge */}
                    <div className="p-3 rounded-lg bg-emerald-900/20 border border-emerald-500/30">
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-emerald-300 text-sm">Cryptographically Secured</p>
                          <p className="text-xs text-muted-foreground mt-1">This record cannot be altered or deleted</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CCC Details */}
              <Card className="border-blue-500/30 bg-blue-900/10">
                <CardHeader>
                  <CardTitle className="text-blue-300">Carbon Credit Certificate Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                      <p className="text-xs font-medium text-muted-foreground mb-1">CCC Amount</p>
                      <p className="text-2xl font-bold text-blue-300">{selectedData.cccAmount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">Carbon Credits</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Reporting Period</p>
                      <p className="text-lg font-semibold text-foreground">{selectedData.quarter}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Trail */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Verification & Approval Trail</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { step: 1, actor: 'Obligated Entity', action: 'Submitted data', complete: true },
                    { step: 2, actor: 'ACVA Verifier', action: 'Verified & approved', complete: true },
                    { step: 3, actor: 'Check-Verifier', action: 'Independent audit completed', complete: true },
                    { step: 4, actor: 'BEE Officer', action: 'CCC issued', complete: true },
                    { step: 5, actor: 'ICM Registry', action: 'Registered on blockchain', complete: selectedData.status === 'registered' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          item.complete ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-muted-foreground'
                        }`}>
                          {item.complete ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                        </div>
                        {idx < 4 && <div className="w-0.5 h-8 bg-slate-700 mt-1" />}
                      </div>
                      <div className="py-2">
                        <p className="font-semibold text-foreground text-sm">{item.actor}</p>
                        <p className="text-xs text-muted-foreground">{item.action}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {selectedData.status === 'pending' ? (
                <Button
                  onClick={handleRegisterBlockchain}
                  disabled={registering === selectedData.id}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {registering === selectedData.id ? 'Registering on Blockchain...' : 'Register CCC on Blockchain'}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Blockchain Proof
                  </Button>
                  <Button variant="outline" className="w-full">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    View on Blockchain Explorer
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-semibold mb-2">Select a record</p>
                <p className="text-sm text-muted-foreground">Choose a CCC registration to view blockchain details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Blockchain Network Info */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm">Blockchain Network Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Network</p>
              <p className="font-semibold text-foreground">Ethereum Mainnet</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Smart Contract</p>
              <p className="font-mono text-xs text-foreground truncate">0x7f...3a2b</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Total Registrations</p>
              <p className="font-semibold text-foreground">{mockBlockchainRecords.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Gas Efficiency</p>
              <p className="font-semibold text-emerald-400">Optimized</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
