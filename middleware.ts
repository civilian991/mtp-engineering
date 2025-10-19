import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkAdminAuth } from '@/lib/auth/supabase-middleware'

const locales = ['en', 'ar']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || ''
  const languages = acceptLanguage.split(',')

  for (const lang of languages) {
    const locale = lang.split('-')[0].trim()
    if (locales.includes(locale)) {
      return locale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check admin authentication for protected routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const isAuthenticated = checkAdminAuth(request)
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Skip locale redirection for admin routes and manifest
  if (pathname.startsWith('/admin') || pathname.endsWith('.webmanifest')) {
    return NextResponse.next()
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|images|docs|manifest.webmanifest).*)',
  ],
}