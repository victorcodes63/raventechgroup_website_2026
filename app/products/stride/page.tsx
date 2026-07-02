import type { Metadata } from 'next'

import { StrideProductContent } from './StrideProductContent'

const site = 'https://www.raventechgroup.com'

const title = 'Stride | Business Management Platform | Raven Tech Group'
const description =
  'Stride is Raven Tech Group’s business platform for East Africa — HR, payroll, finance, and industry verticals on one system. Built in Nairobi. Compliance and M-Pesa built in.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Stride Kenya',
    'HR software Kenya',
    'payroll software Kenya',
    'business management platform East Africa',
    'HRIS Kenya',
    'M-Pesa payroll',
    'KRA PAYE software',
    'Raven Tech Group product',
  ],
  openGraph: {
    title: 'Stride — Run your whole business as one',
    description,
    url: `${site}/products/stride`,
    siteName: 'Raven Tech Group',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Stride by Raven Tech Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og/default.png'],
  },
  alternates: {
    canonical: `${site}/products/stride`,
  },
  robots: { index: true, follow: true },
}

export default function StrideProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Stride',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            url: 'https://getstride.co.ke',
            description,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'KES',
              availability: 'https://schema.org/InStock',
            },
            provider: {
              '@type': 'Organization',
              name: 'Raven Tech Group',
              url: site,
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: site },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `${site}/products` },
                { '@type': 'ListItem', position: 3, name: 'Stride', item: `${site}/products/stride` },
              ],
            },
          }),
        }}
      />
      <StrideProductContent />
    </>
  )
}
