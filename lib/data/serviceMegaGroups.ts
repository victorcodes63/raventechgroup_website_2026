/**
 * Service groups for mega menu and /services index — keep in sync.
 */

export type ServiceMegaCategoryId =
  | 'engineering'
  | 'advisory'
  | 'data-ai'
  | 'optimisation'
  | 'expertise'

export type MegaMenuServiceItem = {
  slug: string
  title: string
  sub: string
}

export const SERVICE_MEGA_CATEGORIES = [
  {
    id: 'engineering' as const,
    label: 'Engineering',
    description: 'Build and run web apps, integrations, and cloud foundations.',
    highlight: 'Shipped software with QA and handover—not prototypes.',
  },
  {
    id: 'advisory' as const,
    label: 'Advisory',
    description: 'Roadmaps, architecture, and transformation before you commit budget.',
    highlight: 'Clear trade-offs leadership can sign.',
  },
  {
    id: 'data-ai' as const,
    label: 'Data & AI',
    description: 'Pipelines, reporting, and product AI with proper controls.',
    highlight: 'Data you can audit. AI behind real workflows.',
  },
  {
    id: 'optimisation' as const,
    label: 'Optimisation',
    description: 'Security, uptime, and cloud spend for live systems.',
    highlight: 'Tighter risk, fewer outages, clearer bills.',
  },
  {
    id: 'expertise' as const,
    label: 'Expertise',
    description: 'Senior people on timeboxed engagements—same faces end to end.',
    highlight: 'No anonymous bench.',
  },
] as const

export const SERVICE_MEGA_CATEGORY_SERVICES: Record<ServiceMegaCategoryId, readonly MegaMenuServiceItem[]> = {
  engineering: [
    {
      slug: 'web-development',
      title: 'Web development',
      sub: 'Corporate sites and portals—fast, mobile-first, SEO-ready.',
    },
    {
      slug: 'software-development',
      title: 'Application development',
      sub: 'Web, mobile, and internal tools—TypeScript, tests, CI.',
    },
    {
      slug: 'system-integration',
      title: 'Systems integration',
      sub: 'M-Pesa, cores, ERP, APIs—less manual reconciliation.',
    },
    {
      slug: 'cloud-solutions',
      title: 'Cloud computing',
      sub: 'AWS and Azure—Terraform, CI/CD, operations runbooks.',
    },
  ],
  advisory: [
    {
      slug: 'it-consulting',
      title: 'IT consulting',
      sub: 'Fractional CTO, architecture review, delivery governance.',
    },
    {
      slug: 'digital-transformation',
      title: 'Product and service design',
      sub: 'Discovery, service design, phased roadmaps.',
    },
  ],
  'data-ai': [
    {
      slug: 'cloud-solutions',
      title: 'Data platforms & analytics',
      sub: 'Warehouses, ingestion, BI—AWS or Azure.',
    },
    {
      slug: 'software-development',
      title: 'AI-enabled application delivery',
      sub: 'LLM features—guardrails, logging, ship behind flags.',
    },
  ],
  optimisation: [
    {
      slug: 'cybersecurity',
      title: 'Cyber security',
      sub: 'Assessments, secure SDLC, CBK-aligned readiness.',
    },
    {
      slug: 'cloud-solutions',
      title: 'Cloud reliability',
      sub: 'SLOs, on-call runbooks, performance and FinOps.',
    },
  ],
  expertise: [
    {
      slug: 'digital-transformation',
      title: 'Digital enterprise',
      sub: 'Programme governance, vendors, change comms.',
    },
    {
      slug: 'it-consulting',
      title: 'Customer experience & delivery coaching',
      sub: 'Coaching for product and engineering leads.',
    },
  ],
}
