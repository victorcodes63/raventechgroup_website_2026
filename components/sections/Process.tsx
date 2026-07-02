'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { CTAButton } from '@/components/ui/CTAButton'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { howWeWorkSteps } from '@/lib/data/howWeWork'

function ProcessStepCard({
  index,
  title,
  description,
  prefersReducedMotion,
}: {
  index: number
  title: string
  description: string
  prefersReducedMotion: boolean
}) {
  const cardRef = useRef<HTMLElement | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '-40px 0px -40px 0px',
        threshold: 0.15,
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stepNo = String(index + 1).padStart(2, '0')

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: {
          duration: 0.55,
          ease: [0.21, 0.47, 0.32, 0.98],
          delay: index * 0.12,
        },
      }

  return (
    <motion.article
      ref={cardRef}
      {...motionProps}
      className={[
        'relative min-h-0 overflow-hidden px-0 pb-14 pt-10 transition-colors duration-200 lg:min-h-[240px]',
        isActive
          ? 'border-t-[1.5px] border-[#FFA91F]/70'
          : 'border-t border-white/[0.06]',
        'hover:border-t-[1.5px] hover:border-[#FFA91F]/70',
      ].join(' ')}
    >
      <span
        className="absolute right-0 top-6 z-0 select-none text-[180px] font-bold leading-none tracking-[-0.04em] text-white/[0.06] lg:text-[220px]"
        aria-hidden
      >
        {stepNo}
      </span>

      <div className="relative z-10 w-full min-w-0">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFA91F]/80">{stepNo}</p>
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white lg:text-2xl">{title}</h3>
        <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/55 lg:text-[15px]">{description}</p>
      </div>
    </motion.article>
  )
}

export function Process() {
  const reduced = useReducedMotion()

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="relative bg-[#0A0A0A] py-24 lg:py-32 xl:py-40"
    >
      <div className="w-full">
        <div className="site-shell">
          <div className="mb-8 md:mb-10 xl:mb-12">
            <SectionEyebrow gutterBottom={false} className="mb-2 md:mb-3">
              How we work
            </SectionEyebrow>
            <h2
              id="how-we-work-heading"
              className="max-w-4xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:max-w-5xl md:text-4xl lg:text-5xl xl:max-w-6xl 2xl:max-w-[72rem]"
            >
              From discovery to systems you can run with confidence
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-snug text-white/60 sm:max-w-3xl sm:text-[1.0625rem] sm:leading-relaxed xl:max-w-4xl">
              Four phases — same team end to end. No hand-offs to anonymous builders.
            </p>
          </div>

          <div className="relative w-full">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 xl:gap-16">
              {howWeWorkSteps.map(({ title, description }, index) => (
                <ProcessStepCard
                  key={title}
                  index={index}
                  title={title}
                  description={description}
                  prefersReducedMotion={!!reduced}
                />
              ))}
            </div>
          </div>

          <div className="mt-20 border-t border-white/[0.06] pt-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFA91F]/80">
                  What you get
                </p>
                <h3 className="max-w-xl text-2xl font-bold tracking-tight text-white lg:text-3xl">
                  One team. One accountable delivery lead. Zero black-box work.
                </h3>
              </div>
              <CTAButton href="/process" variant="outline" className="shrink-0">
                How we engage
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
