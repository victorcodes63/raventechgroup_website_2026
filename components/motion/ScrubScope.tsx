'use client'

import { useRef, type ReactNode } from 'react'

import { useScrubReveal } from '@/components/motion/useScrubReveal'

type ScrubScopeProps = {
  children: ReactNode
  className?: string
}

/** Client scope for ScrollTrigger data attributes inside server-rendered pages. */
export function ScrubScope({ children, className }: ScrubScopeProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  useScrubReveal(ref)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
