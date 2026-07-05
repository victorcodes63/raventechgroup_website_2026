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
  /** Curated static capture for cards when live screenshots break SVG/text logos */
  cardImage?: string
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

/** Canonical Eagle HR marketing site capture — cards, heroes, and related previews */
export const EAGLE_HR_WEBSITE_IMAGE = '/images/case-studies/eagle-hr-website.png'

/**
 * Case-study card media: `cardImage` when Microlink breaks logos; else live screenshot when `siteUrl` is set; else `heroImage`.
 */
export function getCaseStudyImageSrc(study: CaseStudy): { src: string; unoptimized: boolean } {
  if (study.slug === 'eagle-hr-consultants') {
    return { src: EAGLE_HR_WEBSITE_IMAGE, unoptimized: true }
  }
  if (study.slug === 'r4-automotive') {
    return { src: '/images/photos/r4-auto-screen.png', unoptimized: false }
  }
  if (study.cardImage) {
    return { src: study.cardImage, unoptimized: true }
  }
  if (study.siteUrl) {
    return {
      src: `/api/screenshot?url=${encodeURIComponent(study.siteUrl)}`,
      unoptimized: true,
    }
  }
  return { src: study.heroImage, unoptimized: false }
}

/**
 * Detail-page hero backdrop. Stride's card uses the light marketing capture, but the
 * hero needs the dark dashboard crop so the H1 stays legible over the gradient.
 */
export function getCaseStudyHeroSrc(study: CaseStudy): { src: string; unoptimized: boolean } {
  if (study.slug === 'stride') {
    return { src: study.heroImage, unoptimized: false }
  }
  return getCaseStudyImageSrc(study)
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'eagle-hr-consultants',
    client: 'Eagle HR Consultants',
    industry: 'Human Resources',
    industrySlug: 'hr',
    location: '',
    engagementLength: '6 months ongoing',
    year: '2024 — ongoing',
    heroImage: EAGLE_HR_WEBSITE_IMAGE,
    heroImageAlt: 'Eagle HR Consultants public website homepage',
    cardImage: EAGLE_HR_WEBSITE_IMAGE,
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
        image: EAGLE_HR_WEBSITE_IMAGE,
        imageAlt: 'Eagle HR Consultants public website homepage',
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
    slug: 'stride',
    client: 'Stride',
    industry: 'Raven product · Business management',
    industrySlug: 'hr',
    location: 'Nairobi, Kenya · East Africa',
    engagementLength: 'Built and operated by Raven',
    year: '2025 — ongoing',
    heroImage: '/images/case-studies/stride-dashboard.jpg',
    heroImageAlt: 'Stride business management platform — people, payroll, and finance dashboard',
    cardImage: '/images/products/stride-preview.jpg',
    services: ['Software Development', 'System Integration', 'Digital Transformation'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'M-Pesa Daraja API', 'Vercel'],
    tagline: 'Our own product — the platform pattern we proved in client work, productised.',
    problem:
      'Every operating system we built for clients — Eagle HR, logistics operators, clinics — kept solving the same problems: employee records in spreadsheets, payroll in Excel with statutory rules approximated, finance disconnected from the people it pays. Global ERPs were designed elsewhere and adapted for Kenya, with M-Pesa added late and support queued in another timezone. The pattern deserved a product, not another one-off build.',
    solution:
      'Raven built Stride — a business management platform with people, time and leave, payroll, and finance on one data layer. Kenyan statutory compliance is built in, not bolted on: PAYE, NSSF, SHIF, and Housing Levy calculated correctly, with P9 and iTax-ready exports every pay run. M-Pesa disbursements run from the same finance module that carries the ledger. Vertical packs extend the core for logistics, SACCOs, healthcare, and HR consultancies.',
    outcomeHeadline: 'Six core modules on one platform — compliance built in, onboarding in days.',
    outcomeSummary:
      'Stride is live at getstride.co.ke and running real payrolls. Businesses onboard in days with guided setup, run statutory-compliant pay cycles, and disburse via M-Pesa without leaving the platform. Multi-entity compliance covers Kenya and Uganda, and the vertical packs carry the patterns we proved in client engagements.',
    metrics: [
      { value: '6', label: 'Core modules on one platform' },
      { value: 'Days', label: 'Typical guided onboarding' },
      { value: 'KE+UG', label: 'Multi-entity compliance' },
    ],
    featured: false,
    status: 'live',
    siteUrl: 'https://getstride.co.ke',
    publishedAt: '2026-06-01',
    tags: ['Raven Product', 'Payroll & HR', 'M-Pesa Integration'],
    platformModules: [
      'People & workforce',
      'Time & leave',
      'Payroll (Kenya)',
      'Finance & disbursements',
      'Vertical industry packs',
      'Multi-entity compliance',
    ],
    cta: 'Read the Stride story',
    sections: [
      {
        heading: 'From client pattern to product',
        body:
          'The Eagle HR engagement proved the shape: one user directory, one audit log, payroll with KRA compliance, finance on the same records as the people it pays. When the third client needed the same core, the decision was clear — build it once, properly, and operate it as a product. Stride is that build.',
        image: '/images/products/stride-preview.jpg',
        imageAlt: 'Stride platform dashboard showing workforce and payroll modules',
      },
      {
        heading: 'Compliance is the product, not a feature',
        body:
          'Kenyan payroll is not a template you localise. PAYE bands, NSSF tiers, SHIF, and the Housing Levy each carry their own rules and change on their own schedules. Stride calculates them natively and produces P9 and iTax-ready exports every pay run — so a KRA review is a download, not a scramble. Uganda support extends the same engine for multi-entity groups.',
      },
      {
        heading: 'M-Pesa disbursements on the same ledger',
        body:
          'Salary disbursement is where most platforms hand you a bank file and wish you luck. Stride runs M-Pesa disbursements from the finance module directly — the same records that carry approvals and the ledger. Payments reconcile because they never leave the system.',
      },
      {
        heading: 'What operating our own product changes',
        body:
          'Running Stride makes Raven a better consultancy. We carry pager duty for our own uptime, onboard real businesses in days, and feel every rough edge a client would. The vertical packs — logistics, SACCOs, healthcare, HR consultancies — encode what we learned shipping client systems, and client engagements now start from a proven core instead of a blank repo.',
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
    heroImage: '/images/photos/r4-auto-screen.png',
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
    heroImage: '/images/clients/honeybox-store.png',
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
  {
    slug: 'youthplus-festival-2026',
    client: 'Youth+ Africa',
    industry: 'Events · Youth innovation',
    industrySlug: 'events',
    location: 'Nairobi, Kenya',
    engagementLength: '10 weeks to production launch',
    year: '2026',
    heroImage: '/images/case-studies/youthplus-africa-preview.png',
    cardImage: '/images/case-studies/youthplus-africa-preview.png',
    heroImageAlt: 'Youth+ Africa homepage at youthplusafrica.com — hero, tickets, and partner strip',
    services: ['Web Development', 'Software Development', 'Digital Transformation'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    tagline: 'A flagship festival front door with programme depth and ticket clarity.',
    problem:
      "Youth+ runs one of the continent's highest-signal large-format youth gatherings — multi-day labs at Sarit, tiered passes in KES, and a speaker bench that has to read credible on first scroll. They needed a web experience that matched the ambition: editorial storytelling, a dense programme surface, and checkout expectations around M-Pesa and cards — without looking like a generic events template.",
    solution:
      'Raven built the production marketing site on Next.js and shipped it on Vercel. The experience centres a four-day lab grid with dates, tracks, and tier labels; a speaker bench with profile depth and direct links; pass economics surfaced before checkout; and narrative sections that explain outcomes for founders and operators. Supporting rails — FAQs, agenda framing, partner strip, and ecosystem case stories — sit in the same visual system so nothing feels bolted on.',
    outcomeHeadline: 'Festival-week positioning, speaker authority, and ticket paths on one surface.',
    outcomeSummary:
      'Visitors move from headline promise to programme detail to pass selection with consistent typography and motion. The site carries twenty curated speaker profiles, four daily lab rows, three visible pass tiers with stock messaging, and buyer reassurance on QR delivery and payment modes — all deployed as a single responsive product.',
    metrics: [
      { value: '20', label: 'Curated speaker profiles' },
      { value: '4', label: 'Festival lab days on programme' },
      { value: '3', label: 'Pass tiers with availability signal' },
    ],
    featured: false,
    status: 'live',
    siteUrl: 'https://youthplusafrica.com',
    publishedAt: '2026-05-19',
    tags: ['Events', 'Next.js', 'Conversion UX'],
    platformModules: [
      'Festival hero and editorial storytelling',
      'Speaker bench with external credibility links',
      'Session grid with Sarit programme framing',
      'Pass tiers, FAQs, and checkout reassurance',
    ],
    cta: 'Read the Youth+ Africa story',
    sections: [
      {
        heading: 'Why the site had to feel like the event',
        body:
          'A summit landing page that reads thin costs trust before anyone reaches checkout. Youth+ competes for founder attention against pan-African programmes — the UI needed density without clutter: clear dates, session naming, and tier economics so operators could decide fast. We structured the page as a narrative spine with programme proof in the middle and commerce truth at the bottom.',
      },
      {
        heading: 'Programme and passes as one story',
        body:
          'Each lab day maps to a track label — AI, growth, policy, capital — with seat counts visible at the tier level. Pass names stay consistent across the grid and pricing band so marketing and finance stay aligned. Buyers see what “Early Bird” buys them before they leave the page.',
      },
      {
        heading: 'Speaker bench as social proof',
        body:
          'Twenty profiles ship with role lines and short mandate copy — enough for credibility without turning into a CRM export. Cards invite exploration on desktop and swipe-style browsing on mobile so the roster feels alive, not indexed.',
      },
      {
        heading: 'What runs in production',
        body:
          'The festival marketing site is live at youthplusafrica.com — Next.js App Router, strict TypeScript, Tailwind, and Vercel in production. Visitors get programme depth, speaker proof, pass tiers, and checkout reassurance on one domain; ticket purchase routes through integrated commerce partners while the Raven-built front door stays fast on mobile networks across Kenya.',
      },
    ],
  },
  {
    slug: 'all-axs-events',
    client: 'All AXS',
    industry: 'Events · Corporate ticketing',
    industrySlug: 'events',
    location: 'Nairobi, Kenya · Pan-Africa catalogue',
    engagementLength: '12 weeks to first production release',
    year: '2026',
    heroImage: '/images/photos/meeting.png',
    heroImageAlt: 'All AXS — corporate events discovery and ticketing experience',
    services: ['Web Development', 'Software Development', 'System Integration'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    tagline: 'Discovery, purchase, and door-ready passes on one disciplined surface.',
    problem:
      'Corporate forums and summits fail when discovery, fees, and entry feel like three different products. Delegates need honest totals before they pay; organisers need listings that stay on-brand when Wi‑Fi at the venue drops; operations teams need QR delivery that survives queues. All AXS set out to keep everything on one thread — from browse to badge scan — without the noise of bolt-on tools.',
    solution:
      'Raven implemented the All AXS web product end-to-end on Next.js and Vercel: moderated listings, transparent tier and fee language, calendar-first discovery, organiser onboarding storytelling, buyer-protection policies, and a three-step journey narrative (discover, checkout, attend) tuned for low-bandwidth mobile. Production includes demo events in the catalogue so buyers and organisers can see the shape of a live listing before their own drop.',
    outcomeHeadline: 'One platform narrative for delegates and organisers — calm copy, clear economics.',
    outcomeSummary:
      'The live site carries upcoming events with pricing from published tiers, organiser acquisition flows, policy pages that reduce support load, and venue-ready messaging on QR delivery. Filters (calendar, format, tone) give repeat visitors a faster path as the catalogue grows.',
    metrics: [
      { value: '3', label: 'Product stages: discover, pay, attend' },
      { value: '2', label: 'Demo events in launch catalogue' },
      { value: '5', label: 'Trust and ops pages in v1' },
    ],
    featured: false,
    status: 'live',
    siteUrl: 'https://allaxs.vercel.app',
    publishedAt: '2026-04-18',
    tags: ['Event platform', 'Ticketing UX', 'Next.js'],
    platformModules: [
      'Event discovery with calendar and filters',
      'Listing templates with fee transparency',
      'Organiser onboarding and payout narrative',
      'Buyer policies, QR delivery, and support positioning',
    ],
    cta: 'Read the All AXS story',
    sections: [
      {
        heading: 'Corporate events need product discipline',
        body:
          'When listing quality and checkout tone diverge, delegates blame the organiser even when the fault sits in software. All AXS treats every surface — browse grid, detail header, fee breakdown, door copy — as part of one brand promise. That is the brief Raven executed for v1.',
      },
      {
        heading: 'Trust surfaces above the fold',
        body:
          'Fees are stated before payment; refunds reference organiser policy on every listing; QR passes land in email and account copy so venue teams can set expectations in training. Those are product decisions written into layout, not footnotes.',
      },
      {
        heading: 'Organiser acquisition without spreadsheet chaos',
        body:
          'The organiser path walks profile creation, tier design, publish, and door scanning as four numbered moves — mirroring how operators actually run a show. It keeps sales conversations aligned with what the product truly ships today.',
      },
      {
        heading: 'Built for African payment realities',
        body:
          'Checkout copy calls out M-Pesa and cards explicitly; the experience stays usable on constrained networks because heavy interaction sits behind short flows and server-rendered pages. Future payment rails can extend the same pattern without rewriting the buyer story.',
      },
    ],
  },
]

/** Featured first, then published date desc */
export const caseStudiesOrdered: CaseStudy[] = [...caseStudies].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  return b.publishedAt.localeCompare(a.publishedAt)
})
