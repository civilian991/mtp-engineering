// Data Access Layer for Sectors
import { createClient } from '@/lib/supabase/server'
import { Sector } from '@/types/database'
import { cache } from 'react'

// Get all active sectors
export const getSectors = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sectors')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching sectors:', error)
    return []
  }

  return data || []
})

// Get sector by slug
export const getSectorBySlug = cache(async (slug: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sectors')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching sector:', error)
    return null
  }

  return data
})

// Get sectors with project count
export const getSectorsWithProjectCount = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sectors')
    .select(`
      *,
      project_sectors (
        count
      )
    `)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching sectors with project count:', error)
    return []
  }

  // Update project_count based on actual count
  const sectorsWithCount = data?.map(sector => ({
    ...sector,
    project_count: (sector.project_sectors as any)?.length || 0
  })) || []

  return sectorsWithCount
})

// Get featured sectors (top 6)
export const getFeaturedSectors = cache(async (limit: number = 6) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sectors')
    .select(`
      *,
      project_sectors (
        count
      )
    `)
    .eq('is_active', true)
    .order('project_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured sectors:', error)
    return []
  }

  return data || []
})

// Create new sector (admin only)
export async function createSector(sector: Omit<Sector, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sectors')
    .insert(sector)
    .select()
    .single()

  if (error) {
    console.error('Error creating sector:', error)
    throw error
  }

  return data
}

// Update sector (admin only)
export async function updateSector(id: string, updates: Partial<Sector>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sectors')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating sector:', error)
    throw error
  }

  return data
}

// Delete sector (admin only)
export async function deleteSector(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('sectors')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting sector:', error)
    throw error
  }

  return true
}