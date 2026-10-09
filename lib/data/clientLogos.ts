/**
 * Home hero — overview panel only. Logos render in grayscale.
 * Files live in: public/images/clients/
 * Default slot: 80 × 56 px. Long wordmarks use `wideSlot` (128 × 56).
 */
export type HeroClientLogo = {
  name: string
  file: string
  /** CSS transform scale multiplier — use sparingly to tune optical size. Default 1. */
  scale?: number
  /** Nudge mark horizontally (px). */
  offsetXPx?: number
  /** Nudge mark vertically (px). Positive is down. */
  offsetYPx?: number
  /** Service hero grid: use a wider cell for long marks. */
  wideSlot?: boolean
}

export const heroClientLogos: HeroClientLogo[] = [
  { name: 'Honey Box Accessories', file: 'black_logo.png' },
  { name: 'Eagle HR Consultants', file: 'logo_dark_ubxaCll.png', scale: 0.72 },
  { name: 'R4 Automotive', file: 'r4_logo.png', scale: 1.28 },
  { name: 'YouthPlus', file: 'youthplus.png' },
  { name: 'AllAxs', file: 'allaxs.png' },
  { name: 'BP Creatives', file: 'bp-creatives.png', scale: 0.72, offsetYPx: 1 },
  { name: 'Brown Paper', file: 'brown-paper.png', wideSlot: true },
]
