import type { CaseStudy } from '@/lib/data/caseStudies'

export type IndustryFilterId =
  | 'all'
  | 'sacco'
  | 'fintech'
  | 'ecommerce'
  | 'hr'
  | 'automotive'
  | 'events'

export const CASE_STUDY_INDUSTRY_FILTERS: { id: IndustryFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sacco', label: 'SACCO' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'events', label: 'Events' },
  { id: 'hr', label: 'HR' },
  { id: 'automotive', label: 'Automotive' },
]

export function caseStudyMatchesIndustryFilter(study: CaseStudy, filter: IndustryFilterId): boolean {
  if (filter === 'all') return true
  return study.industrySlug === filter
}
