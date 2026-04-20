import { SafeRasterImage } from '@/components/shared/SafeRasterImage'

type AuthorBylineProps = {
  name: string
  role: string
  avatarSrc?: string
  publishedAt: string
  readingTime: string
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-KE', { year: 'numeric', month: 'short', day: 'numeric' }).format(
      new Date(iso),
    )
  } catch {
    return iso
  }
}

export function AuthorByline({ name, role, avatarSrc, publishedAt, readingTime }: AuthorBylineProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-white/[0.08] pb-8">
      {avatarSrc ? (
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/[0.1] bg-[#111111]">
          <SafeRasterImage
            src={avatarSrc}
            alt={`${name} portrait`}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-[#111111] text-sm font-bold text-white/80"
          aria-hidden
        >
          {name
            .split(' ')
            .map((p) => p[0])
            .join('')
            .slice(0, 2)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-white">{name}</p>
        <p className="text-sm text-white/55">{role}</p>
      </div>
      <div className="flex w-full shrink-0 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50 sm:w-auto sm:justify-end">
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        <span className="text-white/30" aria-hidden>
          ·
        </span>
        <span>{readingTime}</span>
      </div>
    </div>
  )
}
