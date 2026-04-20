import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().max(120).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const json: unknown = await request.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 })
    }

    const { email, source } = parsed.data
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      return NextResponse.json(
        { success: false, message: 'Service temporarily unavailable.' },
        { status: 503 },
      )
    }

    const sql = neon(databaseUrl)
    const src = source ?? 'website'
    await sql`INSERT INTO newsletter_subscribers (email, source) VALUES (${email}, ${src})`

    return NextResponse.json({ success: true, message: 'You are on the list.' })
  } catch (err) {
    console.error('newsletter_subscribe', err)
    return NextResponse.json(
      { success: false, message: 'Could not subscribe. Try again or email hello@raventechgroup.com.' },
      { status: 500 },
    )
  }
}
