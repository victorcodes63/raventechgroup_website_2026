import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  // Clean up expired entries on access
  if (record && record.resetTime < now) {
    rateLimitMap.delete(identifier)
  }

  if (!record || record.resetTime < now) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

function getClientIdentifier(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  return ip
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, timeline, services, budget, message, projectContext, honeypot } = body

    // Bot protection: Check honeypot field (should be empty)
    if (honeypot && honeypot.trim() !== '') {
      // Silently reject - don't let bots know they were caught
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    }

    // Rate limiting
    const clientId = getClientIdentifier(request)
    if (!checkRateLimit(clientId, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Basic spam detection: Check for common spam patterns
    const spamPatterns = [
      /http[s]?:\/\//i,
      /www\./i,
      /\[url\]/i,
      /<a href/i,
    ]
    
    const allText = `${name} ${email} ${message || ''} ${projectContext || ''}`.toLowerCase()
    const hasSpamPattern = spamPatterns.some(pattern => pattern.test(allText))
    
    // Allow URLs in message/project context (legitimate use case), but flag if in name/email
    const nameEmailText = `${name} ${email}`.toLowerCase()
    const spamInNameEmail = spamPatterns.some(pattern => pattern.test(nameEmailText))
    
    if (spamInNameEmail) {
      return NextResponse.json(
        { error: 'Invalid input detected. Please check your information.' },
        { status: 400 }
      )
    }

    // Determine which form variant was used (homepage has phone but no company/timeline/services)
    const isHomepageForm = !!phone && !company

    // Build email content
    const emailSubject = isHomepageForm
      ? `New Contact Form Submission from ${name}`
      : `New Contact Form Submission: ${services || 'General Inquiry'}`

    const emailContent = isHomepageForm
      ? `
        <h2>New Contact Form Submission (Homepage)</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${message || projectContext ? `<p><strong>Project Context:</strong><br>${(message || projectContext || '').replace(/\n/g, '<br>')}</p>` : ''}
      `
      : `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
        ${services ? `<p><strong>Area of Interest:</strong> ${services}</p>` : ''}
        ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
        ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
      `

    // Send email using Resend
    // Note: To use a custom "from" address, verify your domain with Resend first
    // For now, using Resend's default sender. Update the "from" field after domain verification.
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY environment variable.' },
        { status: 500 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Raven Tech Group Website <onboarding@resend.dev>',
      to: ['hello@raventechgroup.com'],
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #000; color: #FFA91E; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .field strong { color: #000; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; color: #FFA91E;">Raven Tech Group</h1>
                <p style="margin: 5px 0 0 0; color: #fff; font-size: 14px;">New Contact Form Submission</p>
              </div>
              <div class="content">
                ${emailContent}
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                <p style="font-size: 12px; color: #666;">
                  This email was sent from the Raven Tech Group website contact form.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

