import type { Metadata } from 'next'
import { createMetadata } from '@/content/site'
import { PageHero } from '@/components/sections/PageHero'
import { ContactSection } from '@/components/sections/ContactSection'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'Contact',
  'Reach out to Alex De Souza for founder-grade product and engineering work.',
  '/contact'
)

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Strong ideas deserve strong execution."
        body="If you’re serious about building something with weight behind it, send context. I care most about sharp problems, real stakes, and teams that want quality."
      />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}
