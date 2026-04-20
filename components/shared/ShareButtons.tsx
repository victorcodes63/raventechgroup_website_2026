'use client'

import { Check, Link2, Linkedin } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type ShareButtonsProps = {
  url: string
  title: string
  className?: string
}

/** X (Twitter) icon — avoid extra dependency */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`
  const twitter = `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`

  const copy = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({ title, url })
          return
        } catch {
          /* dismissed or failed — fall through to clipboard */
        }
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      /* ignore */
    }
  }, [title, url])

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Share</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.12] bg-[#111111] text-white/70 transition-colors hover:border-[#FFA91F]/40 hover:text-[#FFA91F]"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" strokeWidth={1.75} />
        </a>
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.12] bg-[#111111] text-white/70 transition-colors hover:border-[#FFA91F]/40 hover:text-[#FFA91F]"
          aria-label="Share on X"
        >
          <XIcon className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.12] bg-[#111111] text-white/70 transition-colors hover:border-[#FFA91F]/40 hover:text-[#FFA91F]"
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? <Check className="h-4 w-4 text-[#FFA91F]" /> : <Link2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
