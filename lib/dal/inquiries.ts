// Data Access Layer for Inquiries
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { Inquiry } from '@/types/database'

// Submit new inquiry (public)
export async function submitInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority' | 'assigned_to' | 'response_text' | 'responded_at' | 'responded_by'>) {
  // Use browser client for public submissions
  const supabase = createBrowserClient()

  const inquiryData = {
    ...inquiry,
    status: 'new' as const,
    priority: 'normal' as const,
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
  status?: Inquiry['status']
  type?: Inquiry['inquiry_type']
  priority?: Inquiry['priority']
}) {
  const supabase = await createClient()

  let query = supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.type) {
    query = query.eq('inquiry_type', filters.type)
  }
  if (filters?.priority) {
    query = query.eq('priority', filters.priority)
  }

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
  status: Inquiry['status'],
  response?: {
    response_text: string
    responded_by: string
  }
) {
  const supabase = await createClient()

  const updates: Partial<Inquiry> = {
    status,
  }

  if (response) {
    updates.response_text = response.response_text
    updates.responded_by = response.responded_by
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
export async function assignInquiry(id: string, userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inquiries')
    .update({ assigned_to: userId })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error assigning inquiry:', error)
    throw error
  }

  return data
}

// Get inquiry statistics (admin only)
export async function getInquiryStats() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inquiries')
    .select('status, inquiry_type, priority')

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
    stats.byStatus[inquiry.status] = (stats.byStatus[inquiry.status] || 0) + 1

    // Count by type
    if (inquiry.inquiry_type) {
      stats.byType[inquiry.inquiry_type] = (stats.byType[inquiry.inquiry_type] || 0) + 1
    }

    // Count by priority
    stats.byPriority[inquiry.priority] = (stats.byPriority[inquiry.priority] || 0) + 1
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