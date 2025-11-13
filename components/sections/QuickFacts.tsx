'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const facts = [
  { label: 'Headquarters', value: 'Nairobi, Kenya', description: 'Hybrid squads anchored in Westlands, serving teams across Africa.' },
  { label: 'Founded', value: '2024', description: 'Privately held, focused on long-term engineering partnerships.' },
  { label: 'Tooling stack', value: 'TypeScript • React • Node.js', description: 'Shipping on AWS with Terraform, GitHub Actions, and observability baked in.' },
  { label: 'Core focus', value: 'IT services & consulting', description: 'Building scalable software, cloud, and secure operations.' },
]

export function QuickFacts() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-black to-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,169,30,0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,169,30,0.06)_0%,transparent_45%,rgba(255,255,255,0.05)_100%)]" />
      </div>
      <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-18 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="mb-8 sm:mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">Fast facts</p>
              <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white">The snapshot on Raven Tech Group</h2>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-semibold text-white transition duration-200 hover:border-brand-400 hover:text-brand-200 min-h-[44px] touch-manipulation"
            >
              Learn more about us
            </Link>
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            {facts.map((fact, index) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] px-4 sm:px-6 py-4 sm:py-5 transition duration-200 hover:border-brand-400/40 hover:bg-brand-400/5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">{fact.label}</p>
                <p className="mt-2 text-base sm:text-lg font-semibold text-white group-hover:text-brand-200">{fact.value}</p>
                <p className="mt-2 sm:mt-3 text-sm text-white/60 leading-relaxed">{fact.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


