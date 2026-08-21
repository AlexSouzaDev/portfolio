import type { Metadata } from 'next'
import { createMetadata } from '@/content/site'
import { PageHead } from '@/components/print/PageHead'
import { ReplyCard } from '@/components/sections/ReplyCard'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'Contact',
  'Reach out to Alex De Souza for full-stack engineering and AI product work.',
  '/contact'
)

export default function ContactPage() {
  return (
    <>
      <main>
        <PageHead
          mark="Reply card"
          title="Strong ideas deserve strong execution."
          body="If you’re serious about building something with weight behind it, send context. I care most about sharp problems, real stakes, and teams that want quality."
        />
        <ReplyCard mark="Enquiry" />
      </main>
      <SiteFooter />
    </>
  )
}
