'use client'

import { useMemo, useState } from 'react'
import type { CaseStudy } from '@/lib/data/caseStudies'
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard'
import { CaseStudyFilters } from '@/components/case-studies/CaseStudyFilters'
import {
  caseStudyMatchesIndustryFilter,
  type IndustryFilterId,
} from '@/components/case-studies/caseStudyIndustryFilters'
import { CTAButton } from '@/components/ui/CTAButton'

type CaseStudiesIndexClientProps = {
  studies: CaseStudy[]
}

export function CaseStudiesIndexClient({ studies }: CaseStudiesIndexClientProps) {
  const [filter, setFilter] = useState<IndustryFilterId>('all')

  const featured = useMemo(() => studies.find((s) => s.featured), [studies])

  const filtered = useMemo(() => {
    return studies.filter((s) => caseStudyMatchesIndustryFilter(s, filter))
  }, [studies, filter])

  const gridStudies = useMemo(() => {
    const showFeatured = filter === 'all' && featured && filtered.some((s) => s.slug === featured.slug)
    return filtered.filter((s) => !showFeatured || s.slug !== featured.slug)
  }, [filtered, filter, featured])

  const showFeaturedBlock = filter === 'all' && featured != null && filtered.some((s) => s.slug === featured.slug)

  return (
    <div className="space-y-12 lg:space-y-16">
      <CaseStudyFilters active={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <p className="rounded-card border border-white/[0.08] bg-[#111111] p-8 text-white/65">
          No published case studies in this category yet. Switch filters or{' '}
          <a href="/contact" className="font-semibold text-[#FFA91F] underline-offset-4 hover:underline">
            talk to us
          </a>{' '}
          about a similar engagement.
        </p>
      ) : null}

      {showFeaturedBlock && featured ? (
        <div>
          <CaseStudyCard study={featured} variant="featured" priority />
        </div>
      ) : null}

      {gridStudies.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} variant="grid" />
          ))}
        </div>
      ) : null}

      <div className="rounded-card border border-[#FFA91F]/25 bg-gradient-to-br from-[#FFA91F]/12 via-[#0A0A0A] to-[#0A0A0A] p-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">Next step</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            See how this could work for your business
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
            Send context on your stack and timeline — we reply with a concrete next step, not a generic deck.
          </p>
        </div>
        <div className="mt-6 shrink-0 lg:mt-0">
          <CTAButton href="/book" variant="primary" className="px-8 py-4 text-base">
            Book a discovery call
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
