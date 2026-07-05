'use client'

import { createElement, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { pickIndustryIcon } from '@/lib/data/industryIcons'
import {
  serviceIndustryCardVariants,
  serviceSectionHeaderChildVariants,
  serviceSectionHeaderGroupVariants,
} from '@/lib/animations'

const SECTION_VIEWPORT = { once: true, margin: '-80px' as const }

export type ServiceIndustryItem = {
  name: string
  slug?: string
}

type ServiceIndustriesListProps = {
  industries: ServiceIndustryItem[]
  eyebrow?: string
  title?: string
  description?: string
  className?: string
}

function ServiceIndustryRow({
  industry,
  index,
  reducedMotion,
}: {
  industry: ServiceIndustryItem
  index: number
  reducedMotion: boolean | null
}) {
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <motion.li
      variants={serviceIndustryCardVariants}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={SECTION_VIEWPORT}
      transition={{ delay: reducedMotion ? 0 : index * 0.035 }}
      className="group relative list-none"
    >
      <div className="relative overflow-hidden border-b border-white/[0.06] px-1 py-5 transition-colors duration-300 group-hover:bg-[#111111] sm:px-3 sm:py-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 select-none font-bold tabular-nums tracking-[-0.04em] text-white/[0.035] text-[4.5rem] leading-none sm:text-[5.5rem]"
        >
          {indexLabel}
        </span>

        <div className="relative flex items-center gap-4 sm:gap-5">
          <span className="w-7 shrink-0 font-mono text-[11px] font-semibold tabular-nums tracking-wide text-[#FFA91F]/70 sm:w-8">
            {indexLabel}
          </span>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-[#FFA91F]/[0.07] ring-1 ring-[#FFA91F]/15 transition duration-300 group-hover:bg-[#FFA91F]/15 group-hover:ring-[#FFA91F]/40">
            {createElement(pickIndustryIcon(industry.slug, industry.name), {
              className: 'h-5 w-5 text-[#FFA91F]',
              weight: 'duotone',
              'aria-hidden': true,
            })}
          </div>

          <p className="min-w-0 flex-1 text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#FFA91F] sm:text-lg">
            {industry.name}
          </p>

          <ArrowRight
            size={16}
            strokeWidth={2}
            aria-hidden
            className="shrink-0 text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FFA91F]"
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-0 bg-[#FFA91F] transition-all duration-300 group-hover:w-0.5"
        />
      </div>
    </motion.li>
  )
}

function splitIndustries(items: ServiceIndustryItem[]) {
  const midpoint = Math.ceil(items.length / 2)
  return [items.slice(0, midpoint), items.slice(midpoint)] as const
}

export function ServiceIndustriesList({
  industries,
  eyebrow = '06 / Industries',
  title = 'Sectors we operate in',
  description = 'Where we have delivery context — regulation, integrations, and operating models that generic shops miss.',
  className = '',
}: ServiceIndustriesListProps) {
  const reducedMotion = useReducedMotion()
  const [leftColumn, rightColumn] = useMemo(
    () => splitIndustries(industries),
    [industries],
  )

  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <motion.div
        className="max-w-3xl"
        initial={reducedMotion ? false : 'hidden'}
        whileInView={reducedMotion ? undefined : 'visible'}
        viewport={SECTION_VIEWPORT}
        variants={serviceSectionHeaderGroupVariants}
      >
        <motion.div
          variants={serviceSectionHeaderChildVariants}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-brand-500" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">
            {eyebrow}
          </p>
        </motion.div>
        <motion.h2
          variants={serviceSectionHeaderChildVariants}
          className="text-[1.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-3xl md:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h2>
        {description ? (
          <motion.p
            variants={serviceSectionHeaderChildVariants}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
        <motion.p
          variants={serviceSectionHeaderChildVariants}
          className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
        >
          {industries.length} sectors · indexed by delivery depth
        </motion.p>
      </motion.div>

      <div className="mt-12 min-w-0 border-t border-white/[0.08] sm:mt-14 lg:mt-16">
        <div className="grid min-w-0 gap-0 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-16">
          <ul className="min-w-0" aria-label="Industry sectors">
            {leftColumn.map((industry, index) => (
              <ServiceIndustryRow
                key={industry.name}
                industry={industry}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </ul>

          {rightColumn.length > 0 ? (
            <ul className="min-w-0 lg:border-l lg:border-white/[0.06] lg:pl-10 xl:pl-16" aria-label="Industry sectors continued">
              {rightColumn.map((industry, index) => (
                <ServiceIndustryRow
                  key={industry.name}
                  industry={industry}
                  index={leftColumn.length + index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}
