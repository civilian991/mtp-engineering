interface ErrorDetails {
  error: Error | string
  context?: string
  userId?: string
  metadata?: Record<string, any>
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

interface ErrorLogEntry {
  id: string
  timestamp: string
  message: string
  stack?: string
  context: string
  userId?: string
  metadata: Record<string, any>
  severity: string
  userAgent?: string
  url?: string
  resolved: boolean
}

class ErrorMonitor {
  private errors: ErrorLogEntry[] = []
  private maxErrors = 1000 // Keep last 1000 errors in memory

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  log(details: ErrorDetails): void {
    const error = details.error
    const message = typeof error === 'string' ? error : error.message
    const stack = typeof error === 'string' ? undefined : error.stack

    const errorEntry: ErrorLogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      message,
      stack,
      context: details.context || 'unknown',
      userId: details.userId,
      metadata: details.metadata || {},
      severity: details.severity || 'medium',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      resolved: false
    }

    // Add to in-memory store
    this.errors.unshift(errorEntry)
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors)
    }

    // Log to console
    console.error(`[ErrorMonitor] ${details.context}:`, error)

    // In production, you would send this to an external service
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(errorEntry)
    }
  }

  private async sendToExternalService(error: ErrorLogEntry): Promise<void> {
    try {
      // Example: Send to a logging service
      if (process.env.ERROR_REPORTING_URL) {
        await fetch(process.env.ERROR_REPORTING_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ERROR_REPORTING_TOKEN}`
          },
          body: JSON.stringify(error)
        })
      }
    } catch (err) {
      console.error('Failed to send error to external service:', err)
    }
  }

  getErrors(filters?: {
    severity?: string
    context?: string
    resolved?: boolean
    limit?: number
  }): ErrorLogEntry[] {
    let filteredErrors = [...this.errors]

    if (filters?.severity) {
      filteredErrors = filteredErrors.filter(e => e.severity === filters.severity)
    }

    if (filters?.context) {
      filteredErrors = filteredErrors.filter(e => e.context.includes(filters.context!))
    }

    if (filters?.resolved !== undefined) {
      filteredErrors = filteredErrors.filter(e => e.resolved === filters.resolved)
    }

    if (filters?.limit) {
      filteredErrors = filteredErrors.slice(0, filters.limit)
    }

    return filteredErrors
  }

  markResolved(errorId: string): void {
    const error = this.errors.find(e => e.id === errorId)
    if (error) {
      error.resolved = true
    }
  }

  getStats(): {
    total: number
    byContext: Record<string, number>
    bySeverity: Record<string, number>
    resolved: number
    unresolved: number
  } {
    const byContext: Record<string, number> = {}
    const bySeverity: Record<string, number> = {}
    let resolved = 0

    this.errors.forEach(error => {
      byContext[error.context] = (byContext[error.context] || 0) + 1
      bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1
      if (error.resolved) resolved++
    })

    return {
      total: this.errors.length,
      byContext,
      bySeverity,
      resolved,
      unresolved: this.errors.length - resolved
    }
  }

  clear(): void {
    this.errors = []
  }
}

// Global instance
export const errorMonitor = new ErrorMonitor()

// Convenience functions
export const logError = (error: Error | string, context: string, metadata?: Record<string, any>) => {
  errorMonitor.log({ error, context, metadata })
}

export const logCriticalError = (error: Error | string, context: string, metadata?: Record<string, any>) => {
  errorMonitor.log({ error, context, metadata, severity: 'critical' })
}

export const logAPIError = (error: Error | string, endpoint: string, metadata?: Record<string, any>) => {
  errorMonitor.log({
    error,
    context: `API:${endpoint}`,
    metadata,
    severity: 'high'
  })
}

export const logDatabaseError = (error: Error | string, operation: string, metadata?: Record<string, any>) => {
  errorMonitor.log({
    error,
    context: `Database:${operation}`,
    metadata,
    severity: 'critical'
  })
}

export const logValidationError = (error: Error | string, field: string, metadata?: Record<string, any>) => {
  errorMonitor.log({
    error,
    context: `Validation:${field}`,
    metadata,
    severity: 'low'
  })
}

// React Error Boundary helper
export class ErrorBoundary extends Error {
  constructor(message: string, public componentStack?: string) {
    super(message)
    this.name = 'ErrorBoundary'
  }
}

// Global error handler for unhandled promises
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, 'UnhandledPromiseRejection', {
      promise: event.promise
    })
  })

  window.addEventListener('error', (event) => {
    logError(event.error || event.message, 'GlobalError', {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })
}

export type { ErrorLogEntry, ErrorDetails }