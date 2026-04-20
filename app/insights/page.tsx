import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { InsightsIndexClient } from '@/components/insights/InsightsIndexClient'
import { insightsOrderedFeaturedFirst } from '@/lib/data/insights'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

export const metadata: Metadata = {
  title: 'Insights & Field Notes | Raven Tech Group',
  description:
    'Engineering notes, market context, and delivery write-ups from Raven Tech Group — M-Pesa integration, SACCO digitisation, and software pricing in Kenya.',
  alternates: {
    canonical: `${siteUrl}/insights`,
  },
  openGraph: {
    title: 'Insights & Field Notes | Raven Tech Group',
    description: 'What we are reading, building, and shipping — from Westlands, Nairobi.',
    url: `${siteUrl}/insights`,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights | Raven Tech Group',
    description: 'Field notes on software delivery in Kenya and East Africa.',
  },
  robots: { index: true, follow: true },
}

function insightsItemListJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Raven Tech Group insights',
    itemListElement: insightsOrderedFeaturedFirst.map((insight, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/insights/${insight.slug}`,
      name: insight.title,
    })),
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default function InsightsPage() {
  return (
    <main className="bg-[#0A0A0A] pb-20 pt-28 text-white md:pt-32">
      {insightsItemListJsonLd()}
      <section className="border-b border-white/[0.06] pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-[#FFA91F]" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">Field Notes</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl lg:leading-[1.05]">
              What we&apos;re reading, building, and shipping.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Honest write-ups from live projects — integration patterns, regulatory context, and what pricing looks like
              on the ground in Kenya.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16 lg:px-12">
        <InsightsIndexClient insights={insightsOrderedFeaturedFirst} />
      </div>
    </main>
  )
}
