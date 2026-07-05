import type { ServiceDetail } from '@/app/services/[slug]/service-page-types'

import { EAGLE_HR_SERVICE_TESTIMONIALS } from '@/lib/data/clientTestimonials'
import { SERVICE_PAGE_RELATED_INSIGHTS } from '@/lib/data/servicePageInsights'

export { SERVICE_PAGE_RELATED_INSIGHTS }

export const SOFTWARE_DEVELOPMENT_CUSTOMER_FEEDBACK: NonNullable<ServiceDetail['customerFeedback']> =
  EAGLE_HR_SERVICE_TESTIMONIALS

export const SERVICE_NUMBERED_BENEFITS: Record<string, NonNullable<ServiceDetail['numberedBenefits']>> = {
  'software-development': [
    {
      number: '01',
      title: 'Software that fits your actual workflow',
      description:
        'We map how your team really works — including the WhatsApp threads, the Excel exports, the manual approvals — and build software that removes the friction instead of pretending it does not exist.',
    },
    {
      number: '02',
      title: 'Africa-ready integrations from day one',
      description:
        'M-Pesa, Airtel Money, KRA eTIMS, local payment processors — we build for the stack Kenyan businesses actually run on, not what looks good on a US pitch deck.',
    },
    {
      number: '03',
      title: 'Systems your team can actually run',
      description:
        'Documentation in plain language. Admin panels built for real users. Training with your staff. No black boxes and no forced vendor lock-in.',
    },
    {
      number: '04',
      title: 'Delivery you can verify',
      description:
        'Two-week demos, weekly progress updates, and repository access from day one. You see what is being built while it is being built.',
    },
    {
      number: '05',
      title: 'Partnership beyond launch',
      description:
        'We stay on for performance work, new features, and scaling — or we hand over with documentation your team can own. You choose the model.',
    },
  ],
  'cloud-solutions': [
    {
      number: '01',
      title: 'Landing zones that survive real governance',
      description:
        'Identity, networking, and logging baselines designed for Kenyan regulated environments — not a generic AWS template that breaks the first time audit asks for evidence.',
    },
    {
      number: '02',
      title: 'Spend visibility before finance escalates',
      description:
        'FinOps dashboards, budgets, and anomaly alerts in KES terms your CFO recognises. We tie cloud cost to teams and products, not mystery line items.',
    },
    {
      number: '03',
      title: 'Migrations that keep core paths online',
      description:
        'Cutover plans for M-Pesa hooks, batch windows, and member-facing channels. We rehearse rollback so SACCO and fintech traffic does not become the test environment.',
    },
    {
      number: '04',
      title: 'Infrastructure as code your engineers can extend',
      description:
        'Terraform and Pulumi modules with READMEs, review rules, and pipelines — automation your Nairobi team can maintain without flying a consultant in monthly.',
    },
    {
      number: '05',
      title: 'Operate without heroics',
      description:
        'Runbooks, on-call rotations, and SLOs that match how you actually respond to incidents — including working hours and escalation paths that fit East African operations.',
    },
  ],
  cybersecurity: [
    {
      number: '01',
      title: 'Controls mapped to what regulators ask for',
      description:
        'CBK-facing narratives, evidence trails, and risk registers that connect technical fixes to board questions — not a PDF that sits in a folder until audit week.',
    },
    {
      number: '02',
      title: 'Testing that mirrors real attackers',
      description:
        'Penetration tests covering internet-facing apps, APIs, and privileged access paths common in Kenyan fintech and SACCO stacks — including mobile money touchpoints.',
    },
    {
      number: '03',
      title: 'Secure SDLC your developers will follow',
      description:
        'Practical code review rhythms, dependency scanning, and release gates sized for small teams — heavy enough to reduce risk, light enough to keep shipping.',
    },
    {
      number: '04',
      title: 'Detection that wakes the right people',
      description:
        'SIEM rules, alert routing, and escalation trees tuned to your staffing — so midnight pages go to people who can act, not a shared inbox nobody owns.',
    },
    {
      number: '05',
      title: 'Incident rehearsal, not theatre',
      description:
        'Tabletops with your legal, comms, and IT leads using scenarios grounded in regional outage and fraud patterns — then we update runbooks with what you learned.',
    },
  ],
  'digital-transformation': [
    {
      number: '01',
      title: 'KPIs your executives already track',
      description:
        'We anchor programmes to loan turnaround, member onboarding, claims cycle time, or inventory accuracy — not vague “digital maturity” scores.',
    },
    {
      number: '02',
      title: 'Process truth before tool shopping',
      description:
        'Workshops on how approvals, reconciliations, and exceptions really happen — including shadow IT — so automation targets the bottleneck, not the easiest slide.',
    },
    {
      number: '03',
      title: 'Pilot budgets that fit Nairobi reality',
      description:
        '12-week pilots with clear kill criteria, so you prove value before multi-year licences drain capex that could fund engineering talent locally.',
    },
    {
      number: '04',
      title: 'Change management with frontline buy-in',
      description:
        'Training in Kiswahili or English, job aids for branch staff, and sponsor coalitions that include operations — not an email from HQ announcing “go live Monday”.',
    },
    {
      number: '05',
      title: 'Measurement that survives the steering committee',
      description:
        'Dashboards and benefit tracking your finance team trusts — baselined before kickoff, reviewed every fortnight, and tied to executive incentives where it matters.',
    },
  ],
  'it-consulting': [
    {
      number: '01',
      title: 'Decisions documented for boards and investors',
      description:
        'Architecture memos, risk registers, and roadmap narratives in language non-technical directors understand — critical when raising or defending spend in Nairobi boardrooms.',
    },
    {
      number: '02',
      title: 'Delivery coaching grounded in your constraints',
      description:
        'We reset rituals around your hiring curve, vendor latency, and payment cycles — not a textbook Scrum rollout that ignores how Kenyan teams actually work.',
    },
    {
      number: '03',
      title: 'Technical due diligence you can defend',
      description:
        'Acquisition, investment, or partnership reviews with clear findings on code, security, and technical debt — structured so lawyers and founders see the same facts.',
    },
    {
      number: '04',
      title: 'Vendor and contract clarity before you sign',
      description:
        'RFP scoring, SLA review, and exit clauses for global SaaS sold through local resellers — fewer surprises when support tickets sit in the wrong timezone.',
    },
    {
      number: '05',
      title: 'Fractional leadership with a handover plan',
      description:
        'We build the leadership bench, documentation, and hiring profile so you can transition to a full-time CTO or VP without losing institutional memory.',
    },
  ],
  'system-integration': [
    {
      number: '01',
      title: 'API contracts that survive version drift',
      description:
        'Versioning, error semantics, and retry rules spelled out before two vendors blame each other — common when African enterprises stitch global SaaS to local rails.',
    },
    {
      number: '02',
      title: 'M-Pesa and bank feeds with reconcilable data',
      description:
        'Idempotent callbacks, settlement files, and ledger alignment so finance closes the day without spreadsheet surgery.',
    },
    {
      number: '03',
      title: 'Pipelines your auditors can trace',
      description:
        'Lineage, retention, and access controls for data moving between ERP, CRM, and data stores — evidence-friendly for CBK, donor, or ISO-style reviews.',
    },
    {
      number: '04',
      title: 'Observability on the integrations that matter',
      description:
        'Dashboards and alerts on the handful of flows that drive revenue — not noise from every microservice when your team is five engineers, not fifty.',
    },
    {
      number: '05',
      title: 'Rollouts that respect branch hours',
      description:
        'Deployment windows and rollback paths aligned to peak traffic on mobile networks and retail hours — fewer “we will fix tonight” messages to customers.',
    },
  ],
  'web-development': [
    {
      number: '01',
      title: 'Performance for Kenyan mobile networks',
      description:
        'Lightweight bundles, tuned images, and caching strategies tested on real 3G/4G conditions — not Lighthouse scores measured only on fibre in Westlands.',
    },
    {
      number: '02',
      title: 'SEO structure for local intent',
      description:
        'Metadata, schema, and internal linking that reflect how Nairobi buyers search — service pages, neighbourhoods, and Swahili/English content hooks where they help.',
    },
    {
      number: '03',
      title: 'CMS ownership for marketing',
      description:
        'Editor workflows, guardrails, and previews so your team ships copy and campaigns without waiting on a deploy queue.',
    },
    {
      number: '04',
      title: 'Accessible, credible brand experiences',
      description:
        'Contrast, keyboard paths, and form design that pass scrutiny from enterprise procurement and international partners — not just “looks fine on my phone”.',
    },
    {
      number: '05',
      title: 'Analytics you can act on',
      description:
        'GA4, Search Console, and conversion events wired to real funnels — enquiries, sign-ups, and purchases — with dashboards your leadership actually reviews.',
    },
  ],
}

export const SERVICE_INDUSTRIES: Record<string, NonNullable<ServiceDetail['industries']>> = {
  'software-development': [
    { name: 'SACCOs & cooperatives', slug: 'saccos' },
    { name: 'Fintechs', slug: 'fintechs' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'Logistics', slug: 'logistics' },
    { name: 'NGOs', slug: 'ngos' },
    { name: 'Public sector', slug: 'public-sector' },
    { name: 'Education', slug: 'education' },
    { name: 'Real estate', slug: 'real-estate' },
  ],
  'cloud-solutions': [
    { name: 'SACCOs & cooperatives', slug: 'saccos' },
    { name: 'Fintechs', slug: 'fintechs' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'Logistics', slug: 'logistics' },
    { name: 'Public sector', slug: 'public-sector' },
    { name: 'NGOs', slug: 'ngos' },
  ],
  cybersecurity: [
    { name: 'Fintechs', slug: 'fintechs' },
    { name: 'SACCOs & cooperatives', slug: 'saccos' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'Public sector', slug: 'public-sector' },
  ],
  'digital-transformation': [
    { name: 'SACCOs & cooperatives', slug: 'saccos' },
    { name: 'Fintechs', slug: 'fintechs' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'Logistics', slug: 'logistics' },
    { name: 'Retail', slug: 'retail' },
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'NGOs', slug: 'ngos' },
    { name: 'Public sector', slug: 'public-sector' },
    { name: 'Education', slug: 'education' },
    { name: 'Real estate', slug: 'real-estate' },
  ],
  'it-consulting': [
    { name: 'Fintechs', slug: 'fintechs' },
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'SACCOs & cooperatives', slug: 'saccos' },
    { name: 'Education', slug: 'education' },
    { name: 'Real estate', slug: 'real-estate' },
  ],
  'system-integration': [
    { name: 'Fintechs', slug: 'fintechs' },
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'Logistics', slug: 'logistics' },
    { name: 'SACCOs & cooperatives', slug: 'saccos' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'Retail', slug: 'retail' },
  ],
  'web-development': [
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'Retail', slug: 'retail' },
    { name: 'Fintechs', slug: 'fintechs' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'Real estate', slug: 'real-estate' },
    { name: 'Education', slug: 'education' },
    { name: 'SACCOs & cooperatives', slug: 'saccos' },
  ],
}

export const SERVICE_SUPPORTING_IMAGES: Record<string, { image: string; alt: string }> = {
  'software-development': {
    image: '/images/services/software-development.jpeg',
    alt: 'Custom software engineering workspace — Raven Tech Group, Nairobi Kenya technology consultancy',
  },
  'cloud-solutions': {
    image: '/images/services/cloud-solutions.jpeg',
    alt: 'Cloud infrastructure and migration consulting — AWS Azure Kenya, Raven Tech Group',
  },
  cybersecurity: {
    image: '/images/services/cybersecurity.jpeg',
    alt: 'Cybersecurity assessment and compliance services Kenya — Raven Tech Group',
  },
  'digital-transformation': {
    image: '/images/services/digital-transformation.jpeg',
    alt: 'Digital transformation strategy and automation — Kenyan businesses, Raven Tech Group',
  },
  'it-consulting': {
    image: '/images/services/it-consulting.jpeg',
    alt: 'Fractional CTO and IT consulting Nairobi — Raven Tech Group',
  },
  'system-integration': {
    image: '/images/services/system-inetrgration.jpeg',
    alt: 'API, M-Pesa, and enterprise system integration Kenya — Raven Tech Group',
  },
  'web-development': {
    image: '/images/services/web-development.jpeg',
    alt: 'Next.js web development and SEO-ready sites Kenya — Raven Tech Group',
  },
}
