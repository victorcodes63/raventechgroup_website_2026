export type HowWeWorkStep = {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
}

/**
 * Homepage “How we work” — illustration paths under /public/images/illustrations.
 * Discovery asset filename includes spaces; URL-encoded for reliable routing.
 */
export const howWeWorkSteps: HowWeWorkStep[] = [
  {
    imageSrc: '/images/illustrations/magnifying%20glass%20.avif',
    imageAlt: 'Stylised magnifying glass with control sliders, representing discovery and requirements analysis',
    title: 'Discover and scope',
    description: 'Workshops and audits lock scope, owners, and what “done” means before build.',
  },
  {
    imageSrc: '/images/illustrations/design.avif',
    imageAlt: 'Connected nodes with directional flow, representing system design and architecture',
    title: 'Design the architecture',
    description: 'Models, prototypes, and risk review settled before implementation starts.',
  },
  {
    imageSrc: '/images/illustrations/build.avif',
    imageAlt: 'Robotic arm assembly, representing build and implementation',
    title: 'Build in cadence',
    description: 'Sprints, demos, and clear reporting — visible progress every cycle.',
  },
  {
    imageSrc: '/images/illustrations/optimize.avif',
    imageAlt: 'Performance gauge at high reading, representing optimisation and steady-state operations',
    title: 'Operate and improve',
    description: 'Handover, monitoring, and tuning after go-live so the system stays fast and secure.',
  },
]
