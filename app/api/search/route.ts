import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { moderateRateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = moderateRateLimit.check(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many search requests. Please try again later.',
          retryAfter: rateLimitResult.resetTime - Date.now()
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') // 'all', 'projects', 'news', 'careers'
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters long' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const results: any = {
      projects: [],
      news: [],
      careers: [],
      total: 0
    }

    // Search projects
    if (type === 'all' || type === 'projects') {
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name_en, name_ar, description_en, description_ar, sector, year, image_url')
        .or(`name_en.ilike.%${query}%,name_ar.ilike.%${query}%,description_en.ilike.%${query}%,description_ar.ilike.%${query}%`)
        .limit(limit)

      results.projects = projects?.map(project => ({
        ...project,
        type: 'project',
        title: project.name_en,
        url: `/projects/${project.id}`
      })) || []
    }

    // Search news
    if (type === 'all' || type === 'news') {
      const { data: news } = await supabase
        .from('news')
        .select('id, title_en, title_ar, excerpt_en, excerpt_ar, published_date, image_url')
        .eq('is_published', true)
        .or(`title_en.ilike.%${query}%,title_ar.ilike.%${query}%,excerpt_en.ilike.%${query}%,excerpt_ar.ilike.%${query}%,content_en.ilike.%${query}%,content_ar.ilike.%${query}%`)
        .order('published_date', { ascending: false })
        .limit(limit)

      results.news = news?.map(article => ({
        ...article,
        type: 'news',
        title: article.title_en,
        url: `/news/${article.id}`
      })) || []
    }

    // Search careers
    if (type === 'all' || type === 'careers') {
      const { data: careers } = await supabase
        .from('careers')
        .select('id, title_en, title_ar, description_en, description_ar, department_en, location_en, posted_date')
        .eq('is_active', true)
        .or(`title_en.ilike.%${query}%,title_ar.ilike.%${query}%,description_en.ilike.%${query}%,description_ar.ilike.%${query}%,department_en.ilike.%${query}%`)
        .order('posted_date', { ascending: false })
        .limit(limit)

      results.careers = careers?.map(career => ({
        ...career,
        type: 'career',
        title: career.title_en,
        url: `/careers/${career.id}`
      })) || []
    }

    // Calculate total results
    results.total = results.projects.length + results.news.length + results.careers.length

    // If searching all types, combine and sort by relevance (simplified)
    if (type === 'all') {
      const allResults = [
        ...results.projects,
        ...results.news,
        ...results.careers
      ].slice(0, limit)

      results.combined = allResults
    }

    const response = NextResponse.json(results)

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString())

    return response

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}