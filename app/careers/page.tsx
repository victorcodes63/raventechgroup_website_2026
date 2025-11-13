'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Laptop, ShieldCheck, UsersRound, Workflow } from 'lucide-react'

const perks = [
  {
    Icon: Workflow,
    title: 'Meaningful projects',
    description: 'Ship production systems for finance, public sector, and startup clients with senior support throughout the delivery lifecycle.',
  },
  {
    Icon: ShieldCheck,
    title: 'Pragmatic processes',
    description: 'Lightweight ceremonies, automated pipelines, and mentorship that keeps focus on solving problems—not bureaucracy.',
  },
  {
    Icon: UsersRound,
    title: 'Hybrid, flexible teams',
    description: 'Work primarily from Nairobi with the option to collaborate remotely across time zones on multi-disciplinary squads.',
  },
  {
    Icon: Laptop,
    title: 'Tools & growth budget',
    description: 'Annual learning stipend, conference support, and the hardware you need to do your best work.',
  },
]

export default function CareersPage() {
  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black to-zinc-950">
        <div className="container mx-auto px-4 pb-18 pt-32 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.span variants={fadeInUp} className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Careers
            </motion.span>
            <motion.h1 variants={fadeInUp} className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build resilient technology with a team that backs you to grow.
            </motion.h1>
            <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-base text-white/65 sm:text-lg">
              We’re a compact engineering, product, and security squad headquartered in Nairobi and collaborating across Africa and Europe. If you care about
              thoughtful architecture, reliable delivery, and mentoring others, we’d love to talk.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">Why work with Raven Tech Group?</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {perks.map(({ Icon, title, description }) => (
                <div key={title} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-200 hover:border-brand-400/50 hover:bg-brand-400/5">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-200 transition duration-200 group-hover:bg-brand-500/20 group-hover:text-brand-100">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm text-white/60">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-zinc-950">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Current openings</h2>
            <p className="text-sm text-white/65 sm:text-base">
              We’re not hiring at the moment, but we love meeting practitioners who care about reliable software and honest delivery. Share your background and
              we’ll reach out when opportunities open up.
            </p>
            <Link
              href="mailto:careers@raventechgroup.com"
              className="inline-flex items-center justify-center rounded-full border border-brand-400 bg-brand-400 px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-brand-300"
            >
              Email careers@raventechgroup.com
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


