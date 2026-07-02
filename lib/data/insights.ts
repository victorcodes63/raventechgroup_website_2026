import {
  BODY_COST_KENYA_HTML,
  BODY_MPESA_HTML,
  BODY_SACCO_MISTAKES_HTML,
} from './insightsBodies'

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
  category: 'fintech-mpesa' | 'sacco-cooperative' | 'kenya-market'
  categoryLabel: 'M-Pesa & Fintech' | 'SACCO & Cooperatives' | 'Kenya Tech Market'
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
  /** Full article body shipped — eligible for index/sitemap */
  isPublished: boolean
}

const INSIGHT_BODY_BY_SLUG: Record<string, string> = {
  'mpesa-daraja-nextjs-production-integration': BODY_MPESA_HTML,
  'sacco-digital-transformation-mistakes-kenya': BODY_SACCO_MISTAKES_HTML,
  'cost-of-fintech-infrastructure-kenya-2026': BODY_COST_KENYA_HTML,
}

/** Slugs with full article bodies — safe to index and list publicly */
export const PUBLISHED_INSIGHT_SLUGS: ReadonlySet<string> = new Set(Object.keys(INSIGHT_BODY_BY_SLUG))

const INSIGHT_HERO_BY_SLUG: Record<string, string> = {
  'mpesa-daraja-nextjs-production-integration': '/images/photos/collage-2.jpg',
  'sacco-digital-transformation-mistakes-kenya': '/images/photos/collage-3.jpg',
  'cost-of-fintech-infrastructure-kenya-2026': '/images/photos/collage-1.jpg',
}

const VICTOR: InsightAuthor = {
  name: 'Victor Chumo',
  role: 'Managing Director, Raven Tech Group',
  bio:
    'Victor founded Raven Tech Group in 2024 after a decade building software across East Africa. He leads engagements for SACCOs, fintechs, and growth-stage businesses from Westlands, Nairobi.',
  avatar: '/images/website-potrait.png',
}

type InsightDraft = Omit<
  Insight,
  'author' | 'heroImage' | 'heroImageAlt' | 'publishedAt' | 'body' | 'isPublished'
>

function outlineBodyFromToc(items: InsightTocItem[]): string {
  const sections = items
    .map((item) => {
      const tag = item.level === 2 ? 'h2' : 'h3'
      return `<${tag} id="${item.id}">${item.label}</${tag}><p>This section outlines the decisions, implementation approach, and operator considerations Victor will expand with project-grounded detail.</p>`
    })
    .join('\n')

  return sections.trim()
}

const INSIGHT_DRAFTS: InsightDraft[] = [
  {
    slug: 'mpesa-daraja-nextjs-production-integration',
    title: 'M-Pesa integration in Next.js — a production walkthrough',
    excerpt:
      'A practical implementation map for production M-Pesa flows in Next.js, from auth and STK requests to callback reliability. Built for teams shipping real money movement in Kenya.',
    category: 'fintech-mpesa',
    categoryLabel: 'M-Pesa & Fintech',
    readingTime: '14 min read',
    tableOfContents: [
      { id: 'what-you-need-before-you-start', label: 'What you need before you start', level: 2 },
      { id: 'the-mpesa-daraja-api-what-each-endpoint-actually-does', label: 'The M-Pesa Daraja API', level: 2 },
      { id: 'setting-up-environment-variables-safely', label: 'Setting up environment variables safely', level: 2 },
      { id: 'building-the-oauth-token-service', label: 'Building the OAuth token service', level: 2 },
      { id: 'implementing-stk-push', label: 'Implementing STK Push', level: 2 },
      { id: 'handling-the-callback-the-right-way', label: 'Handling the callback the right way', level: 2 },
      { id: 'error-handling-and-retry-logic', label: 'Error handling and retry logic', level: 2 },
      { id: 'testing-with-the-safaricom-sandbox', label: 'Testing with the Safaricom sandbox', level: 2 },
      { id: 'going-to-production-what-changes', label: 'Going to production — what changes', level: 2 },
      { id: 'common-production-issues-and-how-to-debug-them', label: 'Common production issues', level: 2 },
    ],
    keywords: [
      'mpesa daraja nextjs integration',
      'mpesa stk push nextjs',
      'safaricom daraja production setup',
      'kenya fintech payment integration',
      'nextjs payment callbacks kenya',
      'mpesa webhook reliability',
      'daraja api error handling',
      'mobile money engineering kenya',
    ],
    metaTitle: 'M-Pesa Next.js Production Guide | Raven Tech Group',
    metaDescription:
      'Production walkthrough for M-Pesa in Next.js: architecture, callbacks, idempotency, and reliability patterns Kenyan fintech teams need before going live.',
    relatedSlugs: [
      'mpesa-stk-push-error-codes-explained',
      'how-mpesa-actually-settles-payment-engineers-guide',
      'building-fintech-kenya-regulatory-stack',
    ],
    featured: true,
  },
  {
    slug: 'mpesa-stk-push-error-codes-explained',
    title: "M-Pesa STK Push errors, explained — the ones Safaricom's docs won't tell you",
    excerpt:
      'A breakdown of the STK failure patterns teams actually see in production and what each one means operationally. Designed to shorten incident response during payment failures.',
    category: 'fintech-mpesa',
    categoryLabel: 'M-Pesa & Fintech',
    readingTime: '9 min read',
    tableOfContents: [
      { id: 'how-stk-errors-surface-in-real-stacks', label: 'How STK errors surface in real stacks', level: 2 },
      { id: 'auth-and-session-failures', label: 'Auth and session failures', level: 2 },
      { id: 'customer-side-failure-cases', label: 'Customer-side failure cases', level: 2 },
      { id: 'network-and-timeout-patterns', label: 'Network and timeout patterns', level: 2 },
      { id: 'callback-mismatch-errors', label: 'Callback mismatch errors', level: 2 },
      { id: 'error-mapping-for-support-teams', label: 'Error mapping for support teams', level: 2 },
      { id: 'incident-response-playbook', label: 'Incident response playbook', level: 2 },
    ],
    keywords: [
      'mpesa stk push error codes',
      'daraja stk errors explained',
      'safaricom stk push failures',
      'mpesa callback errors kenya',
      'kenya payment debugging',
      'stk push timeout handling',
      'fintech support playbook kenya',
      'mpesa integration troubleshooting',
    ],
    metaTitle: 'M-Pesa STK Push Error Codes | Raven Tech Group',
    metaDescription:
      'Decode the STK Push errors teams hit in production and map each failure to a concrete response pattern for engineering, support, and operations.',
    relatedSlugs: [
      'mpesa-daraja-nextjs-production-integration',
      'how-mpesa-actually-settles-payment-engineers-guide',
      'cost-of-fintech-infrastructure-kenya-2026',
    ],
    featured: false,
  },
  {
    slug: 'how-mpesa-actually-settles-payment-engineers-guide',
    title: "How M-Pesa actually settles — a payment engineer's guide",
    excerpt:
      'A system-level view of settlement behavior across request, callback, reconciliation, and ledger states. Focused on how engineers design for consistency in Kenyan payment rails.',
    category: 'fintech-mpesa',
    categoryLabel: 'M-Pesa & Fintech',
    readingTime: '16 min read',
    tableOfContents: [
      { id: 'settlement-vs-authorization', label: 'Settlement vs authorization', level: 2 },
      { id: 'event-sequence-from-request-to-ledger', label: 'Event sequence from request to ledger', level: 2 },
      { id: 'handling-asynchronous-state', label: 'Handling asynchronous state', level: 2 },
      { id: 'reconciliation-data-models', label: 'Reconciliation data models', level: 2 },
      { id: 'failure-recovery-paths', label: 'Failure recovery paths', level: 2 },
      { id: 'finance-and-engineering-handoffs', label: 'Finance and engineering handoffs', level: 2 },
      { id: 'auditability-requirements', label: 'Auditability requirements', level: 2 },
      { id: 'operational-reporting-checklist', label: 'Operational reporting checklist', level: 2 },
    ],
    keywords: [
      'mpesa settlement flow',
      'payment settlement kenya',
      'daraja reconciliation guide',
      'mobile money ledger design',
      'fintech reconciliation kenya',
      'mpesa callback to ledger',
      'payment system consistency',
      'kenyan payment engineering',
    ],
    metaTitle: 'How M-Pesa Settles Payments | Raven Tech Group',
    metaDescription:
      'Engineer-friendly guide to how M-Pesa settlement behaves in production, including asynchronous states, reconciliation, and auditability across payment workflows.',
    relatedSlugs: [
      'mpesa-daraja-nextjs-production-integration',
      'mpesa-stk-push-error-codes-explained',
      'building-fintech-kenya-regulatory-stack',
    ],
    featured: false,
  },
  {
    slug: 'building-fintech-kenya-regulatory-stack',
    title: 'Building a fintech in Kenya — the regulatory stack you actually need',
    excerpt:
      'A practical map of the compliance and technical controls fintech teams need before scale. Written for founders and engineering leads building in Kenyan financial rails.',
    category: 'fintech-mpesa',
    categoryLabel: 'M-Pesa & Fintech',
    readingTime: '18 min read',
    tableOfContents: [
      { id: 'regulatory-context-for-product-teams', label: 'Regulatory context for product teams', level: 2 },
      { id: 'data-protection-and-consent', label: 'Data protection and consent', level: 2 },
      { id: 'kyc-and-onboarding-controls', label: 'KYC and onboarding controls', level: 2 },
      { id: 'transaction-monitoring-basics', label: 'Transaction monitoring basics', level: 2 },
      { id: 'audit-trails-and-evidence', label: 'Audit trails and evidence', level: 2 },
      { id: 'vendor-risk-and-third-party-apis', label: 'Vendor risk and third-party APIs', level: 2 },
      { id: 'incident-and-breach-readiness', label: 'Incident and breach readiness', level: 2 },
      { id: 'compliance-roadmap-by-stage', label: 'Compliance roadmap by stage', level: 2 },
    ],
    keywords: [
      'building fintech kenya',
      'kenya fintech regulation',
      'fintech compliance stack',
      'cbk fintech requirements',
      'kenya data protection fintech',
      'kyc aml kenya',
      'payment compliance architecture',
      'fintech risk controls kenya',
    ],
    metaTitle: 'Kenya Fintech Regulatory Stack | Raven Tech Group',
    metaDescription:
      'Technical and compliance stack for fintech teams in Kenya: controls, audit paths, vendor risk, and what to implement before growth increases regulatory pressure.',
    relatedSlugs: [
      'how-mpesa-actually-settles-payment-engineers-guide',
      'cost-of-fintech-infrastructure-kenya-2026',
      'hire-technology-partner-kenya-founders-guide',
    ],
    featured: false,
  },
  {
    slug: 'why-kenyan-fintechs-fail-technical-post-mortem',
    title: 'Why most Kenyan fintechs fail within 18 months — a technical post-mortem',
    excerpt:
      'A technical post-mortem of the engineering and operations patterns that repeatedly break fintech startups. Focused on preventable architecture and delivery mistakes.',
    category: 'fintech-mpesa',
    categoryLabel: 'M-Pesa & Fintech',
    readingTime: '12 min read',
    tableOfContents: [
      { id: 'failure-patterns-across-early-fintechs', label: 'Failure patterns across early fintechs', level: 2 },
      { id: 'architecture-before-problem-fit', label: 'Architecture before problem fit', level: 2 },
      { id: 'integration-debt-and-ops-gaps', label: 'Integration debt and ops gaps', level: 2 },
      { id: 'security-controls-added-too-late', label: 'Security controls added too late', level: 2 },
      { id: 'team-design-and-handover-risk', label: 'Team design and handover risk', level: 2 },
      { id: 'what-resilient-teams-do-differently', label: 'What resilient teams do differently', level: 2 },
      { id: 'a-priority-reset-framework', label: 'A priority reset framework', level: 2 },
    ],
    keywords: [
      'why fintech startups fail kenya',
      'kenyan fintech post mortem',
      'fintech engineering failures',
      'mobile money startup mistakes',
      'kenya fintech technical debt',
      'fintech operations risk',
      'payment startup reliability',
      'founder engineering lessons kenya',
    ],
    metaTitle: 'Why Kenyan Fintechs Fail | Raven Tech Group',
    metaDescription:
      'Technical post-mortem on why many Kenyan fintechs fail early: architecture debt, integration fragility, and operational blind spots that compound under growth.',
    relatedSlugs: [
      'building-fintech-kenya-regulatory-stack',
      'cost-of-fintech-infrastructure-kenya-2026',
      'hire-technology-partner-kenya-founders-guide',
    ],
    featured: false,
  },
  {
    slug: 'cost-of-fintech-infrastructure-kenya-2026',
    title: 'The real cost of custom fintech infrastructure in Kenya',
    excerpt:
      'A clear look at cost drivers behind fintech architecture, integration, and operational readiness in Kenya. Written to help teams budget for sustainability, not launch optics.',
    category: 'fintech-mpesa',
    categoryLabel: 'M-Pesa & Fintech',
    readingTime: '11 min read',
    tableOfContents: [
      { id: 'why-this-article-exists', label: 'Why this article exists', level: 2 },
      { id: 'the-three-pricing-models-in-kenya', label: 'The three pricing models in Kenya', level: 2 },
      { id: 'typical-ranges-for-common-project-types', label: 'Typical ranges by project type', level: 2 },
      { id: 'what-goes-into-the-price-really', label: 'What goes into the price — really', level: 2 },
      { id: 'where-kenyan-agencies-cut-corners', label: 'Where Kenyan agencies cut corners', level: 2 },
      { id: 'fixed-price-vs-time-and-materials-honest-tradeoffs', label: 'Fixed price vs time & materials', level: 2 },
      { id: 'red-flags-when-someone-quotes-you', label: 'Red flags when someone quotes you', level: 2 },
      { id: 'how-we-price-at-raven-tech-group', label: 'How we price at Raven Tech Group', level: 2 },
    ],
    keywords: [
      'fintech infrastructure cost kenya',
      'cost of building fintech kenya',
      'mobile money platform cost',
      'payment system pricing kenya',
      'kenya fintech engineering budget',
      'fintech dev cost breakdown',
      'mpesa integration cost',
      'fintech platform operations cost',
    ],
    metaTitle: 'Fintech Infrastructure Cost Kenya | Raven Tech Group',
    metaDescription:
      'Understand the real cost of custom fintech infrastructure in Kenya, from integration and compliance to post-launch operations and technical ownership.',
    relatedSlugs: [
      'building-fintech-kenya-regulatory-stack',
      'why-kenyan-fintechs-fail-technical-post-mortem',
      'mpesa-daraja-nextjs-production-integration',
    ],
    featured: false,
  },
  {
    slug: 'sacco-digital-transformation-mistakes-kenya',
    title: 'The 7 software mistakes Kenyan SACCOs make when going digital',
    excerpt:
      'A practical look at recurring implementation failures in SACCO digitisation and the patterns that avoid expensive rework. Grounded in governance, operations, and member adoption realities.',
    category: 'sacco-cooperative',
    categoryLabel: 'SACCO & Cooperatives',
    readingTime: '10 min read',
    tableOfContents: [
      { id: 'why-saccos-are-especially-hard-to-digitise-well', label: 'Why SACCOs are hard to digitise well', level: 2 },
      { id: 'mistake-1-copying-bank-ui-patterns-for-a-member-owned-model', label: 'Mistake 1: Copying bank UI patterns', level: 2 },
      { id: 'mistake-2-underestimating-the-loan-approval-workflow', label: 'Mistake 2: The loan approval workflow', level: 2 },
      { id: 'mistake-3-building-member-portals-before-member-data-is-clean', label: 'Mistake 3: Portals before clean data', level: 2 },
      { id: 'mistake-4-not-planning-for-audit-trails-from-day-one', label: 'Mistake 4: Audit trails from day one', level: 2 },
      { id: 'mistake-5-choosing-vendors-based-on-price-not-on-kenya-specific-knowledge', label: 'Mistake 5: Vendor selection', level: 2 },
      { id: 'mistake-6-launching-without-board-buy-in-on-the-operational-change', label: 'Mistake 6: Board buy-in on change', level: 2 },
      { id: 'mistake-7-treating-the-website-and-the-system-as-separate-projects', label: 'Mistake 7: Website vs system', level: 2 },
      { id: 'what-to-do-instead', label: 'What to do instead', level: 2 },
    ],
    keywords: [
      'sacco digital transformation kenya',
      'sacco software mistakes kenya',
      'cooperative technology kenya',
      'sacco core banking implementation',
      'sacco member system adoption',
      'sacco technology partner kenya',
      'sacco workflow automation',
      'sacco digitisation roadmap',
    ],
    metaTitle: 'SACCO Digital Mistakes in Kenya | Raven Tech Group',
    metaDescription:
      'Seven software mistakes that derail SACCO digitisation in Kenya, with practical priorities for boards and operators planning credible digital transformation.',
    relatedSlugs: [
      'sasra-compliance-technology-2026',
      'evaluating-sacco-core-banking-system',
      'sacco-software-migration-90-day-playbook',
    ],
    featured: true,
  },
  {
    slug: 'sasra-compliance-technology-2026',
    title: 'SASRA compliance and technology — what SACCO boards need to know in 2026',
    excerpt:
      'A board-level guide to aligning SACCO systems with SASRA expectations without slowing execution. Focuses on controls, evidence, and implementation governance.',
    category: 'sacco-cooperative',
    categoryLabel: 'SACCO & Cooperatives',
    readingTime: '13 min read',
    tableOfContents: [
      { id: 'board-level-compliance-context', label: 'Board-level compliance context', level: 2 },
      { id: 'controls-that-need-system-support', label: 'Controls that need system support', level: 2 },
      { id: 'audit-evidence-and-reporting', label: 'Audit evidence and reporting', level: 2 },
      { id: 'roles-and-access-governance', label: 'Roles and access governance', level: 2 },
      { id: 'data-retention-and-traceability', label: 'Data retention and traceability', level: 2 },
      { id: 'implementation-risk-management', label: 'Implementation risk management', level: 2 },
      { id: 'board-oversight-checklist', label: 'Board oversight checklist', level: 2 },
    ],
    keywords: [
      'sasra compliance technology',
      'sacco board technology governance',
      'sacco compliance systems kenya',
      'sacco audit trail software',
      'sacco controls implementation',
      'cooperative compliance kenya',
      'sasra digital reporting',
      'sacco risk management systems',
    ],
    metaTitle: 'SASRA Compliance Tech Guide 2026 | Raven Tech Group',
    metaDescription:
      'What SACCO boards should require from technology teams in 2026 to align with SASRA expectations, improve audit readiness, and reduce operational compliance risk.',
    relatedSlugs: [
      'sacco-digital-transformation-mistakes-kenya',
      'evaluating-sacco-core-banking-system',
      'sacco-software-cost-kenya-2026',
    ],
    featured: false,
  },
  {
    slug: 'evaluating-sacco-core-banking-system',
    title: 'How to evaluate a SACCO core banking system before signing anything',
    excerpt:
      'An evaluation framework for SACCO decision-makers comparing core banking options. Helps teams avoid expensive lock-in and functionality gaps.',
    category: 'sacco-cooperative',
    categoryLabel: 'SACCO & Cooperatives',
    readingTime: '15 min read',
    tableOfContents: [
      { id: 'define-the-operating-model-first', label: 'Define the operating model first', level: 2 },
      { id: 'functional-capability-checklist', label: 'Functional capability checklist', level: 2 },
      { id: 'integration-and-data-ownership', label: 'Integration and data ownership', level: 2 },
      { id: 'security-and-control-baseline', label: 'Security and control baseline', level: 2 },
      { id: 'implementation-and-support-model', label: 'Implementation and support model', level: 2 },
      { id: 'vendor-due-diligence-questions', label: 'Vendor due diligence questions', level: 2 },
      { id: 'contract-clauses-to-negotiate', label: 'Contract clauses to negotiate', level: 2 },
      { id: 'decision-scorecard-template', label: 'Decision scorecard template', level: 2 },
    ],
    keywords: [
      'sacco core banking system kenya',
      'evaluate sacco software vendor',
      'sacco core banking checklist',
      'cooperative banking technology selection',
      'sacco software due diligence',
      'sacco platform procurement kenya',
      'core banking vendor comparison',
      'sacco system contract review',
    ],
    metaTitle: 'Evaluate SACCO Core Banking | Raven Tech Group',
    metaDescription:
      'Framework for evaluating SACCO core banking systems before contract signing, covering capability fit, controls, vendor risk, and data ownership terms.',
    relatedSlugs: [
      'sasra-compliance-technology-2026',
      'sacco-software-migration-90-day-playbook',
      'sacco-software-cost-kenya-2026',
    ],
    featured: false,
  },
  {
    slug: 'sacco-member-portals-adoption-playbook',
    title: 'SACCO member portals — what actually moves the needle on adoption',
    excerpt:
      'A practical adoption playbook for SACCO member portals based on workflow fit and support readiness. Focuses on sustained usage, not launch metrics.',
    category: 'sacco-cooperative',
    categoryLabel: 'SACCO & Cooperatives',
    readingTime: '9 min read',
    tableOfContents: [
      { id: 'why-members-ignore-portals', label: 'Why members ignore portals', level: 2 },
      { id: 'adoption-design-principles', label: 'Adoption design principles', level: 2 },
      { id: 'onboarding-and-support-flow', label: 'Onboarding and support flow', level: 2 },
      { id: 'feature-prioritization-by-value', label: 'Feature prioritization by value', level: 2 },
      { id: 'trust-signals-in-member-experience', label: 'Trust signals in member experience', level: 2 },
      { id: 'field-operations-feedback-loop', label: 'Field operations feedback loop', level: 2 },
      { id: 'adoption-metrics-that-matter', label: 'Adoption metrics that matter', level: 2 },
    ],
    keywords: [
      'sacco member portal adoption',
      'sacco mobile app usage kenya',
      'cooperative digital adoption',
      'sacco self service platform',
      'member portal ux kenya',
      'sacco digital channels',
      'cooperative member experience',
      'sacco portal rollout playbook',
    ],
    metaTitle: 'SACCO Portal Adoption Playbook | Raven Tech Group',
    metaDescription:
      'What drives real SACCO member portal adoption: onboarding, support flows, trust signals, and feature priorities that convert launches into sustained usage.',
    relatedSlugs: [
      'sacco-digital-transformation-mistakes-kenya',
      'sacco-software-migration-90-day-playbook',
      'evaluating-sacco-core-banking-system',
    ],
    featured: false,
  },
  {
    slug: 'sacco-software-migration-90-day-playbook',
    title: 'Migrating a SACCO from spreadsheets to software — a 90-day playbook',
    excerpt:
      'A phased migration framework for SACCO teams moving from manual records to operational systems. Designed to reduce disruption while improving control.',
    category: 'sacco-cooperative',
    categoryLabel: 'SACCO & Cooperatives',
    readingTime: '14 min read',
    tableOfContents: [
      { id: 'migration-readiness-baseline', label: 'Migration readiness baseline', level: 2 },
      { id: 'week-1-to-3-data-prep', label: 'Week 1 to 3: data prep', level: 2 },
      { id: 'week-4-to-6-workflow-config', label: 'Week 4 to 6: workflow config', level: 2 },
      { id: 'week-7-to-9-pilot-execution', label: 'Week 7 to 9: pilot execution', level: 2 },
      { id: 'week-10-to-12-go-live', label: 'Week 10 to 12: go-live', level: 2 },
      { id: 'risk-controls-throughout', label: 'Risk controls throughout', level: 2 },
      { id: 'post-migration-stabilization', label: 'Post-migration stabilization', level: 2 },
      { id: 'leadership-reporting-pack', label: 'Leadership reporting pack', level: 2 },
    ],
    keywords: [
      'sacco migration to software',
      'sacco spreadsheet to system',
      'cooperative software migration kenya',
      'sacco digital rollout plan',
      'sacco data migration checklist',
      'sacco go live playbook',
      'sacco operations transformation',
      'sacco system implementation plan',
    ],
    metaTitle: 'SACCO Migration 90-Day Plan | Raven Tech Group',
    metaDescription:
      'Ninety-day SACCO migration playbook for moving from spreadsheets to software with clear phases, controls, and execution priorities for leadership teams.',
    relatedSlugs: [
      'evaluating-sacco-core-banking-system',
      'sacco-member-portals-adoption-playbook',
      'sacco-software-cost-kenya-2026',
    ],
    featured: false,
  },
  {
    slug: 'sacco-software-cost-kenya-2026',
    title: 'The true cost of SACCO software in Kenya — 2026 pricing breakdown',
    excerpt:
      'A practical pricing guide for SACCO leaders evaluating software budgets and vendor proposals in 2026. Focused on total cost ownership, not headline quotes.',
    category: 'sacco-cooperative',
    categoryLabel: 'SACCO & Cooperatives',
    readingTime: '11 min read',
    tableOfContents: [
      { id: 'pricing-models-in-the-sacco-market', label: 'Pricing models in the SACCO market', level: 2 },
      { id: 'implementation-vs-run-costs', label: 'Implementation vs run costs', level: 2 },
      { id: 'cost-drivers-by-system-scope', label: 'Cost drivers by system scope', level: 2 },
      { id: 'hidden-cost-lines-to-check', label: 'Hidden cost lines to check', level: 2 },
      { id: 'vendor-proposal-comparison-method', label: 'Vendor proposal comparison method', level: 2 },
      { id: 'budgeting-for-year-two', label: 'Budgeting for year two', level: 2 },
      { id: 'procurement-red-flags', label: 'Procurement red flags', level: 2 },
    ],
    keywords: [
      'sacco software cost kenya',
      'sacco system pricing 2026',
      'cooperative software pricing kenya',
      'sacco platform budget',
      'sacco technology procurement cost',
      'sacco core banking pricing',
      'sacco vendor quote comparison',
      'sacco software total cost ownership',
    ],
    metaTitle: 'SACCO Software Cost Kenya 2026 | Raven Tech Group',
    metaDescription:
      '2026 SACCO software pricing breakdown for Kenyan boards and operators, covering implementation costs, run costs, and how to compare vendor proposals properly.',
    relatedSlugs: [
      'evaluating-sacco-core-banking-system',
      'sasra-compliance-technology-2026',
      'sacco-software-migration-90-day-playbook',
    ],
    featured: false,
  },
  {
    slug: 'hire-technology-partner-kenya-founders-guide',
    title: "The founder's guide to hiring a technology partner in Kenya",
    excerpt:
      'A founder-focused framework for evaluating and selecting technology partners in Kenya. Covers fit, accountability, delivery model, and long-term operating risk.',
    category: 'kenya-market',
    categoryLabel: 'Kenya Tech Market',
    readingTime: '12 min read',
    tableOfContents: [
      { id: 'define-the-outcome-first', label: 'Define the outcome first', level: 2 },
      { id: 'engagement-model-options', label: 'Engagement model options', level: 2 },
      { id: 'how-to-evaluate-team-quality', label: 'How to evaluate team quality', level: 2 },
      { id: 'scoping-and-contract-basics', label: 'Scoping and contract basics', level: 2 },
      { id: 'governance-and-communication-rhythm', label: 'Governance and communication rhythm', level: 2 },
      { id: 'handover-and-dependency-risk', label: 'Handover and dependency risk', level: 2 },
      { id: 'decision-framework-for-founders', label: 'Decision framework for founders', level: 2 },
    ],
    keywords: [
      'hire technology partner kenya',
      'choose software consultancy nairobi',
      'technology partner checklist kenya',
      'kenya software vendor selection',
      'founder guide tech partner',
      'nairobi engineering partner',
      'software outsourcing kenya guide',
      'product development partner kenya',
    ],
    metaTitle: 'Hire a Tech Partner in Kenya | Raven Tech Group',
    metaDescription:
      'Founders guide to hiring a technology partner in Kenya, with practical frameworks for fit, delivery governance, contract terms, and long-term ownership.',
    relatedSlugs: [
      'building-fintech-kenya-regulatory-stack',
      'why-kenyan-fintechs-fail-technical-post-mortem',
      'sacco-digital-transformation-mistakes-kenya',
    ],
    featured: false,
  },
]

export const insights: Insight[] = INSIGHT_DRAFTS.map((draft) => {
  const isPublished = PUBLISHED_INSIGHT_SLUGS.has(draft.slug)
  const body = INSIGHT_BODY_BY_SLUG[draft.slug] ?? outlineBodyFromToc(draft.tableOfContents)
  const heroImage =
    INSIGHT_HERO_BY_SLUG[draft.slug] ?? `/images/photos/collage-1.jpg`

  return {
    ...draft,
    author: VICTOR,
    heroImage,
    heroImageAlt: `${draft.title} article hero image`,
    publishedAt: isPublished ? '2026-04-24' : '2026-04-24',
    body,
    isPublished,
  }
})

export function getPublishedInsights(): Insight[] {
  return insights.filter((i) => i.isPublished)
}

export function isInsightPublished(slug: string): boolean {
  return PUBLISHED_INSIGHT_SLUGS.has(slug)
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug)
}

export const insightsOrderedFeaturedFirst: Insight[] = [...getPublishedInsights()].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  return b.publishedAt.localeCompare(a.publishedAt)
})
