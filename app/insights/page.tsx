import type { Metadata } from 'next'
import { InsightsEditorialPage } from '@/components/insights/InsightsEditorialPage'
import { insightsOrderedFeaturedFirst } from '@/lib/data/insights'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

export const metadata: Metadata = {
  title: 'Insights & Field Notes | Raven Tech Group',
  description:
    'Practical field notes from Raven Tech Group on M-Pesa engineering, SACCO technology, and Kenyan software delivery patterns.',
  alternates: {
    canonical: `${siteUrl}/insights`,
  },
  openGraph: {
    title: 'Insights & Field Notes | Raven Tech Group',
    description: 'Practical writing for Kenyan operators, founders, and technical leaders.',
    url: `${siteUrl}/insights`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: `${siteUrl}/og/default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Field Notes | Raven Tech Group',
    description: 'M-Pesa engineering, SACCO technology, and execution insights from Nairobi.',
    images: [`${siteUrl}/og/default.png`],
  },
  robots: { index: true, follow: true },
}

function insightsBlogJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/insights#blog`,
    name: 'Raven Tech Group Field Notes',
    description: 'Editorial writing on Kenyan fintech, SACCO technology, and software operations.',
    url: `${siteUrl}/insights`,
    publisher: {
      '@type': 'Organization',
      name: 'Raven Tech Group',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/favicon/web-app-manifest-512x512.png`,
      },
    },
    blogPost: insightsOrderedFeaturedFirst.map((insight) => ({
      '@type': 'BlogPosting',
      headline: insight.title,
      url: `${siteUrl}/insights/${insight.slug}`,
      datePublished: insight.publishedAt,
      dateModified: insight.updatedAt ?? insight.publishedAt,
      author: {
        '@type': 'Person',
        name: insight.author.name,
      },
    })),
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default function InsightsPage() {
  return (
    <>
      {insightsBlogJsonLd()}
      <InsightsEditorialPage insights={insightsOrderedFeaturedFirst} />
    </>
  )
}
