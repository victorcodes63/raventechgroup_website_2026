'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Image from 'next/image'
import {
  ShieldCheck,
  UsersRound,
  Workflow,
  Building2,
  Compass,
  Rocket,
  Share2,
  Radar,
} from 'lucide-react'

const differentiators = [
  {
    icon: UsersRound,
    title: 'Direct access, no layers',
    description: 'You speak to the people building your product—the engineers, designers, and delivery leads actually doing the work.',
  },
  {
    icon: Workflow,
    title: 'Structured delivery playbooks',
    description: 'Discovery, architecture, production, and operations run on shared playbooks tuned for regulated and growth-stage teams.',
  },
  {
    icon: Rocket,
    title: 'Acceleration beyond launch',
    description: 'We stay on to help teams ship new features, optimise performance, and scale cloud infrastructure responsibly.',
  },
]

const bulletPoints = [
 'Multidisciplinary team spanning software, cloud, security, and consulting.',
 'Partnership model tuned for SMEs, financial services, and public institutions.',
  'Hybrid delivery: in-person strategy in Nairobi complemented by global partners across time zones.',
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-white/10 bg-white text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-24 h-72 w-72 rounded-full bg-black/7 blur-[120px]" />
        <div className="absolute right-[-18%] bottom-0 h-[380px] w-[480px] rounded-full bg-brand-500/20 blur-[160px]" />
      </div>
      <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mx-auto max-w-6xl space-y-12 sm:space-y-16">
          <motion.div
            variants={fadeInUp}
            className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-end"
          >
            <div className="flex h-full flex-col gap-4 sm:gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">Who we are</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
                Raven Tech Group builds the systems ambitious African businesses rely on.
            </h2>
              <p className="text-sm text-black/70 sm:text-base leading-relaxed">
                Founded in 2024 and operating from Nairobi&apos;s Westlands district, we help organisations modernise their platforms, automate operations, and
                ship new digital products. We favour honest collaboration, clean architecture, and ongoing support over one-off launches.
              </p>
              <p className="text-sm text-black/70 sm:text-base leading-relaxed">
                Whether you need a dedicated squad for a regulated fintech platform or software engineers to co-create a modernisation roadmap, our teams plug
                into your workflows and stay engaged until the results are measurable.
              </p>
              <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-sm text-black/65">
                {bulletPoints.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="relative top-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-full min-h-[280px] sm:min-h-[340px] max-h-[460px] overflow-hidden rounded-2xl sm:rounded-3xl border border-black/5 shadow-[0_34px_90px_-48px_rgba(15,23,42,0.35)]">
              <Image
                src="/images/photos/rec3.jpg"
                alt="Raven Tech Group studio reception area"
                fill
                priority
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, 100vw"
                className="object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/32 via-black/18 to-black/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-4 sm:gap-6 sm:grid-cols-3">
            {differentiators.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group flex h-full flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 p-4 sm:p-6 text-black transition duration-200 hover:border-brand-400/60 hover:bg-brand-400/10"
              >
                <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-black/5 text-brand-400 transition duration-200 group-hover:bg-brand-400/20 group-hover:text-brand-100">
                  <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black">{title}</h3>
                  <p className="mt-2 text-sm text-black/70">{description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

