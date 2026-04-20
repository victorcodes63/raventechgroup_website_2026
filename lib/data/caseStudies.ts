export type CaseStudyMetric = {
  value: string
  label: string
}

export type CaseStudySection = {
  heading: string
  body: string
  image?: string
  imageAlt?: string
  quote?: {
    text: string
    attribution: string
    role?: string
  }
}

export type CaseStudy = {
  slug: string
  client: string
  clientLogo?: string
  industry: string
  industrySlug: string
  location: string
  engagementLength: string
  year: string
  heroImage: string
  heroImageAlt: string
  services: string[]
  stack: string[]
  tagline: string
  problem: string
  solution: string
  outcomeHeadline: string
  outcomeSummary: string
  metrics: CaseStudyMetric[]
  sections: CaseStudySection[]
  siteUrl?: string
  status: 'live' | 'in-delivery' | 'archived'
  featured: boolean
  publishedAt: string
  /** Homepage CaseStudiesPreview chips */
  tags: string[]
  /** Homepage featured Eagle strip */
  platformModules?: string[]
  /** Card / section CTA link label */
  cta: string
}

/** Legacy display status for homepage components */
export function caseStudyStatusLabel(s: CaseStudy): 'Live' | 'In delivery' | 'Archived' {
  if (s.status === 'live') return 'Live'
  if (s.status === 'in-delivery') return 'In delivery'
  return 'Archived'
}

export function caseStudyMetricsDisplay(study: CaseStudy): string[] {
  return study.metrics.map((m) => `${m.value} ${m.label}`)
}

export function caseStudyPrimaryMetric(study: CaseStudy): string | undefined {
  const m = study.metrics[0]
  return m ? `${m.value} ${m.label}` : undefined
}

/**
 * Homepage case-study grid: live screenshot when `siteUrl` is set and public; else static hero art.
 */
export function getCaseStudyImageSrc(study: CaseStudy): { src: string; unoptimized: boolean } {
  if (study.siteUrl) {
    return {
      src: `/api/screenshot?url=${encodeURIComponent(study.siteUrl)}`,
      unoptimized: true,
    }
  }
  return { src: study.heroImage, unoptimized: false }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'eagle-hr-consultants',
    client: 'Eagle HR Consultants',
    industry: 'Human Resources',
    industrySlug: 'hr',
    location: 'Nairobi, Kenya',
    engagementLength: '6 months ongoing',
    year: '2024 — ongoing',
    heroImage: '/images/case-studies/eagle-hr/hero.jpg',
    heroImageAlt: 'Eagle HR Consultants platform dashboard on a laptop',
    services: ['Software Development', 'Web Development', 'Digital Transformation'],
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'Resend'],
    tagline: 'A full business operating system — not just a website.',
    problem:
      "Eagle HR Consultants — one of Kenya's most established HR firms — was running recruitment, payroll, and vendor management across spreadsheets, email threads, and WhatsApp groups. Lead intake happened through a static website that captured nothing. Payroll calculations ran in Excel files that got emailed between staff. Interview scheduling was manual. They needed a platform their business could actually run on, not just a brochure site.",
    solution:
      'Raven delivered a complete business operating system in 12 weeks — a recruitment ATS, interview scheduling module, outsourcing and employees dashboard, finance and payroll system with KRA iTax and P9 compliance, vendor management, and a client portal. The public-facing website was rebuilt as the lead generation front door, feeding directly into the ATS.',
    outcomeHeadline: 'From zero digital presence to 2–3 qualified inbound leads every week.',
    outcomeSummary:
      'Eagle HR now operates an end-to-end digital business. Recruitment happens in the ATS. Payroll runs with KRA compliance built in. Clients access their files through a dedicated portal. Vendor payments are tracked in one system. And the marketing site drives consistent inbound leads that the team converts directly inside the platform.',
    metrics: [
      { value: '2–3', label: 'Qualified leads per week' },
      { value: '6', label: 'Integrated modules live' },
      { value: '12', label: 'Weeks to production' },
    ],
    featured: true,
    status: 'live',
    siteUrl: 'https://eaglehr.co.ke',
    publishedAt: '2024-06-01',
    tags: ['Custom Software', 'Web Platform', 'System Integration'],
    platformModules: [
      'Recruitment ATS',
      'Interview Scheduling',
      'Outsourcing & Employees',
      'Finance & Payroll',
      'Vendor Management',
      'Client Portal',
    ],
    cta: 'Read the Eagle HR story',
    sections: [
      {
        heading: 'The problem with most HR firms in Kenya',
        body:
          'Most mid-sized HR consultancies in Kenya operate the same way — a website that says what they do, and everything else happens in email. For Eagle HR, this meant recruitment pipelines lived in spreadsheets, payroll ran on calculator-grade Excel, and vendor invoices stacked up in inboxes. When growth started putting pressure on these systems, the choice was clear: either hire more admin staff to manage the chaos, or build the system the business should have always had.',
      },
      {
        heading: 'Platform modules, shipped as one system',
        body:
          'The platform we built for Eagle HR consists of six tightly integrated modules — all sharing one user directory, one audit log, one permissions model. Recruitment ATS handles job posting, applications, candidate screening, and interview scheduling. Finance & Payroll handles contracts, invoices, payroll calculations with KRA iTax and P9 formula compliance, and payment records. Outsourcing & Employees tracks placed staff, their reviews, and client satisfaction. Vendor Management handles supplier onboarding and invoice processing. The Client Portal gives clients a single login to view their outsourced staff, placement pipeline, and invoicing. The public website is the seventh piece — a marketing surface that captures leads directly into the ATS.',
        image: '/images/case-studies/eagle-hr/platform-overview.png',
        imageAlt: 'Eagle HR platform dashboard showing integrated modules',
      },
      {
        heading: 'Why KRA compliance mattered',
        body:
          "Kenyan payroll is not a generic SaaS template. PAYE, NSSF, NHIF, Housing Levy, and the P9 form each have their own rules. We built the payroll engine to handle all five correctly from day one — including Housing Levy changes — with audit trails that can be reviewed by KRA if requested. Eagle HR's clients needed payslips and tax remittances that hold up under scrutiny.",
      },
      {
        heading: 'What happens now',
        body:
          'Six months in, Eagle HR runs every part of their business through the platform. Leads come in through the marketing site and go directly into the recruitment ATS. Every placed candidate is tracked. Every invoice is generated from the system. Every payroll cycle runs with compliance baked in. And the team has stopped asking where a file lives — because the file is in the system.',
        quote: {
          text:
            'Raven did not just build us a website. They built the system our business runs on. Recruitment, payroll, interviews, vendor management — all in one dashboard our team uses every day.',
          attribution: 'Eagle HR Leadership',
          role: 'Consultancy Leadership Team',
        },
      },
    ],
  },
  {
    slug: 'r4-automotive',
    client: 'R4 Automotive',
    industry: 'Automotive · E-commerce',
    industrySlug: 'automotive',
    location: 'Nairobi, Kenya',
    engagementLength: '4 months (phase one)',
    year: '2025 — launching Q2 2026',
    heroImage: '/images/case-studies/r4-automotive/hero.jpg',
    heroImageAlt: 'R4 Automotive parts search interface',
    services: ['System Integration', 'Software Development', 'Web Development'],
    stack: ['Next.js 14', 'TypeScript', 'Neon PostgreSQL', 'Vercel', 'M-Pesa Daraja API'],
    tagline: 'European car parts, Kenyan payment rails.',
    problem:
      'R4 Automotive is a European auto parts dropshipping business — BMW, VW, Alfa Romeo parts sourced from UK and German suppliers via eBay and Autodoc. Kenyan customers could not trust "price on request" forms that took days to respond to, and the business could not compete against local sellers who offered instant quotes. They needed self-service pricing with M-Pesa payment at checkout — built for the exact workflow of their suppliers.',
    solution:
      'Raven built a self-service quotation portal that pulls live pricing from eBay and Autodoc APIs, converts to KES with current FX rates, adds shipping and duty calculations, and presents a single fixed quote customers can pay via M-Pesa STK push. The platform also includes a recruitment portal that received 700+ applications during hiring for the business.',
    outcomeHeadline: 'Self-service quoting cut lead response time from days to seconds.',
    outcomeSummary:
      'Customers now get instant, accurate quotes for European auto parts delivered to Nairobi. M-Pesa payment happens at checkout. Orders flow directly to the supplier APIs. What used to take 2–5 business days of manual quote-and-response now takes 30 seconds.',
    metrics: [
      { value: '30s', label: 'From search to quote' },
      { value: '700+', label: 'Recruitment applications' },
      { value: '3', label: 'Supplier APIs integrated' },
    ],
    featured: false,
    status: 'in-delivery',
    siteUrl: 'https://r4automotive.co.ke',
    publishedAt: '2025-08-15',
    tags: ['Custom Portal', 'M-Pesa Integration', 'Dropshipping Platform'],
    cta: 'Read the R4 story',
    sections: [
      {
        heading: 'Why WhatsApp quoting stops working at scale',
        body:
          'When every quote is a conversation, your throughput is capped by how fast someone can type. R4 was sourcing real parts from European marketplaces — prices move, stock moves, shipping bands change. Customers on Instagram and WhatsApp were waiting on humans to re-check supplier pages, convert currency, and reply. That breaks the moment volume picks up. The product had to become self-service: search, price, pay, confirm — without a human in the middle for the happy path.',
      },
      {
        heading: 'Integration architecture — suppliers, FX, landed cost',
        body:
          'We wired eBay and Autodoc APIs behind a single search surface. Each result carries supplier SKU, list price, availability, and shipping origin. FX is pulled from a conservative daily rate with a buffer so quotes do not move against the customer between click and pay. Duty and clearing estimates are applied as transparent line items so the KES total is one number the customer can trust at checkout. None of that lives in a spreadsheet anymore.',
      },
      {
        heading: 'M-Pesa STK push and callback discipline',
        body:
          'Checkout uses Safaricom Daraja STK Push. OAuth tokens are cached and refreshed before expiry. Callbacks are verified, idempotent, and logged — duplicate posts from the gateway do not double-charge. We run the same pattern we document in our M-Pesa integration write-up: HTTPS callback URL, structured logging, and a retry-safe order state machine so a dropped callback does not strand an order.',
      },
      {
        heading: 'Recruitment load and what ships next',
        body:
          'The recruitment module was not a side project — it processed 700+ applications when R4 hired. That validated auth, file uploads, and admin review flows under real load. Phase one ends with quoting and payment; fulfilment webhooks and supplier order confirmation are next as R4 moves toward general availability in 2026.',
      },
    ],
  },
  {
    slug: 'honey-box-accessories',
    client: 'Honey Box Accessories',
    industry: 'E-commerce',
    industrySlug: 'ecommerce',
    location: 'Nairobi, Kenya',
    engagementLength: '6 weeks',
    year: '2025',
    heroImage: '/images/case-studies/honey-box/hero.jpg',
    heroImageAlt: 'Honey Box Accessories jewellery on the Shopify storefront',
    services: ['Web Development', 'System Integration'],
    stack: ['Shopify', 'Liquid', 'Custom Theme Development'],
    tagline: 'A jewellery brand, online at last.',
    problem:
      'Honey Box Accessories — a Nairobi-based jewellery and accessories brand — was selling exclusively through Instagram DMs and WhatsApp orders. Growth was capped by manual order processing, no product catalog visibility, and customers abandoning because they could not see the full range. They needed an online store that felt as considered as their physical product.',
    solution:
      'Raven built a Shopify store with a custom theme showcasing six product collections (earrings, bracelets, necklaces, handbags, jewellery sets, wallets), gift packaging bundles, M-Pesa and card payment at checkout, and a photography-forward editorial aesthetic that matched the brand. Integrated with their existing Instagram shop for cross-posting.',
    outcomeHeadline: 'From DM orders to a browsable catalog — shipping nationwide.',
    outcomeSummary:
      'Honey Box now has a fully shoppable catalog with real photography, integrated payments, and a checkout experience that matches the quality of the products. Customer orders flow directly into Shopify admin, shipping labels print automatically, and the Instagram shop cross-posts from the same catalog.',
    metrics: [
      { value: '6', label: 'Product collections live' },
      { value: '6', label: 'Weeks end-to-end' },
      { value: '100%', label: 'Mobile-first checkout' },
    ],
    featured: false,
    status: 'live',
    siteUrl: 'https://honeyboxaccessories.com',
    publishedAt: '2025-03-01',
    tags: ['E-Commerce', 'Shopify', 'Web Design'],
    cta: 'See how we helped Honey Box',
    sections: [
      {
        heading: 'Why DMs cap revenue',
        body:
          'Every sale through WhatsApp is a manual workflow: confirm stock, confirm price, confirm delivery, confirm payment. That works for the first hundred customers. It breaks when marketing starts working — you need a catalog people can browse without asking permission, and a cart that closes the sale while intent is high.',
      },
      {
        heading: 'Shopify, collections, and payments',
        body:
          'We structured six collections so navigation matches how customers shop — not how the warehouse thinks about SKUs. Gift bundles sit alongside single-SKU jewellery so average order value can grow without confusing the catalog. Checkout supports M-Pesa and cards through Shopify Payments integrations tuned for Kenya. The theme is fast on 3G and large enough on desktop to carry editorial photography.',
      },
      {
        heading: 'Operations after launch',
        body:
          'Orders land in Shopify admin with the same SKUs the Instagram shop references, so the founder is not maintaining two truths. Shipping profiles cover nationwide delivery; label printing is standard Shopify workflow. The brand finally scales the front door without hiring a full-time order desk first.',
      },
    ],
  },
]

/** Featured first, then published date desc */
export const caseStudiesOrdered: CaseStudy[] = [...caseStudies].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  return b.publishedAt.localeCompare(a.publishedAt)
})
