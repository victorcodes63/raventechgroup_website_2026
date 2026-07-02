/**
 * Raven Tech Group products — source of truth for nav, index, and bridge pages.
 * Add new products here as they ship.
 */

export type ProductStatus = 'live' | 'coming-soon'

export type ProductModule = {
  title: string
  description: string
}

export type ProductIndustry = {
  title: string
  description: string
}

export type ProductProofPoint = {
  value: string
  label: string
}

export type ProductItem = {
  slug: string
  name: string
  /** Short line for nav and cards */
  navDescription: string
  tagline: string
  description: string
  /** Bridge page on raventechgroup.com */
  bridgeHref: string
  marketingUrl: string
  appUrl: string
  demoUrl: string
  status: ProductStatus
  heroEyebrow: string
  heroHeadline: string
  heroSubline: string
  problemHeadline: string
  problemBody: string
  modules: readonly ProductModule[]
  industries: readonly ProductIndustry[]
  proofPoints: readonly ProductProofPoint[]
  caseStudySlug?: string
  caseStudyLabel?: string
}

export const STRIDE_MARKETING_URL = 'https://getstride.co.ke'
export const STRIDE_APP_URL = 'https://app.getstride.co.ke'

export const products: readonly ProductItem[] = [
  {
    slug: 'stride',
    name: 'Stride',
    navDescription: 'HR, payroll, finance and operations — built for East Africa.',
    tagline: 'Run your whole business as one.',
    description:
      'Stride is Raven Tech Group’s business management platform — people, payroll, finance, and vertical industry packs on one data layer, with Kenyan compliance built in.',
    bridgeHref: '/products/stride',
    marketingUrl: STRIDE_MARKETING_URL,
    appUrl: STRIDE_APP_URL,
    demoUrl: `${STRIDE_MARKETING_URL}#pricing`,
    status: 'live',
    heroEyebrow: 'Raven product',
    heroHeadline: 'Run your whole business as one.',
    heroSubline:
      'Stride brings people, payroll, finance, and operations onto one platform — with East African statutory compliance and M-Pesa disbursements built in, not bolted on.',
    problemHeadline: 'Global ERPs were never built for here.',
    problemBody:
      'Most platforms were designed elsewhere, then adapted for Kenya — M-Pesa added late, statutory rules approximated, support queued in another timezone. Stride starts from how Kenyan businesses actually run.',
    modules: [
      {
        title: 'People & workforce',
        description: 'Employee records, onboarding, departments, and lifecycle — one directory for HR and finance.',
      },
      {
        title: 'Time & leave',
        description: 'Attendance, rotas, and leave approvals tied to payroll — no duplicate profiles.',
      },
      {
        title: 'Payroll (Kenya)',
        description: 'PAYE, NSSF, SHIF, Housing Levy — P9 and iTax-ready exports every pay run.',
      },
      {
        title: 'Finance',
        description: 'Ledger, approvals, and disbursements on the same records as payroll.',
      },
    ],
    industries: [
      {
        title: 'Logistics & cargo',
        description: 'Fleet, trips, POD, and settlement — billing on the same finance module as payroll.',
      },
      {
        title: 'SACCOs',
        description: 'Member-trusted payroll, workforce operations, and board-ready reporting.',
      },
      {
        title: 'Healthcare',
        description: 'Rota, biometric clock-in, and shift scheduling for clinical and support teams.',
      },
      {
        title: 'HR consultancies',
        description: 'Multi-client workforce, payroll, and client billing — the pattern we proved with Eagle HR.',
      },
    ],
    proofPoints: [
      { value: '6', label: 'Core modules on one platform' },
      { value: 'Days', label: 'Typical guided onboarding' },
      { value: 'KE+UG', label: 'Multi-entity compliance' },
    ],
    caseStudySlug: 'eagle-hr-consultants',
    caseStudyLabel: 'Eagle HR Consultants',
  },
] as const

export function getProductBySlug(slug: string): ProductItem | undefined {
  return products.find((p) => p.slug === slug)
}

export function getLiveProducts(): readonly ProductItem[] {
  return products.filter((p) => p.status === 'live')
}

/** Stride — first Raven product; bridge page imports this directly. */
export const strideProduct = products[0]
