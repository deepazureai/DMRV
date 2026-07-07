'use client'

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { PersonaType } from '@/lib/mock-data'
import { Building2, Shield, CheckCircle, Zap, Users } from 'lucide-react'

interface PersonaCard {
  id: PersonaType
  title: string
  description: string
  icon: React.ReactNode
  color: string
  capabilities: string[]
}

const personas: PersonaCard[] = [
  {
    id: 'entity',
    title: 'Entity / Project Developer',
    description: 'Register projects and submit carbon credit data for verification',
    icon: <Building2 size={32} />,
    color: 'from-blue-500 to-blue-600',
    capabilities: [
      'Register projects',
      'Submit carbon credit data',
      'Upload evidence documents',
      'Track verification status',
      'Receive CCCs'
    ]
  },
  {
    id: 'verifier',
    title: 'Third-Party Verifier',
    description: 'Review and verify submitted carbon credit calculations',
    icon: <CheckCircle size={32} />,
    color: 'from-green-500 to-green-600',
    capabilities: [
      'Review submissions',
      'Verify data quality',
      'Approve calculations',
      'Generate verification reports',
      'Communicate with entities'
    ]
  },
  {
    id: 'bee-regulator',
    title: 'BEE Regulator',
    description: 'Oversee and approve verified carbon credit submissions',
    icon: <Shield size={32} />,
    color: 'from-purple-500 to-purple-600',
    capabilities: [
      'Review verified submissions',
      'Approve for registry',
      'Monitor compliance',
      'Generate regulatory reports',
      'Set policies'
    ]
  },
  {
    id: 'registry-operator',
    title: 'Registry Operator',
    description: 'Manage blockchain registry and carbon credit transactions',
    icon: <Zap size={32} />,
    color: 'from-orange-500 to-orange-600',
    capabilities: [
      'Register CCCs on blockchain',
      'Manage transactions',
      'Monitor network health',
      'Track CCC lifecycle',
      'Generate registry reports'
    ]
  },
  {
    id: 'sector-officer',
    title: 'Sector Officer',
    description: 'Oversee sector-wide carbon credit activities and reporting',
    icon: <Users size={32} />,
    color: 'from-pink-500 to-pink-600',
    capabilities: [
      'Monitor sector trends',
      'Review sector data',
      'Generate analytics',
      'Coordinate stakeholders',
      'Policy advisory'
    ]
  }
]

export default function OnboardingPage() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">ICM Digital Trust Layer</h1>
            <p className="text-lg text-muted-foreground">Enterprise Carbon Verification and Blockchain Registry Platform</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-foreground">Select Your Role</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your organization type to access the appropriate dashboard and tools for managing carbon credits through our digital trust platform
            </p>
          </div>

          {/* Persona Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`group relative rounded-xl border-2 p-6 text-left transition-all ${
                  selectedPersona === persona.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Icon */}
                <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${persona.color} p-3 text-white`}>
                  {persona.icon}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-foreground">{persona.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{persona.description}</p>

                {/* Capabilities */}
                <div className="space-y-2 mb-4">
                  {persona.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {cap}
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {selectedPersona === persona.id && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row justify-center pt-4">
            {selectedPersona ? (
              <>
                <Link
                  href="/"
                  className="rounded-lg bg-primary px-8 py-3 text-center font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Continue as {personas.find(p => p.id === selectedPersona)?.title.split(' ')[0]}
                </Link>
                <button
                  onClick={() => setSelectedPersona(null)}
                  className="rounded-lg border border-border px-8 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Choose Different Role
                </button>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-sm py-8">
                Select a role above to continue
              </p>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Secure & Compliant</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade security with role-based access control and regulatory compliance
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Blockchain Verified</h3>
            <p className="text-sm text-muted-foreground">
              All carbon credits are permanently registered on immutable blockchain ledgers
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Real-Time Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor submissions, verifications, and approvals through the entire lifecycle
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-muted-foreground">
          <p>ICM Digital Trust Layer © {new Date().getFullYear()} • Enterprise Carbon Credit Verification Platform</p>
        </div>
      </footer>
    </div>
  )
}
