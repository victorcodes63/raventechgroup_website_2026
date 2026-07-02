'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'
import { CTAButton } from '@/components/ui/CTAButton'
import { getServiceHeroStats } from '@/lib/data/serviceHeroStats'

function heroSubcopy(overview: string): string {
  const t = overview.trim()
  let periods = 0
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '.' && (t[i + 1] === ' ' || t[i + 1] === undefined || i === t.length - 1)) {
      periods += 1
      if (periods === 2) {
        return t.slice(0, i + 1).trim()
      }
    }
  }
  return t
}

type ServiceHeroProps = {
  slug: string
  serviceTitle: string
  overview: string
  heroImage: string
  heroImageAlt: string
  ctaLabel: string
  heroEyebrow?: string
  heroHeadline?: string
  heroHeadlineSub?: string
  heroHeadlineSub2?: string
  awardBadges?: { name: string; logo: string }[]
}

export function ServiceHero({
  slug,
  serviceTitle,
  overview,
  heroImage,
  heroImageAlt,
  ctaLabel,
  heroEyebrow,
  heroHeadline,
  heroHeadlineSub,
  heroHeadlineSub2,
  awardBadges,
}: ServiceHeroProps) {
  const reducedMotion = useReducedMotion()
  const noiseId = useId().replace(/:/g, '')
  const eyebrowText = heroEyebrow ?? 'Engineering'
  const line1 = heroHeadline ?? serviceTitle
  const line2 = heroHeadlineSub
  const line3 = heroHeadlineSub2
  const subcopy = heroSubcopy(overview)
  const stats = getServiceHeroStats(slug)
  const contactPrefill = encodeURIComponent(
    `I'm exploring ${serviceTitle} — context and what I need from Raven:`,
  )

  const instant = reducedMotion ? { opacity: 1, y: 0, x: 0 } : undefined
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section className="relative min-h-[min(88vh,52rem)] overflow-x-clip bg-[#0A0A0A] lg:min-h-[min(92vh,56rem)]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover object-[center_35%] lg:object-center"
          sizes="100vw"
          priority
        />
        {/* Readability: dark wash + bottom fade into page */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/82 to-[#0A0A0A]/45 lg:via-[#0A0A0A]/70"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/25 to-[#0A0A0A]/30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-[min(42%,520px)] bg-gradient-to-l from-[#0A0A0A]/80 via-[#0A0A0A]/25 to-transparent lg:block"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-soft-light"
          aria-hidden
        >
          <filter id={`grain-${noiseId}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${noiseId})`} />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-[min(88vh,52rem)] flex-col justify-center pt-[88px] lg:min-h-[min(92vh,56rem)] lg:pt-[72px]">
        <div className="site-shell pb-16 pt-8 lg:pb-24 lg:pt-12">
          <div className="content-wrap">
            <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
              {/* Left: category, title, lead, single CTA — ELEKS-style alignment */}
              <div className="lg:col-span-7 xl:col-span-6">
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={instant ?? { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.05, ease }}
                  className="mb-6 flex items-center gap-3"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-brand-500 ring-2 ring-brand-500/35"
                    aria-hidden
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                    {eyebrowText}
                  </span>
                </motion.div>

                <div className="max-w-3xl">
                  <motion.h1
                    className="text-[clamp(2.25rem,5.2vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
                    initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                    animate={instant ?? { opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.1, ease }}
                  >
                    <span className="block text-white">{line1}</span>
                    {line2 ? (
                      <span className="mt-2 block text-white/40">{line2}</span>
                    ) : null}
                    {line3 ? (
                      <span className="mt-2 block text-white/40">{line3}</span>
                    ) : null}
                  </motion.h1>
                </div>

                <motion.p
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={instant ?? { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.22, ease }}
                  className="mt-6 max-w-xl text-base leading-[1.75] text-white/72 md:text-lg"
                >
                  {subcopy}
                </motion.p>

                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={instant ?? { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.32, ease }}
                  className="mt-10"
                >
                  <CTAButton
                    href={`/contact?prefillMessage=${contactPrefill}`}
                    variant="primary"
                    className="px-7 py-3 text-sm"
                  >
                    {ctaLabel}
                  </CTAButton>
                </motion.div>
              </div>

              {/* Right: certification-style marks or credibility strip */}
              <motion.aside
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={instant ?? { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.28, ease }}
                className="flex flex-col gap-5 border-t border-white/[0.08] pt-10 lg:col-span-5 lg:border-t-0 lg:pt-0 xl:col-span-6"
              >
                {awardBadges && awardBadges.length > 0 ? (
                  <div className="flex flex-wrap items-center justify-start gap-6 lg:ml-auto lg:justify-end">
                    {awardBadges.map((b) => (
                      <div
                        key={b.name}
                        className="relative h-10 w-[7.5rem] opacity-90 grayscale transition-all duration-300 hover:grayscale-0 sm:h-11 sm:w-32"
                      >
                        <Image
                          src={b.logo}
                          alt={b.name}
                          fill
                          className="object-contain object-left lg:object-right"
                          sizes="128px"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-4 text-left lg:ml-auto lg:max-w-sm lg:text-right">
                    {stats.map((label) => (
                      <li
                        key={label}
                        className="border-b border-white/[0.06] pb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/50 last:border-0 last:pb-0 lg:text-xs"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-left text-xs leading-relaxed text-white/35 lg:max-w-xs lg:ml-auto lg:text-right">
                  <Link href="/case-studies" className="text-white/55 underline-offset-4 transition-colors hover:text-brand-400">
                    See published work
                  </Link>
                  {' · '}
                  Westlands, Nairobi
                </p>
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
