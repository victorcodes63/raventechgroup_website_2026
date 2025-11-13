'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, pageHeroBadgeVariants, pageHeroTitleVariants, pageHeroWordVariants, pageHeroDescriptionVariants, pageHeroButtonVariants } from '@/lib/animations'
import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Globe2,
  Handshake,
  Layers,
  MapPin,
  ServerCog,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

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

const executiveHighlights = [
  {
    label: 'Founded',
    value: '2024',
    description: 'Registered in Nairobi to serve organisations that depend on resilient digital infrastructure.',
  },
  {
    label: 'Headquarters',
    value: 'Westlands, Nairobi',
    description: 'Core team works in-person with partners across East and Central Africa and the Middle East for real-time collaboration.',
  },
  {
    label: 'Disciplines',
    value: 'Architecture · Engineering · Operations',
    description: 'Embedded squads aligning product strategy, delivery execution, and platform health.',
  },
]

const operatingLanes = [
  {
    icon: Compass,
    title: 'Strategy dives first',
    summary:
      'Every engagement starts with a structured immersion to surface constraints, co-define outcomes, and set the operating rhythm.',
    bullets: ['10–15 day architecture sprint', 'Decision logs & risk mapping shared with leadership', 'Target metrics defined before build begins'],
  },
  {
    icon: Layers,
    title: 'Build with shared rituals',
    summary:
      'The same squad that scoped the work designs, ships, and demos progress. We document as we go so nothing lives in one person’s head.',
    bullets: ['Weekly cadence reviews and demos', 'Automated testing, CI/CD, and observability as defaults', 'Product owners invited into delivery channels'],
  },
  {
    icon: ShieldCheck,
    title: 'Operate and improve together',
    summary:
      'Runbooks, handover paths, and managed operations keep platforms steady. We stay on to iterate once the first release ships.',
    bullets: ['Incident playbooks with clear escalation paths', 'Reliability scorecards reviewed monthly', 'Roadmap co-authored with client teams'],
  },
]

const capabilityMatrix = [
  {
    engagement: 'Platform modernisation',
    objectives: 'Refactor or rebuild core systems to unlock product roadmap velocity.',
    squad: 'Solution architect · Full-stack duo · Cloud engineer',
    signal: 'Good fit when change requests move slowly because of legacy code or infrastructure risk.',
  },
  {
    engagement: 'Embedded delivery squad',
    objectives: 'Spin up a multi-disciplinary pod that plugs into your workflows and ships alongside internal teams.',
    squad: 'Product-minded tech lead · Engineers across frontend/backend · Delivery lead',
    signal: 'Use when you need experienced hands without large consultancy overhead or one-off contractors.',
  },
  {
    engagement: 'Managed platform operations',
    objectives: 'Stabilise infrastructure, security posture, and release cadence for live products.',
    squad: 'Operations lead · SRE/DevOps engineer · Support rotation',
    signal: 'Ideal when teams need uptime, incident response, and optimisation without building an in-house ops function.',
  },
]

const timelineMoments = [
  {
    year: '2024',
    title: 'Raven Tech Group incorporates',
    caption: 'Founding partners formalise the company in Nairobi with a mandate to serve regulated industries.',
  },
  {
    year: '2025',
    title: 'Pilot programmes underway',
    caption: 'Architecture sprints and delivery pods supporting finance and public-institution teams in Kenya.',
  },
  {
    year: '2026',
    title: 'Scaling operating playbooks',
    caption: 'Codifying reusable delivery frameworks, security baselines, and enablement for longer-term partners.',
  },
]

const founderProfile = {
  name: 'Victor Chumo',
  title: 'Founder & Managing Partner',
  message: [
    'I founded Raven because too many organisations had to pick between large consultancies that move slowly and ad-hoc contractors who disappear after launch. We built a firm that embeds with your team, keeps risks visible, and documents every decision along the way.',
    'Our job is to make sure the systems you rely on stay reliable—from architecture sprints that surface constraints to day-to-day delivery and operations. Accountability is the through-line; you’ll always know who owns what and how the work is progressing.',
  ],
  note: 'Thank you for trusting us with the critical platforms your customers depend on.',
}

const founderCommitments = [
  'We step in only when we can stay accountable from strategy to operations.',
  'We hire for multidisciplinary squads—builders who document as they ship.',
  'We leave every engagement with playbooks your teams can keep using.',
]

const ecosystemNodes = [
  {
    icon: MapPin,
    title: 'Nairobi HQ',
    description: 'Westlands base for strategy workshops, design sprints, and in-person roadmap reviews.',
  },
  {
    icon: Handshake,
    title: 'Specialist partners',
    description: 'Compliance advisors, QA teams, and design studios across Kenya and Rwanda augment squads when needed.',
  },
  {
    icon: Globe2,
    title: 'Global network',
    description: 'Subject-matter experts in Europe and the Middle East available for short, high-impact engagements.',
  },
]

const toolingStandards = [
  {
    icon: ServerCog,
    title: 'Engineering & tooling',
    items: ['TypeScript', 'React & Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker'],
  },
  {
    icon: ClipboardCheck,
    title: 'Delivery operations',
    items: ['Notion workspaces', 'Linear or Jira backlogs', 'Automated CI/CD', 'Quality gates & code reviews'],
  },
  {
    icon: Sparkles,
    title: 'Security & reliability',
    items: ['Infrastructure-as-code', 'Zero trust access policies', 'Observability dashboards', 'Incident response runbooks'],
  },
]

const faqItems = [
  {
    question: 'How do engagements typically start?',
    answer: 'We run a 10-day architecture sprint to clarify scope, surface risks, and define measurable outcomes before build begins.',
  },
  {
    question: 'Do you outsource delivery?',
    answer: 'Core squads are Raven employees. Specialists join transparently when compliance or niche expertise is required.',
  },
  {
    question: 'What industries do you focus on?',
    answer: 'Finance, public institutions, and growth-stage SMEs where reliability, regulation, and scale intersect.',
  },
  {
    question: 'Where are your teams located?',
    answer: 'Primary squad in Nairobi with collaborators across Africa and Europe for overlap coverage.',
  },
  {
    question: 'How do you report progress?',
    answer: 'Weekly delivery reviews, shared dashboards, and decision logs ensure stakeholders see momentum and blockers in real time.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We stay on for managed operations, incident response, and roadmap acceleration based on agreed success metrics.',
  },
  {
    question: 'Can you work with existing teams?',
    answer: 'Yes. We embed alongside internal engineering, product, and operations teams to share context and uplift capability.',
  },
  {
    question: 'How do you price engagements?',
    answer: 'Based on squad composition and engagement length. We scope transparently after the architecture sprint.',
  },
  {
    question: 'Do you offer project-only work?',
    answer: 'We favour partnerships where we can stay accountable beyond the first release, but we evaluate on a case-by-case basis.',
  },
  {
    question: 'What tooling do you integrate with?',
    answer: 'We adapt to client workflows—whether you use Azure DevOps, Jira, or bespoke tooling—while recommending best practices.',
  },
  {
    question: 'How do you handle security reviews?',
    answer: 'Threat models, secure SDLC checkpoints, and compliance documentation are baked into delivery cadences.',
  },
  {
    question: 'Can you support hybrid or on-prem infrastructure?',
    answer: 'Yes, we design automation and observability that bridge cloud and on-prem environments where required.',
  },
  {
    question: 'What is your response time for support?',
    answer: 'Active engagements have sub-24-hour response targets with clear escalation paths for critical issues.',
  },
  {
    question: 'How do you ensure knowledge transfer?',
    answer: 'Documentation, pairing, and recorded walkthroughs are mandatory so internal teams can operate confidently.',
  },
  {
    question: 'Do you help with hiring or upskilling?',
    answer: 'We co-create capability plans, mentor internal teams, and assist with interviewing when engagements require it.',
  },
  {
    question: 'What does success look like to you?',
    answer: 'Platforms that your team can evolve without us, with reliability scores and delivery cadence improving month over month.',
  },
]

const FAQ_ROW_COUNT = 3
const FAQS_PER_ROW = Math.ceil(faqItems.length / FAQ_ROW_COUNT)
const faqRows = Array.from({ length: FAQ_ROW_COUNT }, (_, index) =>
  faqItems.slice(index * FAQS_PER_ROW, (index + 1) * FAQS_PER_ROW),
).filter((row) => row.length > 0)

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black text-white">
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
            animate={{ backgroundPosition: ['0px 0px', '42px 32px', '0px 0px'] }}
            transition={{
              backgroundPosition: {
                duration: 24,
                ease: 'easeInOut',
                repeat: Infinity,
              },
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
            className="absolute bottom-[-160px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-500/16 blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0),_rgba(0,0,0,0.86) 70%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.span
              variants={pageHeroBadgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white/65"
            >
              About Raven Tech Group
            </motion.span>
            <motion.h1
              variants={pageHeroTitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {'Engineering partners for teams that can\'t afford unreliable platforms.'.split(' ').map((word, index) => (
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
              We embed architecture, engineering, and operations disciplines so African organisations can launch and scale with clarity and accountability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-white text-black">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-18%] h-80 w-80 rounded-full bg-brand-500/15 blur-[160px]" />
          <div className="absolute right-[-20%] bottom-[-10%] h-[420px] w-[520px] rounded-full bg-black/5 blur-[200px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_rgba(255,255,255,0))] opacity-90" />
        </div>
        <div className="relative container mx-auto px-4 pb-24 pt-28 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div variants={fadeInUp} className="space-y-8">
              <span className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-black/60">
                Inside Raven Tech Group
              </span>
              <h2 className="text-4xl font-semibold leading-tight text-black sm:text-5xl lg:text-[3.25rem]">
                We partner with teams that need clarity before they need code.
              </h2>
              <p className="max-w-xl text-base text-black/70 sm:text-lg">
                Raven Tech Group is a Nairobi-based delivery collective built to help organisations modernise platforms, operate reliably, and scale without
                hidden surprises. We combine architecture sprints, embedded squads, and managed operations under one roof.
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {executiveHighlights.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.35)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">{item.label}</p>
                    <p className="mt-3 text-base font-semibold text-black sm:text-lg">{item.value}</p>
                    <p className="mt-3 text-sm text-black/65">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative h-full min-h-[340px] max-h-[440px] overflow-hidden rounded-[34px] border border-black/5 shadow-[0_34px_100px_-52px_rgba(15,23,42,0.4)] lg:self-end">
              <Image
                src="/images/photos/boardroom.jpg"
                alt="Raven Tech Group boardroom"
                fill
                priority
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 460px, 100vw"
                className="object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/32 via-black/18 to-black/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-[#0d0d0f] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-14%] top-[-6%] h-80 w-80 rounded-full bg-brand-500/12 blur-[160px]" />
          <div className="absolute right-[-18%] bottom-[-10%] h-[360px] w-[460px] rounded-full bg-white/8 blur-[160px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">How we operate</span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Strategy, build, and run under one squad</h2>
              <p className="mt-4 text-base text-white/65 sm:text-lg">
                We designed Raven around engagements that demand accountability from discovery through operations. Here’s what that looks like inside.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-14 grid gap-6 lg:grid-cols-3">
              {operatingLanes.map(({ icon: Icon, title, summary, bullets }) => (
                <div
                  key={title}
                  className="group flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.05] p-8 transition duration-200 hover:border-brand-400/50 hover:bg-brand-500/10"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] text-brand-300 transition duration-200 group-hover:bg-white/15 group-hover:text-brand-100">
                    <Icon size={24} />
                  </span>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{summary}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-white/60">
                      {bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-[6px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(15,23,42,0.04) 0, rgba(15,23,42,0.04) 1px, transparent 1px, transparent 56px)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-brand-500/10" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="space-y-12">
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Engagement patterns</span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">Where we add the most value</h2>
              <p className="mt-4 text-base text-black/70 sm:text-lg">
                Instead of long decks, we share this capability board before every engagement so teams know what to expect and when to call us in.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid gap-6 lg:grid-cols-3">
              {capabilityMatrix.map(({ engagement, objectives, squad, signal }) => (
                <div key={engagement} className="flex h-full flex-col gap-5 rounded-3xl border border-black/10 bg-white/90 p-8 shadow-[0_40px_120px_-72px_rgba(15,23,42,0.4)]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Engagement type</p>
                    <h3 className="mt-2 text-lg font-semibold text-black">{engagement}</h3>
                  </div>
                  <div className="space-y-3 text-sm text-black/70">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Objectives</p>
                      <p className="mt-3 leading-relaxed">{objectives}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Squad composition</p>
                      <p className="mt-3 leading-relaxed">{squad}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">When it signals a fit</p>
                      <p className="mt-3 leading-relaxed">{signal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-[#0d0d0f] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.08) 0, transparent 48%)" }} />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }}>
            <motion.div variants={fadeInUp} className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Milestones</span>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A young company with a documented journey</h2>
                <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
                  These moments keep us honest about how far we’ve come and the work ahead. We share them with partners so you know exactly who you’re
                  working with.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-12 overflow-x-auto"
            >
              <div className="flex gap-6 pb-4">
                {timelineMoments.map(({ year, title, caption }) => (
                  <div key={year} className="min-w-[260px] flex-1 rounded-3xl border border-white/10 bg-white/[0.05] p-8">
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-300">{year}</span>
                    <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-3 text-sm text-white/65">{caption}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-18%] top-[-12%] h-[280px] w-[280px] rounded-full bg-black/5 blur-[140px]" />
          <div className="absolute right-[-14%] bottom-[-12%] h-[320px] w-[320px] rounded-full bg-brand-500/12 blur-[160px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div variants={fadeInUp} className="space-y-8">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">From our founder</span>
              <h2 className="text-3xl font-semibold text-black sm:text-4xl">Why Raven was built and how we show up</h2>
              <div className="space-y-4 text-base text-black/70 sm:text-lg">
                {founderProfile.message.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="text-sm text-black/60">{founderProfile.note}</p>
              <ul className="space-y-4 text-sm text-black/70">
                {founderCommitments.map((commitment) => (
                  <li key={commitment} className="flex gap-3">
                    <span className="mt-2 block h-2 w-2 flex-shrink-0 rounded-full bg-brand-500" />
                    <span>{commitment}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <p className="text-base font-semibold text-black">{founderProfile.name}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-black/55">{founderProfile.title}</p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="group relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-[34px] border border-black/10 shadow-[0_32px_110px_-72px_rgba(15,23,42,0.45)] md:mx-auto lg:mt-12 lg:self-end"
            >
              <Image
                src="/images/photos/facecard.jpg"
                alt="Victor Chumo, Founder of Raven Tech Group"
                fill
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 360px, 100vw"
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-[#0d0d0f] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-18%] h-72 w-72 rounded-full bg-white/10 blur-[160px]" />
          <div className="absolute right-[-16%] bottom-[-18%] h-72 w-72 rounded-full bg-brand-500/12 blur-[160px]" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Ecosystem</span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Partners who extend our capability</h2>
              <p className="mt-4 text-base text-white/65 sm:text-lg">
                We stay grounded by working with specialists who understand regulated environments, user experience, and compliance in the regions we serve.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-12 grid gap-6 md:grid-cols-3">
              {ecosystemNodes.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] text-brand-200">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm text-white/70">{description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "radial-gradient(circle at center, rgba(15,23,42,0.05) 0, transparent 60%)" }} />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Standards we keep</span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">Tooling and operating principles</h2>
              <p className="mt-4 text-base text-black/70 sm:text-lg">
                We tailor stacks to each client, but these are the non-negotiables we lean on to keep delivery predictable and secure.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-12 grid gap-6 md:grid-cols-3">
              {toolingStandards.map(({ icon: Icon, title, items }) => (
                <div key={title} className="flex h-full flex-col gap-4 rounded-3xl border border-black/10 bg-white/90 p-8 shadow-[0_36px_110px_-80px_rgba(15,23,42,0.4)]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-brand-500">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-black/70">
                      {items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[6px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/5 bg-[#0d0d0f] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.08) 0, transparent 58%)" }} />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Questions we hear</span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Frequently asked, answered upfront</h2>
            </motion.div>
            <div className="mt-12 space-y-6">
              {faqRows.map((row, rowIndex) => (
                <div key={rowIndex} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] py-4">
                  <motion.div
                    className="flex gap-4"
                    animate={{
                      x: rowIndex % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'],
                    }}
                    transition={{
                      duration: rowIndex % 2 === 0 ? 30 : 34,
                      ease: 'linear',
                      repeat: Infinity,
                    }}
                  >
                    {[...row, ...row].map(({ question, answer }, idx) => (
                      <div
                        key={`${question}-${idx}`}
                        className="min-w-[300px] flex-1 rounded-3xl border border-white/10 bg-white/[0.05] px-6 py-5 backdrop-blur-sm"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{question}</p>
                        <p className="mt-3 text-sm text-white/65">{answer}</p>
                      </div>
                    ))}
                  </motion.div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black via-black/80 to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black via-black/80 to-transparent" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.28]" style={{ backgroundImage: "radial-gradient(circle at center, rgba(15,23,42,0.06) 0, transparent 62%)" }} />
          <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundImage: "linear-gradient(120deg, rgba(255,169,30,0.08) 0%, rgba(255,255,255,0.92) 55%, rgba(13,13,15,0.08) 100%)" }} />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-black/60"
            >
              Ready when you are
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mt-6 text-4xl font-semibold text-black sm:text-5xl">
              Let’s explore whether an embedded Raven squad is the right fit.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-base text-black/70 sm:text-lg">
              Share where your platform or roadmap needs reinforcement and we’ll map out a sprint-by-sprint plan with clear measures of success.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-black transition-colors duration-200 hover:bg-brand-400"
              >
                Start a conversation
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/careers" className="text-sm font-semibold text-black/60 underline-offset-4 transition hover:text-black">
                View careers & collaborations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}



