'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { pageHeroBadgeVariants, pageHeroTitleVariants, pageHeroWordVariants, pageHeroDescriptionVariants, pageHeroButtonVariants } from '@/lib/animations'
import {
  CloudSolutionsIcon,
  CyberSecurityIcon,
  DigitalTransformationIcon,
  ITConsultingIcon,
  SoftwareDevelopmentIcon,
  SystemIntegrationIcon,
} from '@/components/icons/services'

const iconMap: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  'software-development': SoftwareDevelopmentIcon,
  'cloud-solutions': CloudSolutionsIcon,
  'cybersecurity': CyberSecurityIcon,
  'digital-transformation': DigitalTransformationIcon,
  'it-consulting': ITConsultingIcon,
  'system-integration': SystemIntegrationIcon,
}

type ServiceHeroProps = {
  serviceTitle: string
  overview: string
  ctaLabel: string
  heroImage?: string
  heroImageAlt?: string
  serviceSlug: string
}

export function ServiceHero({ serviceTitle, overview, ctaLabel, heroImage, heroImageAlt, serviceSlug }: ServiceHeroProps) {
  const Icon = iconMap[serviceSlug] || SoftwareDevelopmentIcon
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="space-y-6">
            <motion.span
              variants={pageHeroBadgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center rounded-full border border-brand-500/50 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-300"
            >
              {serviceTitle}
            </motion.span>
            <motion.h1
              variants={pageHeroTitleVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl font-semibold md:text-5xl"
            >
              {serviceTitle.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  variants={pageHeroWordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              variants={pageHeroDescriptionVariants}
              initial="hidden"
              animate="visible"
              className="text-lg text-white/70"
            >
              {overview}
            </motion.p>
            <motion.div
              variants={pageHeroButtonVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-brand-400"
              >
                {ctaLabel}
              </Link>
              <Link
                href="/playbooks"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition duration-200 hover:border-brand-400 hover:text-brand-300"
              >
                Explore our playbooks
              </Link>
            </motion.div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_34px_100px_-58px_rgba(15,23,42,0.65)] sm:h-72 lg:h-[360px]">
            {heroImage ? (
              <>
                <Image
                  src={heroImage}
                  alt={heroImageAlt ?? `${serviceTitle} hero`}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 600px, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-brand-500/15 text-brand-400">
                <Icon className="h-24 w-24" aria-hidden />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

