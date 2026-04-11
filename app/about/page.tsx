import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About',
  description: 'Alex De Souza — origin story, mission, and the Portugal → Brazil angle.',
}

export default function AboutPage() {
  return (
    <main>
      <section className="w-full px-8 py-24 max-w-4xl">
        <div
          className="flex items-baseline justify-between mb-12 pb-4"
          style={{ borderBottom: '2px solid #2A2A2A' }}
        >
          <h1
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: '#F0EBE0' }}
          >
            ABOUT
          </h1>
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-wider"
            style={{ color: '#888880' }}
          >
            ← BACK
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          {[
            {
              label: 'THE SHORT VERSION',
              text: "Founder & CTO of ImpulsoLead. Full-stack AI engineer. CS student at the University of Aveiro in Portugal. Building AI-powered SaaS for the Brazilian real estate market.",
            },
            {
              label: 'HOW IT STARTED',
              text: "I started writing code in 2020. By 2024 I was running a company. The gap between those two facts is a lot of late nights, a lot of shipped code that I had to rewrite, and a progression from HTML files to production AI systems handling real business data.",
            },
            {
              label: 'WHAT I BUILD',
              text: "I work at the intersection of AI and SaaS infrastructure. Next.js frontends. Python backends. Anthropic SDK integrations. PostgreSQL schemas that don't embarrass me six months later. ImpulsoLead and ImpulsoSearch are production systems — not demos, not prototypes.",
            },
            {
              label: 'PORTUGAL → BRAZIL',
              text: "I'm based in Aveiro, Portugal. My products serve the Brazilian real estate market. The distance is irrelevant when you ship digitally. The Brazilian real estate market has specific, underserved problems that AI can solve. That's where I'm building.",
            },
            {
              label: 'THE ACADEMIC SIDE',
              text: "Currently studying Systems and Network Programming at the University of Aveiro. Six certifications across five institutions — Duke MLOps, IBM Generative AI, Microsoft Full-Stack, Microsoft Cybersecurity, UoL Mathematics, CU Boulder SQL. Not because certificates matter, but because the disciplines behind them do.",
            },
          ].map(({ label, text }) => (
            <div
              key={label}
              className="flex flex-col gap-3 py-8"
              style={{ borderBottom: '1px solid #2A2A2A' }}
            >
              <h2
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: '#FFE500' }}
              >
                {label}
              </h2>
              <p className="text-[16px] leading-[1.7]" style={{ color: '#888880' }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
