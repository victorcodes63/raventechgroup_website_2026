import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/siteUrl'

const description =
  'How Raven Tech Group collects, uses, and protects personal data when you use raventechgroup.com and our services.'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  openGraph: {
    title: 'Privacy Policy | Raven Tech Group',
    description,
    url: `${SITE_URL}/privacy`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Raven Tech Group',
    description,
  },
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
