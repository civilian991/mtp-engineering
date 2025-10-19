interface EmailTemplate {
  html: string
  text: string
}

export function getEmailTemplate(template: string, data: any): EmailTemplate {
  switch (template) {
    case 'inquiry':
      return inquiryTemplate(data)
    case 'application':
      return applicationTemplate(data)
    case 'welcome':
      return welcomeTemplate(data)
    case 'password-reset':
      return passwordResetTemplate(data)
    default:
      return defaultTemplate(data)
  }
}

function inquiryTemplate(data: any): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #4b5563; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Inquiry Received</h1>
        </div>
        <div class="content">
          <p>A new inquiry has been submitted through the MTP Engineering website.</p>

          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.name}</div>
          </div>

          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email}</div>
          </div>

          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}

          ${data.company ? `
          <div class="field">
            <div class="label">Company:</div>
            <div class="value">${data.company}</div>
          </div>
          ` : ''}

          ${data.subject ? `
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${data.subject}</div>
          </div>
          ` : ''}

          <div class="field">
            <div class="label">Inquiry Type:</div>
            <div class="value">${data.inquiry_type || 'General'}</div>
          </div>

          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${data.message}</div>
          </div>

          <div class="field">
            <div class="label">Submitted on:</div>
            <div class="value">${data.date}</div>
          </div>

          ${data.inquiryId ? `
          <div class="field">
            <div class="label">Inquiry ID:</div>
            <div class="value">${data.inquiryId}</div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>This email was sent from MTP Engineering website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
New Inquiry Received

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.company ? `Company: ${data.company}` : ''}
${data.subject ? `Subject: ${data.subject}` : ''}
Inquiry Type: ${data.inquiry_type || 'General'}

Message:
${data.message}

Submitted on: ${data.date}
${data.inquiryId ? `Inquiry ID: ${data.inquiryId}` : ''}

This email was sent from MTP Engineering website contact form.
  `

  return { html, text }
}

function applicationTemplate(data: any): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #4b5563; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Job Application</h1>
        </div>
        <div class="content">
          <p>A new job application has been submitted for the position: <strong>${data.position}</strong></p>

          <div class="field">
            <div class="label">Applicant Name:</div>
            <div class="value">${data.name}</div>
          </div>

          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email}</div>
          </div>

          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${data.phone}</div>
          </div>

          ${data.experience ? `
          <div class="field">
            <div class="label">Years of Experience:</div>
            <div class="value">${data.experience}</div>
          </div>
          ` : ''}

          ${data.coverLetter ? `
          <div class="field">
            <div class="label">Cover Letter:</div>
            <div class="value">${data.coverLetter}</div>
          </div>
          ` : ''}

          ${data.resumeUrl ? `
          <div class="field">
            <div class="label">Resume:</div>
            <div class="value"><a href="${data.resumeUrl}">Download Resume</a></div>
          </div>
          ` : ''}

          <div class="field">
            <div class="label">Applied on:</div>
            <div class="value">${data.date}</div>
          </div>
        </div>
        <div class="footer">
          <p>Please review this application in the admin dashboard.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
New Job Application

Position: ${data.position}
Applicant Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.experience ? `Years of Experience: ${data.experience}` : ''}

${data.coverLetter ? `Cover Letter:\n${data.coverLetter}` : ''}

Applied on: ${data.date}

Please review this application in the admin dashboard.
  `

  return { html, text }
}

function welcomeTemplate(data: any): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #1e40af;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to MTP Engineering</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for creating an account with MTP Engineering. Your account has been successfully created.</p>
          <p>You can now access your admin dashboard to manage content and view analytics.</p>
          <a href="${data.dashboardUrl || 'https://mtp.com.sa/admin'}" class="button">Go to Dashboard</a>
        </div>
        <div class="footer">
          <p>If you have any questions, please contact support.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Welcome to MTP Engineering

Dear ${data.name},

Thank you for creating an account with MTP Engineering. Your account has been successfully created.

You can now access your admin dashboard to manage content and view analytics.

Dashboard URL: ${data.dashboardUrl || 'https://mtp.com.sa/admin'}

If you have any questions, please contact support.
  `

  return { html, text }
}

function passwordResetTemplate(data: any): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #1e40af;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <a href="${data.resetUrl}" class="button">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>MTP Engineering - Engineering Excellence Since 1979</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Password Reset Request

Dear ${data.name},

We received a request to reset your password. Click the link below to reset it:

${data.resetUrl}

This link will expire in 1 hour.

If you didn't request this, you can safely ignore this email.

MTP Engineering - Engineering Excellence Since 1979
  `

  return { html, text }
}

function defaultTemplate(data: any): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <p>${data.message || 'No message content'}</p>
    </body>
    </html>
  `

  const text = data.message || 'No message content'

  return { html, text }
}