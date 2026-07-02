'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

import { useSectionScrollProgress } from '@/components/motion/ScrollDrivenTypography'
import { CTAButton, CTAButtonElement } from '@/components/ui/CTAButton'
import { services } from '@/lib/data/services'
import { serviceIntakeSpotlights } from '@/lib/data/serviceIntakeSpotlights'

type Step = 1 | 2 | 3 | 4

const stateOptions = [
  { id: 'idea', label: 'Idea' },
  { id: 'poc', label: 'POC' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'mvp', label: 'MVP' },
  { id: 'ready', label: 'Live' },
  { id: 'legacy', label: 'Legacy' },
] as const

type PrimaryNeed = 'engineering' | 'advisory' | 'data-ai'

const needOptions: { id: PrimaryNeed; title: string; description: string }[] = [
  {
    id: 'engineering',
    title: 'Build & launch',
    description: 'Users first.',
  },
  {
    id: 'advisory',
    title: 'Plan first',
    description: 'Roadmap or audit first.',
  },
  {
    id: 'data-ai',
    title: 'Smarter ops',
    description: 'Automate with data.',
  },
]

const requirementOptions = [
  { id: 'security', label: 'Compliance & security', hint: 'Regulatory or data protection' },
  { id: 'time', label: 'Speed to market', hint: 'A deadline or competitor' },
  { id: 'legacy', label: 'Replace legacy systems', hint: 'Off spreadsheets/manual work' },
  { id: 'integration', label: 'System integrations', hint: 'M-Pesa, ERP, CRM, APIs' },
  { id: 'ai', label: 'Automation & AI', hint: 'Practical automation' },
] as const

type RequirementId = (typeof requirementOptions)[number]['id']

type OpenSection = 1 | 2 | 3

export type ServiceIntakeWizardProps = {
  /** Homepage: exposes this section’s DOM node for seam scroll (hero full-bleed glass). */
  registerSectionRef?: React.MutableRefObject<HTMLElement | null>
}

function buildPrefillMessage(params: {
  projectStage: string
  primaryNeed: string
  requirements: string[]
  recommended: string[]
}) {
  const req = params.requirements.length ? params.requirements.join(', ') : 'None selected'
  const rec = params.recommended.length ? params.recommended.join(', ') : 'Not determined'

  return [
    'Service fit questionnaire',
    '',
    `Where things stand: ${params.projectStage}`,
    `Top priority: ${params.primaryNeed}`,
    `Additional context: ${req}`,
    '',
    `Suggested starting points: ${rec}`,
    '',
    'Notes:',
    'Please reply with a tailored scope and next steps based on the answers above.',
  ].join('\n')
}

function ServiceSpotlightCarousel({
  recommendedSlugs,
}: {
  recommendedSlugs: string[]
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-spotlight-card]')
    const w = card?.offsetWidth ?? 300
    el.scrollBy({ left: dir * (w + 16), behavior: 'smooth' })
  }

  // Reset scroll to front whenever the recommended set changes
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: 'instant' })
  }, [recommendedSlugs])

  // Preserve recommended priority order — highest-confidence slug first
  const cardsToRender =
    recommendedSlugs.length > 0
      ? (recommendedSlugs
          .map((slug) => serviceIntakeSpotlights.find((item) => item.slug === slug))
          .filter(Boolean) as typeof serviceIntakeSpotlights)
      : serviceIntakeSpotlights
  const isSingleCard = cardsToRender.length === 1

  return (
    <div className="flex flex-col">
        <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">How we help</p>
            <p className="mt-1 max-w-md text-sm text-white/50">Browse what we deliver — or use the quiz to narrow it down.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/[0.1] bg-white/[0.05] text-white/50 transition hover:border-white/20 hover:text-white"
              aria-label="Previous services"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/[0.1] bg-white/[0.05] text-white/50 transition hover:border-white/20 hover:text-white"
              aria-label="Next services"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
            <p className="-mt-1 mb-2 text-[11px] text-white/35 lg:hidden">Swipe cards for more</p>

      <div
        ref={scrollerRef}
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {cardsToRender.map((item) => {
          const suggested = recommendedSlugs.includes(item.slug)
          return (
            <article
              key={item.slug}
              data-spotlight-card
              className={`relative flex flex-col shrink-0 snap-center overflow-hidden rounded-sm border bg-[#111111] shadow-[0_18px_50px_-38px_rgba(0,0,0,0.6)] transition sm:w-[min(100%,340px)] lg:w-[420px] ${
                isSingleCard ? 'w-full' : 'w-[min(88vw,300px)]'
              } ${
                suggested ? 'border-brand-500/50 ring-2 ring-brand-500/25' : 'border-white/[0.08]'
              }`}
            >
              {suggested && (
                <span className="absolute right-3 top-3 z-10 rounded-sm bg-brand-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
                  Suggested
                </span>
              )}
              <div className="p-5 pb-4">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/25" aria-hidden />
                  {item.category}
                </p>
                <h3 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-white">{item.headline}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">{item.body}</p>
              </div>
              <Link
                href={item.href}
                className="group/img relative mt-auto flex-none block h-[132px] w-full overflow-hidden bg-black sm:h-[148px] md:h-[160px]"
              >
                <Image
                  src={item.imageSrc}
                  alt={item.headline}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 340px, 420px"
                  className="object-cover transition duration-700 ease-out group-hover/img:scale-[1.03] saturate-90 group-hover/img:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <ArrowSwapRow groupName="img" iconSize={18} strokeWidth={2.2} className="text-sm font-semibold">
                    View service
                  </ArrowSwapRow>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export function ServiceIntakeWizard({ registerSectionRef }: ServiceIntakeWizardProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const assignSectionNode = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node
      if (registerSectionRef) {
        registerSectionRef.current = node
      }
    },
    [registerSectionRef],
  )
  const { scrollYProgress, isReduced } = useSectionScrollProgress(sectionRef)

  /** Early segment of section progress = sheet sliding over sticky hero; keeps copy locked to scroll. */
  const eyeOpacity = useTransform(scrollYProgress, [0, 0.048], isReduced ? [1, 1] : [0, 1], { clamp: true })
  const eyeY = useTransform(scrollYProgress, [0, 0.048], isReduced ? [0, 0] : [14, 0], { clamp: true })

  const titleOpacity = useTransform(scrollYProgress, [0.02, 0.09], isReduced ? [1, 1] : [0, 1], { clamp: true })
  const titleY = useTransform(scrollYProgress, [0.02, 0.09], isReduced ? [0, 0] : [22, 0], { clamp: true })
  const titleBlurPx = useTransform(scrollYProgress, [0.02, 0.09], isReduced ? [0, 0] : [7, 0], { clamp: true })
  const titleFilter = useMotionTemplate`blur(${titleBlurPx}px)`

  const subOpacity = useTransform(scrollYProgress, [0.055, 0.128], isReduced ? [1, 1] : [0, 1], { clamp: true })
  const subY = useTransform(scrollYProgress, [0.055, 0.128], isReduced ? [0, 0] : [12, 0], { clamp: true })

  const bodyOpacity = useTransform(scrollYProgress, [0.085, 0.19], isReduced ? [1, 1] : [0, 1], { clamp: true })
  const bodyY = useTransform(scrollYProgress, [0.085, 0.19], isReduced ? [0, 0] : [28, 0], { clamp: true })
  const panelSnapYRaw = useTransform(scrollYProgress, [0.1, 0.2], isReduced ? [0, 0] : [48, 0], { clamp: true })
  const panelSnapScaleRaw = useTransform(scrollYProgress, [0.1, 0.2], isReduced ? [1, 1] : [0.975, 1], { clamp: true })
  const panelSnapY = useSpring(panelSnapYRaw, { stiffness: 310, damping: 24, mass: 0.78 })
  const panelSnapScale = useSpring(panelSnapScaleRaw, { stiffness: 310, damping: 24, mass: 0.78 })

  const [step, setStep] = useState<Step>(1)
  const [openSection, setOpenSection] = useState<OpenSection>(1)
  const [projectStage, setProjectStage] = useState<(typeof stateOptions)[number]['id'] | null>(null)
  const [primaryNeed, setPrimaryNeed] = useState<PrimaryNeed | null>(null)
  const [requirements, setRequirements] = useState<RequirementId[]>([])
  const q3Ref = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (step === 4 && resultsRef.current) {
      setTimeout(() => {
        const el = resultsRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elementCenter = rect.top + window.scrollY + rect.height / 2
        const targetScrollY = elementCenter - window.innerHeight / 2
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
      }, 120)
    }
  }, [step])

  useEffect(() => {
    if (openSection === 3 && q3Ref.current) {
      setTimeout(() => {
        const el = q3Ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const viewportBottom = window.innerHeight
        if (rect.bottom > viewportBottom - 32) {
          window.scrollBy({ top: rect.bottom - viewportBottom + 80, behavior: 'smooth' })
        }
      }, 180)
    }
  }, [openSection])

  const stageLabel = useMemo(
    () => stateOptions.find((opt) => opt.id === projectStage)?.label ?? 'Not selected',
    [projectStage],
  )
  const needLabel = useMemo(
    () => needOptions.find((opt) => opt.id === primaryNeed)?.title ?? 'Not selected',
    [primaryNeed],
  )

  const recommended = useMemo(() => {
    if (!primaryNeed) return []

    let primarySlug = 'software-development'
    if (primaryNeed === 'advisory') primarySlug = 'it-consulting'
    if (primaryNeed === 'data-ai') primarySlug = 'cloud-solutions'

    const reqSet = new Set(requirements)
    const secondary: string[] = []

    if (reqSet.has('security')) secondary.push('cybersecurity')
    if (reqSet.has('integration')) secondary.push('system-integration')
    if (reqSet.has('legacy')) secondary.push('digital-transformation')
    if (reqSet.has('ai')) {
      if (primaryNeed !== 'data-ai') secondary.push('cloud-solutions')
      secondary.push('software-development')
    }

    const unique = Array.from(new Set([primarySlug, ...secondary]))
    return unique.slice(0, 3)
  }, [primaryNeed, requirements])

  const prefillMessage = useMemo(() => {
    if (!projectStage || !primaryNeed) return ''
    const reqLabels =
      requirements.length === 0
        ? []
        : requirementOptions.filter((opt) => requirements.includes(opt.id)).map((opt) => opt.label)
    const recTitles = recommended.map((slug) => services.find((s) => s.slug === slug)?.title ?? slug)
    return buildPrefillMessage({
      projectStage: stageLabel,
      primaryNeed: needLabel,
      requirements: reqLabels,
      recommended: recTitles,
    })
  }, [projectStage, primaryNeed, requirements, recommended, stageLabel, needLabel])

  const ctaHref = useMemo(() => {
    const msg = encodeURIComponent(prefillMessage)
    return `/contact?prefillMessage=${msg}`
  }, [prefillMessage])

  const completionPercent = useMemo(() => {
    if (step >= 4) return '100'
    if (primaryNeed) return '66'
    if (projectStage) return '33'
    return '0'
  }, [step, projectStage, primaryNeed])

  const unlockQ2 = Boolean(projectStage)
  const unlockQ3 = Boolean(projectStage && primaryNeed)

  const selectStage = (id: (typeof stateOptions)[number]['id']) => {
    setProjectStage(id)
    setOpenSection(2)
  }

  const selectNeed = (id: PrimaryNeed) => {
    setPrimaryNeed(id)
    setOpenSection(3)
  }

  const resetWizard = () => {
    setStep(1)
    setOpenSection(1)
    setProjectStage(null)
    setPrimaryNeed(null)
    setRequirements([])
  }

  return (
    <section
      ref={assignSectionNode}
      id="service-intake"
      className="relative overflow-hidden bg-[#0A0A0A] py-10 text-white sm:py-16 md:py-20 lg:flex lg:min-h-svh lg:items-center lg:py-0"
    >
      <motion.div
        className="site-shell relative z-10 w-full lg:py-16"
        style={{ y: panelSnapY, scale: panelSnapScale }}
      >
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2 sm:space-y-3">
            <motion.div style={{ opacity: eyeOpacity, y: eyeY }}>
              <SectionEyebrow gutterBottom={false}>Find the right engagement</SectionEyebrow>
            </motion.div>
                       <motion.h2
              className="text-[1.35rem] font-bold leading-snug tracking-[-0.03em] text-white sm:text-3xl md:text-4xl"
              style={{ opacity: titleOpacity, y: titleY, filter: titleFilter }}
            >
              Not sure where to start? Three questions—we will suggest what to explore first.
            </motion.h2>
            <motion.p
              className="text-sm leading-relaxed text-white/55 sm:text-base"
              style={{ opacity: subOpacity, y: subY }}
            >
              Tell us your stage and priority. We map that to a next step—a relevant service, a short discovery sprint, or a call—before scope or pricing.
            </motion.p>
          </div>

          <motion.div
            className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:items-stretch lg:gap-8 xl:gap-10"
            style={{ opacity: bodyOpacity, y: bodyY }}
          >
            <div className="order-1 flex min-w-0 flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-[#111111] lg:order-1">
              <div className="h-1 w-full bg-white/[0.05]">
                <motion.div
                  className="h-full bg-brand-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${completionPercent}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              <div className="p-3 sm:p-5">
                {step < 4 ? (
                    <>
                      {/* Q1 — compact chip when answered & collapsed */}
                      <div className="border-b border-white/[0.06]">
                        {projectStage && openSection !== 1 ? (
                          <button
                            type="button"
                            onClick={() => setOpenSection(1)}
                            className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Stage</span>
                              <span className="rounded-sm border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[11px] font-semibold text-white/70">{stageLabel}</span>
                            </div>
                            <span className="text-[10px] font-semibold text-white/25 transition hover:text-white/50">edit</span>
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setOpenSection(1)}
                              className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition hover:bg-white/[0.03] sm:px-5"
                            >
                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">1 · Stage</p>
                                <p className="mt-1 text-[15px] font-bold leading-snug text-white sm:text-base">How far along?</p>
                              </div>
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-brand-500/40 bg-brand-500/20 text-brand-400" aria-hidden>
                                <Minus size={16} strokeWidth={2.2} />
                              </span>
                            </button>
                            <div className="border-t border-white/[0.04] px-4 pb-5 pt-1 sm:px-5">
                              <div className="mt-3 flex flex-wrap gap-2">
                                {stateOptions.map((opt) => {
                                  const active = projectStage === opt.id
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => selectStage(opt.id)}
                                      className={`rounded-sm border px-4 py-2 text-[13px] font-semibold transition ${
                                        active
                                          ? 'border-brand-500/50 bg-brand-500/15 text-brand-400'
                                          : 'border-white/[0.08] bg-white/[0.04] text-white/60 hover:border-white/20 hover:bg-white/[0.07]'
                                      }`}
                                      aria-pressed={active}
                                    >
                                      {opt.label}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Q2 — compact chip when answered & collapsed */}
                      <div className="border-b border-white/[0.06]">
                        {primaryNeed && openSection !== 2 ? (
                          <button
                            type="button"
                            onClick={() => setOpenSection(2)}
                            className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Priority</span>
                              <span className="rounded-sm border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[11px] font-semibold text-white/70">{needLabel}</span>
                            </div>
                            <span className="text-[10px] font-semibold text-white/25 transition hover:text-white/50">edit</span>
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              disabled={!unlockQ2}
                              onClick={() => unlockQ2 && setOpenSection(2)}
                              className={`flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:px-5 ${
                                unlockQ2 ? 'transition hover:bg-white/[0.03]' : 'cursor-not-allowed opacity-40'
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">2 · Priority</p>
                                <p className="mt-1 text-[15px] font-bold leading-snug text-white sm:text-base">Main goal?</p>
                              </div>
                              <span
                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border ${
                                  openSection === 2 ? 'border-brand-500/40 bg-brand-500/20 text-brand-400' : 'border-white/[0.1] bg-white/[0.04] text-white/40'
                                }`}
                                aria-hidden
                              >
                                {openSection === 2 ? <Minus size={16} strokeWidth={2.2} /> : <Plus size={16} strokeWidth={2.2} />}
                              </span>
                            </button>
                            <AnimatePresence initial={false}>
                              {openSection === 2 && unlockQ2 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="border-t border-white/[0.04] px-4 pb-5 pt-1 sm:px-5">
                                    <div className="mt-3 grid grid-cols-1 gap-2.5 lg:mt-2">
                                      {needOptions.map((opt) => {
                                        const active = primaryNeed === opt.id
                                        return (
                                          <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => selectNeed(opt.id)}
                                            className={`w-full rounded-card border p-3 text-left transition sm:p-4 ${
                                              active
                                                ? 'border-brand-500/50 bg-brand-500/15 text-brand-400'
                                                : 'border-white/[0.08] bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06]'
                                            }`}
                                            aria-pressed={active}
                                          >
                                            <div className="text-[13px] font-bold leading-snug sm:text-sm">{opt.title}</div>
                                            <div className={`mt-1 text-[11px] leading-snug sm:mt-2 sm:text-xs sm:leading-relaxed ${active ? 'text-brand-300/80' : 'text-white/45'}`}>
                                              {opt.description}
                                            </div>
                                          </button>
                                        )
                                      })}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </div>

                    {/* Q3 */}
                    <div ref={q3Ref} className="border-b border-white/[0.06] last:border-b-0">
                      <button
                        type="button"
                        disabled={!unlockQ3}
                        onClick={() => unlockQ3 && setOpenSection(3)}
                        className={`flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:px-5 ${
                          unlockQ3 ? 'transition hover:bg-white/[0.03]' : 'cursor-not-allowed opacity-40'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">3 · Context</p>
                          <p className="mt-1 text-[15px] font-bold leading-snug text-white sm:text-base">Anything else?</p>
                          {requirements.length > 0 && openSection !== 3 && (
                            <p className="mt-1 text-sm font-medium text-white/50">{requirements.length} selected</p>
                          )}
                        </div>
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border ${
                            openSection === 3 ? 'border-brand-500/40 bg-brand-500/20 text-brand-400' : 'border-white/[0.1] bg-white/[0.04] text-white/40'
                          }`}
                          aria-hidden
                        >
                          {openSection === 3 ? <Minus size={16} strokeWidth={2.2} /> : <Plus size={16} strokeWidth={2.2} />}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {openSection === 3 && unlockQ3 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/[0.04] px-4 pb-5 pt-1 sm:px-5">
                              <p className="text-xs text-white/45 lg:hidden">Optional. Pick any that fit.</p>
                              <div className="mt-3 grid grid-cols-1 gap-2.5 lg:mt-2">
                                {requirementOptions.map((opt) => {
                                  const active = requirements.includes(opt.id)
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => {
                                        setRequirements((prev) =>
                                          active ? prev.filter((x) => x !== opt.id) : [...prev, opt.id],
                                        )
                                      }}
                                      className={`rounded-card w-full border p-3 text-left transition sm:p-4 ${
                                        active
                                          ? 'border-brand-500/50 bg-brand-500/15 text-brand-400'
                                          : 'border-white/[0.08] bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06]'
                                      }`}
                                      aria-pressed={active}
                                    >
                                      <div className="text-[13px] font-bold leading-snug sm:text-sm">{opt.label}</div>
                                      <div className={`mt-1 text-[11px] leading-snug sm:mt-2 sm:text-xs sm:leading-relaxed ${active ? 'text-brand-300/80' : 'text-white/45'}`}>
                                        {opt.hint}
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>
                              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 sm:mt-6 sm:gap-3">
                                <button
                                  type="button"
                                  onClick={() => setOpenSection(2)}
                                  className="rounded-sm border border-white/[0.1] bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/[0.08] hover:text-white"
                                >
                                  Back
                                </button>
                                <CTAButtonElement
                                  type="button"
                                  variant="outline"
                                  onClick={() => setStep(4)}
                                  className="justify-center px-6 py-2.5 text-sm"
                                >
                                  See results
                                </CTAButtonElement>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      </div>
                    </>
                ) : (
                  <motion.div
                    ref={resultsRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="px-4 py-4 sm:px-5"
                  >
                    {/* Compact answers summary */}
                    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Your answers</p>
                    <div className="mb-4 flex flex-wrap gap-2 border-b border-white/[0.06] pb-4">
                      <span className="rounded-sm border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold text-white/70">
                        {stageLabel}
                      </span>
                      <span className="rounded-sm border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold text-white/70">
                        {needLabel}
                      </span>
                      {requirements.length > 0 && (
                        <span className="rounded-sm border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold text-white/70">
                          {requirements.length} extra
                        </span>
                      )}
                    </div>

                    {/* Suggested services */}
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Where we&apos;d start</p>
                    <div className="mb-4 flex flex-col gap-1.5">
                      {recommended.map((slug) => {
                        const service = services.find((s) => s.slug === slug)
                        if (!service) return null
                        return (
                          <Link
                            key={slug}
                            href={service.href}
                            className="group flex items-center justify-between gap-2 rounded-sm border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 transition hover:border-white/[0.15] hover:bg-white/[0.07]"
                          >
                            <span className="text-[13px] font-semibold text-white">{service.title}</span>
                            <span className="shrink-0 text-white/30 transition group-hover:text-white/70" aria-hidden>→</span>
                          </Link>
                        )
                      })}
                    </div>

                    {/* CTA */}
                    <CTAButton href={ctaHref} className="w-full justify-center px-6 py-2.5 text-sm">
                      Book a scoping call
                    </CTAButton>

                    {/* Secondary actions */}
                    <div className="mt-3 flex items-center justify-center gap-4 border-t border-white/[0.04] pt-3">
                      <button
                        type="button"
                        onClick={() => { setStep(3); setOpenSection(3) }}
                        className="text-[12px] font-semibold text-white/40 transition hover:text-white/70"
                      >
                        Change answers
                      </button>
                      <span className="text-white/20" aria-hidden>·</span>
                      <button
                        type="button"
                        onClick={resetWizard}
                        className="text-[12px] font-semibold text-white/40 transition hover:text-white/70"
                      >
                        Start over
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Removed suggestion preview card for a cleaner layout */}
              </div>
            </div>

            <div className="order-2 min-w-0 pt-1 lg:order-2 lg:pt-1">
              <ServiceSpotlightCarousel recommendedSlugs={step === 4 ? recommended : []} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
