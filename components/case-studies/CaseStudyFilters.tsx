'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  CASE_STUDY_INDUSTRY_FILTERS,
  type IndustryFilterId,
} from '@/components/case-studies/caseStudyIndustryFilters'

type CaseStudyFiltersProps = {
  active: IndustryFilterId
  onChange: (id: IndustryFilterId) => void
}

export function CaseStudyFilters({ active, onChange }: CaseStudyFiltersProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter case studies by industry"
    >
      {CASE_STUDY_INDUSTRY_FILTERS.map((f) => {
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
