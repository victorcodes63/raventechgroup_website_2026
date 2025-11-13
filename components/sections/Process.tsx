'use client'

import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { ArrowRight, ClipboardCheck, Layers, ShieldCheck, Wrench, Shield, Award, Users, CheckCircle } from 'lucide-react'

type Step = {
  icon: typeof ClipboardCheck
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: ClipboardCheck,
    title: 'Scope & align',
    description: 'Discovery sessions, success metrics, and governance agreed upfront so everyone knows what “done” looks like.',
  },
  {
    icon: Layers,
    title: 'Architecture sprint',
    description: 'Reference architecture, rapid prototypes, and risk validation to keep surprises out of delivery.',
  },
  {
    icon: Wrench,
    title: 'Delivery cadence',
    description: 'Sprint rituals, demos, CI/CD automation, and honest status reports—accountable progress every iteration.',
  },
  {
    icon: ShieldCheck,
    title: 'Operate & uplift',
    description: 'Handover playbooks, observability, and ongoing optimisation so the platform keeps performing long after launch.',
  },
]

const badges = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'ISO 27001 compliant',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Certified development processes',
  },
  {
    icon: Users,
    title: 'Trusted Partners',
    description: '50+ successful projects',
  },
  {
    icon: CheckCircle,
    title: 'Proven Track Record',
    description: '98% client satisfaction',
  },
]

export function Process() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-white text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,18,0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,169,30,0.08)_0%,transparent_45%,rgba(14,14,18,0.06)_85%)]" />
      </div>
      <div className="container relative mx-auto px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mx-auto max-w-5xl">
          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">How we partner</p>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-black">From first workshop to steady-state operations</h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-3xl text-sm text-black/65 sm:text-base px-4 sm:px-0">
              We stay embedded—from aligning the roadmap and validating the architecture, to shipping the work and keeping it resilient in production.
            </p>
          </motion.div>

          <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <motion.div key={title} variants={fadeInUp} className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 p-5 sm:p-6 md:p-8 transition duration-300 hover:border-brand-400/60 hover:bg-brand-500/10 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-black/40">
                  {`0${index + 1}`}
                </div>
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="mt-1 inline-flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 transition duration-200 group-hover:bg-brand-500/20 group-hover:text-brand-600">
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-black">{title}</h3>
                    <p className="mt-2 sm:mt-3 text-sm text-black/65 leading-relaxed">{description}</p>
                    <ArrowRight className="mt-4 sm:mt-6 h-4 w-4 text-black/20 transition duration-200 group-hover:translate-x-1 group-hover:text-brand-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges Section */}
          <motion.div variants={fadeInUp} className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
                Why businesses trust us
              </h2>
              <p className="text-sm text-black/65 sm:text-base">
                We deliver results with security, quality, and reliability at the core.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
              {badges.map((badge) => {
                const Icon = badge.icon
                return (
                  <motion.div
                    key={badge.title}
                    variants={fadeInUp}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex flex-col items-center rounded-xl border border-black/10 bg-white/90 p-5 sm:p-6 text-center shadow-sm transition-shadow hover:shadow-md hover:border-brand-400/60"
                  >
                    <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand-500/10">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-500" />
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-black sm:text-base">
                      {badge.title}
                    </h3>
                    <p className="text-xs text-black/60 sm:text-sm">
                      {badge.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-12 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 p-6 sm:p-10 md:p-16 text-center shadow-[0_24px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur"
          >
            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 sm:gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-black/60">Explore our approach</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">Want to dive deeper into our delivery methods?</h3>
              <p className="text-sm text-black/70 sm:text-base px-4 sm:px-0">
                Browse our services to see how we apply these principles, or check out our playbooks for detailed frameworks and best practices.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
                <NextLink
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 sm:px-8 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-brand-400 min-h-[44px] touch-manipulation"
                >
                  Explore Services
                  <ArrowRight size={16} />
                </NextLink>
                <NextLink
                  href="/playbooks"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white/60 px-6 sm:px-8 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-white/90 min-h-[44px] touch-manipulation"
                >
                  View Playbooks
                  <ArrowRight size={16} />
                </NextLink>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


