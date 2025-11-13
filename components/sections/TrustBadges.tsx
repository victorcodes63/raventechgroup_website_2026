'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, CheckCircle } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

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

export function TrustBadges() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="border-t border-white/10 bg-white py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-semibold text-black sm:text-4xl">
            Why businesses trust us
          </h2>
          <p className="text-base text-black/70 sm:text-lg">
            We deliver results with security, quality, and reliability at the core.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.title}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex flex-col items-center rounded-xl border border-black/10 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10">
                  <Icon className="h-6 w-6 text-brand-500" />
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
      </div>
    </motion.section>
  )
}

