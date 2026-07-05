import type { ServiceDetail } from '@/app/services/[slug]/service-page-types'

import { EAGLE_HR_WEBSITE_IMAGE } from '@/lib/data/caseStudies'

/** Related reading cards on service pages — insights and case studies with live routes. */
export const SERVICE_PAGE_RELATED_INSIGHTS: NonNullable<ServiceDetail['relatedInsights']> = [
  {
    title: "How we shipped Eagle HR's ATS in 12 weeks",
    excerpt: 'Scope locking, data model, and delivery cadence for a full HR operating system.',
    slug: 'eagle-hr-consultants',
    href: '/case-studies/eagle-hr-consultants',
    readTime: 'Case study',
    image: EAGLE_HR_WEBSITE_IMAGE,
  },
  {
    title: 'M-Pesa integration in Next.js — a production walkthrough',
    excerpt: 'Production patterns from R4 Automotive — OAuth, STK push, and callback discipline.',
    slug: 'mpesa-daraja-nextjs-production-integration',
    readTime: '14 min read',
    image: '/images/photos/collage-2.jpg',
  },
  {
    title: 'SACCO digital transformation — mistakes we see in Nairobi',
    excerpt: 'What Kenyan SACCOs get wrong when going digital — and how to avoid them.',
    slug: 'sacco-digital-transformation-mistakes-kenya',
    readTime: '10 min read',
    image: '/images/photos/collage-3.jpg',
  },
]
