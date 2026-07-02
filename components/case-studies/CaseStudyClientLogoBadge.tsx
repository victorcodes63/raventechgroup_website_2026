import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type CaseStudyClientLogoBadgeProps = {
  clientLogo: string
  clientName: string
  /** `hero` sits below the global nav on full-bleed case heroes */
  placement?: 'card' | 'hero'
  className?: string
}

export function CaseStudyClientLogoBadge({
  clientLogo,
  clientName,
  placement = 'card',
  className,
}: CaseStudyClientLogoBadgeProps) {
  const inner =
    placement === 'hero'
      ? 'h-9 w-[min(13rem,52vw)] sm:h-10 sm:w-[min(15rem,44vw)]'
      : 'h-8 w-[min(11rem,46vw)] sm:h-9 sm:w-[min(12.5rem,40vw)]'

  const position =
    placement === 'hero'
      ? 'left-5 top-24 sm:left-8 sm:top-28 md:top-32'
      : 'left-3 top-3 sm:left-4 sm:top-4'

  return (
    <div
      className={twMerge(
        'pointer-events-none absolute z-20 rounded-card border border-white/[0.12] bg-[#0A0A0A]/94 px-2 py-1.5 shadow-[0_14px_44px_-10px_rgba(0,0,0,0.88)] backdrop-blur-sm sm:px-2.5 sm:py-2',
        position,
        className,
      )}
    >
      <div className={twMerge('relative', inner)}>
        <Image
          src={clientLogo}
          alt={`${clientName} logo`}
          fill
          className="object-contain object-left"
          sizes="(max-width: 768px) 180px, 240px"
        />
      </div>
    </div>
  )
}
