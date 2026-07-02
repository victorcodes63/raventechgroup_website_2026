'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, Lightbulb, ArrowUpRight } from 'lucide-react'

const highlights = [
  {
    label: 'Engineering',
    title: 'App development',
    description:
      'Bring your most complex software vision to life with innovation and scalability in mind',
    href: '/services/software-development',
    icon: Code2,
    services: [
      { label: 'Software development', href: '/services/software-development' },
      { label: 'Cloud solutions', href: '/services/cloud-solutions' },
      { label: 'System integration', href: '/services/system-integration' },
      { label: 'Cybersecurity', href: '/services/cybersecurity' },
    ],
  },
  {
    label: 'Advisory',
    title: 'Product and service design',
    description:
      'Get strategic guidance on creating best-in-class domain-specific technology solutions',
    href: '/services/it-consulting',
    icon: Lightbulb,
    services: [
      { label: 'IT consulting', href: '/services/it-consulting' },
      { label: 'Digital transformation', href: '/services/digital-transformation' },
      { label: 'Architecture reviews', href: '/services/it-consulting' },
      { label: 'Delivery coaching', href: '/services/it-consulting' },
    ],
  },
]

export function ServiceHighlights() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="site-shell">
        <div className="grid gap-[5px] md:grid-cols-2">
          {highlights.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-sm bg-[#f5f5f5] p-7 transition-colors duration-300 hover:bg-[#ebebeb] sm:min-h-[320px] sm:p-10"
                >
                  <div>
                    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-black/40">
                      <Icon size={16} strokeWidth={1.5} />
                      {item.label}
                    </div>
                    <h3 className="mt-5 text-xl font-bold tracking-tight text-black sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-black/55">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {item.services.map((s) => (
                        <span
                          key={s.label}
                          className="rounded-sm border border-black/8 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-black/55"
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-black/10 text-black/30 transition-all duration-300 group-hover:border-black/25 group-hover:text-black/60 group-hover:bg-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
