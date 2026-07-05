'use client'

import { Fragment, useEffect, useRef, useState, type RefObject } from 'react'
import Image from 'next/image'
import { motion, useTransform } from 'framer-motion'

import {
  ScrollRevealWord,
  ScrollRevealWordLines,
  ScrollRevealWords,
  splitWords,
  useSectionScrollProgress,
} from '@/components/motion/ScrollDrivenTypography'
import { CTAButton } from '@/components/ui/CTAButton'
import { SITE_EASE } from '@/lib/siteScrollMotion'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

type ProblemRowProps = {
  lines: readonly string[]
  body: string
  imageSrc: string
  imageAlt: string
  imagePosition: 'left' | 'right'
  hideImageOnMobile?: boolean
  align?: 'left' | 'right'
}

function useIsLgUp() {
  const [isLgUp, setIsLgUp] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsLgUp(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isLgUp
}

function ProblemRow({
  lines,
  body,
  imageSrc,
  imageAlt,
  imagePosition,
  hideImageOnMobile = false,
  align = 'left',
}: ProblemRowProps) {
  const isLgUp = useIsLgUp()
  const rowRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress, isReduced } = useSectionScrollProgress(rowRef as RefObject<HTMLElement | null>)

  const imageParallaxY = useTransform(
    scrollYProgress,
    [0.15, 0.8],
    isReduced ? [0, 0] : [18, -18],
    { clamp: true },
  )

  const textClasses = align === 'right' ? 'text-right' : ''
  const bodyClasses =
    align === 'right'
      ? 'ml-auto mt-6 max-w-xl text-base leading-relaxed text-white/50'
      : 'mt-6 max-w-xl text-base leading-relaxed text-white/50'
  const accentClasses =
    align === 'right' ? 'ml-auto mt-16 h-[2px] w-12 bg-[#FFA91F] lg:mt-20' : 'mt-16 h-[2px] w-12 bg-[#FFA91F] lg:mt-20'
  const imageShellClasses = hideImageOnMobile
    ? 'relative hidden h-[clamp(20rem,38vw,28rem)] min-h-[19rem] w-full overflow-hidden rounded-card border border-white/[0.06] lg:block'
    : 'relative h-[clamp(20rem,38vw,28rem)] min-h-[19rem] w-full overflow-hidden rounded-card border border-white/[0.06]'
  const shouldRenderImage = !hideImageOnMobile || isLgUp

  const imageNode = shouldRenderImage ? (
    <motion.div
      initial={isReduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={isReduced ? { duration: 0 } : { duration: 0.7, ease: SITE_EASE }}
      className={imageShellClasses}
    >
      <motion.div className="relative h-full w-full" style={{ y: imageParallaxY }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
        aria-hidden
      />
    </motion.div>
  ) : null

  const textNode = (
    <motion.div
      initial={isReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={isReduced ? { duration: 0 } : { duration: 0.6, ease: SITE_EASE, delay: 0.08 }}
      className={textClasses}
    >
      {isLgUp ? (
        <>
          <ScrollRevealWordLines
            scrollYProgress={scrollYProgress}
            range={[0.2, 0.55]}
            reduced={isReduced}
            lines={lines}
            className="text-2xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-4xl"
          />
          <motion.p
            initial={isReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={isReduced ? { duration: 0 } : { duration: 0.45, ease: SITE_EASE, delay: 0.04 }}
            className={bodyClasses}
          >
            {body}
          </motion.p>
        </>
      ) : (
        <>
          <p className="text-2xl font-bold leading-[1.08] tracking-[-0.03em] text-white">
            {lines.map((line, idx) => (
              <span key={`${idx}-${line}`} className="block">
                {line}
              </span>
            ))}
          </p>
          <motion.p
            initial={isReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={isReduced ? { duration: 0 } : { duration: 0.4, ease: SITE_EASE, delay: 0.04 }}
            className={bodyClasses}
          >
            {body}
          </motion.p>
        </>
      )}
      <motion.div
        initial={isReduced ? false : { opacity: 0, x: -8 }}
        whileInView={{ opacity: 0.8, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: isReduced ? 0 : 0.4 }}
        className={accentClasses}
      />
    </motion.div>
  )

  return (
    <div ref={rowRef} className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
      {imagePosition === 'left' || !isLgUp ? (
        <>
          {imageNode}
          {textNode}
        </>
      ) : (
        <>
          {textNode}
          {imageNode}
        </>
      )}
    </div>
  )
}

export function Problems() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress, isReduced } = useSectionScrollProgress(sectionRef)

  const bannerOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.8],
    isReduced ? [1, 1] : [0, 1],
    { clamp: true },
  )
  const bannerScale = useTransform(
    scrollYProgress,
    [0.7, 0.8],
    isReduced ? [1, 1] : [0.98, 1],
    { clamp: true },
  )
  const bannerY = useTransform(
    scrollYProgress,
    [0.7, 0.8],
    isReduced ? [0, 0] : [16, 0],
    { clamp: true },
  )

  const resHeadlineWords = splitWords('Then they call Raven.')
  const ravenIndex = resHeadlineWords.length - 1

  return (
    <section
      ref={sectionRef}
      id="problems"
      className="relative isolate -mt-px min-w-0 overflow-x-clip bg-[#0A0A0A] pt-16 pb-12 text-white sm:pb-16 sm:pt-20 md:pt-24 lg:flex lg:min-h-svh lg:items-center lg:py-0 lg:pb-24"
    >
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-5 md:px-8 lg:px-12 lg:py-16">

        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={isReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={
            isReduced
              ? { duration: 0 }
              : { duration: 0.8, ease: SITE_EASE, delay: 0.2 }
          }
        >
          <SectionEyebrow align="center">Where growth stalls</SectionEyebrow>

          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            People are rarely the problem. The systems they work in are.
          </h2>

          <div className="mt-14 flex flex-col items-center divide-y divide-white/[0.05] lg:flex-row lg:justify-center lg:divide-x lg:divide-y-0">
            <motion.div
              initial={isReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={
                isReduced
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      ease: SITE_EASE,
                      delay: 0.5,
                    }
              }
              className="py-6 lg:px-10 lg:py-0 text-center"
            >
              <p className="text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">6+</p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Platforms shipped in Kenya
              </p>
            </motion.div>

            <motion.div
              initial={isReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={
                isReduced
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      ease: SITE_EASE,
                      delay: 0.6,
                    }
              }
              className="py-6 lg:px-10 lg:py-0 text-center"
            >
              <p className="text-4xl lg:text-5xl font-bold text-[#FFA91F] tracking-[-0.03em]">3</p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Industries served
              </p>
            </motion.div>

            <motion.div
              initial={isReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={
                isReduced
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      ease: SITE_EASE,
                      delay: 0.7,
                    }
              }
              className="py-6 lg:px-10 lg:py-0 text-center"
            >
              <p className="text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">8–12</p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Weeks, brief to launch
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mx-auto mt-24 max-w-5xl lg:mt-28">
          <ProblemRow
            lines={['Finance runs on one system.', 'Operations runs on another.', 'Neither of them agrees.']}
            body="Every department bought its own tool. Now nothing reconciles and month-end takes a week."
            imageSrc="/images/photos/whatsappdesk.jpeg"
            imageAlt="Laptop and phone on a desk — teams working across disconnected tools that don't talk to each other"
            imagePosition="left"
            hideImageOnMobile
          />

          <ProblemRow
            lines={['Every report still starts', 'with someone exporting to Excel.']}
            body="By the time the numbers line up, the decision you needed them for has already passed."
            imageSrc="/images/photos/foundation.jpeg"
            imageAlt="Team reviewing consolidated reports in a workshop"
            imagePosition="right"
            align="right"
          />

          <ProblemRow
            lines={['You keep hiring people', 'to keep the old system running.']}
            body="Headcount grew faster than revenue—because the systems never scaled with the company."
            imageSrc="/images/photos/phone.jpeg"
            imageAlt="Close-up of a phone interface representing manual, people-heavy workarounds"
            imagePosition="left"
          />

        </div>

        <div className="mx-auto mt-24 max-w-3xl text-center">
          <p className="text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            {resHeadlineWords.map((word, i) => (
              <Fragment key={`res-${i}-${word}`}>
                <ScrollRevealWord
                  scrollYProgress={scrollYProgress}
                  rangeStart={0.58}
                  rangeEnd={0.66}
                  index={i}
                  count={resHeadlineWords.length}
                  reduced={isReduced}
                  className={i === ravenIndex ? 'text-[#FFA91F]' : undefined}
                >
                  {word}
                </ScrollRevealWord>
                {i < resHeadlineWords.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </p>
          <ScrollRevealWords
            scrollYProgress={scrollYProgress}
            range={[0.62, 0.72]}
            reduced={isReduced}
            text="We've seen this before. Thirty minutes is enough to know if we're a fit."
            className="mt-4 text-base leading-relaxed text-white/60"
          />
        </div>

        <div className="mx-auto mt-12 w-full min-w-0 max-w-6xl sm:mt-16 lg:mt-20">
          <motion.div
            style={{ opacity: bannerOpacity, scale: bannerScale, y: bannerY }}
            className="relative min-w-0 overflow-hidden"
          >
            <div className="relative grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">
              <div className="min-w-0">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px w-8 bg-[#FFA91F]" aria-hidden />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFA91F]">Fit check</p>
                </div>

                <div className="max-w-2xl">
                  <ScrollRevealWords
                    scrollYProgress={scrollYProgress}
                    range={[0.7, 0.75]}
                    reduced={isReduced}
                    text="Sound familiar? Usually more than one."
                    className="text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]"
                  />
                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
                    Bring the messy context. We will separate what needs a system, what needs a process change, and
                    what does not need a build at all.
                  </p>
                </div>

                <div className="mt-10 border-t border-white/[0.08]">
                  {[
                    ['01', 'No pitch deck', 'A working conversation, not a sales presentation.'],
                    ['02', 'No generic audit', 'Observations specific to your stack — not a template.'],
                    ['03', 'Clear next step', 'You leave knowing what to do, with or without us.'],
                  ].map(([number, label, detail]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-white/[0.08] py-5 sm:grid-cols-[2.5rem_13rem_1fr] sm:gap-6"
                    >
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#FFA91F]/70">{number}</span>
                      <p className="text-base font-semibold text-white sm:text-lg">{label}</p>
                      <p className="col-span-2 col-start-2 text-sm leading-relaxed text-white/45 sm:col-span-1 sm:col-start-3">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-w-0 max-w-full rounded-card border border-white/[0.08] border-t-2 border-t-[#FFA91F] bg-[#111111] p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFA91F]">
                  30-minute conversation
                </p>
                <p className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-white">
                  Know if Raven is the right team.
                </p>
                <ul className="mt-6 divide-y divide-white/[0.06] text-sm leading-relaxed text-white/60">
                  {['What is breaking', 'What should be built', 'What should wait'].map((item) => (
                    <li key={item} className="flex items-center gap-3 py-2.5">
                      <span className="h-1 w-3 shrink-0 bg-[#FFA91F]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <CTAButton href="/book" variant="primary" className="mt-8 w-full max-w-full justify-center px-5 py-3.5 text-sm sm:px-7 sm:py-4">
                  Book 30 minutes
                </CTAButton>
                <p className="mt-4 text-xs leading-relaxed text-white/38">
                  We reply within one business day with a calendar link, or a direct note if it is not a fit.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
