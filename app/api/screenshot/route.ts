import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/screenshot?url=https://...
 *
 * Server-side Microlink screenshot proxy.
 * - Fetches a desktop viewport screenshot via the Microlink API
 * - Streams the image back with long-lived cache headers so Vercel Edge Cache
 *   and the Next.js Image optimizer only call Microlink once per 24 h
 * - Falls back with a 502 if Microlink is unavailable (caller should
 *   display the static fallback image instead)
 *
 * No API key required for Microlink's free tier (≤ 50 req/day; 1,000 req/day
 * with a free account). Add MICROLINK_API_KEY to .env.local and Vercel to
 * increase limits:
 *   https://microlink.io/docs/api/getting-started/authentication
 */
export const runtime = 'nodejs'

const ML_BASE = 'https://api.microlink.io'
const CACHE_SECONDS = 60 * 60 * 24 // 24 hours
const STALE_SECONDS = 60 * 60 * 24 * 7 // 7 days stale-while-revalidate

function buildMicrolinkUrl(targetUrl: string): string {
  const params = new URLSearchParams({
    url: targetUrl,
    screenshot: 'true',
    meta: 'false',
    'screenshot.type': 'jpeg',
    'screenshot.quality': '88',
    'screenshot.fullPage': 'false',
    'viewport.width': '1280',
    'viewport.height': '800',
  })

  const apiKey = process.env.MICROLINK_API_KEY
  if (apiKey) params.set('apikey', apiKey)

  return `${ML_BASE}?${params.toString()}`
}

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get('url')

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url param' }, { status: 400 })
  }

  // Basic URL validation — reject non-http(s) schemes
  let parsed: URL
  try {
    parsed = new URL(targetUrl)
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error()
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  try {
    // 1. Ask Microlink to screenshot the page
    const mlRes = await fetch(buildMicrolinkUrl(parsed.href), {
      next: { revalidate: CACHE_SECONDS },
    })

    if (!mlRes.ok) {
      console.error('[screenshot] Microlink error', mlRes.status, await mlRes.text())
      return NextResponse.json({ error: 'Screenshot service unavailable' }, { status: 502 })
    }

    const json = (await mlRes.json()) as {
      data?: { screenshot?: { url?: string } }
    }
    const screenshotUrl = json?.data?.screenshot?.url

    if (!screenshotUrl) {
      console.error('[screenshot] No screenshot URL in Microlink response')
      return NextResponse.json({ error: 'Screenshot not available' }, { status: 502 })
    }

    // 2. Fetch the actual image from Microlink's CDN
    const imgRes = await fetch(screenshotUrl)
    if (!imgRes.ok) {
      console.error('[screenshot] Image fetch failed', imgRes.status)
      return NextResponse.json({ error: 'Image fetch failed' }, { status: 502 })
    }

    const imageBuffer = await imgRes.arrayBuffer()
    const contentType = imgRes.headers.get('Content-Type') ?? 'image/jpeg'

    // 3. Stream back with aggressive caching (Vercel Edge Cache + browser)
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`,
        'CDN-Cache-Control': `public, max-age=${CACHE_SECONDS}`,
        Vary: 'Accept-Encoding',
      },
    })
  } catch (err) {
    console.error('[screenshot] Unexpected error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
