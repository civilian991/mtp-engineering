'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular'
  width?: string | number
  height?: string | number
  animation?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = true,
  style,
  ...props
}) => {
  const variants = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100',
        animation && 'animate-shimmer bg-[length:200%_100%]',
        variants[variant],
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem',
        ...style,
      }}
      {...props}
    />
  )
}

export default Skeleton