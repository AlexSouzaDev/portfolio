import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { FounderStory } from '@/components/sections/FounderStory'
import { Capabilities } from '@/components/sections/Capabilities'
import { Metrics } from '@/components/sections/Metrics'
import { TerminalChatClient } from '@/components/sections/TerminalChatClient'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <SelectedWork />
      <FounderStory />
      <Capabilities />
      <Metrics />
      <TerminalChatClient />
      <Contact />
      <Footer />
    </main>
  )
}
