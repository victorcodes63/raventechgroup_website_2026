'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
  adsId?: string
}

const CONSENT_KEY = 'cookie-consent'
const CONSENT_EVENT = 'cookie-consent-updated'

export function GoogleAnalytics({ gaId, adsId = '' }: GoogleAnalyticsProps) {
  const [hasConsent, setHasConsent] = useState(false)

  const measurementId = gaId || adsId

  useEffect(() => {
    if (!measurementId) return

    const syncConsent = () => {
      if (typeof window === 'undefined') return
      const consent = window.localStorage.getItem(CONSENT_KEY)
      setHasConsent(consent === 'accepted')
    }

    syncConsent()
    window.addEventListener(CONSENT_EVENT, syncConsent as EventListener)
    window.addEventListener('storage', syncConsent)
    return () => {
      window.removeEventListener(CONSENT_EVENT, syncConsent as EventListener)
      window.removeEventListener('storage', syncConsent)
    }
  }, [measurementId])

  if (!measurementId || !hasConsent) {
    return null
  }

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

// Helper function to track page views
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (gaId) {
      window.gtag('config', gaId, {
        page_path: url,
      })
    }
  }
}

// Helper function to track events
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

// Extend Window interface for TypeScript
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

