import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtp.com.sa'

    // Static pages
    const staticPages = [
      '',
      '/about',
      '/about/team',
      '/contact',
      '/careers',
      '/resources',
      '/terms',
      '/sectors',
      '/sectors/infrastructure',
      '/sectors/commercial-residential',
      '/sectors/government',
      '/sectors/healthcare',
      '/sectors/industrial',
      '/sectors/oil-gas',
      '/sectors/utilities',
    ]

    // Get dynamic content from database
    const [projectsResult, newsResult, careersResult] = await Promise.all([
      supabase.from('projects').select('id, updated_at').eq('status', 'completed'),
      supabase.from('news').select('id, updated_at').eq('is_published', true),
      supabase.from('careers').select('id, updated_at').eq('is_active', true)
    ])

    const projects = projectsResult.data || []
    const news = newsResult.data || []
    const careers = careersResult.data || []

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar${page}"/>
  </url>`).join('\n')}
${projects.map(project => `  <url>
    <loc>${baseUrl}/projects/${project.id}</loc>
    <lastmod>${project.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/projects/${project.id}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar/projects/${project.id}"/>
  </url>`).join('\n')}
${news.map(article => `  <url>
    <loc>${baseUrl}/news/${article.id}</loc>
    <lastmod>${article.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/news/${article.id}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar/news/${article.id}"/>
  </url>`).join('\n')}
${careers.map(career => `  <url>
    <loc>${baseUrl}/careers/${career.id}</loc>
    <lastmod>${career.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/careers/${career.id}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar/careers/${career.id}"/>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
      }
    })

  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}