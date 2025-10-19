import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'

type Career = Tables<'careers'>

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const supabase = await createClient()

    let query = supabase.from('careers').select('*')

    // Filter by department
    const departmentEn = searchParams.get('department_en')
    const departmentAr = searchParams.get('department_ar')
    if (departmentEn && departmentEn !== 'all') {
      query = query.eq('department_en', departmentEn)
    }
    if (departmentAr && departmentAr !== 'all') {
      query = query.eq('department_ar', departmentAr)
    }

    // Filter by location
    const locationEn = searchParams.get('location_en')
    const locationAr = searchParams.get('location_ar')
    if (locationEn && locationEn !== 'all') {
      query = query.eq('location_en', locationEn)
    }
    if (locationAr && locationAr !== 'all') {
      query = query.eq('location_ar', locationAr)
    }

    // Filter by type
    const type = searchParams.get('type')
    if (type && type !== 'all') {
      query = query.eq('type', type)
    }

    // Filter by experience level
    const experienceLevel = searchParams.get('experience_level')
    if (experienceLevel && experienceLevel !== 'all') {
      query = query.eq('experience_level', experienceLevel)
    }

    // Filter only active jobs by default
    const showInactive = searchParams.get('show_inactive') === 'true'
    if (!showInactive) {
      query = query.eq('is_active', true)
    }

    // Order by posted date descending
    query = query.order('posted_date', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching careers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch careers' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in careers GET:', error)
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
    if (!body.title_en || !body.title_ar) {
      return NextResponse.json(
        { error: 'Missing required fields: title_en and title_ar are required' },
        { status: 400 }
      )
    }

    // Prepare career data
    const careerData = {
      title_en: body.title_en,
      title_ar: body.title_ar,
      department_en: body.department_en || null,
      department_ar: body.department_ar || null,
      location_en: body.location_en || null,
      location_ar: body.location_ar || null,
      type: body.type || null,
      experience_level: body.experience_level || null,
      description_en: body.description_en || null,
      description_ar: body.description_ar || null,
      requirements_en: body.requirements_en || null,
      requirements_ar: body.requirements_ar || null,
      responsibilities_en: body.responsibilities_en || null,
      responsibilities_ar: body.responsibilities_ar || null,
      benefits_en: body.benefits_en || null,
      benefits_ar: body.benefits_ar || null,
      closing_date: body.closing_date || null,
      posted_date: new Date().toISOString().split('T')[0],
      is_active: body.is_active !== undefined ? body.is_active : true,
    }

    const { data, error } = await supabase
      .from('careers')
      .insert([careerData])
      .select()
      .single()

    if (error) {
      console.error('Error creating career:', error)
      return NextResponse.json(
        { error: 'Failed to create career posting' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in careers POST:', error)
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
        { error: 'Career ID is required' },
        { status: 400 }
      )
    }

    // Prepare update data
    const careerUpdateData: any = {
      updated_at: new Date().toISOString(),
    }

    // Only include fields that are provided
    if (updateData.title_en !== undefined) careerUpdateData.title_en = updateData.title_en
    if (updateData.title_ar !== undefined) careerUpdateData.title_ar = updateData.title_ar
    if (updateData.department_en !== undefined) careerUpdateData.department_en = updateData.department_en
    if (updateData.department_ar !== undefined) careerUpdateData.department_ar = updateData.department_ar
    if (updateData.location_en !== undefined) careerUpdateData.location_en = updateData.location_en
    if (updateData.location_ar !== undefined) careerUpdateData.location_ar = updateData.location_ar
    if (updateData.type !== undefined) careerUpdateData.type = updateData.type
    if (updateData.experience_level !== undefined) careerUpdateData.experience_level = updateData.experience_level
    if (updateData.description_en !== undefined) careerUpdateData.description_en = updateData.description_en
    if (updateData.description_ar !== undefined) careerUpdateData.description_ar = updateData.description_ar
    if (updateData.requirements_en !== undefined) careerUpdateData.requirements_en = updateData.requirements_en
    if (updateData.requirements_ar !== undefined) careerUpdateData.requirements_ar = updateData.requirements_ar
    if (updateData.responsibilities_en !== undefined) careerUpdateData.responsibilities_en = updateData.responsibilities_en
    if (updateData.responsibilities_ar !== undefined) careerUpdateData.responsibilities_ar = updateData.responsibilities_ar
    if (updateData.benefits_en !== undefined) careerUpdateData.benefits_en = updateData.benefits_en
    if (updateData.benefits_ar !== undefined) careerUpdateData.benefits_ar = updateData.benefits_ar
    if (updateData.closing_date !== undefined) careerUpdateData.closing_date = updateData.closing_date
    if (updateData.is_active !== undefined) careerUpdateData.is_active = updateData.is_active

    const { data, error } = await supabase
      .from('careers')
      .update(careerUpdateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating career:', error)
      return NextResponse.json(
        { error: 'Failed to update career posting' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in careers PUT:', error)
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
        { error: 'Career ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('careers')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error deleting career:', error)
      return NextResponse.json(
        { error: 'Failed to delete career posting' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Career deleted successfully' })
  } catch (error) {
    console.error('Error in careers DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}