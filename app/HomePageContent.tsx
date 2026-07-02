'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'

import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { SITE_SECTION_STAGGER } from '@/lib/siteScrollMotion'

import { Hero }                from '@/components/sections/Hero'
import { Problems }            from '@/components/sections/Problems'
import { Services }            from '@/components/sections/Services'
import { Process }             from '@/components/sections/Process'
import { CaseStudiesPreview }  from '@/components/sections/CaseStudiesPreview'
import { Testimonials }        from '@/components/sections/Testimonials'
import { ServiceIntakeWizard } from '@/components/sections/ServiceIntakeWizard'

export function HomePageContent() {
  const serviceIntakeSectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress: serviceIntakeSeamProgress } = useScroll({
    target: serviceIntakeSectionRef,
    offset: ['start end', 'start start'],
  })

  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[#0A0A0A] text-white">

      {/* ── 01 Hero — sticky; lg+ fills at least one viewport height for consistent pin + backdrop ── */}
      <div className="sticky top-0 z-10 h-svh min-h-0 w-full max-w-full min-w-0">
        <Hero homepageIntakeSeamProgress={serviceIntakeSeamProgress} />
      </div>

      {/* ── 02–12 All sections slide up over the hero as a single card ── */}
      <div className="relative z-20 -mt-7 min-w-0 overflow-x-clip rounded-t-card bg-[linear-gradient(180deg,rgba(10,10,10,0.98)_0%,#0A0A0A_2rem,#0A0A0A_100%)]">

        {/* 02 — "Let me find my starting point" (first surface over hero) */}
        <ScrollReveal delay={0 * SITE_SECTION_STAGGER}>
          <ServiceIntakeWizard registerSectionRef={serviceIntakeSectionRef} />
        </ScrollReveal>

        {/* 03 — "They understand my situation" */}
        <ScrollReveal delay={1 * SITE_SECTION_STAGGER}>
          <Problems />
        </ScrollReveal>

        {/* 04 — "Here's what they actually do" */}
        <Services />

        {/* 05 — "Here's exactly how it works" */}
        <ScrollReveal delay={3 * SITE_SECTION_STAGGER}>
          <Process />
        </ScrollReveal>

        {/* 06 — "Here's the specific work" */}
        <ScrollReveal delay={4 * SITE_SECTION_STAGGER}>
          <CaseStudiesPreview />
        </ScrollReveal>

        {/* 07 — "Here's what clients say" */}
        <ScrollReveal delay={5 * SITE_SECTION_STAGGER}>
          <Testimonials />
        </ScrollReveal>

      </div>
    </div>
  )
}
