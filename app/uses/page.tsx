import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Uses',
  description: 'The tools, editor, machine, and stack Alex De Souza uses daily.',
}

const USES = [
  {
    category: 'EDITOR',
    items: [
      { label: 'Editor', value: 'VS Code' },
      { label: 'Theme', value: 'Tokyo Night' },
      { label: 'Font', value: 'JetBrains Mono 14px' },
      { label: 'Extensions', value: 'Prettier, ESLint, GitLens, Tailwind IntelliSense' },
    ],
  },
  {
    category: 'TERMINAL',
    items: [
      { label: 'Shell', value: 'Zsh + Oh My Zsh' },
      { label: 'Multiplexer', value: 'tmux' },
      { label: 'Theme', value: 'Powerlevel10k' },
    ],
  },
  {
    category: 'MACHINE',
    items: [
      { label: 'Machine', value: 'MacBook Pro' },
      { label: 'OS', value: 'macOS' },
      { label: 'Browser', value: 'Chrome (dev) + Arc' },
    ],
  },
  {
    category: 'AI TOOLS',
    items: [
      { label: 'Primary AI', value: 'Claude (Anthropic)' },
      { label: 'Code assistant', value: 'GitHub Copilot' },
      { label: 'SDK', value: 'Anthropic SDK (integrated in ImpulsoLead)' },
    ],
  },
  {
    category: 'DAILY APPS',
    items: [
      { label: 'Notes', value: 'Notion' },
      { label: 'Design', value: 'Figma' },
      { label: 'API testing', value: 'Bruno / Postman' },
      { label: 'DB GUI', value: 'TablePlus' },
      { label: 'Version control', value: 'Git + GitHub' },
    ],
  },
  {
    category: 'INFRASTRUCTURE',
    items: [
      { label: 'Deployment', value: 'Vercel' },
      { label: 'Database hosting', value: 'Neon (PostgreSQL)' },
      { label: 'Cache', value: 'Upstash Redis' },
      { label: 'Auth', value: 'Clerk' },
      { label: 'Email', value: 'Resend' },
    ],
  },
]

export default function UsesPage() {
  return (
    <main>
      <section className="w-full px-8 py-24">
        <div
          className="flex items-baseline justify-between mb-12 pb-4"
          style={{ borderBottom: '2px solid #2A2A2A' }}
        >
          <h1
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: '#F0EBE0' }}
          >
            USES
          </h1>
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-wider"
            style={{ color: '#888880' }}
          >
            ← BACK
          </Link>
        </div>

        <div className="flex flex-col gap-0">
          {USES.map((section) => (
            <div
              key={section.category}
              className="py-8"
              style={{ borderBottom: '1px solid #2A2A2A' }}
            >
              <h2
                className="font-mono text-[11px] uppercase tracking-widest mb-6"
                style={{ color: '#FFE500' }}
              >
                {section.category}
              </h2>
              <div className="flex flex-col gap-3">
                {section.items.map(({ label, value }) => (
                  <div key={label} className="flex gap-12">
                    <span
                      className="font-display font-bold text-[14px] w-40 shrink-0"
                      style={{ color: '#F0EBE0' }}
                    >
                      {label}
                    </span>
                    <span className="font-mono text-[14px]" style={{ color: '#888880' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
