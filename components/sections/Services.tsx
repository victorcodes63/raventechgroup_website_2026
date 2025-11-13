'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import type { ServiceItem as CatalogService } from '@/lib/data/services'
import { services as catalogServices } from '@/lib/data/services'

type HomepageService = CatalogService & {
  intro: string
  detail?: string
  bullets?: string[]
  spotlight?: boolean
}

const serviceEnhancements: Record<string, Omit<HomepageService, keyof CatalogService> | undefined> = {
  'software-development': {
    intro: 'Custom platforms, internal tools, and customer-facing apps engineered with resilient TypeScript foundations.',
    detail:
      'We rapidly prototype, document architecture decisions, and ship accountable increments so stakeholders see progress every sprint.',
    bullets: [
      'Next.js, React, and Node.js as the core stack with typed APIs',
      'Design systems, Storybook docs, and onboarding guides for your team',
      'CI/CD pipelines, automated testing, and performance guardrails baked in',
    ],
    spotlight: true,
  },
  'cloud-solutions': {
    intro: 'Cloud landing zones, migrations, and day-two operations tuned for AWS-first teams.',
    detail:
      'We codify infrastructure, security baselines, and runbooks so environments stay reproducible and secure as you scale.',
    bullets: [
      'Infrastructure-as-code foundations with Terraform or AWS CDK',
      'Cost, resilience, and monitoring guardrails reviewed monthly',
      'Incident response playbooks and on-call rotations defined up front',
    ],
  },
  cybersecurity: {
    intro: 'Threat modelling, secure SDLC, and compliance readiness for regulated organisations.',
    bullets: [
      'Application and infrastructure assessments with prioritised remediation',
      'Policies, access controls, and logging tuned for audits',
      'Playbooks for incident response, tabletop exercises, and recovery drills',
    ],
  },
  'digital-transformation': {
    intro: 'Strategy sprints that align leadership on scope, budgets, and measurable outcomes.',
    detail:
      'We run structured discovery to surface constraints, align stakeholders, and co-author the programme roadmap before build begins.',
    bullets: [
      'Executive workshops, risk mapping, and measurable KPIs',
      'Prioritised initiative backlogs with effort and dependency views',
      'Operating cadence recommendations for steering and delivery teams',
    ],
  },
  'it-consulting': {
    intro: 'Product, engineering, and operations advisors embedded alongside your team.',
    bullets: [
      'Architecture guidance, technical due diligence, and roadmap reviews',
      'Delivery coaching, tooling audits, and hiring support',
      'Knowledge transfer sessions and documentation clean-up',
    ],
  },
  'system-integration': {
    intro: 'Connect platforms, data, and automation pipelines so information moves without manual steps.',
    detail:
      'We model data flows, orchestrate APIs, and deliver documentation so your teams can maintain integrations confidently.',
    bullets: [
      'Event-driven and scheduled integrations with monitoring and alerts',
      'ETL/ELT pipelines with governance and change management plans',
      'Runbooks and rollback paths agreed before go-live',
    ],
  },
}

export function Services() {
  const services = useMemo<HomepageService[]>(
    () =>
      catalogServices.map((service) => ({
        ...service,
        intro: serviceEnhancements[service.slug]?.intro ?? service.description,
        detail: serviceEnhancements[service.slug]?.detail,
        bullets: serviceEnhancements[service.slug]?.bullets,
        spotlight: serviceEnhancements[service.slug]?.spotlight ?? false,
      })),
    []
  )

  const rows = useMemo(() => {
    const grouped: HomepageService[][] = []
    services.forEach((service, index) => {
      if (index % 2 === 0) {
        grouped.push([service])
      } else {
        grouped[grouped.length - 1].push(service)
      }
    })
    return grouped
  }, [services])

  return (
    <section id="services" className="relative overflow-hidden border-t border-white/10 bg-white py-12 sm:py-16 md:py-20 text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] top-20 h-72 w-72 rounded-full bg-black/7 blur-[120px]" />
        <div className="absolute -right-[18%] bottom-[-10%] h-[420px] w-[480px] rounded-full bg-brand-500/18 blur-[160px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 sm:mb-14 grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="space-y-4 sm:space-y-5">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">What we do</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
                Delivery partners for the platforms and operations you're planning next.
              </h2>
              <p className="text-sm text-black/70 sm:text-base leading-relaxed">
                We scope carefully, collaborate in the open, and keep your team in the loop each step. The outcome is predictable delivery and systems that
                remain yours to evolve.
              </p>
            </div>
            <div className="hidden lg:block" />
          </div>

          <div className="space-y-4 sm:space-y-5">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
                {row.map((service) => {
                  const Icon = service.Icon
                  const isSpotlight = service.spotlight || Boolean(service.detail)

                  return (
                    <Link
                      key={service.slug}
                      href={service.href}
                      className={`group relative flex cursor-pointer flex-col rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 px-4 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7 transition duration-300 hover:border-brand-400/60 hover:bg-brand-400/10 touch-manipulation ${
                        isSpotlight ? 'sm:basis-[68%] shadow-[0_24px_80px_-50px_rgba(15,23,42,0.55)]' : 'sm:basis-[32%]'
                      }`}
                    >
                      <span className="mb-4 sm:mb-5 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-black/5 text-brand-400 transition duration-200 group-hover:bg-brand-400/20 group-hover:text-brand-100">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black">{service.title}</h3>
                      <p className="mt-2 text-sm text-black/60 leading-relaxed">{service.intro}</p>

                      {service.detail && (
                        <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3 text-sm text-black/70">
                          <p className="leading-relaxed">{service.detail}</p>
                          {service.bullets && (
                            <ul className="space-y-1.5 sm:space-y-2">
                              {service.bullets.map((item) => (
                                <li key={item} className="flex gap-2 leading-relaxed">
                                  <span className="relative top-[7px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      <span className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-500">
                        Learn more
                        <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-brand-400/60">→</span>
                      </span>
                    </Link>
                  )
                })}

                {row.length === 1 && <div className="hidden flex-1 sm:block" />}
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-14 rounded-2xl sm:rounded-3xl border border-black/10 bg-white/80 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-7 text-center text-sm text-black/60">
            Not seeing exactly what you need? We're happy to workshop a scope or point you to another specialist if we're not the best fit yet.
          </div>
        </div>
      </div>
    </section>
  )
}