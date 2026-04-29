'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const NARRATIVE = [
  { line: 'Started with curiosity.', sub: '2020 — first line of code' },
  { line: 'Built with obsession.', sub: '2022 — first production app' },
  { line: 'Scaled through systems.', sub: '2024 — founded ImpulsoLead' },
  { line: 'Now creating leverage.', sub: '2025 — 2 live SaaS products' },
]

const MILESTONES = [
  {
    year: '2020',
    title: 'First line of code.',
    desc: 'Started self-teaching. HTML, then CSS, then JavaScript. The obsession started immediately.',
  },
  {
    year: '2022',
    title: 'First production app.',
    desc: 'Shipped a real product used by real people. Learned more in that sprint than in a year of tutorials.',
  },
  {
    year: '2024',
    title: 'Founded ImpulsoLead.',
    desc: 'Built a company. Hired no one. Shipped everything. CTO, PM, designer, and engineer in one person.',
  },
  {
    year: '2024',
    title: 'ImpulsoSearch launched.',
    desc: 'Second product under the Impulso brand. AI-powered search for the same market. Suite architecture begins.',
  },
  {
    year: '2025',
    title: 'Studying & scaling.',
    desc: 'CS student at University of Aveiro. Systems programming, networks, compilers. The theory catching up to the practice.',
  },
]

export function FounderStory() {
  return (
    <section
      className="w-full"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        {/* Left — narrative */}
        <motion.div
          className="flex flex-col justify-center px-12 py-20"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-mono text-[11px] uppercase tracking-[0.14em] mb-8"
            style={{ color: '#D6FF3F', opacity: 0.7 }}
          >
            FOUNDER STORY
          </p>

          <div className="flex flex-col gap-5">
            {NARRATIVE.map(({ line, sub }, i) => (
              <motion.div
                key={line}
                className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p
                  className="font-display font-extrabold leading-tight"
                  style={{
                    fontSize: 'clamp(22px, 2.8vw, 34px)',
                    color: i === NARRATIVE.length - 1 ? '#D6FF3F' : '#F5F3EE',
                  }}
                >
                  {line}
                </p>
                <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {sub}
                </p>
              </motion.div>
            ))}
          </div>

          <blockquote
            className="font-mono text-[13px] leading-relaxed mt-10 pl-4"
            style={{
              color: '#8A8A8A',
              borderLeft: '2px solid rgba(214,255,63,0.4)',
            }}
          >
            &ldquo;I don&apos;t ship features. I ship products. There&apos;s a
            difference.&rdquo;
          </blockquote>

          <Link
            href="/about"
            className="font-mono text-[12px] uppercase tracking-[0.1em] mt-8 inline-flex items-center gap-2 transition-colors duration-150"
            style={{ color: '#D6FF3F' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            FULL STORY →
          </Link>
        </motion.div>

        {/* Right — timeline */}
        <motion.div
          className="flex flex-col justify-center px-12 py-20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div
              className="absolute left-[39px] top-0 bottom-0"
              style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }}
            />

            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year + m.title}
                className="relative flex gap-6 pb-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Year node */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: '78px' }}>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 z-10"
                    style={{
                      background: i === MILESTONES.length - 1 ? '#D6FF3F' : 'rgba(255,255,255,0.15)',
                      border: `1px solid ${i === MILESTONES.length - 1 ? '#D6FF3F' : 'rgba(255,255,255,0.2)'}`,
                      marginTop: '4px',
                    }}
                  />
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    {m.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5 pb-2">
                  <p
                    className="font-display font-bold text-[15px] leading-snug"
                    style={{ color: '#F5F3EE' }}
                  >
                    {m.title}
                  </p>
                  <p
                    className="font-mono text-[12px] leading-[1.7]"
                    style={{ color: '#8A8A8A' }}
                  >
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          .grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            padding: 48px 24px !important;
          }
          .grid > div:last-child {
            padding: 48px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
