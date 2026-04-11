'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function AboutStrip() {
  return (
    <section
      className="w-full grid"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      {/* Left — pull quote */}
      <motion.div
        className="flex flex-col justify-center px-12 py-20"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <blockquote
          className="font-display font-extrabold leading-[1.1]"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: '#F0EBE0',
          }}
        >
          &ldquo;I don&apos;t ship features. I ship products. There&apos;s a difference.&rdquo;
        </blockquote>
        <p
          className="font-mono text-[13px] mt-6"
          style={{ color: '#888880' }}
        >
          — Alex De Souza, CTO &amp; Founder
        </p>
      </motion.div>

      {/* Right — paragraphs */}
      <motion.div
        className="flex flex-col justify-center gap-5 px-12 py-20"
        style={{ borderLeft: '3px solid #2A2A2A' }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          "I started writing code in 2020. By 2024 I was running a company. The gap between those two facts is a lot of late nights, a lot of shipped code that I had to rewrite, and a progression from HTML files to production AI systems handling real business data.",
          "I build at the intersection of AI and SaaS infrastructure — Next.js frontends, Python backends, Anthropic SDK integrations, PostgreSQL schemas that don't embarrass me six months later. Currently studying Systems and Network Programming at the University of Aveiro, which keeps the theoretical foundations honest.",
          "ImpulsoLead and ImpulsoSearch are my primary focus: two products for the Brazilian real estate market, built in Portugal, serving agents who need AI that actually works in their workflow. Not demos. Not prototypes. Production systems.",
          "When I'm not building, I'm studying. Microsoft Full-Stack, IBM Generative AI, Duke MLOps, Microsoft Cybersecurity — not because certificates matter, but because the disciplines behind them do.",
        ].map((para, i) => (
          <p
            key={i}
            className="text-[15px] leading-[1.7]"
            style={{ color: '#888880' }}
          >
            {para}
          </p>
        ))}

        <Link
          href="/about"
          className="font-mono text-[13px] uppercase tracking-wider mt-4 inline-block transition-colors duration-[120ms]"
          style={{ color: '#FFE500' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none'
          }}
        >
          → FULL STORY
        </Link>
      </motion.div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
          }
          section > div:last-child {
            border-left: none !important;
            border-top: 3px solid #2A2A2A !important;
          }
        }
      `}</style>
    </section>
  )
}
