'use client'

import Link from 'next/link'
import Button, { ButtonProps } from './Button'

interface LinkButtonProps extends Omit<ButtonProps, 'as'> {
  href: string
}

export default function LinkButton({ href, children, ...buttonProps }: LinkButtonProps) {
  // Remove any event handlers that might be passed
  const cleanProps = { ...buttonProps }
  Object.keys(cleanProps).forEach(key => {
    if (key.startsWith('on')) {
      delete cleanProps[key as keyof typeof cleanProps]
    }
  })

  return (
    <Link href={href} passHref legacyBehavior>
      <a style={{ textDecoration: 'none' }}>
        <Button as="span" {...cleanProps}>
          {children}
        </Button>
      </a>
    </Link>
  )
}