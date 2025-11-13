'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const focusAreas = [
  {
    title: 'Financial services & cooperatives',
    description:
      'Digital channels, core banking modernisation, and compliance automation for SACCOs, microfinance institutions, and growth-stage fintechs.',
    signals: ['Core system modernisation', 'Payments & KYC orchestration', 'Regulatory reporting automation'],
  },
  {
    title: 'Public sector & essential services',
    description:
      'Citizen portals, permit systems, and shared services that prioritise reliability, accessibility, and audit-ready operations.',
    signals: ['Service digitisation', 'Data-sharing platforms', 'Operational transparency'],
  },
  {
    title: 'Energy, logistics & infrastructure',
    description:
      'Operational dashboards, IoT integrations, and field-service tooling for organisations keeping cities and utilities running.',
    signals: ['Real-time monitoring', 'Workforce coordination', 'Billing and settlement systems'],
  },
  {
    title: 'Growth-stage SaaS & marketplaces',
    description:
      'Product build-outs, integrations, and scalability programmes for teams expanding across new markets and verticals.',
    signals: ['Feature velocity pressure', 'Multi-tenant architectures', 'Data integrations'],
  },
]

export function Industries() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-white py-12 sm:py-16 md:py-20 text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[-12%] h-64 w-64 rounded-full bg-black/5 blur-[130px]" />
        <div className="absolute -right-[16%] bottom-[-12%] h-[320px] w-[420px] rounded-full bg-brand-500/15 blur-[180px]" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-6xl space-y-8 sm:space-y-12"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-3 sm:space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Where we're most helpful</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">Industries & problem statements</h2>
            <p className="text-sm text-black/70 sm:text-base px-4 sm:px-0 leading-relaxed">
              We embed with teams operating critical systems—regulated, high-impact, or rapidly scaling. If these challenges feel familiar, we can help.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid gap-4 sm:gap-6 md:grid-cols-2"
          >
            {focusAreas.map(({ title, description, signals }) => (
              <div key={title} className="flex h-full flex-col gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 p-5 sm:p-6 md:p-7 shadow-[0_34px_120px_-70px_rgba(15,23,42,0.35)]">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black">{title}</h3>
                  <p className="mt-2 text-sm text-black/70 leading-relaxed">{description}</p>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-sm text-black/65">
                  {signals.map((point) => (
                    <li key={point} className="flex gap-2 leading-relaxed">
                      <span className="mt-[6px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}



