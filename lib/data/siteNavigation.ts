/**
 * Primary header navigation — single source of truth for desktop + mobile.
 * Order: Services → Case studies → Resources → Company; CTAs in Header.tsx.
 */

export type SiteNavDropdownItem = {
  label: string
  href: string
  description: string
}

export type SiteNavDropdown = {
  type: 'dropdown'
  id: 'resources' | 'company'
  label: string
  items: SiteNavDropdownItem[]
}

export type SiteNavLink = {
  type: 'link'
  label: string
  href: string
}

export type SiteNavServices = {
  type: 'services'
}

export type SiteNavEntry = SiteNavServices | SiteNavLink | SiteNavDropdown

export const SITE_HEADER_NAV: SiteNavEntry[] = [
  { type: 'services' },
  { type: 'link', label: 'Case studies', href: '/case-studies' },
  {
    type: 'dropdown',
    id: 'resources',
    label: 'Resources',
    items: [
      {
        label: 'Insights',
        href: '/insights',
        description: 'Field notes — engineering, strategy, Kenya market.',
      },
      {
        label: 'Playbooks',
        href: '/playbooks',
        description: 'Downloadable guides and frameworks we use with clients.',
      },
    ],
  },
  {
    type: 'dropdown',
    id: 'company',
    label: 'Company',
    items: [
      {
        label: 'About',
        href: '/about',
        description: 'Who we are and how we operate from Nairobi.',
      },
      {
        label: 'Careers',
        href: '/careers',
        description: 'Open roles and how to reach us.',
      },
      {
        label: 'Book a call',
        href: '/book',
        description: 'Schedule a discovery session — no pitch deck.',
      },
    ],
  },
]

/** Routes that belong to a dropdown — for active state under parent label */
export const SITE_NAV_DROPDOWN_ROUTE_PREFIX: Record<SiteNavDropdown['id'], string[]> = {
  resources: ['/insights', '/playbooks'],
  company: ['/about', '/careers', '/book'],
}

export function siteNavLinkIsActive(pathname: string, href: string): boolean {
  if (href.startsWith('/#')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function siteNavDropdownIsActive(pathname: string, id: SiteNavDropdown['id']): boolean {
  const prefixes = SITE_NAV_DROPDOWN_ROUTE_PREFIX[id]
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}
