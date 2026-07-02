import type { Metadata } from 'next'

import { ServicesContent } from './ServicesContent'

const site = 'https://www.raventechgroup.com'

const description =
  'Software development, cloud, M-Pesa integration, and cybersecurity from Nairobi. Engineering and consulting for SACCOs, fintechs, and growth teams in Kenya and East Africa.'

export const metadata: Metadata = {
  title: 'Services | Raven Tech Group',
  description,
  keywords: [
    'software development Kenya',
    'web development Nairobi',
    'cloud solutions AWS Azure Kenya',
    'M-Pesa API integration',
    'SACCO software Kenya',
    'fintech development East Africa',
    'cybersecurity CBK readiness',
    'IT consulting Nairobi',
    'system integration Kenya',
    'digital transformation Kenya',
    'data warehouse Kenya',
    'TypeScript development Africa',
  ],
  openGraph: {
    title: 'Services | Raven Tech Group',
    description,
    url: `${site}/services`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Raven Tech Group',
    description,
  },
  alternates: { canonical: `${site}/services` },
  robots: { index: true, follow: true },
}

export default function ServicesPage() {
  return <ServicesContent />
}
