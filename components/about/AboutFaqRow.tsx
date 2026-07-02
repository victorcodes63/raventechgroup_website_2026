'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

export function AboutFaqRow({
  faq,
  reducedMotion,
  isLast,
}: {
  faq: { question: string; answer: string }
  reducedMotion: boolean | null
  isLast: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-t border-white/[0.08] ${isLast ? 'border-b border-white/[0.08]' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        <span className="text-lg font-semibold text-white">{faq.question}</span>
        <span
          aria-hidden
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-card border border-white/[0.12] text-white/70"
        >
          {open ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-4 leading-relaxed text-white/65">{faq.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
