'use client'

import { useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLenis } from 'lenis/react'

/**
 * In-page scroll that rides Lenis when it is running, native window scroll otherwise.
 * `offset` matches Lenis (negative = stop above the target).
 */
export function useLenisScrollTo() {
  const lenis = useLenis()
  const reduced = useReducedMotion()

  return useCallback(
    (target: HTMLElement | number, offset = 0) => {
      if (lenis) {
        lenis.scrollTo(target, { offset, immediate: Boolean(reduced) })
        return
      }

      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' })
        return
      }

      const top = target.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
    },
    [lenis, reduced],
  )
}
