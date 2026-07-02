/** Business-outcome copy + imagery for the “Find your fit” carousel (paired with service slugs). */
export type ServiceIntakeSpotlight = {
  slug: string
  href: string
  /** Short pill, e.g. “Product delivery” */
  category: string
  headline: string
  body: string
  imageSrc: string
}

export const serviceIntakeSpotlights: ServiceIntakeSpotlight[] = [
  {
    slug: 'software-development',
    href: '/services/software-development',
    category: 'Product delivery',
    headline: 'Ship products your customers and teams rely on',
    body:
      'We turn priorities into working software—clear scope, steady releases, and ownership through launch so you are never guessing what shipped.',
    imageSrc: '/images/services/web-development.jpeg',
  },
  {
    slug: 'cloud-solutions',
    href: '/services/cloud-solutions',
    category: 'Scale & uptime',
    headline: 'Grow capacity without growing chaos',
    body:
      'Plan, migrate, and run cloud environments so performance and costs stay predictable while your business scales.',
    imageSrc: '/images/services/cloud-solutions.jpeg',
  },
  {
    slug: 'cybersecurity',
    href: '/services/cybersecurity',
    category: 'Trust & compliance',
    headline: 'Protect revenue and reputation before issues go public',
    body:
      'Practical security and compliance work aligned to how you operate—so audits, partners, and regulators see a credible programme, not a slide deck.',
    imageSrc: '/images/services/cybersecurity.jpeg',
  },
  {
    slug: 'digital-transformation',
    href: '/services/digital-transformation',
    category: 'Business change',
    headline: 'Align leaders on what to fund—and what to stop',
    body:
      'Structured programmes that connect strategy, budget, and delivery so transformation moves from meetings to measurable outcomes.',
    imageSrc: '/images/services/digital-transformation.jpeg',
  },
  {
    slug: 'it-consulting',
    href: '/services/it-consulting',
    category: 'Clarity & decisions',
    headline: 'Senior judgement when stakes are high',
    body:
      'On-demand guidance for roadmaps, vendors, and delivery trade-offs—so expensive mistakes get caught early.',
    imageSrc: '/images/services/it-consulting.jpeg',
  },
  {
    slug: 'system-integration',
    href: '/services/system-integration',
    category: 'Connected operations',
    headline: 'Make information flow without manual handoffs',
    body:
      'Integrations and automation that connect teams and systems—documented, observable, and built to last.',
    imageSrc: '/images/services/system-inetrgration.jpeg',
  },
  {
    slug: 'web-development',
    href: '/services/web-development',
    category: 'Web presence',
    headline: 'Sites and portals that load fast and convert',
    body:
      'Performance-first web builds with structure your marketing team can own—SEO, analytics, and handoff without guesswork.',
    imageSrc: '/images/services/web-development.jpeg',
  },
]

/** Matches carousel imagery; used for service page hero + Open Graph. */
export function getServiceIntakeSpotlightImageSrc(slug: string): string {
  const match = serviceIntakeSpotlights.find((s) => s.slug === slug)
  return match?.imageSrc ?? '/images/photos/boardroom.jpg'
}
