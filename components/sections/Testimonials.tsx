'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

type HomeTestimonial = {
  id: string
  quote: string
  avatarSrc: string
  avatarAlt: string
  displayName: string
  role: string
  company: string
  caseSlug: 'eagle-hr-consultants' | 'honey-box-accessories' | 'r4-automotive'
}

const homeTestimonials: HomeTestimonial[] = [
  {
    id: 'eagle-1',
    quote:
      'We serve banks, regulators, and large employers on recruitment, outsourcing, and compliance—work that used to sprawl across sheets, email, and ad hoc trackers. One system now runs a mandate from first client contact through search, interviews, and billing, so our team spends time on placements and advisory instead of reconciling who said what in which thread.',
    avatarSrc: '/images/testimonials/kirui-image.webp',
    avatarAlt: 'Moses Kirui, Head of Operations, Eagle HR Consultants',
    displayName: 'Moses Kirui',
    role: 'Head of Operations · Eagle HR Consultants',
    company: 'Eagle HR Consultants',
    caseSlug: 'eagle-hr-consultants',
  },
  {
    id: 'eagle-2',
    quote:
      'Partners and candidates meet us through our public site and job board—not a separate brochure and a hidden back office. Enquiries and applications no longer fragment across email and WhatsApp; they land in the ATS our delivery team uses daily, so we shortlist faster, give clients clearer status, and keep marketing and operations on one timeline.',
    avatarSrc: '/images/testimonials/winnie-image.webp',
    avatarAlt: 'Winnie Mbugua, Business Manager, Eagle HR Consultants',
    displayName: 'Winnie Mbugua',
    role: 'Business Manager · Eagle HR Consultants',
    company: 'Eagle HR Consultants',
    caseSlug: 'eagle-hr-consultants',
  },
  {
    id: 'honey-1',
    quote:
      "From start to finish, the team was patient, creative, and direct. They paid attention to every detail and made sure the website reflected my brand's feel. I've received so many compliments already. I would recommend their services.",
    avatarSrc: '/images/clients/honeybox-store.png',
    avatarAlt: 'Huini Macharia, Founder, Honey Box Accessories',
    displayName: 'Huini Macharia',
    role: 'Founder · Honey Box Accessories',
    company: 'Honey Box Accessories',
    caseSlug: 'honey-box-accessories',
  },
  {
    id: 'r4-1',
    quote:
      'European parts, Kenyan buyers—every quote lived in Instagram DMs and long WhatsApp threads. Raven is putting live search, KES pricing, and M-Pesa checkout on a path our customers can actually follow.',
    avatarSrc: '/images/testimonials/mechanic.png',
    avatarAlt: 'David Mwangi, workshop lead, R4 Automotive',
    displayName: 'David Mwangi',
    role: 'Workshop lead & parts desk · R4 Automotive',
    company: 'R4 Automotive',
    caseSlug: 'r4-automotive',
  },
  {
    id: 'r4-2',
    quote:
      'We are not a software company—we move BMW, VW, and Alfa parts from UK and EU suppliers into Kenya. The build gives us supplier routing, margin logic in shillings, and order visibility we never had when everything was manual back-and-forth.',
    avatarSrc: '/images/testimonials/mechanic2.png',
    avatarAlt: 'Brian Odhiambo, procurement lead, R4 Automotive',
    displayName: 'Brian Odhiambo',
    role: 'Procurement & garage operations · R4 Automotive',
    company: 'R4 Automotive',
    caseSlug: 'r4-automotive',
  },
]

interface TestimonialsProps {
  variant?: 'default' | 'contact'
}

const AUTOPLAY_MS = 6500

export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  const reducedMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const autoplayPaused = hoverPaused || focusWithin
  const n = homeTestimonials.length
  const t = homeTestimonials[current]

  const go = useCallback((dir: -1 | 1) => {
    setCurrent((i) => (i + dir + n) % n)
  }, [n])

  useEffect(() => {
    if (variant !== 'default' || reducedMotion || autoplayPaused) return
    const id = window.setInterval(() => {
      setCurrent((i) => (i + 1) % n)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [variant, reducedMotion, autoplayPaused, n])

  const bg = variant === 'contact' ? 'bg-[#111111]' : 'bg-[#0A0A0A]'
  const avatarRingOffset = variant === 'contact' ? 'ring-offset-[#111111]' : 'ring-offset-[#0A0A0A]'

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className={`${bg} py-16 sm:py-20 md:py-28`}
      onPointerEnter={() => setHoverPaused(true)}
      onPointerLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusWithin(false)
        }
      }}
    >
      <div className="site-shell flex flex-col" style={{ minHeight: 'clamp(420px, 55vh, 580px)' }}>

        <SectionEyebrow gutterBottom={false} className="mb-3">
          What clients say
        </SectionEyebrow>
        <p className="mb-6 max-w-xl text-sm font-medium leading-snug tracking-tight text-white/50 md:mb-8">
          Trusted by SMEs, founders, and ops teams across Africa.
        </p>

        {/* Main: rails + quote */}
        <div className="flex flex-1 items-center gap-0 sm:gap-12 lg:gap-16">

          {/* Vertical navigation rails — desktop/tablet only; mobile advances automatically. */}
          <div className="hidden shrink-0 flex-col gap-2.5 sm:flex" role="tablist" aria-label="Choose testimonial">
            {homeTestimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                onClick={() => setCurrent(i)}
                className="group relative h-0.5 w-10 rounded-full bg-white/[0.12] transition-colors hover:bg-white/25"
                aria-label={`Quote from ${item.company}`}
              >
                {i === current && (
                  <motion.span
                    layoutId="rail-active"
                    className="absolute inset-0 rounded-full bg-brand-500"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Quote */}
          <div className="flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="text-pretty text-[1.45rem] font-medium leading-[1.35] tracking-tight text-white sm:text-2xl md:text-[1.85rem] md:leading-[1.28] lg:text-[2.15rem]"
              >
                <h2 id="testimonials-heading" className="sr-only">Client testimonials</h2>
                &ldquo;{t.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom bar: thumbnails + attribution + arrows */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.04] pt-8 sm:flex-row sm:items-center sm:justify-between">

          {/* Left: thumbnails + attribution */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Thumbnail squares */}
            <div className="flex items-center gap-1.5">
              {homeTestimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Show quote from ${item.company}`}
                  className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-card transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFA91F] ${
                    i === current
                      ? `ring-2 ring-[#FFA91F]/70 ring-offset-2 ${avatarRingOffset}`
                      : 'opacity-70 ring-1 ring-white/[0.08] hover:opacity-100 hover:ring-white/20'
                  }`}
                >
                  <Image
                    src={item.avatarSrc}
                    alt={item.avatarAlt}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </button>
              ))}
            </div>

            {/* Attribution */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="border-l-2 border-brand-500 pl-3.5"
              >
                <p className="text-sm font-semibold text-white">{t.displayName}</p>
                <p className="mt-0.5 text-xs text-white/45">{t.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: case study link + arrows */}
          <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">
            <Link
              href={`/case-studies/${t.caseSlug}`}
              className="hidden text-xs font-semibold text-brand-500/70 transition hover:text-brand-400 sm:block"
            >
              Read case study →
            </Link>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/[0.1] bg-white/[0.04] text-white/50 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/[0.1] bg-white/[0.04] text-white/50 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
