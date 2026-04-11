import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Full project archive — ImpulsoLead, ImpulsoSearch, AppleVault, Inventory-API, and more.',
}

const ALL_PROJECTS = [
  {
    number: '001',
    name: 'ImpulsoLead',
    category: 'AI SaaS / Real Estate / B2B',
    period: '2024 — Present',
    description: 'AI-powered B2B SaaS for real estate agents in Brazil.',
    href: 'https://impulsolead.com',
    external: true,
  },
  {
    number: '002',
    name: 'ImpulsoSearch',
    category: 'AI Search / SaaS',
    period: '2024 — Present',
    description: 'AI-powered search layer surfacing real estate leads from unstructured sources.',
    href: 'https://impulsosearch.com',
    external: true,
  },
  {
    number: '003',
    name: 'AppleVault',
    category: 'Consumer App / Full-Stack',
    period: '2024',
    description: 'Instant iPhone resale valuation with personal vault.',
    href: 'https://github.com/AlexSouzaDev',
    external: true,
  },
  {
    number: '004',
    name: 'Inventory-API',
    category: 'Enterprise API / Python',
    period: '2024',
    description: 'ACID-compliant inventory management API with immutable audit log.',
    href: 'https://github.com/AlexSouzaDev',
    external: true,
  },
]

export default function WorkPage() {
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
            WORK
          </h1>
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-wider"
            style={{ color: '#888880' }}
          >
            ← BACK
          </Link>
        </div>

        <div className="flex flex-col">
          {ALL_PROJECTS.map((project, i) => (
            <a
              key={project.number}
              href={project.href}
              target={project.external ? '_blank' : undefined}
              rel={project.external ? 'noopener noreferrer' : undefined}
              className="card-hover flex items-center gap-8 py-6 px-6"
              style={{
                border: '2px solid #2A2A2A',
                marginTop: i > 0 ? '-2px' : '0',
              }}
            >
              <span className="font-mono text-[11px] w-8" style={{ color: '#888880' }}>
                {project.number}
              </span>
              <div className="flex-1">
                <h2
                  className="font-display font-extrabold text-2xl"
                  style={{ color: '#F0EBE0' }}
                >
                  {project.name}
                </h2>
                <p className="font-mono text-[12px] mt-1" style={{ color: '#888880' }}>
                  {project.description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase" style={{ color: '#888880' }}>
                  {project.category}
                </p>
                <p className="font-mono text-[11px] mt-1" style={{ color: '#888880' }}>
                  {project.period}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
