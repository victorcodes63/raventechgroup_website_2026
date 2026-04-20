import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CTAButton } from '@/components/ui/CTAButton'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { AuthorByline } from '@/components/shared/AuthorByline'
import { NewsletterSignup } from '@/components/shared/NewsletterSignup'
import { ProseContent } from '@/components/shared/ProseContent'
import { RelatedContent } from '@/components/shared/RelatedContent'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { TableOfContents } from '@/components/shared/TableOfContents'
import { SafeRasterImage } from '@/components/shared/SafeRasterImage'
import { getInsightBySlug, insights } from '@/lib/data/insights'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raventechgroup.com'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

function blogPostingJsonLd(args: {
  title: string
  description: string
  slug: string
  publishedAt: string
  modifiedAt?: string
  image: string
  category: string
  keywords: string[]
}) {
  const url = `${siteUrl}/insights/${args.slug}`
  const imageUrl = args.image.startsWith('http') ? args.image : `${siteUrl}${args.image}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description,
    datePublished: args.publishedAt,
    dateModified: args.modifiedAt ?? args.publishedAt,
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
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/favicon/web-app-manifest-512x512.png`,
      },
    },
    image: imageUrl,
    mainEntityOfPage: url,
    url,
    articleSection: args.category,
    keywords: args.keywords.join(', '),
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) return {}
  const url = `${siteUrl}/insights/${insight.slug}`
  const ogImage = insight.heroImage.startsWith('http') ? insight.heroImage : `${siteUrl}${insight.heroImage}`
  return {
    title: insight.metaTitle,
    description: insight.metaDescription,
    keywords: insight.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: insight.metaTitle,
      description: insight.metaDescription,
      url,
      siteName: 'Raven Tech Group',
      type: 'article',
      locale: 'en_KE',
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt ?? insight.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.metaTitle,
      description: insight.metaDescription,
    },
    robots: { index: true, follow: true },
  }
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) notFound()

  const pageUrl = `${siteUrl}/insights/${insight.slug}`
  const related = insight.relatedSlugs
    .map((s) => getInsightBySlug(s))
    .filter((i): i is NonNullable<ReturnType<typeof getInsightBySlug>> => i != null)
    .slice(0, 3)

  const relatedCards = related.map((r) => ({
    href: `/insights/${r.slug}`,
    title: r.title,
    subtitle: r.categoryLabel,
    image: r.heroImage,
    imageAlt: r.heroImageAlt,
  }))

  return (
    <main className="bg-[#0A0A0A] pb-24 text-white">
      {blogPostingJsonLd({
        title: insight.title,
        description: insight.metaDescription,
        slug: insight.slug,
        publishedAt: insight.publishedAt,
        modifiedAt: insight.updatedAt,
        image: insight.heroImage,
        category: insight.categoryLabel,
        keywords: insight.keywords,
      })}

      <article>
        <header className="border-b border-white/[0.06] pt-28 pb-10 md:pt-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <span className="inline-flex rounded-full border border-[#FFA91F]/35 bg-[#FFA91F]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
              {insight.categoryLabel}
            </span>
            <h1 className="mt-6 max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl lg:leading-[1.1]">
              {insight.title}
            </h1>
            <div className="mt-8">
              <AuthorByline
                name={insight.author.name}
                role={insight.author.role}
                avatarSrc={insight.author.avatar}
                publishedAt={insight.publishedAt}
                readingTime={insight.readingTime}
              />
            </div>
          </div>
        </header>

        <div className="relative mx-auto w-full max-w-5xl border-b border-white/[0.06] px-5 pb-12 pt-10 md:px-8 lg:px-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] md:aspect-[2/1]">
            <SafeRasterImage
              src={insight.heroImage}
              alt={insight.heroImageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16 lg:px-12">
          <div className="lg:grid lg:grid-cols-[minmax(0,200px)_minmax(0,680px)_minmax(0,200px)] lg:gap-12 xl:gap-16">
            <aside className="mb-10 hidden lg:mb-0 lg:block">
              <div className="sticky top-28">
                <TableOfContents items={insight.tableOfContents} />
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-10 lg:hidden">
                <ShareButtons url={pageUrl} title={insight.title} />
              </div>
              <ProseContent html={insight.body} />
            </div>

            <aside className="mt-12 hidden lg:mt-0 lg:block">
              <div className="sticky top-28 space-y-8">
                <ShareButtons url={pageUrl} title={insight.title} />
                <div className="rounded-card border border-white/[0.08] bg-[#111111] p-6">
                  <p className="text-sm font-semibold text-white">Talk to Victor</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Want this pattern on your stack? Send context — we reply with a concrete next step.
                  </p>
                  <CTAButton href="/book" variant="primary" className="mt-5 w-full justify-center px-4 py-3 text-sm">
                    Book a call
                  </CTAButton>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <ScrollReveal>
          <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-16">
            <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
              <div className="flex flex-col gap-8 rounded-card border border-white/[0.08] bg-[#111111] p-8 lg:flex-row lg:items-center lg:gap-12 lg:p-10">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/[0.1]">
                  <SafeRasterImage
                    src={insight.author.avatar ?? '/images/team/victor-chumo.jpg'}
                    alt={`${insight.author.name} portrait`}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-white">{insight.author.name}</h2>
                  <p className="mt-1 text-sm text-[#FFA91F]/90">{insight.author.role}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">{insight.author.bio}</p>
                  <div className="mt-6">
                    <CTAButton href="/book" variant="outline" className="text-sm">
                      Book a call with Victor
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </article>

      {relatedCards.length > 0 ? (
        <RelatedContent eyebrow="Keep reading" heading="Related insights" cards={relatedCards} />
      ) : null}

      <NewsletterSignup
        source={`insight-${insight.slug}`}
        title="Get field notes monthly"
        description="One email per month — notes from delivery in Nairobi. No spam."
      />
    </main>
  )
}
