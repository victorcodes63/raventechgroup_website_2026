/**
 * Shared scroll / reveal tokens for consistent motion across the site.
 * Use with `ScrollReveal`, route `template`, and subtle parallax layers.
 */
export const SITE_EASE = [0.22, 1, 0.36, 1] as const

export const SITE_REVEAL_VIEWPORT = {
  once: true,
  margin: '-56px 0px' as const,
  amount: 0.12 as const,
}

export function siteRevealTransition(delay = 0) {
  return {
    duration: 0.52,
    delay,
    ease: SITE_EASE,
  }
}

export const SITE_PAGE_ENTER = {
  y: 8,
  opacity: 0.97,
  duration: 0.38,
} as const

/** Extra delay per section index when stacking scroll reveals on a page */
export const SITE_SECTION_STAGGER = 0.09

/**
 * Hero full-bleed glass as `#service-intake` scrolls over the sticky hero.
 * `useScroll` target: `#service-intake`, offset `['start end','start start']`.
 * Intake keeps a flat edge — blur lives only on the hero overlay so the two don’t fight.
 */
export const HOMEPAGE_INTAKE_SEAM = {
  progress: [0, 0.1, 0.32, 0.58, 1] as const,
  /** Layer opacity (entire hero); tint comes from Tailwind on the overlay. */
  heroGlassOpacity: [0, 0.62, 0.96, 1, 1] as const,
  /** Blur ramp on the layer *below* hero copy — frosts parallax/background only, not headline glyphs. */
  heroGlassBlurPx: [0, 72, 155, 195, 220] as const,
} as const
