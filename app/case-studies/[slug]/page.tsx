import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { CTAButton } from '@/components/ui/CTAButton'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { CaseStudyStickyMetricsBar } from '@/components/case-studies/CaseStudyStickyMetricsBar'
import { RelatedContent } from '@/components/shared/RelatedContent'
import { SafeRasterImage } from '@/components/shared/SafeRasterImage'
import { CaseStudyClientLogoBadge } from '@/components/case-studies/CaseStudyClientLogoBadge'
import { caseStudies, getCaseStudyHeroSrc, getCaseStudyImageSrc } from '@/lib/data/caseStudies'
import type { CaseStudy } from '@/lib/data/caseStudies'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

function relatedFor(slug: string): CaseStudy[] {
  return caseStudies.filter((c) => c.slug !== slug).slice(0, 2)
}

function caseStudyArticleJsonLd(study: CaseStudy, canonical: string) {
  const { src } = getCaseStudyImageSrc(study)
  const imageUrl = src.startsWith('http') ? src : `${siteUrl}${src}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${study.client} — case study`,
    description: study.tagline,
    datePublished: study.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Victor Chumo',
      jobTitle: 'Managing Director',
      worksFor: { '@type': 'Organization', name: 'Raven Tech Group' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Raven Tech Group',
      url: siteUrl,
    },
    image: imageUrl,
    mainEntityOfPage: canonical,
    articleSection: study.industry,
    keywords: study.services.join(', '),
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)
  if (!study) return {}
  const url = `${siteUrl}/case-studies/${study.slug}`
  const title = `${study.client} | Case Study | Raven Tech Group`
  const description = study.tagline
  return {
    title,
    description,
    keywords: [...study.services, study.industry, 'Nairobi', 'Kenya', 'Raven Tech Group'],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Raven Tech Group',
      type: 'article',
      locale: 'en_KE',
      publishedTime: study.publishedAt,
      images: [{ url: study.heroImage.startsWith('http') ? study.heroImage : `${siteUrl}${study.heroImage}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)
  if (!study) notFound()

  const { src, unoptimized } = getCaseStudyHeroSrc(study)
  const canonical = `${siteUrl}/case-studies/${study.slug}`
  const related = relatedFor(study.slug)
  const relatedCards = related.map((r) => ({
    href: `/case-studies/${r.slug}`,
    title: r.client,
    subtitle: r.industry,
    image: r.heroImage,
    imageAlt: r.heroImageAlt,
  }))

  return (
    <main className="bg-[#0A0A0A] pb-24 text-white">
      {caseStudyArticleJsonLd(study, canonical)}
      <section id="case-study-hero" className="relative min-h-[52vh] overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <SafeRasterImage
            src={src}
            alt={study.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            unoptimized={unoptimized}
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/45"
            aria-hidden
          />
          {study.clientLogo ? (
            <CaseStudyClientLogoBadge
              clientLogo={study.clientLogo}
              clientName={study.client}
              placement="hero"
            />
          ) : null}
        </div>
        <div className="relative z-[2] mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-20 md:pt-40 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFA91F]">
            Case study · {study.industry}
          </p>
          <h1 className="mt-4 max-w-4xl text-[2.35rem] font-bold leading-[1.04] tracking-[-0.03em] md:text-5xl lg:text-6xl">{study.client}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-xl">{study.tagline}</p>
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            {[study.location, study.engagementLength, study.year].filter(Boolean).join(' · ')}
          </p>
        </div>
      </section>

      <CaseStudyStickyMetricsBar metrics={study.metrics} heroId="case-study-hero" />

      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
        <ScrollReveal>
          <section className="border-b border-white/[0.06] pb-12 lg:pb-20">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">The challenge</h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">{study.problem}</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="border-b border-white/[0.06] py-12 lg:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">What we built</h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">{study.solution}</p>
          </section>
        </ScrollReveal>

        {study.sections.map((sec) => (
          <ScrollReveal key={sec.heading}>
            <section className="border-b border-white/[0.06] py-12 lg:py-20">
              <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">{sec.heading}</h3>
              <p className="mt-5 max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-white/70">{sec.body}</p>
              {sec.image ? (
                <div className="relative mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-card border border-white/[0.08] bg-[#111111]">
                  <SafeRasterImage
                    src={sec.image}
                    alt={sec.imageAlt ?? ''}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 896px, 100vw"
                  />
                </div>
              ) : null}
              {sec.quote ? (
                <blockquote className="mt-10 max-w-3xl border-l-2 border-[#FFA91F] pl-6 text-lg italic text-white/75 md:text-xl">
                  <p>&ldquo;{sec.quote.text}&rdquo;</p>
                  <footer className="mt-4 text-sm font-medium not-italic text-white/50">
                    — {sec.quote.attribution}
                    {sec.quote.role ? `, ${sec.quote.role}` : ''}
                  </footer>
                </blockquote>
              ) : null}
            </section>
          </ScrollReveal>
        ))}

        <ScrollReveal>
          <section className="border-b border-white/[0.06] py-16 lg:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">The outcome</h2>
            <p className="mt-4 text-xl font-semibold text-white">{study.outcomeHeadline}</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">{study.outcomeSummary}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-card border border-white/[0.08] bg-[#111111] px-5 py-6 text-center"
                >
                  <p className="text-3xl font-bold text-[#FFA91F] md:text-4xl">{m.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{m.label}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="border-b border-white/[0.06] py-16 lg:pb-20">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Stack</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {study.siteUrl ? (
          <ScrollReveal>
            <section className="py-12">
              <a
                href={study.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-card border border-[#FFA91F]/35 bg-[#FFA91F]/10 px-5 py-3 text-sm font-semibold text-[#FFA91F] transition-colors hover:bg-[#FFA91F]/15"
              >
                Live at {new URL(study.siteUrl).hostname.replace(/^www\./, '')}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </section>
          </ScrollReveal>
        ) : null}
      </div>

      {relatedCards.length > 0 ? (
        <RelatedContent eyebrow="More work" heading="Related case studies" cards={relatedCards} />
      ) : null}

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-12">
        <div className="rounded-card border border-white/[0.08] bg-[#111111] p-8 text-center lg:p-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Want something like this for your business?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Send your context — we reply with a clear next step, usually within one business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/book" variant="primary">
              Book a discovery call
            </CTAButton>
            <CTAButton href="/case-studies" variant="light-outline">
              Back to all case studies
            </CTAButton>
          </div>
        </div>
      </div>
    </main>
  )
}
