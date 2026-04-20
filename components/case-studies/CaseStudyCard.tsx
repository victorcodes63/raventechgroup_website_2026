'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { CaseStudy } from '@/lib/data/caseStudies'
import { getCaseStudyImageSrc } from '@/lib/data/caseStudies'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { SafeRasterImage } from '@/components/shared/SafeRasterImage'

type CaseStudyCardProps = {
  study: CaseStudy
  variant: 'featured' | 'grid'
  priority?: boolean
}

export function CaseStudyCard({ study, variant, priority }: CaseStudyCardProps) {
  const reduced = useReducedMotion()
  const { src, unoptimized } = getCaseStudyImageSrc(study)

  if (variant === 'featured') {
    return (
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
        className="overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] lg:flex lg:min-h-[380px]"
      >
        <Link
          href={`/case-studies/${study.slug}`}
          className="group/card flex min-h-0 w-full flex-col lg:min-h-[380px] lg:flex-row"
        >
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden lg:w-[52%] lg:aspect-auto lg:min-h-[380px]">
            <SafeRasterImage
              src={src}
              alt={study.heroImageAlt}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover saturate-0 transition duration-500 group-hover/card:saturate-100 group-hover/card:[filter:brightness(1.05)]"
              priority={priority}
              unoptimized={unoptimized}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent lg:bg-gradient-to-r"
              aria-hidden
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {study.metrics.slice(0, 3).map((m) => (
                <span
                  key={`${m.label}-${m.value}`}
                  className="rounded-full border border-[#FFA91F]/25 bg-[#FFA91F]/10 px-3 py-1 text-[11px] font-semibold text-[#FFA91F]"
                >
                  {m.value} {m.label}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">{study.client}</h2>
            <p className="mt-3 text-lg font-medium leading-snug text-white/85">{study.outcomeHeadline}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/55">{study.outcomeSummary}</p>
            <span className="mt-8 inline-flex w-fit items-center text-sm font-semibold text-[#FFA91F]">
              <ArrowSwapRow groupName="card" iconSize={14} strokeWidth={2}>
                Read case study
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
      className="group/card flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA91F]/30"
    >
      <Link href={`/case-studies/${study.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden">
        <SafeRasterImage
          src={src}
          alt={study.heroImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover saturate-0 transition duration-500 group-hover/card:saturate-100 group-hover/card:[box-shadow:inset_0_0_0_120px_rgba(255,169,31,0.06)]"
          priority={priority}
          unoptimized={unoptimized}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" aria-hidden />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
            {study.industry}
          </span>
          <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
            {study.year}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-white">{study.client}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-white/60">{study.outcomeSummary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.metrics.slice(0, 3).map((m) => (
            <span
              key={`${study.slug}-${m.label}`}
              className="rounded-full border border-white/[0.1] bg-[#0A0A0A] px-2.5 py-1 text-[11px] font-medium text-white/70"
            >
              {m.value} {m.label}
            </span>
          ))}
        </div>
        <Link
          href={`/case-studies/${study.slug}`}
          className="group/card mt-5 inline-flex items-center text-sm font-semibold text-[#FFA91F]"
        >
          <ArrowSwapRow groupName="card" iconSize={14} strokeWidth={2}>
            Read case study
          </ArrowSwapRow>
        </Link>
      </div>
    </motion.article>
  )
}
