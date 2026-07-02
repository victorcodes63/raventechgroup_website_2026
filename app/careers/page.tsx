import type { Metadata } from 'next'

import { CareersPageContent } from '@/components/careers/CareersPageContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

const title = 'Careers at Raven Tech Group | Build Technology That Holds Under Pressure'
const description =
  'Join Raven Tech Group in Nairobi to build and support production systems for SACCOs, fintechs, and growth businesses across Africa.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'careers raven tech group',
    'software engineering jobs nairobi',
    'technology consultancy careers kenya',
    'fintech engineering jobs kenya',
    'westlands nairobi tech jobs',
  ],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/careers`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: `${siteUrl}/og/default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteUrl}/og/default.png`],
  },
  alternates: { canonical: `${siteUrl}/careers` },
  robots: { index: true, follow: true },
}

function careersStructuredDataJsonLd() {
  const pageUrl = `${siteUrl}/careers`
  const organizationId = `${siteUrl}/#organization`

  const payload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Raven Tech Group',
          url: siteUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Careers', item: pageUrl },
        ],
      },
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Raven Tech Group',
        url: siteUrl,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
    />
  )
}

export default function CareersPage() {
  return (
    <>
      {careersStructuredDataJsonLd()}
      <CareersPageContent />
    </>
  )
}


