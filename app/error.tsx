'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Something went wrong!
          </h1>
          <p className="text-lg text-secondary-600 mb-6">
            We encountered an unexpected error. Our team has been notified and is working on a fix.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-mono text-red-800">
                Error: {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button as="span" variant="outline" size="lg" className="w-full">
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-12 border-t border-secondary-200">
          <p className="text-sm text-secondary-500">
            If this problem persists, please{' '}
            <Link href="/en/contact" className="text-primary-600 hover:text-primary-700">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}