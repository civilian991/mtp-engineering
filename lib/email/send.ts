import nodemailer from 'nodemailer'
import { getEmailTemplate } from './templates'

interface EmailOptions {
  to: string
  subject: string
  template: 'inquiry' | 'application' | 'welcome' | 'password-reset'
  data: any
}

// Create transporter (reusable)
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : undefined
  }

  // Return null if SMTP is not configured
  if (!config.auth) {
    console.warn('SMTP not configured. Emails will not be sent.')
    return null
  }

  return nodemailer.createTransport(config)
}

export async function sendEmailNotification(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = createTransporter()

    // Skip if SMTP is not configured
    if (!transporter) {
      console.log('Email notification skipped (SMTP not configured):', options)
      return false
    }

    // Get email template
    const { html, text } = getEmailTemplate(options.template, options.data)

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"MTP Engineering" <noreply@mtp.com.sa>',
      to: options.to,
      subject: options.subject,
      text: text,
      html: html
    })

    console.log('Email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Send email to multiple recipients
export async function sendBulkEmail(
  recipients: string[],
  subject: string,
  template: EmailOptions['template'],
  data: any
): Promise<{ sent: string[], failed: string[] }> {
  const results = {
    sent: [] as string[],
    failed: [] as string[]
  }

  // Send emails in parallel (with a limit)
  const batchSize = 5
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize)
    const promises = batch.map(async (to) => {
      const success = await sendEmailNotification({
        to,
        subject,
        template,
        data
      })
      return { to, success }
    })

    const batchResults = await Promise.all(promises)
    batchResults.forEach(({ to, success }) => {
      if (success) {
        results.sent.push(to)
      } else {
        results.failed.push(to)
      }
    })
  }

  return results
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const transporter = createTransporter()
    if (!transporter) {
      return false
    }

    // Verify connection
    await transporter.verify()
    console.log('Email server connection successful')
    return true
  } catch (error) {
    console.error('Email server connection failed:', error)
    return false
  }
}