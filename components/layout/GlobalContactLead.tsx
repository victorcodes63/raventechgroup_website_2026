'use client'

import { usePathname } from 'next/navigation'

import { HomepageLeadSection } from '@/components/sections/HomepageLeadSection'
import { getGlobalContactLeadCopy } from '@/lib/data/globalContactLeadCopy'

/** Renders the homepage-style contact band before the footer on every route except `/contact`. */
export function GlobalContactLead() {
  const pathname = usePathname()
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/contact' || path === '/book') {
    return null
  }
  const copy = getGlobalContactLeadCopy(pathname)
  return <HomepageLeadSection copy={copy} />
}
