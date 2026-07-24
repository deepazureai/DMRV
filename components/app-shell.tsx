'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, Menu, X, LogOut } from 'lucide-react'
import { useRole } from '@/lib/role-context'
import { UserRole } from '@/lib/dmrv-data-mapping'

interface AppShellProps {
  children: React.ReactNode
  currentPage?: string
  lifecycleEvents?: Array<{
    timestamp: string
    status: string
    actor: string
    action: string
  }>
}

type NavigationItem = {
  href: string
  label: string
  icon: string
  roles?: UserRole[]
}

export function AppShell({ children, currentPage = 'dashboard', lifecycleEvents = [] }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const router = useRouter()
  const { clearRole, currentRole, userAvatar, userName, userOrganization, userPosition } = useRole()

  const allNavigationItems: NavigationItem[] = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/golden-path', label: 'Golden Path', icon: '⭐' },
    { href: '/entities', label: 'Entities', icon: '🏢', roles: ['bee-officer'] },
    { href: '/submissions', label: 'Submissions', icon: '📤', roles: ['obligated-entity', 'bee-officer', 'acva-verifier'] },
    { href: '/data-quality', label: 'Data Quality', icon: '✓', roles: ['obligated-entity', 'acva-verifier'] },
    { href: '/methodology', label: 'Methodology', icon: '📐', roles: ['obligated-entity', 'acva-verifier'] },
    { href: '/evidence', label: 'Evidence', icon: '📄', roles: ['obligated-entity'] },
    { href: '/verification', label: 'Verification', icon: '🔍', roles: ['acva-verifier', 'check-verifier'] },
    { href: '/approvals', label: 'Approvals', icon: '✅', roles: ['bee-officer', 'check-verifier'] },
    { href: '/blockchain', label: 'Blockchain', icon: '⛓', roles: ['icm-registry', 'bee-officer'] },
    { href: '/registry', label: 'Registry', icon: '📋', roles: ['icm-registry'] },
    { href: '/review-comments', label: 'Review Comments', icon: '💬', roles: ['acva-verifier', 'check-verifier', 'bee-officer'] },
    { href: '/settings', label: 'Settings', icon: '⚙' }
  ]

  // Filter navigation items based on current role
  const navigationItems = allNavigationItems.filter(item => {
    // Items without role restrictions are always shown
    if (!item.roles) return true
    // If user has a role and it's in the allowed roles, show it
    if (currentRole && item.roles.includes(currentRole)) return true
    return false
  })

  const statusColors: Record<string, string> = {
    submitted: 'bg-blue-50 text-blue-900 border-blue-200',
    under_review: 'bg-amber-50 text-amber-900 border-amber-200',
    verified: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    approved: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    registered: 'bg-green-50 text-green-900 border-green-200'
  }

  const handleChangeRole = () => {
    clearRole()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-foreground hover:bg-muted lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-primary">ICM Digital Trust Layer</h1>
              <p className="text-xs text-muted-foreground">Enterprise Carbon Verification Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 hover:bg-muted/80 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {userAvatar}
                </div>
                <div className="hidden flex-col gap-1 sm:flex items-start">
                  <span className="text-sm font-medium text-foreground">{userName}</span>
                  <span className="text-xs text-muted-foreground">{userOrganization}</span>
                </div>
                <ChevronDown size={16} className={`text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
                  <button
                    onClick={handleChangeRole}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors border-b border-border"
                  >
                    <LogOut size={16} />
                    Change Role
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav
          className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar transition-all duration-200 lg:relative lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-1 p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  currentPage === item.href.split('/')[1]
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}

          {/* Lifecycle Ribbon - Only show for dashboard page to avoid overlap */}
          {lifecycleEvents.length > 0 && currentPage === 'dashboard' && (
            <div className="border-t border-border bg-card">
              <div className="max-h-56 overflow-y-auto">
                <div className="space-y-0">
                  {lifecycleEvents.map((event, idx) => {
                    const statusColor = statusColors[event.status] || 'bg-gray-50 text-gray-900 border-gray-200'
                    return (
                      <div key={idx} className="flex items-start gap-4 border-b border-border last:border-b-0 px-6 py-3">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusColor}`}>
                            {event.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-sm">
                            <time className="font-mono text-xs text-muted-foreground">{event.timestamp}</time>
                            <span className="font-medium text-foreground">{event.actor}</span>
                          </div>
                          <p className="mt-1 text-sm text-foreground">{event.action}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
