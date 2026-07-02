/**
 * Home hero — overview panel only. Logos render in grayscale.
 * Files live in: public/images/clients/
 * All logos render at the same slot size (80 × 56 px) for visual consistency.
 */
export type HeroClientLogo = {
  name: string
  file: string
  /** CSS transform scale multiplier — use sparingly to tune optical size. Default 1. */
  scale?: number
  /** Nudge mark horizontally (px). */
  offsetXPx?: number
  /** Service hero grid: use a wider cell for long marks. */
  wideSlot?: boolean
}

export const heroClientLogos: HeroClientLogo[] = [
  { name: 'Honey Box Accessories', file: 'black_logo.png' },
  { name: 'Eagle HR Consultants', file: 'logo_dark_ubxaCll.png', scale: 0.72 },
  { name: 'R4 Automotive', file: 'r4_logo.png', scale: 1.28 },
  { name: 'YouthPlus', file: 'youthplus.png' },
  { name: 'AllAxs', file: 'allaxs.png' },
]
