'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: 'super_admin' | 'admin' | 'editor';
}

export function useAuth(redirectTo?: string) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkAuth()

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkAuth()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        localStorage.removeItem('adminUser')
        if (redirectTo) {
          router.push(redirectTo)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)

        // Store in localStorage for other components
        localStorage.setItem('adminUser', JSON.stringify(data.user))
      } else {
        setUser(null)
        localStorage.removeItem('adminUser')

        if (redirectTo) {
          router.push(redirectTo)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
      localStorage.removeItem('adminUser')

      if (redirectTo) {
        router.push(redirectTo)
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('adminUser')
      router.push('/admin/login')
      router.refresh()
    }
  }

  return { user, loading, logout, checkAuth }
}