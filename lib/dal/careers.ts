// Data Access Layer for Careers and Job Applications
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { Tables } from '@/types/database'
import { cache } from 'react'

type Career = Tables<'careers'>

// Get all active careers
export const getCareers = cache(async (filters?: {
  department?: string
  employment_type?: string
  experience_level?: string
  location?: string
}) => {
  const supabase = await createClient()

  let query = supabase
    .from('careers')
    .select('*')
    .eq('is_active', true)
    // .order('is_urgent', { ascending: false }) // Field doesn't exist in database
    .order('created_at', { ascending: false })

  if (filters) {
    if (filters.department) {
      query = query.or(`department_en.ilike.%${filters.department}%,department_ar.ilike.%${filters.department}%`)
    }
    if (filters.employment_type) {
      query = query.eq('employment_type', filters.employment_type)
    }
    if (filters.experience_level) {
      query = query.eq('experience_level', filters.experience_level)
    }
    if (filters.location) {
      query = query.or(`location_en.ilike.%${filters.location}%,location_ar.ilike.%${filters.location}%`)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching careers:', error)
    return []
  }

  return data || []
})

// Get career by job code
export const getCareerByJobCode = cache(async (jobCode: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .eq('job_code', jobCode)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching career:', error)
    return null
  }

  return data
})

// Get urgent careers
export const getUrgentCareers = cache(async (limit: number = 5) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .eq('is_active', true)
    // .eq('is_urgent', true) // Field doesn't exist in database
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching urgent careers:', error)
    return []
  }

  return data || []
})

// Submit job application (public)
export async function submitJobApplication(application: {
  career_id: string
  name: string
  email: string
  phone?: string | null
  cv_url?: string | null
  cover_letter?: string | null
  linkedin_url?: string | null
  portfolio_url?: string | null
  years_of_experience?: number | null
  current_position?: string | null
  current_company?: string | null
  expected_salary?: string | null
  notice_period?: string | null
}) {
  const supabase = createBrowserClient()

  const applicationData = {
    ...application,
    status: 'pending',
  }

  const { data, error } = await supabase
    .from('job_applications')
    .insert(applicationData)
    .select()
    .single()

  if (error) {
    console.error('Error submitting job application:', error)
    throw error
  }

  // TODO: Increment applications count for the career when RPC function is created
  // await incrementApplicationsCount(application.career_id)

  return data
}

// Increment applications count
// TODO: Implement when RPC function is created in database
// async function incrementApplicationsCount(careerId: string) {
//   const supabase = createBrowserClient()
//
//   const { error } = await supabase.rpc('increment_applications_count', {
//     career_id: careerId
//   })
//
//   if (error) {
//     console.error('Error incrementing applications count:', error)
//   }
// }

// Get all job applications (admin only)
export async function getJobApplications(filters?: {
  career_id?: string
  status?: string
  rating?: number
}) {
  const supabase = await createClient()

  let query = supabase
    .from('job_applications')
    .select(`
      *,
      careers (
        title_en,
        title_ar,
        department_en,
        department_ar
      )
    `)
    .order('created_at', { ascending: false })

  if (filters) {
    if (filters.career_id) {
      query = query.eq('career_id', filters.career_id)
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.rating) {
      query = query.eq('rating', filters.rating)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching job applications:', error)
    return []
  }

  return data || []
}

// Get single job application (admin only)
export async function getJobApplicationById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_applications')
    .select(`
      *,
      careers (*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching job application:', error)
    return null
  }

  return data
}

// Update job application status (admin only)
export async function updateApplicationStatus(
  id: string,
  status: string,
  notes?: string,
  rating?: number
) {
  const supabase = await createClient()

  const updates: any = {
    status,
  }

  if (notes !== undefined) updates.notes = notes
  // Note: rating field doesn't exist in database schema
  // if (rating !== undefined) updates.rating = rating

  // TODO: Add timestamp fields to database schema if needed
  // const now = new Date().toISOString()
  // switch (status) {
  //   case 'reviewing':
  //     updates.reviewed_at = now
  //     break
  //   case 'interview':
  //     updates.interviewed_at = now
  //     break
  //   case 'offer':
  //   case 'rejected':
  //     updates.decided_at = now
  //     break
  // }

  const { data, error } = await supabase
    .from('job_applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating application status:', error)
    throw error
  }

  return data
}

// Create new career posting (admin only)
export async function createCareer(career: Omit<Career, 'id' | 'created_at' | 'updated_at' | 'applications_count'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('careers')
    .insert({
      ...career,
      applications_count: 0
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating career:', error)
    throw error
  }

  return data
}

// Update career posting (admin only)
export async function updateCareer(id: string, updates: Partial<Career>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('careers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating career:', error)
    throw error
  }

  return data
}

// Delete career posting (admin only)
export async function deleteCareer(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('careers')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting career:', error)
    throw error
  }

  return true
}

// Get career statistics (admin only)
export async function getCareerStats() {
  const supabase = await createClient()

  const { data: careers } = await supabase
    .from('careers')
    .select('id, is_active')

  const { data: applications } = await supabase
    .from('job_applications')
    .select('status')

  const stats = {
    totalCareers: careers?.length || 0,
    activeCareers: careers?.filter(c => c.is_active).length || 0,
    urgentCareers: 0, // is_urgent field doesn't exist in database
    totalApplications: applications?.length || 0,
    applicationsByStatus: {} as Record<string, number>,
  }

  applications?.forEach(app => {
    if (app.status) {
      stats.applicationsByStatus[app.status] = (stats.applicationsByStatus[app.status] || 0) + 1
    }
  })

  return stats
}