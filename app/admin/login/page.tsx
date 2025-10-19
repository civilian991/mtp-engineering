'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, AlertCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Store user info in localStorage for client-side access
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        router.push('/admin/dashboard')
        router.refresh() // Refresh to update server components
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-900">Admin Login</h1>
          <p className="text-secondary-600 mt-2">Sign in to manage MTP content</p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/30 text-error rounded-lg p-3 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            name="email"
            type="email"
            icon={<User className="h-5 w-5 text-secondary-400" />}
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            placeholder="your.email@mtp.com.sa"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            icon={<Lock className="h-5 w-5 text-secondary-400" />}
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-secondary-200">
          <p className="text-center text-sm text-secondary-600">
            Contact your administrator for login credentials
          </p>
        </div>
      </Card>
    </div>
  )
}