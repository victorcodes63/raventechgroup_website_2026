'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export type ClientTestimonialEntry = {
  quote: string
  author: string
  role: string
  company: string
  projectContext?: string
  avatar?: string
  avatarAlt?: string
}

function authorInitials(author: string): string {
  return author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

type ClientTestimonialCardProps = {
  entry: ClientTestimonialEntry
  className?: string
}

export function ClientTestimonialCard({ entry, className }: ClientTestimonialCardProps) {
  const initials = authorInitials(entry.author)

  return (
    <div className={twMerge('flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:gap-8', className)}>
      {entry.avatar ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/[0.1] sm:h-16 sm:w-16">
          <Image
            src={entry.avatar}
            alt={entry.avatarAlt ?? `${entry.author}, ${entry.company}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : (
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.06] text-xs font-semibold uppercase tracking-wide text-white/50 sm:h-16 sm:w-16"
          aria-hidden
        >
          {initials || entry.company.slice(0, 2)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <blockquote className="text-pretty text-lg font-medium italic leading-relaxed text-white/90 sm:text-xl md:text-2xl">
          &ldquo;{entry.quote}&rdquo;
        </blockquote>
        <div className="mt-5 border-t border-white/[0.08] pt-5 sm:mt-6 sm:pt-6">
          <p className="font-semibold text-white">{entry.author}</p>
          <p className="text-sm text-white/55">
            {entry.role}
            {entry.role && entry.company ? ' · ' : ''}
            {entry.company}
          </p>
          {entry.projectContext ? (
            <p className="mt-2 text-sm text-white/45">{entry.projectContext}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

type ClientTestimonialCarouselProps = {
  entries: ClientTestimonialEntry[]
  reducedMotion?: boolean | null
  autoplayMs?: number
  className?: string
}

export function ClientTestimonialCarousel({
  entries,
  reducedMotion: reducedMotionProp,
  autoplayMs = 6500,
  className,
}: ClientTestimonialCarouselProps) {
  const reducedMotionHook = useReducedMotion()
  const reducedMotion = reducedMotionProp ?? reducedMotionHook
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = entries.length
  const current = entries[index % n]

  const go = useCallback(
    (next: number, direction: number) => {
      setDir(direction)
      setIndex(((next % n) + n) % n)
    },
    [n],
  )

  useEffect(() => {
    if (n <= 1 || reducedMotion || paused || autoplayMs <= 0) return
    const id = window.setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % n)
    }, autoplayMs)
    return () => window.clearInterval(id)
  }, [autoplayMs, n, paused, reducedMotion])

  if (n === 0) return null

  return (
    <div
      className={twMerge('min-w-0', className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="relative min-w-0">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={current.quote}
            custom={dir}
            initial={
              reducedMotion
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: dir >= 0 ? 20 : -20 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? -20 : 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ClientTestimonialCard entry={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {n > 1 ? (
        <div className="mt-8 flex min-w-0 items-center justify-end border-t border-white/[0.06] pt-6 sm:justify-between">
          <div className="hidden gap-2 sm:flex">
            {entries.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-brand-500' : 'w-2 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1, -1)}
              className="flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.1] bg-white/[0.04] text-white/50 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(index + 1, 1)}
              className="flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.1] bg-white/[0.04] text-white/50 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
