import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { CaseStudiesIndexClient } from '@/components/case-studies/CaseStudiesIndexClient'
import { caseStudiesOrdered } from '@/lib/data/caseStudies'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

const CASE_STUDIES_TITLE = 'Case studies — Nairobi software, websites, and platforms | Raven Tech Group'
const CASE_STUDIES_DESCRIPTION =
  'Live Raven work in Nairobi: HR platforms, M-Pesa integrations, PR and print studio websites, Shopify, and event products. Outcomes you can open in a browser.'

export const metadata: Metadata = {
  title: { absolute: CASE_STUDIES_TITLE },
  description: CASE_STUDIES_DESCRIPTION,
  keywords: [
    'raven tech group case studies',
    'web development Nairobi case study',
    'PR website Kenya',
    'print studio website Nairobi',
    'HR software Kenya case study',
    'm-pesa integration case study',
    'Next.js agency Nairobi',
  ],
  alternates: {
    canonical: `${siteUrl}/case-studies`,
  },
  openGraph: {
    title: CASE_STUDIES_TITLE,
    description: CASE_STUDIES_DESCRIPTION,
    url: `${siteUrl}/case-studies`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: CASE_STUDIES_TITLE,
    description: CASE_STUDIES_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

function caseStudiesItemListJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Raven Tech Group case studies',
    itemListElement: caseStudiesOrdered.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/case-studies/${study.slug}`,
      name: study.client,
    })),
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#0A0A0A] pt-28 pb-20 text-white md:pt-32">
      {caseStudiesItemListJsonLd()}
      <section className="border-b border-white/[0.06] pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-[#FFA91F]" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">Case Studies</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl lg:text-7xl lg:leading-[1.05]">
              Work that actually runs in production.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              HR platforms, M-Pesa portals, and production websites for Nairobi teams — including BP Creatives and Brown
              Paper. Outcomes you can open in a browser. Filter by sector.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16 lg:px-12">
        <CaseStudiesIndexClient studies={caseStudiesOrdered} />
      </div>
    </main>
  )
}
