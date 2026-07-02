'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { CTAButton } from '@/components/ui/CTAButton'
import {
  serviceCapabilityStaggerChildVariants,
  serviceCapabilityStaggerParentVariants,
  serviceSectionHeaderChildVariants,
  serviceSectionHeaderGroupVariants,
} from '@/lib/animations'
import { candidateTraits, careersPillars, hiringSteps } from '@/lib/data/careersPage'

const VIEWPORT = { once: true, margin: '-80px' as const }

export function CareersPageContent() {
  const reducedMotion = useReducedMotion()

  return (
    <main className="min-w-0 bg-[#050505] text-white">
      <section className="relative flex min-h-[80vh] flex-col justify-center bg-[#050505] px-0 py-24 md:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_10%,rgba(255,169,31,0.035),transparent_55%)]"
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
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">Careers at Raven</p>
              </div>
              <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[3.25rem] lg:leading-[1.08]">
                <span className="text-white">Build systems that stay up.</span>
                <br />
                <span className="text-white/40">Grow with work that matters.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                Raven Tech Group is a founder-led consultancy in Westlands, Nairobi. We hire engineers and delivery
                operators who ship reliably, communicate clearly, and can support clients after launch.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <CTAButton href="mailto:careers@raventechgroup.com" variant="primary" className="px-8 py-3.5 text-sm">
                  Send your profile
                </CTAButton>
                <CTAButton href="/about" variant="outline-dark" className="px-8 py-3.5 text-sm">
                  See how we work
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-24 lg:py-32">
        <div className="site-shell">
          <div className="content-wrap">
            <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="lg:sticky lg:top-24"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">01 / Why join</p>
                </div>
                <h2 className="mt-7 text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white lg:text-5xl">
                  <span className="text-white">Small team.</span>
                  <br />
                  <span className="text-white/40">Serious delivery standards.</span>
                </h2>
                <p className="mt-7 max-w-md text-base leading-relaxed text-white/60">
                  We run lean by design. You get direct context, visible impact, and less process noise between problem
                  and execution.
                </p>
              </motion.div>

              <motion.div
                variants={serviceCapabilityStaggerParentVariants}
                initial={reducedMotion ? false : 'hidden'}
                whileInView={reducedMotion ? undefined : 'visible'}
                viewport={VIEWPORT}
                className="space-y-px bg-white/[0.06]"
              >
                {careersPillars.map((pillar, index) => (
                  <motion.article
                    key={pillar.title}
                    variants={serviceCapabilityStaggerChildVariants}
                    className="group relative bg-[#050505] p-7 transition-colors duration-300 hover:bg-[#0a0a0a] lg:p-8"
                  >
                    <div className="flex items-start gap-5 lg:gap-7">
                      <div className="flex flex-shrink-0 flex-col items-center pt-1.5">
                        <span className="font-mono text-sm font-semibold text-[#FFA91F]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="mt-2.5 h-10 w-px bg-gradient-to-b from-[#FFA91F]/40 to-transparent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-semibold leading-snug tracking-tight text-white">{pillar.title}</h3>
                        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">{pillar.description}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_750px_520px_at_12%_18%,rgba(255,169,31,0.025)_0%,transparent_62%)]"
        />
        <div className="site-shell relative">
          <div className="content-wrap">
            <motion.div
              variants={serviceSectionHeaderGroupVariants}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={VIEWPORT}
              className="max-w-3xl"
            >
              <motion.div variants={serviceSectionHeaderChildVariants} className="flex items-center gap-3">
                <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">02 / Hiring process</p>
              </motion.div>
              <motion.h2
                variants={serviceSectionHeaderChildVariants}
                className="mt-7 text-4xl font-bold leading-[1.07] tracking-[-0.02em] text-white lg:text-5xl"
              >
                Clear process. Fast feedback.
              </motion.h2>
              <motion.p
                variants={serviceSectionHeaderChildVariants}
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/60"
              >
                We respect your time. Every stage has a reason, and every candidate gets an outcome.
              </motion.p>
            </motion.div>

            <motion.div
              variants={serviceCapabilityStaggerParentVariants}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={VIEWPORT}
              className="mt-12 grid gap-5 md:grid-cols-2"
            >
              {hiringSteps.map((step) => (
                <motion.article
                  key={step.step}
                  variants={serviceCapabilityStaggerChildVariants}
                  className="rounded-card border border-white/[0.08] bg-[#111111] p-7 transition-colors duration-300 hover:bg-[#161616]"
                >
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                    Step {step.step}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{step.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-24 lg:py-28">
        <div className="site-shell">
          <div className="content-wrap">
            <div className="grid gap-8 lg:grid-cols-[6fr_6fr]">
              <motion.article
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-card border border-white/[0.08] bg-[#111111] p-8 lg:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">03 / Open roles</p>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em] text-white lg:text-4xl">No open roles today.</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                  We are not actively hiring right now. If your work aligns with our standards, send your profile and
                  links to recent projects. We keep a shortlist and reach out first when roles open.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <CTAButton href="mailto:careers@raventechgroup.com" variant="primary" className="px-7 py-3.5 text-sm">
                    Email careers@raventechgroup.com
                  </CTAButton>
                  <CTAButton href="/book" variant="outline-dark" className="px-7 py-3.5 text-sm">
                    Book a founder call
                  </CTAButton>
                </div>
              </motion.article>

              <motion.article
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-card border border-white/[0.08] bg-[#111111] p-8 lg:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">Who succeeds here</p>
                <ul className="mt-6 space-y-5">
                  {candidateTraits.map((trait) => (
                    <li key={trait.title} className="border-t border-white/[0.08] pt-5 first:border-t-0 first:pt-0">
                      <p className="text-base font-semibold leading-snug text-white">{trait.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{trait.description}</p>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] pb-24 pt-14 lg:pb-28 lg:pt-16">
        <div className="site-shell">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-card border border-white/[0.08] bg-[linear-gradient(145deg,rgba(17,17,17,0.88),rgba(10,10,10,0.96))] px-6 py-10 sm:px-8 lg:px-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">Careers</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-white lg:text-4xl">
              If your standards are high, you will fit in
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/62">
              Tell us what you have shipped, what you learned, and what you want to build next.
            </p>
            <a
              href="mailto:careers@raventechgroup.com"
              className="group/footer mt-7 inline-flex items-center text-sm font-semibold text-brand-500"
            >
              <ArrowSwapRow groupName="footer" iconSize={14} strokeWidth={2.2}>
                careers@raventechgroup.com
              </ArrowSwapRow>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
