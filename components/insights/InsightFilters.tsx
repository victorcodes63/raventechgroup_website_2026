'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Insight } from '@/lib/data/insights'

export type InsightCategoryFilter = 'all' | Insight['category']

const FILTERS: { id: InsightCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'kenya-market', label: 'Kenya market' },
]

type InsightFiltersProps = {
  active: InsightCategoryFilter
  onChange: (id: InsightCategoryFilter) => void
}

export function InsightFilters({ active, onChange }: InsightFiltersProps) {
  const reduced = useReducedMotion()

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter insights by category">
      {FILTERS.map((f) => {
        const isOn = active === f.id
        return (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={isOn}
            onClick={() => onChange(f.id)}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            className={`rounded-card border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
              isOn
                ? 'border-[#FFA91F]/50 bg-[#FFA91F]/15 text-[#FFA91F]'
                : 'border-white/[0.12] bg-[#111111] text-white/60 hover:border-white/25 hover:text-white/85'
            }`}
          >
            {f.label}
          </motion.button>
        )
      })}
    </div>
  )
}
