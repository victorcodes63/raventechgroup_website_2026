import {
  BODY_COST_KENYA_HTML,
  BODY_MPESA_HTML,
  BODY_SACCO_MISTAKES_HTML,
} from '@/lib/data/insightsBodies'

export type InsightAuthor = {
  name: string
  role: string
  avatar?: string
  bio: string
}

export type InsightTocItem = {
  id: string
  label: string
  level: 2 | 3
}

export type Insight = {
  slug: string
  title: string
  excerpt: string
  category: 'engineering' | 'strategy' | 'kenya-market'
  categoryLabel: string
  heroImage: string
  heroImageAlt: string
  publishedAt: string
  updatedAt?: string
  readingTime: string
  author: InsightAuthor
  tableOfContents: InsightTocItem[]
  /** Sanitized HTML — headings carry id attributes aligned with tableOfContents */
  body: string
  keywords: string[]
  metaTitle: string
  metaDescription: string
  relatedSlugs: string[]
  featured: boolean
}

const VICTOR: InsightAuthor = {
  name: 'Victor Chumo',
  role: 'Managing Director, Raven Tech Group',
  bio:
    'Victor founded Raven Tech Group in 2024 after a decade building software across East Africa. He leads engagements for SACCOs, fintechs, and growth-stage businesses from Westlands, Nairobi.',
  avatar: '/images/team/victor-chumo.jpg',
}

export const insights: Insight[] = [
  {
    slug: 'mpesa-daraja-nextjs-production-integration',
    title: 'Integrating M-Pesa Daraja into Next.js — a production walkthrough',
    excerpt:
      "Production-grade M-Pesa integration for Kenyan Next.js applications. STK Push, C2B callbacks, error handling, and the things Safaricom's docs do not tell you.",
    category: 'engineering',
    categoryLabel: 'Engineering',
    heroImage: '/images/insights/mpesa-integration-hero.jpg',
    heroImageAlt: 'Safaricom M-Pesa mobile payment interface next to code editor',
    publishedAt: '2026-04-20',
    readingTime: '12 min read',
    author: VICTOR,
    tableOfContents: [
      { id: 'what-you-need-before-you-start', label: 'What you need before you start', level: 2 },
      {
        id: 'the-mpesa-daraja-api-what-each-endpoint-actually-does',
        label: 'The M-Pesa Daraja API — what each endpoint actually does',
        level: 2,
      },
      { id: 'setting-up-environment-variables-safely', label: 'Setting up environment variables safely', level: 2 },
      { id: 'building-the-oauth-token-service', label: 'Building the OAuth token service', level: 2 },
      { id: 'implementing-stk-push', label: 'Implementing STK Push', level: 2 },
      { id: 'handling-the-callback-the-right-way', label: 'Handling the callback the right way', level: 2 },
      { id: 'error-handling-and-retry-logic', label: 'Error handling and retry logic', level: 2 },
      { id: 'testing-with-the-safaricom-sandbox', label: 'Testing with the Safaricom sandbox', level: 2 },
      { id: 'going-to-production-what-changes', label: 'Going to production — what changes', level: 2 },
      {
        id: 'common-production-issues-and-how-to-debug-them',
        label: 'Common production issues and how to debug them',
        level: 2,
      },
    ],
    body: BODY_MPESA_HTML,
    keywords: [
      'M-Pesa Daraja Next.js',
      'M-Pesa STK Push integration',
      'Safaricom Daraja API tutorial',
      'M-Pesa payment Next.js 14',
      'Kenya fintech integration',
      'M-Pesa callback handler',
    ],
    metaTitle: 'M-Pesa Daraja Integration for Next.js — Production Guide 2026 | Raven Tech Group',
    metaDescription:
      'Complete guide to integrating M-Pesa Daraja API into Next.js applications. STK Push, callbacks, error handling, and what Safaricom docs miss. Real code from R4 Automotive production build.',
    relatedSlugs: ['sacco-digital-transformation-mistakes-kenya', 'custom-software-cost-kenya-2026'],
    featured: true,
  },
  {
    slug: 'sacco-digital-transformation-mistakes-kenya',
    title: 'The 7 software mistakes Kenyan SACCOs make when going digital',
    excerpt:
      'After working with multiple Kenyan SACCOs on digital transformation, these are the recurring mistakes I see — and the patterns that actually work.',
    category: 'strategy',
    categoryLabel: 'Strategy',
    heroImage: '/images/insights/sacco-mistakes-hero.jpg',
    heroImageAlt: 'Members at a SACCO meeting with documents and mobile phones',
    publishedAt: '2026-04-20',
    readingTime: '11 min read',
    author: VICTOR,
    tableOfContents: [
      { id: 'why-saccos-are-especially-hard-to-digitise-well', label: 'Why SACCOs are especially hard to digitise well', level: 2 },
      {
        id: 'mistake-1-copying-bank-ui-patterns-for-a-member-owned-model',
        label: 'Mistake 1: Copying bank UI patterns for a member-owned model',
        level: 2,
      },
      {
        id: 'mistake-2-underestimating-the-loan-approval-workflow',
        label: 'Mistake 2: Underestimating the loan approval workflow',
        level: 2,
      },
      {
        id: 'mistake-3-building-member-portals-before-member-data-is-clean',
        label: 'Mistake 3: Building member portals before member data is clean',
        level: 2,
      },
      {
        id: 'mistake-4-not-planning-for-audit-trails-from-day-one',
        label: 'Mistake 4: Not planning for audit trails from day one',
        level: 2,
      },
      {
        id: 'mistake-5-choosing-vendors-based-on-price-not-on-kenya-specific-knowledge',
        label: 'Mistake 5: Choosing vendors based on price, not on Kenya-specific knowledge',
        level: 2,
      },
      {
        id: 'mistake-6-launching-without-board-buy-in-on-the-operational-change',
        label: 'Mistake 6: Launching without board buy-in on the operational change',
        level: 2,
      },
      {
        id: 'mistake-7-treating-the-website-and-the-system-as-separate-projects',
        label: 'Mistake 7: Treating the website and the system as separate projects',
        level: 2,
      },
      { id: 'what-to-do-instead', label: 'What to do instead', level: 2 },
    ],
    body: BODY_SACCO_MISTAKES_HTML,
    keywords: [
      'SACCO digital transformation Kenya',
      'SACCO software mistakes',
      'SACCO technology Nairobi',
      'cooperative society software Kenya',
      'SACCO core banking system',
      'SACCO digitisation',
    ],
    metaTitle: 'SACCO Digital Transformation Mistakes Kenya 2026 | Raven Tech Group',
    metaDescription:
      '7 mistakes Kenyan SACCOs make when digitising their operations — and how to avoid them. From loan workflow to audit trails, practical lessons from a Nairobi-based software consultancy.',
    relatedSlugs: ['mpesa-daraja-nextjs-production-integration', 'custom-software-cost-kenya-2026'],
    featured: false,
  },
  {
    slug: 'custom-software-cost-kenya-2026',
    title: 'How much does custom software cost in Kenya? A transparent 2026 breakdown',
    excerpt:
      'Nobody talks about software pricing in Kenya. Here are real numbers — what Raven charges, what the market charges, and what you are actually paying for.',
    category: 'kenya-market',
    categoryLabel: 'Kenya Market',
    heroImage: '/images/insights/cost-breakdown-hero.jpg',
    heroImageAlt: 'Desk with laptop and financial planning notes',
    publishedAt: '2026-04-20',
    readingTime: '12 min read',
    author: VICTOR,
    tableOfContents: [
      { id: 'why-this-article-exists', label: 'Why this article exists', level: 2 },
      { id: 'the-three-pricing-models-in-kenya', label: 'The three pricing models in Kenya', level: 2 },
      { id: 'typical-ranges-for-common-project-types', label: 'Typical ranges for common project types', level: 2 },
      { id: 'what-goes-into-the-price-really', label: 'What goes into the price — really', level: 2 },
      { id: 'where-kenyan-agencies-cut-corners', label: 'Where Kenyan agencies cut corners', level: 2 },
      {
        id: 'fixed-price-vs-time-and-materials-honest-tradeoffs',
        label: 'Fixed price vs time and materials — honest tradeoffs',
        level: 2,
      },
      { id: 'red-flags-when-someone-quotes-you', label: 'Red flags when someone quotes you', level: 2 },
      { id: 'how-we-price-at-raven-tech-group', label: 'How we price at Raven Tech Group', level: 2 },
    ],
    body: BODY_COST_KENYA_HTML,
    keywords: [
      'custom software cost Kenya',
      'software development price Nairobi',
      'app development cost Kenya 2026',
      'SACCO platform cost',
      'HRMS pricing Kenya',
      'software consultancy rates Kenya',
    ],
    metaTitle: 'How Much Does Custom Software Cost in Kenya? 2026 Pricing Guide | Raven Tech Group',
    metaDescription:
      'Transparent pricing for custom software development in Kenya. Real ranges for websites, SACCO platforms, HRMS systems, and mobile apps. What agencies charge and what you actually get.',
    relatedSlugs: ['mpesa-daraja-nextjs-production-integration', 'sacco-digital-transformation-mistakes-kenya'],
    featured: false,
  },
]

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug)
}

export const insightsOrderedFeaturedFirst: Insight[] = [...insights].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  return b.publishedAt.localeCompare(a.publishedAt)
})
