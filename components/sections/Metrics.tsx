'use client'

import { motion } from 'framer-motion'

const STATS = [
  {
    value: '5+',
    label: 'Years Building',
    sub: '2020 → present',
  },
  {
    value: '2',
    label: 'Live SaaS Products',
    sub: 'In production, paying customers',
  },
  {
    value: '4+',
    label: 'Projects Shipped',
    sub: 'From concept to production',
  },
  {
    value: '2',
    label: 'Markets Served',
    sub: 'Portugal & Brazil',
  },
]

const CREDENTIALS = [
  { institution: 'Duke University', cert: 'MLOps — Machine Learning Operations' },
  { institution: 'IBM', cert: 'Generative AI for Growth Marketing' },
  { institution: 'Microsoft', cert: 'Full-Stack Developer' },
  { institution: 'Microsoft', cert: 'Cybersecurity Analyst' },
  { institution: 'University of London', cert: 'Mathematics for Computer Science' },
  { institution: 'CU Boulder', cert: 'The Structured Query Language (SQL)' },
]

export function Metrics() {
  return (
    <section
      className="w-full"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Stats row */}
      <div
        className="grid px-8 py-16"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col gap-2 px-6 first:pl-0 last:pr-0"
            style={{
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.4,
              delay: i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className="font-display font-extrabold"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: '#D6FF3F', lineHeight: 1 }}
            >
              {stat.value}
            </span>
            <span className="font-display font-semibold text-[16px]" style={{ color: '#F5F3EE' }}>
              {stat.label}
            </span>
            <span className="font-mono text-[11px]" style={{ color: '#8A8A8A' }}>
              {stat.sub}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Credentials */}
      <div className="px-8 py-16">
        <div
          className="flex items-baseline justify-between mb-8 pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-baseline gap-5">
            <h2
              className="font-display font-extrabold"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#F5F3EE' }}
            >
              CREDENTIALS
            </h2>
            <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              [04]
            </span>
          </div>
          <span className="font-mono text-[11px] hidden md:block" style={{ color: '#8A8A8A' }}>
            6 CERTIFICATIONS · 5 INSTITUTIONS
          </span>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)' }}
        >
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.cert}
              className="flex flex-col gap-1.5 p-6"
              style={{ background: '#080808' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.35,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: '#D6FF3F', opacity: 0.6 }}>
                {c.institution}
              </p>
              <p className="font-display font-semibold text-[13px] leading-snug" style={{ color: '#F5F3EE' }}>
                {c.cert}
              </p>
            </motion.div>
          ))}
        </div>

        <p
          className="font-mono text-[12px] mt-6"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Not because certificates matter — because the disciplines behind them do.
        </p>
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*='repeat(4, 1fr)'] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*='repeat(4, 1fr)'] > div {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
            padding-left: 0 !important;
            padding-top: 1.5rem !important;
          }
          div[style*='repeat(4, 1fr)'] > div:nth-child(1),
          div[style*='repeat(4, 1fr)'] > div:nth-child(2) {
            border-top: none !important;
            padding-top: 0 !important;
          }
          div[style*='repeat(3, 1fr)'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
