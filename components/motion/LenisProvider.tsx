'use client'

import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { usePathname } from 'next/navigation'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { LenisOptions } from 'lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  lerp: 0.09,
  anchors: { offset: -80 },
  stopInertiaOnNavigate: true,
  /** Native touch; wheel is smoothed. Avoids iOS rubber-band fights. */
  syncTouch: false,
  /** Nested overflow (menus, rails) only traps scroll when it can actually move. */
  allowNestedScroll: true,
}

function GsapLenisSync({ lenisRef }: { lenisRef: RefObject<LenisRef | null> }) {
  const pathname = usePathname()

  useLenis(() => {
    ScrollTrigger.update()
  })

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [lenisRef])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.lenis?.resize()
      ScrollTrigger.refresh()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [lenisRef, pathname])

  return null
}

type LenisProviderProps = {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<LenisRef>(null)

  return (
    <ReactLenis root options={LENIS_OPTIONS} ref={lenisRef}>
      <GsapLenisSync lenisRef={lenisRef} />
      {children}
    </ReactLenis>
  )
}
