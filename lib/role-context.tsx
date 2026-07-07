'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole =
  | 'entity-submitter'
  | 'verifier-auditor'
  | 'bee-regulator'
  | 'registry-operator'
  | 'sector-officer'

export interface RoleContextType {
  currentRole: UserRole | null
  setRole: (role: UserRole) => void
  userId: string
  userName: string
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

const roleLabels: Record<UserRole, string> = {
  'entity-submitter': 'Entity Submitter',
  'verifier-auditor': 'Verifier Auditor',
  'bee-regulator': 'BEE Regulator',
  'registry-operator': 'Registry Operator',
  'sector-officer': 'Sector Officer',
}

const roleUserNames: Record<UserRole, string> = {
  'entity-submitter': 'ECWL Operations',
  'verifier-auditor': 'TUV-SUD India',
  'bee-regulator': 'Ministry of Power',
  'registry-operator': 'NVCCC Registry',
  'sector-officer': 'State Nodal Agency',
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null)
  const [userId] = useState(() => `USER-${Math.random().toString(36).substring(7)}`)

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole | null
    if (savedRole) {
      setCurrentRole(savedRole)
    }
  }, [])

  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role)
    localStorage.setItem('userRole', role)
  }

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole: handleSetRole,
        userId,
        userName: currentRole ? roleUserNames[currentRole] : '',
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within RoleProvider')
  }
  return context
}

export function getRoleLabel(role: UserRole): string {
  return roleLabels[role]
}
