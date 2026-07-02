'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { Linkedin, Twitter } from 'lucide-react'

import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { FooterGlowOutro } from '@/components/layout/FooterGlowOutro'
import { CTAButton } from '@/components/ui/CTAButton'
import { services } from '@/lib/data/services'
import { getLiveProducts } from '@/lib/data/products'
const FOOTER_SERVICE_SLUGS = [
  'software-development',
  'cloud-solutions',
  'cybersecurity',
  'digital-transformation',
  'it-consulting',
  'system-integration',
] as const

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Insights', href: '/insights' },
  { name: 'Careers', href: '/careers' },
] as const

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
] as const

const navLinkClass =
  'block text-sm text-white/65 transition-colors duration-150 hover:text-white touch-manipulation'

const VIEWPORT_EDGE = '-60px 0px' as const

function NavColumn({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">{label}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  const footerServices = FOOTER_SERVICE_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    (s): s is (typeof services)[number] => s != null,
  )
  const footerProducts = getLiveProducts()

  return (
    <footer className="relative overflow-x-clip bg-[#0A0A0A]">
      {/* Zone 1 — Amber CTA */}
      <ScrollReveal
        y={30}
        duration={0.8}
        viewportMargin={VIEWPORT_EDGE}
        className="relative overflow-hidden bg-[#FFA91F]"
      >
        <div
          className="pointer-events-none absolute right-[-20px] top-[-40px] translate-x-[10%] -translate-y-[10%] -rotate-[2deg] select-none font-black leading-[0.8] tracking-[-0.08em] text-[#0A0A0A]/[0.07] text-[clamp(160px,20vw,280px)]"
          aria-hidden
        >
          RAVEN
        </div>
        <div className="site-shell relative py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]/70">
                Ready when you are
              </p>
              <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] lg:text-6xl">
                Let&apos;s build something your business actually runs on.
              </h2>
            </div>
            <div className="shrink-0 lg:text-right">
              <CTAButton
                href="/book"
                variant="dark"
                className="px-7 py-4 text-base font-semibold shadow-none"
              >
                Book a discovery call
              </CTAButton>
              <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#0A0A0A]/80 lg:ml-auto">
                <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Replies within 1 business day</span>
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div
        className="h-[2px] bg-gradient-to-r from-transparent via-[#FFA91F]/40 to-transparent"
        aria-hidden
      />

      {/* Zone 2 — Footer content */}
      <ScrollReveal
        y={24}
        duration={0.7}
        delay={0.1}
        viewportMargin={VIEWPORT_EDGE}
        className="border-t border-white/[0.06] bg-[#0A0A0A]"
      >
        <div className="site-shell py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA91F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                <Image
                  src="/images/logos/raven_logo.png"
                  alt="Raven Tech Group"
                  width={694}
                  height={253}
                  className="h-10 w-auto max-w-[min(100%,18rem)] object-contain object-left"
                  priority
                />
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
                Technology consultancy helping Kenyan and African businesses build the systems their ambition requires.
                We also build and operate our own products — starting with{' '}
                <Link href="/products/stride" className="text-white/70 transition-colors hover:text-white">
                  Stride
                </Link>
                .
              </p>
              <div className="mt-8">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  Follow us
                </p>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/company/raven-tech-group"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-11 w-11 items-center justify-center rounded-card border border-white/[0.1] text-white/50 transition-all duration-200 hover:border-[#FFA91F]/40 hover:bg-[#FFA91F]/[0.03] hover:text-[#FFA91F] touch-manipulation"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://x.com/raventechgroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-11 w-11 items-center justify-center rounded-card border border-white/[0.1] text-white/50 transition-all duration-200 hover:border-[#FFA91F]/40 hover:bg-[#FFA91F]/[0.03] hover:text-[#FFA91F] touch-manipulation"
                    aria-label="Twitter/X"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  Get in touch
                </p>
                <a
                  href="mailto:hello@raventechgroup.com"
                  className="block text-sm text-white/75 transition-colors hover:text-white"
                >
                  hello@raventechgroup.com
                </a>
                <a
                  href="tel:+254796349079"
                  className="mt-1 block text-sm text-white/75 transition-colors hover:text-white"
                >
                  +254 796 349 079
                </a>
                <p className="mt-3 text-xs text-white/40">Westlands, Nairobi, Kenya</p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <NavColumn label="Services">
                  {footerServices.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className={navLinkClass}>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/process" className={navLinkClass}>
                      Process
                    </Link>
                  </li>
                </NavColumn>
                <NavColumn label="Products">
                  <li>
                    <Link href="/products" className={navLinkClass}>
                      All products
                    </Link>
                  </li>
                  {footerProducts.map((product) => (
                    <li key={product.slug}>
                      <Link href={product.bridgeHref} className={navLinkClass}>
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </NavColumn>
                <NavColumn label="Company">
                  {companyLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={navLinkClass}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </NavColumn>
                <NavColumn label="Legal">
                  {legalLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={navLinkClass}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </NavColumn>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Zone 3 — Interactive amber aurora outro + copyright */}
      <FooterGlowOutro year={year} />
    </footer>
  )
}
