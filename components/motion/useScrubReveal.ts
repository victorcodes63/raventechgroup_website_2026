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
 * - `[data-scrub-progress]` scaleX 0→1 as its closest section travels
 * - `[data-scrub-item]` opacity + y stagger (skip with data-scrub-fade="0")
 * - `[data-scrub-rule]` amber rule drawing as the item hits the viewport
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
        root.querySelectorAll<HTMLElement>('[data-scrub-progress]').forEach((el) => {
          const trigger = el.closest('section') ?? root
          gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })
          gsap.to(el, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top 72%',
              end: 'bottom 55%',
              scrub: 0.55,
            },
          })
        })

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

        items.forEach((item) => {
          const rule = item.querySelector<HTMLElement>('[data-scrub-rule]')
          if (!rule) return
          gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
          gsap.to(rule, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              end: 'top 42%',
              scrub: 0.4,
            },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: scopeRef, dependencies: [reduced] },
  )
}
