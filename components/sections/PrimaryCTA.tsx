'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp } from '@/lib/animations'

export function PrimaryCTA() {
  return (
    <section className="border-t border-white/10 bg-black text-white">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-transparent p-10 text-center shadow-[0_40px_140px_-60px_rgba(255,169,30,0.55)] backdrop-blur-sm sm:p-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(0,0,0,0))]" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-black/60">Let’s build together</span>
            <h2 className="text-3xl font-semibold text-black sm:text-4xl">Ready to ship technology that grows with your business?</h2>
            <p className="text-sm text-black/70 sm:text-base">
              Share your roadmap, RFP, or problem statement—we’ll align on scope, assemble the right squad, and start delivering value within weeks.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-black/80"
              >
                Book a consultation
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white/60 px-8 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-white/90"
              >
                View recent work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


