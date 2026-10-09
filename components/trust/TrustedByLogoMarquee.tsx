'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import { heroAccordionRiseVariants } from '@/lib/animations'
import { heroClientLogos, type HeroClientLogo } from '@/lib/data/clientLogos'

const rise = heroAccordionRiseVariants

const LOGO_W = 80
const LOGO_W_WIDE = 128
const LOGO_H = 56

function MarqueeLogoMark({ logo }: { logo: HeroClientLogo }) {
  const scale = logo.scale ?? 1
  const offsetX = logo.offsetXPx ?? 0
  const offsetY = logo.offsetYPx ?? 0
  const slotW = logo.wideSlot ? LOGO_W_WIDE : LOGO_W
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ width: slotW, height: LOGO_H, minWidth: slotW }}
    >
      <span
        className="relative block h-full w-full"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <Image
          src={`/images/clients/${encodeURIComponent(logo.file)}`}
          alt=""
          fill
          sizes={logo.wideSlot ? '128px' : '80px'}
          className="object-contain object-center brightness-0 invert opacity-50 transition-opacity duration-200 hover:opacity-80"
        />
      </span>
    </div>
  )
}

export type TrustedByLogoMarqueeProps = {
  className?: string
  /** Label above the strip — matches hero overview default. */
  eyebrow?: string
  /** Hero overview: motion entrance. Mobile hero strips: use `staticEntrance`. */
  staticEntrance?: boolean
  /** Hero keeps labels left; contact column can center the eyebrow. */
  eyebrowAlign?: 'left' | 'center'
}

/**
 * Infinite horizontal logo strip — same CSS marquee as the hero overview (first) panel.
 */
export function TrustedByLogoMarquee({
  className = '',
  eyebrow = 'Trusted by',
  staticEntrance = false,
  eyebrowAlign = 'left',
}: TrustedByLogoMarqueeProps) {
  const logos = heroClientLogos
  if (logos.length === 0) return null

  const loop = [...logos, ...logos]

  const inner = (
    <>
      <p
        className={twMerge(
          'mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-500',
          eyebrowAlign === 'center' && 'text-center',
        )}
      >
        {eyebrow}
      </p>
      <p className="sr-only">Clients include {logos.map((l) => l.name).join(', ')}.</p>
      <div className="hero-client-marquee" aria-hidden>
        <div className="hero-client-marquee-track">
          {loop.map((logo, i) => (
            <MarqueeLogoMark key={`${logo.file}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </>
  )

  if (staticEntrance) {
    return <div className={className}>{inner}</div>
  }

  return (
    <motion.div variants={rise} className={className}>
      {inner}
    </motion.div>
  )
}
