import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: 'super_admin' | 'admin' | 'editor';
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Get admin profile
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) {
    return null
  }

  return {
    id: user.id,
    email: user.email!,
    full_name: profile.full_name,
    role: profile.role as User['role']
  }
}

export async function login(email: string, password: string): Promise<{ user: User; error?: string }> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return { user: null as any, error: error.message }
  }

  if (!data.user) {
    return { user: null as any, error: 'Login failed' }
  }

  // Get admin profile
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (!profile || !profile.is_active) {
    // Sign out if not an active admin
    await supabase.auth.signOut()
    return { user: null as any, error: 'Access denied. Not an authorized admin.' }
  }

  // Update last login
  await supabase
    .from('admin_profiles')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', data.user.id)

  const user: User = {
    id: data.user.id,
    email: data.user.email!,
    full_name: profile.full_name,
    role: profile.role as User['role']
  }

  return { user }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}

export async function checkAuth(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

export function hasPermission(user: User | null, requiredRole: 'super_admin' | 'admin' | 'editor'): boolean {
  if (!user) return false

  const roleHierarchy = {
    'super_admin': 3,
    'admin': 2,
    'editor': 1
  }

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
}

export async function createAdminUser(
  email: string,
  password: string,
  fullName: string,
  role: 'super_admin' | 'admin' | 'editor' = 'admin'
): Promise<User> {
  const supabase = await createClient()

  // Create user in Supabase Auth
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role
    }
  })

  if (error) {
    throw new Error('Failed to create user: ' + error.message)
  }

  if (!data.user) {
    throw new Error('Failed to create user')
  }

  // The admin_profiles entry will be created by the database trigger
  // Wait a moment for the trigger to execute
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Get the created profile
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  return {
    id: data.user.id,
    email: data.user.email!,
    full_name: profile?.full_name || fullName,
    role: profile?.role || role
  }
}

// Helper function to reset password (for migrated users)
export async function resetPassword(email: string): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return {}
}