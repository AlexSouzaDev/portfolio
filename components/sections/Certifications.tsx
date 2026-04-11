'use client'

import { motion } from 'framer-motion'

interface Cert {
  institution: string
  name: string
  year: string
  quote: string
}

const COLUMNS: { heading: string; certs: Cert[] }[] = [
  {
    heading: 'AI & MACHINE LEARNING',
    certs: [
      {
        institution: 'Duke University · 2024',
        name: 'MLOps | Machine Learning Ops',
        year: '2024',
        quote: 'Pipeline to production — not just model training.',
      },
      {
        institution: 'IBM · 2024',
        name: 'Generative AI for Growth Marketing',
        year: '2024',
        quote: 'AI applied to real business outcomes, not benchmarks.',
      },
      {
        institution: 'University of London · 2024',
        name: 'Essential Mathematics for Computer Science',
        year: '2024',
        quote: 'The foundations under the frameworks.',
      },
    ],
  },
  {
    heading: 'FULL-STACK & DATA',
    certs: [
      {
        institution: 'Microsoft · 2024',
        name: 'Microsoft Full-Stack Developer',
        year: '2024',
        quote: 'End-to-end. Frontend to deployment.',
      },
      {
        institution: 'University of Colorado Boulder · 2024',
        name: 'The Structured Query Language (SQL)',
        year: '2024',
        quote: 'Because every AI product runs on data.',
      },
    ],
  },
  {
    heading: 'SECURITY',
    certs: [
      {
        institution: 'Microsoft · 2024',
        name: 'Microsoft Cybersecurity Analyst',
        year: '2024',
        quote: "B2B SaaS handles sensitive data. Security isn't optional.",
      },
    ],
  },
]

function CertBlock({ cert }: { cert: Cert }) {
  return (
    <div
      className="py-5 flex flex-col gap-1"
      style={{ borderBottom: '1px solid #2A2A2A' }}
    >
      <p className="font-mono text-[11px]" style={{ color: '#888880' }}>
        {cert.institution}
      </p>
      <p
        className="font-display font-medium text-[14px]"
        style={{ color: '#F0EBE0' }}
      >
        {cert.name}
      </p>
      <p
        className="font-mono text-[12px] italic"
        style={{ color: '#888880' }}
      >
        &ldquo;{cert.quote}&rdquo;
      </p>
    </div>
  )
}

export function Certifications() {
  return (
    <section className="w-full px-8 py-24">
      {/* Section header */}
      <div
        className="flex items-baseline justify-between mb-12 pb-4"
        style={{ borderBottom: '2px solid #2A2A2A' }}
      >
        <h2
          className="font-display font-extrabold"
          style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#F0EBE0' }}
        >
          CREDENTIALS
        </h2>
        <span className="font-mono text-[11px]" style={{ color: '#888880' }}>
          [03]
        </span>
      </div>

      {/* Three columns */}
      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
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
              className="font-mono text-[11px] uppercase tracking-widest pb-3 mb-2"
              style={{
                color: '#888880',
                borderBottom: '2px solid #FFE500',
              }}
            >
              {col.heading}
            </h3>
            {col.certs.map((cert) => (
              <CertBlock key={cert.name} cert={cert} />
            ))}
          </motion.div>
        ))}
      </div>

      <p
        className="font-mono text-[13px] text-center mt-12"
        style={{ color: '#888880' }}
      >
        Six certifications across five institutions — AI/ML, full-stack, data, and cybersecurity.
      </p>

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
