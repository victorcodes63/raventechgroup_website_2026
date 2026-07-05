'use client'

import { useState, useEffect, useCallback, useRef, useLayoutEffect, type CSSProperties } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { SubtleParallaxBackground } from '@/components/motion/SubtleParallaxBackground'
import { LetterFillReveal } from '@/components/motion/LetterFillReveal'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { TrustedByLogoMarquee } from '@/components/trust/TrustedByLogoMarquee'
import { heroClientLogos } from '@/lib/data/clientLogos'
import { CTAButton } from '@/components/ui/CTAButton'
import {
  heroAccordionRiseVariants,
  heroAccordionStaggerVariants,
  heroAccordionTitleVariants,
} from '@/lib/animations'
import { HOMEPAGE_INTAKE_SEAM } from '@/lib/siteScrollMotion'

/* ─── Panel data ──────────────────────────────────────────── */

type PanelGeometry = {
  baseClass: string
  /** Soft mesh / radial layers only (no stripe texture) */
  ambient: string
}

type HeroPanel = {
  id: string
  category: string
  headline: string
  description: string
  cta: { label: string; href: string }
  geometry: PanelGeometry
  tags: { label: string; href: string }[]
  /** Fills the same band as the overview client logos so spacing stays even on other panels */
  accentLine?: string
}

function PanelBackdrop({ g }: { g: PanelGeometry }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className={`absolute inset-0 ${g.baseClass}`} />
      <div className="absolute inset-0" style={{ background: g.ambient }} />
    </div>
  )
}

/** Collapsed strips: uniform dark overlays — no backdrop blur needed on dark background. */
type XylophoneStripStyle = {
  overlayClass: string
  overlayStyle: CSSProperties
  label: string
  plusRing: string
  plusIcon: string
}

const XYLOPHONE_STRIP_STYLES: XylophoneStripStyle[] = [
  {
    overlayClass: 'border border-white/[0.06]',
    overlayStyle: {
      background: 'rgba(30,30,30,0.85)',
    },
    label:
      'text-white/40 transition-all duration-300 group-hover/strip:tracking-[0.36em] group-hover/strip:text-white/80',
    plusRing:
      'border-white/20 bg-white/5 transition-all duration-300 group-hover/strip:border-white/40 group-hover/strip:bg-white/10',
    plusIcon: 'text-white/40 transition-all duration-300 group-hover/strip:text-white/80',
  },
  {
    overlayClass: 'border border-white/[0.06]',
    overlayStyle: {
      background: 'rgba(25,25,25,0.88)',
    },
    label:
      'text-white/40 transition-all duration-300 group-hover/strip:tracking-[0.36em] group-hover/strip:text-white/80',
    plusRing:
      'border-white/20 bg-white/5 transition-all duration-300 group-hover/strip:border-white/40 group-hover/strip:bg-white/10',
    plusIcon: 'text-white/40 transition-all duration-300 group-hover/strip:text-white/80',
  },
  {
    overlayClass: 'border border-white/[0.06]',
    overlayStyle: {
      background: 'rgba(20,20,20,0.90)',
    },
    label:
      'text-white/40 transition-all duration-300 group-hover/strip:tracking-[0.36em] group-hover/strip:text-white/80',
    plusRing:
      'border-white/20 bg-white/5 transition-all duration-300 group-hover/strip:border-white/40 group-hover/strip:bg-white/10',
    plusIcon: 'text-white/40 transition-all duration-300 group-hover/strip:text-white/80',
  },
  {
    overlayClass: 'border border-white/[0.06]',
    overlayStyle: {
      background: 'rgba(15,15,15,0.92)',
    },
    label:
      'text-white/40 transition-all duration-300 group-hover/strip:tracking-[0.36em] group-hover/strip:text-white/80',
    plusRing:
      'border-white/20 bg-white/5 transition-all duration-300 group-hover/strip:border-white/40 group-hover/strip:bg-white/10',
    plusIcon: 'text-white/40 transition-all duration-300 group-hover/strip:text-white/80',
  },
  {
    overlayClass: 'border border-white/[0.06]',
    overlayStyle: {
      background: 'rgba(10,10,10,0.95)',
    },
    label:
      'text-white/40 transition-all duration-300 group-hover/strip:tracking-[0.36em] group-hover/strip:text-white/80',
    plusRing:
      'border-white/20 bg-white/5 transition-all duration-300 group-hover/strip:border-white/40 group-hover/strip:bg-white/10',
    plusIcon: 'text-white/40 transition-all duration-300 group-hover/strip:text-white/80',
  },
]

const panels: HeroPanel[] = [
  {
    id: 'overview',
    category: 'Raven overview',
    headline: 'We build the technology your business runs on',
    description:
      'Custom software, cloud infrastructure, and systems that replace manual work for growth-stage teams in Nairobi and across Kenya.',
    cta: { label: 'Explore services', href: '/services' },
    geometry: {
      baseClass: 'bg-[#0A0A0A]',
      ambient:
        'radial-gradient(ellipse 120% 90% at 0% 0%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)',
    },
    tags: [
      { label: 'Web development', href: '/services/web-development' },
      { label: 'Software development', href: '/services/software-development' },
      { label: 'Cloud solutions', href: '/services/cloud-solutions' },
      { label: 'System integration', href: '/services/system-integration' },
      { label: 'IT consulting', href: '/services/it-consulting' },
    ],
  },
  {
    id: 'software',
    category: 'Software',
    headline: 'Software built for how businesses actually work',
    description:
      'We scope, design, and ship custom platforms — from SACCO portals to M-Pesa integrations to full HR systems across Kenya.',
    cta: { label: 'View service', href: '/services/software-development' },
    geometry: {
      baseClass: 'bg-[#0A0A0A]',
      ambient:
        'radial-gradient(ellipse 105% 95% at 100% 8%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(255,255,255,0.02) 0%, transparent 55%)',
    },
    tags: [
      { label: 'Web development', href: '/services/web-development' },
      { label: 'Web platforms', href: '/services/software-development' },
      { label: 'Internal tools', href: '/services/software-development' },
      { label: 'API design', href: '/services/software-development' },
    ],
    accentLine:
      'We build what you spec, keep you in the loop throughout, and ship on time — no black-box development, no surprise pivots.',
  },
  {
    id: 'cloud',
    category: 'Cloud',
    headline: 'Infrastructure that scales when your business does',
    description:
      'We migrate, architect, and manage cloud environments so downtime and growing pains stop being your problem as you scale across Kenya and East Africa.',
    cta: { label: 'View service', href: '/services/cloud-solutions' },
    geometry: {
      baseClass: 'bg-[#0A0A0A]',
      ambient:
        'radial-gradient(ellipse 100% 85% at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 60%), radial-gradient(circle at 85% 65%, rgba(255,255,255,0.02) 0%, transparent 55%)',
    },
    tags: [
      { label: 'AWS & Azure', href: '/services/cloud-solutions' },
      { label: 'Terraform & IaC', href: '/services/cloud-solutions' },
      { label: 'Cloud migrations', href: '/services/cloud-solutions' },
      { label: 'FinOps', href: '/services/cloud-solutions' },
    ],
    accentLine:
      'Your infrastructure grows with your business without the unexpected costs or downtime that usually come with scaling.',
  },
  {
    id: 'security',
    category: 'Security',
    headline: "Security built for your industry's actual threats",
    description:
      'From KYC compliance to fintech data protection — we harden systems before breaches become headlines for regulated teams in Kenya.',
    cta: { label: 'View service', href: '/services/cybersecurity' },
    geometry: {
      baseClass: 'bg-[#0A0A0A]',
      ambient:
        'radial-gradient(ellipse 85% 105% at 100% 50%, rgba(255,255,255,0.025) 0%, transparent 65%), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.015) 0%, transparent 55%)',
    },
    tags: [
      { label: 'Threat modelling', href: '/services/cybersecurity' },
      { label: 'Penetration testing', href: '/services/cybersecurity' },
      { label: 'Compliance', href: '/services/cybersecurity' },
      { label: 'Incident response', href: '/services/cybersecurity' },
    ],
    accentLine:
      'We find the gaps before attackers do and make sure your systems meet the compliance requirements your clients and regulators expect.',
  },
  {
    id: 'consulting',
    category: 'Consulting',
    headline: 'Strategy before code — always',
    description:
      'We assess your current setup, name what is blocking delivery, and map technology decisions that hold up in 12 months for leadership teams in Nairobi.',
    cta: { label: 'View service', href: '/services/it-consulting' },
    geometry: {
      baseClass: 'bg-[#0A0A0A]',
      ambient:
        'radial-gradient(ellipse 115% 75% at 20% 100%, rgba(255,255,255,0.025) 0%, transparent 60%), radial-gradient(circle at 90% 15%, rgba(255,255,255,0.02) 0%, transparent 50%)',
    },
    tags: [
      { label: 'CTO advisory', href: '/services/it-consulting' },
      { label: 'Architecture reviews', href: '/services/it-consulting' },
      { label: 'Delivery coaching', href: '/services/it-consulting' },
    ],
    accentLine:
      "We review where you are, tell you what's actually blocking you, and help you make technology decisions you won't regret in 12 months.",
  },
]

const AUTOPLAY_MS = 10000

/** Max measure for hero accordion copy — scales up on very wide viewports (strip can grow; text should too). */
const HERO_ACCORDION_COPY_MEASURE =
  'max-w-[min(440px,100%)] xl:max-w-[min(520px,100%)] min-[1600px]:max-w-[min(600px,100%)] min-[1920px]:max-w-[min(680px,100%)]'

/* ─── Animation aliases (variants live in lib/animations.ts) ─ */
const stagger = heroAccordionStaggerVariants
const rise = heroAccordionRiseVariants
const titleRise = heroAccordionTitleVariants

/** Amber category chip — mobile/tablet context (collapsed strips carry it on desktop). */
function HeroCategoryChip({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-500/25 bg-brand-500/[0.08] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.26em] text-brand-500">
      {category}
    </span>
  )
}

/** Hero headline — LetterFillReveal entrance on the overview panel only (H1 treatment per rules). */
function HeroHeadline({ panel, isOverview }: { panel: HeroPanel; isOverview: boolean }) {
  if (!isOverview) return <>{panel.headline}</>
  return (
    <LetterFillReveal
      as="span"
      mode="entrance"
      text={panel.headline}
      entranceDuration={1.5}
      entranceDelay={0.9}
      dimColor="rgba(255,255,255,0.16)"
    />
  )
}

/** Secondary CTA: stays in the text column — no overlap with copy (replaces floating card). */
function HeroConsultationRow({ staticEntrance = false }: { staticEntrance?: boolean }) {
  const inner = (
    <p className="text-[12px] leading-relaxed sm:text-[13px]">
      <span className="inline-flex flex-wrap items-baseline gap-x-1.5 text-white/50">
        <span>Prefer to talk first?</span>
        <Link
          href="/book"
          className="group/consult inline-flex items-baseline font-semibold text-white/80 underline decoration-white/20 underline-offset-[5px] transition-colors hover:text-brand-400 hover:decoration-brand-500/50"
        >
          <ArrowSwapRow
            groupName="consult"
            iconSize={14}
            className="items-baseline gap-2"
            iconClassName="relative top-[0.1em]"
          >
            Book a complimentary 30-minute discovery call
          </ArrowSwapRow>
        </Link>
        <span aria-hidden className="font-normal">
          .
        </span>
      </span>
    </p>
  )

  const cls = `mt-3 ${HERO_ACCORDION_COPY_MEASURE} sm:mt-3.5`

  if (staticEntrance) {
    return <div className={cls}>{inner}</div>
  }

  return (
    <motion.div variants={rise} className={cls}>
      {inner}
    </motion.div>
  )
}

/** Decorative strip (duplicate set = seamless loop). Names exposed to SR below. */
const heroSocialBandDesktop =
  'mt-7 flex min-h-[7rem] flex-col justify-center border-t border-white/[0.06] pt-6 xl:mt-8 xl:min-h-[7.25rem] xl:pt-7'
const heroSocialBandMobile = 'mt-5 flex min-h-[5.5rem] flex-col justify-center border-t border-white/[0.06] pt-5'

/** Same vertical band as the logo strip on overview — avoids a dead gap on service panels */
function HeroSocialBand({ panel, layout }: { panel: HeroPanel; layout: 'desktop' | 'mobile' }) {
  const band = layout === 'desktop' ? heroSocialBandDesktop : heroSocialBandMobile
  const isMobile = layout === 'mobile'

  if (panel.id === 'overview') {
    if (heroClientLogos.length === 0) {
      return <div className={band} aria-hidden />
    }
    return <TrustedByLogoMarquee className={band} staticEntrance={isMobile} eyebrow="Trusted by" />
  }

  if (!panel.accentLine) {
    return <div className={band} aria-hidden />
  }

  const accentInner = (
    <>
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-500">At a glance</p>
      <p className={`${HERO_ACCORDION_COPY_MEASURE} text-[12px] leading-relaxed text-white/55 sm:text-[13px]`}>
        {panel.accentLine}
      </p>
    </>
  )

  if (isMobile) {
    return <div className={`${band} justify-center`}>{accentInner}</div>
  }

  return (
    <motion.div variants={rise} className={`${band} justify-center`}>
      {accentInner}
    </motion.div>
  )
}

type HeroProps = {
  /**
   * Homepage: 0→1 as `#service-intake` top moves from viewport bottom to top (`start end` → `start start`).
   * Drives one masked bottom seam overlay (blur + tint) as the scrolling sheet arrives.
   */
  homepageIntakeSeamProgress?: MotionValue<number> | null
}

/* ─── Component ───────────────────────────────────────────── */

export function Hero({ homepageIntakeSeamProgress = null }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const mobileSlideRefs = useRef<(HTMLElement | null)[]>([])
  const mobileScrollSuppressRef = useRef(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [accordionFlex, setAccordionFlex] = useState<{ active: number; idle: number }>({
    active: 6,
    idle: 1.35,
  })
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const m1920 = window.matchMedia('(min-width: 1920px)')
    const m1600 = window.matchMedia('(min-width: 1600px)')
    const apply = () => {
      if (m1920.matches) setAccordionFlex({ active: 6.5, idle: 1.5 })
      else if (m1600.matches) setAccordionFlex({ active: 6.25, idle: 1.55 })
      else setAccordionFlex({ active: 6, idle: 1.35 })
    }
    apply()
    m1920.addEventListener('change', apply)
    m1600.addEventListener('change', apply)
    return () => {
      m1920.removeEventListener('change', apply)
      m1600.removeEventListener('change', apply)
    }
  }, [])

  const seamProgressFallback = useMotionValue(0)
  const seamProgress = homepageIntakeSeamProgress ?? seamProgressFallback

  /** Full-hero frosted layer — intake scroll progress; wizard stays visually separate (no second blur). */
  const heroGlassOpacity = useTransform(
    seamProgress,
    [...HOMEPAGE_INTAKE_SEAM.progress],
    reduced ? [0, 0, 0, 0, 0] : [...HOMEPAGE_INTAKE_SEAM.heroGlassOpacity],
    { clamp: true },
  )
  const heroGlassBlurPx = useTransform(
    seamProgress,
    [...HOMEPAGE_INTAKE_SEAM.progress],
    reduced ? [0, 0, 0, 0, 0] : [...HOMEPAGE_INTAKE_SEAM.heroGlassBlurPx],
    { clamp: true },
  )
  const heroGlassBackdropFilter = useMotionTemplate`blur(${heroGlassBlurPx}px) saturate(1.2)`

  const next = useCallback(() => setActive((i) => (i + 1) % panels.length), [])
  const prev = useCallback(
    () => setActive((i) => (i - 1 + panels.length) % panels.length),
    [],
  )

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next, active])

  /** Mobile carousel: align scroll position when `active` changes (autoplay, progress tap, desktop N/A). */
  useLayoutEffect(() => {
    const container = mobileScrollRef.current
    const slide = mobileSlideRefs.current[active]
    if (!container || !slide) return
    const target = slide.offsetLeft
    if (Math.abs(container.scrollLeft - target) < 8) return
    mobileScrollSuppressRef.current = true
    container.scrollTo({ left: target, behavior: reduced ? 'auto' : 'smooth' })
    const done = window.setTimeout(() => {
      mobileScrollSuppressRef.current = false
    }, reduced ? 50 : 500)
    return () => clearTimeout(done)
  }, [active, reduced])

  /** Mobile carousel: swipe / drag updates `active` for timer bars + autoplay. */
  useEffect(() => {
    const c = mobileScrollRef.current
    if (!c) return
    let timeoutId: number | undefined
    const onScroll = () => {
      if (mobileScrollSuppressRef.current) return
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        const slides = mobileSlideRefs.current
        let best = 0
        let bestDist = Infinity
        const left = c.scrollLeft
        slides.forEach((el, i) => {
          if (!el) return
          const d = Math.abs(el.offsetLeft - left)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        setActive((prev) => (prev !== best ? best : prev))
      }, 120)
    }
    c.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      c.removeEventListener('scroll', onScroll)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-full min-h-0 w-full min-w-0 flex-col bg-[#0A0A0A] pt-[60px] lg:pt-[72px]"
    >
      <motion.div className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col">
      {/* Minimal abstract motion lines — parallax drift while scrolling through the hero */}
      <SubtleParallaxBackground
        scrollTargetRef={sectionRef}
        amount={34}
        scrollOffset={['start start', 'end start']}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* amber glow removed — unintentional on dark bg */}
          <SubtleParallaxBackground
            scrollTargetRef={sectionRef}
            amount={14}
            scrollOffset={['start start', 'end start']}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute left-[-20%] top-[18%] h-px w-[140%] bg-white/[0.04]"
              style={{ transformOrigin: 'center' }}
              initial={{ x: '-2%', opacity: 0.55 }}
              animate={reduced ? { x: '-2%', opacity: 0.55 } : { x: ['-2%', '4%'], opacity: [0.45, 0.7, 0.45] }}
              transition={reduced ? { duration: 0 } : { duration: 9, ease: 'linear', repeat: Infinity }}
            />
            <motion.div
              className="absolute left-[-25%] top-[42%] h-px w-[170%] bg-white/[0.04]"
              initial={{ x: '3%', opacity: 0.45 }}
              animate={reduced ? { x: '3%', opacity: 0.45 } : { x: ['3%', '-6%'], opacity: [0.35, 0.6, 0.35] }}
              transition={reduced ? { duration: 0 } : { duration: 11, ease: 'linear', repeat: Infinity }}
              style={{ transform: 'rotate(-8deg)' }}
            />
            <motion.div
              className="absolute left-[-35%] top-[68%] h-px w-[200%] bg-white/[0.04]"
              initial={{ x: '0%', opacity: 0.35 }}
              animate={reduced ? { x: '0%', opacity: 0.35 } : { x: ['0%', '6%'], opacity: [0.3, 0.55, 0.3] }}
              transition={reduced ? { duration: 0 } : { duration: 13, ease: 'linear', repeat: Infinity }}
              style={{ transform: 'rotate(10deg)' }}
            />
          </SubtleParallaxBackground>
        </div>
      </SubtleParallaxBackground>

      {/* Frost + tint sit *under* copy (z-10) so backdrop blur never softens headline glyphs. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-[#0A0A0A]/72 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
        style={{
          opacity: heroGlassOpacity,
          backdropFilter: heroGlassBackdropFilter,
          WebkitBackdropFilter: heroGlassBackdropFilter,
        }}
      />

      <div className="site-shell relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col justify-start pb-4 sm:pb-6 lg:pb-6 lg:pt-1">
        {/* ════════ Desktop: horizontal accordion ════════════ */}
        <motion.div
          className="relative hidden min-h-0 lg:flex lg:flex-1 lg:flex-col"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <div
            className="flex min-h-0 w-full min-w-0 flex-1 gap-[5px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {panels.map((panel, i) => {
              const isActive = i === active
              const stripStyle = XYLOPHONE_STRIP_STYLES[i] ?? XYLOPHONE_STRIP_STYLES[0]
              return (
                <motion.div
                  key={panel.id}
                  animate={{ flex: isActive ? accordionFlex.active : accordionFlex.idle }}
                  transition={reduced ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => !isActive && setActive(i)}
                  className={`relative h-full min-h-0 overflow-hidden rounded-card border border-white/[0.07] ${
                    isActive
                      ? 'min-w-0'
                      : 'min-w-[3.25rem] cursor-pointer group/strip xl:min-w-[3.75rem] min-[1600px]:min-w-[4.25rem] min-[1920px]:min-w-[4.75rem]'
                  }`}
                >
                  <PanelBackdrop g={panel.geometry} />

                  {/* Stepped glass (xylophone) when collapsed — smooth gradients + blur */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: reduced ? { duration: 0 } : { duration: 0.85 } }}
                        transition={reduced ? { duration: 0 } : { duration: 0.75, delay: 0.28 }}
                        className={`absolute inset-0 z-10 ${stripStyle.overlayClass}`}
                        style={stripStyle.overlayStyle}
                      />
                    )}
                  </AnimatePresence>

                  {/* Expanded: subtle bottom vignette for long tag rows */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-[1.35s]"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>

                  {/* ── Collapsed: vertical label + circled plus ── */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 0 : 1,
                      scale: isActive ? 0.92 : 1,
                    }}
                    transition={reduced ? { duration: 0 } : {
                      duration: 0.55,
                      delay: isActive ? 0 : 0.68,
                    }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 pointer-events-none"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-card border ${stripStyle.plusRing}`}
                    >
                      <Plus size={12} strokeWidth={2} className={stripStyle.plusIcon} />
                    </span>
                      <span
                        className={`[writing-mode:vertical-rl] rotate-180 text-[10px] font-semibold uppercase tracking-[0.28em] ${stripStyle.label}`}
                      >
                      {panel.category}
                    </span>
                  </motion.div>

                  {/* ── Active panel: amber edge indicator ───────── */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 z-30 w-0.5 bg-brand-500"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.6, delay: isActive ? 0.5 : 0 }}
                  />

                  {/* ── Expanded: copy column + full-width footer band ── */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key={`content-${panel.id}`}
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, transition: reduced ? { duration: 0 } : { duration: 0.08 } }}
                        className="relative z-10 flex h-full min-h-0 flex-col"
                      >
                        {/* Copy column — anchored to bottom, scrolls if short viewports */}
                        <div className="flex min-h-0 flex-1 flex-col justify-end overflow-x-hidden overflow-y-auto p-6 pt-8 pb-5 lg:p-8 lg:pt-10 lg:pb-6 min-[1920px]:p-10 min-[1920px]:pt-12 min-[1920px]:pb-7 [scrollbar-width:thin]">
                          {i === 0 ? (
                            <motion.h1
                              variants={titleRise}
                              className={`w-full ${HERO_ACCORDION_COPY_MEASURE} text-[clamp(1.9rem,3vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white antialiased min-[1600px]:text-[clamp(2rem,2.75vw,3.65rem)] min-[1920px]:text-[clamp(2.05rem,2.45vw,3.95rem)] [text-shadow:none]`}
                            >
                              <HeroHeadline panel={panel} isOverview />
                            </motion.h1>
                          ) : (
                            <motion.h2
                              variants={titleRise}
                              className={`w-full ${HERO_ACCORDION_COPY_MEASURE} text-[clamp(1.9rem,3vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white antialiased min-[1600px]:text-[clamp(2rem,2.75vw,3.65rem)] min-[1920px]:text-[clamp(2.05rem,2.45vw,3.95rem)] [text-shadow:none]`}
                            >
                              {panel.headline}
                            </motion.h2>
                          )}

                          <motion.p
                            variants={rise}
                            className={`mt-5 w-full ${HERO_ACCORDION_COPY_MEASURE} text-[13px] leading-[1.75] text-white/60 sm:text-sm min-[1920px]:text-[0.9375rem] xl:mt-6`}
                          >
                            {panel.description}
                          </motion.p>

                          <motion.div variants={rise} className={`mt-5 w-full ${HERO_ACCORDION_COPY_MEASURE} xl:mt-6`}>
                            <CTAButton
                              href={panel.cta.href}
                              variant={i === 0 ? 'primary' : 'outline'}
                              className="px-5 py-2.5 text-sm shadow-none"
                            >
                              {panel.cta.label}
                            </CTAButton>
                          </motion.div>

                          <div className={`w-full ${HERO_ACCORDION_COPY_MEASURE}`}>
                            <HeroConsultationRow />
                          </div>

                          <div className={`w-full ${HERO_ACCORDION_COPY_MEASURE}`}>
                            <HeroSocialBand panel={panel} layout="desktop" />
                          </div>
                        </div>

                        {/* Footer band — full panel width; carousel chrome lives here, not in copy */}
                        <motion.div
                          variants={rise}
                          className="shrink-0 border-t border-white/[0.08] px-6 py-4 lg:px-8 lg:py-5 min-[1920px]:px-10"
                        >
                          <div className="flex items-end justify-between gap-6">
                            <div className="min-w-0">
                              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-500">
                                What we do
                              </p>
                              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                                {panel.tags.map((tag) => (
                                  <Link
                                    key={tag.label}
                                    href={tag.href}
                                    className="text-[12px] font-medium text-white/45 transition-colors hover:text-white"
                                  >
                                    {tag.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5">
                              <button
                                onClick={(e) => { e.stopPropagation(); prev() }}
                                aria-label="Previous"
                                className="flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.14] text-white/40 transition-all hover:border-brand-500/40 hover:text-brand-400 hover:bg-white/[0.06]"
                              >
                                <ChevronLeft size={16} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); next() }}
                                aria-label="Next"
                                className="flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.14] text-white/40 transition-all hover:border-brand-500/40 hover:text-brand-400 hover:bg-white/[0.06]"
                              >
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="mt-4 flex gap-1">
                            {panels.map((p, idx) => (
                              <button
                                type="button"
                                key={p.id}
                                onClick={(e) => { e.stopPropagation(); setActive(idx) }}
                                className="hero-progress-track relative flex flex-1 items-center border-0 bg-transparent p-0"
                                aria-label={`Go to ${p.category}`}
                              >
                                <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                                  {idx === active && (
                                    <motion.div
                                      className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                                      initial={{ width: '0%' }}
                                      animate={{ width: '100%' }}
                                      transition={{ duration: paused ? 99999 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                                      key={`prog-${active}-${paused}`}
                                    />
                                  )}
                                  {idx < active && (
                                    <div className="absolute inset-0 rounded-full bg-white/50" />
                                  )}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ════════ Tablet (md–lg): pill tabs + single expanded card ════════ */}
        <motion.div
          className="hidden min-h-0 w-full min-w-0 flex-1 flex-col md:flex lg:hidden"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Hero highlights">
            {panels.map((p, idx) => (
              <button
                type="button"
                key={p.id}
                role="tab"
                aria-selected={idx === active}
                onClick={() => setActive(idx)}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  idx === active
                    ? 'border-brand-500/60 bg-brand-500/[0.12] text-brand-500'
                    : 'border-white/[0.12] bg-white/[0.03] text-white/45 hover:border-white/25 hover:text-white/75'
                }`}
              >
                {p.category}
              </button>
            ))}
          </div>

          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="wait">
              {panels.map((panel, i) =>
                i === active ? (
                  <motion.article
                    key={panel.id}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, transition: { duration: 0.15 } }}
                    transition={reduced ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative isolate flex h-full min-h-0 flex-col justify-end overflow-hidden rounded-card border border-white/[0.07] p-8 pb-6"
                  >
                    <div className="pointer-events-none absolute inset-0 -z-10">
                      <PanelBackdrop g={panel.geometry} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    </div>
                    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-brand-500" />

                    <div className="relative max-w-xl space-y-4">
                      {i === 0 ? (
                        <h1 className="whitespace-pre-line text-[clamp(2.1rem,4.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white antialiased [text-shadow:none]">
                          <HeroHeadline panel={panel} isOverview />
                        </h1>
                      ) : (
                        <h2 className="whitespace-pre-line text-[clamp(2.1rem,4.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white antialiased [text-shadow:none]">
                          {panel.headline}
                        </h2>
                      )}
                      <p className="max-w-md text-sm leading-[1.75] text-white/60">{panel.description}</p>
                      <div>
                        <CTAButton
                          href={panel.cta.href}
                          variant={i === 0 ? 'primary' : 'outline'}
                          className="px-5 py-2.5 text-sm shadow-none"
                        >
                          {panel.cta.label}
                        </CTAButton>
                      </div>
                      <HeroConsultationRow staticEntrance />
                      <div className="min-w-0">
                        <HeroSocialBand panel={panel} layout="mobile" />
                      </div>
                    </div>

                    <div className="relative mt-6 border-t border-white/[0.08] pt-4">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-500">
                        What we do
                      </p>
                      <div className="flex min-w-0 flex-wrap gap-x-5 gap-y-1.5">
                        {panel.tags.map((tag) => (
                          <Link
                            key={tag.label}
                            href={tag.href}
                            className="text-[12px] font-medium text-white/45 transition-colors hover:text-white"
                          >
                            {tag.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ) : null,
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex w-full gap-1">
            {panels.map((p, idx) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setActive(idx)}
                className="hero-progress-track relative flex flex-1 items-center border-0 bg-transparent p-0"
                aria-label={`Go to ${p.category}`}
              >
                <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                  {idx === active && (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 99999 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                      key={`tprog-${active}-${paused}`}
                    />
                  )}
                  {idx < active && <div className="absolute inset-0 rounded-full bg-white/50" />}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ════════ Mobile carousel (below md) ════════════════════ */}
        <motion.div
          className="flex min-h-0 w-full min-w-0 flex-1 flex-col md:hidden"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Hero highlights"
        >
          <div
            ref={mobileScrollRef}
            className="-mx-5 flex min-h-0 flex-1 gap-3 overflow-x-auto overflow-y-visible scroll-pl-5 scroll-pr-5 snap-x snap-mandatory px-5 pb-1 [touch-action:pan-x_pan-y] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {panels.map((panel, i) => {
              const headlineClass =
                'whitespace-pre-line text-[clamp(1.85rem,8vw,2.85rem)] font-bold leading-[1.0] tracking-[-0.03em] text-white antialiased [text-shadow:none]'
              return (
                <article
                  key={panel.id}
                  ref={(el) => {
                    mobileSlideRefs.current[i] = el
                  }}
                  aria-label={`${i + 1} of ${panels.length}: ${panel.category}`}
                  className="relative isolate flex min-h-[calc(100svh_-_140px)] w-[min(32rem,calc(100vw-2.75rem))] shrink-0 snap-start snap-always flex-col justify-end overflow-hidden rounded-card border border-white/[0.07] p-5 pb-8 sm:p-8 sm:pb-10"
                >
                  <div className="pointer-events-none absolute inset-0 -z-10">
                    <PanelBackdrop g={panel.geometry} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>
                  <div className="relative space-y-4">
                    <div>
                      <HeroCategoryChip category={panel.category} />
                    </div>
                    {i === 0 ? (
                      <h1 className={headlineClass}>
                        <HeroHeadline panel={panel} isOverview />
                      </h1>
                    ) : (
                      <h2 className={headlineClass}>{panel.headline}</h2>
                    )}
                    <p className="max-w-sm text-[13px] leading-relaxed text-white/60">{panel.description}</p>
                    <div>
                      <CTAButton
                        href={panel.cta.href}
                        variant={i === 0 ? 'primary' : 'outline'}
                        className="px-5 py-2.5 text-sm shadow-none"
                      >
                        {panel.cta.label}
                      </CTAButton>
                    </div>
                    <HeroConsultationRow staticEntrance />
                    <div className="min-w-0">
                      <HeroSocialBand panel={panel} layout="mobile" />
                    </div>
                  </div>
                  <div className="relative mt-6 flex min-w-0 flex-wrap gap-x-4 gap-y-1.5">
                    {panel.tags.map((tag) => (
                      <Link
                        key={tag.label}
                        href={tag.href}
                        className="text-[11px] font-medium text-white/45 transition-colors hover:text-white"
                      >
                        {tag.label}
                      </Link>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-4 w-full px-5">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Swipe to explore
            </p>
            <div className="flex gap-1" role="tablist" aria-label="Slides">
              {panels.map((p, idx) => (
                <button
                  type="button"
                  key={p.id}
                  role="tab"
                  aria-selected={idx === active}
                  onClick={() => setActive(idx)}
                  className="hero-progress-track relative flex flex-1 items-center border-0 bg-transparent p-0 max-sm:min-h-[44px]"
                  aria-label={`Go to ${p.category}`}
                >
                  <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                    {idx === active && (
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: paused ? 99999 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                        key={`mprog-${active}-${paused}`}
                      />
                    )}
                    {idx < active && <div className="absolute inset-0 rounded-full bg-white/50" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      </motion.div>
    </section>
  )
}
