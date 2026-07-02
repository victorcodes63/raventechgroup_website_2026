import Link from 'next/link'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'
import { SafeRasterImage } from '@/components/shared/SafeRasterImage'

export type RelatedCard = {
  href: string
  title: string
  subtitle?: string
  image: string
  imageAlt: string
}

type RelatedContentProps = {
  eyebrow: string
  heading: string
  cards: RelatedCard[]
  footerLink?: {
    href: string
    label: string
  }
}

export function RelatedContent({ eyebrow, heading, cards, footerLink }: RelatedContentProps) {
  return (
    <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-6 shrink-0 bg-[#FFA91F]" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">{eyebrow}</span>
        </div>
        <h2 className="mb-10 text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">{heading}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group/card flex flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA91F]/30"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <SafeRasterImage
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover/card:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {c.subtitle ? (
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFA91F]/90">{c.subtitle}</p>
                ) : null}
                <h3 className="text-lg font-semibold leading-snug text-white">{c.title}</h3>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-white/70 transition-colors group-hover/card:text-[#FFA91F]">
                  <ArrowSwapRow groupName="card" iconSize={14} strokeWidth={2}>
                    Read more
                  </ArrowSwapRow>
                </span>
              </div>
            </Link>
          ))}
        </div>
        {footerLink ? (
          <div className="mt-8 flex justify-end">
            <Link
              href={footerLink.href}
              className="group/card inline-flex items-center text-sm font-semibold text-[#FFA91F]"
            >
              <ArrowSwapRow groupName="card" iconSize={14} strokeWidth={2}>
                {footerLink.label}
              </ArrowSwapRow>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
