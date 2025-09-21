// Data Access Layer for Projects
import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'
import { cache } from 'react'

type Project = Tables<'projects'>

interface ProjectFilters {
  year?: number
  sector?: string
  status?: string
  is_featured?: boolean
  search?: string
}

// Get all projects
export const getProjects = cache(async (filters?: ProjectFilters, limit?: number, offset?: number) => {
  const supabase = await createClient()

  let query = supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })

  // Apply filters
  if (filters) {
    if (filters.year) query = query.eq('year', filters.year)
    if (filters.sector) query = query.eq('sector', filters.sector)
    if (filters.status) query = query.eq('status', filters.status)
    if (filters.is_featured !== undefined) query = query.eq('is_featured', filters.is_featured)
    if (filters.search) {
      query = query.or(`name_en.ilike.%${filters.search}%,name_ar.ilike.%${filters.search}%,description_en.ilike.%${filters.search}%,description_ar.ilike.%${filters.search}%,client_en.ilike.%${filters.search}%,client_ar.ilike.%${filters.search}%`)
    }
  }

  // Apply pagination
  if (limit) query = query.limit(limit)
  if (offset) query = query.range(offset, offset + (limit || 10) - 1)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
})

// Get single project by ID
export const getProjectById = cache(async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
})

// Get featured projects
export const getFeaturedProjects = cache(async (limit: number = 6) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('year', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }

  return data || []
})

// Get recent projects
export const getRecentProjects = cache(async (limit: number = 10) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent projects:', error)
    return []
  }

  return data || []
})

// Get projects by sector
export const getProjectsBySector = cache(async (sector: string, limit?: number) => {
  const supabase = await createClient()

  let query = supabase
    .from('projects')
    .select('*')
    .eq('sector', sector)
    .order('year', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching projects by sector:', error)
    return []
  }

  return data || []
})

// Get project years for filter
export const getProjectYears = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('year')
    .order('year', { ascending: false })

  if (error) {
    console.error('Error fetching project years:', error)
    return []
  }

  // Get unique years - filter out nulls and ensure number array
  const years = [...new Set(data?.map(p => p.year).filter((y): y is number => y !== null) || [])]
  return years
})

// Get project sectors for filter
export const getProjectSectors = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('sector')
    .not('sector', 'is', null)

  if (error) {
    console.error('Error fetching project sectors:', error)
    return []
  }

  // Get unique sectors - filter out nulls and ensure string array
  const sectors = [...new Set(data?.map(p => p.sector).filter((s): s is string => Boolean(s)) || [])]
  return sectors
})

// Create new project (admin only)
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    throw error
  }

  return data
}

// Update project (admin only)
export async function updateProject(id: string, updates: Partial<Project>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    throw error
  }

  return data
}

// Delete project (admin only)
export async function deleteProject(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    throw error
  }

  return true
}

// Get project statistics (admin only)
export async function getProjectStats() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select('id, sector, status, is_featured, year')

  const stats = {
    totalProjects: projects?.length || 0,
    featuredProjects: projects?.filter(p => p.is_featured).length || 0,
    completedProjects: projects?.filter(p => p.status === 'completed').length || 0,
    ongoingProjects: projects?.filter(p => p.status === 'ongoing').length || 0,
    bySector: {} as Record<string, number>,
    byYear: {} as Record<string, number>,
  }

  projects?.forEach(project => {
    // Count by sector
    if (project.sector) {
      stats.bySector[project.sector] = (stats.bySector[project.sector] || 0) + 1
    }
    // Count by year
    if (project.year) {
      stats.byYear[project.year] = (stats.byYear[project.year] || 0) + 1
    }
  })

  return stats
}

// Note: The following functions are commented out because their tables don't exist in the database
// - getProjectBySlug (slug field doesn't exist)
// - getProjectsByService (project_services table doesn't exist)
// - getLegacyProjects (is_legacy field doesn't exist)
// - getProjectCities (city_en, city_ar fields don't exist)
// - incrementProjectViews (RPC function doesn't exist)
// - addProjectImage (project_images table doesn't exist)
// - addProjectDocument (project_documents table doesn't exist)