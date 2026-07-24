'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { USER_PROFILES, UserProfile } from './dmrv-data-mapping'

export type UserRole =
  | 'obligated-entity'
  | 'acva-verifier'
  | 'check-verifier'
  | 'bee-officer'
  | 'icm-registry'
  | 'dmrv-admin'

export interface RoleContextType {
  currentRole: UserRole | null
  userProfile: UserProfile | null
  setRole: (role: UserRole) => void
  clearRole: () => void
  userId: string
  userName: string
  userOrganization: string
  userPosition: string
  roleDomain: string
  userEmail: string
  userAvatar: string
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

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

  const userProfile = currentRole ? USER_PROFILES[currentRole] : null

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        userProfile,
        setRole: handleSetRole,
        clearRole: handleClearRole,
        userId,
        userName: userProfile?.userName || '',
        userOrganization: userProfile?.organization || '',
        userPosition: userProfile?.position || '',
        roleDomain: userProfile?.domain || '',
        userEmail: userProfile?.email || '',
        userAvatar: userProfile?.avatar || '',
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
