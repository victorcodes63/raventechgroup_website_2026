'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function InsightReadingProgress() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#FFA91F]"
      style={{
        width: reducedMotion ? '100%' : width,
      }}
    />
  )
}
