import { getLiveProducts } from '@/lib/data/products'

/**
 * Primary header navigation — single source of truth for desktop + mobile.
 * Order: Services → Products → Case studies → Insights → Company; CTAs in Header.tsx.
 */

export type SiteNavDropdownItem = {
  label: string
  href: string
  description: string
}

export type SiteNavDropdown = {
  type: 'dropdown'
  id: 'company' | 'products'
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
  {
    type: 'dropdown',
    id: 'products',
    label: 'Products',
    items: [
      {
        label: 'All products',
        href: '/products',
        description: 'Software Raven builds and operates.',
      },
      ...getLiveProducts().map((product) => ({
        label: product.name,
        href: product.bridgeHref,
        description: product.navDescription,
      })),
    ],
  },
  { type: 'link', label: 'Case studies', href: '/case-studies' },
  {
    type: 'link',
    label: 'Insights',
    href: '/insights',
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
    ],
  },
]

/** Routes that belong to a dropdown — for active state under parent label */
export const SITE_NAV_DROPDOWN_ROUTE_PREFIX: Record<SiteNavDropdown['id'], string[]> = {
  products: ['/products'],
  company: ['/about', '/careers'],
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
