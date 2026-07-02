'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { CTAButton } from '@/components/ui/CTAButton'
import { SafeRasterImage } from '@/components/shared/SafeRasterImage'
import type { Insight } from '@/lib/data/insights'

type InsightFilter = Insight['category'] | 'all'

const FILTERS: { key: InsightFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'fintech-mpesa', label: 'M-Pesa & Fintech' },
  { key: 'sacco-cooperative', label: 'SACCO & Cooperatives' },
  { key: 'kenya-market', label: 'Kenya Tech Market' },
]

const CARD_SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-6', 'lg:col-span-6']

type InsightsEditorialPageProps = {
  insights: Insight[]
}

function cardSpanClass(index: number): string {
  return CARD_SPANS[index % CARD_SPANS.length] ?? 'lg:col-span-6'
}

export function InsightsEditorialPage({ insights }: InsightsEditorialPageProps) {
  const reducedMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState<InsightFilter>('all')

  const featured = useMemo(
    () => insights.find((article) => article.featured) ?? insights[0],
    [insights],
  )

  const filteredInsights = useMemo(() => {
    return insights.filter((article) => (activeFilter === 'all' ? true : article.category === activeFilter))
  }, [insights, activeFilter])

  const gridInsights = useMemo(() => {
    if (activeFilter === 'all' && featured) return filteredInsights.filter((article) => article.slug !== featured.slug)
    return filteredInsights
  }, [activeFilter, featured, filteredInsights])

  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="bg-[#0A0A0A] py-24 lg:py-32">
        <div className="site-shell">
          <div className="content-wrap">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FFA91F]">{'// FIELD NOTES'}</p>
              <h1 className="mt-7 text-5xl font-bold tracking-[-0.03em] text-white lg:text-7xl lg:leading-[1.03]">
                <span className="text-white">Field notes from the</span>
                <br />
                <span className="text-white/40">/ Raven team.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
                Practical writing for Kenyan operators, founders, and technical leaders — on fintech engineering, SACCO
                technology, and how work actually gets done in the region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pb-20 lg:pb-24">
        <div className="site-shell">
          <div className="content-wrap">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#FFA91F]">FEATURED</p>
            <Link
              href={`/insights/${featured.slug}`}
              className="group/feat mt-5 grid items-center gap-12 rounded-card border border-white/[0.08] bg-[#111111] p-6 transition-all duration-300 hover:border-[#FFA91F]/35 lg:grid-cols-[1.3fr_1fr] lg:p-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-white/[0.08] bg-[#0A0A0A]">
                <SafeRasterImage
                  src={featured.heroImage}
                  alt={featured.heroImageAlt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover grayscale transition-all duration-700 group-hover/feat:grayscale-0 group-hover/feat:saturate-100"
                />
              </div>
              <div>
                <p className="inline-flex rounded-full border border-white/[0.14] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  {featured.categoryLabel}
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.02em] text-white lg:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">{featured.excerpt}</p>
                <div className="mt-7 flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/[0.12]">
                    <SafeRasterImage
                      src={featured.author.avatar ?? '/images/team/victor-chumo.jpg'}
                      alt={`${featured.author.name} avatar`}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{featured.author.name}</p>
                    <p className="text-xs text-white/55">{featured.readingTime}</p>
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center text-sm font-semibold text-[#FFA91F]">
                  <ArrowSwapRow groupName="feat" iconSize={14} strokeWidth={2.2}>
                    Read article
                  </ArrowSwapRow>
                </div>
              </div>
            </Link>

            <div className="mt-12 flex flex-wrap items-center gap-2.5">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.key
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    className={
                      isActive
                        ? 'rounded-card bg-[#FFA91F] px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition-colors'
                        : 'rounded-card border border-white/[0.15] bg-transparent px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:text-white'
                    }
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pb-24 lg:pb-28">
        <div className="site-shell">
          <div className="content-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                layout
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12"
              >
                {gridInsights.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/insights/${article.slug}`}
                    className={`group/card overflow-hidden rounded-card border border-white/[0.06] bg-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA91F]/30 ${cardSpanClass(index)}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
                      <SafeRasterImage
                        src={article.heroImage}
                        alt={article.heroImageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:saturate-110"
                      />
                    </div>
                    <div className="p-6">
                      <p className="inline-flex rounded-full border border-white/[0.14] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65">
                        {article.categoryLabel}
                      </p>
                      <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-white">{article.title}</h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{article.excerpt}</p>
                      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-white/45">{article.readingTime}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 lg:py-24">
        <div className="site-shell">
          <div className="relative overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] px-6 py-12 lg:px-10 lg:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-white/[0.03]"
            >
              RAVEN
            </div>
            <div className="relative">
              <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-white lg:text-4xl">
                Want to talk about what we&apos;ve shipped?
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/book" variant="primary" className="px-7 py-3.5 text-sm">
                  Book a discovery call
                </CTAButton>
                <CTAButton href="/case-studies" variant="outline-dark" className="px-7 py-3.5 text-sm">
                  See case studies
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
