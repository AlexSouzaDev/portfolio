import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { AboutStrip } from '@/components/sections/AboutStrip'
import { Certifications } from '@/components/sections/Certifications'
import { Skills } from '@/components/sections/Skills'
import { TerminalChatClient } from '@/components/sections/TerminalChatClient'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <SelectedWork />
      <AboutStrip />
      <Certifications />
      <Skills />
      <TerminalChatClient />
      <Contact />
      <Footer />
    </main>
  )
}
