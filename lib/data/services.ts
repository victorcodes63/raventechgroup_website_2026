import {
  CloudSolutionsIcon,
  CyberSecurityIcon,
  DigitalTransformationIcon,
  ITConsultingIcon,
  SoftwareDevelopmentIcon,
  SystemIntegrationIcon,
} from '@/components/icons/services'

export type ServiceItem = {
  title: string
  description: string
  href: string
  slug: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

export const services: ServiceItem[] = [
  {
    title: 'Software Development',
    description: 'Custom web and mobile applications engineered for performance and scale.',
    href: '/services/software-development',
    slug: 'software-development',
    Icon: SoftwareDevelopmentIcon,
  },
  {
    title: 'Cloud Solutions',
    description: 'Deploy, migrate, and optimize workloads across AWS, Azure, and GCP.',
    href: '/services/cloud-solutions',
    slug: 'cloud-solutions',
    Icon: CloudSolutionsIcon,
  },
  {
    title: 'Cybersecurity',
    description: 'End-to-end protection, compliance, and incident response for modern teams.',
    href: '/services/cybersecurity',
    slug: 'cybersecurity',
    Icon: CyberSecurityIcon,
  },
  {
    title: 'Digital Transformation',
    description: 'Strategic consulting, automation, and change management for digital growth.',
    href: '/services/digital-transformation',
    slug: 'digital-transformation',
    Icon: DigitalTransformationIcon,
  },
  {
    title: 'IT Consulting',
    description: 'Experts on demand to guide architecture, delivery, and technology decisions.',
    href: '/services/it-consulting',
    slug: 'it-consulting',
    Icon: ITConsultingIcon,
  },
  {
    title: 'System Integration',
    description: 'Connect platforms, data, and processes with secure, future-ready pipelines.',
    href: '/services/system-integration',
    slug: 'system-integration',
    Icon: SystemIntegrationIcon,
  },
]


