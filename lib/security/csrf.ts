import { NextRequest } from 'next/server'
import crypto from 'crypto'

interface CSRFTokenData {
  token: string
  timestamp: number
  userAgent: string
}

// Simple CSRF protection implementation
export class CSRFProtection {
  private secret: string
  private tokenTTL: number // Token TTL in milliseconds

  constructor(secret?: string, tokenTTL = 1000 * 60 * 60) { // 1 hour default
    this.secret = secret || process.env.NEXTAUTH_SECRET || 'default-csrf-secret'
    this.tokenTTL = tokenTTL
  }

  // Generate a CSRF token
  generateToken(userAgent?: string): string {
    const timestamp = Date.now()
    const randomBytes = crypto.randomBytes(32).toString('hex')
    const payload: CSRFTokenData = {
      token: randomBytes,
      timestamp,
      userAgent: userAgent || 'unknown'
    }

    const payloadString = JSON.stringify(payload)
    const signature = this.createSignature(payloadString)

    return Buffer.from(`${payloadString}.${signature}`).toString('base64')
  }

  // Validate a CSRF token
  validateToken(token: string, userAgent?: string): boolean {
    try {
      const decoded = Buffer.from(token, 'base64').toString()
      const [payloadString, signature] = decoded.split('.')

      if (!payloadString || !signature) return false

      // Verify signature
      const expectedSignature = this.createSignature(payloadString)
      if (signature !== expectedSignature) return false

      // Parse payload
      const payload: CSRFTokenData = JSON.parse(payloadString)

      // Check timestamp
      if (Date.now() - payload.timestamp > this.tokenTTL) return false

      // Check user agent (optional, can be disabled for flexibility)
      if (userAgent && payload.userAgent !== userAgent && payload.userAgent !== 'unknown') {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }

  // Verify CSRF token from request
  verifyRequest(request: NextRequest): boolean {
    const token = this.extractTokenFromRequest(request)
    if (!token) return false

    const userAgent = request.headers.get('user-agent') || 'unknown'
    return this.validateToken(token, userAgent)
  }

  // Extract token from request (header or body)
  private extractTokenFromRequest(request: NextRequest): string | null {
    // Check header first
    const headerToken = request.headers.get('x-csrf-token')
    if (headerToken) return headerToken

    // Check custom header
    const customToken = request.headers.get('csrf-token')
    if (customToken) return customToken

    return null
  }

  // Create HMAC signature
  private createSignature(data: string): string {
    return crypto
      .createHmac('sha256', this.secret)
      .update(data)
      .digest('hex')
  }

  // Middleware for protecting API routes
  middleware() {
    return (request: NextRequest) => {
      // Skip CSRF for GET, HEAD, OPTIONS requests
      if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
        return null
      }

      // Skip CSRF for same-origin requests (optional)
      const origin = request.headers.get('origin')
      const host = request.headers.get('host')
      if (origin && host && new URL(origin).host === host) {
        // Additional check: verify CSRF token
        if (!this.verifyRequest(request)) {
          return new Response(
            JSON.stringify({ error: 'Invalid CSRF token' }),
            {
              status: 403,
              headers: { 'Content-Type': 'application/json' }
            }
          )
        }
      }

      return null
    }
  }
}

// Global CSRF instance
export const csrfProtection = new CSRFProtection()

// Utility functions
export const generateCSRFToken = (userAgent?: string): string => {
  return csrfProtection.generateToken(userAgent)
}

export const validateCSRFToken = (token: string, userAgent?: string): boolean => {
  return csrfProtection.validateToken(token, userAgent)
}

export const verifyCSRFRequest = (request: NextRequest): boolean => {
  return csrfProtection.verifyRequest(request)
}

// React hook for CSRF token
export const useCSRFToken = () => {
  if (typeof window === 'undefined') return null

  const userAgent = navigator.userAgent
  return generateCSRFToken(userAgent)
}

// Helper for adding CSRF token to forms
export const addCSRFToForm = (formData: FormData, token: string): FormData => {
  formData.set('_csrf', token)
  return formData
}

// Helper for adding CSRF token to fetch requests
export const addCSRFToHeaders = (headers: HeadersInit = {}, token: string): HeadersInit => {
  return {
    ...headers,
    'X-CSRF-Token': token
  }
}

// Double Submit Cookie pattern implementation
export class DoubleSubmitCSRF {
  private cookieName = 'csrf-token'

  generateTokenPair(): { token: string; cookie: string } {
    const token = crypto.randomBytes(32).toString('hex')
    const cookie = crypto.randomBytes(32).toString('hex')

    // The actual CSRF token is a combination
    const csrfToken = crypto
      .createHmac('sha256', process.env.NEXTAUTH_SECRET || 'default')
      .update(`${token}:${cookie}`)
      .digest('hex')

    return { token: csrfToken, cookie }
  }

  validateTokenPair(token: string, cookie: string): boolean {
    try {
      const expectedToken = crypto
        .createHmac('sha256', process.env.NEXTAUTH_SECRET || 'default')
        .update(`${token}:${cookie}`)
        .digest('hex')

      return token === expectedToken
    } catch {
      return false
    }
  }
}

export const doubleSubmitCSRF = new DoubleSubmitCSRF()

// SameSite cookie configuration for CSRF protection
export const csrfCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 60 * 60 * 24 // 24 hours
}