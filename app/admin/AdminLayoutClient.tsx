'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  Mail,
  NewspaperIcon,
  Shield
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Careers', href: '/admin/careers', icon: Users },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  { name: 'Team', href: '/admin/team', icon: Building2 },
  { name: 'News', href: '/admin/news', icon: NewspaperIcon },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, loading, logout } = useAuth('/admin/login')

  // Don't show layout for login page or while loading
  if (pathname === '/admin/login' || loading) {
    return <>{children}</>
  }

  // If no user after loading, they'll be redirected by useAuth
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col h-screen`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-primary-600 mr-2" />
            <span className="text-xl font-bold text-secondary-900">MTP Admin</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6 text-secondary-600" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-700 hover:bg-secondary-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t p-4">
          <div className="mb-3 px-3 py-2">
            <div className="flex items-center text-xs text-secondary-500">
              <Shield className="h-4 w-4 mr-2" />
              <span className="capitalize">{user.role.replace('_', ' ')}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-secondary-600" />
            </button>
            <h1 className="text-lg font-semibold text-secondary-900">
              {navigation.find(item => item.href === pathname)?.name || 'Admin'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-secondary-600">{user.email}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}