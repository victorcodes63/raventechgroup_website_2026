'use client'

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { ServiceMetricBandItem } from '@/lib/data/serviceMetricsBand'

function MetricFigure({
  item,
  reducedMotion,
}: {
  item: ServiceMetricBandItem
  reducedMotion: boolean | null
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const raw = useMotionValue(0)
  const isCount = item.kind === 'count'
  const end = isCount ? item.end : 0
  const decimals = isCount ? item.decimals ?? 0 : 0
  const formatted = useTransform(raw, (v) => {
    return decimals > 0 ? v.toFixed(decimals) : String(Math.round(v))
  })

  useEffect(() => {
    if (!isCount) return

    if (reducedMotion) {
      raw.set(end)
      return
    }
    if (!inView) return
    const controls = animate(raw, end, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [end, inView, isCount, raw, reducedMotion])

  if (item.kind === 'text') {
    return <span className="tabular-nums">{item.value}</span>
  }

  return (
    <span ref={ref} className="tabular-nums">
      {item.prefix ? <span>{item.prefix}</span> : null}
      <motion.span className="inline-block">{formatted}</motion.span>
      <span>{item.suffix}</span>
    </span>
  )
}

type MetricsBandProps = {
  metrics: ServiceMetricBandItem[]
}

export function MetricsBand({ metrics }: MetricsBandProps) {
  const reducedMotion = useReducedMotion()

  return (
    <section
      className="relative bg-[#FFA91F] py-10 text-[#0A0A0A] sm:py-12 lg:py-14"
      aria-label="Delivery outcomes"
    >
      <div className="site-shell min-w-0">
        <div className="content-wrap min-w-0">
          <div className="grid min-w-0 grid-cols-2 divide-x divide-y divide-[#0A0A0A]/10 overflow-hidden rounded-card border border-[#0A0A0A]/10 bg-[#0A0A0A]/[0.06] lg:grid-cols-4 lg:divide-y-0">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                className="flex min-w-0 flex-col justify-between gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-none tracking-[-0.04em] lg:text-[clamp(2.75rem,4vw,4.25rem)]">
                  <MetricFigure item={m} reducedMotion={reducedMotion} />
                </p>
                <p className="max-w-[11rem] text-[11px] font-semibold leading-snug tracking-[0.06em] text-[#0A0A0A]/72 sm:text-xs sm:tracking-[0.08em]">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
