'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-secondary-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-secondary-600 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button as="span" variant="primary" size="lg" className="w-full sm:w-auto">
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-secondary-300 text-base font-medium rounded-lg text-secondary-700 bg-white hover:bg-secondary-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-12 border-t border-secondary-200">
          <p className="text-sm text-secondary-500 mb-4">
            Need help? Try these links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/en/projects" className="text-primary-600 hover:text-primary-700">
              Our Projects
            </Link>
            <Link href="/en/services" className="text-primary-600 hover:text-primary-700">
              Services
            </Link>
            <Link href="/en/about" className="text-primary-600 hover:text-primary-700">
              About Us
            </Link>
            <Link href="/en/contact" className="text-primary-600 hover:text-primary-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}