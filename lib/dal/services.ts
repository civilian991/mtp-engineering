// Data Access Layer for Services
import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'
import { cache } from 'react'

type Service = Tables<'services'>

// Get all active services
export const getServices = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return data || []
})

// Get service by slug
export const getServiceBySlug = cache(async (slug: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching service:', error)
    return null
  }

  return data
})

// Get featured services (top 6)
export const getFeaturedServices = cache(async (limit: number = 6) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured services:', error)
    return []
  }

  return data || []
})

// Get services with project count
export const getServicesWithProjectCount = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      project_services (
        count
      )
    `)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching services with project count:', error)
    return []
  }

  return data || []
})

// Create new service (admin only)
export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single()

  if (error) {
    console.error('Error creating service:', error)
    throw error
  }

  return data
}

// Update service (admin only)
export async function updateService(id: string, updates: Partial<Service>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating service:', error)
    throw error
  }

  return data
}

// Delete service (admin only)
export async function deleteService(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting service:', error)
    throw error
  }

  return true
}