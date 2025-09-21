import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MTP Engineering Consultants',
  description: 'Leading engineering consultancy firm in Saudi Arabia since 1980',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The HTML and body tags are provided by [locale]/layout.tsx for locale routes
  // and by individual admin pages for non-locale routes
  return children
}