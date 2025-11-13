'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { fadeInUp, staggerContainer, pageHeroBadgeVariants, pageHeroTitleVariants, pageHeroWordVariants, pageHeroDescriptionVariants, pageHeroButtonVariants } from '@/lib/animations'
import { services as catalogServices } from '@/lib/data/services'
import type { ServiceItem as CatalogService } from '@/lib/data/services'

const HERO_GRID_SVG = `
  <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
    <rect x='0.4' y='0.4' width='59.2' height='59.2' fill='none' stroke='rgba(255,169,30,0.18)' stroke-width='0.8' />
    <path d='M30 0 V60 M0 30 H60' fill='none' stroke='rgba(255,169,30,0.08)' stroke-width='0.65' />
    <circle cx='0' cy='0' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='60' cy='0' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='0' cy='60' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='60' cy='60' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='30' cy='0' r='1' fill='rgba(255,169,30,0.08)' />
    <circle cx='0' cy='30' r='1' fill='rgba(255,169,30,0.08)' />
    <circle cx='60' cy='30' r='1' fill='rgba(255,169,30,0.08)' />
    <circle cx='30' cy='60' r='1' fill='rgba(255,169,30,0.08)' />
  </svg>
`

const HERO_GRID_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(HERO_GRID_SVG)}")`

type ServicesPageService = CatalogService & {
  intro: string
  detail?: string
  bullets?: string[]
}

const serviceEnhancements: Record<string, Partial<ServicesPageService>> = {
  'software-development': {
    intro: 'Custom platforms, portals, and internal tools engineered with TypeScript-first stacks.',
    detail:
      'We move from prototypes to production with documented architecture decisions, automated testing, and cadence your leadership can rely on.',
    bullets: [
      'Next.js, React, Node.js, and typed APIs as the default toolset',
      'Design systems, Storybook documentation, and onboarding guides',
      'CI/CD pipelines and observability wired in before launch',
    ],
  },
  'cloud-solutions': {
    intro: 'Landing zones, migrations, and day-two operations for AWS-led teams.',
    detail:
      'Infrastructure-as-code foundations, security guardrails, and cost frameworks keep your cloud environments predictable.',
    bullets: [
      'Terraform or AWS CDK builds with compliance baked in',
      'Cost, resilience, and backup reviews on an agreed cadence',
      'Incident response runbooks and hybrid connectivity plans',
    ],
  },
  cybersecurity: {
    intro: 'Threat modelling, secure SDLC, and compliance readiness for regulated organisations.',
    detail:
      'We pair assessments with remediation roadmaps and establish security rituals the whole team can follow.',
    bullets: [
      'Application & infrastructure reviews with prioritised fixes',
      'Role-based access, logging, and data retention policies',
      'Tabletop exercises, incident drills, and reporting templates',
    ],
  },
  'digital-transformation': {
    intro: 'Strategy sprints that align leadership on scope, budgets, and measurable outcomes.',
    detail:
      'We surface constraints, map dependencies, and co-author a pragmatic roadmap before any code is written.',
    bullets: [
      'Executive workshops, stakeholder interviews, and risk mapping',
      'Prioritised initiative backlog with effort and value scoring',
      'Operating cadence and governance recommendations',
    ],
  },
  'it-consulting': {
    intro: 'On-demand product, engineering, and operations advisors embedded alongside your team.',
    detail:
      'Bring in highly experienced leads to stress-test decisions, accelerate delivery, or mentor internal squads.',
    bullets: [
      'Architecture and roadmap reviews grounded in experience',
      'Delivery coaching, process audits, and tooling upgrades',
      'Capability building and hiring support for critical roles',
    ],
  },
  'system-integration': {
    intro: 'Connect platforms and automate processes so information flows without manual work.',
    detail:
      'We orchestrate APIs, ETL pipelines, and automation with documentation that keeps your ops teams in control.',
    bullets: [
      'Event-driven & scheduled integrations with monitoring',
      'ETL/ELT pipelines, data quality checks, and alerting',
      'Change management plans and rollback playbooks agreed up front',
    ],
  },
}

const operatingPillars = [
  {
    title: 'Scope & align first',
    description:
      'Every engagement begins with a structured immersion to surface constraints, define outcomes, and agree on governance before delivery starts.',
  },
  {
    title: 'Build in the open',
    description:
      'We ship in increments, keep stakeholders in the loop, and document decisions so teams can maintain momentum long after launch.',
  },
  {
    title: 'Operate responsibly',
    description:
      'Runbooks, observability, and support rotations stay in place so reliability, security, and cost remain visible as platforms scale.',
  },
]

const calloutPoints = [
  'Transparent staffing and pricing—no surprises mid-engagement.',
  'Access to delivery leads, architects, and operations specialists on the same call.',
  'Knowledge transfer is mandatory: we leave behind playbooks, not black boxes.',
]

const servicesFaq = [
  {
    question: 'How do you scope and price engagements?',
    answer:
      'We start with a short architecture or discovery sprint to clarify scope, risks, and staffing. Pricing is tied to the squad we agree on after that sprint—no change orders unless we both sign off on new scope.',
  },
  {
    question: 'Who will we work with day to day?',
    answer:
      'The leads you meet during scoping stay on the project. Every engagement includes a delivery lead, engineering or cloud specialists, and operations support when needed. No handoffs to an unknown team.',
  },
  {
    question: 'Can you embed alongside our existing team?',
    answer:
      'Yes. We prefer hybrid teams where internal product or engineering talent works alongside Raven squads. We adopt your tooling, share rituals, and document decisions so everyone stays aligned.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We offer managed operations and reliability support, but only if it remains measurable. Otherwise we hand over playbooks, runbooks, and documentation so your internal team can take over confidently.',
  },
]

export function ServicesContent() {
  const services: ServicesPageService[] = catalogServices.map((service) => ({
    ...service,
    intro: serviceEnhancements[service.slug]?.intro ?? service.description,
    detail: serviceEnhancements[service.slug]?.detail,
    bullets: serviceEnhancements[service.slug]?.bullets,
  }))

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,26,30,0.6),_rgba(0,0,0,0.9))]"
          />
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: HERO_GRID_PATTERN,
              backgroundSize: '60px 60px',
              backgroundRepeat: 'repeat',
              opacity: 0.55,
            }}
            animate={{ backgroundPosition: ['0px 0px', '40px 28px', '0px 0px'] }}
            transition={{
              backgroundPosition: {
                duration: 26,
                ease: 'easeInOut',
                repeat: Infinity,
              },
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
            className="absolute bottom-[-150px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-500/16 blur-[150px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0),_rgba(0,0,0,0.86) 70%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.span
              variants={pageHeroBadgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white/65"
            >
              Services overview
            </motion.span>
            <motion.h1
              variants={pageHeroTitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {'Engineering, operations, and strategy under one roof.'.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  variants={pageHeroWordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              variants={pageHeroDescriptionVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-6 max-w-3xl text-base text-white/70 sm:text-lg"
            >
              We step in when reliability, security, and measurable outcomes matter just as much as speed. Explore how our squads help teams launch, scale,
              and operate technology without guesswork.
            </motion.p>
            <motion.div
              variants={pageHeroButtonVariants}
              initial="hidden"
              animate="visible"
              className="mt-10 flex items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-brand-400"
              >
                Start a conversation
              </Link>
              <Link href="#services-catalog" className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white">
                Jump to services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-white text-black" id="services-catalog">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-14%] h-72 w-72 rounded-full bg-black/5 blur-[140px]" />
          <div className="absolute right-[-16%] bottom-[-12%] h-[340px] w-[420px] rounded-full bg-brand-500/15 blur-[180px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-120px' }} className="mx-auto max-w-6xl">
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Services catalogue</span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">What we’re accountable for</h2>
              <p className="mt-4 text-base text-black/70 sm:text-lg">
                Each service is delivered by a multidisciplinary squad that stays close to your team. Hover or tap for deeper detail, then explore the
                dedicated page for scope, outcomes, and engagement models.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map(({ slug, title, intro, detail, bullets, href, Icon }) => (
                <Link
                  key={slug}
                  href={href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white/85 p-8 shadow-[0_34px_120px_-70px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-brand-400/60 hover:bg-brand-400/10"
                >
                  <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-brand-500 transition duration-200 group-hover:bg-brand-400/20 group-hover:text-brand-100">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="text-xl font-semibold text-black">{title}</h3>
                  <p className="mt-3 text-sm text-black/65">{intro}</p>

                  {detail && (
                    <div className="mt-5 space-y-3 text-sm text-black/70">
                      <p>{detail}</p>
                      {bullets && (
                        <ul className="space-y-2">
                          {bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <span className="relative top-[6px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                    View service
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-400/60">→</span>
                  </span>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-[#0d0d0f] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-14%] top-[-10%] h-72 w-72 rounded-full bg-brand-500/14 blur-[160px]" />
          <div className="absolute right-[-18%] bottom-[-12%] h-72 w-72 rounded-full bg-white/10 blur-[170px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mx-auto max-w-5xl space-y-12">
            <motion.div variants={fadeInUp} className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Engagement pillars</span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">How every engagement runs</h2>
              <p className="mt-4 text-base text-white/65 sm:text-lg">
                Whether you engage us for software, cloud, or advisory work, these pillars stay the same. They keep delivery honest, predictable, and
                measurable.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-3">
              {operatingPillars.map(({ title, description }) => (
                <div key={title} className="rounded-3xl border border-white/12 bg-white/[0.04] p-8">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm text-white/65">{description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-white text-black">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-8%] h-64 w-64 rounded-full bg-black/5 blur-[130px]" />
          <div className="absolute right-[-14%] bottom-[-12%] h-72 w-72 rounded-full bg-brand-500/15 blur-[150px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mx-auto max-w-4xl">
            <motion.div variants={fadeInUp} className="rounded-3xl border border-black/10 bg-white/85 p-10 shadow-[0_40px_140px_-90px_rgba(15,23,42,0.55)]">
              <h2 className="text-2xl font-semibold text-black sm:text-3xl">What it’s like to work with us</h2>
              <p className="mt-4 text-sm text-black/70 sm:text-base">
                We only take on work where we can stay accountable from discovery to operations. Here’s what you can expect from day one.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-black/70">
                {calloutPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="relative top-[7px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-16%] top-[-10%] h-60 w-60 rounded-full bg-brand-500/12 blur-[140px]" />
          <div className="absolute right-[-14%] bottom-[-12%] h-64 w-64 rounded-full bg-black/5 blur-[120px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mx-auto max-w-4xl space-y-10">
            <motion.div variants={fadeInUp} className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Services FAQ</span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">Questions we cover in scoping calls</h2>
              <p className="mt-4 text-base text-black/70 sm:text-lg">
                The answers stay the same regardless of which service you choose—transparency first, so you know what partnering with Raven feels like.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4">
              {servicesFaq.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group overflow-hidden rounded-3xl border border-black/10 bg-white/85 px-6 py-5 text-left shadow-[0_24px_90px_-70px_rgba(15,23,42,0.4)] transition duration-200 open:border-brand-400/60 open:bg-brand-400/10"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-black sm:text-base">
                    <span>{question}</span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/15 text-black/60 transition duration-200 group-open:border-brand-400 group-open:text-brand-500">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-black/70 sm:text-base">{answer}</p>
                </details>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: HERO_GRID_PATTERN, backgroundSize: '60px 60px' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0),_rgba(0,0,0,0.85) 70%)]" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mx-auto max-w-4xl text-center">
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/60"
            >
              Ready when you are
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
              Let’s map your next release, migration, or operating playbook.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
              Share where your platform needs reinforcement and we’ll propose a sprint-by-sprint plan with the right mix of architecture, delivery, and
              operations support.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-black transition duration-200 hover:bg-brand-400"
              >
                Book a consultation
              </Link>
              <Link href="/playbooks" className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white">
                Explore our playbooks
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
