import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export function createClient() {
  // Use the hardcoded values as fallback if env vars are not available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fezkfoeejbagqrdmchuy.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlemtmb2VlamJhZ3FyZG1jaHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NzE0NTMsImV4cCI6MjA3NDA0NzQ1M30.LTPwNGkQFfWq4Tu9VzvVhQ9bXTSciBTkZRGB7StiT5c'

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}