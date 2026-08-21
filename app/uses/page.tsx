import type { Metadata } from 'next'
import { createMetadata, usesGroups } from '@/content/site'
import { PageHead } from '@/components/print/PageHead'
import { Register, RegisterRow } from '@/components/print/Register'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'Uses',
  'Tools, stack, and operating environment behind Alex De Souza’s workflow.',
  '/uses'
)

export default function UsesPage() {
  return (
    <>
      <main>
        <PageHead
          mark="Specification"
          title="A workflow built for velocity and fewer excuses."
          body="The stack stays practical. The goal is reducing friction between decision, build, and release."
        />

        <section className="mx-auto max-w-sheet px-[var(--gutter)] pb-[clamp(3.5rem,8vw,7rem)]">
          <Register>
            {usesGroups.map((group, i) => (
              <RegisterRow key={group.title} entry={group.title} delay={i * 50}>
                <ul className="m-0 list-none p-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-paper-shade py-2.5 leading-relaxed text-ink-soft last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </RegisterRow>
            ))}
          </Register>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
