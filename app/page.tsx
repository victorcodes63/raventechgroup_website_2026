import { HomePageContent } from '@/app/HomePageContent'
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from '@/components/seo/StructuredData'

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      <HomePageContent />
    </>
  )
}
