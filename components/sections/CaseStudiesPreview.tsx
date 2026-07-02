'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { caseStudiesOrdered, getCaseStudyImageSrc } from '@/lib/data/caseStudies'
import { CaseStudyClientLogoBadge } from '@/components/case-studies/CaseStudyClientLogoBadge'
import { CTAButton } from '@/components/ui/CTAButton'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

function CaseStudyMedia({
  study,
  imgSrc,
  unoptimized,
  priority,
  isFeatured,
  isSupport,
  applyMonochromeOverlay,
}: {
  study: (typeof caseStudiesOrdered)[number]
  imgSrc: string
  unoptimized: boolean
  priority?: boolean
  isFeatured: boolean
  isSupport: boolean
  applyMonochromeOverlay: boolean
}) {
  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden ${
        isFeatured
          ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px] lg:w-[52%]'
          : isSupport
            ? 'aspect-[16/9]'
            : 'aspect-[16/10]'
      }`}
    >
      <Image
        src={imgSrc}
        alt={`${study.client}: ${study.tagline}`}
        fill
        className={`object-cover scale-[1.02] ${isFeatured ? 'object-center' : 'object-top origin-top'} ${
          applyMonochromeOverlay ? 'saturate-[0.3] contrast-[1.05] brightness-[0.95]' : ''
        } ${isSupport ? 'brightness-[0.82] saturate-[0.85]' : ''}`}
        sizes={
          isFeatured
            ? '(min-width: 1024px) 52vw, 100vw'
            : '(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw'
        }
        priority={priority}
        unoptimized={unoptimized}
        onError={(e) => {
          ;(e.target as HTMLImageElement).src = study.heroImage
        }}
      />
      <div
        className={`absolute inset-0 z-[1] ${
          isFeatured
            ? 'bg-gradient-to-t from-black/76 via-black/32 to-transparent lg:bg-gradient-to-r lg:from-black/55 lg:via-black/20 lg:to-transparent'
            : 'bg-gradient-to-t from-black/82 via-black/45 to-transparent'
        }`}
      />
      {study.clientLogo ? (
        <CaseStudyClientLogoBadge
          clientLogo={study.clientLogo}
          clientName={study.client}
          placement="card"
        />
      ) : null}
      {isFeatured ? (
        <>
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#0E0E0E] lg:hidden" aria-hidden />
          <div className="absolute inset-y-0 right-0 hidden w-px bg-[#0E0E0E] lg:block" aria-hidden />
        </>
      ) : (
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#0E0E0E]" aria-hidden />
      )}
    </div>
  )
}

function CaseStudyBody({
  study,
  variant,
  isEagle,
  eagleParts,
}: {
  study: (typeof caseStudiesOrdered)[number]
  variant: 'default' | 'featured' | 'support'
  isEagle: boolean
  eagleParts: string[]
}) {
  const isFeatured = variant === 'featured'
  const isInDelivery = study.status === 'in-delivery'
  const primaryMetric = study.metrics[0]

  return (
    <div className={`flex min-w-0 flex-1 flex-col p-6 lg:p-8 ${isFeatured ? 'lg:py-7' : ''}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
          {study.location}
        </span>
        <span className="select-none text-white/30" aria-hidden>
          ·
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          {study.industry}
        </span>
      </div>

      <h3
        className={`mb-3 font-bold leading-snug tracking-tight text-white ${
          isFeatured ? 'text-2xl lg:text-[1.75rem] lg:leading-snug' : 'text-xl'
        }`}
      >
        {isEagle ? (
          <>
            <span className="text-white">{eagleParts[0]}</span>
            <span className="text-white/40"> — </span>
            <span className="text-[#FFA91F]">{eagleParts[1]}</span>
          </>
        ) : (
          study.tagline
        )}
      </h3>

      {primaryMetric && (
        <div
          className={`mt-2 inline-flex w-fit self-start items-center gap-2 rounded-card border px-3.5 py-1.5 text-xs font-semibold ${
            isInDelivery
              ? 'border-white/20 bg-white/[0.05] text-white/60'
              : 'border-[#FFA91F]/30 bg-[#FFA91F]/10 text-[#FFA91F]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden />
          {isInDelivery
            ? `In delivery · ${primaryMetric.value} ${primaryMetric.label}`
            : `${primaryMetric.value} ${primaryMetric.label}`}
        </div>
      )}

      {isFeatured && study.platformModules?.length ? (
        <div className="relative -mx-1 mt-4">
          <div className="flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {study.platformModules.map((module) => (
              <span
                key={module}
                className="shrink-0 whitespace-nowrap rounded-card border border-[#FFA91F]/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#FFA91F]/80"
              >
                {module}
              </span>
            ))}
          </div>
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#111111] to-transparent"
            aria-hidden
          />
        </div>
      ) : null}

      <p className={`mt-4 leading-relaxed text-white/62 ${isFeatured ? 'text-base lg:text-[0.9375rem] lg:leading-relaxed' : 'text-sm'}`}>
        {study.outcomeSummary}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/case-studies/${study.slug}`} className="group/card inline-flex min-w-0">
          <ArrowSwapRow
            groupName="card"
            iconSize={14}
            strokeWidth={2}
            className="text-sm font-semibold text-white/72 transition-colors duration-200 group-hover/card:text-white"
          >
            {study.cta}
          </ArrowSwapRow>
        </Link>

        {study.siteUrl ? (
          <a
            href={study.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/46 transition-colors duration-200 hover:text-white/76"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFA91F]" aria-hidden />
            Live site
          </a>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/[0.04] pt-4">
        {study.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/35">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function CaseStudyCard({
  study,
  priority,
  reduced,
  variant = 'default',
}: {
  study: (typeof caseStudiesOrdered)[number]
  priority?: boolean
  reduced: boolean | null
  variant?: 'default' | 'featured' | 'support'
}) {
  const { src: imgSrc, unoptimized } = getCaseStudyImageSrc(study)
  const isFeatured = variant === 'featured'
  const isSupport = variant === 'support'
  const hasClientSite = study.siteUrl !== null && study.siteUrl !== undefined
  const isEagle = isFeatured && study.slug === 'eagle-hr-consultants'
  const isR4 = study.slug === 'r4-automotive'
  const applyMonochromeOverlay = hasClientSite || isEagle || isR4
  const eagleParts = isEagle ? study.tagline.split(' — ') : []

  if (isFeatured) {
    return (
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={reduced ? { duration: 0 } : { duration: 0.55 }}
        className="relative flex flex-col overflow-hidden rounded-card border border-white/[0.08] bg-gradient-to-br from-[#141414] via-[#111111] to-[#0E0E0E] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] lg:min-h-0 lg:flex-row lg:items-stretch"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFA91F]/40 to-transparent"
          aria-hidden
        />
        <div className="absolute top-6 right-6 z-10 hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-card border border-[#FFA91F]/30 bg-[#0A0A0A]/80 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFA91F]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
              Featured project
            </span>
          </div>
        </div>
        <CaseStudyMedia
          study={study}
          imgSrc={imgSrc}
          unoptimized={unoptimized}
          priority={priority}
          isFeatured
          isSupport={false}
          applyMonochromeOverlay={applyMonochromeOverlay}
        />
        <CaseStudyBody study={study} variant={variant} isEagle={isEagle} eagleParts={eagleParts} />
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.55 }}
      className="flex h-full flex-col overflow-hidden rounded-card border border-white/[0.06] bg-[#111111] shadow-[0_18px_36px_-24px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-[#FFA91F]/25 hover:bg-[#141414]"
    >
      <CaseStudyMedia
        study={study}
        imgSrc={imgSrc}
        unoptimized={unoptimized}
        priority={priority}
        isFeatured={false}
        isSupport={isSupport}
        applyMonochromeOverlay={applyMonochromeOverlay}
      />
      <CaseStudyBody study={study} variant={variant} isEagle={false} eagleParts={[]} />
    </motion.article>
  )
}

/* ─── Section ────────────────────────────────────────────── */

/** Wider than Services (`max-w-7xl` / 1280px) so proof grid breathes on large desktops; padding matches Services. */
const CASE_STUDIES_SHELL =
  'mx-auto w-full max-w-[88rem] px-5 md:px-8 lg:px-12'

export function CaseStudiesPreview() {
  const reduced = useReducedMotion()
  const [featured, firstSupport, secondSupport] = caseStudiesOrdered
  const liveCount = caseStudiesOrdered.filter((study) => study.status === 'live').length

  return (
    <section
      id="client-results"
      aria-labelledby="case-results-heading"
      className="bg-[#0A0A0A]"
    >
      {/* ── Header — constrained ──────────────────────── */}
      <ScrollReveal>
        <div className={`${CASE_STUDIES_SHELL} pb-8 pt-20 lg:pt-28`}>
          <div>
            <SectionEyebrow>Proof, not pitch decks</SectionEyebrow>
            <h2
              id="case-results-heading"
              className="text-4xl font-bold tracking-tight text-white lg:text-5xl"
            >
              Real projects. Delivered.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
              Projects shipped for teams in Nairobi and across Kenya, with measurable outcomes
              and delivery discipline you can verify.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-card border border-white/[0.06] bg-[#111111] px-3 py-1.5 text-xs font-semibold text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFA91F]" aria-hidden />
              {`${liveCount} live · ${caseStudiesOrdered.length - liveCount} in active delivery`}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className={`${CASE_STUDIES_SHELL} pb-16 lg:pb-20`}>
        <div className="flex flex-col gap-5 lg:gap-6">
          <CaseStudyCard study={featured} priority reduced={reduced} variant="featured" />
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            <CaseStudyCard study={firstSupport} reduced={reduced} variant="support" />
            <CaseStudyCard study={secondSupport} reduced={reduced} variant="support" />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/[0.04] pt-8">
          <CTAButton href="/book" variant="primary">
            Book a discovery call
          </CTAButton>
          <CTAButton href="/case-studies" variant="light-outline">
            Browse all work
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
