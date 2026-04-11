import type { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Alex De Souza for founding engineer roles, technical co-founder conversations, and select freelance engagements.",
}

export default function ContactPage() {
  return (
    <main>
      <Contact />
      <Footer />
    </main>
  )
}
