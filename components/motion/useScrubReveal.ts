'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import type { RefObject } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type UseScrubRevealOptions = {
  reduced?: boolean | null
}

/**
 * ScrollTrigger scrub for sections that opt in via data attributes:
 * `[data-scrub-item]` opacity + y stagger (skip with data-scrub-fade="0")
 *
 * Desktop only. Honors prefers-reduced-motion.
 */
export function useScrubReveal(
  scopeRef: RefObject<HTMLElement | null>,
  options: UseScrubRevealOptions = {},
) {
  const reducedHook = useReducedMotion()
  const reduced = options.reduced ?? reducedHook

  useGSAP(
    () => {
      if (reduced) return
      const root = scopeRef.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const items = Array.from(root.querySelectorAll<HTMLElement>('[data-scrub-item]'))
        const fadeGroups = new Map<HTMLElement, HTMLElement[]>()

        items.forEach((item) => {
          if (item.dataset.scrubFade === '0') return
          const parent = item.parentElement
          if (!parent) return
          const group = fadeGroups.get(parent) ?? []
          group.push(item)
          fadeGroups.set(parent, group)
        })

        fadeGroups.forEach((group, parent) => {
          gsap.fromTo(
            group,
            { opacity: 0.28, y: 28 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: {
                trigger: parent,
                start: 'top 82%',
                end: 'top 36%',
                scrub: 0.7,
              },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope: scopeRef, dependencies: [reduced] },
  )
}
