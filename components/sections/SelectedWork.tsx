'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Project {
  number: string
  name: string
  tagline: string
  category: string
  period: string
  problem: string
  result: string
  role: string
  story: string
  tech: string[]
  links: { label: string; href: string; external?: boolean }[]
  reversed?: boolean
}

const PROJECTS: Project[] = [
  {
    number: '001',
    name: 'IMPULSOLEAD',
    tagline: 'AI that turns cold leads into closed deals.',
    category: 'AI SAAS · REAL ESTATE · B2B',
    period: '2024 — PRESENT',
    problem:
      'Brazilian real estate agents were drowning in unqualified leads with no system to automate follow-up or qualification at scale.',
    result:
      'Production SaaS with AI agents handling lead qualification, ad automation, and CRM pipeline — currently live with paying customers.',
    role: 'Founder, CTO, Lead Engineer',
    story:
      'Built from zero to production in months. Combines Next.js frontend, Python backend, Claude SDK for AI agent logic, and BullMQ for job orchestration. The product does what agents used to do manually — at 10× speed.',
    tech: ['Next.js', 'TypeScript', 'Anthropic SDK', 'PostgreSQL', 'Redis', 'BullMQ', 'Prisma', 'Clerk', 'tRPC'],
    links: [
      { label: 'VISIT IMPULSOLEAD.COM ↗', href: 'https://impulsolead.com', external: true },
    ],
    reversed: false,
  },
  {
    number: '002',
    name: 'IMPULSOSEARCH',
    tagline: 'Find the right lead before your competitor does.',
    category: 'AI SEARCH · SAAS · PRODUCT SUITE',
    period: '2024 — PRESENT',
    problem:
      'Real estate agents needed a way to surface relevant prospects from unstructured data sources — no tool existed for the Brazilian market.',
    result:
      'Standalone AI search product shipped under the Impulso brand architecture, extending the suite's total addressable market.',
    role: 'Founder, Full-Stack Engineer',
    story:
      'The second product in the ImpulsoLead ecosystem. An AI-powered search layer that turns messy data into qualified prospect lists. Ships independently — each product strengthens the brand umbrella.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Anthropic SDK'],
    links: [
      { label: 'VISIT IMPULSOSEARCH.COM ↗', href: 'https://impulsosearch.com', external: true },
    ],
    reversed: true,
  },
  {
    number: '003',
    name: 'APPLEVAULT',
    tagline: 'Instant iPhone valuations. No guesswork.',
    category: 'CONSUMER APP · REAL-TIME PRICING · FULL-STACK',
    period: '2024',
    problem:
      'iPhone resellers had no reliable tool to instantly calculate fair market value based on real device condition — just gut feeling and spreadsheets.',
    result:
      'Real-time valuation engine with a personal vault for tracking your inventory. Formula accounts for model, capacity, condition, and battery health.',
    role: 'Solo Engineer, Product Designer',
    story:
      'Scoped, designed, and shipped in a focused sprint. Built on Next.js App Router with Clerk auth, tRPC type-safe APIs, and a Prisma-managed schema. A clean example of going from spec to production solo.',
    tech: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'Clerk', 'Tailwind'],
    links: [
      { label: 'VIEW SOURCE ↗', href: 'https://github.com/AlexSouzaDev', external: true },
    ],
    reversed: false,
  },
  {
    number: '004',
    name: 'INVENTORY-API',
    tagline: 'Enterprise inventory management. Zero compromises.',
    category: 'ENTERPRISE API · PYTHON · BACKEND SYSTEMS',
    period: '2024',
    problem:
      'Demonstrating backend rigor outside the JavaScript ecosystem — ACID compliance, audit trails, and clean architecture patterns.',
    result:
      'Production-grade API: ACID-compliant stock transfers, immutable audit log, clean Controller–Service–Repository layering, Dockerized and fully documented.',
    role: 'Backend Engineer',
    story:
      'Built in Python/FastAPI to prove backend depth beyond the Node.js world. Every design decision was intentional: the architecture explains itself without comments, the audit log is write-once, the Docker setup works first try.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    links: [
      { label: 'VIEW SOURCE ↗', href: 'https://github.com/AlexSouzaDev', external: true },
    ],
    reversed: true,
  },
]

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-[10px] px-2 py-1 inline-block"
      style={{
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#8A8A8A',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {label}
    </span>
  )
}

function ProjectImagePlaceholder({ name, number }: { name: string; number: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-end justify-end p-8"
      style={{ background: '#0D0D0D' }}
      aria-label={`${name} — project visual`}
    >
      <div
        className="font-display font-extrabold select-none"
        style={{
          fontSize: 'clamp(48px, 6vw, 96px)',
          color: 'rgba(214,255,63,0.07)',
          lineHeight: 1,
        }}
      >
        {number}
      </div>
      <div
        className="font-mono text-[10px] uppercase tracking-[0.16em] mt-2"
        style={{ color: 'rgba(255,255,255,0.08)' }}
      >
        {name}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const details = (
    <div
      className="flex flex-col justify-between gap-6 p-10"
      style={{
        borderLeft: project.reversed ? 'none' : '1px solid rgba(255,255,255,0.06)',
        borderRight: project.reversed ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {project.number}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#8A8A8A' }}>
            {project.period}
          </p>
        </div>

        <h3
          className="font-display font-extrabold leading-tight"
          style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#F5F3EE' }}
        >
          {project.name}
        </h3>

        <p
          className="font-mono text-[13px]"
          style={{ color: '#D6FF3F', opacity: 0.85 }}
        >
          {project.tagline}
        </p>

        <p
          className="font-mono text-[10px] uppercase tracking-wider"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          {project.category}
        </p>
      </div>

      {/* Problem / Result / Role */}
      <div className="flex flex-col gap-4">
        {[
          { label: 'PROBLEM', text: project.problem },
          { label: 'RESULT', text: project.result },
          { label: 'ROLE', text: project.role },
        ].map(({ label, text }) => (
          <div key={label} className="flex flex-col gap-1">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: '#D6FF3F', opacity: 0.6 }}
            >
              {label}
            </span>
            <p className="font-mono text-[12px] leading-[1.65]" style={{ color: '#8A8A8A' }}>
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-5">
        {project.links.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="font-mono text-[11px] uppercase tracking-wider transition-all duration-150"
            style={{ color: '#D6FF3F' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )

  const visual = (
    <div
      className="relative"
      style={{ minHeight: '300px' }}
    >
      <ProjectImagePlaceholder name={project.name} number={project.number} />
    </div>
  )

  return (
    <motion.article
      className="card-hover grid"
      style={{
        gridTemplateColumns: '50% 50%',
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#0D0D0D',
        minHeight: '360px',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {project.reversed ? (
        <>
          {details}
          {visual}
        </>
      ) : (
        <>
          {visual}
          {details}
        </>
      )}
    </motion.article>
  )
}

export function SelectedWork() {
  return (
    <section className="w-full px-8 py-24">
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
            FEATURED WORK
          </h2>
          <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            [01]
          </span>
        </div>
        <span className="font-mono text-[11px] hidden md:block" style={{ color: '#8A8A8A' }}>
          SELECTED CASE STUDIES
        </span>
      </div>

      {/* Projects */}
      <div className="flex flex-col" style={{ gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>

      {/* View all */}
      <Link
        href="/work"
        className="mt-6 flex items-center justify-center w-full py-5 font-display font-extrabold transition-all duration-150"
        style={{
          fontSize: 'clamp(16px, 2.2vw, 22px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#F5F3EE',
          background: 'transparent',
          letterSpacing: '0.04em',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.background = '#D6FF3F'
          el.style.color = '#080808'
          el.style.borderColor = '#D6FF3F'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.background = 'transparent'
          el.style.color = '#F5F3EE'
          el.style.borderColor = 'rgba(255,255,255,0.1)'
        }}
      >
        VIEW ALL PROJECTS (11+) →
      </Link>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          article {
            grid-template-columns: 1fr !important;
          }
          article > div:first-child {
            min-height: 200px !important;
          }
        }
      `}</style>
    </section>
  )
}
