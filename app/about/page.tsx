import type { Metadata } from 'next'

import { AboutManifestoContent } from '@/components/about/AboutManifestoContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

const title = 'About Raven Tech Group | Founder-Led Technology Consultancy in Nairobi'
const description =
  'Raven Tech Group is a founder-led technology consultancy in Westlands, Nairobi. Founded 2024 by Victor Chumo to build software that actually runs in production — for SACCOs, fintechs, and growth businesses across East and West Africa.'

const keywords = [
  'raven tech group',
  'victor chumo',
  'kenyan software consultancy',
  'nairobi technology consultancy',
  'founder-led agency kenya',
  'westlands software firm',
]

export const metadata: Metadata = {
  title,
  description,
  keywords,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/about`,
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
  alternates: { canonical: `${siteUrl}/about` },
  robots: { index: true, follow: true },
}

function aboutStructuredDataJsonLd() {
  const organizationId = `${siteUrl}/#organization`
  const founderId = `${siteUrl}/about#founder`
  const aboutPageId = `${siteUrl}/about#aboutpage`

  const graph: Record<string, unknown>[] = [
    {
      '@type': ['WebPage', 'AboutPage'],
      '@id': aboutPageId,
      name: title,
      description,
      url: `${siteUrl}/about`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Raven Tech Group',
        url: siteUrl,
      },
      about: { '@id': organizationId },
      mainEntity: { '@id': organizationId },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
      ],
    },
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'Raven Tech Group',
      url: siteUrl,
      foundingDate: '2024',
      founder: { '@id': founderId },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Western Heights, Karuna Road, Westlands',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi',
        addressCountry: 'KE',
      },
    },
    {
      '@type': 'Person',
      '@id': founderId,
      name: 'Victor Chumo',
      jobTitle: 'Managing Director, Raven Tech Group',
      worksFor: { '@id': organizationId },
    },
  ]

  const payload = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />
  )
}

export default function AboutPage() {
  return (
    <>
      {aboutStructuredDataJsonLd()}
      <AboutManifestoContent />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            main > section:first-of-type {
              position: relative;
              isolation: isolate;
            }

            main > section:first-of-type > .site-shell {
              position: relative;
              z-index: 10;
            }

            main > section:first-of-type::before {
              content: '';
              position: absolute;
              inset: 0;
              pointer-events: none;
              z-index: 0;
              background:
                radial-gradient(
                  ellipse 800px 600px at 85% 15%,
                  rgba(255, 169, 31, 0.04) 0%,
                  transparent 50%
                ),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
              background-repeat: no-repeat, repeat;
              background-size: cover, 320px 320px;
              opacity: 1;
              mix-blend-mode: overlay;
            }

            main > section:first-of-type::after {
              content: "// 01°17'S 36°49'E\\A// WESTLANDS, NAIROBI\\A// EST. 2024";
              position: absolute;
              right: 2rem;
              bottom: 2rem;
              pointer-events: none;
              z-index: 0;
              display: none;
              text-align: right;
              white-space: pre;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
                'Courier New', monospace;
              font-size: 10px;
              line-height: 1.45;
              letter-spacing: 0.08em;
              color: rgb(255 255 255 / 0.2);
            }

            @media (min-width: 768px) {
              main > section:first-of-type::after {
                display: block;
              }
            }

            @media (min-width: 1024px) {
              main > section:first-of-type::after {
                right: 3rem;
                bottom: 3rem;
                font-size: 12px;
              }
            }
          `,
        }}
      />
    </>
  )
}
