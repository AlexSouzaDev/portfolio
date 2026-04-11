'use client'

import { motion } from 'framer-motion'

const COLUMNS = [
  {
    heading: 'CORE STACK',
    items: ['Next.js', 'TypeScript', 'React', 'Python', 'Node.js / Express', 'FastAPI', 'Tailwind CSS', 'PHP', 'Java'],
  },
  {
    heading: 'INFRASTRUCTURE & AI',
    items: ['PostgreSQL', 'Redis / BullMQ', 'Prisma / tRPC', 'Clerk (Auth)', 'Anthropic Claude SDK', 'Docker', 'Vercel / CI-CD', 'GitHub Actions'],
  },
  {
    heading: 'CURRENTLY STUDYING',
    items: ['Systems Programming (C)', 'Network Programming', 'Compiler Design', 'Advanced SQL Optimization', 'Rust (early)', 'LLM fine-tuning pipelines', 'WebAssembly'],
  },
]

export function Skills() {
  return (
    <section className="w-full px-8 py-24" style={{ borderTop: '2px solid #2A2A2A' }}>
      {/* Section header */}
      <div
        className="flex items-baseline justify-between mb-12 pb-4"
        style={{ borderBottom: '2px solid #2A2A2A' }}
      >
        <h2
          className="font-display font-extrabold"
          style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#F0EBE0' }}
        >
          STACK
        </h2>
        <span className="font-mono text-[11px]" style={{ color: '#888880' }}>
          [04]
        </span>
      </div>

      {/* Three columns */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {COLUMNS.map((col, colIdx) => (
          <motion.div
            key={col.heading}
            className="flex flex-col px-8 first:pl-0 last:pr-0"
            style={{
              borderLeft: colIdx > 0 ? '2px solid #2A2A2A' : 'none',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.3,
              delay: colIdx * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h3
              className="font-mono text-[11px] uppercase tracking-widest pb-2 mb-4"
              style={{
                color: '#888880',
                borderBottom: '2px solid #FFE500',
              }}
            >
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[14px]"
                  style={{ color: '#F0EBE0' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          .grid > div {
            border-left: none !important;
            border-top: 2px solid #2A2A2A !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-top: 2rem !important;
          }
          .grid > div:first-child {
            border-top: none !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
