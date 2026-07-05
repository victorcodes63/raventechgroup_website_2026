'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import {
  ArrowRight,
  Minus,
  Plus,
} from 'lucide-react'
import { MetricsBand } from '@/components/services/MetricsBand'
import { ServiceIndustriesList } from '@/components/services/ServiceIndustriesList'
import { ClientTestimonialsSection } from '@/components/sections/ClientTestimonialsSection'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { CTAButton } from '@/components/ui/CTAButton'
import { MobileSwipeCard, MobileSwipeRail } from '@/components/ui/MobileSwipeRail'
import {
  serviceBenefitWatermarkVariants,
  serviceCapabilityStaggerChildVariants,
  serviceCapabilityStaggerParentVariants,
  serviceInsightCardVariants,
  serviceSectionHeaderChildVariants,
  serviceSectionHeaderGroupVariants,
  serviceTimelineDotVariants,
  serviceTimelineLineVariants,
  serviceWhatYouGetBlockVariants,
} from '@/lib/animations'
import { CaseStudyClientLogoBadge } from '@/components/case-studies/CaseStudyClientLogoBadge'
import { caseStudies, getCaseStudyImageSrc } from '@/lib/data/caseStudies'
import { getServiceMetricsBand } from '@/lib/data/serviceMetricsBand'
import type { Capability, ServiceDetail } from './service-page-types'

const SECTION_VIEWPORT = { once: true, margin: '-80px' as const }

const SERVICE_SECTION_PY = 'py-16 sm:py-20 lg:py-32'
const SERVICE_SECTION_PY_LOOSE = 'py-16 sm:py-24 lg:py-36'
const SERVICE_H2 =
  'text-[1.75rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-3xl md:text-4xl lg:text-5xl'
const SERVICE_SECTION_INNER = 'w-full min-w-0'

function caseStudyMetrics(slug: string): string[] {
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) return []
  return study.metrics.map((m) => `${m.value} ${m.label}`)
}

/** Mirrors homepage case-study media: screenshot when `siteUrl` exists, else static art. */
function RealProjectsCaseStudyImage({
  study,
  alt,
  className,
  sizes,
  priority,
  objectPosition,
}: {
  study: (typeof caseStudies)[number]
  alt: string
  className: string
  sizes: string
  priority?: boolean
  objectPosition: 'center' | 'top'
}) {
  const { src, unoptimized } = getCaseStudyImageSrc(study)
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={unoptimized}
        className={`${objectPosition === 'center' ? 'object-center' : 'object-top origin-top'} ${className}`}
        onError={(e) => {
          const el = e.target as HTMLImageElement
          el.src = study.heroImage
        }}
      />
      {study.clientLogo ? (
        <CaseStudyClientLogoBadge clientLogo={study.clientLogo} clientName={study.client} placement="card" />
      ) : null}
    </>
  )
}

/** Equal-weight row — flex for 2–3 cols (reliable equal heights); grid for 4+ */
function capabilityRowClass(count: number): string {
  if (count <= 1) return 'md:flex md:flex-col md:max-w-2xl md:mx-auto'
  if (count <= 3) return 'md:flex md:flex-row'
  if (count === 4) return 'md:grid sm:grid-cols-2'
  return 'md:grid md:grid-cols-2 lg:grid-cols-3'
}

function capabilityItemClass(count: number): string {
  if (count <= 3) return 'flex min-w-0 flex-1 flex-col'
  return 'h-full min-h-0 self-stretch'
}

function CapabilityCard({ cap }: { cap: Capability }) {
  return (
    <article className="group/cap grid h-full min-h-0 flex-1 grid-rows-[11rem_1fr] rounded-card border border-white/[0.08] bg-[#111111] p-6 transition-all duration-300 hover:scale-[1.01] hover:border-brand-500/40 hover:bg-[#161616] sm:grid-rows-[11.5rem_1fr] sm:p-8 lg:grid-rows-[12rem_1fr] lg:p-9">
      <div className="flex min-h-0 flex-col overflow-hidden">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-white">{cap.title}</h3>
        <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-white/60">{cap.description}</p>
      </div>
      {cap.points && cap.points.length > 0 ? (
        <ul className="flex min-h-0 flex-col space-y-2.5 self-stretch border-t border-white/[0.06] pt-6">
          {cap.points.map((pt) => (
            <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-white/65">
              <span className="shrink-0 text-brand-500/50" aria-hidden>
                +
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

function stepSubtitle(description: string): string {
  const t = description.trim()
  const cut = t.indexOf('.')
  if (cut === -1) return t.length > 96 ? `${t.slice(0, 93)}…` : t
  return t.slice(0, cut + 1)
}

function ServiceSectionHeader({
  eyebrow,
  title,
  description,
  reducedMotion,
}: {
  eyebrow: string
  title: string
  description?: string
  reducedMotion: boolean | null
}) {
  return (
    <motion.div
      className="mb-12 max-w-3xl space-y-4"
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={SECTION_VIEWPORT}
      variants={serviceSectionHeaderGroupVariants}
    >
      <motion.div className="flex items-center gap-3" variants={serviceSectionHeaderChildVariants}>
        <div className="h-px w-8 bg-brand-500" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">{eyebrow}</span>
      </motion.div>
      <motion.h2
        variants={serviceSectionHeaderChildVariants}
        className={`text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.1]`}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={serviceSectionHeaderChildVariants} className="text-lg leading-relaxed text-white/60">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}

function ServiceFaqRow({
  faq,
  reducedMotion,
  isLast,
}: {
  faq: { question: string; answer: string }
  reducedMotion: boolean | null
  isLast: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-t border-white/[0.08] ${isLast ? 'border-b border-white/[0.08]' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-semibold text-white">{faq.question}</span>
        <span
          aria-hidden
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-card border border-white/[0.12] text-white/70"
        >
          {open ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-4 leading-relaxed text-white/65">{faq.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function DeliveryTimelinePhases({
  steps,
  reducedMotion,
}: {
  steps: NonNullable<ServiceDetail['deliveryApproach']>
  reducedMotion: boolean | null
}) {
  const n = steps.length
  const gridClass = n >= 4 ? 'md:grid-cols-4' : n === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  const renderStep = (step: (typeof steps)[number], i: number, centered: boolean) => (
    <div className={centered ? 'flex flex-col items-center text-center' : 'flex flex-col items-center md:items-start'}>
      <motion.div
        className="relative z-10 h-3 w-3 rounded-full bg-brand-500"
        initial={reducedMotion ? false : 'hidden'}
        whileInView={reducedMotion ? undefined : 'visible'}
        viewport={SECTION_VIEWPORT}
        variants={serviceTimelineDotVariants}
        transition={{ delay: reducedMotion ? 0 : 0.08 + i * 0.1 }}
      />
      <div className="hidden h-8 w-px bg-white/[0.15] md:block" aria-hidden />
      <div className={`mt-6 w-full ${centered ? 'text-center' : 'text-center md:mt-0 md:text-left'}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-500">{step.title}</p>
        <p className="mt-1 text-xs text-white/40">{stepSubtitle(step.description)}</p>
        <p className={`mt-4 text-sm leading-relaxed text-white/70 ${centered ? 'mx-auto max-w-[260px]' : 'max-w-[240px] md:max-w-none'}`}>
          {step.description}
        </p>
      </div>
    </div>
  )

  return (
    <div className="relative mt-16">
      <div
        className="pointer-events-none absolute left-[5%] right-[5%] top-[6px] z-0 hidden h-[3px] overflow-hidden md:block"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/12" />
        <div
          className={twMerge(
            'absolute inset-0 bg-no-repeat',
            !reducedMotion && 'service-delivery-timeline-pulse',
          )}
        />
      </div>

      <MobileSwipeRail hint="Swipe phases" className="min-w-0 md:hidden" aria-label="Delivery phases">
        {steps.map((step, i) => (
          <MobileSwipeCard key={step.title} widthClassName="w-[min(82vw,300px)]">
            <div className="h-full rounded-card border border-white/[0.08] bg-[#111111] p-6">
              {renderStep(step, i, true)}
            </div>
          </MobileSwipeCard>
        ))}
      </MobileSwipeRail>

      <div className={`hidden gap-8 md:grid md:gap-8 ${gridClass}`}>
        {steps.map((step, i) => (
          <div key={step.title} className="min-w-0">
            {renderStep(step, i, false)}
          </div>
        ))}
      </div>
    </div>
  )
}

function SampleTimelineVisual({
  phases,
  reducedMotion,
}: {
  phases: NonNullable<ServiceDetail['sampleTimeline']>
  reducedMotion: boolean | null
}) {
  const uid = useId()
  const lineId = `${uid}-timeline-line`
  const w = Math.max(320, (phases.length - 1) * 140 + 40)
  const h = 56
  const d = `M 20 ${h / 2} L ${w - 20} ${h / 2}`
  const gridCols =
    phases.length >= 4
      ? 'md:grid-cols-2 lg:grid-cols-4'
      : phases.length === 3
        ? 'md:grid-cols-3'
        : 'md:grid-cols-2'

  return (
    <div className="mt-12 max-w-full md:overflow-x-auto md:overscroll-x-contain">
      <motion.svg
        width={w}
        height={h}
        className="mx-auto hidden text-brand-500 md:block"
        initial={reducedMotion ? false : 'hidden'}
        whileInView={reducedMotion ? undefined : 'visible'}
        viewport={SECTION_VIEWPORT}
      >
        <motion.path
          id={lineId}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          variants={serviceTimelineLineVariants}
        />
      </motion.svg>
      <MobileSwipeRail hint="Swipe timeline" className="mt-6 min-w-0 md:hidden" aria-label="Sample timeline">
        {phases.map((p) => (
          <MobileSwipeCard key={p.phase} widthClassName="w-[min(72vw,240px)]">
            <div className="h-full rounded-card border border-white/[0.08] bg-[#111111] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500/85">{p.phase}</p>
              <h4 className="mt-2 text-sm font-bold text-white">{p.duration}</h4>
              <p className="mt-1 text-xs leading-relaxed text-white/45">{p.focus}</p>
            </div>
          </MobileSwipeCard>
        ))}
      </MobileSwipeRail>
      <div className={`mt-6 hidden grid-cols-1 gap-4 md:grid ${gridCols}`}>
        {phases.map((p) => (
          <div key={p.phase} className="rounded-card border border-white/[0.08] bg-[#111111] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500/85">{p.phase}</p>
            <h4 className="mt-2 text-sm font-bold text-white">{p.duration}</h4>
            <p className="mt-1 text-xs leading-relaxed text-white/45">{p.focus}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

type ServiceSectionsProps = {
  detail: ServiceDetail
  service: { title: string; slug: string }
}

export function ServiceSections({ detail, service }: ServiceSectionsProps) {
  const reducedMotion = useReducedMotion()
  const sm = 'scroll-mt-24'
  const whatBlocks = (detail.capabilities ?? []).slice(0, 3)
  const metrics = getServiceMetricsBand(service.slug)
  const caps = detail.capabilities ?? []
  const caseList = detail.relatedCaseStudies ?? []
  const featuredCase = caseList[0]
  const featuredCaseStudy = featuredCase ? caseStudies.find((c) => c.slug === featuredCase.slug) : undefined
  const otherCases = caseList.slice(1)

  return (
    <div className="min-w-0 text-white">
      {/* 01 — What you get */}
      <section id="what-you-get" className={`bg-[#0A0A0A] ${SERVICE_SECTION_PY} ${sm}`}>
        <div className={SERVICE_SECTION_INNER}>
          <div className="content-wrap min-w-0">
            <div className="grid min-w-0 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24">
              <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">01 / What you get</p>
                <h2 className={`mt-5 text-white ${SERVICE_H2}`}>
                  <span className="text-white">What you get</span>{' '}
                  <span className="text-white/40">with Raven</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/60 sm:mt-6">{detail.overview}</p>
                <Link
                  href="/contact"
                  className="group/consult mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-500"
                >
                  <ArrowSwapRow groupName="consult" iconSize={14} strokeWidth={2.2}>
                    Talk to an engineer →
                  </ArrowSwapRow>
                </Link>
              </div>
              <MobileSwipeRail
                hint="Swipe highlights"
                className="min-w-0 lg:hidden"
                aria-label="What you get"
              >
                {whatBlocks.map((cap, i) => (
                  <MobileSwipeCard key={cap.title} widthClassName="w-[min(88vw,340px)]">
                    <div className="h-full rounded-card border border-white/[0.08] bg-[#111111] p-6 sm:p-8">
                      <p className="text-5xl font-bold leading-none text-white/[0.08]">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-4 text-xl font-semibold text-white">{cap.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/60">{cap.description}</p>
                      {cap.points && cap.points.length > 0 ? (
                        <ul className="mt-5 space-y-2">
                          {cap.points.map((pt) => (
                            <li key={pt} className="flex gap-2 text-[15px] leading-relaxed text-white/60">
                              <span className="text-brand-500/50" aria-hidden>
                                +
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </MobileSwipeCard>
                ))}
              </MobileSwipeRail>

              <div className="hidden divide-y divide-white/[0.06] lg:block">
                {whatBlocks.map((cap, i) => (
                  <motion.div
                    key={cap.title}
                    className="relative py-10 first:pt-0"
                    initial={reducedMotion ? false : 'hidden'}
                    whileInView={reducedMotion ? undefined : 'visible'}
                    viewport={SECTION_VIEWPORT}
                    variants={serviceWhatYouGetBlockVariants}
                    transition={{ delay: reducedMotion ? 0 : i * 0.1 }}
                  >
                    <p className="text-6xl font-bold leading-none text-white/[0.08]">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{cap.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/60">{cap.description}</p>
                    {cap.points && cap.points.length > 0 ? (
                      <ul className="mt-5 space-y-2">
                        {cap.points.map((pt) => (
                          <li key={pt} className="flex gap-2 text-[15px] leading-relaxed text-white/60">
                            <span className="text-brand-500/50" aria-hidden>
                              +
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MetricsBand metrics={metrics} />

      {/* 02 — Capabilities */}
      {caps.length > 0 ? (
        <section id="services" className={`relative overflow-hidden bg-[#0A0A0A] ${SERVICE_SECTION_PY} ${sm}`}>
          <div className={`${SERVICE_SECTION_INNER} relative z-10`}>
            <div className="content-wrap min-w-0">
              <motion.div
                className="mb-14 max-w-3xl"
                initial={reducedMotion ? false : 'hidden'}
                whileInView={reducedMotion ? undefined : 'visible'}
                viewport={SECTION_VIEWPORT}
                variants={serviceSectionHeaderGroupVariants}
              >
                <motion.div
                  variants={serviceSectionHeaderChildVariants}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                    02 / Services
                  </p>
                </motion.div>
                <motion.h2
                  variants={serviceSectionHeaderChildVariants}
                  className={`mt-5 text-white ${SERVICE_H2}`}
                >
                  <span className="text-white">Capabilities</span>{' '}
                  <span className="text-white/40">we deploy on your behalf</span>
                </motion.h2>
                <motion.p variants={serviceSectionHeaderChildVariants} className="mt-4 max-w-2xl text-white/60">
                  Scoped workstreams with clear owners, artefacts, and exit criteria — not open-ended retainers.
                </motion.p>
              </motion.div>

              <MobileSwipeRail
                hint="Swipe capabilities"
                className="min-w-0 md:hidden"
                aria-label="Service capabilities"
              >
                {caps.map((cap) => (
                  <MobileSwipeCard key={cap.title} widthClassName="w-[min(88vw,360px)]" className="h-full">
                    <CapabilityCard cap={cap} />
                  </MobileSwipeCard>
                ))}
              </MobileSwipeRail>

              <motion.div
                className={`hidden md:items-stretch md:gap-6 lg:gap-8 ${capabilityRowClass(caps.length)} ${caps.length <= 3 ? 'md:flex' : 'md:grid'}`}
                initial={reducedMotion ? false : 'hidden'}
                whileInView={reducedMotion ? undefined : 'visible'}
                viewport={SECTION_VIEWPORT}
                variants={serviceCapabilityStaggerParentVariants}
              >
                {caps.map((cap) => (
                  <motion.div
                    key={cap.title}
                    className={capabilityItemClass(caps.length)}
                    variants={serviceCapabilityStaggerChildVariants}
                  >
                    <CapabilityCard cap={cap} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 03 — Benefits */}
      {detail.numberedBenefits && detail.numberedBenefits.length > 0 ? (
        <section id="service-benefits" className={`relative bg-[#0A0A0A] ${SERVICE_SECTION_PY_LOOSE} ${sm}`}>
          <div className={SERVICE_SECTION_INNER}>
            <div className="content-wrap min-w-0">
              <div className="mb-16 grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="lg:-mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                    03 / Service benefits
                  </p>
                  <h2 className={`mt-4 text-white ${SERVICE_H2}`}>
                    <span className="text-white">Why teams choose us for</span>{' '}
                    <span className="text-white/40">{service.title.toLowerCase()}</span>
                  </h2>
                </div>
                <div>
                  <p className="leading-relaxed text-white/60">
                    We bias to evidence, documentation, and delivery rhythm — the parts that keep programmes honest after
                    the kickoff deck is forgotten.
                  </p>
                  <Link
                    href="/case-studies"
                    className="group/case mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-colors hover:text-brand-400"
                  >
                    <ArrowSwapRow groupName="case" iconSize={14} strokeWidth={2.2}>
                      See case studies →
                    </ArrowSwapRow>
                  </Link>
                </div>
              </div>

              <MobileSwipeRail
                hint="Swipe benefits"
                className="min-w-0 lg:hidden"
                aria-label="Service benefits"
              >
                {detail.numberedBenefits.map((row) => (
                  <MobileSwipeCard key={row.number} widthClassName="w-[min(84vw,340px)]">
                    <article className="relative h-full rounded-card border border-white/[0.08] bg-[#111111] p-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">Benefit</p>
                      <p className="mt-3 text-5xl font-bold leading-none text-white/[0.08]">{row.number}</p>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-white">{row.title}</h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-white/60">{row.description}</p>
                      <div className="mt-8 h-px w-12 bg-brand-500" aria-hidden />
                    </article>
                  </MobileSwipeCard>
                ))}
              </MobileSwipeRail>

              <div className="hidden grid-cols-1 gap-x-12 gap-y-16 lg:grid lg:grid-cols-2">
                {detail.numberedBenefits.map((row, i) => (
                  <motion.article
                    key={row.number}
                    className="relative border-b border-white/[0.06] pb-12"
                    initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={SECTION_VIEWPORT}
                    transition={{ duration: 0.52, delay: reducedMotion ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="pointer-events-none absolute left-0 top-0 text-[120px] font-bold leading-none text-white/[0.06]"
                      initial={reducedMotion ? false : 'hidden'}
                      whileInView={reducedMotion ? undefined : 'visible'}
                      viewport={SECTION_VIEWPORT}
                      variants={serviceBenefitWatermarkVariants}
                      transition={{ delay: reducedMotion ? 0 : i * 0.06 }}
                    >
                      {row.number}
                    </motion.div>
                    <p className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                      Benefit
                    </p>
                    <h3 className="relative z-10 mt-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                      {row.title}
                    </h3>
                    <p className="relative z-10 mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                      {row.description}
                    </p>
                    <div className="relative z-10 mt-8 h-px w-12 bg-brand-500" aria-hidden />
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 04 — How we work */}
      {detail.deliveryApproach && detail.deliveryApproach.length > 0 ? (
        <section id="how-we-work" className={`bg-[#0A0A0A] ${SERVICE_SECTION_PY} ${sm}`}>
          <div className={SERVICE_SECTION_INNER}>
            <div className="content-wrap min-w-0">
              <motion.div
                className="max-w-3xl"
                initial={reducedMotion ? false : 'hidden'}
                whileInView={reducedMotion ? undefined : 'visible'}
                viewport={SECTION_VIEWPORT}
                variants={serviceSectionHeaderGroupVariants}
              >
                <motion.p
                  variants={serviceSectionHeaderChildVariants}
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500"
                >
                  04 / How we work
                </motion.p>
                <motion.h2
                  variants={serviceSectionHeaderChildVariants}
                  className={`mt-4 text-white ${SERVICE_H2}`}
                >
                  <span className="text-white">Phased delivery,</span>{' '}
                  <span className="text-white/40">transparent checkpoints</span>
                </motion.h2>
                <motion.p variants={serviceSectionHeaderChildVariants} className="mt-4 text-white/60">
                  A steady cadence from immersion to handover — you always know what is in flight and what is next.
                </motion.p>
              </motion.div>
              <DeliveryTimelinePhases steps={detail.deliveryApproach} reducedMotion={reducedMotion} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 05 — Real projects */}
      {featuredCase ? (
        <section
          id="real-projects"
          className={`relative bg-[#0A0A0A] ${SERVICE_SECTION_PY} ${sm}`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A0A]/40 to-transparent" aria-hidden />
          <div className={`${SERVICE_SECTION_INNER} relative z-10`}>
            <div className="content-wrap min-w-0">
              <motion.div
                className="mb-14 max-w-3xl"
                initial={reducedMotion ? false : 'hidden'}
                whileInView={reducedMotion ? undefined : 'visible'}
                viewport={SECTION_VIEWPORT}
                variants={serviceSectionHeaderGroupVariants}
              >
                <motion.p
                  variants={serviceSectionHeaderChildVariants}
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500"
                >
                  05 / Real projects
                </motion.p>
                <motion.h2
                  variants={serviceSectionHeaderChildVariants}
                  className={`mt-4 text-white ${SERVICE_H2}`}
                >
                  <span className="text-white">Shipped work,</span>{' '}
                  <span className="text-white/40">documented outcomes</span>
                </motion.h2>
              </motion.div>

              <Link
                href={`/case-studies/${featuredCase.slug}`}
                className="group/case relative mb-8 block overflow-hidden rounded-card border border-white/[0.08] transition-all duration-300 hover:scale-[1.005] hover:border-white/[0.14] hover:shadow-[0_0_0_1px_theme(colors.brand.500/20),0_28px_70px_-28px_rgba(0,0,0,0.65)] lg:mb-10"
              >
                <div className="grid lg:grid-cols-[1.4fr_1fr]">
                  {featuredCaseStudy ? (
                    <div className="relative aspect-[4/3] min-h-[240px] overflow-hidden lg:min-h-[320px]">
                      <RealProjectsCaseStudyImage
                        study={featuredCaseStudy}
                        alt={`${featuredCase.client}: ${featuredCaseStudy.tagline}`}
                        objectPosition="center"
                        className="scale-[1.02] object-cover saturate-[0.35] contrast-[1.05] transition duration-700 group-hover/case:saturate-100 group-hover/case:contrast-100"
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        priority
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col justify-between bg-[#0f0f0f] p-6 sm:p-8 lg:p-14">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Case study</p>
                      <p className="mt-2 text-sm font-semibold text-brand-500">{featuredCase.client}</p>
                      <h3 className="mt-4 text-xl font-bold leading-tight text-white sm:mt-6 sm:text-2xl lg:text-3xl">
                        {featuredCase.outcome}
                      </h3>
                      <p className="mt-4 leading-relaxed text-white/60">
                        Measurable delivery drawn from our published write-up — scope, stack, and timeline on the full
                        page.
                      </p>
                      {caseStudyMetrics(featuredCase.slug).length > 0 ? (
                        <p className="mt-6 text-sm font-medium text-white/80">
                          {caseStudyMetrics(featuredCase.slug).join(' · ')}
                        </p>
                      ) : null}
                    </div>
                    <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                      Read full case study
                      <ArrowRight size={14} aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>

              {otherCases.length > 0 ? (
                <>
                  <MobileSwipeRail
                    hint="Swipe case studies"
                    className="min-w-0 lg:hidden"
                    aria-label="Related case studies"
                  >
                    {otherCases.map((cs) => {
                      const rowStudy = caseStudies.find((c) => c.slug === cs.slug)
                      return (
                        <MobileSwipeCard key={cs.slug} widthClassName="w-[min(88vw,360px)]">
                          <Link
                            href={`/case-studies/${cs.slug}`}
                            className="group/case flex h-full min-h-0 flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#111111]"
                          >
                            {rowStudy ? (
                              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                                <RealProjectsCaseStudyImage
                                  study={rowStudy}
                                  alt={`${cs.client}: ${rowStudy.tagline}`}
                                  objectPosition="top"
                                  className="object-cover brightness-[0.82] saturate-[0.85] transition duration-700 group-hover/case:saturate-100"
                                  sizes="88vw"
                                />
                              </div>
                            ) : null}
                            <div className="flex flex-1 flex-col p-6">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500/90">
                                Case study
                              </p>
                              <h3 className="mt-2 text-xl font-bold text-white">{cs.client}</h3>
                              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{cs.outcome}</p>
                              {caseStudyMetrics(cs.slug).length > 0 ? (
                                <p className="mt-4 text-xs font-medium text-white/75">
                                  {caseStudyMetrics(cs.slug).join(' · ')}
                                </p>
                              ) : null}
                              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                                Read full case study
                                <ArrowRight size={14} aria-hidden />
                              </span>
                            </div>
                          </Link>
                        </MobileSwipeCard>
                      )
                    })}
                  </MobileSwipeRail>

                  <div className="hidden gap-6 lg:grid lg:grid-cols-2">
                    {otherCases.map((cs) => {
                      const rowStudy = caseStudies.find((c) => c.slug === cs.slug)
                      return (
                    <Link
                      key={cs.slug}
                      href={`/case-studies/${cs.slug}`}
                      className="group/case flex min-h-0 flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-[0_20px_50px_-24px_theme(colors.brand.500/18)] lg:flex-row"
                    >
                      {rowStudy ? (
                        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[44%] lg:min-h-[220px]">
                          <RealProjectsCaseStudyImage
                            study={rowStudy}
                            alt={`${cs.client}: ${rowStudy.tagline}`}
                            objectPosition="top"
                            className="object-cover brightness-[0.82] saturate-[0.85] transition duration-700 group-hover/case:saturate-100"
                            sizes="(min-width: 1024px) 360px, 100vw"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-8">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500/90">
                          Case study
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-white">{cs.client}</h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{cs.outcome}</p>
                        {caseStudyMetrics(cs.slug).length > 0 ? (
                          <p className="mt-4 text-xs font-medium text-white/75">
                            {caseStudyMetrics(cs.slug).join(' · ')}
                          </p>
                        ) : null}
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                          Read full case study
                          <ArrowRight size={14} aria-hidden />
                        </span>
                      </div>
                    </Link>
                    )
                  })}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Customer feedback */}
      {detail.customerFeedback && detail.customerFeedback.length > 0 ? (
        <ClientTestimonialsSection
          embedded
          id="customer-feedback"
          entries={detail.customerFeedback}
          autoplayMs={6500}
          className={`${SERVICE_SECTION_PY} ${sm}`}
        />
      ) : null}

      {/* Industries */}
      {detail.industries && detail.industries.length > 0 ? (
        <section id="industries" className={`bg-[#0A0A0A] ${SERVICE_SECTION_PY} ${sm}`}>
          <div className={SERVICE_SECTION_INNER}>
            <div className="content-wrap min-w-0">
              <ServiceIndustriesList industries={detail.industries} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Sample timeline */}
      {detail.sampleTimeline && detail.sampleTimeline.length > 0 ? (
        <section id="timeline" className={`bg-[#0A0A0A] ${SERVICE_SECTION_PY} ${sm}`}>
          <div className={SERVICE_SECTION_INNER}>
            <ServiceSectionHeader
              eyebrow="Planning"
              title="Sample delivery timeline"
              description="Illustrative phasing — exact timelines follow discovery and scope lock."
              reducedMotion={reducedMotion}
            />
            <SampleTimelineVisual phases={detail.sampleTimeline} reducedMotion={reducedMotion} />
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {detail.faqs && detail.faqs.length > 0 ? (
        <section id="faq" className={`bg-[#0A0A0A] py-16 sm:py-20 lg:py-24 ${sm}`}>
          <div className={SERVICE_SECTION_INNER}>
            <div className="content-wrap min-w-0">
              <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
                <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">07 / FAQ</p>
                  <h2 className={`mt-4 text-white ${SERVICE_H2} lg:text-4xl`}>
                    Questions before you engage
                  </h2>
                  <p className="mt-4 text-white/55">
                    Prefer a conversation? We respond within one business day.
                  </p>
                  <CTAButton href="/contact" variant="outline-dark" className="mt-8">
                    Contact
                  </CTAButton>
                </div>
                <div className="min-w-0">
                  {detail.faqs.map((faq, i) => (
                    <ServiceFaqRow
                      key={faq.question}
                      faq={faq}
                      reducedMotion={reducedMotion}
                      isLast={i === detail.faqs!.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Insights */}
      {detail.relatedInsights && detail.relatedInsights.length > 0 ? (
        <section id="insights" className={`${SERVICE_SECTION_PY} ${sm}`}>
          <div className={SERVICE_SECTION_INNER}>
            <ServiceSectionHeader
              eyebrow="Insights"
              title="Related reading from Raven"
              description="Case studies and field notes for operators and technical leaders."
              reducedMotion={reducedMotion}
            />
            <MobileSwipeRail
              hint="Swipe articles"
              className="min-w-0 lg:hidden"
              aria-label="Related insights"
            >
              {detail.relatedInsights.map((post) => (
                <MobileSwipeCard key={post.slug} widthClassName="w-[min(88vw,340px)]">
                  <article className="group flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#0A0A0A]">
                    <Link href={post.href ?? `/insights/${post.slug}`} className="flex flex-1 flex-col">
                      {post.image ? (
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={post.image}
                            alt={`${post.title} — Raven Tech Group`}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-[1.02]"
                            sizes="88vw"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">
                          {post.readTime ?? 'Article'}
                        </p>
                        <h3 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-brand-500">
                          {post.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                          Read article
                          <ArrowRight size={14} aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </article>
                </MobileSwipeCard>
              ))}
            </MobileSwipeRail>

            <motion.div
              className="hidden gap-6 lg:grid lg:grid-cols-3"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={SECTION_VIEWPORT}
              variants={serviceCapabilityStaggerParentVariants}
            >
              {detail.relatedInsights.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={serviceInsightCardVariants}
                  className="group flex flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#0A0A0A] transition-all duration-300 hover:border-brand-500/40"
                >
                  <Link href={post.href ?? `/insights/${post.slug}`} className="flex flex-1 flex-col">
                    {post.image ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={`${post.title} — Raven Tech Group`}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 360px, 100vw"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">
                        {post.readTime ?? 'Article'}
                      </p>
                      <h3 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-brand-500">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                        Read article
                        <ArrowRight size={14} aria-hidden />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Final CTA — single tailored action per service */}
      {detail.closingCta ? (
        <section className="relative overflow-hidden bg-[#0A0A0A] py-20 text-center sm:py-24 lg:py-48">
          <p
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(80px,18vw,200px)] font-bold leading-none tracking-[-0.04em] text-white/[0.02]"
            aria-hidden
          >
            RAVEN
          </p>
          <div className={`${SERVICE_SECTION_INNER} relative z-10`}>
            <div className="content-wrap mx-auto max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                {detail.closingCta.eyebrow}
              </p>
              <h2 className={`mt-6 text-white ${SERVICE_H2}`}>
                {detail.closingCta.headline}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-white/60">{detail.closingCta.body}</p>
              <div className="mt-10 flex justify-center">
                <CTAButton
                  href={`/contact?prefillMessage=${encodeURIComponent(detail.closingCta.contactPrefill)}`}
                  variant="primary"
                  className="px-8 py-3 text-sm"
                >
                  {detail.closingCta.primaryLabel}
                </CTAButton>
              </div>
              <p className="mt-12 text-xs text-white/40">
                {detail.closingCta.footnote ??
                  'Replies within 1 business day · NDA on request · Free 30-min discovery'}
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
