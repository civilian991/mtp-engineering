import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmailNotification } from '@/lib/email/send'
import { strictRateLimit } from '@/lib/rate-limit'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  subject: string
  inquiry_type: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = strictRateLimit.check(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
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

    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Get Supabase client
    const supabase = await createClient()

    // Save to database
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
        subject: body.subject || null,
        inquiry_type: body.inquiry_type || 'general',
        message: body.message,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save inquiry' },
        { status: 500 }
      )
    }

    // Send email notification (non-blocking)
    sendEmailNotification({
      to: process.env.ADMIN_EMAIL || 'admin@mtp.com.sa',
      subject: `New inquiry from ${body.name}`,
      template: 'inquiry',
      data: {
        ...body,
        inquiryId: data.id,
        date: new Date().toLocaleDateString()
      }
    }).catch(error => {
      console.error('Email notification failed:', error)
      // Don't fail the request if email fails
    })

    const response = NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. We will contact you soon.',
        inquiry_id: data.id
      },
      { status: 200 }
    )

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString())

    return response
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}