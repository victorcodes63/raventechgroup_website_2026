import {
  CloudSolutionsIcon,
  CyberSecurityIcon,
  DigitalTransformationIcon,
  ITConsultingIcon,
  SoftwareDevelopmentIcon,
  SystemIntegrationIcon,
  WebDevelopmentIcon,
} from '@/components/icons/services'

export type ServiceItem = {
  title: string
  description: string
  href: string
  slug: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  /** Absolute path under /public — used by the homepage accordion image panel */
  imagePath?: string
  /** Three short deliverable labels shown as amber pills in the homepage accordion */
  tags?: readonly [string, string, string]
  /** Two-sentence summary for the homepage accordion expanded state */
  accordionDescription?: string
}

export const services: ServiceItem[] = [
  {
    title: 'Software Development',
    description:
      'Custom apps and APIs for East African teams—TypeScript, tests, CI, clear handover.',
    href: '/services/software-development',
    slug: 'software-development',
    Icon: SoftwareDevelopmentIcon,
    imagePath: '/images/services/software-development.jpeg',
    tags: ['Custom Platforms', 'Mobile Apps', 'Internal Tools'],
    accordionDescription:
      'Custom platforms, internal tools, and customer-facing apps built on TypeScript foundations your team can own and extend. We ship in sprint increments with architecture decisions documented at every step.',
  },
  {
    title: 'Cloud Solutions',
    description:
      'AWS and Azure—landing zones, Terraform, migrations, observability, day-two ops.',
    href: '/services/cloud-solutions',
    slug: 'cloud-solutions',
    Icon: CloudSolutionsIcon,
    imagePath: '/images/services/cloud-solutions.jpeg',
    tags: ['AWS Architecture', 'Cloud Migration', 'Infrastructure as Code'],
    accordionDescription:
      'Cloud landing zones, migrations, and day-two operations tuned for AWS-first teams in East Africa. Infrastructure codified with Terraform so environments stay reproducible as you scale.',
  },
  {
    title: 'Cybersecurity',
    description:
      'Assessments, secure SDLC, IAM hardening—CBK-aligned readiness for fintechs and SACCOs.',
    href: '/services/cybersecurity',
    slug: 'cybersecurity',
    Icon: CyberSecurityIcon,
    imagePath: '/images/services/cybersecurity.jpeg',
    tags: ['Threat Modelling', 'Compliance', 'Incident Response'],
    accordionDescription:
      'Threat modelling, secure SDLC review, and compliance readiness for regulated organisations. Application and infrastructure assessments with prioritised remediation plans.',
  },
  {
    title: 'Digital Transformation',
    description:
      'Discovery, service design, and roadmaps—governance for multi-unit rollouts.',
    href: '/services/digital-transformation',
    slug: 'digital-transformation',
    Icon: DigitalTransformationIcon,
    imagePath: '/images/services/digital-transformation.jpeg',
    tags: ['Strategy Sprints', 'Change Management', 'Roadmapping'],
    accordionDescription:
      'Strategy sprints that align leadership on scope, budgets, and measurable outcomes before build begins. We run structured discovery to surface constraints and co-author the programme roadmap.',
  },
  {
    title: 'IT Consulting',
    description:
      'Fractional CTO, architecture review, diligence, and delivery coaching.',
    href: '/services/it-consulting',
    slug: 'it-consulting',
    Icon: ITConsultingIcon,
    imagePath: '/images/services/it-consulting.jpeg',
    tags: ['Architecture Review', 'Tech Due Diligence', 'Roadmaps'],
    accordionDescription:
      'Product, engineering, and operations advisors embedded alongside your team on a retained or project basis. Architecture guidance, technical due diligence, and knowledge transfer.',
  },
  {
    title: 'System Integration',
    description:
      'M-Pesa, cores, ERP, APIs, ETL—documented interfaces, fewer spreadsheets.',
    href: '/services/system-integration',
    slug: 'system-integration',
    Icon: SystemIntegrationIcon,
    imagePath: '/images/services/system-inetrgration.jpeg',
    tags: ['API Orchestration', 'ETL Pipelines', 'M-Pesa & Payments'],
    accordionDescription:
      'Connect platforms, data, and automation pipelines so information moves without manual steps. We model data flows, orchestrate APIs, and deliver documentation your team can maintain.',
  },
  {
    title: 'Web Development',
    description:
      'Corporate sites and portals—fast, accessible, mobile-first, SEO-ready.',
    href: '/services/web-development',
    slug: 'web-development',
    Icon: WebDevelopmentIcon,
    imagePath: '/images/services/web-development.jpeg',
    tags: ['Corporate Websites', 'Customer Portals', 'Performance SEO'],
    accordionDescription:
      'High-performance websites and portals designed for credibility, speed, and conversion. We build accessible frontends, strong content structure, and measurable handoff-ready experiences.',
  },
]
