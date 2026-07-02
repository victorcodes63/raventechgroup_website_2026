'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ClipboardCheck,
  Compass,
  Globe2,
  Handshake,
  Layers,
  MapPin,
  ServerCog,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

import { AboutFaqRow } from '@/components/about/AboutFaqRow'
import { AboutLeadBand } from '@/components/about/AboutLeadBand'
import { AboutSectionHeader } from '@/components/about/AboutSectionHeader'
import { CTAButton } from '@/components/ui/CTAButton'
import {
  serviceCapabilityStaggerChildVariants,
  serviceCapabilityStaggerParentVariants,
} from '@/lib/animations'
import {
  ABOUT_PAGE_CONTACT_PREFILL,
  aboutClosingCta,
  aboutEngagementSection,
  aboutEcosystemSection,
  aboutFaqItems,
  aboutFaqSection,
  aboutFounderSection,
  aboutHero,
  aboutIntro,
  aboutMilestonesSection,
  aboutOperateSection,
  aboutToolingSection,
  capabilityMatrix,
  ecosystemNodes,
  executiveHighlights,
  founderCommitments,
  founderProfile,
  operatingLanes,
  timelineMoments,
  toolingStandards,
  type AboutIconKey,
} from '@/lib/data/aboutPage'

const SECTION_VIEWPORT = { once: true, margin: '-80px' as const }

const ABOUT_ICONS: Record<AboutIconKey, LucideIcon> = {
  compass: Compass,
  layers: Layers,
  shieldCheck: ShieldCheck,
  mapPin: MapPin,
  handshake: Handshake,
  globe: Globe2,
  serverCog: ServerCog,
  clipboardCheck: ClipboardCheck,
  sparkles: Sparkles,
}

function AboutHero({ reducedMotion }: { reducedMotion: boolean | null }) {
  const contactHref = `/contact?prefillMessage=${encodeURIComponent(ABOUT_PAGE_CONTACT_PREFILL)}`

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0A0A0A] pb-20 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(26,26,30,0.55),rgba(10,10,10,0.95))]"
        />
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.15 }}
          className="absolute bottom-[-160px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#FFA91F]/14 blur-[160px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.88)_72%)]" />
      </div>

      <div className="relative z-10 site-shell">
        <div className="content-wrap">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 shrink-0 bg-brand-500" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">{aboutHero.eyebrow}</span>
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
              {aboutHero.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">{aboutHero.subline}</p>
            <div className="mt-10 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <CTAButton href={contactHref} className="justify-center px-8 py-3.5 text-sm">
                Discuss a project
              </CTAButton>
              <CTAButton href="/book" variant="outline" className="justify-center px-8 py-3.5 text-sm">
                Book a call
              </CTAButton>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold">
              <Link
                href="/case-studies"
                className="text-white/55 underline-offset-4 transition-colors hover:text-[#FFA91F]"
              >
                Client work
              </Link>
              <Link href="/insights" className="text-white/55 underline-offset-4 transition-colors hover:text-[#FFA91F]">
                Field notes
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function AboutPageContent() {
  const reducedMotion = useReducedMotion()
  const [founderSignatureFailed, setFounderSignatureFailed] = useState(false)
  const contactHref = `/contact?prefillMessage=${encodeURIComponent(ABOUT_PAGE_CONTACT_PREFILL)}`

  return (
    <main className="min-w-0 bg-[#0A0A0A] text-white">
      <AboutHero reducedMotion={reducedMotion} />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section
        id="about-intro"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
              <div>
                <AboutSectionHeader
                  eyebrow={`01 / ${aboutIntro.eyebrow}`}
                  title={aboutIntro.headline}
                  description={aboutIntro.body}
                  reducedMotion={reducedMotion}
                  className="mb-10 max-w-3xl"
                />
                <motion.div
                  className="grid gap-4 sm:grid-cols-3"
                  initial={reducedMotion ? false : 'hidden'}
                  whileInView={reducedMotion ? undefined : 'visible'}
                  viewport={SECTION_VIEWPORT}
                  variants={serviceCapabilityStaggerParentVariants}
                >
                  {executiveHighlights.map((item) => (
                    <motion.article
                      key={item.label}
                      variants={serviceCapabilityStaggerChildVariants}
                      className="group flex h-full flex-col rounded-card border border-white/[0.08] bg-[#111111] p-6 transition-all duration-300 hover:scale-[1.01] hover:border-brand-500/40 hover:bg-[#161616]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/45">{item.label}</p>
                      <p className="mt-3 text-base font-semibold text-white sm:text-lg">{item.value}</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">{item.description}</p>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
              <div className="relative mx-auto aspect-[4/3] h-[min(380px,65vw)] w-full max-w-lg overflow-hidden rounded-card border border-white/[0.08] lg:mx-0 lg:h-[420px] lg:max-w-none">
                <Image
                  src={aboutIntro.imageSrc}
                  alt={aboutIntro.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/35 via-black/10 to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section
        id="about-operate"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <AboutSectionHeader
              eyebrow={`02 / ${aboutOperateSection.eyebrow}`}
              title="Strategy, build, and run"
              titleMuted="under one accountable team"
              description={aboutOperateSection.body}
              reducedMotion={reducedMotion}
              className="mb-14 max-w-3xl"
            />
            <motion.div
              className="grid gap-6 lg:grid-cols-3 lg:gap-8"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={SECTION_VIEWPORT}
              variants={serviceCapabilityStaggerParentVariants}
            >
              {operatingLanes.map(({ icon, title, summary, bullets }) => {
                const Icon = ABOUT_ICONS[icon]
                return (
                  <motion.article
                    key={title}
                    variants={serviceCapabilityStaggerChildVariants}
                    className="group flex h-full flex-col gap-5 rounded-card border border-white/[0.08] bg-[#111111] p-8 transition-all duration-300 hover:scale-[1.01] hover:border-brand-500/40 hover:bg-[#161616] lg:p-9"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/[0.08]">
                      <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} aria-hidden />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
                      <p className="text-sm leading-relaxed text-white/60">{summary}</p>
                      <ul className="space-y-2 text-sm text-white/55">
                        {bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section
        id="about-engagements"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <AboutSectionHeader
              eyebrow={`03 / ${aboutEngagementSection.eyebrow}`}
              title={aboutEngagementSection.headline}
              description={aboutEngagementSection.body}
              reducedMotion={reducedMotion}
              className="mb-14 max-w-3xl"
            />
            <motion.div
              className="grid gap-6 lg:grid-cols-3 lg:gap-8"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={SECTION_VIEWPORT}
              variants={serviceCapabilityStaggerParentVariants}
            >
              {capabilityMatrix.map(({ engagement, objectives, teamRoles, signal }) => (
                <motion.article
                  key={engagement}
                  variants={serviceCapabilityStaggerChildVariants}
                  className="flex h-full flex-col gap-5 rounded-card border border-white/[0.08] bg-[#111111] p-8 transition-all duration-300 hover:scale-[1.01] hover:border-brand-500/40 hover:bg-[#161616] lg:p-9"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/45">Engagement type</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{engagement}</h3>
                  </div>
                  <div className="space-y-3 text-sm text-white/65">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/45">Objectives</p>
                      <p className="mt-2 leading-relaxed">{objectives}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/45">Team roles</p>
                      <p className="mt-2 leading-relaxed">{teamRoles}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/45">When it signals a fit</p>
                      <p className="mt-2 leading-relaxed">{signal}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section
        id="about-milestones"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <AboutSectionHeader
              eyebrow={`04 / ${aboutMilestonesSection.eyebrow}`}
              title="A young company"
              titleMuted="with a documented journey"
              description={aboutMilestonesSection.body}
              reducedMotion={reducedMotion}
              className="mb-14 max-w-3xl"
            />
            <motion.div
              className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={SECTION_VIEWPORT}
              variants={serviceCapabilityStaggerParentVariants}
            >
              {timelineMoments.map(({ year, title, caption }) => (
                <motion.article
                  key={year}
                  variants={serviceCapabilityStaggerChildVariants}
                  className="min-w-[260px] flex-1 rounded-card border border-white/[0.08] bg-[#111111] p-8 transition-all duration-300 hover:border-brand-500/35 md:min-w-0"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">{year}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{caption}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section
        id="about-founder"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
              <div>
                <AboutSectionHeader
                  eyebrow={`05 / ${aboutFounderSection.eyebrow}`}
                  title={aboutFounderSection.headline}
                  reducedMotion={reducedMotion}
                  className="mb-10 max-w-3xl"
                />
                <div className="space-y-4 text-lg leading-relaxed text-white/65">
                  {founderProfile.message.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-6 text-sm text-white/45">{founderProfile.note}</p>
                <ul className="mt-8 space-y-3 text-sm text-white/60">
                  {founderCommitments.map((commitment) => (
                    <li key={commitment} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                      <span>{commitment}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-8">
                  <p className="text-base font-semibold text-white">{founderProfile.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    {founderProfile.title}
                  </p>
                  {founderProfile.signatureImageSrc && !founderSignatureFailed ? (
                    <div className="relative mt-5 h-[52px] w-[min(240px,100%)]">
                      <Image
                        src={founderProfile.signatureImageSrc}
                        alt={founderProfile.signatureAlt}
                        fill
                        className="object-contain object-left"
                        sizes="240px"
                        onError={() => setFounderSignatureFailed(true)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] lg:mx-0 lg:max-w-none lg:sticky lg:top-28">
                <Image
                  src={founderProfile.imageSrc}
                  alt={founderProfile.imageAlt}
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(min-width: 1024px) 400px, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section
        id="about-ecosystem"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <AboutSectionHeader
              eyebrow={`06 / ${aboutEcosystemSection.eyebrow}`}
              title="Partners who extend"
              titleMuted="our capability"
              description={aboutEcosystemSection.body}
              reducedMotion={reducedMotion}
              className="mb-14 max-w-3xl"
            />
            <motion.div
              className="grid gap-6 md:grid-cols-3 md:gap-8"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={SECTION_VIEWPORT}
              variants={serviceCapabilityStaggerParentVariants}
            >
              {ecosystemNodes.map(({ icon, title, description }) => {
                const Icon = ABOUT_ICONS[icon]
                return (
                  <motion.article
                    key={title}
                    variants={serviceCapabilityStaggerChildVariants}
                    className="group flex h-full flex-col gap-4 rounded-card border border-white/[0.08] bg-[#111111] p-8 transition-all duration-300 hover:scale-[1.01] hover:border-brand-500/40 hover:bg-[#161616] lg:p-9"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/[0.08]">
                      <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section
        id="about-tooling"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <AboutSectionHeader
              eyebrow={`07 / ${aboutToolingSection.eyebrow}`}
              title={aboutToolingSection.headline}
              description={aboutToolingSection.body}
              reducedMotion={reducedMotion}
              className="mb-14 max-w-3xl"
            />
            <motion.div
              className="grid gap-6 md:grid-cols-3 md:gap-8"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={SECTION_VIEWPORT}
              variants={serviceCapabilityStaggerParentVariants}
            >
              {toolingStandards.map(({ icon, title, items }) => {
                const Icon = ABOUT_ICONS[icon]
                return (
                  <motion.article
                    key={title}
                    variants={serviceCapabilityStaggerChildVariants}
                    className="flex h-full flex-col gap-4 rounded-card border border-white/[0.08] bg-[#111111] p-8 transition-all duration-300 hover:scale-[1.01] hover:border-brand-500/40 hover:bg-[#161616] lg:p-9"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/[0.08]">
                      <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <ul className="mt-3 space-y-2 text-sm text-white/55">
                        {items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden />

      <section id="about-faq" className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32">
        <div className="site-shell">
          <div className="content-wrap">
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                  {`08 / ${aboutFaqSection.eyebrow}`}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">{aboutFaqSection.headline}</h2>
                <p className="mt-4 text-white/55">
                  Prefer a conversation? We respond within one business day.
                </p>
                <CTAButton href={contactHref} variant="outline-dark" className="mt-8">
                  Contact
                </CTAButton>
              </div>
              <div>
                {aboutFaqItems.map((faq, i) => (
                  <AboutFaqRow
                    key={faq.question}
                    faq={faq}
                    reducedMotion={reducedMotion}
                    isLast={i === aboutFaqItems.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutLeadBand />

      <section
        id="about-next-step"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      >
        <div className="site-shell">
          <div className="content-wrap">
            <AboutSectionHeader
              eyebrow={`09 / ${aboutClosingCta.eyebrow}`}
              title={aboutClosingCta.headline}
              description={aboutClosingCta.body}
              reducedMotion={reducedMotion}
              className="mb-10 max-w-3xl"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <CTAButton href={aboutClosingCta.primaryHref} variant="primary" className="px-8 py-3.5 text-base">
                {aboutClosingCta.primaryLabel}
              </CTAButton>
              <Link
                href={aboutClosingCta.secondaryHref}
                className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold text-white/60 underline-offset-4 transition-colors hover:text-brand-500"
              >
                {aboutClosingCta.secondaryLabel}
              </Link>
              <Link
                href={aboutClosingCta.tertiaryHref}
                className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold text-white/60 underline-offset-4 transition-colors hover:text-brand-500"
              >
                {aboutClosingCta.tertiaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
