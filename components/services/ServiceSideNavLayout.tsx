'use client'

import type { ReactNode } from 'react'
import { ServiceScrollNav, type ServiceScrollNavItem } from '@/components/services/ServiceScrollNav'

export function ServiceSideNavLayout({
  navItems,
  children,
}: {
  navItems: ServiceScrollNavItem[]
  children: ReactNode
}) {
  return (
    <div className="relative bg-[#0A0A0A]">
      <div className="site-shell">
        <div className="lg:grid lg:grid-cols-[160px_1fr] lg:gap-x-12 xl:grid-cols-[180px_1fr] xl:gap-x-16">
          <aside className="hidden lg:block lg:pt-16">
            <div className="sticky top-[72px] self-start pb-16">
              <ServiceScrollNav items={navItems} />
            </div>
          </aside>

          <div className="min-w-0 py-12 lg:py-16">{children}</div>
        </div>
      </div>
    </div>
  )
}
