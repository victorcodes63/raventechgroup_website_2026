'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { getLiveProducts } from '@/lib/data/products'

const liveProducts = getLiveProducts()

export function ProductsIndexContent() {
  const reduced = useReducedMotion()
  const instant = reduced ? { opacity: 1, y: 0 } : undefined

  return (
    <main className="bg-[#0A0A0A] pt-[72px]">
      <section className="py-24 lg:py-32">
        <div className="site-shell">
          <div className="content-wrap">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={instant ?? { opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <SectionEyebrow>Products</SectionEyebrow>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
                Software we build and operate
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
                Raven ships products alongside client work — platforms we run, improve, and deploy for organisations
                across East Africa.
              </p>
            </motion.div>

            <ScrollReveal className="mt-16">
              <ul className="grid gap-6 md:grid-cols-2">
                {liveProducts.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={product.bridgeHref}
                      className="group flex h-full flex-col rounded-card border border-white/[0.08] bg-[#111111] p-8 transition-all duration-300 hover:border-brand-500/40 hover:bg-[#161616]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                            {product.status === 'live' ? 'Live' : 'Coming soon'}
                          </p>
                          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">{product.name}</h2>
                        </div>
                        <ArrowUpRight
                          size={20}
                          className="shrink-0 text-white/30 transition-all group-hover:text-brand-400"
                          aria-hidden
                        />
                      </div>
                      <p className="mt-4 flex-1 text-base leading-relaxed text-white/60">{product.description}</p>
                      <p className="mt-6 text-sm font-semibold text-brand-400">{product.tagline}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <p className="mt-12 text-sm text-white/40">
              Need custom software instead?{' '}
              <Link href="/services" className="text-white/60 underline-offset-4 hover:text-brand-400">
                View our services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
