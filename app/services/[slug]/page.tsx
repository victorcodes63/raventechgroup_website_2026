import { Metadata } from 'next'

import { notFound } from 'next/navigation'
import { ServiceSideNavLayout } from '@/components/services/ServiceSideNavLayout'
import {
  SERVICE_INDUSTRIES,
  SERVICE_NUMBERED_BENEFITS,
  SERVICE_PAGE_RELATED_INSIGHTS,
  SERVICE_SUPPORTING_IMAGES,
  SOFTWARE_DEVELOPMENT_CUSTOMER_FEEDBACK,
} from '@/lib/data/servicePageOverlays'
import { SERVICE_CLOSING_CTA } from '@/lib/data/serviceClosingCta'
import { getServiceIntakeSpotlightImageSrc } from '@/lib/data/serviceIntakeSpotlights'
import { services } from '@/lib/data/services'
import { ServiceSections } from './ServiceSections'
import { ServiceHero } from './ServiceHero'
import type { ServiceClosingCta, ServiceDetail } from './service-page-types'
import { buildServiceNavItems } from './serviceNavItems'

function defaultClosingCta(slug: string): ServiceClosingCta {
  const title = services.find((s) => s.slug === slug)?.title ?? slug
  return {
    eyebrow: 'Next step',
    headline: `Talk to us about ${title.toLowerCase()}.`,
    body:
      'Share context, constraints, and timeline — we reply with a clear next step, not a generic brochure.',
    primaryLabel: 'Contact Raven',
    contactPrefill: `I'm interested in ${title} — brief context:`,
  }
}

function mergeServiceDetail(slug: string, detail: ServiceDetail): ServiceDetail {
  const supporting = SERVICE_SUPPORTING_IMAGES[slug]
  return {
    ...detail,
    numberedBenefits: SERVICE_NUMBERED_BENEFITS[slug],
    industries: SERVICE_INDUSTRIES[slug],
    relatedInsights: SERVICE_PAGE_RELATED_INSIGHTS,
    heroSupportingImage: supporting.image,
    heroSupportingImageAlt: supporting.alt,
    customerFeedback:
      slug === 'software-development' ? SOFTWARE_DEVELOPMENT_CUSTOMER_FEEDBACK : detail.customerFeedback,
    closingCta: SERVICE_CLOSING_CTA[slug] ?? defaultClosingCta(slug),
  }
}

const SERVICE_SEO_TITLES: Record<string, string> = {
  'software-development':
    'Custom Software Development Kenya | SACCO, Fintech & HRMS | Raven Tech Group',
  'cloud-solutions':
    'AWS Cloud Migration Kenya | Fintech & SACCO Cloud Solutions | Raven Tech Group',
  cybersecurity: 'Cybersecurity Services Kenya | CBK Compliance, Pen Testing | Raven Tech Group',
  'digital-transformation':
    'Digital Transformation Kenya | Process Automation for SMEs | Raven Tech Group',
  'it-consulting': 'Fractional CTO Kenya | IT Consulting & Architecture Advisory | Raven Tech Group',
  'system-integration': 'System Integration Kenya | M-Pesa, APIs, ETL | Raven Tech Group',
  'web-development': 'Web Development Kenya | Fast, SEO-Ready Websites & Portals | Raven Tech Group',
}

const SERVICE_SEO_DESCRIPTIONS: Record<string, string> = {
  'software-development':
    'Kenyan custom software development — SACCO platforms, M-Pesa integration, HRMS, ERP systems. Built in Westlands Nairobi, shipped in 8-12 weeks. Discovery call free.',
  'cloud-solutions':
    'AWS and Azure cloud migration for Kenyan fintechs, SACCOs, and growth businesses. Infrastructure as code, FinOps, 24/7 support. Nairobi-based team.',
  cybersecurity:
    'Penetration testing, CBK compliance, incident response for Kenyan fintechs and SACCOs. ISO 27001 aligned. Westlands Nairobi.',
  'digital-transformation':
    'Digital transformation for Kenyan businesses — process automation, data platforms, change management. From 12-week pilots to enterprise programs.',
  'it-consulting':
    'Fractional CTO and IT consulting for Kenyan founders and CTOs. Architecture reviews, delivery coaching, technical due diligence. Nairobi-based.',
  'system-integration':
    'M-Pesa integration, API orchestration, ETL pipelines, enterprise system connections for Kenyan businesses. Specialists in fintech and e-commerce.',
  'web-development':
    'Next.js websites, customer portals, and Shopify stores built for Kenyan mobile users. 90+ Lighthouse scores. Westlands Nairobi.',
}

const SERVICE_SEO_KEYWORDS: Record<string, string[]> = {
  'software-development': [
    'custom software development Kenya',
    'SACCO software Nairobi',
    'HRMS development Kenya',
    'M-Pesa integration developers',
    'fintech software East Africa',
    'business software Westlands',
    'ATS recruitment platform Kenya',
    'ERP Kenya SME',
    'software consultancy Nairobi',
    'Next.js development Kenya',
    'PostgreSQL Kenya',
    'technology partner Africa',
  ],
  'cloud-solutions': [
    'AWS migration Kenya',
    'Azure cloud Nairobi',
    'SACCO cloud infrastructure',
    'fintech cloud compliance Kenya',
    'Terraform Kenya',
    'FinOps Kenya',
    'cloud landing zone East Africa',
    'Kubernetes Nairobi',
    'multi-cloud Kenya',
    'cloud cost optimisation Africa',
    'Neon Postgres Kenya',
    'infrastructure as code Kenya',
  ],
  cybersecurity: [
    'cybersecurity Kenya',
    'penetration testing Nairobi',
    'CBK compliance IT',
    'fintech security Africa',
    'SACCO cybersecurity',
    'ISO 27001 Kenya',
    'incident response Nairobi',
    'SIEM Kenya',
    'GRC advisory East Africa',
    'application security Kenya',
    'threat assessment Africa',
    'secure SDLC Kenya',
  ],
  'digital-transformation': [
    'digital transformation Kenya',
    'process automation Nairobi',
    'SME digital strategy',
    'change management Kenya',
    'data platform East Africa',
    'workflow automation Kenya',
    'executive technology roadmap',
    'KPI-led transformation',
    'business process redesign Nairobi',
    'low-code automation Kenya',
    'analytics enablement Africa',
    'digital operating model',
  ],
  'it-consulting': [
    'fractional CTO Kenya',
    'IT consulting Nairobi',
    'technology advisory East Africa',
    'architecture review Kenya',
    'technical due diligence Nairobi',
    'delivery coaching Kenya',
    'engineering leadership Africa',
    'vendor evaluation Kenya',
    'CTO-as-a-service Nairobi',
    'technology roadmap Kenya',
    'board technology briefing',
    'startup CTO Kenya',
  ],
  'system-integration': [
    'system integration Kenya',
    'M-Pesa API integration',
    'API orchestration Nairobi',
    'ETL pipelines East Africa',
    'enterprise integration Kenya',
    'e-commerce integration Kenya',
    'middleware Kenya',
    'Kafka Nairobi',
    'iPaaS Kenya',
    'data sync SACCO',
    'payment integration Africa',
    'ERP integration Kenya',
  ],
  'web-development': [
    'web development Kenya',
    'Next.js agency Nairobi',
    'SEO website Kenya',
    'Shopify Kenya',
    'customer portal development',
    'Core Web Vitals Kenya',
    'headless CMS Kenya',
    'corporate website Nairobi',
    'e-commerce development East Africa',
    'technical SEO Kenya',
    'Lighthouse optimisation',
    'Vercel deployment Kenya',
  ],
}

const serviceDetailsBase: Record<string, ServiceDetail> = {
  'software-development': {
    overview:
      'When spreadsheets, phone calls, and workarounds start costing you real time and revenue, we help you turn priorities into software that works—customer-facing platforms, internal tools, and mobile apps with clear milestones, honest updates, and explanations in plain language. You stay focused on the business; we handle the build.',
    highlights: [
      'Discovery sessions that translate goals into a roadmap you can share with your board',
      'Product builds with regular demos—so you always see progress, not surprises',
      'Security-minded delivery with documentation your team can actually use',
      'Support after launch: improvements, training, and a partner who picks up the phone',
    ],
    outcomes: [
      'Fewer manual steps and fewer errors as routine work moves into one reliable system',
      'A platform that can grow with you—new features without starting from scratch',
      'One accountable team aligned to your leadership, not a black box',
    ],
    ctaLabel: 'Get expert advice',
    heroEyebrow: 'Engineering',
    heroHeadline: 'Software that ships.',
    heroHeadlineSub: 'Outcomes that last.',
    heroImageAlt: 'Business leaders collaborating in a modern office',
    engagementSignals: [
      'You can name who will own decisions on your side—so we never wait weeks for an answer.',
      'You want something live in the next few months, not a never-ending study.',
      'You care that the system is safe and dependable, not just that it launches.',
    ],
    clientCommitments: [
      'Put the right people in the room when we need context—finance, operations, or frontline staff.',
      'Agree up front what “success” looks like, and review it with us on a steady rhythm.',
      'Use the simple shared tools we set up for updates and documents so nothing gets lost in email.',
    ],
    capabilities: [
      {
        title: 'Products your customers and staff actually use',
        description:
          'From customer portals to internal dashboards—interfaces that feel intentional, load quickly, and hold up as you add users.',
        points: [
          'Web and mobile experiences designed around your real workflows',
          'Systems that talk to each other so you are not retyping the same data',
          'Room to grow: new features without rebuilding from zero',
        ],
      },
      {
        title: 'Design and delivery in step',
        description: 'We keep design, testing, and build in one rhythm so approvals are fast and surprises are rare.',
        points: [
          'Shared references everyone can see—not ambiguous PDFs',
          'Accessibility and clarity treated as part of quality, not an afterthought',
          'Review checkpoints before anything goes live',
        ],
      },
      {
        title: 'After launch, we do not disappear',
        description: 'Training, tuning, and a clear path when something needs to change or scale.',
        points: [
          'Monitoring that flags issues before your customers do',
          'Plain-language runbooks for your team',
          'Regular check-ins with leadership on what to improve next',
        ],
      },
    ],
    deliveryApproach: [
      {
        title: 'Align on the real problem',
        description:
          'A focused start: we map how work gets done today, agree what success looks like for your business, and produce a plan you can stand behind—usually within about two weeks.',
      },
      {
        title: 'Build in visible slices',
        description:
          'You see working software on a regular cadence, with short updates and space to adjust priorities. No six-month blackout period.',
      },
      {
        title: 'Launch and support',
        description:
          'Go-live prep your team understands, then either ongoing improvements with us or a clean handover—with documentation that is meant to be read.',
      },
    ],
    teamStructure: [
      {
        role: 'Product & delivery lead',
        focus: 'Keeps stakeholders aligned, runs cadences, and ensures decisions stay tied to measurable outcomes.',
      },
      {
        role: 'Lead engineer / architect',
        focus: 'Owns technical direction, code quality, and architecture runway while pairing with client engineers.',
      },
      {
        role: 'Full-stack engineers',
        focus: 'Ship features, write tests, and maintain documentation with a focus on performance and accessibility.',
      },
      {
        role: 'Designer / UX partner',
        focus: 'Creates or extends design systems, supports discovery, and validates experiences with stakeholders.',
      },
      {
        role: 'Ops & QA support',
        focus: 'Sets up CI/CD, observability, and testing automation so delivery stays predictable.',
      },
    ],
    sampleTimeline: [
      {
        phase: 'Weeks 1–2',
        duration: 'Discovery & architecture immersion',
        focus: 'Workshops, success metrics, architecture blueprint, backlog shaping, delivery plan.',
      },
      {
        phase: 'Weeks 3–8',
        duration: 'Build phase one',
        focus: 'Core platform foundations, design system setup, first incremental releases, observability baseline.',
      },
      {
        phase: 'Weeks 9–14',
        duration: 'Build phase two',
        focus: 'Feature acceleration, integrations, non-functional hardening, user acceptance testing.',
      },
      {
        phase: 'Weeks 15–16',
        duration: 'Launch & transition',
        focus: 'Runbooks, go-live readiness, training sessions, post-launch monitoring, roadmap refresh.',
      },
    ],
    successMetrics: [
      'Commitment to two-week release cadence with demo artefacts and decision logs.',
      'Uptime, performance, or security targets agreed at the start and tracked in shared dashboards.',
      'Knowledge transfer milestones completed—documentation, runbooks, and training recordings.',
    ],
    tooling: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker', 'Terraform', 'GitHub Actions', 'Sentry', 'Storybook'],
    faqs: [
      {
        question: 'How quickly can delivery start?',
        answer:
          'Discovery wraps in 10 days. With scope agreed, we stand up a core team—tech lead, engineers, designer, delivery lead—within two weeks of sign-off.',
      },
      {
        question: 'Do you work with existing teams?',
        answer:
          'Yes. We embed alongside your engineers and product managers, adopt your rituals, and introduce structured governance so everyone stays aligned.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'We offer ongoing feature velocity and operations support. If you prefer, we hand over runbooks, documentation, and training sessions to your team.',
      },
    ],
    relatedCaseStudies: [
      {
        slug: 'eagle-hr-consultants',
        client: 'Eagle HR Consultants',
        outcome: 'Full business operating system with ATS, HRMS, and Finance modules',
      },
    ],
  },
  'cloud-solutions': {
    overview:
      'When cloud costs spiral or environments become unpredictable, we help Kenyan and East African businesses take back control — migration roadmaps, infrastructure codified in Terraform, and operations your team can actually run. No vendor lock-in theatre. No surprise invoices. Just cloud environments that scale with your business.',
    highlights: [
      'Cloud readiness assessments and architecture design',
      'Infrastructure as Code with Terraform and Pulumi',
      'FinOps practices to monitor and optimize spend',
      '24/7 reliability and incident response coverage',
    ],
    outcomes: [
      'Lower infrastructure spend through smart automation',
      'Stronger resilience with multi-region, multi-cloud setups',
      'Compliance-ready environments aligned to ISO 27001 and SOC 2',
    ],
    ctaLabel: 'Modernize in the cloud',
    heroEyebrow: 'Engineering',
    heroHeadline: 'Cloud infrastructure you can trust.',
    heroHeadlineSub: 'Delivery you can verify.',
    heroImageAlt: 'Engineers reviewing cloud infrastructure dashboards',
    engagementSignals: [
      'You are planning a cloud migration or need to stabilise an existing footprint.',
      'Regulatory, security, or cost visibility requirements are rising quickly.',
      'Internal teams need infrastructure guardrails without slowing velocity.',
    ],
    clientCommitments: [
      'Provide access to infrastructure owners and compliance stakeholders for the immersion phase.',
      'Agree on cost, resilience, and security KPIs to review every month.',
      'Adopt Infra-as-Code repositories and observability tooling we set up.',
    ],
    capabilities: [
      {
        title: 'Landing zones & foundations',
        description: 'Identity, networking, security, and cost baselines that scale with your organisation.',
        points: ['Multi-account strategy, IAM, networking guardrails', 'Terraform/Pulumi modules with documentation', 'Cost visibility dashboards and alerting'],
      },
      {
        title: 'Migration & modernization',
        description: 'Structured migrations with brownfield remediation and automation for day-two operations.',
        points: ['Application assessments and migration runbooks', 'Blueprints for containerisation or serverless refactors', 'Operational readiness reviews pre go-live'],
      },
      {
        title: 'Reliability & FinOps',
        description: 'Ongoing optimisation and incident readiness to keep environments healthy.',
        points: ['SLO/SLA definitions and observability rollouts', 'Cost anomaly detection with ownership mapping', 'Incident response playbooks and drills'],
      },
    ],
    deliveryApproach: [
      {
        title: 'Cloud immersion & roadmap',
        description: 'Assess current state, target architecture, compliance requirements, and cost levers to shape the engagement.',
      },
      {
        title: 'Build & migrate',
        description: 'Implement landing zones, automation, and migration waves with weekly executive check-ins.',
      },
      {
        title: 'Operate & optimise',
        description: 'Transition to managed operations or enable your teams with runbooks, dashboards, and cost governance cadence.',
      },
    ],
    tooling: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Pulumi', 'AWS CDK', 'Kubernetes', 'Datadog', 'CloudWatch', 'Grafana', 'PagerDuty'],
    teamStructure: [
      { role: 'Cloud architect', focus: 'Designs landing zones, migration paths, and guardrails aligned to your governance.' },
      { role: 'Infrastructure engineer', focus: 'Implements automation, networking, and security baselines with Infra-as-Code.' },
      { role: 'Reliability engineer', focus: 'Builds observability, incident response, and performance tuning.', },
      { role: 'FinOps specialist', focus: 'Monitors spend, recommends optimisations, and sets up chargeback/showback models.' },
      { role: 'Engagement lead', focus: 'Keeps decision-makers aligned, manages risk, and ensures compliance checkpoints are hit.' },
    ],
    sampleTimeline: [
      { phase: 'Weeks 1–2', duration: 'Readiness & architecture blueprint', focus: 'Current-state mapping, target architecture, compliance alignment, prioritised roadmap.' },
      { phase: 'Weeks 3–6', duration: 'Landing zone build-out', focus: 'IAM, networking, security, cost guardrails, automation pipelines.' },
      { phase: 'Weeks 7–12', duration: 'Migration waves', focus: 'Workload migrations, refactors, testing, cutover, optimisation.' },
      { phase: 'Weeks 13–16', duration: 'Operate & optimise', focus: 'Runbooks, monitoring, FinOps cadence, handover or managed services transition.' },
    ],
    successMetrics: [
      'Landing zone acceptance tests passed and documented.',
      'Cost, security, and resilience dashboards active with agreed thresholds.',
      'Migration wave KPIs met—cutover success rates, rollback readiness, and performance baselines.',
    ],
    faqs: [
      {
        question: 'Can you work with hybrid or multi-cloud environments?',
        answer: 'Yes. We design automation that spans on-prem and multiple clouds, ensuring networking, identity, and security stay consistent.',
      },
      {
        question: 'Do you stay on after migration?',
        answer: 'We can run managed operations or co-manage with your team. Otherwise we hand over documentation, dashboards, and training sessions.',
      },
    ],
    relatedCaseStudies: [],
  },
  'cybersecurity': {
    overview:
      'From CBK compliance to fintech data protection, we help Kenyan businesses harden systems before breaches become headlines. Threat assessments, secure SDLC reviews, and incident readiness built for the regulatory realities of SACCOs, fintechs, and regulated organisations in East Africa. We find the gaps before attackers do.',
    highlights: [
      'Security posture reviews and penetration testing',
      'Zero Trust architecture blueprints and implementation',
      'Managed detection, response, and threat hunting',
      'Governance, risk, and compliance (GRC) advisory',
    ],
    outcomes: [
      'Reduced breach surface and faster incident response',
      'Continuous compliance across critical regulations',
      'Security culture uplift with executive and team training',
    ],
    ctaLabel: 'Secure your systems',
    heroEyebrow: 'Engineering',
    heroHeadline: 'Find the gaps',
    heroHeadlineSub: 'before attackers do.',
    heroImageAlt: 'Cybersecurity analyst monitoring threat dashboards',
    engagementSignals: [
      'Upcoming audits, certifications, or regulatory reviews require structured preparation.',
      'Recent incidents or penetration tests revealed gaps in process, tooling, or coverage.',
      'Leadership wants ongoing visibility into risk posture and response readiness.',
    ],
    clientCommitments: [
      'Nominate a security sponsor and technical contacts for fortnightly risk reviews.',
      'Share existing policies, architecture diagrams, and incident history during immersion.',
      'Adopt agreed vulnerability management cadence and remediation workflow.',
    ],
    capabilities: [
      {
        title: 'Assessment & hardening',
        description: 'Depth-first reviews covering application, infrastructure, and process maturity.',
        points: ['Threat modelling and penetration tests', 'Secure SDLC playbooks and code review routines', 'Configuration audits and remediation plans'],
      },
      {
        title: 'Governance & compliance',
        description: 'Frameworks and artefacts that keep teams aligned with policy and regulation.',
        points: ['Policy libraries, controls mapping, and audit evidence', 'Risk registers and executive reporting cadence', 'Training assets for engineering and leadership'],
      },
      {
        title: 'Detection & response',
        description: 'Operational readiness so incidents are caught quickly and handled confidently.',
        points: ['SOC design or optimisation', 'SIEM, SOAR integrations and tuning', 'Incident simulations and tabletop exercises'],
      },
    ],
    deliveryApproach: [
      { title: 'Security immersion', description: 'Baseline posture assessment, threat modelling, and priority alignment with leadership.' },
      { title: 'Remediation & enablement', description: 'Execute hardening roadmap, embed secure SDLC, implement tooling, and train teams.' },
      { title: 'Operate & monitor', description: 'Establish continuous monitoring, runbooks, and governance cadence with executive reporting.' },
    ],
    tooling: ['OWASP ZAP', 'Burp Suite', 'CrowdStrike', 'Azure Sentinel', 'Splunk', 'Snyk', 'HashiCorp Vault', 'Okta', 'AWS Security Hub'],
    teamStructure: [
      { role: 'Security lead', focus: 'Owns programme strategy, risk communication, and executive reporting.' },
      { role: 'Application security engineer', focus: 'Guides secure coding, code reviews, and developer enablement.' },
      { role: 'Cloud security engineer', focus: 'Hardens infrastructure, implements controls, and tunes detection tooling.' },
      { role: 'GRC specialist', focus: 'Maps policies to obligations, prepares audits, and manages risk registers.' },
    ],
    sampleTimeline: [
      { phase: 'Weeks 1–2', duration: 'Security posture assessment', focus: 'Current state review, threat modelling, stakeholder interviews, risk register baseline.' },
      { phase: 'Weeks 3–6', duration: 'Remediation sprint', focus: 'Priority vulnerability fixes, policy gaps addressed, tooling configuration, secure SDLC rollout.' },
      { phase: 'Weeks 7–10', duration: 'Detection & response setup', focus: 'SIEM tuning, alerting, incident runbooks, tabletop exercises with your team.' },
      { phase: 'Weeks 11–12', duration: 'Handover & governance', focus: 'Documentation, team training, executive reporting templates, ongoing review cadence.' },
    ],
    successMetrics: [
      'Critical vulnerabilities remediated within agreed SLAs.',
      'Security scorecards improved across people, process, and technology categories.',
      'Incident response exercises completed with documented improvements.',
    ],
    faqs: [
      {
        question: 'Can you help us achieve ISO 27001 or SOC 2?',
        answer: 'Yes. We map existing controls, plug the gaps, and create audit-ready documentation while training your team on ongoing governance.',
      },
      {
        question: 'Do you offer managed detection & response?',
        answer: 'We can operate your tooling or integrate with preferred partners. Our focus is on building processes and response runbooks that work.',
      },
    ],
    relatedCaseStudies: [],
  },
  'digital-transformation': {
    overview:
      'Digital transformation is not a slide deck. It is changing how your team works, what systems they trust, and how leadership sees the business. We run strategy sprints that align leadership on real outcomes, build the operating model to deliver them, and stay on to make sure the change actually sticks.',
    highlights: [
      'Vision and roadmap creation anchored in measurable KPIs',
      'Process mining and automation across business units',
      'Data modernization and analytics enablement',
      'Change management playbooks and coaching',
    ],
    outcomes: [
      'Closer alignment between technology and business goals',
      'Automated workflows that reduce manual effort and errors',
      'Decision intelligence built on unified data platforms',
    ],
    ctaLabel: 'Transform with confidence',
    heroEyebrow: 'Engineering',
    heroHeadline: 'Strategy that survives',
    heroHeadlineSub: 'contact with reality.',
    heroImageAlt: 'Digital transformation workshop with collaborative teams',
    engagementSignals: [
      'Multiple departments need to align on a shared technology roadmap.',
      'Manual processes or legacy systems are slowing growth or compliance.',
      'Leadership wants measurable change within the next 6–12 months.',
    ],
    clientCommitments: [
      'Identify executive sponsors and champions across business units.',
      'Share operational data, process documentation, and KPIs for baseline analysis.',
      'Participate in regular steering reviews to unblock decisions quickly.',
    ],
    capabilities: [
      {
        title: 'Strategy & operating model',
        description: 'Define the vision, KPIs, and governance needed to drive transformation.',
        points: ['Executive workshops and stakeholder alignment', 'Capability assessments and roadmap sequencing', 'Benefit tracking and KPI frameworks'],
      },
      {
        title: 'Process automation',
        description: 'Identify and automate priority workflows with the right mix of off-the-shelf and custom solutions.',
        points: ['Process mining and opportunity sizing', 'Automation design using low-code and custom integrations', 'Change management and adoption playbooks'],
      },
      {
        title: 'Data & analytics enablement',
        description: 'Modernise data platforms so decision-makers have timely, reliable insight.',
        points: ['Data architecture and governance', 'Analytics dashboards and self-service enablement', 'AI/ML pilot identification and experimentation'],
      },
    ],
    deliveryApproach: [
      { title: 'Discovery & alignment', description: 'Map current state, prioritise initiatives, define KPIs, and set up transformation governance.' },
      { title: 'Pilot & scale', description: 'Execute pilot projects, prove value, and scale successes across teams with standardised playbooks.' },
      { title: 'Sustain & optimise', description: 'Embed continuous improvement, run retrospectives, and transition ownership to business units.' },
    ],
    tooling: ['Notion', 'Miro', 'Power BI', 'Looker', 'Snowflake', 'dbt', 'Zapier', 'Workato', 'ServiceNow'],
    teamStructure: [
      { role: 'Transformation lead', focus: 'Aligns executives, manages roadmap, and ensures KPIs remain transparent.' },
      { role: 'Business process analyst', focus: 'Documents current state, identifies automation opportunities, and measures improvements.' },
      { role: 'Solutions architect', focus: 'Designs technical approach, integrations, and data strategy.' },
      { role: 'Change manager', focus: 'Runs communication plans, training, and adoption tracking.' },
      { role: 'Automation engineer', focus: 'Implements workflows, integrations, and supporting applications.' },
    ],
    sampleTimeline: [
      {
        phase: 'Weeks 1–3',
        duration: 'Immersion & blueprint',
        focus: 'Executive workshops, KPI baselines, process maps, dependency analysis, transformation charter.',
      },
      {
        phase: 'Weeks 4–10',
        duration: 'Pilot delivery',
        focus: 'Automation and data pilots, adoption metrics, steering reviews, risk and change logs.',
      },
      {
        phase: 'Weeks 11–16',
        duration: 'Scale & embed',
        focus: 'Rollout playbooks, training waves, governance cadence, benefit tracking vs baseline.',
      },
      {
        phase: 'Weeks 17–20',
        duration: 'Handover & optimise',
        focus: 'Centre-of-excellence setup or transition to business owners, continuous improvement backlog.',
      },
    ],
    successMetrics: [
      'Operational KPIs improved (cycle time, error rate, cost per transaction).',
      'Adoption targets hit for new tools/processes, with training completion tracked.',
      'Transformation governance established with recurring steering cadence.',
    ],
    faqs: [
      {
        question: 'How do you ensure initiatives deliver value?',
        answer: 'We co-define success metrics during immersion and review them every two weeks with sponsors to course-correct quickly.',
      },
      {
        question: 'Can you work with existing vendors or platforms?',
        answer: 'Absolutely. We evaluate your current ecosystem and identify gaps before recommending new tooling or integrations.',
      },
    ],
    relatedCaseStudies: [
      {
        slug: 'eagle-hr-consultants',
        client: 'Eagle HR Consultants',
        outcome: 'Zero digital presence to fully digitised operations in 12 weeks',
      },
    ],
  },
  'it-consulting': {
    overview:
      'On-demand technology leadership for Kenyan founders, CTOs, and engineering leads who need senior guidance without hiring a full-time executive. Fractional CTO engagements, architecture reviews, delivery coaching, and technical due diligence — we embed with your team and make the hard calls with you.',
    highlights: [
      'CTO-as-a-service and advisory retainers',
      'Architecture reviews and modernization strategies',
      'Delivery management and agile coaching',
      'Vendor evaluation and procurement support',
    ],
    outcomes: [
      'Clarity on the right technology investments',
      'Higher delivery velocity with optimized processes',
      'Stronger alignment between engineering and leadership',
    ],
    ctaLabel: 'Partner with our specialists',
    heroEyebrow: 'Engineering',
    heroHeadline: 'Senior engineering judgment,',
    heroHeadlineSub: 'on demand.',
    heroImageAlt: 'Technology leadership team collaborating over strategy documents',
    engagementSignals: [
      'You need interim technology leadership or advisory to guide critical decisions.',
      'Projects are stalled or teams need coaching to re-establish delivery cadence.',
      'An upcoming audit, investor question, or board review needs technical clarity.',
    ],
    clientCommitments: [
      'Grant access to leadership meetings and decision-making forums.',
      'Share strategic goals, product roadmaps, and existing documentation upfront.',
      'Align on cadence for stakeholder updates and coaching sessions.',
    ],
    capabilities: [
      {
        title: 'Technology leadership',
        description: 'Fractional CTO/VP Engineering support to guide architecture, hiring, and roadmaps.',
        points: ['Technology assessments and OKRs', 'Org design and hiring plans', 'Board and investor communication support'],
      },
      {
        title: 'Delivery acceleration',
        description: 'Get teams shipping again with improved rituals, tooling, and cross-team alignment.',
        points: ['Portfolio review and prioritisation', 'Agile coaching and governance resets', 'DevOps and QA process improvements'],
      },
      {
        title: 'Architecture & vendor advisory',
        description: 'Independent guidance on platform choices, RFPs, and partner selection.',
        points: ['Architecture blueprints and migration plans', 'Vendor evaluation scorecards', 'Contract and SLA review with risk analysis'],
      },
    ],
    deliveryApproach: [
      { title: 'Assessment & alignment', description: 'Deep dive into strategy, teams, and systems to outline immediate priorities.' },
      { title: 'Coaching & execution', description: 'Embed with leadership, run rhythms, mentor teams, and execute improvement backlog.' },
      { title: 'Transition & scale', description: 'Hire or train permanent leaders, codify processes, and transition knowledge.' },
    ],
    tooling: ['Linear', 'Jira', 'Notion', 'Confluence', 'GitHub', 'GitLab', 'CircleCI', 'Harness'],
    teamStructure: [
      { role: 'Principal consultant', focus: 'Trusted advisor for leadership, aligning strategy with execution.' },
      { role: 'Delivery coach', focus: 'Improves rituals, backlog health, and cross-team communication.' },
      { role: 'Solutions architect', focus: 'Validates technical decisions, roadmaps, and vendor selections.' },
    ],
    sampleTimeline: [
      { phase: 'Weeks 1–2', duration: 'Assessment & alignment', focus: 'Strategy review, team interviews, system audits, priority mapping with leadership.' },
      { phase: 'Weeks 3–8', duration: 'Embedded coaching', focus: 'Weekly leadership forums, delivery cadence establishment, architecture decisions, hiring support.' },
      { phase: 'Weeks 9–12', duration: 'Optimisation cycle', focus: 'Process refinement, retrospectives, capability uplift measurement, knowledge transfer.' },
      { phase: 'Weeks 13+', duration: 'Continuous advisory', focus: 'Monthly strategy reviews, board support, on-demand architecture and decision advisory.' },
    ],
    successMetrics: [
      'Delivery KPIs (cycle time, throughput, predictability) improve within agreed windows.',
      'Leadership alignment achieved with regular steering forums and decision logs.',
      'Capability uplift measured through coaching feedback and retention of improved practices.',
    ],
    faqs: [
      {
        question: 'Do you take on interim CTO roles?',
        answer: 'Yes. We can step in as interim leadership while helping you recruit or transition to permanent hires.',
      },
      {
        question: 'Can you support fundraising or board discussions?',
        answer: 'We prepare technical narratives, roadmaps, and risk assessments tailored to investor and board expectations.',
      },
    ],
    relatedCaseStudies: [],
  },
  'system-integration': {
    overview:
      'Your systems should work together — not force your team to manually copy data between them. We connect platforms, build M-Pesa and payment integrations, orchestrate APIs, and design data pipelines so information moves automatically, accurately, and auditably. Whether it is replacing a spreadsheet bridge or building enterprise-wide integration infrastructure, we start with what is actually breaking today.',
    highlights: [
      'API strategy, design, and lifecycle management',
      'Enterprise system integrations and data sync services',
      'Event-driven architectures and real-time streaming',
      'Automation between SaaS tools and on-premise systems',
    ],
    outcomes: [
      'Unified operations with single sources of truth',
      'Reduced manual work through automated workflows',
      'Extensible architecture ready for new product offerings',
    ],
    ctaLabel: 'Integrate everything',
    heroEyebrow: 'Engineering',
    heroHeadline: 'Your systems,',
    heroHeadlineSub: 'finally talking to each other.',
    heroImageAlt: 'Systems integration dashboard with interconnected services',
    engagementSignals: [
      'Manual data handoffs or siloed systems are slowing operations or reporting.',
      'You need to launch new products that rely on reliable cross-system communication.',
      'Compliance or audit requirements demand traceable data flows.',
    ],
    clientCommitments: [
      'Provide access to system owners and existing API documentation.',
      'Align on data quality and governance standards early in the engagement.',
      'Agree on change management and release cadence for integrated systems.',
    ],
    capabilities: [
      {
        title: 'Integration strategy',
        description: 'Blueprints that map data flows, APIs, and automation opportunities.',
        points: ['System maps and dependency analysis', 'API standards and lifecycle governance', 'Integration backlog and prioritisation'],
      },
      {
        title: 'Build & automation',
        description: 'Implementation of integrations, ETL pipelines, and workflow automations.',
        points: ['Middleware and iPaaS configuration', 'Custom connectors and event-driven integrations', 'Automated testing and monitoring'],
      },
      {
        title: 'Governance & reliability',
        description: 'Observability, alerting, and runbooks ensuring data keeps flowing.',
        points: ['Service level objectives and dashboards', 'Incident response and rollback procedures', 'Versioning and change control processes'],
      },
    ],
    deliveryApproach: [
      { title: 'Discovery & mapping', description: 'Understand current system landscape, data models, and business priorities.' },
      { title: 'Build & iterate', description: 'Implement integrations in waves with testing, documentation, and stakeholder demos.' },
      { title: 'Operate & optimise', description: 'Monitor performance, tune workflows, and enable your teams with runbooks.' },
    ],
    tooling: ['MuleSoft', 'Workato', 'Zapier', 'Apache Kafka', 'AWS EventBridge', 'Fivetran', 'dbt', 'Airflow', 'Grafana'],
    teamStructure: [
      { role: 'Integration architect', focus: 'Designs target architecture, data flows, and governance.' },
      { role: 'Integration engineer', focus: 'Builds connectors, APIs, and automation pipelines.' },
      { role: 'Data engineer', focus: 'Ensures data quality, transformation, and lineage tracking.' },
      { role: 'Ops lead', focus: 'Sets up monitoring, incident response, and change management cadence.' },
    ],
    sampleTimeline: [
      { phase: 'Weeks 1–2', duration: 'Integration mapping', focus: 'System inventory, data flow analysis, API documentation review, success criteria agreed.' },
      { phase: 'Weeks 3–6', duration: 'Build wave one', focus: 'Priority integrations implemented, testing framework setup, monitoring baseline.' },
      { phase: 'Weeks 7–10', duration: 'Build wave two', focus: 'Remaining integrations, data quality validation, runbooks drafted, performance tuning.' },
      { phase: 'Weeks 11–12', duration: 'Operate & optimise', focus: 'Go-live, observability validation, training, ongoing support cadence established.' },
    ],
    successMetrics: [
      'Data flow SLAs achieved with measurable uptime and latency targets.',
      'Manual effort reduced—tracked through automation adoption metrics.',
      'Observability dashboards live with agreed alert thresholds and ownership.',
    ],
    faqs: [
      {
        question: 'Can you integrate both SaaS and on-prem systems?',
        answer: 'Yes. We design gateways, security policies, and connectors to bridge on-prem, private cloud, and SaaS safely.',
      },
      {
        question: 'How do you manage change control?',
        answer: 'We set up versioning, release cadences, and rollback plans so integrations evolve without disrupting operations.',
      },
    ],
    relatedCaseStudies: [
      {
        slug: 'r4-automotive',
        client: 'R4 Automotive',
        outcome: 'M-Pesa integration with European parts supplier APIs and live pricing',
      },
    ],
  },
  'web-development': {
    overview:
      'Websites, portals, and web applications built to perform — not just look good. For Kenyan businesses tired of slow, generic templates that break when traffic grows, we build fast, accessible, search-optimised sites with content systems your team can actually use.',
    highlights: [
      'Next.js sites with 90+ Lighthouse scores out of the box',
      'CMS integration so your team updates content without calling a developer',
      'Search-optimised structure — technical SEO baked in from day one',
      'Analytics, conversion tracking, and A/B testing ready from launch',
    ],
    outcomes: [
      'Sites that rank on Google and load under 2 seconds on Kenyan mobile networks',
      'Content your marketing team can publish without engineering support',
      'Measurable traffic, engagement, and conversion improvements within 90 days',
    ],
    ctaLabel: 'Book a web audit',
    heroEyebrow: 'Engineering',
    heroHeadline: 'Sites that convert.',
    heroHeadlineSub: 'Pages that rank.',
    heroHeadlineSub2: 'Stack that scales.',
    heroImageAlt: 'Web development team reviewing designs on large monitors',
    engagementSignals: [
      'Your current site is slow, outdated, or not converting visitors into enquiries.',
      'You need a content system your team can update without calling an agency.',
      'You want a site that ranks on Google for Kenyan searches, not just looks good in pitches.',
    ],
    clientCommitments: [
      'Share brand assets, current analytics data, and competitor references upfront.',
      'Nominate one decision-maker for approvals so reviews do not stall.',
      'Commit to a content plan — even a simple one — so the site has something to say at launch.',
    ],
    capabilities: [
      {
        title: 'Corporate websites that convert',
        description: 'Credibility-focused sites for consultancies, B2B service firms, and established businesses wanting to look the part online.',
        points: [
          'Strategic information architecture mapped to buyer journey',
          'Performance and accessibility built in, not bolted on',
          'CMS integration so marketing owns content, not engineering',
        ],
      },
      {
        title: 'Customer portals and dashboards',
        description: 'Logged-in experiences for customers, members, partners, or staff.',
        points: [
          'Role-based access, authentication, and audit trails',
          'Integrations with your existing systems — CRMs, ERPs, payment platforms',
          'Responsive interfaces designed for mobile-first Kenyan users',
        ],
      },
      {
        title: 'SEO and performance engineering',
        description: 'Sites built to be found — not just to exist.',
        points: [
          'Core Web Vitals optimisation from the ground up',
          'Schema markup, canonical URLs, and search-ready metadata',
          'Programmatic SEO for service and location-specific landing pages',
        ],
      },
    ],
    deliveryApproach: [
      {
        title: 'Strategy and structure',
        description: 'Brand, buyer, and content audit. We map the site architecture, define conversion goals, and agree success metrics before design starts.',
      },
      {
        title: 'Design and build in sprints',
        description: 'Wireframes, design system, and iterative builds with weekly reviews. You see progress every Friday, not at the end of a three-month contract.',
      },
      {
        title: 'Launch and optimise',
        description: 'Pre-launch QA, analytics setup, and post-launch optimisation based on real user behaviour. Ongoing support or a clean handover — your choice.',
      },
    ],
    teamStructure: [
      { role: 'Product lead', focus: 'Owns strategy, stakeholder alignment, and launch criteria.' },
      { role: 'Design lead', focus: 'Creates the design system, wireframes, and page templates.' },
      { role: 'Full-stack engineer', focus: 'Builds the frontend, CMS integration, and performance optimisations.' },
      { role: 'SEO specialist', focus: 'Technical SEO setup, schema, and content optimisation.' },
    ],
    sampleTimeline: [
      { phase: 'Weeks 1–2', duration: 'Discovery & strategy', focus: 'Audit current site, brand review, buyer interviews, sitemap, success metrics.' },
      { phase: 'Weeks 3–4', duration: 'Design sprint', focus: 'Wireframes, design system, key page designs reviewed with stakeholders.' },
      { phase: 'Weeks 5–8', duration: 'Build & integrate', focus: 'Frontend build, CMS setup, content migration, integrations.' },
      { phase: 'Weeks 9–10', duration: 'Launch & optimise', focus: 'QA, analytics, soft launch, training, and first optimisation cycle.' },
    ],
    successMetrics: [
      'Lighthouse performance score 90+ on mobile and desktop at launch.',
      'Organic search impressions measurable within 30 days via Google Search Console.',
      'Content system adopted by marketing team — publishing within the first week post-launch.',
    ],
    tooling: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Vercel', 'Google Analytics 4', 'Search Console', 'Hotjar'],
    faqs: [
      {
        question: 'How much does a website cost?',
        answer:
          'Costs depend on scope — a corporate site with 8-12 pages typically ranges KES 250,000 to 800,000. Customer portals and complex applications are scoped separately after discovery.',
      },
      {
        question: 'Do you work with Shopify or WordPress?',
        answer:
          'We build e-commerce on Shopify when it is the right fit — Honey Box Accessories is a live example. For content sites we usually recommend Next.js with a headless CMS for better performance and control.',
      },
      {
        question: 'Can you take over a site built by someone else?',
        answer:
          'Yes. We audit the existing build, identify performance and SEO issues, and propose either a rebuild or an optimisation programme depending on what is salvageable.',
      },
    ],
    relatedCaseStudies: [
      {
        slug: 'honey-box-accessories',
        client: 'Honey Box Accessories',
        outcome: 'Shopify store with 6 product collections and gift package bundles',
      },
      {
        slug: 'eagle-hr-consultants',
        client: 'Eagle HR Consultants',
        outcome: 'Corporate website plus full platform ecosystem',
      },
    ],
  },
}

const serviceDetails: Record<string, ServiceDetail> = Object.fromEntries(
  Object.entries(serviceDetailsBase).map(([slug, detail]) => [slug, mergeServiceDetail(slug, detail)])
) as Record<string, ServiceDetail>

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  const detail = serviceDetails[slug]
  
  if (!service || !detail) {
    return {}
  }

  const title = SERVICE_SEO_TITLES[slug] ?? `${service.title} | Raven Tech Group`
  const description = SERVICE_SEO_DESCRIPTIONS[slug] ?? detail.overview ?? service.description
  const url = `https://www.raventechgroup.com/services/${slug}`
  const imagePath = getServiceIntakeSpotlightImageSrc(slug)
  const image = imagePath.startsWith('http') ? imagePath : `https://www.raventechgroup.com${encodeURI(imagePath)}`
  const keywords = SERVICE_SEO_KEYWORDS[slug] ?? [
    service.title.toLowerCase(),
    'technology consultancy Kenya',
    'Nairobi',
    'Westlands',
    'East Africa',
    'Raven Tech Group',
  ]

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Raven Tech Group' }],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Raven Tech Group',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: detail.heroImageAlt ?? `${service.title} services Kenya — Raven Tech Group`,
        },
      ],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        'en-KE': url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  const detail = serviceDetails[slug]

  if (!service || !detail) {
    notFound()
  }

  const pageUrl = `https://www.raventechgroup.com/services/${service.slug}`
  const heroSrc = getServiceIntakeSpotlightImageSrc(service.slug)
  const heroAlt =
    detail.heroImageAlt ?? `${service.title} services — Raven Tech Group, Nairobi Kenya`
  const navItems = buildServiceNavItems(detail)

  const serviceSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: detail.overview,
    url: pageUrl,
    serviceType: service.title,
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.raventechgroup.com/#organization',
      name: 'Raven Tech Group',
      url: 'https://www.raventechgroup.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Westlands, Nairobi',
        addressCountry: 'KE',
      },
    },
    areaServed: [
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Country', name: 'Tanzania' },
    ],
  }

  if (detail.capabilities && detail.capabilities.length > 0) {
    serviceSchema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${service.title} capabilities`,
      itemListElement: detail.capabilities.map((c, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: c.title,
          description: c.description,
        },
      })),
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.raventechgroup.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://www.raventechgroup.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: pageUrl,
      },
    ],
  }

  const faqSchema =
    detail.faqs && detail.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: detail.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null

  const howToSchema =
    detail.deliveryApproach && detail.deliveryApproach.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: `How to choose a ${service.title} partner`,
          description:
            detail.overview.length > 280
              ? `${detail.overview.slice(0, 277).trimEnd()}…`
              : detail.overview,
          step: detail.deliveryApproach.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.description,
          })),
        }
      : null

  const reviewSchemas =
    detail.customerFeedback?.map((fb) => ({
      '@context': 'https://schema.org',
      '@type': 'Review',
      reviewBody: fb.quote,
      author: {
        '@type': 'Organization',
        name: fb.company,
      },
      itemReviewed: {
        '@type': 'Service',
        name: service.title,
        provider: {
          '@type': 'Organization',
          name: 'Raven Tech Group',
        },
      },
    })) ?? []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      {howToSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
      {reviewSchemas.map((schema, i) => (
        <script
          key={`review-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="min-h-screen min-w-0 overflow-x-clip bg-[#0A0A0A] text-white">
        <ServiceHero
          slug={service.slug}
          serviceTitle={service.title}
          overview={detail.overview}
          heroImage={heroSrc}
          heroImageAlt={heroAlt}
          heroEyebrow={detail.heroEyebrow}
          heroHeadline={detail.heroHeadline}
          heroHeadlineSub={detail.heroHeadlineSub}
          heroHeadlineSub2={detail.heroHeadlineSub2}
          ctaLabel={detail.ctaLabel}
          awardBadges={detail.awardBadges}
        />
        <ServiceSideNavLayout navItems={navItems}>
          <ServiceSections detail={detail} service={{ title: service.title, slug: service.slug }} />
        </ServiceSideNavLayout>
      </div>
    </>
  )
}



