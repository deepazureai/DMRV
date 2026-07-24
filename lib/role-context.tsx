'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole =
  | 'obligated-entity'
  | 'acva-verifier'
  | 'check-verifier'
  | 'bee-officer'
  | 'icm-registry'

export interface RoleContextType {
  currentRole: UserRole | null
  setRole: (role: UserRole) => void
  clearRole: () => void
  userId: string
  userName: string
  roleDomain: string
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

const roleLabels: Record<UserRole, string> = {
  'obligated-entity': 'Obligated Entity',
  'acva-verifier': 'ACVA (Verification)',
  'check-verifier': 'Check-Verifier',
  'bee-officer': 'BEE Officer',
  'icm-registry': 'ICM Registry',
}

const roleUserNames: Record<UserRole, string> = {
  'obligated-entity': 'Eastern Cement Works',
  'acva-verifier': 'TUV-SUD India (ACVA)',
  'check-verifier': 'Bureau Veritas (CV)',
  'bee-officer': 'BEE Headquarters',
  'icm-registry': 'Indian Carbon Market Registry',
}

const roleDomainDesc: Record<UserRole, string> = {
  'obligated-entity': 'CCTS Obligated Entity | GEI Reporting',
  'acva-verifier': 'Accredited Carbon Verification Agency | dMRV Validation & Verification',
  'check-verifier': 'Independent Check-Verification | Audit Trail Confirmation',
  'bee-officer': 'Bureau of Energy Efficiency | CCC Issuance & Regulatory Oversight',
  'icm-registry': 'Indian Carbon Market Registry | Blockchain Registration & Trading',
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

  const handleClearRole = () => {
    setCurrentRole(null)
    localStorage.removeItem('userRole')
  }

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole: handleSetRole,
        clearRole: handleClearRole,
        userId,
        userName: currentRole ? roleUserNames[currentRole] : '',
        roleDomain: currentRole ? roleDomainDesc[currentRole] : '',
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
