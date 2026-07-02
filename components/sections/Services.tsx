'use client'

import { useState, useCallback, useRef, type RefObject } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

import { useSectionScrollProgress } from '@/components/motion/ScrollDrivenTypography'
import { CTAButton } from '@/components/ui/CTAButton'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { services as allServices } from '@/lib/data/services'

/** The seven services shown in the homepage accordion */
const ACCORDION_SLUGS = [
  'software-development',
  'web-development',
  'it-consulting',
  'cloud-solutions',
  'cybersecurity',
  'digital-transformation',
  'system-integration',
]

const services = ACCORDION_SLUGS
  .map((slug) => allServices.find((s) => s.slug === slug))
  .filter((s): s is (typeof allServices)[number] => Boolean(s))

export function Services() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress, isReduced } = useSectionScrollProgress(sectionRef as RefObject<HTMLElement | null>)

  const panelSnapYRaw = useTransform(scrollYProgress, [0.12, 0.3], isReduced ? [0, 0] : [76, 0], { clamp: true })
  const panelSnapScaleRaw = useTransform(scrollYProgress, [0.12, 0.3], isReduced ? [1, 1] : [0.965, 1], { clamp: true })
  const panelSnapY = useSpring(panelSnapYRaw, { stiffness: 330, damping: 24, mass: 0.76 })
  const panelSnapScale = useSpring(panelSnapScaleRaw, { stiffness: 330, damping: 24, mass: 0.76 })

  const contentOpacity = useTransform(scrollYProgress, [0.32, 0.5], isReduced ? [1, 1] : [0, 1], { clamp: true })
  const contentYRaw = useTransform(scrollYProgress, [0.32, 0.5], isReduced ? [0, 0] : [20, 0], { clamp: true })
  const contentY = useSpring(contentYRaw, { stiffness: 300, damping: 26, mass: 0.8 })

  const [active, setActive]   = useState<string>('software-development')
  const [hovered, setHovered] = useState<string | null>(null)
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set())

  /** Hover previews the image; active shows expanded content */
  const displaySlug    = hovered ?? active
  const displayService = services.find((s) => s.slug === displaySlug) ?? services[0]
  const displayIndex   = services.findIndex((s) => s.slug === displaySlug)
  const DisplayIcon    = displayService.Icon

  const handleImgError = useCallback((slug: string) => {
    setImgErrors((prev) => {
      const next = new Set(prev)
      next.add(slug)
      return next
    })
  }, [])

  const showImage =
    Boolean(displayService.imagePath) && !imgErrors.has(displaySlug)

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#0A0A0A] py-24 lg:flex lg:min-h-svh lg:items-center lg:py-0"
    >
      <motion.div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12 lg:py-16" style={{ y: panelSnapY, scale: panelSnapScale }}>

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <SectionEyebrow>What we build</SectionEyebrow>
          <h2 className="mb-6 max-w-2xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-5xl lg:max-w-none lg:whitespace-nowrap">
            Seven services. One technology partner.
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-white/60 lg:max-w-none lg:whitespace-nowrap">
            From SACCO portals to cloud migrations — we cover the full technology stack for Nairobi and Kenya teams.
          </p>
        </div>

        <motion.div className="hidden lg:block" style={{ opacity: contentOpacity, y: contentY }}>
        {/* ── Desktop: sticky image + accordion ───────────────────────── */}
        <div className="lg:grid lg:grid-cols-2">

          {/* Left — sticky image panel */}
          <div className="pr-12">
            <div className="sticky top-24 h-[600px] overflow-hidden rounded-card bg-[#111111]">

              {/* Image / icon fallback — fades on service change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={displaySlug}
                  className="absolute inset-0"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {showImage ? (
                    <Image
                      src={displayService.imagePath!}
                      alt={displayService.title}
                      fill
                      className="object-cover"
                      onError={() => handleImgError(displaySlug)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#161616]">
                      <DisplayIcon className="h-24 w-24 text-white/[0.06]" aria-hidden />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30" aria-hidden />

              {/* Large faded index number */}
              <span
                className="pointer-events-none absolute bottom-4 left-6 select-none text-[120px] font-bold leading-none text-white/[0.06]"
                aria-hidden
              >
                {String(displayIndex + 1).padStart(2, '0')}
              </span>

              {/* Active service label */}
              <span className="absolute bottom-8 right-8 text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
                {displayService.title}
              </span>
            </div>
          </div>

          {/* Right — vertical accordion list */}
          <div>
            {services.map((service, i) => {
              const isActive = service.slug === active

              return (
                <div
                  key={service.slug}
                  className={`border-b border-white/[0.05]${i === 0 ? ' border-t border-white/[0.05]' : ''}`}
                  onMouseEnter={() => setHovered(service.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Row header — click locks expanded state */}
                  <button
                    type="button"
                    onClick={() => setActive(service.slug)}
                    aria-expanded={isActive}
                    className="group flex w-full cursor-pointer items-center justify-between px-8 py-6"
                  >
                    <span
                      className={`text-xl font-semibold transition-colors duration-200 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/50 group-hover:text-white'
                      }`}
                    >
                      {service.title}
                    </span>
                    <span
                      className={`transition-colors duration-200 ${
                        isActive
                          ? 'text-[#FFA91F]'
                          : 'text-white/30 group-hover:text-white/60'
                      }`}
                      aria-hidden
                    >
                      {isActive
                        ? <Minus size={18} />
                        : <Plus size={18} />
                      }
                    </span>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-card bg-[#111111] p-8">
                          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/60">
                            {service.accordionDescription ?? service.description}
                          </p>

                          {service.tags && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {service.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-card border border-[#FFA91F]/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#FFA91F]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <CTAButton
                            href={service.href}
                            variant="light-outline"
                            className="mt-5 px-5 py-2 text-sm"
                          >
                            View service
                          </CTAButton>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        </motion.div>

        {/* ── Mobile: horizontal swipe cards ─────────────────────────── */}
        <div className="lg:hidden">
          <p className="-mt-2 mb-3 text-[11px] text-white/35">Swipe services</p>
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((service) => {
            const Icon = service.Icon
            const hasThumb = Boolean(service.imagePath) && !imgErrors.has(service.slug)
            return (
              <article
                key={service.slug}
                className="w-[min(88vw,420px)] shrink-0 snap-start overflow-hidden rounded-card border border-white/[0.06] bg-[#111111]"
              >
                <div className="relative h-36 w-full overflow-hidden border-b border-white/[0.06] bg-[#0A0A0A]">
                  {hasThumb ? (
                    <Image
                      src={service.imagePath!}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 88vw, 420px"
                      className="object-cover"
                      onError={() => handleImgError(service.slug)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#161616]">
                      <Icon className="h-10 w-10 text-white/[0.14]" aria-hidden />
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent backdrop-blur-[2px]"
                  />
                </div>
                <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-white/60">
                  {service.accordionDescription ?? service.description}
                </p>

                {service.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-card border border-[#FFA91F]/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#FFA91F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <CTAButton
                  href={service.href}
                  variant="light-outline"
                  className="mt-4 px-5 py-2 text-sm"
                >
                  View service
                </CTAButton>
                </div>
              </article>
            )
          })}
          </div>
        </div>

      </motion.div>
    </section>
  )
}
