'use client'

import { motion } from 'framer-motion'
import { serviceSectionHeaderChildVariants, serviceSectionHeaderGroupVariants } from '@/lib/animations'

const SECTION_VIEWPORT = { once: true, margin: '-80px' as const }

export function AboutSectionHeader({
  eyebrow,
  title,
  titleMuted,
  description,
  reducedMotion,
  className = 'mb-12 max-w-3xl',
}: {
  eyebrow: string
  title: string
  titleMuted?: string
  description?: string
  reducedMotion: boolean | null
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={SECTION_VIEWPORT}
      variants={serviceSectionHeaderGroupVariants}
    >
      <motion.div className="flex items-center gap-3" variants={serviceSectionHeaderChildVariants}>
        <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">{eyebrow}</span>
      </motion.div>
      <motion.h2
        variants={serviceSectionHeaderChildVariants}
        className="mt-6 text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl lg:text-5xl lg:leading-[1.1]"
      >
        {titleMuted ? (
          <>
            <span className="text-white">{title}</span>{' '}
            <span className="text-white/40">{titleMuted}</span>
          </>
        ) : (
          title
        )}
      </motion.h2>
      {description ? (
        <motion.p variants={serviceSectionHeaderChildVariants} className="mt-4 text-lg leading-relaxed text-white/60">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
