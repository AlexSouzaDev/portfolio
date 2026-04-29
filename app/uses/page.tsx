import type { Metadata } from 'next'
import { createMetadata, usesGroups } from '@/content/site'
import { PageHero } from '@/components/sections/PageHero'
import { FadeIn } from '@/components/motion/FadeIn'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'Uses',
  'Tools, stack, and operating environment behind Alex De Souza’s workflow.',
  '/uses'
)

export default function UsesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Uses"
        title="A workflow designed for velocity, clarity, and fewer excuses."
        body="I keep the stack practical. The goal is reducing friction between decision, build, and release."
      />
      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {usesGroups.map((group, index) => (
            <FadeIn key={group.title} delay={index * 0.05}>
              <article className="glass-panel h-full rounded-[2rem] p-6">
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-white">{group.title}</h2>
                <div className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <p key={item} className="border-t border-white/10 pt-4 text-sm leading-7 text-white/62">
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
