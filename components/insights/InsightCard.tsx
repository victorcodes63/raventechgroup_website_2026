'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Insight } from '@/lib/data/insights'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { SafeRasterImage } from '@/components/shared/SafeRasterImage'

type InsightCardProps = {
  insight: Insight
  variant: 'featured' | 'grid'
  priority?: boolean
}

export function InsightCard({ insight, variant, priority }: InsightCardProps) {
  const reduced = useReducedMotion()

  if (variant === 'featured') {
    return (
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
        className="overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] lg:flex lg:min-h-[360px]"
      >
        <Link
          href={`/insights/${insight.slug}`}
          className="group/card flex w-full flex-col lg:flex-row"
        >
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[54%] lg:min-h-[360px]">
            <SafeRasterImage
              src={insight.heroImage}
              alt={insight.heroImageAlt}
              fill
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover transition duration-500 group-hover/card:scale-[1.02]"
              priority={priority}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent lg:bg-gradient-to-r" aria-hidden />
          </div>
          <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
            <span className="w-fit rounded-full border border-[#FFA91F]/30 bg-[#FFA91F]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
              {insight.categoryLabel}
            </span>
            <h2 className="mt-5 text-2xl font-bold leading-snug tracking-[-0.02em] text-white md:text-3xl lg:text-[1.75rem]">
              {insight.title}
            </h2>
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/60 md:text-base">{insight.excerpt}</p>
            <p className="mt-4 text-xs font-medium text-white/45">{insight.readingTime}</p>
            <span className="mt-8 inline-flex items-center text-sm font-semibold text-[#FFA91F]">
              <ArrowSwapRow groupName="card" iconSize={14} strokeWidth={2}>
                Read article
              </ArrowSwapRow>
            </span>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="group/card flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA91F]/25"
    >
      <Link href={`/insights/${insight.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden">
        <SafeRasterImage
          src={insight.heroImage}
          alt={insight.heroImageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover/card:scale-[1.02]"
          priority={priority}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full border border-white/[0.12] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FFA91F]/90">
          {insight.categoryLabel}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-snug text-white">{insight.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-white/60">{insight.excerpt}</p>
        <p className="mt-4 text-xs text-white/45">{insight.readingTime}</p>
        <Link
          href={`/insights/${insight.slug}`}
          className="group/card mt-4 inline-flex items-center text-sm font-semibold text-[#FFA91F]"
        >
          <ArrowSwapRow groupName="card" iconSize={14} strokeWidth={2}>
            Read article
          </ArrowSwapRow>
        </Link>
      </div>
    </motion.article>
  )
}
