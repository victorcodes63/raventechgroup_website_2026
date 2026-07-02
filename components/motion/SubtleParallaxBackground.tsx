'use client'

import type { RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type UseScrollOptions } from 'framer-motion'

type SubtleParallaxBackgroundProps = {
  /** Section (or block) whose scroll progress drives the offset */
  scrollTargetRef: RefObject<HTMLElement | null>
  children: React.ReactNode
  className?: string
  /** Max px shift at start vs end of element travel (halved each direction) */
  amount?: number
  /** Defaults to full in-viewport travel; use `['start start','end start']` for above-the-fold heroes */
  scrollOffset?: UseScrollOptions['offset']
}

/**
 * Very light translate on a full-bleed background (e.g. video) while scrolling past its section.
 * Disabled when `prefers-reduced-motion` is set.
 */
export function SubtleParallaxBackground({
  scrollTargetRef,
  children,
  className,
  amount = 14,
  scrollOffset = ['start end', 'end start'],
}: SubtleParallaxBackgroundProps) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: scrollOffset,
  })
  const half = amount * 0.5
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [half, -half])

  return (
    <motion.div className={className} style={{ y }} aria-hidden>
      {children}
    </motion.div>
  )
}
