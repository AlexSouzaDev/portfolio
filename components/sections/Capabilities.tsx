'use client'

import { motion } from 'framer-motion'

const CAPABILITIES = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    desc: 'React, Next.js, TypeScript. Performance-first interfaces that feel fast, accessible, and production-grade from day one.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    colSpan: 2,
    accent: true,
  },
  {
    id: 'ai',
    title: 'AI Products',
    desc: 'Claude SDK integrations, RAG pipelines, agent orchestration. AI that ships to real users — not just demos.',
    tags: ['Anthropic SDK', 'RAG', 'LLM Orchestration'],
    colSpan: 1,
    accent: false,
  },
  {
    id: 'product',
    title: 'Product Strategy',
    desc: 'From problem to revenue. Product thinking that lives at the intersection of engineering and business outcomes.',
    tags: ['B2B SaaS', 'Roadmapping', 'GTM'],
    colSpan: 1,
    accent: false,
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    desc: 'Python, FastAPI, Node. ACID-compliant, horizontally scalable, properly architected — schemas that don\'t embarrass you in 6 months.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'BullMQ'],
    colSpan: 1,
    accent: false,
  },
  {
    id: 'growth',
    title: 'Growth Engineering',
    desc: 'AI-powered lead gen, ad automation, CRM pipeline orchestration. The technical layer behind user acquisition at scale.',
    tags: ['Automation', 'Analytics', 'CRM', 'Ad Tech'],
    colSpan: 1,
    accent: false,
  },
  {
    id: 'infra',
    title: 'Infrastructure',
    desc: 'Docker, CI/CD, Vercel, GitHub Actions. Deployment pipelines that work on the first push and don\'t break at 2am.',
    tags: ['Docker', 'Vercel', 'GitHub Actions', 'Clerk'],
    colSpan: 2,
    accent: false,
  },
]

interface Cap {
  id: string
  title: string
  desc: string
  tags: string[]
  colSpan: number
  accent: boolean
}

function CapabilityCard({ cap, index }: { cap: Cap; index: number }) {
  return (
    <motion.div
      className="bento-card flex flex-col justify-between p-7 gap-5"
      style={{
        gridColumn: `span ${cap.colSpan}`,
        border: cap.accent
          ? '1px solid rgba(214,255,63,0.25)'
          : '1px solid rgba(255,255,255,0.06)',
        background: cap.accent ? 'rgba(214,255,63,0.04)' : '#0D0D0D',
        minHeight: '180px',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        borderColor: 'rgba(214,255,63,0.3)',
      }}
    >
      <div className="flex flex-col gap-2.5">
        <h3
          className="font-display font-extrabold text-[16px]"
          style={{ color: cap.accent ? '#D6FF3F' : '#F5F3EE' }}
        >
          {cap.title}
        </h3>
        <p
          className="font-mono text-[12px] leading-[1.75]"
          style={{ color: '#8A8A8A' }}
        >
          {cap.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {cap.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-1"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Capabilities() {
  return (
    <section
      className="w-full px-8 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Header */}
      <div
        className="flex items-baseline justify-between mb-12 pb-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-baseline gap-6">
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#F5F3EE' }}
          >
            CAPABILITIES
          </h2>
          <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            [03]
          </span>
        </div>
        <span className="font-mono text-[11px] hidden md:block" style={{ color: '#8A8A8A' }}>
          WHAT I BRING TO THE TABLE
        </span>
      </div>

      {/* Bento grid */}
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        {CAPABILITIES.map((cap, i) => (
          <CapabilityCard key={cap.id} cap={cap} index={i} />
        ))}
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .grid > div[style*='span 2'] {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 540px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          .grid > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
