'use client'

import { useEffect, useMemo, type RefObject } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from 'framer-motion'

type LetterFillRevealProps = {
  text: string
  className?: string
  as?: 'h2' | 'h3' | 'p' | 'span'
  /**
   * 'scroll' (default): fill driven by scrollTrackRef progress.
   * 'entrance': fill plays once on mount — for hero H1s visible at scroll 0.
   */
  mode?: 'scroll' | 'entrance'
  /** Entrance mode only */
  entranceDuration?: number
  entranceDelay?: number
  scrollTrackRef?: RefObject<HTMLElement | null>
  scrollOffset?: UseScrollOptions['offset']
  /** Maps a slice of the track’s scroll progress to this line’s reveal */
  progressRange?: readonly [number, number]
  /**
   * How wide each word’s dim→bright ramp is on the line’s internal 0→1 timeline.
   * ~1.15 = crisp word-by-word; higher = softer overlap between consecutive words.
   */
  wordRampWidth?: number
  /** @deprecated Use `wordRampWidth` */
  letterRampWidth?: number
  lead?: number
  tail?: number
  dimColor?: string
  fillColor?: string
}

const motionTags = {
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const

function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter((w) => w.length > 0)
}

function ScrollDrivenWord({
  word,
  wordIndex,
  wordCount,
  driveProgress,
  dimColor,
  fillColor,
  wordRampWidth,
  lead,
  tail,
  gapClassName,
}: {
  word: string
  wordIndex: number
  wordCount: number
  driveProgress: MotionValue<number>
  dimColor: string
  fillColor: string
  wordRampWidth: number
  lead: number
  tail: number
  gapClassName: string
}) {
  const usable = 1 - lead - tail
  const denom = Math.max(wordCount, 1)
  const baseW = usable / denom
  const start = lead + (wordIndex / denom) * usable * 0.9
  const end = Math.max(start + 0.02, Math.min(1 - tail, start + baseW * wordRampWidth))
  const color = useTransform(driveProgress, [start, end], [dimColor, fillColor])

  return (
    <motion.span
      className={`inline-block whitespace-nowrap ${gapClassName}`}
      style={{ color, WebkitTextFillColor: color }}
    >
      {word}
    </motion.span>
  )
}

export function LetterFillReveal({
  text,
  className,
  as = 'span',
  mode = 'scroll',
  entranceDuration = 1.4,
  entranceDelay = 0.15,
  scrollTrackRef,
  scrollOffset = ['start end', 'end start'],
  progressRange = [0, 1] as const,
  wordRampWidth: wordRampWidthProp,
  letterRampWidth,
  lead = 0.06,
  tail = 0.1,
  dimColor = 'rgba(255,255,255,0.14)',
  fillColor = 'rgb(255,255,255)',
}: LetterFillRevealProps) {
  const reduced = useReducedMotion()
  const Motion = motionTags[as]
  const wordRampWidth = wordRampWidthProp ?? letterRampWidth ?? 1.35

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: scrollOffset,
  })

  const entranceProgress = useMotionValue(0)
  useEffect(() => {
    if (mode !== 'entrance' || reduced) return
    const controls = animate(entranceProgress, 1, {
      duration: entranceDuration,
      delay: entranceDelay,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [mode, reduced, entranceProgress, entranceDuration, entranceDelay])

  const [spanStart, spanEnd] = progressRange
  const sourceProgress = mode === 'entrance' ? entranceProgress : scrollYProgress
  const driveProgress = useTransform(sourceProgress, (v) => {
    const d = Math.max(spanEnd - spanStart, 0.0001)
    return Math.min(1, Math.max(0, (v - spanStart) / d))
  })

  const words = useMemo(() => splitWords(text), [text])

  if (reduced) {
    const El = as
    return <El className={className}>{text}</El>
  }

  if (words.length === 0) {
    const El = as
    return <El className={className}>{text}</El>
  }

  return (
    <Motion className={className}>
      {words.map((word, i) => (
        <ScrollDrivenWord
          key={`${i}-${word}`}
          word={word}
          wordIndex={i}
          wordCount={words.length}
          driveProgress={driveProgress}
          dimColor={dimColor}
          fillColor={fillColor}
          wordRampWidth={wordRampWidth}
          lead={lead}
          tail={tail}
          gapClassName={i < words.length - 1 ? 'mr-[0.3em]' : ''}
        />
      ))}
    </Motion>
  )
}
