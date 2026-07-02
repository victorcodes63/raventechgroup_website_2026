'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { CTAButton } from '@/components/ui/CTAButton'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { strideProduct as product } from '@/lib/data/products'

const ease = [0.21, 0.47, 0.32, 0.98] as const

export function StrideProductContent() {
  const reduced = useReducedMotion()
  const instant = reduced ? { opacity: 1, y: 0 } : undefined

  return (
    <main className="bg-[#0A0A0A] pt-[72px]">
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-16 lg:pb-32 lg:pt-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,169,31,0.12),transparent)]"
          aria-hidden
        />
        <div className="site-shell relative">
          <div className="content-wrap">
            <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={instant ?? { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <SectionEyebrow>{product.heroEyebrow}</SectionEyebrow>
                </motion.div>

                <motion.h1
                  className="mt-6 max-w-3xl text-[clamp(2.25rem,5.2vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={instant ?? { opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: reduced ? 0 : 0.08, ease }}
                >
                  {product.heroHeadline}
                </motion.h1>

                <motion.p
                  className="mt-6 max-w-xl text-base leading-[1.75] text-white/70 md:text-lg"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={instant ?? { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: reduced ? 0 : 0.18, ease }}
                >
                  {product.heroSubline}
                </motion.p>

                <motion.div
                  className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={instant ?? { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: reduced ? 0 : 0.28, ease }}
                >
                  <CTAButton href={product.demoUrl} className="px-7 py-3.5 text-sm">
                    Book a demo
                  </CTAButton>
                  <CTAButton href={product.appUrl} variant="outline" className="px-7 py-3.5 text-sm">
                    Sign in
                  </CTAButton>
                  <CTAButton href={product.marketingUrl} variant="light-outline" className="px-7 py-3.5 text-sm">
                    Explore Stride
                  </CTAButton>
                </motion.div>

                <p className="mt-6 text-xs text-white/40">
                  Built and operated by{' '}
                  <Link href="/about" className="text-white/55 underline-offset-4 hover:text-brand-400">
                    Raven Tech Group
                  </Link>
                  {' · '}
                  <span className="text-white/50">{product.marketingUrl.replace('https://', '')}</span>
                </p>
              </div>

              <motion.aside
                className="lg:col-span-5"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={instant ?? { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.2, ease }}
              >
                <div className="overflow-hidden rounded-card border border-white/[0.08] bg-[#111111]">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/images/products/stride-preview.jpg"
                      alt="Stride homepage and platform dashboard preview"
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 480px, 100vw"
                      priority
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="border-t border-white/[0.06] p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                      app.getstride.co.ke
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      One employee record, one approval chain, one ledger — hire to pay without re-keying data.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <ScrollReveal>
        <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32">
          <div className="site-shell">
            <div className="content-wrap max-w-3xl">
              <SectionEyebrow>The problem</SectionEyebrow>
              <h2 className="mt-6 text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
                {product.problemHeadline}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">{product.problemBody}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Modules */}
      <ScrollReveal>
        <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32">
          <div className="site-shell">
            <div className="content-wrap">
              <SectionEyebrow>Platform</SectionEyebrow>
              <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
                Modules that share one data layer
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-white/60">
                Full module detail, pricing, and industry packs live on{' '}
                <a
                  href={product.marketingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 underline-offset-4 hover:underline"
                >
                  getstride.co.ke
                </a>
                . This is the overview.
              </p>

              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mt-16 grid gap-6 md:grid-cols-2"
              >
                {product.modules.map((mod) => (
                  <motion.li
                    key={mod.title}
                    variants={fadeInUp}
                    className="rounded-card border border-white/[0.08] bg-[#111111] p-8 transition-colors duration-300 hover:border-brand-500/40 hover:bg-[#161616]"
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-white">{mod.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/60">{mod.description}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Industries */}
      <ScrollReveal>
        <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32">
          <div className="site-shell">
            <div className="content-wrap">
              <SectionEyebrow>Industries</SectionEyebrow>
              <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
                Vertical packs on the same core
              </h2>

              <ul className="mt-16 grid gap-6 md:grid-cols-2">
                {product.industries.map((industry) => (
                  <li
                    key={industry.title}
                    className="flex gap-4 rounded-card border border-white/[0.08] bg-[#111111] p-6"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{industry.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{industry.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Proof */}
      <ScrollReveal>
        <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32">
          <div className="site-shell">
            <div className="content-wrap">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <SectionEyebrow>Proof</SectionEyebrow>
                  <h2 className="mt-6 text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
                    From custom build to product
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-white/60">
                    Stride grew out of deployments like{' '}
                    {product.caseStudySlug ? (
                      <Link
                        href={`/case-studies/${product.caseStudySlug}`}
                        className="text-white/80 underline-offset-4 hover:text-brand-400"
                      >
                        {product.caseStudyLabel}
                      </Link>
                    ) : (
                      product.caseStudyLabel
                    )}
                    — where Raven built the operating system an HR firm runs on every day. That architecture is now
                    the platform we ship to every Stride customer.
                  </p>
                  {product.caseStudySlug ? (
                    <Link
                      href={`/case-studies/${product.caseStudySlug}`}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-all hover:gap-3"
                    >
                      Read the case study
                      <ArrowUpRight size={15} aria-hidden />
                    </Link>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {product.proofPoints.map((point) => (
                    <div
                      key={point.label}
                      className="rounded-card border border-white/[0.08] bg-[#111111] p-5 text-center"
                    >
                      <p className="text-2xl font-bold tracking-tight text-white md:text-3xl">{point.value}</p>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                        {point.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32">
          <div className="site-shell">
            <div className="content-wrap">
              <div className="rounded-card border border-white/[0.08] bg-[#111111] p-10 md:p-14">
                <SectionEyebrow>Get started</SectionEyebrow>
                <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
                  Ready to hit your stride?
                </h2>
                <p className="mt-4 max-w-lg text-lg text-white/60">
                  Book a demo on the Stride site, or sign in if your organisation is already live. Raven handles
                  enterprise rollouts and custom integrations through our consulting team.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CTAButton href={product.demoUrl} className="px-7 py-3.5">
                    Book a demo
                  </CTAButton>
                  <CTAButton href={product.appUrl} variant="outline" className="px-7 py-3.5">
                    Sign in to Stride
                  </CTAButton>
                  <CTAButton href="/contact" variant="light-outline" className="px-7 py-3.5">
                    Enterprise enquiry
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
