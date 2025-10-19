import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Tables, TablesInsert } from '@/types/database'

type Project = Tables<'projects'>
type ProjectInsert = TablesInsert<'projects'>

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const supabase = await createClient()

    let query = supabase.from('projects').select('*')

    // Filter by sector
    const sector = searchParams.get('sector')
    if (sector && sector !== 'all') {
      query = query.eq('sector', sector)
    }

    // Filter by status
    const status = searchParams.get('status')
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    // Filter by year
    const year = searchParams.get('year')
    if (year && year !== 'all') {
      query = query.eq('year', parseInt(year))
    }

    // Filter by featured projects
    const featured = searchParams.get('featured')
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    // Search query
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      query = query.or(`name_en.ilike.%${searchQuery}%,name_ar.ilike.%${searchQuery}%,description_en.ilike.%${searchQuery}%,description_ar.ilike.%${searchQuery}%`)
    }

    // Order by sort_order, then by year descending
    query = query.order('sort_order', { ascending: true })
                 .order('year', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in projects GET:', error)
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
    if (!body.name_en || !body.name_ar) {
      return NextResponse.json(
        { error: 'Missing required fields: name_en and name_ar are required' },
        { status: 400 }
      )
    }

    // Prepare project data
    const projectData: ProjectInsert = {
      name_en: body.name_en,
      name_ar: body.name_ar,
      description_en: body.description_en || null,
      description_ar: body.description_ar || null,
      client_en: body.client_en || null,
      client_ar: body.client_ar || null,
      location_en: body.location_en || null,
      location_ar: body.location_ar || null,
      year: body.year || null,
      value: body.value || null,
      sector: body.sector || null,
      status: body.status || null,
      features: body.features || null,
      image_url: body.image_url || null,
      images: body.images || null,
      is_featured: body.is_featured !== undefined ? body.is_featured : false,
      sort_order: body.sort_order || null,
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in projects POST:', error)
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
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Prepare update data
    const projectUpdateData: any = {
      updated_at: new Date().toISOString(),
    }

    // Only include fields that are provided
    if (updateData.name_en !== undefined) projectUpdateData.name_en = updateData.name_en
    if (updateData.name_ar !== undefined) projectUpdateData.name_ar = updateData.name_ar
    if (updateData.description_en !== undefined) projectUpdateData.description_en = updateData.description_en
    if (updateData.description_ar !== undefined) projectUpdateData.description_ar = updateData.description_ar
    if (updateData.client_en !== undefined) projectUpdateData.client_en = updateData.client_en
    if (updateData.client_ar !== undefined) projectUpdateData.client_ar = updateData.client_ar
    if (updateData.location_en !== undefined) projectUpdateData.location_en = updateData.location_en
    if (updateData.location_ar !== undefined) projectUpdateData.location_ar = updateData.location_ar
    if (updateData.year !== undefined) projectUpdateData.year = updateData.year
    if (updateData.value !== undefined) projectUpdateData.value = updateData.value
    if (updateData.sector !== undefined) projectUpdateData.sector = updateData.sector
    if (updateData.status !== undefined) projectUpdateData.status = updateData.status
    if (updateData.features !== undefined) projectUpdateData.features = updateData.features
    if (updateData.image_url !== undefined) projectUpdateData.image_url = updateData.image_url
    if (updateData.images !== undefined) projectUpdateData.images = updateData.images
    if (updateData.is_featured !== undefined) projectUpdateData.is_featured = updateData.is_featured
    if (updateData.sort_order !== undefined) projectUpdateData.sort_order = updateData.sort_order

    const { data, error } = await supabase
      .from('projects')
      .update(projectUpdateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in projects PUT:', error)
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
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error deleting project:', error)
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error in projects DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}