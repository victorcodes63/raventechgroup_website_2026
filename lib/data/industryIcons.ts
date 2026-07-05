import type { Icon } from '@phosphor-icons/react'
import {
  Bank,
  Buildings,
  FirstAid,
  GraduationCap,
  House,
  Package,
  Storefront,
  TrendUp,
  UsersThree,
} from '@phosphor-icons/react'

/** Phosphor duotone icons for service-page industry grids */
export const INDUSTRY_ICONS: Record<string, Icon> = {
  saccos: Bank,
  sacco: Bank,
  fintechs: TrendUp,
  fintech: TrendUp,
  healthcare: FirstAid,
  logistics: Package,
  retail: Storefront,
  ecommerce: Storefront,
  'e-commerce': Storefront,
  education: GraduationCap,
  ngo: UsersThree,
  ngos: UsersThree,
  'public-sector': Buildings,
  public: Buildings,
  'real-estate': House,
  realestate: House,
}

function industryIconKey(slug: string | undefined, name: string): string {
  if (slug) return slug.toLowerCase()
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function pickIndustryIcon(slug: string | undefined, name: string): Icon {
  const key = industryIconKey(slug, name)
  return INDUSTRY_ICONS[key] ?? Buildings
}
