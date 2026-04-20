import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { CaseStudiesIndexClient } from '@/components/case-studies/CaseStudiesIndexClient'
import { caseStudiesOrdered } from '@/lib/data/caseStudies'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

export const metadata: Metadata = {
  title: 'Case Studies | Raven Tech Group — Real Work, Real Outcomes',
  description:
    'Case studies from Raven Tech Group — SACCO platforms, M-Pesa integrations, HR systems, and e-commerce stores built for Kenyan businesses. Real outcomes, real metrics.',
  keywords: [
    'raven tech group case studies',
    'kenyan software case studies',
    'sacco platform case study',
    'm-pesa integration case study',
    'eagle hr case study',
  ],
  alternates: {
    canonical: `${siteUrl}/case-studies`,
  },
  openGraph: {
    title: 'Case Studies | Raven Tech Group — Real Work, Real Outcomes',
    description:
      'Case studies from Raven Tech Group — SACCO platforms, M-Pesa integrations, HR systems, and e-commerce stores built for Kenyan businesses.',
    url: `${siteUrl}/case-studies`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Raven Tech Group',
    description: 'Real engagements with measurable outcomes — Nairobi and Kenya.',
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
              Real engagements for Kenyan teams — with outcomes you can trace to systems, not slide decks. Filters help
              you find work close to your sector.
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
