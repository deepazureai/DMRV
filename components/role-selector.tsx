'use client'

import React from 'react'
import { useRole, getRoleLabel, type UserRole } from '@/lib/role-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const roles: Array<{
  value: UserRole
  label: string
  description: string
  icon: string
  color: string
}> = [
  {
    value: 'entity-submitter',
    label: 'Entity Submitter',
    description: 'Upload and submit emissions data for carbon credit verification',
    icon: '📤',
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: 'verifier-auditor',
    label: 'Verifier Auditor',
    description: 'Review submissions and validate data quality for compliance',
    icon: '🔍',
    color: 'from-amber-500 to-amber-600',
  },
  {
    value: 'bee-regulator',
    label: 'BEE Regulator',
    description: 'Approve verified submissions and issue carbon credits',
    icon: '✅',
    color: 'from-green-500 to-green-600',
  },
  {
    value: 'registry-operator',
    label: 'Registry Operator',
    description: 'Register approved credits on blockchain for immutable recording',
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map(role => (
            <button
              key={role.value}
              onClick={() => handleSelectRole(role.value)}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              <div className="relative space-y-4">
                <div className="text-5xl">{role.icon}</div>

                <div>
                  <h3 className="font-bold text-lg text-foreground text-left">{role.label}</h3>
                  <p className="text-sm text-muted-foreground text-left mt-2 line-clamp-2">{role.description}</p>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    size="sm"
                  >
                    Select Role
                  </Button>
                </div>
              </div>
            </button>
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
