'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showValue = false,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const variants = {
    default: 'bg-accent-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'w-full bg-primary-200 rounded-full overflow-hidden',
          sizes[size],
          className
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <p className="mt-2 text-sm text-primary-600 text-center">
          {percentage.toFixed(0)}%
        </p>
      )}
    </div>
  )
}

export default ProgressBar