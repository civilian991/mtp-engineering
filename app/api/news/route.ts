import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Tables, TablesInsert } from '@/types/database'

type News = Tables<'news'>
type NewsInsert = TablesInsert<'news'>

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const supabase = await createClient()

    let query = supabase.from('news').select('*')

    // Filter by category
    const category = searchParams.get('category')
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // Filter by published status
    const published = searchParams.get('published')
    if (published !== 'false') {
      query = query.eq('is_published', true)
    }

    // Search query
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      query = query.or(`title_en.ilike.%${searchQuery}%,title_ar.ilike.%${searchQuery}%,content_en.ilike.%${searchQuery}%,content_ar.ilike.%${searchQuery}%,excerpt_en.ilike.%${searchQuery}%,excerpt_ar.ilike.%${searchQuery}%`)
    }

    // Limit results
    const limit = searchParams.get('limit')
    if (limit) {
      query = query.limit(parseInt(limit))
    }

    // Order by published date descending
    query = query.order('published_date', { ascending: false })
                 .order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching news:', error)
      return NextResponse.json(
        { error: 'Failed to fetch news' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in news GET:', error)
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

    // Prepare news data
    const newsData: NewsInsert = {
      title_en: body.title_en,
      title_ar: body.title_ar,
      content_en: body.content_en || null,
      content_ar: body.content_ar || null,
      excerpt_en: body.excerpt_en || null,
      excerpt_ar: body.excerpt_ar || null,
      author: body.author || null,
      category: body.category || null,
      image_url: body.image_url || null,
      tags: body.tags || null,
      is_published: body.is_published !== undefined ? body.is_published : false,
      published_date: body.published_date || (body.is_published ? new Date().toISOString().split('T')[0] : null),
      views: 0,
    }

    const { data, error } = await supabase
      .from('news')
      .insert([newsData])
      .select()
      .single()

    if (error) {
      console.error('Error creating news:', error)
      return NextResponse.json(
        { error: 'Failed to create news article' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in news POST:', error)
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
        { error: 'News ID is required' },
        { status: 400 }
      )
    }

    // Prepare update data
    const newsUpdateData: any = {
      updated_at: new Date().toISOString(),
    }

    // Only include fields that are provided
    if (updateData.title_en !== undefined) newsUpdateData.title_en = updateData.title_en
    if (updateData.title_ar !== undefined) newsUpdateData.title_ar = updateData.title_ar
    if (updateData.content_en !== undefined) newsUpdateData.content_en = updateData.content_en
    if (updateData.content_ar !== undefined) newsUpdateData.content_ar = updateData.content_ar
    if (updateData.excerpt_en !== undefined) newsUpdateData.excerpt_en = updateData.excerpt_en
    if (updateData.excerpt_ar !== undefined) newsUpdateData.excerpt_ar = updateData.excerpt_ar
    if (updateData.author !== undefined) newsUpdateData.author = updateData.author
    if (updateData.category !== undefined) newsUpdateData.category = updateData.category
    if (updateData.image_url !== undefined) newsUpdateData.image_url = updateData.image_url
    if (updateData.tags !== undefined) newsUpdateData.tags = updateData.tags
    if (updateData.is_published !== undefined) {
      newsUpdateData.is_published = updateData.is_published
      // Set published_date if publishing for the first time
      if (updateData.is_published && !updateData.published_date) {
        newsUpdateData.published_date = new Date().toISOString().split('T')[0]
      }
    }
    if (updateData.published_date !== undefined) newsUpdateData.published_date = updateData.published_date
    if (updateData.views !== undefined) newsUpdateData.views = updateData.views

    const { data, error } = await supabase
      .from('news')
      .update(newsUpdateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating news:', error)
      return NextResponse.json(
        { error: 'Failed to update news article' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news PUT:', error)
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
        { error: 'News ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error deleting news:', error)
      return NextResponse.json(
        { error: 'Failed to delete news article' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'News article deleted successfully' })
  } catch (error) {
    console.error('Error in news DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}