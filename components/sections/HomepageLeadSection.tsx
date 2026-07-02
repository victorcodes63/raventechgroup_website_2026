'use client'

import Image from 'next/image'

import { Contact } from '@/components/sections/Contact'
import type { GlobalContactLeadCopy } from '@/lib/data/globalContactLeadCopy'
import { GLOBAL_CONTACT_LEAD_DEFAULT } from '@/lib/data/globalContactLeadCopy'

export const HOMEPAGE_LEAD_BAND_IMAGE_SRC = '/images/photos/background-image.avif'

type HomepageLeadSectionProps = {
  /** When omitted, uses the site default lead copy. */
  copy?: GlobalContactLeadCopy
}

export function HomepageLeadSection({ copy = GLOBAL_CONTACT_LEAD_DEFAULT }: HomepageLeadSectionProps) {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative isolate z-10 min-w-0 overflow-hidden bg-[#0A0A0A] pt-20 sm:pt-24 lg:pt-28 pb-0"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HOMEPAGE_LEAD_BAND_IMAGE_SRC}
          alt=""
          fill
          className="object-cover object-[50%_38%] brightness-[0.36] contrast-[1.05] saturate-0 lg:object-[50%_36%]"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-[#0A0A0A]/96" aria-hidden />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0A0A0A]/98 from-[0%] via-[#0A0A0A]/92 via-[45%] to-[#0A0A0A] to-[100%]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[clamp(6rem,18vw,11rem)] bg-gradient-to-t from-[#0A0A0A] from-[12%] via-[#0A0A0A]/88 via-[55%] to-transparent to-[100%]"
        aria-hidden
      />

      <div className="site-shell relative z-10 w-full pb-[clamp(1.25rem,4vw,2.75rem)]">
        <Contact variant="homepage" embedded homepageHeadline={copy.headline} homepageSupporting={copy.supporting} />
      </div>
    </section>
  )
}
