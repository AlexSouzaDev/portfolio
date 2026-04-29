import { HomeHero } from '@/components/sections/HomeHero'
import { VelocityMarquee } from '@/components/sections/VelocityMarquee'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { FounderTimeline } from '@/components/sections/FounderTimeline'
import { CapabilityGrid } from '@/components/sections/CapabilityGrid'
import { MetricsStrip } from '@/components/sections/MetricsStrip'
import { ContactSection } from '@/components/sections/ContactSection'
import { TerminalExperience } from '@/components/terminal/TerminalExperience'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <VelocityMarquee />
      <FeaturedWork />
      <FounderTimeline />
      <CapabilityGrid />
      <MetricsStrip />
      <TerminalExperience />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}
