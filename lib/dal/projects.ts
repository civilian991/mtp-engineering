// Data Access Layer for Projects
import { createClient } from '@/lib/supabase/server'
import { Project, ProjectImage, ProjectDocument } from '@/types/database'
import { cache } from 'react'

interface ProjectFilters {
  service_id?: string
  sector_id?: string
  year?: number
  city?: string
  status?: string
  is_featured?: boolean
  is_legacy?: boolean
  search?: string
}

// Get all published projects with relations
export const getProjects = cache(async (filters?: ProjectFilters, limit?: number, offset?: number) => {
  const supabase = await createClient()

  let query = supabase
    .from('projects')
    .select(`
      *,
      project_services (
        service_id,
        services (*)
      ),
      project_sectors (
        sector_id,
        sectors (*)
      ),
      project_images (
        *
      )
    `)
    .eq('is_published', true)

  // Apply filters
  if (filters) {
    if (filters.year) query = query.eq('year', filters.year)
    if (filters.city) query = query.or(`city_en.ilike.%${filters.city}%,city_ar.ilike.%${filters.city}%`)
    if (filters.status) query = query.eq('status', filters.status)
    if (filters.is_featured !== undefined) query = query.eq('is_featured', filters.is_featured)
    if (filters.is_legacy !== undefined) query = query.eq('is_legacy', filters.is_legacy)
    if (filters.search) {
      query = query.or(`name_en.ilike.%${filters.search}%,name_ar.ilike.%${filters.search}%,description_en.ilike.%${filters.search}%,description_ar.ilike.%${filters.search}%,client_name_en.ilike.%${filters.search}%,client_name_ar.ilike.%${filters.search}%`)
    }
  }

  // Apply pagination
  if (limit) query = query.limit(limit)
  if (offset) query = query.range(offset, offset + (limit || 10) - 1)

  query = query.order('year', { ascending: false }).order('sort_order', { ascending: true })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
})

// Get single project by slug with full relations
export const getProjectBySlug = cache(async (slug: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_services (
        service_id,
        is_primary,
        services (*)
      ),
      project_sectors (
        sector_id,
        is_primary,
        sectors (*)
      ),
      project_images (
        *
      ),
      project_documents (
        *
      ),
      project_team (
        team_member_id,
        role,
        responsibilities,
        team_members (*)
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  // Increment view count
  await incrementProjectViews(data.id)

  return data
})

// Get featured projects
export const getFeaturedProjects = cache(async (limit: number = 6) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (
        *
      )
    `)
    .eq('is_published', true)
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
    .select(`
      *,
      project_images (
        *
      )
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent projects:', error)
    return []
  }

  return data || []
})

// Get projects by service
export const getProjectsByService = cache(async (serviceId: string, limit?: number) => {
  const supabase = await createClient()

  let query = supabase
    .from('project_services')
    .select(`
      projects (
        *,
        project_images (
          *
        )
      )
    `)
    .eq('service_id', serviceId)

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching projects by service:', error)
    return []
  }

  return data?.map(item => item.projects).filter(Boolean) || []
})

// Get projects by sector
export const getProjectsBySector = cache(async (sectorId: string, limit?: number) => {
  const supabase = await createClient()

  let query = supabase
    .from('project_sectors')
    .select(`
      projects (
        *,
        project_images (
          *
        )
      )
    `)
    .eq('sector_id', sectorId)

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching projects by sector:', error)
    return []
  }

  return data?.map(item => item.projects).filter(Boolean) || []
})

// Get legacy projects (1980-2012)
export const getLegacyProjects = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .eq('is_legacy', true)
    .order('year', { ascending: false })

  if (error) {
    console.error('Error fetching legacy projects:', error)
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
    .eq('is_published', true)
    .order('year', { ascending: false })

  if (error) {
    console.error('Error fetching project years:', error)
    return []
  }

  // Get unique years
  const years = [...new Set(data?.map(p => p.year) || [])]
  return years
})

// Get project cities for filter
export const getProjectCities = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('city_en, city_ar')
    .eq('is_published', true)
    .not('city_en', 'is', null)

  if (error) {
    console.error('Error fetching project cities:', error)
    return []
  }

  // Get unique cities
  const cities = [...new Set(data?.flatMap(p => [p.city_en, p.city_ar].filter(Boolean)) || [])]
  return cities
})

// Increment project views
async function incrementProjectViews(projectId: string) {
  const supabase = await createClient()

  const { error } = await supabase.rpc('increment_project_views', {
    project_id: projectId
  })

  if (error) {
    console.error('Error incrementing project views:', error)
  }
}

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

// Add project image
export async function addProjectImage(image: Omit<ProjectImage, 'id' | 'created_at'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('project_images')
    .insert(image)
    .select()
    .single()

  if (error) {
    console.error('Error adding project image:', error)
    throw error
  }

  return data
}

// Add project document
export async function addProjectDocument(document: Omit<ProjectDocument, 'id' | 'created_at'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('project_documents')
    .insert(document)
    .select()
    .single()

  if (error) {
    console.error('Error adding project document:', error)
    throw error
  }

  return data
}