'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const highlightPlaybooks = [
  {
    title: 'Architecture Sprint Playbook',
    description: '10-day immersion that aligns leadership, surfaces risks, and defines the delivery runway before code is written.',
    href: '/playbooks#playbook-library',
  },
  {
    title: 'Delivery Rhythm Guide',
    description: 'Shared rituals, decision logs, and metrics dashboards so squads stay accountable and stakeholders see progress.',
    href: '/playbooks#playbook-library',
  },
  {
    title: 'Reliability & Ops Handbooks',
    description: 'Runbooks, observability patterns, and escalation flows that keep platforms reliable after launch.',
    href: '/playbooks#playbook-library',
  },
]

export function PlaybooksTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black py-12 sm:py-16 md:py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-12%] h-64 w-64 rounded-full bg-brand-500/14 blur-[130px]" />
        <div className="absolute right-[-16%] bottom-[-12%] h-72 w-72 rounded-full bg-white/10 blur-[160px]" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-5xl space-y-8 sm:space-y-10"
        >
          <motion.div variants={fadeInUp} className="space-y-3 sm:space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">From the playbooks</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Frameworks we bring into every engagement</h2>
            <p className="text-sm text-white/65 sm:text-base px-4 sm:px-0">
              These aren't marketing decks—they're the operational guides we refine on pilot programmes before rolling out with partners.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {highlightPlaybooks.map(({ title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group flex h-full flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 md:p-7 transition-transform duration-200 hover:-translate-y-1 touch-manipulation"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{description}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-200 group-hover:text-brand-100">
                  View playbook
                  <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-brand-300/60">→</span>
                </span>
              </Link>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center text-sm text-white/60 px-4 sm:px-0">
            Want the full library?{' '}
            <Link href="/playbooks" className="font-semibold text-brand-200 transition hover:text-brand-100 touch-manipulation">
              Explore all playbooks
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}



