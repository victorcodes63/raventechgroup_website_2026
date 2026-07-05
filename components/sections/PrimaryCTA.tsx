'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CTAButton } from '@/components/ui/CTAButton'

export function PrimaryCTA() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-[#0A0A0A] py-16 sm:py-20">
      <div className="site-shell">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-card border border-white/[0.06] bg-[#111111] p-10 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,169,31,0.08),_transparent_65%)]" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-500">Let&apos;s build together</p>
            <h2 className="text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl">
              Ready to ship technology that grows with your business?
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
              Share your roadmap, RFP, or problem statement — we&apos;ll align on scope, staff the right team, and
              start delivering value within weeks.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <CTAButton href="/contact" className="px-8 py-3 text-sm">
                Book a consultation
              </CTAButton>
              <CTAButton href="/case-studies" variant="outline" className="px-8 py-3 text-sm">
                View recent work
              </CTAButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
