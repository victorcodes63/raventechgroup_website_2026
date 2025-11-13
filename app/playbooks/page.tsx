'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer, pageHeroBadgeVariants, pageHeroTitleVariants, pageHeroWordVariants, pageHeroDescriptionVariants, pageHeroButtonVariants } from '@/lib/animations'

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

const playbooks = [
  {
    title: 'Architecture Sprint Playbook',
    summary: 'A 10-day immersion that surfaces constraints, aligns stakeholders, and defines measurable outcomes before any code is written.',
    deliverables: ['Current-state mapping', 'Risk & dependency log', 'Target architecture blueprint', 'Roadmap + operating cadence'],
    duration: '10 days',
    bestFor: 'Teams planning modernization or net-new platform builds who need clarity before committing budget.',
    href: '/contact?topic=architecture-sprint',
  },
  {
    title: 'Delivery Rhythm Guide',
    summary: 'How we structure sprints, governance, and documentation so cross-functional teams stay accountable and visible.',
    deliverables: ['Sprint rituals & agendas', 'Decision log templates', 'Metrics dashboard starter kit', 'Handover checklist'],
    duration: '2-3 weeks to implement alongside your team',
    bestFor: 'Organisations scaling product delivery or recovering from stalled projects.',
    href: '/contact?topic=delivery-rhythm',
  },
  {
    title: 'Reliability & Ops Handbooks',
    summary: 'Runbooks, observability patterns, and escalation paths that keep platforms stable once they go live.',
    deliverables: ['Reliability scorecard', 'Incident response matrix', 'On-call rotations & SLAs', 'Runbook templates'],
    duration: 'Engagement-specific; typically 4-6 weeks to codify and transition',
    bestFor: 'Teams launching critical systems who need operations maturity without hiring a full SRE team immediately.',
    href: '/contact?topic=reliability-ops',
  },
  {
    title: 'Cloud Landing Zone Accelerator',
    summary: 'A repeatable starting point for AWS environments covering identity, networking, security, and cost visibility.',
    deliverables: ['Terraform baseline modules', 'Security and compliance guardrails', 'Cost and resilience review cadence', 'Knowledge transfer workshops'],
    duration: '3-4 weeks to deploy and transition to your team',
    bestFor: 'Companies moving from ad-hoc cloud usage to managed, auditable infrastructure.',
    href: '/contact?topic=cloud-landing-zone',
  },
  {
    title: 'Integration & Automation Toolkit',
    summary: 'Patterns for connecting systems with APIs, ETL pipelines, and automation that keep operations flowing.',
    deliverables: ['Integration architecture map', 'Monitoring & alerting setup', 'Rollback & change management process', 'Documentation package'],
    duration: 'Depends on scope; the playbook keeps velocity steady even during staged rollouts.',
    bestFor: 'Operations teams juggling manual processes who need automation without risking stability.',
    href: '/contact?topic=integration-automation',
  },
  {
    title: 'Security Readiness Framework',
    summary: 'A practical approach to threat modelling, policy design, and compliance preparation embedded into delivery.',
    deliverables: ['Threat model workshop output', 'Policy & access controls', 'Secure SDLC checklist', 'Audit preparation plan'],
    duration: '4 weeks to embed across squads, with quarterly refreshes recommended',
    bestFor: 'Startups entering regulated markets or SMEs prepping for audits and certifications.',
    href: '/contact?topic=security-readiness',
  },
]

const knowledgeHighlights = [
  {
    label: 'Built for transparency',
    detail: 'Every playbook includes templates, agendas, and artefacts you can reuse even if we hand the work back entirely.',
  },
  {
    label: 'Modular, not prescriptive',
    detail: 'Adopt the pieces that fit—architecture sprints plug into delivery rhythms, cloud landing zones tie into reliability handbooks.',
  },
  {
    label: 'Ready to pilot',
    detail: 'We road-test each playbook internally before rolling it out with partners. Expect iteration, not theory.',
  },
]

export default function PlaybooksPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
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
              Playbooks
            </motion.span>
            <motion.h1
              variants={pageHeroTitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {'Frameworks we bring into every partnership.'.split(' ').map((word, index) => (
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
              Instead of glossy case studies, we share the playbooks that keep our teams accountable—architecture sprints, delivery rhythms, operations
              handbooks, and more. Pick the one you need; we'll tailor it to your context together.
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
                Request a walkthrough
              </Link>
              <Link href="#playbook-library" className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white">
                Browse playbooks
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-white text-black" id="playbook-library">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-14%] h-72 w-72 rounded-full bg-black/5 blur-[140px]" />
          <div className="absolute right-[-16%] bottom-[-12%] h-[340px] w-[420px] rounded-full bg-brand-500/15 blur-[180px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-120px' }} className="mx-auto max-w-6xl space-y-16">
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Library</span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">Downloadable frameworks ready to deploy</h2>
              <p className="mt-4 text-base text-black/70 sm:text-lg">
                Each playbook is a starting point—an agenda, toolkit, and set of artefacts we adapt to your organisation. No fluff, just the way we run the
                work.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-2">
              {playbooks.map(({ title, summary, deliverables, duration, bestFor, href }) => (
                <div key={title} className="flex h-full flex-col rounded-3xl border border-black/10 bg-white/85 p-8 shadow-[0_34px_120px_-70px_rgba(15,23,42,0.45)]">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Playbook</span>
                  <h3 className="mt-3 text-xl font-semibold text-black">{title}</h3>
                  <p className="mt-3 text-sm text-black/70">{summary}</p>
                  <div className="mt-6 space-y-3 text-sm text-black/70">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Core deliverables</p>
                      <ul className="mt-2 space-y-1.5">
                        {deliverables.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="relative top-[6px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Typical duration:</span> {duration}
                    </p>
                    <p>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Best for:</span> {bestFor}
                    </p>
                  </div>
                  <div className="mt-auto pt-6">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition duration-200 hover:text-brand-400"
                    >
                      Request this playbook
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-400/60">→</span>
                    </Link>
                  </div>
                </div>
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
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Why these exist</span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Knowledge we’ve codified so you don’t have to start from zero</h2>
              <p className="mt-4 text-base text-white/65 sm:text-lg">
                We publish our internal frameworks because partners deserve visibility into how we work. Each playbook has been road-tested on internal
                initiatives or pilot programmes before we use it with clients.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-3">
              {knowledgeHighlights.map(({ label, detail }) => (
                <div key={label} className="rounded-3xl border border-white/12 bg-white/[0.04] p-8">
                  <h3 className="text-lg font-semibold text-white">{label}</h3>
                  <p className="mt-3 text-sm text-white/65">{detail}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg_black text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-8%] h-64 w-64 rounded-full bg-brand-500/10 blur-[130px]" />
          <div className="absolute right-[-14%] bottom-[-12%] h-72 w-72 rounded-full bg-white/10 blur-[150px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mx-auto max-w-4xl">
            <motion.div variants={fadeInUp} className="rounded-3xl border border-white/12 bg-white/[0.05] p-10 shadow-[0_40px_140px_-90px_rgba(15,23,42,0.55)]">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Want to co-develop a new playbook?</h2>
              <p className="mt-4 text-sm text-white/70 sm:text-base">
                We treat these frameworks as living documents. If you have a unique constraint—regulatory, operational, or technical—we’ll evolve a playbook
                together and share ownership of the knowledge that comes out of it.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                <span className="rounded-full border border-white/15 px-3 py-1">Regulated fintech launches</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Public sector modernisation</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Operational transformation</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Hybrid delivery teams</span>
              </div>
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
              Let’s tailor the right playbook for your roadmap.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
              Share where you are in the journey—scoping, building, or operating—and we’ll recommend the combination of frameworks and squads that keeps the
              work honest and measurable.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-black transition duration-200 hover:bg-brand-400"
              >
                Start a conversation
              </Link>
              <Link href="/services" className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white">
                Explore our services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
