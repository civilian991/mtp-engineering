'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  // Default to English for now - in production, this would use the locale context
  const locale: string = 'en'
  const isRTL = locale === 'ar'

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* 404 Animation */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-primary-600 animate-pulse">404</h1>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            {isRTL
              ? 'عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها. قد تكون قد تم نقلها أو حذفها.'
              : "Sorry, we couldn't find the page you're looking for. It might have been moved or deleted."}
          </p>

          {/* Helpful Links */}
          <div className="border-t pt-8">
            <p className="text-secondary-600 mb-6">
              {isRTL ? 'قد تجد ما تبحث عنه في:' : 'You might find what you need in:'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Link href={`/${locale}/services`} className="text-primary-600 hover:text-primary-700 font-medium">
                {isRTL ? 'الخدمات' : 'Services'}
              </Link>
              <Link href={`/${locale}/projects`} className="text-primary-600 hover:text-primary-700 font-medium">
                {isRTL ? 'المشاريع' : 'Projects'}
              </Link>
              <Link href={`/${locale}/about`} className="text-primary-600 hover:text-primary-700 font-medium">
                {isRTL ? 'من نحن' : 'About Us'}
              </Link>
              <Link href={`/${locale}/contact`} className="text-primary-600 hover:text-primary-700 font-medium">
                {isRTL ? 'اتصل بنا' : 'Contact'}
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}`}>
              <Button size="lg" variant="primary">
                <Home className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {isRTL ? 'الصفحة الرئيسية' : 'Go to Homepage'}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className={`h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 ${isRTL ? 'rotate-180' : ''}`} />
              {isRTL ? 'العودة' : 'Go Back'}
            </Button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-white text-center">
          <p className="mb-2">
            {isRTL ? 'هل تحتاج إلى مساعدة؟' : 'Need help?'}
          </p>
          <a href="mailto:support@mtp.com.sa" className="underline hover:no-underline">
            support@mtp.com.sa
          </a>
        </div>
      </div>
    </div>
  )
}