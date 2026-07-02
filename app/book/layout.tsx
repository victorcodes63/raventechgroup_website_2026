import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const BOOK_CANONICAL = 'https://www.raventechgroup.com/book'

const bookServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Discovery Call — Raven Tech Group',
  description:
    'Free 30-minute discovery call to discuss your technology project with Raven Tech Group.',
  provider: {
    '@type': 'Organization',
    name: 'Raven Tech Group',
    url: 'https://www.raventechgroup.com',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock',
    url: BOOK_CANONICAL,
  },
  areaServed: [
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'Uganda' },
    { '@type': 'Country', name: 'Tanzania' },
    { '@type': 'Country', name: 'Rwanda' },
  ],
}

export const metadata: Metadata = {
  title: 'Book a Discovery Call',
  description:
    '30-minute free discovery call with Raven Tech Group. Tell us what you are building. We will tell you honestly if we are the right fit. Based in Westlands, Nairobi.',
  keywords: [
    'book discovery call Kenya',
    'IT consultancy Nairobi',
    'technology consulting Westlands',
    'Microsoft Bookings Raven Tech Group',
    'free scoping call Kenya',
  ],
  alternates: {
    canonical: BOOK_CANONICAL,
  },
  openGraph: {
    title: 'Book a Discovery Call | Raven Tech Group',
    description: '30 minutes. No pitch. Just an honest conversation about your project.',
    locale: 'en_KE',
    type: 'website',
    url: BOOK_CANONICAL,
    siteName: 'Raven Tech Group',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Raven Tech Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Discovery Call | Raven Tech Group',
    description: '30 minutes. No pitch. Just an honest conversation about your project.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },
}

export default function BookLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookServiceSchema) }}
      />
      {children}
    </>
  )
}
