import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/siteUrl'

const description =
  'Terms of service for Raven Tech Group — software development, consulting, and technology engagements from Nairobi, Kenya.'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description,
  openGraph: {
    title: 'Terms of Service | Raven Tech Group',
    description,
    url: `${SITE_URL}/terms`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Raven Tech Group',
    description,
  },
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
