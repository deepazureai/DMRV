'use client'

import React from 'react'
import { useRole } from '@/lib/role-context'
import { USER_PROFILES, UserRole } from '@/lib/dmrv-data-mapping'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

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
    description: 'Monitor GEI, report activity data, respond to verifier queries',
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
    description: 'Independent review of ACVA findings, EU compliance auditor',
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

export function LoginScreen() {
  const { setRole } = useRole()

  const handleSelectRole = (role: UserRole) => {
    setRole(role)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">ICM Digital Trust Layer</h1>
          <p className="text-lg text-slate-300">Enterprise Carbon Verification Platform</p>
          <p className="text-sm text-slate-400 mt-2">Select your role to access the DMRV dashboard</p>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-lg bg-blue-900/30 border border-blue-500/30 flex gap-3">
          <AlertCircle className="text-blue-400 flex-shrink-0" size={20} />
          <div className="text-sm text-blue-100">
            <p className="font-semibold">Demo Mode Enabled</p>
            <p className="text-blue-200 mt-1">
              This is a demonstration environment with pre-configured user profiles and mock data. Select a role below to see how each stakeholder interacts with the platform.
            </p>
          </div>
        </div>

        {/* Role Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {roles.map(role => {
            const profile = USER_PROFILES[role.value]
            return (
              <button
                key={role.value}
                onClick={() => handleSelectRole(role.value)}
                className="group relative overflow-hidden rounded-lg border border-slate-600 bg-slate-800/50 hover:border-blue-500 p-6 transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className="relative space-y-3">
                  <div className="text-4xl">{role.icon}</div>

                  <div className="text-left">
                    <h3 className="font-bold text-base text-white">{role.label}</h3>
                    <p className="text-xs text-blue-300 font-semibold mt-1">{role.domain}</p>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">{role.description}</p>
                  </div>

                  {/* User Details */}
                  <div className="text-left mt-4 pt-3 border-t border-slate-600">
                    <p className="text-xs text-slate-400">
                      <span className="text-slate-300 font-semibold">{profile.userName}</span>
                    </p>
                    <p className="text-xs text-slate-400">{profile.organization}</p>
                    <p className="text-xs text-slate-500">{profile.position}</p>
                  </div>

                  <div className="pt-3">
                    <Button
                      className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleSelectRole(role.value)}
                    >
                      Login as {role.label}
                    </Button>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          <p>ICM Digital Trust Layer | Enterprise Carbon Verification Platform</p>
          <p className="mt-1">DMRV - Digital Measurement, Reporting & Verification System</p>
        </div>
      </div>
    </div>
  )
}
