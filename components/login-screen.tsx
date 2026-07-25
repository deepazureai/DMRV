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
    description: 'Track GHG intensity targets, report activity data, respond to verifier queries',
    domain: 'CCTS Baseline-and-Credit | Phase 1: Target Management',
    icon: '🏭',
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: 'acva-verifier',
    label: 'ACVA Verifier',
    description: 'Execute verification plans, validate data through 6-step pipeline, issue queries & CARs',
    domain: 'Accredited Carbon Verification Agency | Phase 3: Verification Methodology',
    icon: '🔍',
    color: 'from-amber-500 to-amber-600',
  },
  {
    value: 'check-verifier',
    label: 'Check-Verifier',
    description: 'Independent review of ACVA findings, BEE compliance auditor',
    domain: 'Independent Verification | ICAP Standards',
    icon: '✓',
    color: 'from-orange-500 to-orange-600',
  },
  {
    value: 'bee-officer',
    label: 'BEE Officer',
    description: 'Review verified submissions, submit to NSCICM, issue Carbon Credit Certificates',
    domain: 'Bureau of Energy Efficiency | Phase 2: Multi-Step Approval Workflow',
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
  {
    value: 'dmrv-admin',
    label: 'DMRV Administrator',
    description: 'Manage entity batch imports from ICM, validate data integration',
    domain: 'DMRV System Administration | ICM Integration',
    icon: '🔗',
    color: 'from-slate-500 to-slate-600',
  },
]

export function LoginScreen() {
  const { setRole } = useRole()
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null)

  const handleSelectRole = (role: UserRole) => {
    setRole(role)
  }

  const handleRoleHover = (role: UserRole) => {
    setSelectedRole(role)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-2 text-balance">ICM Digital Trust Layer</h1>
          <p className="text-xl text-slate-300">Enterprise Carbon Verification Platform</p>
          <p className="text-sm text-slate-400 mt-3">Select your role and credentials to access the DMRV dashboard</p>
        </div>

        {/* Info Banner */}
        <div className="mb-10 p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 flex gap-3">
          <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-100">
            <p className="font-semibold">Demo Mode Enabled</p>
            <p className="text-blue-200 mt-1">
              This is a demonstration environment with pre-configured user profiles and mock data. Select a role below to see how each stakeholder interacts with the platform.
            </p>
          </div>
        </div>

        {/* Main Content: Role Block + Details */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Role Selection Block - Unified Container */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-600/50 bg-slate-800/40 backdrop-blur-sm p-8 shadow-2xl">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                Stakeholder Roles
              </h2>

              {/* Role Grid - 2x3 layout for 5 items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.map(role => {
                  const profile = USER_PROFILES[role.value]
                  const isSelected = selectedRole === role.value

                  return (
                    <div
                      key={role.value}
                      onMouseEnter={() => handleRoleHover(role.value)}
                      onMouseLeave={() => setSelectedRole(null)}
                      className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 p-5 text-left flex flex-col h-full cursor-pointer ${
                        isSelected
                          ? `border-blue-400 bg-slate-700/60 shadow-lg shadow-blue-500/30`
                          : `border-slate-600/50 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50`
                      }`}
                    >
                      {/* Role Type Badge */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{role.icon}</div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                          role.value === 'obligated-entity'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : role.value === 'acva-verifier'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : role.value === 'check-verifier'
                                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                : role.value === 'bee-officer'
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {role.value === 'obligated-entity' ? 'SUBMITTER' : role.value === 'acva-verifier' ? 'VERIFIER' : role.value === 'check-verifier' ? 'AUDITOR' : role.value === 'bee-officer' ? 'APPROVER' : 'OPERATOR'}
                        </div>
                      </div>

                      {/* Role Title & Description */}
                      <h3 className="font-bold text-base text-white mb-1">{role.label}</h3>
                      <p className={`text-xs mb-3 transition-colors flex-grow ${
                        isSelected ? 'text-slate-200' : 'text-slate-400'
                      }`}>
                        {role.description}
                      </p>

                      {/* User Profile - Only show on hover/select */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-600/50 space-y-1 animate-in fade-in duration-300">
                          <p className="text-xs font-semibold text-slate-200">{profile.userName}</p>
                          <p className="text-xs text-slate-400">{profile.organization}</p>
                          <p className="text-xs text-slate-500">{profile.position}</p>
                        </div>
                      )}

                      {/* Login Button - Always at bottom */}
                      <button
                        onClick={() => handleSelectRole(role.value)}
                        className="mt-auto pt-3 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
                      >
                        Login as {role.label}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Details Panel - Shows on role selection */}
          {selectedRole && (
            <div className="lg:col-span-1 animate-in fade-in duration-300">
              <div className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm p-6 shadow-2xl sticky top-6">
                <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-widest">Credentials</h3>

                {selectedRole && (() => {
                  const profile = USER_PROFILES[selectedRole]
                  return (
                    <div className="space-y-5">
                      {/* User Card */}
                      <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
                        <div className="text-2xl mb-3">{roles.find(r => r.value === selectedRole)?.icon}</div>
                        <p className="font-semibold text-white text-sm">{profile.userName}</p>
                        <p className="text-xs text-slate-400 mt-1">{profile.organization}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{profile.position}</p>
                      </div>

                      {/* Login Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all"
                        onClick={() => handleSelectRole(selectedRole)}
                      >
                        Login as {roles.find(r => r.value === selectedRole)?.label}
                      </Button>

                      {/* Role Details */}
                      <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/20">
                        <p className="text-xs font-semibold text-slate-300 mb-2">Role Details</p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {roles.find(r => r.value === selectedRole)?.domain}
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 mt-12">
          <p>ICM Digital Trust Layer | Enterprise Carbon Verification Platform</p>
          <p className="mt-1">DMRV - Digital Measurement, Reporting & Verification System</p>
        </div>
      </div>
    </div>
  )
}
