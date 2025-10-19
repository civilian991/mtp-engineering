import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Tables, TablesInsert } from '@/types/database'

type JobApplication = Tables<'job_applications'>
type JobApplicationInsert = TablesInsert<'job_applications'>

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const supabase = await createClient()

    let query = supabase
      .from('job_applications')
      .select(`
        *,
        careers:career_id (
          id,
          title_en,
          title_ar,
          department_en,
          department_ar
        )
      `)

    // Filter by career ID
    const careerId = searchParams.get('career_id')
    if (careerId) {
      query = query.eq('career_id', careerId)
    }

    // Filter by status
    const status = searchParams.get('status')
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    // Filter by email for user's own applications
    const email = searchParams.get('email')
    if (email) {
      query = query.eq('email', email)
    }

    // Order by creation date descending
    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching job applications:', error)
      return NextResponse.json(
        { error: 'Failed to fetch job applications' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in job applications GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if career_id exists (if provided)
    if (body.career_id) {
      const { data: career, error: careerError } = await supabase
        .from('careers')
        .select('id')
        .eq('id', body.career_id)
        .single()

      if (careerError || !career) {
        return NextResponse.json(
          { error: 'Invalid career ID' },
          { status: 400 }
        )
      }
    }

    // Check for duplicate application (same email + career_id)
    if (body.career_id) {
      const { data: existingApplication } = await supabase
        .from('job_applications')
        .select('id')
        .eq('email', body.email)
        .eq('career_id', body.career_id)
        .single()

      if (existingApplication) {
        return NextResponse.json(
          { error: 'You have already applied for this position' },
          { status: 409 }
        )
      }
    }

    // Prepare application data
    const applicationData: JobApplicationInsert = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      career_id: body.career_id || null,
      current_company: body.current_company || null,
      current_position: body.current_position || null,
      years_of_experience: body.years_of_experience || null,
      expected_salary: body.expected_salary || null,
      notice_period: body.notice_period || null,
      cover_letter: body.cover_letter || null,
      linkedin_url: body.linkedin_url || null,
      portfolio_url: body.portfolio_url || null,
      cv_url: body.cv_url || null,
      status: 'pending',
      notes: null,
    }

    const { data, error } = await supabase
      .from('job_applications')
      .insert([applicationData])
      .select(`
        *,
        careers:career_id (
          id,
          title_en,
          title_ar,
          department_en,
          department_ar
        )
      `)
      .single()

    if (error) {
      console.error('Error creating job application:', error)
      return NextResponse.json(
        { error: 'Failed to submit job application' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in job applications POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    // Prepare update data
    const applicationUpdateData: any = {
      updated_at: new Date().toISOString(),
    }

    // Only include fields that are provided
    if (updateData.name !== undefined) applicationUpdateData.name = updateData.name
    if (updateData.email !== undefined) applicationUpdateData.email = updateData.email
    if (updateData.phone !== undefined) applicationUpdateData.phone = updateData.phone
    if (updateData.current_company !== undefined) applicationUpdateData.current_company = updateData.current_company
    if (updateData.current_position !== undefined) applicationUpdateData.current_position = updateData.current_position
    if (updateData.years_of_experience !== undefined) applicationUpdateData.years_of_experience = updateData.years_of_experience
    if (updateData.expected_salary !== undefined) applicationUpdateData.expected_salary = updateData.expected_salary
    if (updateData.notice_period !== undefined) applicationUpdateData.notice_period = updateData.notice_period
    if (updateData.cover_letter !== undefined) applicationUpdateData.cover_letter = updateData.cover_letter
    if (updateData.linkedin_url !== undefined) applicationUpdateData.linkedin_url = updateData.linkedin_url
    if (updateData.portfolio_url !== undefined) applicationUpdateData.portfolio_url = updateData.portfolio_url
    if (updateData.cv_url !== undefined) applicationUpdateData.cv_url = updateData.cv_url
    if (updateData.status !== undefined) applicationUpdateData.status = updateData.status
    if (updateData.notes !== undefined) applicationUpdateData.notes = updateData.notes

    const { data, error } = await supabase
      .from('job_applications')
      .update(applicationUpdateData)
      .eq('id', id)
      .select(`
        *,
        careers:career_id (
          id,
          title_en,
          title_ar,
          department_en,
          department_ar
        )
      `)
      .single()

    if (error) {
      console.error('Error updating job application:', error)
      return NextResponse.json(
        { error: 'Failed to update job application' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in job applications PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error deleting job application:', error)
      return NextResponse.json(
        { error: 'Failed to delete job application' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Application deleted successfully' })
  } catch (error) {
    console.error('Error in job applications DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}