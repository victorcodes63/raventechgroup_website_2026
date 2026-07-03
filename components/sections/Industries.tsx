'use client'

import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Users,
  Car,
  HeartPulse,
  Landmark,
  Package,
  GraduationCap,
  Building2,
} from 'lucide-react'

import { MobileSwipeCard, MobileSwipeRail } from '@/components/ui/MobileSwipeRail'

const industries = [
  {
    icon: ShoppingBag,
    name: 'Retail & E-commerce',
    description: 'Storefronts, order management, and payment flows built for African markets — M-Pesa and beyond.',
  },
  {
    icon: Users,
    name: 'HR & Staffing',
    description: 'Recruitment pipelines, payroll dashboards, and candidate tracking that replace spreadsheet chaos.',
  },
  {
    icon: Car,
    name: 'Automotive & Parts',
    description: 'Parts catalogs, supplier layers, and inventory platforms built for scale — not WhatsApp threads.',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    description: 'Patient management, appointment systems, and compliance-ready data infrastructure.',
  },
  {
    icon: Landmark,
    name: 'Financial Services',
    description: 'Fintech integrations, lending platforms, and secure transaction infrastructure for regulated teams.',
  },
  {
    icon: Package,
    name: 'Logistics & Supply Chain',
    description: 'Tracking systems, route optimisation, and warehouse tooling that keeps operations moving.',
  },
  {
    icon: GraduationCap,
    name: 'Education & NGOs',
    description: 'LMS platforms, grant management, and beneficiary tracking built for mission-driven organisations.',
  },
  {
    icon: Building2,
    name: 'Professional Services',
    description: 'CRM, proposal tooling, and client portals that help service firms win and retain more clients.',
  },
]

export function Industries() {
  return (
    <section className="bg-[#0A0A0A] py-16 sm:py-20 md:py-28">
      <div className="site-shell">
        <div className="mb-10 sm:mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-500">Sectors we serve</p>
            <h2 className="max-w-lg text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl">
              We specifically work in your sector
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
              Deep context in the industries that matter most across East Africa and beyond — not generic software shops.
            </p>
          </div>
        </div>

        <MobileSwipeRail
          hint="Swipe sectors"
          className="md:hidden"
          aria-label="Industries we serve"
        >
          {industries.map(({ icon: Icon, name, description }, i) => (
            <MobileSwipeCard key={name} widthClassName="w-[min(78vw,300px)]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: i * 0.055 }}
                className="group h-full rounded-card border border-white/[0.06] bg-[#111111] p-5 transition duration-300 hover:border-brand-500/25 hover:bg-[#161616]"
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-card bg-white/[0.05] text-brand-400 transition group-hover:bg-brand-500/20 group-hover:text-brand-300">
                  <Icon size={18} />
                </span>
                <h3 className="text-[13px] font-bold leading-snug text-white sm:text-sm">{name}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-white/45 sm:text-[13px]">{description}</p>
              </motion.div>
            </MobileSwipeCard>
          ))}
        </MobileSwipeRail>

        <div className="hidden grid-cols-2 gap-3 sm:gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
          {industries.map(({ icon: Icon, name, description }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: i * 0.055 }}
              className="group rounded-card border border-white/[0.06] bg-[#111111] p-5 transition duration-300 hover:border-brand-500/25 hover:bg-[#161616]"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-card bg-white/[0.05] text-brand-400 transition group-hover:bg-brand-500/20 group-hover:text-brand-300">
                <Icon size={18} />
              </span>
              <h3 className="text-[13px] font-bold leading-snug text-white sm:text-sm">{name}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-white/45 sm:text-[13px]">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
