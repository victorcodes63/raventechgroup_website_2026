'use client'

import { useMemo, useState } from 'react'
import type { Insight } from '@/lib/data/insights'
import { InsightCard } from '@/components/insights/InsightCard'
import { InsightFilters, type InsightCategoryFilter } from '@/components/insights/InsightFilters'
import { NewsletterSignup } from '@/components/shared/NewsletterSignup'

type InsightsIndexClientProps = {
  insights: Insight[]
}

function matchesCategory(insight: Insight, filter: InsightCategoryFilter): boolean {
  if (filter === 'all') return true
  return insight.category === filter
}

export function InsightsIndexClient({ insights }: InsightsIndexClientProps) {
  const [filter, setFilter] = useState<InsightCategoryFilter>('all')

  const featured = useMemo(() => insights.find((i) => i.featured), [insights])

  const filtered = useMemo(() => insights.filter((i) => matchesCategory(i, filter)), [insights, filter])

  const gridInsights = useMemo(() => {
    const showFeaturedRow = filter === 'all' && featured != null && filtered.some((i) => i.slug === featured.slug)
    if (!showFeaturedRow) return filtered
    /** Hero shows the primary featured article; grid lists everything else (no duplicate featured rows). */
    return filtered.filter((i) => !i.featured)
  }, [filtered, filter, featured])

  const showFeatured = filter === 'all' && featured != null && filtered.some((i) => i.slug === featured.slug)

  return (
    <div className="space-y-12 lg:space-y-16">
      <InsightFilters active={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <p className="rounded-card border border-white/[0.08] bg-[#111111] p-8 text-white/65">
          Nothing in this category yet. Try All, or{' '}
          <a href="/contact" className="font-semibold text-[#FFA91F] underline-offset-4 hover:underline">
            contact us
          </a>
          .
        </p>
      ) : null}

      {showFeatured && featured ? <InsightCard insight={featured} variant="featured" priority /> : null}

      {gridInsights.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">{gridInsights.map((i) => (
          <InsightCard key={i.slug} insight={i} variant="grid" />
        ))}</div>
      ) : null}

      <NewsletterSignup
        source="insights-index"
        title="Get field notes in your inbox"
        description="One honest email per month, no spam — product notes from Nairobi."
      />
    </div>
  )
}
