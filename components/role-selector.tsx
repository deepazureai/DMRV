'use client'

import React from 'react'
import { useRole, getRoleLabel, type UserRole } from '@/lib/role-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const roles: Array<{
  value: UserRole
  label: string
  description: string
  domain: string
  icon: string
  color: string
}> = [
  {
    value: 'obligated-entity',
    label: 'Obligated Entity',
    description: 'Monitor GEI, report activity data, respond to queries',
    domain: 'CCTS Baseline-and-Credit | Data Submitter',
    icon: '🏭',
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: 'acva-verifier',
    label: 'ACVA Verifier',
    description: 'Validate data through 6-step pipeline, issue queries & CARs',
    domain: 'Accredited Carbon Verification Agency | dMRV Validation',
    icon: '🔍',
    color: 'from-amber-500 to-amber-600',
  },
  {
    value: 'check-verifier',
    label: 'Check-Verifier',
    description: 'Independent review of ACVA findings, EU compliance',
    domain: 'Independent Verification | ICAP Standards',
    icon: '✓',
    color: 'from-orange-500 to-orange-600',
  },
  {
    value: 'bee-officer',
    label: 'BEE Officer',
    description: 'Approve submissions and issue Carbon Credit Certificates',
    domain: 'Bureau of Energy Efficiency | CCC Issuance',
    icon: '✅',
    color: 'from-green-500 to-green-600',
  },
  {
    value: 'icm-registry',
    label: 'ICM Registry',
    description: 'Register CCCs on blockchain, manage market operations',
    domain: 'Indian Carbon Market | Blockchain Ledger',
    icon: '⛓',
    color: 'from-purple-500 to-purple-600',
  },
]

export function RoleSelector() {
  const { setRole, currentRole } = useRole()
  const router = useRouter()

  const handleSelectRole = (role: UserRole) => {
    setRole(role)
    setTimeout(() => {
      router.push('/')
    }, 300)
  }

  if (currentRole) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ICM Digital Trust Layer</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Carbon Credit Verification and Blockchain Registry Platform
          </p>
          <p className="text-muted-foreground">Select your role to get started</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {roles.map(role => (
            <div
              key={role.value}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              <div className="relative space-y-3">
                <div className="text-4xl">{role.icon}</div>

                <div>
                  <h3 className="font-bold text-base text-foreground text-left">{role.label}</h3>
                  <p className="text-xs text-primary font-semibold text-left mt-1">{role.domain}</p>
                  <p className="text-xs text-muted-foreground text-left mt-2 line-clamp-2">{role.description}</p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => handleSelectRole(role.value)}
                    className="w-full"
                    variant="outline"
                    size="sm"
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-card border border-border">
          <h3 className="font-semibold mb-3">About the Platform</h3>
          <p className="text-sm text-muted-foreground">
            The ICM Digital Trust Layer enables transparent, verifiable carbon credit management through a complete workflow:
            from entity submission and data validation, through independent verification, regulatory approval, to immutable
            blockchain recording. Each stakeholder role manages specific workflow stages with built-in quality assurance and
            audit trails.
          </p>
        </div>
      </div>
    </div>
  )
}
