'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

import { CTAButton } from '@/components/ui/CTAButton'

/**
 * Interactive footer outro — an amber "aurora" glow rising from the bottom edge
 * that tracks the cursor horizontally (with a subtle vertical drift). The primary
 * CTA floats inside the glow, and the copyright row sits beneath it.
 *
 * Motion is transform-only (translate on GPU) and fully disabled under
 * prefers-reduced-motion, where the glow stays centered and static.
 */
export function FooterGlowOutro({ year }: { year: number }) {
  const reduced = useReducedMotion()
  const bandRef = useRef<HTMLDivElement>(null)

  // Normalized pointer position within the band: -0.5 (left/top) → 0.5 (right/bottom)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const spring = { stiffness: 90, damping: 22, mass: 0.7 }
  const smoothX = useSpring(pointerX, spring)
  const smoothY = useSpring(pointerY, spring)

  // Horizontal follow is generous; vertical drift is small so the glow keeps its horizon.
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-170, 170])
  const glowY = useTransform(smoothY, [-0.5, 0.5], [26, -22])
  const coreX = useTransform(smoothX, [-0.5, 0.5], [-90, 90])

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return
    const rect = bandRef.current?.getBoundingClientRect()
    if (!rect) return
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <div
      ref={bandRef}
      onPointerMove={handleMove}
      onPointerLeave={resetPointer}
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#0A0A0A_0%,#080808_38%,#050505_100%)]"
    >
      {/* Wide aurora — the main mouse-following glow rising from the bottom edge */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { x: glowX, y: glowY }}
        className="pointer-events-none absolute inset-x-0 bottom-[-10%] mx-auto h-[95%] w-[92%] max-w-4xl bg-[radial-gradient(80%_100%_at_50%_100%,rgba(255,169,31,0.68)_0%,rgba(255,184,63,0.38)_34%,rgba(255,169,31,0)_72%)] blur-[64px]"
      />
      {/* Tight core — brighter center with a warm-white heart, follows more gently */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { x: coreX }}
        className="pointer-events-none absolute inset-x-0 bottom-[-6%] mx-auto h-[70%] w-[46%] max-w-md bg-[radial-gradient(60%_100%_at_50%_100%,rgba(255,255,255,0.24)_0%,rgba(255,184,63,0.40)_38%,rgba(255,169,31,0)_74%)] blur-[42px]"
      />
      {/* Horizon crest — a thin amber line where the glow peaks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[52%] mx-auto h-px w-[68%] max-w-2xl bg-gradient-to-r from-transparent via-[#FFA91F]/50 to-transparent"
      />

      <div className="site-shell content-wrap relative z-10 flex flex-col items-center gap-8 py-20 text-center lg:py-28">
        <div className="flex flex-col items-center gap-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
            Build with Raven
          </span>
          <CTAButton
            href="/book"
            variant="primary"
            className="px-7 py-3.5 text-sm shadow-[0_24px_60px_-20px_rgba(255,169,31,0.6)]"
          >
            Book a discovery call
          </CTAButton>
        </div>

        <div className="mt-2 flex w-full justify-center border-t border-white/[0.05] pt-6">
          <p className="text-xs text-white/30">© {year} Raven Tech Group. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
