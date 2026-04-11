'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Project {
  number: string
  name: string
  category: string
  period: string
  description: string
  tech: string[]
  links: { label: string; href: string; external?: boolean }[]
  imageAlt: string
  imageSrc?: string
  reversed?: boolean
}

const PROJECTS: Project[] = [
  {
    number: '001',
    name: 'IMPULSOLEAD',
    category: 'AI SAAS PLATFORM / REAL ESTATE / B2B',
    period: '2024 — PRESENT',
    description:
      'AI-powered B2B SaaS for real estate agents in Brazil. Combines AI agents, ad automation, and lead management in a single platform built on Next.js, TypeScript, and the Anthropic Claude SDK. Currently in production, serving agents managing high-volume lead pipelines.',
    tech: ['Next.js', 'TypeScript', 'Anthropic SDK', 'PostgreSQL', 'Redis', 'BullMQ', 'Prisma', 'Clerk', 'tRPC'],
    links: [
      { label: 'VISIT IMPULSOLEAD.COM ↗', href: 'https://impulsolead.com', external: true },
    ],
    imageAlt: 'ImpulsoLead dashboard screenshot',
    reversed: false,
  },
  {
    number: '002',
    name: 'IMPULSOSEARCH',
    category: 'AI SEARCH / SAAS / PRODUCT SUITE',
    period: '2024 — PRESENT',
    description:
      'The second product in the ImpulsoLead suite. An AI-powered search layer built to surface relevant real estate leads from unstructured data sources. Ships as a standalone product under the same brand architecture.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Anthropic SDK'],
    links: [
      { label: 'VISIT IMPULSOSEARCH.COM ↗', href: 'https://impulsosearch.com', external: true },
    ],
    imageAlt: 'ImpulsoSearch interface screenshot',
    reversed: true,
  },
  {
    number: '003',
    name: 'APPLEVAULT',
    category: 'CONSUMER APP / REAL-TIME PRICING / FULL-STACK',
    period: '2024',
    description:
      'Instant iPhone resale valuation with a personal vault. Real-time price formula based on model, capacity, condition, and battery health. Built with Next.js App Router, Clerk auth, tRPC, and Prisma.',
    tech: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'Clerk', 'Tailwind'],
    links: [
      { label: 'VIEW SOURCE ↗', href: 'https://github.com/AlexSouzaDev', external: true },
      { label: 'CASE STUDY ↗', href: '/work#applevault' },
    ],
    imageAlt: 'AppleVault valuation interface',
    reversed: false,
  },
  {
    number: '004',
    name: 'INVENTORY-API',
    category: 'ENTERPRISE API / PYTHON / BACKEND SYSTEMS',
    period: '2024',
    description:
      'Enterprise-grade inventory management API. ACID-compliant stock transfers, immutable audit log, clean Controller–Service–Repository architecture, Dockerized and documented. Demonstrates backend rigor independent of the JavaScript ecosystem.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    links: [
      { label: 'VIEW SOURCE ↗', href: 'https://github.com/AlexSouzaDev', external: true },
    ],
    imageAlt: 'Inventory API architecture diagram',
    reversed: true,
  },
]

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-[11px] px-2 py-1 inline-block"
      style={{
        border: '1px solid #2A2A2A',
        color: '#888880',
        borderRadius: '3px',
      }}
    >
      #{label}
    </span>
  )
}

function ProjectImagePlaceholder({ alt, name }: { alt: string; name: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: '#0A0A0A' }}
      aria-label={alt}
    >
      <div
        className="font-display font-extrabold text-4xl mb-4 select-none"
        style={{ color: '#FFE500', opacity: 0.15 }}
      >
        {name}
      </div>
      <div
        className="font-mono text-[11px] uppercase tracking-widest"
        style={{ color: '#2A2A2A' }}
      >
        SCREENSHOT COMING SOON
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const imageColumn = (
    <div
      className="relative aspect-video md:aspect-auto"
      style={{ minHeight: '280px' }}
    >
      <ProjectImagePlaceholder alt={project.imageAlt} name={project.name} />
    </div>
  )

  const detailsColumn = (
    <div
      className="flex flex-col justify-center gap-4 p-10"
      style={{
        borderLeft: project.reversed ? 'none' : '2px solid #2A2A2A',
        borderRight: project.reversed ? '2px solid #2A2A2A' : 'none',
      }}
    >
      <p className="font-mono text-[11px]" style={{ color: '#888880' }}>
        {project.number}
      </p>
      <h3
        className="font-display font-extrabold leading-tight"
        style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#F0EBE0' }}
      >
        {project.name}
      </h3>
      <p className="font-mono text-[11px] uppercase" style={{ color: '#888880' }}>
        {project.category}
      </p>
      <p className="font-mono text-[11px]" style={{ color: '#888880' }}>
        {project.period}
      </p>
      <p className="font-mono text-[13px] leading-relaxed" style={{ color: '#888880' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-2">
        {project.links.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="font-mono text-[12px] uppercase tracking-wider transition-colors duration-[120ms]"
            style={{ color: '#FFE500' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )

  return (
    <motion.div
      className="card-hover grid"
      style={{
        gridTemplateColumns: '58% 42%',
        border: '2px solid #2A2A2A',
        minHeight: '340px',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {project.reversed ? (
        <>
          {detailsColumn}
          {imageColumn}
        </>
      ) : (
        <>
          {imageColumn}
          {detailsColumn}
        </>
      )}
    </motion.div>
  )
}

export function SelectedWork() {
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
          SELECTED WORK
        </h2>
        <span className="font-mono text-[11px]" style={{ color: '#888880' }}>
          [01]
        </span>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-0">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.number} project={project} />
        ))}
      </div>

      {/* View all link */}
      <Link
        href="/work"
        className="mt-8 flex items-center justify-center w-full py-6 font-display font-extrabold transition-all duration-[120ms]"
        style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          border: '2px solid #F0EBE0',
          color: '#F0EBE0',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.background = '#FFE500'
          el.style.color = '#0D0D0D'
          el.style.borderColor = '#FFE500'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.background = 'transparent'
          el.style.color = '#F0EBE0'
          el.style.borderColor = '#F0EBE0'
        }}
      >
        VIEW ALL PROJECTS (11+) →
      </Link>
    </section>
  )
}
