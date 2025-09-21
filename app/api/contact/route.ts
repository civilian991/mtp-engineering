import { NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  subject: string
  inquiry_type: string
  message: string
}

export async function POST(request: Request) {
  try {
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

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM

    // For now, we'll simulate success
    console.log('Contact form submission:', body)

    // In production, you might send an email using a service like SendGrid
    // await sendEmail({
    //   to: 'admin@mtp.com.sa',
    //   subject: `New inquiry from ${body.name}`,
    //   body: formatEmailBody(body)
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. We will contact you soon.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}