'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SITE_REVEAL_VIEWPORT, siteRevealTransition } from '@/lib/siteScrollMotion'

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  /** Vertical nudge in px when motion is enabled */
  y?: number
  delay?: number
  /** Override default reveal duration (seconds) */
  duration?: number
  /** Framer viewport margin, e.g. `-60px 0px` */
  viewportMargin?: string
}

export function ScrollReveal({
  children,
  className,
  y = 18,
  delay = 0,
  duration,
  viewportMargin,
}: ScrollRevealProps) {
  const reduced = useReducedMotion()
  const t = siteRevealTransition(delay)
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: SITE_REVEAL_VIEWPORT.once,
        margin: viewportMargin ?? SITE_REVEAL_VIEWPORT.margin,
        amount: SITE_REVEAL_VIEWPORT.amount,
      }}
      transition={{
        ...t,
        duration: reduced ? 0 : (duration ?? t.duration),
      }}
    >
      {children}
    </motion.div>
  )
}
