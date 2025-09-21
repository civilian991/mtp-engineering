'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  as?: 'button' | 'span'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, as = 'button', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-400 focus:ring-accent-500',
      secondary: 'bg-primary-100 text-primary-800 hover:bg-primary-200 border border-primary-300 focus:ring-primary-500',
      outline: 'border-2 border-accent-600 text-accent-600 hover:bg-accent-100 focus:ring-accent-500',
      ghost: 'text-primary-700 hover:bg-primary-100 focus:ring-primary-500',
      danger: 'bg-error text-white hover:bg-red-600 focus:ring-red-500',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg',
    }

    const Component = as

    if (Component === 'span') {
      // When rendering as span, don't accept any props to avoid event handler issues
      // Only use className for styling
      return (
        <span
          className={cn(baseStyles, variants[variant], sizes[size], 'cursor-pointer', className)}
        >
          {children}
        </span>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button