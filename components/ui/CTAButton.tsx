'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type Variant = 'primary' | 'outline' | 'outline-dark' | 'dark' | 'light-outline' | 'light-solid'

type CTAButtonProps = {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  onClick?: () => void
}

const base =
  'group/cta relative inline-flex items-center justify-center gap-2.5 rounded-card font-semibold transition-colors duration-200 min-h-[44px] touch-manipulation'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-black hover:bg-brand-400 px-6 py-2.5 text-sm shadow-[0_16px_40px_-18px_rgba(255,169,31,0.55)]',
  outline:
    'border border-brand-500 bg-transparent text-brand-500 hover:bg-brand-500 hover:border-brand-500 hover:text-[#0A0A0A] disabled:hover:bg-transparent disabled:hover:text-brand-500 disabled:hover:border-brand-500 px-6 py-2.5 text-sm',
  'outline-dark':
    'border border-brand-500/40 bg-transparent text-brand-500 hover:bg-brand-500/10 hover:text-brand-400 hover:border-brand-500/40 px-6 py-2.5 text-sm',
  dark:
    'bg-[#0A0A0A] text-white hover:bg-[#1a1a1a] px-6 py-2.5 text-sm',
  'light-outline':
    'border border-white/20 text-white/80 hover:border-white/40 hover:text-white px-6 py-2.5 text-sm',
  /** White CTA on dark hero — same radius as other CTAs (`rounded-card` from base) */
  'light-solid': 'bg-white px-6 py-2.5 text-sm text-black shadow-none hover:bg-white/90',
}

export function CTAButton({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={twMerge(base, variants[variant], className)}
    >
      {/* Single icon + flex `order` swap keeps gap-2.5 identical; avoids translate/duplicate icon layout shift */}
      <span className="relative z-10 min-w-0 order-1 group-hover/cta:order-2">{children}</span>
      <span
        aria-hidden
        className="relative z-10 flex shrink-0 items-center justify-center text-current order-2 group-hover/cta:order-1"
      >
        <ArrowUpRight size={15} strokeWidth={2.2} className="text-current" />
      </span>
    </Link>
  )
}

type CTAButtonElementProps = Omit<CTAButtonProps, 'href'> & {
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function CTAButtonElement({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: CTAButtonElementProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(base, 'disabled:opacity-60 disabled:cursor-not-allowed', variants[variant], className)}
    >
      <span className="relative z-10 min-w-0 order-1 group-hover/cta:order-2">{children}</span>
      <span
        aria-hidden
        className="relative z-10 flex shrink-0 items-center justify-center text-current order-2 group-hover/cta:order-1"
      >
        <ArrowUpRight size={15} strokeWidth={2.2} className="text-current" />
      </span>
    </button>
  )
}
