import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { services } from '@/lib/data/services'
import { ServiceHero } from './ServiceHero'

type Capability = {
  title: string
  description: string
  points?: string[]
}

type DeliveryStep = {
  title: string
  description: string
}

type ServiceFaq = {
  question: string
  answer: string
}

type TeamRole = {
  role: string
  focus: string
}

type TimelineStage = {
  phase: string
  duration: string
  focus: string
}

type ServiceDetail = {
  overview: string
  highlights: string[]
  outcomes: string[]
  ctaLabel: string
  heroImage?: string
  heroImageAlt?: string
  capabilities?: Capability[]
  deliveryApproach?: DeliveryStep[]
  tooling?: string[]
  faqs?: ServiceFaq[]
  engagementSignals?: string[]
  clientCommitments?: string[]
  teamStructure?: TeamRole[]
  sampleTimeline?: TimelineStage[]
  successMetrics?: string[]
}

const serviceDetails: Record<string, ServiceDetail> = {
  'software-development': {
    overview:
      'We design, engineer, and ship high-performing software solutions tailored to your business—clean architecture, thoughtful design systems, and resilient infrastructure delivered by squads that stay embedded until the job is done.',
    highlights: [
      'Product discovery workshops and measurable roadmap planning',
      'Full-stack engineering with TypeScript, React, and Node.js',
      'Automated testing, CI/CD pipelines, and observability baked in',
      'Ongoing maintenance, feature iteration, and technical advisory',
    ],
    outcomes: [
      'Accelerated time-to-market with accountable, two-week release cadences',
      'Secure, scalable systems ready for new features and user growth',
      'Cross-functional squads embedded with your stakeholders from day one',
    ],
    ctaLabel: 'Build your next product',
    heroImage: '/images/photos/coding.png',
    heroImageAlt: 'Software engineers pairing at a workstation',
    engagementSignals: [
      'You have a clear product owner or leadership sponsor ready to make decisions quickly.',
      'You need to modernise an existing platform or ship a new product within the next 3–6 months.',
      'Reliability, security, and documentation matter as much as velocity.',
    ],
    clientCommitments: [
      'Provide access to subject-matter experts for weekly alignment sessions.',
      'Agree on success metrics up front and review them with us every two weeks.',
      'Adopt shared tooling for backlog, documentation, and observability so information stays transparent.',
    ],
    capabilities: [
      {
        title: 'Platform & product builds',
        description: 'Customer-facing platforms, internal tools, and multi-tenant applications engineered for resilience and flexibility.',
        points: ['Next.js and React frontends with modular design systems', 'GraphQL/REST APIs with typed contracts and documentation', 'Event-driven architectures with audit trails and telemetry'],
      },
      {
        title: 'Experience & interface systems',
        description: 'Design operations and design-to-dev collaboration that keep teams aligned without slowing delivery.',
        points: ['Shared component libraries in Storybook', 'Accessibility and localisation baked into acceptance criteria', 'Design QA, UAT, and visual regression suites'],
      },
      {
        title: 'Lifecycle management',
        description: 'Post-launch support that blends performance tuning, feature iteration, and incident readiness.',
        points: ['Observability dashboards and alerting thresholds', 'Runbooks for incident response and escalation paths', 'Weekly optimisation reviews with product and engineering leads'],
      },
    ],
    deliveryApproach: [
      {
        title: 'Architecture immersion',
        description:
          '10-day sprint to map current state, align on success metrics, and blueprint the foundations—data models, domain boundaries, guardrails.',
      },
      {
        title: 'Incremental delivery',
        description:
          'Cross-functional squad executes in two-week slices with demos, decision logs, and documented technical debt for visibility.',
      },
      {
        title: 'Operate & evolve',
        description:
          'Launch preparations, runbooks, and enablement so the platform is ready for scale. We stay on for feature velocity or hand over cleanly.',
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
        question: 'How quickly can a squad start?',
        answer:
          'Discovery wraps in 10 days. With scope agreed, we stand up a core squad—tech lead, engineers, designer, delivery lead—within two weeks of sign-off.',
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
  },
  'cloud-solutions': {
    overview:
      'Unlock the full potential of AWS, Azure, and Google Cloud with migration roadmaps, infrastructure automation, cost governance, and ongoing reliability engineering.',
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
    heroImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
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
  },
  'cybersecurity': {
    overview:
      'Guard your organization with proactive security assessments, governance programs, and incident readiness from a certified cybersecurity squad.',
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
    heroImage:
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80',
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
  },
  'digital-transformation': {
    overview:
      'Align teams, processes, and technology with a digital-first strategy that combines automation, analytics, and change management.',
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
    heroImage:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=80',
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
  },
  'it-consulting': {
    overview:
      'On-demand engineering leadership, architecture guidance, and delivery acceleration for teams that need a trusted technology partner.',
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
    heroImage: '/images/photos/Consulting Image.jpg',
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
  },
  'system-integration': {
    overview:
      'Connect platforms, data, and teams with integrations that are secure, observable, and future-ready.',
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
    heroImage: '/images/photos/system_intergration.png',
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
  },
}

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

  const title = `${service.title} Services | Raven Tech Group`
  const description = detail.overview ?? service.description
  const url = `https://raventechgroup.com/services/${slug}`
  const image = detail.heroImage ? `https://raventechgroup.com${detail.heroImage}` : 'https://raventechgroup.com/og-image.jpg'

  return {
    title,
    description,
    keywords: [
      service.title.toLowerCase(),
      'software development',
      'custom software',
      'web development',
      'application development',
      'Nairobi',
      'Kenya',
      'Africa',
      'technology consulting',
      'software engineering',
    ].join(', '),
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
          alt: detail.heroImageAlt ?? `${service.title} services`,
        },
      ],
      locale: 'en_US',
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

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: detail.overview,
    provider: {
      '@type': 'Organization',
      name: 'Raven Tech Group',
      url: 'https://raventechgroup.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
    },
    areaServed: {
      '@type': 'Place',
      name: 'Africa and Europe',
    },
    serviceType: service.title,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-black text-white">
        <ServiceHero
          serviceTitle={service.title}
          overview={detail.overview}
          ctaLabel={detail.ctaLabel}
          heroImage={detail.heroImage}
          heroImageAlt={detail.heroImageAlt}
          serviceSlug={service.slug}
        />

        {/* Service Overview, Delivery Approach & Tooling - Combined */}
        <section className="border-t border-white/10 bg-black py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-20">
              {/* Service Overview */}
              <div>
                <div className="mb-12 max-w-3xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Service Overview</span>
                  <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">What you get</h2>
                  <p className="mt-4 text-base text-white/65 sm:text-lg">
                    Comprehensive delivery that combines strategy, engineering, and operations under one accountable team.
                  </p>
                </div>
                
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* What's Included Card */}
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 shadow-[0_40px_120px_-72px_rgba(15,23,42,0.5)]">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20">
                        <svg className="h-6 w-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white">What&apos;s included</h3>
                    </div>
                    <ul className="space-y-4">
                      {detail.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-4">
                          <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-[11px] font-semibold text-black">
                            ✓
                          </span>
                          <span className="leading-relaxed text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expected Outcomes Card */}
                  <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-brand-500/5 p-8 shadow-[0_40px_120px_-72px_rgba(255,169,30,0.2)]">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/30">
                        <svg className="h-6 w-6 text-brand-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-brand-200">Expected outcomes</h3>
                    </div>
                    <ul className="space-y-4">
                      {detail.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-400" />
                          <span className="leading-relaxed text-white/80">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Delivery Approach */}
              {detail.deliveryApproach && detail.deliveryApproach.length > 0 && (
                <div>
                  <div className="mb-12 max-w-3xl space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Our Process</span>
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">Delivery approach</h2>
                    <p className="mt-4 text-base text-white/65 sm:text-lg">
                      Transparent cadence from first workshop to steady-state operations. You&apos;ll always know what we&apos;re working on and why.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    {detail.deliveryApproach.map((step, index) => (
                      <div key={step.title} className="group relative flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 transition-all duration-300 hover:border-brand-400/40 hover:bg-white/[0.08]">
                        <div className="flex items-center gap-4">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-400/40 bg-brand-500/15 text-lg font-semibold text-brand-200 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500/25">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        </div>
                        <p className="flex-1 text-sm leading-relaxed text-white/70">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tooling */}
              {detail.tooling && detail.tooling.length > 0 && (
                <div>
                  <div className="mb-8 max-w-3xl">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Technology Stack</span>
                    <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Tooling & automation stack</h2>
                    <p className="mt-4 text-base text-white/65 sm:text-lg">
                      Opinionated defaults keep delivery reliable, but every stack is tuned to your governance, procurement, and compliance needs.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-white/70">
                    {detail.tooling.map((tool) => (
                      <span key={tool} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      {((detail.teamStructure && detail.teamStructure.length > 0) || (detail.sampleTimeline && detail.sampleTimeline.length > 0) || (detail.successMetrics && detail.successMetrics.length > 0)) && (
        <section className="border-t border-white/10 bg-black py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-20">
              {/* Team Composition */}
              {detail.teamStructure && detail.teamStructure.length > 0 && (
                <div>
                  <div className="mb-12 max-w-3xl space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Team Composition</span>
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">The squad we assemble</h2>
                    <p className="mt-4 text-base text-white/65 sm:text-lg">
                      Multidisciplinary by default—product, engineering, design, and operations working as one team.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {detail.teamStructure.map(({ role, focus }) => (
                      <div key={role} className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:border-brand-400/40 hover:bg-white/[0.08]">
                        <h3 className="text-base font-semibold text-white">{role}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">{focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {detail.sampleTimeline && detail.sampleTimeline.length > 0 && (
                <div>
                  <div className="mb-12 max-w-3xl space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Timeline</span>
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">Sample 16-week roadmap</h2>
                    <p className="mt-4 text-base text-white/65 sm:text-lg">
                      Actual timelines depend on scope, but this is the cadence most product builds follow.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {detail.sampleTimeline.map(({ phase, duration, focus }) => (
                      <div key={phase} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-[0_34px_120px_-70px_rgba(15,23,42,0.4)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{phase}</p>
                        <h3 className="mt-3 text-lg font-semibold text-white">{duration}</h3>
                        <p className="mt-2 text-sm text-white/70">{focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Metrics */}
              {detail.successMetrics && detail.successMetrics.length > 0 && (
                <div>
                  <div className="mb-12 max-w-3xl">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Success Metrics</span>
                    <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">How we measure success</h2>
                  </div>
                  <ul className="space-y-3 text-sm text-white/70">
                    {detail.successMetrics.map((metric) => (
                      <li key={metric} className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/10 bg-black py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-16">
            {/* FAQ Section */}
            {detail.faqs && detail.faqs.length > 0 && (
              <div>
                <div className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                  <div className="space-y-4 sm:space-y-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Common Questions</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                      Questions teams ask us
                    </h2>
                    <p className="text-sm text-white/70 sm:text-base leading-relaxed">
                      We keep answers consistent so you know exactly how the engagement will run before we start.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {detail.faqs.map((faq, index) => (
                      <details
                        key={faq.question}
                        className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.05] px-6 py-5 text-left transition duration-200 open:border-brand-400/60 open:bg-brand-400/10 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white/80 sm:text-base">
                          <span>{faq.question}</span>
                          <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white/60 transition duration-200 group-open:border-brand-300 group-open:text-brand-200">
                            <span className="transition-transform duration-200 group-open:rotate-45">+</span>
                          </span>
                        </summary>
                        <p className="mt-4 text-sm text-white/65 sm:text-base leading-relaxed">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="rounded-3xl border border-white/10 bg-black/60 px-8 py-10 md:px-12 md:py-14">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-white">Ready to get started?</h2>
                  <p className="mt-3 text-white/65">
                    Share your goals and we&apos;ll assemble a delivery roadmap with estimated timelines and investments.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-brand-400"
                >
                  {detail.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}



