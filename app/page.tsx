import { Hero } from '@/components/sections/Hero'
import { QuickFacts } from '@/components/sections/QuickFacts'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Industries } from '@/components/sections/Industries'
import { PlaybooksTeaser } from '@/components/sections/PlaybooksTeaser'
import { BridgeStatement } from '@/components/sections/Bridge'
import { Testimonials } from '@/components/sections/Testimonials'
import { Process } from '@/components/sections/Process'
import { Newsletter } from '@/components/sections/Newsletter'
import { Contact } from '@/components/sections/Contact'
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from '@/components/seo/StructuredData'

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      <main className="bg-black text-white">
        <Hero />
        <QuickFacts />
        <About />
        <Services />
        <Industries />
        <PlaybooksTeaser />
        <BridgeStatement />
        <Testimonials />
        <Process />
        <Newsletter />
        <Contact variant="homepage" />
      </main>
    </>
  )
}

