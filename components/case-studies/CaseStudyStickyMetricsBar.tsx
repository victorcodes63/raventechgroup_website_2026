'use client'

import { useEffect, useState } from 'react'
import type { CaseStudyMetric } from '@/lib/data/caseStudies'

type CaseStudyStickyMetricsBarProps = {
  metrics: CaseStudyMetric[]
  heroId: string
}

export function CaseStudyStickyMetricsBar({ metrics, heroId }: CaseStudyStickyMetricsBarProps) {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const hero = document.getElementById(heroId)
    if (!hero) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting)
      },
      { root: null, threshold: 0, rootMargin: '-1px 0px 0px 0px' },
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [heroId])

  if (!stuck) return null

  return (
    <div className="sticky top-0 z-40 border-b border-black/20 bg-[#FFA91F] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-5 py-4 md:px-8 lg:px-12">
        {metrics.slice(0, 3).map((m) => (
          <div key={m.label} className="min-w-0 text-center">
            <p className="text-2xl font-bold tabular-nums tracking-[-0.03em] text-[#0A0A0A] md:text-3xl lg:text-4xl">
              {m.value}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0A0A0A]/75 md:text-[11px]">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
