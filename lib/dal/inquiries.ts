// Data Access Layer for Inquiries
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { Tables } from '@/types/database'

type Inquiry = Tables<'inquiries'>

// Submit new inquiry (public)
export async function submitInquiry(inquiry: {
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
}) {
  // Use browser client for public submissions
  const supabase = createBrowserClient()

  const inquiryData = {
    ...inquiry,
    status: 'pending', // Database uses 'pending' as default
  }

  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiryData)
    .select()
    .single()

  if (error) {
    console.error('Error submitting inquiry:', error)
    throw error
  }

  // Send notification email (optional - implement based on requirements)
  // await sendInquiryNotification(data)

  return data
}

// Get all inquiries (admin only)
export async function getInquiries(filters?: {
  status?: string
  type?: string
  priority?: string
}) {
  const supabase = await createClient()

  let query = supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  // Note: inquiry_type and priority fields don't exist in database
  // if (filters?.type) {
  //   query = query.eq('inquiry_type', filters.type)
  // }
  // if (filters?.priority) {
  //   query = query.eq('priority', filters.priority)
  // }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching inquiries:', error)
    return []
  }

  return data || []
}

// Get single inquiry (admin only)
export async function getInquiryById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching inquiry:', error)
    return null
  }

  return data
}

// Update inquiry status (admin only)
export async function updateInquiryStatus(
  id: string,
  status: string,
  response?: {
    response_text: string
    responded_by: string
  }
) {
  const supabase = await createClient()

  const updates: any = {
    status,
  }

  if (response) {
    updates.response = response.response_text
    // Note: responded_by field doesn't exist in database
    updates.responded_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('inquiries')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating inquiry status:', error)
    throw error
  }

  return data
}

// Assign inquiry to user (admin only)
// TODO: Add assigned_to field to database if needed
// export async function assignInquiry(id: string, userId: string) {
//   const supabase = await createClient()
//
//   const { data, error } = await supabase
//     .from('inquiries')
//     .update({ assigned_to: userId })
//     .eq('id', id)
//     .select()
//     .single()
//
//   if (error) {
//     console.error('Error assigning inquiry:', error)
//     throw error
//   }
//
//   return data
// }

// Get inquiry statistics (admin only)
export async function getInquiryStats() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inquiries')
    .select('status')

  if (error) {
    console.error('Error fetching inquiry stats:', error)
    return null
  }

  const stats = {
    total: data?.length || 0,
    byStatus: {} as Record<string, number>,
    byType: {} as Record<string, number>,
    byPriority: {} as Record<string, number>,
  }

  data?.forEach(inquiry => {
    // Count by status
    if (inquiry.status) {
      stats.byStatus[inquiry.status] = (stats.byStatus[inquiry.status] || 0) + 1
    }
  })

  return stats
}

// Delete inquiry (admin only)
export async function deleteInquiry(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting inquiry:', error)
    throw error
  }

  return true
}