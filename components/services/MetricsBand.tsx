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
      className="relative bg-gradient-to-br from-[#FFA91F] via-[#FFA91F] to-[#FFB83F] py-12 text-[#0A0A0A] sm:py-14 lg:py-16"
      aria-label="Delivery outcomes"
    >
      <div className="site-shell">
        <div className="content-wrap">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:max-w-none sm:gap-x-8 lg:grid-cols-4 lg:gap-y-12">
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                className="flex flex-col gap-2 text-left"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-5xl font-bold tracking-[-0.04em] lg:text-7xl">
                  <MetricFigure item={m} reducedMotion={reducedMotion} />
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#0A0A0A]/70">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 border-t border-[#0A0A0A]/10 lg:mt-10" aria-hidden />
        </div>
      </div>
    </section>
  )
}
