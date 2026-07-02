/**
 * About page copy — single source of truth.
 * Icons referenced by `components/about/AboutPageContent.tsx`.
 */

export type AboutIconKey =
  | 'compass'
  | 'layers'
  | 'shieldCheck'
  | 'mapPin'
  | 'handshake'
  | 'globe'
  | 'serverCog'
  | 'clipboardCheck'
  | 'sparkles'

/** Default contact form prefill when reaching out from the About page */
export const ABOUT_PAGE_CONTACT_PREFILL =
  'I visited the About page and would like to discuss how Raven can help with our roadmap.'

export const aboutHero = {
  eyebrow: 'Who we are',
  headline: 'Your partner from architecture to operations',
  subline:
    'We embed architecture, engineering, and operations so Kenyan and African teams can ship and run systems with clear ownership—from Westlands, Nairobi across East and West Africa.',
} as const

export const aboutIntro = {
  eyebrow: 'Why we exist',
  headline: 'We partner with teams that need clarity before they need code.',
  body: 'Raven Tech Group is a Nairobi-based consultancy built to help organisations modernise platforms, operate reliably, and scale without hidden surprises. Architecture sprints, embedded delivery, and managed operations sit under one accountable roof.',
  imageSrc: '/images/photos/collage-1.jpg',
  imageAlt: 'Collaboration and delivery — Raven Tech Group, Nairobi',
} as const

export const executiveHighlights = [
  {
    label: 'Founded',
    value: '2024',
    description: 'Registered in Nairobi to serve organisations that depend on resilient digital infrastructure.',
  },
  {
    label: 'Headquarters',
    value: 'Westlands, Nairobi',
    description:
      'Core team works in-person with partners across East and Central Africa and the Middle East for real-time collaboration.',
  },
  {
    label: 'Disciplines',
    value: 'Architecture · Engineering · Operations',
    description: 'Embedded teams aligning product strategy, delivery execution, and platform health.',
  },
] as const

export const operatingLanes = [
  {
    icon: 'compass' as const,
    title: 'Strategy dives first',
    summary:
      'Every engagement starts with a structured immersion to surface constraints, co-define outcomes, and set the operating rhythm.',
    bullets: [
      '10–15 day architecture sprint',
      'Decision logs & risk mapping shared with leadership',
      'Target metrics defined before build begins',
    ],
  },
  {
    icon: 'layers' as const,
    title: 'Build with shared rituals',
    summary:
      'The same team that scoped the work designs, ships, and demos progress. We document as we go so nothing lives in one person’s head.',
    bullets: [
      'Weekly cadence reviews and demos',
      'Automated testing, CI/CD, and observability as defaults',
      'Product owners invited into delivery channels',
    ],
  },
  {
    icon: 'shieldCheck' as const,
    title: 'Operate and improve together',
    summary:
      'Runbooks, handover paths, and managed operations keep platforms steady. We stay on to iterate once the first release ships.',
    bullets: [
      'Incident playbooks with clear escalation paths',
      'Reliability scorecards reviewed monthly',
      'Roadmap co-authored with client teams',
    ],
  },
] as const

export const capabilityMatrix = [
  {
    engagement: 'Platform modernisation',
    objectives: 'Refactor or rebuild core systems to unlock product roadmap velocity.',
    teamRoles: 'Solution architect · Full-stack duo · Cloud engineer',
    signal: 'Good fit when change requests move slowly because of legacy code or infrastructure risk.',
  },
  {
    engagement: 'Embedded delivery',
    objectives: 'Spin up a multi-disciplinary pod that plugs into your workflows and ships alongside internal teams.',
    teamRoles: 'Product-minded tech lead · Engineers across frontend/backend · Delivery lead',
    signal: 'Use when you need experienced hands without large consultancy overhead or one-off contractors.',
  },
  {
    engagement: 'Managed platform operations',
    objectives: 'Stabilise infrastructure, security posture, and release cadence for live products.',
    teamRoles: 'Operations lead · SRE/DevOps engineer · Support rotation',
    signal: 'Ideal when teams need uptime, incident response, and optimisation without building an in-house ops function.',
  },
] as const

export const timelineMoments = [
  {
    year: '2024',
    title: 'Raven Tech Group incorporates',
    caption:
      'Victor formalises the company in Nairobi with a mandate to serve regulated industries and growth-stage teams.',
  },
  {
    year: '2025',
    title: 'Pilot programmes underway',
    caption: 'Architecture sprints and delivery pods supporting finance and public-institution teams in Kenya.',
  },
  {
    year: '2026',
    title: 'Scaling operating playbooks',
    caption: 'Codifying reusable delivery frameworks, security baselines, and enablement for longer-term partners.',
  },
] as const

export const founderProfile = {
  name: 'Victor Chumo',
  title: 'Founder & Managing Director',
  message: [
    'I founded Raven because too many organisations had to pick between large consultancies that move slowly and ad-hoc contractors who disappear after launch. We built a firm that embeds with your team, keeps risks visible, and documents every decision along the way.',
    'Our job is to make sure the systems you rely on stay reliable—from architecture sprints that surface constraints to day-to-day delivery and operations. Accountability is the through-line; you’ll always know who owns what and how the work is progressing.',
  ],
  note: 'Thank you for trusting us with the critical platforms your customers depend on.',
  imageSrc: '/images/website-potrait.png',
  imageAlt: 'Victor Chumo, Founder and Managing Director — Raven Tech Group, Nairobi',
  /** Add `public/images/founder-signature.png` (transparent PNG recommended). Hidden automatically if the file is missing. */
  signatureImageSrc: '/images/founder-signature.png',
  signatureAlt: 'Victor Chumo signature',
} as const

export const founderCommitments = [
  'We step in only when we can stay accountable from strategy to operations.',
  'We hire multidisciplinary builders who document as they ship.',
  'We leave every engagement with playbooks your teams can keep using.',
] as const

export const ecosystemNodes = [
  {
    icon: 'mapPin' as const,
    title: 'Nairobi HQ',
    description: 'Westlands base for strategy workshops, design sprints, and in-person roadmap reviews.',
  },
  {
    icon: 'handshake' as const,
    title: 'Specialist partners',
    description: 'Compliance advisors, QA teams, and design studios across Kenya and Rwanda augment our delivery teams when needed.',
  },
  {
    icon: 'globe' as const,
    title: 'Global network',
    description: 'Subject-matter experts in Europe and the Middle East available for short, high-impact engagements.',
  },
] as const

export const toolingStandards = [
  {
    icon: 'serverCog' as const,
    title: 'Engineering & tooling',
    items: ['TypeScript', 'React & Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker'],
  },
  {
    icon: 'clipboardCheck' as const,
    title: 'Delivery operations',
    items: ['Notion workspaces', 'Linear or Jira backlogs', 'Automated CI/CD', 'Quality gates & code reviews'],
  },
  {
    icon: 'sparkles' as const,
    title: 'Security & reliability',
    items: ['Infrastructure-as-code', 'Zero trust access policies', 'Observability dashboards', 'Incident response runbooks'],
  },
] as const

export const aboutFaqItems = [
  {
    question: 'How do engagements typically start?',
    answer: 'We run a 10-day architecture sprint to clarify scope, surface risks, and define measurable outcomes before build begins.',
  },
  {
    question: 'Do you outsource delivery?',
    answer: 'Core delivery roles are Raven employees. Specialists join transparently when compliance or niche expertise is required.',
  },
  {
    question: 'What industries do you focus on?',
    answer: 'Finance, public institutions, and growth-stage SMEs where reliability, regulation, and scale intersect.',
  },
  {
    question: 'Where are your teams located?',
    answer: 'Primary team in Nairobi with collaborators across Africa and Europe for overlap coverage.',
  },
  {
    question: 'How do you report progress?',
    answer: 'Weekly delivery reviews, shared dashboards, and decision logs ensure stakeholders see momentum and blockers in real time.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We stay on for managed operations, incident response, and roadmap acceleration based on agreed success metrics.',
  },
  {
    question: 'Can you work with existing teams?',
    answer: 'Yes. We embed alongside internal engineering, product, and operations teams to share context and uplift capability.',
  },
  {
    question: 'How do you price engagements?',
    answer: 'Based on team composition and engagement length. We scope transparently after the architecture sprint.',
  },
  {
    question: 'Do you offer project-only work?',
    answer: 'We favour partnerships where we can stay accountable beyond the first release, but we evaluate on a case-by-case basis.',
  },
  {
    question: 'What tooling do you integrate with?',
    answer: 'We adapt to client workflows—whether you use Azure DevOps, Jira, or bespoke tooling—while recommending best practices.',
  },
  {
    question: 'How do you handle security reviews?',
    answer: 'Threat models, secure SDLC checkpoints, and compliance documentation are baked into delivery cadences.',
  },
  {
    question: 'Can you support hybrid or on-prem infrastructure?',
    answer: 'Yes, we design automation and observability that bridge cloud and on-prem environments where required.',
  },
  {
    question: 'What is your response time for support?',
    answer: 'Active engagements have sub-24-hour response targets with clear escalation paths for critical issues.',
  },
  {
    question: 'How do you ensure knowledge transfer?',
    answer: 'Documentation, pairing, and recorded walkthroughs are mandatory so internal teams can operate confidently.',
  },
  {
    question: 'Do you help with hiring or upskilling?',
    answer: 'We co-create capability plans, mentor internal teams, and assist with interviewing when engagements require it.',
  },
  {
    question: 'What does success look like to you?',
    answer: 'Platforms that your team can evolve without us, with reliability scores and delivery cadence improving month over month.',
  },
] as const

export const aboutClosingCta = {
  eyebrow: 'Next step',
  headline: 'See whether an embedded Raven team is the right fit',
  body: 'Share where your platform or roadmap needs reinforcement—we map a sprint-by-sprint plan with clear measures of success.',
  primaryLabel: 'Start a conversation',
  primaryHref: `/contact?prefillMessage=${encodeURIComponent(ABOUT_PAGE_CONTACT_PREFILL)}`,
  secondaryLabel: 'View open roles',
  secondaryHref: '/careers',
  tertiaryLabel: 'Explore services',
  tertiaryHref: '/services',
} as const

export const aboutEngagementSection = {
  eyebrow: 'Engagements',
  headline: 'Where we add the most value',
  body: 'We share this capability board before work starts so stakeholders know what to expect and when to bring us in.',
} as const

export const aboutOperateSection = {
  eyebrow: 'How we work',
  headline: 'Strategy, build, and run under one accountable team',
  body: 'Raven exists for engagements that need accountability from discovery through operations. Here is what that looks like inside.',
} as const

export const aboutMilestonesSection = {
  eyebrow: 'Milestones',
  headline: 'A young company with a documented journey',
  body: 'These moments keep us honest about progress. We share them so you know exactly who you are working with.',
} as const

export const aboutFounderSection = {
  eyebrow: 'From the founder',
  headline: 'Why Raven was built and how we show up',
} as const

export const aboutEcosystemSection = {
  eyebrow: 'Ecosystem',
  headline: 'Partners who extend our capability',
  body: 'We work with specialists who understand regulated environments, UX, and compliance in the regions we serve.',
} as const

export const aboutToolingSection = {
  eyebrow: 'Our standards',
  headline: 'Tooling and operating principles',
  body: 'Stacks vary by client—these non-negotiables keep delivery predictable and secure.',
} as const

export const aboutFaqSection = {
  eyebrow: 'Common questions',
  headline: 'Answers before the first call',
} as const

export const aboutLeadBand = {
  eyebrow: 'Stay informed',
  headline: 'Notes for teams building in East Africa',
  subline:
    'The Raven Brief—delivery, infrastructure, and security. One field, no spam. Subscribers hear about new field notes first.',
} as const
