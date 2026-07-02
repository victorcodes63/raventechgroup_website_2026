'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { ServiceIntakeWizard } from '@/components/sections/ServiceIntakeWizard'
import { Services as ServicesShowcase } from '@/components/sections/Services'
import { CTAButton } from '@/components/ui/CTAButton'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import {
  SERVICE_MEGA_CATEGORIES,
  SERVICE_MEGA_CATEGORY_SERVICES,
  type MegaMenuServiceItem,
  type ServiceMegaCategoryId,
} from '@/lib/data/serviceMegaGroups'
import { SERVICE_MEGA_MENU_ICONS } from '@/lib/data/serviceMegaMenuIcons'
import { services } from '@/lib/data/services'
import { SITE_SECTION_STAGGER } from '@/lib/siteScrollMotion'

const heroStats = [
  { value: '7', label: 'Core services' },
  { value: '4', label: 'Delivery phases' },
  { value: '1', label: 'Accountable team' },
] as const

const engagementSteps = [
  {
    label: 'Discover',
    title: 'Map the constraint',
    description:
      'We start by understanding the business process, existing tools, stakeholders, and risk before recommending a service line.',
  },
  {
    label: 'Scope',
    title: 'Turn ambiguity into a sprint plan',
    description:
      'You get clear workstreams, owners, assumptions, dependencies, and handover requirements before delivery starts.',
  },
  {
    label: 'Ship',
    title: 'Release in working increments',
    description:
      'Software, infrastructure, integrations, and security improvements move in visible stages. No big reveal at the end.',
  },
  {
    label: 'Transfer',
    title: 'Leave the system operable',
    description:
      'Runbooks, observability, access controls, documentation, and team walkthroughs are part of the engagement.',
  },
] as const

const servicesFaq = [
  {
    question: 'What if we are not sure which service we need?',
    answer:
      'Use the service fit questionnaire or book a discovery call. We will map the constraint first, then recommend the smallest responsible starting point.',
  },
  {
    question: 'Can one project combine multiple services?',
    answer:
      'Yes. Most serious projects do. A portal might need software development, M-Pesa integration, cloud architecture, and security review in one delivery plan.',
  },
  {
    question: 'Can Raven work with our internal team?',
    answer:
      'Yes. We often work beside internal product, IT, finance, or engineering teams. We use your tools where possible and document decisions so your team can own the system.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We can stay involved through managed operations, improvement sprints, or advisory support. If you want full handover, we leave the runbooks and technical context your team needs.',
  },
] as const

type FaqItem = (typeof servicesFaq)[number]

function ServicesHero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative flex h-full min-h-[100svh] items-center overflow-hidden bg-[#0A0A0A]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,169,31,0.16),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.07),transparent_28%),radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.9)_72%)]"
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.12 }}
          className="absolute bottom-[-160px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-500/14 blur-[150px]"
        />
      </div>

      <div className="site-shell relative z-10 w-full py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-8"
          >
            <SectionEyebrow gutterBottom={false}>Services</SectionEyebrow>
            <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.0] tracking-[-0.03em] text-white md:text-7xl lg:text-[88px]">
              Seven services. One delivery standard.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-[1.75] text-white/60">
              Build, connect, secure, migrate, or modernise the systems your business runs on. Start with the service
              you know, or use the fit guide below when the next move is not obvious.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton href="#service-fit" variant="primary" className="px-7 py-3.5">
                Find the right start
              </CTAButton>
              <CTAButton href="/book" variant="light-outline" className="px-7 py-3.5">
                Book a discovery call
              </CTAButton>
            </div>
          </motion.div>

          <motion.aside
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-4"
          >
            <div className="border-y border-white/[0.08] py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                How to read this page
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                The first section helps you choose a starting point. The service accordion shows the full catalogue.
                The capability groups explain how those services combine in real work.
              </p>
              <div className="mt-7 grid gap-4 border-t border-white/[0.08] pt-6 min-[420px]:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold tracking-[-0.03em] text-white">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-white/35">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

function serviceForSlug(slug: string) {
  return services.find((service) => service.slug === slug)
}

function CapabilityNav() {
  return (
    <ScrollReveal>
      <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-20 lg:py-24">
        <div className="site-shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionEyebrow gutterBottom={false}>Capability groups</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
                Same services, grouped by outcome
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
                This is how we usually combine the catalogue into real programmes: engineering, advisory, data, risk,
                and senior delivery support.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {SERVICE_MEGA_CATEGORIES.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-brand-500/40 hover:text-white"
                >
                  {category.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

function GroupServiceLink({ item }: { item: MegaMenuServiceItem }) {
  const service = serviceForSlug(item.slug)
  const Icon = SERVICE_MEGA_MENU_ICONS[item.slug]
  if (!service || !Icon) return null

  return (
    <Link href={service.href} className="group grid gap-4 border-t border-white/[0.08] py-5 first:border-t-0 sm:grid-cols-[2.5rem_1fr_auto] sm:items-start">
      <span className="flex h-10 w-10 items-center justify-center rounded-card border border-brand-500/20 bg-brand-500/10 text-brand-500">
        <Icon size={18} weight="bold" aria-hidden />
      </span>
      <span>
        <span className="block text-base font-semibold text-white transition-colors group-hover:text-brand-400">
          {item.title}
        </span>
        <span className="mt-1 block max-w-xl text-sm leading-relaxed text-white/50">{item.sub}</span>
      </span>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-500 transition-all group-hover:gap-3 sm:pt-1">
        View
        <ArrowUpRight size={13} aria-hidden />
      </span>
    </Link>
  )
}

function CapabilityGroups() {
  return (
    <section className="bg-[#0A0A0A]">
      {SERVICE_MEGA_CATEGORIES.map((category, index) => {
        const items = SERVICE_MEGA_CATEGORY_SERVICES[category.id as ServiceMegaCategoryId]

        return (
          <ScrollReveal key={category.id}>
            <section id={category.id} className="scroll-mt-28 border-t border-white/[0.06] bg-[#0A0A0A] py-20 lg:py-24">
              <div className="site-shell">
                <div className="grid gap-12 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                      {String(index + 1).padStart(2, '0')} · {category.label}
                    </p>
                    <h3 className="mt-5 max-w-xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl">
                      {category.highlight}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">{category.description}</p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="border-y border-white/[0.08]">
                      {items.map((item) => (
                        <GroupServiceLink key={`${category.id}-${item.slug}-${item.title}`} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )
      })}
    </section>
  )
}

function EngagementModel() {
  return (
    <ScrollReveal>
      <section className="relative border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32 xl:py-40">
        <div className="site-shell">
          <div className="mb-8 md:mb-10 xl:mb-12">
            <SectionEyebrow gutterBottom={false} className="mb-2 md:mb-3">
              How we work
            </SectionEyebrow>
            <h2 className="max-w-5xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
              From unclear brief to systems your team can run
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/60">
              The service changes. The delivery discipline does not.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 xl:gap-16"
          >
            {engagementSteps.map((step, index) => (
              <motion.article
                key={step.label}
                variants={fadeInUp}
                className="relative min-h-0 overflow-hidden border-t border-white/[0.06] px-0 pb-14 pt-10 transition-colors duration-200 hover:border-t-[1.5px] hover:border-brand-500/70 lg:min-h-[240px]"
              >
                <span
                  className="absolute right-0 top-6 z-0 select-none text-[150px] font-bold leading-none tracking-[-0.04em] text-white/[0.05] lg:text-[190px]"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500/80">
                    {String(index + 1).padStart(2, '0')} · {step.label}
                  </p>
                  <h3 className="text-xl font-bold leading-tight tracking-tight text-white lg:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/55 lg:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </ScrollReveal>
  )
}

function ServicesFaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const reducedMotion = useReducedMotion()
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set())

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="divide-y divide-white/[0.08]">
      {items.map((faq, index) => {
        const isOpen = openKeys.has(faq.question)
        const triggerId = `services-faq-trigger-${index}`
        const panelId = `services-faq-panel-${index}`

        return (
          <div key={faq.question} className="py-4 sm:py-5">
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(faq.question)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold text-white sm:text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              <span className="pr-2">{faq.question}</span>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={transition}
                className={`text-lg leading-none ${isOpen ? 'text-brand-500' : 'text-white/40'}`}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={transition}
                  className="overflow-hidden"
                >
                  <div className="mt-3 border-t border-white/[0.06] pt-3">
                    <p className="text-sm leading-relaxed text-white/55 sm:text-[15px]">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function ServicesFaq() {
  return (
    <ScrollReveal>
      <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-24 text-white lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <SectionEyebrow>Before you choose</SectionEyebrow>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
                Quick answers before scoping
              </h2>
              <p className="max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
                No jargon here. The first call is for sorting the work, not forcing you into a package.
              </p>
            </motion.div>
            <ServicesFaqAccordion items={servicesFaq} />
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

function FinalCta() {
  return (
    <ScrollReveal>
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] about-hero-grid" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_75%)]" aria-hidden />
        <div className="site-shell relative mx-auto max-w-4xl text-center">
          <SectionEyebrow align="center" className="mx-auto justify-center" gutterBottom={false}>
            Ready when you are
          </SectionEyebrow>
          <h2 className="mt-6 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            Bring us the constraint
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.75] text-white/55">
            We will tell you what to build, what to fix first, and what not to spend money on yet.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href="/book" variant="primary" className="px-8 py-3.5">
              Book a discovery call
            </CTAButton>
            <CTAButton href="/contact" variant="light-outline" className="px-8 py-3.5">
              Send project details
            </CTAButton>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

export function ServicesContent() {
  const serviceFitSectionRef = useRef<HTMLElement | null>(null)
  const s = (n: number) => n * SITE_SECTION_STAGGER

  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[#0A0A0A] text-white">
      <div className="sticky top-0 z-10 h-svh min-h-0 w-full max-w-full min-w-0">
        <ServicesHero />
      </div>

      <div className="relative z-20 -mt-7 min-w-0 overflow-x-clip rounded-t-card bg-[linear-gradient(180deg,rgba(10,10,10,0.98)_0%,#0A0A0A_2rem,#0A0A0A_100%)]">
        <ScrollReveal delay={s(0)}>
          <div id="service-fit">
            <ServiceIntakeWizard registerSectionRef={serviceFitSectionRef} />
          </div>
        </ScrollReveal>

        <ServicesShowcase />

        <ScrollReveal delay={s(3)}>
          <CapabilityNav />
        </ScrollReveal>
        <CapabilityGroups />
        <ScrollReveal delay={s(4)}>
          <EngagementModel />
        </ScrollReveal>
        <ScrollReveal delay={s(5)}>
          <ServicesFaq />
        </ScrollReveal>
        <ScrollReveal delay={s(6)}>
          <FinalCta />
        </ScrollReveal>
      </div>
    </div>
  )
}
