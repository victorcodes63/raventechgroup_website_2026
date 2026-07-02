import type { ServiceScrollNavItem } from '@/components/services/ServiceScrollNav'

import type { ServiceDetail } from './service-page-types'

/** Sidebar ids must match `id` on each `<section>` in `ServiceSections`. */
export function buildServiceNavItems(detail: ServiceDetail): ServiceScrollNavItem[] {
  const items: ServiceScrollNavItem[] = [{ id: 'what-you-get', label: 'What you get' }]

  if (detail.capabilities && detail.capabilities.length > 0) {
    items.push({ id: 'services', label: 'Services' })
  }

  if (detail.numberedBenefits && detail.numberedBenefits.length > 0) {
    items.push({ id: 'service-benefits', label: 'Service benefits' })
  }

  if (detail.deliveryApproach && detail.deliveryApproach.length > 0) {
    items.push({ id: 'how-we-work', label: 'How we work' })
  }

  if (detail.relatedCaseStudies && detail.relatedCaseStudies.length > 0) {
    items.push({ id: 'real-projects', label: 'Real projects' })
  }

  if (detail.customerFeedback && detail.customerFeedback.length > 0) {
    items.push({ id: 'customer-feedback', label: 'Customer feedback' })
  }

  if (detail.industries && detail.industries.length > 0) {
    items.push({ id: 'industries', label: 'Industries' })
  }

  if (detail.sampleTimeline && detail.sampleTimeline.length > 0) {
    items.push({ id: 'timeline', label: 'Timeline' })
  }

  if (detail.faqs && detail.faqs.length > 0) {
    items.push({ id: 'faq', label: 'FAQ' })
  }

  if (detail.relatedInsights && detail.relatedInsights.length > 0) {
    items.push({ id: 'insights', label: 'Insights' })
  }

  return items
}
