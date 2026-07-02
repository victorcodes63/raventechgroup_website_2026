'use client'

import { Fragment, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

export function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean)
}

type ScrollRevealWordProps = {
  scrollYProgress: MotionValue<number>
  rangeStart: number
  rangeEnd: number
  index: number
  count: number
  reduced: boolean
  children: string
  className?: string
}

/** One word: opacity + slight y, driven by scroll progress through [rangeStart, rangeEnd]. */
export function ScrollRevealWord({
  scrollYProgress,
  rangeStart,
  rangeEnd,
  index,
  count,
  reduced,
  children,
  className,
}: ScrollRevealWordProps) {
  const n = Math.max(count, 1)
  const span = rangeEnd - rangeStart
  const wStart = rangeStart + (index / n) * span
  const wEnd = rangeStart + ((index + 1) / n) * span

  const opacity = useTransform(scrollYProgress, [wStart, wEnd], reduced ? [1, 1] : [0, 1], { clamp: true })
  const y = useTransform(scrollYProgress, [wStart, wEnd], reduced ? [0, 0] : [6, 0], { clamp: true })

  return (
    <motion.span style={{ opacity, y }} className={className ? `inline-block ${className}` : 'inline-block'}>
      {children}
    </motion.span>
  )
}

type ScrollRevealWordsProps = {
  scrollYProgress: MotionValue<number>
  range: readonly [number, number]
  reduced: boolean
  text: string
  as?: 'p' | 'div'
  className?: string
}

/** Single block of copy: word-by-word reveal on scroll. */
export function ScrollRevealWords({
  scrollYProgress,
  range,
  reduced,
  text,
  as: Tag = 'p',
  className,
}: ScrollRevealWordsProps) {
  const words = splitWords(text)
  const [rangeStart, rangeEnd] = range

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <ScrollRevealWord
            scrollYProgress={scrollYProgress}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            index={i}
            count={words.length}
            reduced={reduced}
          >
            {word}
          </ScrollRevealWord>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

type ScrollRevealWordLinesProps = {
  scrollYProgress: MotionValue<number>
  range: readonly [number, number]
  reduced: boolean
  lines: readonly string[]
  as?: 'p' | 'div'
  className?: string
  lineClassName?: string
}

/** Multiple hard line breaks: each line is a row of words; words reveal in order across all lines. */
export function ScrollRevealWordLines({
  scrollYProgress,
  range,
  reduced,
  lines,
  as: Tag = 'p',
  className,
  lineClassName,
}: ScrollRevealWordLinesProps) {
  const total = lines.reduce((n, line) => n + splitWords(line).length, 0)
  const [rangeStart, rangeEnd] = range
  let globalIndex = 0

  return (
    <Tag className={className}>
      {lines.map((line, lineIdx) => {
        const lineWords = splitWords(line)
        const nodes = lineWords.map((word, wi) => {
          const i = globalIndex++
          return (
            <Fragment key={`${lineIdx}-${wi}-${word}`}>
              <ScrollRevealWord
                scrollYProgress={scrollYProgress}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                index={i}
                count={total}
                reduced={reduced}
              >
                {word}
              </ScrollRevealWord>
              {wi < lineWords.length - 1 ? ' ' : null}
            </Fragment>
          )
        })
        return (
          <span key={lineIdx} className={lineClassName ?? 'block'}>
            {nodes}
          </span>
        )
      })}
    </Tag>
  )
}

export function useSectionScrollProgress(sectionRef: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  return { scrollYProgress, isReduced: reduced ?? false }
}
