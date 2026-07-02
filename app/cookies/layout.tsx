import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/siteUrl'

const description =
  'How Raven Tech Group uses cookies and similar technologies on raventechgroup.com — analytics, preferences, and essential site functions.'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description,
  openGraph: {
    title: 'Cookie Policy | Raven Tech Group',
    description,
    url: `${SITE_URL}/cookies`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy | Raven Tech Group',
    description,
  },
  alternates: { canonical: `${SITE_URL}/cookies` },
  robots: { index: true, follow: true },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
