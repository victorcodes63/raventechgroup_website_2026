import type { ServiceMegaCategoryId } from '@/lib/data/serviceMegaGroups'

/**
 * Hero bands for /services category sections.
 * Photography: Unsplash License — https://unsplash.com/license
 * Local JPEGs cropped from Unsplash CDN (IDs: engineering1517694712202, advisory 1552664730,
 * data-ai 1551288049, optimisation 1550751827, expertise 1522071820081).
 */
export type ServicesPageCategoryImage = {
  src: string
  alt: string
}

export const SERVICES_PAGE_CATEGORY_IMAGES: Record<ServiceMegaCategoryId, ServicesPageCategoryImage> = {
  engineering: {
    src: '/images/services/groups/engineering.jpg',
    alt: 'Laptop open on a desk with code on screen in a workspace, shown in monochrome.',
  },
  advisory: {
    src: '/images/services/groups/advisory.jpg',
    alt: 'Team seated around a table reviewing work on a laptop during a planning session, shown in monochrome.',
  },
  'data-ai': {
    src: '/images/services/groups/data-ai.jpg',
    alt: 'Hands pointing at charts and metrics on a large display, shown in monochrome.',
  },
  optimisation: {
    src: '/images/services/groups/optimisation.jpg',
    alt: 'Abstract digital interface pattern suggesting systems and security operations, shown in monochrome.',
  },
  expertise: {
    src: '/images/services/groups/expertise.jpg',
    alt: 'Colleagues collaborating over laptops in an office, shown in monochrome.',
  },
}
