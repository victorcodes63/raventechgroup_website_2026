'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
  adsId?: string
}

export function GoogleAnalytics({ gaId, adsId = '' }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const isFirstPath = useRef(true)
  const measurementId = gaId || adsId

  useEffect(() => {
    if (!gaId || typeof window === 'undefined' || typeof window.gtag !== 'function') return
    if (isFirstPath.current) {
      isFirstPath.current = false
      return
    }
    window.gtag('event', 'page_view', { page_path: pathname })
  }, [gaId, pathname])

  if (!measurementId) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${gaId ? `gtag('config', '${gaId}');` : ''}
            ${adsId ? `gtag('config', '${adsId}');` : ''}
          `,
        }}
      />
    </>
  )
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    const id = process.env.NEXT_PUBLIC_GA_ID || 'G-XXZLNHFX62'
    window.gtag('config', id, {
      page_path: url,
    })
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function trackAdsConversion(
  conversionLabel: string,
  value?: number,
  currency: string = 'USD'
) {
  if (typeof window === 'undefined' || !window.gtag) return
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  if (!adsId || !conversionLabel) return

  window.gtag('event', 'conversion', {
    send_to: `${adsId}/${conversionLabel}`,
    ...(typeof value === 'number' ? { value } : {}),
    ...(typeof value === 'number' ? { currency } : {}),
  })
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date | 'default' | 'update',
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}
