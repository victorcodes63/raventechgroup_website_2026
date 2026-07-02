'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SITE_EASE, SITE_PAGE_ENTER } from '@/lib/siteScrollMotion'

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="min-w-0 overflow-x-clip"
      initial={reduced ? false : { opacity: SITE_PAGE_ENTER.opacity, y: SITE_PAGE_ENTER.y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: SITE_PAGE_ENTER.duration, ease: SITE_EASE }}
    >
      {children}
    </motion.div>
  )
}
