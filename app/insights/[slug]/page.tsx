import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CTAButton } from '@/components/ui/CTAButton'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { AuthorByline } from '@/components/shared/AuthorByline'
import { NewsletterSignup } from '@/components/shared/NewsletterSignup'
import { ProseContent } from '@/components/shared/ProseContent'
import { RelatedContent } from '@/components/shared/RelatedContent'
import { TableOfContents } from '@/components/shared/TableOfContents'
import { SafeRasterImage } from '@/components/shared/SafeRasterImage'
import { FloatingShareRail } from '@/components/insights/FloatingShareRail'
import { InsightReadingProgress } from '@/components/insights/InsightReadingProgress'
import { getInsightBySlug, insights } from '@/lib/data/insights'
import { formatInsightHtml } from '@/lib/insightsHtml'

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

function insightBreadcrumbJsonLd(slug: string, title: string) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${siteUrl}/insights` },
      { '@type': 'ListItem', position: 3, name: title, item: `${siteUrl}/insights/${slug}` },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
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
    robots: insight.isPublished
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) notFound()

  const pageUrl = `${siteUrl}/insights/${insight.slug}`
  const related = insight.relatedSlugs
    .map((s) => getInsightBySlug(s))
    .filter(
      (i): i is NonNullable<ReturnType<typeof getInsightBySlug>> =>
        i != null && i.isPublished,
    )
    .slice(0, 3)

  const relatedCards = related.map((r) => ({
    href: `/insights/${r.slug}`,
    title: r.title,
    subtitle: r.categoryLabel,
    image: r.heroImage,
    imageAlt: r.heroImageAlt,
  }))
  const formattedBody = await formatInsightHtml(insight.body)

  return (
    <main className="bg-[#0A0A0A] pb-24 text-white">
      <InsightReadingProgress />
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
      {insightBreadcrumbJsonLd(insight.slug, insight.title)}

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

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16 lg:px-12">
          <div className="absolute left-4 top-0 hidden xl:block">
            <FloatingShareRail url={pageUrl} title={insight.title} />
          </div>
          <div className="lg:grid lg:grid-cols-[minmax(0,200px)_minmax(0,680px)_minmax(0,200px)] lg:gap-12 xl:gap-16">
            <aside className="mb-10 hidden lg:mb-0 lg:block">
              <div className="sticky top-28">
                <TableOfContents items={insight.tableOfContents} />
              </div>
            </aside>

            <div className="min-w-0">
              <ProseContent html={formattedBody} />
            </div>

            <aside className="mt-12 hidden lg:mt-0 lg:block" />
          </div>
        </div>

        <ScrollReveal>
          <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-16">
            <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
              <div className="grid gap-8 rounded-card border border-white/[0.08] bg-[#111111] p-8 lg:grid-cols-[100px_minmax(0,1fr)] lg:items-center lg:p-10">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/[0.12]">
                  <SafeRasterImage
                    src={insight.author.avatar ?? '/images/team/victor-chumo.jpg'}
                    alt={`${insight.author.name} portrait`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">About the author</p>
                  <h2 className="mt-3 text-xl font-bold text-white">{insight.author.name}</h2>
                  <p className="mt-1 text-sm text-white/65">{insight.author.role}</p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/65">{insight.author.bio}</p>
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
        <RelatedContent
          eyebrow="Keep reading"
          heading="Related reading from Raven"
          cards={relatedCards}
          footerLink={{ href: '/insights', label: 'More from Raven' }}
        />
      ) : null}

      <NewsletterSignup
        source={`insight-${insight.slug}`}
        title="Get field notes monthly"
        description="One email per month — notes from delivery in Nairobi. No spam."
      />
    </main>
  )
}
