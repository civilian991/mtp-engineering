import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AdminLayoutClient from './AdminLayoutClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard - MTP Engineering',
  description: 'Admin dashboard for MTP Engineering Consultants',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  )
}