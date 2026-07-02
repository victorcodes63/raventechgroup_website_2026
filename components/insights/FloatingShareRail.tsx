'use client'

import { Check, Link2, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

type FloatingShareRailProps = {
  url: string
  title: string
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function FloatingShareRail({ url, title }: FloatingShareRailProps) {
  const [copied, setCopied] = useState(false)
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="hidden lg:block">
      <div className="sticky top-[20%] z-20 flex flex-col items-center gap-3">
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.12] bg-[#111111] text-white/65 transition-colors hover:border-[#FFA91F]/35 hover:text-[#FFA91F]"
        >
          <Linkedin className="h-4 w-4" strokeWidth={1.75} />
        </a>
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.12] bg-[#111111] text-white/65 transition-colors hover:border-[#FFA91F]/35 hover:text-[#FFA91F]"
        >
          <XIcon className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => void copyLink()}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-white/[0.12] bg-[#111111] text-white/65 transition-colors hover:border-[#FFA91F]/35 hover:text-[#FFA91F]"
        >
          {copied ? <Check className="h-4 w-4 text-[#FFA91F]" /> : <Link2 className="h-4 w-4" />}
        </button>
        <span
          role="status"
          aria-live="polite"
          className={`text-[10px] uppercase tracking-[0.12em] ${copied ? 'text-[#FFA91F]' : 'text-transparent'}`}
        >
          Copied
        </span>
      </div>
    </div>
  )
}
