import type { Metadata } from 'next'
import { CTAButton } from '@/components/ui/CTAButton'
import { MobileSwipeCard, MobileSwipeRail } from '@/components/ui/MobileSwipeRail'
import { howWeWorkSteps } from '@/lib/data/howWeWork'

const canonical = 'https://www.raventechgroup.com/process'

export const metadata: Metadata = {
  title: 'How we engage | Raven Tech Group',
  description:
    'Four delivery phases from discovery through operations — one accountable team for ambitious African enterprises. Based in Westlands, Nairobi.',
  keywords: [
    'technology consultancy Kenya',
    'IT delivery Nairobi',
    'software engagement Africa',
    'digital transformation delivery',
  ],
  openGraph: {
    title: 'How we engage | Raven Tech Group',
    description:
      'Four delivery phases from discovery through operations — one accountable team end to end.',
    url: canonical,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How we engage | Raven Tech Group',
    description:
      'Four delivery phases from discovery through operations — one accountable team end to end.',
  },
  alternates: { canonical },
  robots: { index: true, follow: true },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.raventechgroup.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'How we engage',
      item: canonical,
    },
  ],
}

export default function ProcessPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="border-b border-white/[0.06] py-24 lg:py-32 xl:py-40">
        <div className="site-shell">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-px w-6 bg-[#FFA91F]" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">How we engage</p>
          </div>
          <h1 className="max-w-4xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            From discovery to systems you can run with confidence
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 lg:text-lg">
            Four phases — same team end to end. No hand-offs to anonymous builders.
          </p>

          <MobileSwipeRail hint="Swipe steps" className="mt-16 md:hidden" aria-label="Engagement steps">
            {howWeWorkSteps.map(({ title, description }, index) => {
              const stepNo = String(index + 1).padStart(2, '0')
              return (
                <MobileSwipeCard key={title} widthClassName="w-[min(82vw,320px)]">
                  <div className="relative min-h-[220px] border-t border-white/[0.06] px-0 pb-14 pt-10">
                    <span
                      className="absolute right-0 top-6 z-0 select-none text-[180px] font-bold leading-none tracking-[-0.04em] text-white/[0.06]"
                      aria-hidden
                    >
                      {stepNo}
                    </span>
                    <div className="relative z-10">
                      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFA91F]/80">{stepNo}</p>
                      <h2 className="text-xl font-bold leading-tight tracking-tight text-white">{title}</h2>
                      <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/55">{description}</p>
                    </div>
                  </div>
                </MobileSwipeCard>
              )
            })}
          </MobileSwipeRail>

          <ol className="mt-16 hidden list-none grid-cols-1 gap-8 border-t border-white/[0.06] pt-12 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-12 xl:gap-16">
            {howWeWorkSteps.map(({ title, description }, index) => {
              const stepNo = String(index + 1).padStart(2, '0')
              return (
                <li
                  key={title}
                  className="relative min-h-0 border-t border-white/[0.06] px-0 pb-14 pt-10 lg:min-h-[240px]"
                >
                  <span
                    className="absolute right-0 top-6 z-0 select-none text-[180px] font-bold leading-none tracking-[-0.04em] text-white/[0.06] lg:text-[220px]"
                    aria-hidden
                  >
                    {stepNo}
                  </span>
                  <div className="relative z-10">
                    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFA91F]/80">{stepNo}</p>
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-white lg:text-2xl">{title}</h2>
                    <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/55 lg:text-[15px]">{description}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mt-20 border-t border-white/[0.06] pt-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFA91F]/80">What you get</p>
                <h2 className="max-w-xl text-2xl font-bold tracking-tight text-white lg:text-3xl">
                  One team. One accountable delivery lead. Zero black-box work.
                </h2>
              </div>
              <CTAButton href="/contact" variant="primary" className="shrink-0">
                Start your project
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
