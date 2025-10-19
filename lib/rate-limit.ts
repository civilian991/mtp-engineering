import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// Simple in-memory store (in production, use Redis)
const store: RateLimitStore = {}

interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

export class RateLimit {
  private windowMs: number
  private maxRequests: number
  private skipSuccessfulRequests: boolean
  private skipFailedRequests: boolean

  constructor(options: RateLimitOptions) {
    this.windowMs = options.windowMs
    this.maxRequests = options.maxRequests
    this.skipSuccessfulRequests = options.skipSuccessfulRequests || false
    this.skipFailedRequests = options.skipFailedRequests || false
  }

  private getClientKey(request: NextRequest): string {
    // Get client IP from various headers
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown'

    // Include user agent for additional uniqueness
    const userAgent = request.headers.get('user-agent') || 'unknown'

    return `${clientIp}:${userAgent.substring(0, 50)}`
  }

  private cleanupOldEntries(): void {
    const now = Date.now()
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })
  }

  check(request: NextRequest): {
    success: boolean
    limit: number
    remaining: number
    resetTime: number
  } {
    this.cleanupOldEntries()

    const key = this.getClientKey(request)
    const now = Date.now()
    const resetTime = now + this.windowMs

    if (!store[key] || store[key].resetTime < now) {
      // First request or window expired
      store[key] = {
        count: 1,
        resetTime
      }

      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        resetTime
      }
    }

    // Increment count
    store[key].count++

    return {
      success: store[key].count <= this.maxRequests,
      limit: this.maxRequests,
      remaining: Math.max(0, this.maxRequests - store[key].count),
      resetTime: store[key].resetTime
    }
  }

  middleware() {
    return (request: NextRequest) => {
      const result = this.check(request)

      const headers = new Headers()
      headers.set('X-RateLimit-Limit', result.limit.toString())
      headers.set('X-RateLimit-Remaining', result.remaining.toString())
      headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString())

      if (!result.success) {
        return new Response(
          JSON.stringify({
            error: 'Too many requests',
            retryAfter: result.resetTime - Date.now()
          }),
          {
            status: 429,
            headers: {
              ...Object.fromEntries(headers),
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString()
            }
          }
        )
      }

      return { headers }
    }
  }
}

// Predefined rate limiters
export const strictRateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // 5 requests per 15 minutes
})

export const moderateRateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes
})

export const lenientRateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 1000 // 1000 requests per 15 minutes
})

// Utility function for API routes
export function withRateLimit(rateLimit: RateLimit) {
  return function rateLimitMiddleware(handler: (request: NextRequest) => Promise<Response> | Response) {
    return async function (request: NextRequest): Promise<Response> {
      const rateLimitResult = rateLimit.check(request)

      if (!rateLimitResult.success) {
        return new Response(
          JSON.stringify({
            error: 'Too many requests',
            retryAfter: rateLimitResult.resetTime - Date.now()
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': rateLimitResult.limit.toString(),
              'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
              'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
              'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
            }
          }
        )
      }

      const response = await handler(request)

      // Add rate limit headers to successful responses
      response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
      response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString())

      return response
    }
  }
}