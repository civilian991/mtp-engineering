'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Spinner: React.FC<SpinnerProps> = ({ className, size = 'md', ...props }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-b-2 border-accent-600',
        sizes[size],
        className
      )}
      {...props}
    />
  )
}

export default Spinner