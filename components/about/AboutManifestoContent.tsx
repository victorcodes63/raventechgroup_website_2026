'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion'

import { CaseStudyClientLogoBadge } from '@/components/case-studies/CaseStudyClientLogoBadge'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { useSectionScrollProgress } from '@/components/motion/ScrollDrivenTypography'
import { CTAButton } from '@/components/ui/CTAButton'
import {
  serviceCapabilityStaggerChildVariants,
  serviceCapabilityStaggerParentVariants,
  serviceSectionHeaderChildVariants,
  serviceSectionHeaderGroupVariants,
} from '@/lib/animations'
import {
  caseStudies,
  getCaseStudyImageSrc,
  caseStudyPrimaryMetric,
  type CaseStudy,
} from '@/lib/data/caseStudies'
import { strideProduct } from '@/lib/data/products'

const VIEWPORT = { once: true, margin: '-80px' as const }
const ABOUT_CASE_SLUGS = [
  'eagle-hr-consultants',
  'youthplus-festival-2026',
  'all-axs-events',
] as const

const PRINCIPLES: { title: string; description: string }[] = [
  {
    title: 'You always know who is working on your project.',
    description:
      'Not a team name. A person with a phone number. When something breaks on a Saturday night, you call them, and they pick up.',
  },
  {
    title: 'Documentation is part of the deliverable, not extra.',
    description:
      "If your team can't understand the system six months from now, we haven't finished the job. Plain-language runbooks are written the same week the feature ships.",
  },
  {
    title: 'Two-week release cadence, always.',
    description:
      'You see working software every fortnight — not at the end of a six-month contract. Demos happen on Fridays, and you shape the next two weeks on the spot.',
  },
  {
    title: 'No vendor lock-in.',
    description:
      'Your stack stays open. Your repos, your infrastructure, your data — we set it up so you own it from day one. If you fire us, you can hire anyone else.',
  },
  {
    title: "If we're not the right fit, we'll tell you.",
    description:
      'Every discovery call ends with an honest assessment. If your project needs something we cannot deliver well, we say so — and point you to someone better suited.',
  },
]

const STORY_LEAD_PARAS: string[] = [
  'I founded Raven because too many organisations had to pick between large consultancies that move slowly and ad-hoc contractors who disappear after launch. Neither was serving them. I wanted to build a firm where the person selling the work is the person shipping the work.',
  'Our job is to make sure the systems you rely on keep running. Discovery that surfaces the real constraints before anyone writes code. Delivery in two-week releases so you see progress, not surprises. Operations after launch — because something always breaks on a Saturday night, and you need someone who picks up.',
]

const STORY_COMMITMENTS: { lead: string; rest: string }[] = [
  {
    lead: 'Accountability is the through-line.',
    rest: 'You will always know who owns the work, how it is progressing, and what happens next.',
  },
  {
    lead: 'I stay on the engagement.',
    rest: 'From the first discovery call to post-launch support — same operator, same phone number.',
  },
  {
    lead: 'We document as we build.',
    rest: 'Whatever we ship, your team can keep running six months after we step back.',
  },
  {
    lead: 'We leave you better off, not dependent.',
    rest: 'No vendor lock-in. Your repos, your infrastructure, your decisions.',
  },
]

function CaseStudyPreviewCard({ study }: { study: CaseStudy }) {
  const { src, unoptimized } = getCaseStudyImageSrc(study)
  const metric = caseStudyPrimaryMetric(study)

  return (
    <motion.article
      variants={serviceCapabilityStaggerChildVariants}
      className="group/case flex min-h-0 flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:border-brand-500/35 hover:bg-[#161616]"
    >
      <Link href={`/case-studies/${study.slug}`} className="flex min-h-0 flex-1 flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A]">
          <Image
            src={src}
            alt={study.heroImageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            unoptimized={unoptimized}
            className="object-cover grayscale transition-all duration-500 group-hover/case:grayscale-0"
            onError={(e) => {
              const el = e.target as HTMLImageElement
              el.src = study.heroImage
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80"
            aria-hidden
          />
          {study.clientLogo ? (
            <CaseStudyClientLogoBadge clientLogo={study.clientLogo} clientName={study.client} placement="card" />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">{study.client}</p>
          <p className="mt-2 text-sm font-semibold leading-snug text-white">{study.outcomeHeadline}</p>
          {metric ? <p className="mt-3 text-xs tabular-nums text-white/45">{metric}</p> : null}
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
            <ArrowSwapRow groupName="case" iconSize={14} strokeWidth={2.2}>
              Read case study
            </ArrowSwapRow>
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export function AboutManifestoContent() {
  const reducedMotion = useReducedMotion()
  const principlesSectionRef = useRef<HTMLElement | null>(null)
  const [isSmallLaptop, setIsSmallLaptop] = useState(false)
  const { scrollYProgress: principlesScroll, isReduced: principlesHookReduced } = useSectionScrollProgress(
    principlesSectionRef as RefObject<HTMLElement | null>,
  )
  const casePreviewList = ABOUT_CASE_SLUGS.map((slug) => caseStudies.find((c) => c.slug === slug)).filter(
    (c): c is CaseStudy => Boolean(c),
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)')
    const sync = () => setIsSmallLaptop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const enablePrinciplesScrollAnim = isSmallLaptop && !principlesHookReduced && !reducedMotion
  const principlesSnapScaleRaw = useTransform(
    principlesScroll,
    [0.12, 0.3],
    enablePrinciplesScrollAnim ? [0.975, 1] : [1, 1],
    { clamp: true },
  )
  const principlesSnapScale = useSpring(principlesSnapScaleRaw, { stiffness: 330, damping: 24, mass: 0.76 })

  const principlesContentOpacity = useTransform(
    principlesScroll,
    [0.3, 0.5],
    enablePrinciplesScrollAnim ? [0, 1] : [1, 1],
    { clamp: true },
  )
  const principlesContentYRaw = useTransform(
    principlesScroll,
    [0.3, 0.5],
    enablePrinciplesScrollAnim ? [20, 0] : [0, 0],
    { clamp: true },
  )
  const principlesContentY = useSpring(principlesContentYRaw, { stiffness: 300, damping: 26, mass: 0.8 })

  return (
    <main className="min-w-0 bg-[#050505] text-white">
      <section className="relative flex min-h-[80vh] flex-col justify-center bg-[#050505] px-0 py-24 md:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_100%_0%,rgba(255,169,31,0.04),transparent_55%)]"
          aria-hidden
        />
        <div className="site-shell relative z-10">
          <div className="content-wrap">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">About Raven Tech Group</p>
              </div>
              <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[3.25rem] lg:leading-[1.08]">
                <span className="text-white">We&apos;re not a big agency.</span>
                <br />
                <span className="text-white/40">That&apos;s the point.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                Raven Tech Group is a technology consultancy in Westlands, Nairobi, founded in 2024. We work with SACCOs,
                fintechs, and growth-stage businesses across East and West Africa.
              </p>
              <div className="mt-10">
                <CTAButton href="/book" variant="primary" className="px-8 py-3.5 text-sm">
                  Book a discovery call
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-24 lg:py-32">
        <div className="site-shell">
          <div className="content-wrap">
            <motion.div
              className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-14"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                    Inside Raven Tech Group
                  </p>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  We partner with teams that need clarity before they need code.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                  Raven Tech Group is a Nairobi-based delivery collective built to help organisations modernise
                  platforms, operate reliably, and scale without hidden surprises. We combine architecture sprints,
                  embedded squads, and managed operations under one roof.
                </p>
              </div>
              <div className="relative mx-auto w-full max-w-3xl lg:ml-auto">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-white/[0.08]">
                <Image
                  src="/images/photos/meeting.png"
                  alt="Raven Tech Group strategy and delivery workspace in Nairobi"
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"
                  aria-hidden
                />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#050505] py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_85%_15%,rgba(255,169,31,0.03)_0%,transparent_60%)]"
        />
        <div className="site-shell relative">
          <div className="content-wrap">
            <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24">
              {/* Left — sticky header + pull quote */}
              <motion.div
                className="lg:sticky lg:top-28 lg:self-start"
                initial={reducedMotion ? false : 'hidden'}
                whileInView={reducedMotion ? undefined : 'visible'}
                viewport={VIEWPORT}
                variants={serviceSectionHeaderGroupVariants}
              >
                <motion.div variants={serviceSectionHeaderChildVariants} className="flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">01 / The Story</p>
                </motion.div>
                <motion.h2
                  variants={serviceSectionHeaderChildVariants}
                  className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                >
                  <span className="text-white">Why Raven</span> <span className="text-white/40">exists.</span>
                </motion.h2>

                <motion.blockquote
                  variants={serviceSectionHeaderChildVariants}
                  className="mt-10 border-l-2 border-brand-500 pl-6 lg:mt-14"
                >
                  <p className="text-xl font-semibold leading-snug tracking-[-0.01em] text-white sm:text-2xl lg:text-[1.7rem] lg:leading-[1.3]">
                    Accountability is a{' '}
                    <span className="text-brand-500">phone number</span>, not a process diagram.
                  </p>
                </motion.blockquote>

                <motion.div variants={serviceSectionHeaderChildVariants} className="mt-10 lg:mt-14">
                  <div className="h-px w-24 bg-gradient-to-r from-[#FFA91F] to-[#FFA91F]/10" aria-hidden />
                  <p className="mt-5 text-base font-semibold text-white">Victor Chumo</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Founder &amp; Managing Director
                  </p>
                </motion.div>
              </motion.div>

              {/* Right — narrative + commitments register */}
              <motion.div
                className="min-w-0"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-7">
                  {STORY_LEAD_PARAS.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-lg leading-[1.7] text-white/85 sm:text-xl sm:leading-[1.75]'
                          : 'text-base leading-[1.8] text-white/60 sm:text-lg'
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-14 border-t border-white/[0.08]">
                  {STORY_COMMITMENTS.map((c, i) => (
                    <motion.div
                      key={c.lead}
                      className="group grid gap-2 border-b border-white/[0.08] py-7 sm:grid-cols-[3rem_1fr] sm:gap-6"
                      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.5,
                        delay: reducedMotion ? 0 : i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="font-mono text-xs font-semibold tabular-nums text-brand-500/70 sm:pt-1.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-base leading-[1.75] sm:text-lg">
                        <span className="font-semibold text-white">{c.lead}</span>{' '}
                        <span className="text-white/55">{c.rest}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={principlesSectionRef}
        className="relative bg-[#050505] py-24 lg:flex lg:min-h-svh lg:items-center lg:py-0"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_15%_20%,rgba(255,169,31,0.025)_0%,transparent_60%)]"
        />

        <div className="relative site-shell lg:py-16">
          <div className="content-wrap">
            <div className="grid items-start gap-16 xl:gap-20 lg:grid-cols-[5fr_7fr]">
            <div className="lg:sticky lg:top-20 lg:self-start">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[#FFA91F]">02 / Principles</p>
              <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.02em] lg:text-5xl xl:text-6xl">
                <span className="text-white">What we</span>
                <br />
                <span className="text-white/40">won&apos;t compromise on.</span>
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-white/55">Five commitments you can hold us to.</p>
            </div>

            <motion.div
              className="space-y-px bg-white/[0.06]"
              style={{
                opacity: principlesContentOpacity,
                y: principlesContentY,
                scale: principlesSnapScale,
              }}
            >
              {PRINCIPLES.map((p, i) => (
                <motion.article
                  key={p.title}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-[#050505] p-8 transition-colors duration-300 hover:bg-[#0a0a0a] lg:p-10"
                >
                  <div className="flex items-start gap-6 lg:gap-8">
                    <div className="flex flex-shrink-0 flex-col items-center pt-2">
                      <span className="font-mono text-sm font-semibold text-[#FFA91F]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="mt-3 h-12 w-px bg-gradient-to-b from-[#FFA91F]/40 to-transparent" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold leading-snug tracking-tight text-white lg:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#050505] py-24 lg:py-32">
        <div className="site-shell relative z-10">
          <div className="content-wrap">
            <motion.div
              className="mb-14 max-w-3xl"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={VIEWPORT}
              variants={serviceSectionHeaderGroupVariants}
            >
              <motion.p
                variants={serviceSectionHeaderChildVariants}
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500"
              >
                03 / Proof
              </motion.p>
              <motion.h2
                variants={serviceSectionHeaderChildVariants}
                className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
              >
                <span className="text-white">What we&apos;ve</span> <span className="text-white/40">shipped.</span>
              </motion.h2>
            </motion.div>

            {/* Featured — Stride, the software product we build and operate */}
            <motion.article
              className="group/stride mb-6 overflow-hidden rounded-card border border-brand-500/25 bg-[#111111] transition-all duration-300 hover:border-brand-500/45 hover:bg-[#141414] lg:mb-8"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={strideProduct.bridgeHref} className="grid lg:grid-cols-[1fr_1.05fr]">
                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                      Raven product
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                      Software we build and operate
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {strideProduct.name}
                    <span className="text-white/40"> — {strideProduct.tagline}</span>
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                    {strideProduct.description}
                  </p>
                  <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
                    {strideProduct.proofPoints.map((point) => (
                      <div key={point.label} className="min-w-0">
                        <p className="text-xl font-bold tabular-nums tracking-tight text-white sm:text-2xl">
                          {point.value}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-white/45">{point.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                    <ArrowSwapRow groupName="stride" iconSize={14} strokeWidth={2.2}>
                      Explore Stride
                    </ArrowSwapRow>
                  </span>
                </div>
                <div className="relative min-h-[240px] overflow-hidden bg-[#0A0A0A] sm:min-h-[300px] lg:min-h-0">
                  <Image
                    src="/images/products/stride-preview.jpg"
                    alt="Stride business management platform dashboard"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-left-top grayscale transition-all duration-500 group-hover/stride:grayscale-0"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#111111] lg:via-transparent lg:to-transparent"
                    aria-hidden
                  />
                </div>
              </Link>
            </motion.article>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={VIEWPORT}
              variants={serviceCapabilityStaggerParentVariants}
            >
              {casePreviewList.map((study) => (
                <CaseStudyPreviewCard key={study.slug} study={study} />
              ))}
            </motion.div>
            <motion.div
              className="mt-12"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/case-studies"
                className="group/case inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-colors hover:text-brand-400"
              >
                <ArrowSwapRow groupName="case" iconSize={14} strokeWidth={2.2}>
                  View all case studies
                </ArrowSwapRow>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
