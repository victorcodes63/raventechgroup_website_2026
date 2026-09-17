'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import { useScrubReveal } from '@/components/motion/useScrubReveal'
import { CTAButton } from '@/components/ui/CTAButton'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { SITE_EASE } from '@/lib/siteScrollMotion'
import { problemsSection } from '@/lib/data/problems'

export function Problems() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  useScrubReveal(sectionRef, { reduced })

  const { image, patterns, fitCheck } = problemsSection
  const ravenIndex = problemsSection.closeHeadline.lastIndexOf(problemsSection.closeRavenWord)
  const closeBefore = ravenIndex >= 0 ? problemsSection.closeHeadline.slice(0, ravenIndex) : problemsSection.closeHeadline
  const closeRaven = ravenIndex >= 0 ? problemsSection.closeRavenWord : ''

  return (
    <section
      ref={sectionRef}
      id="problems"
      aria-labelledby="problems-heading"
      className="relative isolate min-w-0 overflow-x-clip bg-[#0A0A0A] py-24 text-white lg:py-32"
    >
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SectionEyebrow gutterBottom={false} className="mb-3">
            {problemsSection.eyebrow}
          </SectionEyebrow>
          <h2
            id="problems-heading"
            className="text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl"
          >
            {problemsSection.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 lg:text-lg">
            {problemsSection.subline}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <motion.figure
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reduced ? { duration: 0 } : { duration: 0.7, ease: SITE_EASE }}
            className="relative lg:sticky lg:top-28 lg:col-span-5"
          >
            <div className="relative h-[22rem] w-full overflow-hidden rounded-card border border-white/[0.06] sm:h-[26rem] lg:h-[32rem]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/10 to-transparent"
                aria-hidden
              />
            </div>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-sm leading-relaxed text-white/70">
              {image.caption}
            </figcaption>
          </motion.figure>

          <div className="min-w-0 lg:col-span-7">
            <ol className="border-t border-white/[0.08]">
              {patterns.map((pattern, index) => {
                const number = String(index + 1).padStart(2, '0')
                return (
                  <li
                    key={pattern.title}
                    data-scrub-item
                    className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 overflow-hidden border-b border-white/[0.08] py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6 lg:py-8"
                  >
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#FFA91F]/70">
                      {number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">
                        {pattern.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 lg:text-base">
                        {pattern.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl text-center lg:mt-32">
          <p className="text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            {closeBefore}
            {closeRaven ? <span className="text-[#FFA91F]">{closeRaven}</span> : null}
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/60">{problemsSection.closeBody}</p>
        </div>

        <div className="mx-auto mt-12 w-full min-w-0 max-w-6xl sm:mt-16 lg:mt-20">
          <div className="relative grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-[#FFA91F]" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFA91F]">
                  {fitCheck.eyebrow}
                </p>
              </div>

              <div className="max-w-2xl">
                <h3 className="text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
                  {fitCheck.headline}
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
                  {fitCheck.body}
                </p>
              </div>

              <div className="mt-10 border-t border-white/[0.08]">
                {fitCheck.items.map((item) => (
                  <div
                    key={item.label}
                    data-scrub-item
                    data-scrub-fade="0"
                    className="relative grid grid-cols-[2.5rem_1fr] items-baseline gap-4 overflow-hidden border-b border-white/[0.08] py-5 sm:grid-cols-[2.5rem_13rem_1fr] sm:gap-6"
                  >
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#FFA91F]/70">
                      {item.number}
                    </span>
                    <p className="text-base font-semibold text-white sm:text-lg">{item.label}</p>
                    <p className="col-span-2 col-start-2 text-sm leading-relaxed text-white/45 sm:col-span-1 sm:col-start-3">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-w-0 max-w-full rounded-card border border-white/[0.08] border-t-2 border-t-[#FFA91F] bg-[#111111] p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFA91F]">
                {fitCheck.cardEyebrow}
              </p>
              <p className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-white">
                {fitCheck.cardHeadline}
              </p>
              <ul className="mt-6 divide-y divide-white/[0.06] text-sm leading-relaxed text-white/60">
                {fitCheck.cardItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-2.5">
                    <span className="h-1 w-3 shrink-0 bg-[#FFA91F]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <CTAButton
                href="/book"
                variant="primary"
                className="mt-8 w-full max-w-full justify-center px-5 py-3.5 text-sm sm:px-7 sm:py-4"
              >
                {fitCheck.cta}
              </CTAButton>
              <p className="mt-4 text-xs leading-relaxed text-white/38">{fitCheck.footnote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
