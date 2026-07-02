import type { Metadata } from 'next'

import { LocalBusinessSchema } from '@/components/seo/StructuredData'

const site = 'https://www.raventechgroup.com'

const description =
  'Contact Raven Tech Group in Westlands, Nairobi — software, cloud, integration, and advisory for SACCOs, fintechs, and growth-stage businesses across Kenya and East Africa.'

export const metadata: Metadata = {
  title: 'Contact',
  description,
  keywords: [
    'contact Raven Tech Group',
    'IT consultancy Nairobi',
    'software development Kenya',
    'technology partner Westlands',
    'discovery call Nairobi',
  ],
  openGraph: {
    title: 'Contact | Raven Tech Group',
    description,
    url: `${site}/contact`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Raven Tech Group',
    description,
  },
  alternates: { canonical: `${site}/contact` },
  robots: { index: true, follow: true },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalBusinessSchema />
      {children}
    </>
  )
}
