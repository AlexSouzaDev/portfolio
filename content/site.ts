import type { Metadata } from 'next'

export const site = {
  name: 'Alex De Souza',
  title: 'Alex De Souza — AI Engineer · Full-Stack · LLM Systems',
  description:
    'Alex De Souza — AI engineer and full-stack builder. I architect production LLM systems, multi-agent orchestration, and B2B SaaS. Founding engineer turned CTO at ImpulsoLead.',
  url: 'https://alexsouza.dev',
  ogImage: '/og.jpg',
  email: 'contact@alexsouza.dev',
  location: 'Aveiro, Portugal',
  role: 'Founding Engineer → CTO @ ImpulsoLead',
  social: {
    github: 'https://github.com/AlexSouzaDev',
    linkedin: 'https://www.linkedin.com/in/alex-desouza-',
  },
} as const

export function createMetadata(
  title?: string,
  description?: string,
  path = ''
): Metadata {
  const resolvedTitle = title
    ? `${title} | ${site.name}`
    : site.title
  const resolvedDescription = description ?? site.description
  const canonical = `${site.url}${path}`

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: site.name,
      type: 'website',
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [site.ogImage],
    },
  }
}

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/uses', label: 'Uses' },
  { href: '/contact', label: 'Contact' },
] as const

export const heroMetrics = [
  { value: '07', label: 'Professional certifications across AI, security & systems' },
  { value: '11', label: 'AI agent task types orchestrated in production' },
  { value: '2025', label: 'Joined ImpulsoLead — promoted to CTO within 6 months' },
] as const

export const capabilityPillars = [
  {
    eyebrow: 'Product & architecture',
    title: 'Engineering judgment, not ticket-level execution.',
    body: 'I turn unclear product ambition into system architecture and a shipping cadence that compounds. At ImpulsoLead I architected a multi-tenant B2B SaaS end to end and grew into the CTO seat.',
  },
  {
    eyebrow: 'Full-stack systems',
    title: 'Type-safe interfaces, resilient backends, and the operational spine underneath.',
    body: 'Next.js and tRPC on the front, FastAPI and async pipelines on BullMQ + Redis behind them. I care about speed, maintainability, and leverage in equal measure.',
  },
  {
    eyebrow: 'AI & LLM systems',
    title: 'Models earn their place when they sharpen the workflow.',
    body: 'I design multi-agent orchestration with LangGraph and the Claude SDK, RAG with pgvector, and the evaluation harnesses — faithfulness, safety, red-teaming — that keep them honest in production.',
  },
] as const

export const featuredProjects = [
  {
    slug: 'impulsolead',
    title: 'ImpulsoLead',
    category: 'B2B AI SaaS · CTO',
    summary:
      'Multi-tenant B2B SaaS for the Brazilian real-estate market, architected end to end (Next.js App Router, tRPC, Prisma, PostgreSQL). I designed a LangGraph + Claude agent layer spanning 11 task types for lead analysis, response generation, and campaign automation.',
    impact: 'Founding engineer → CTO · architecture, AI strategy, infrastructure',
    year: '2025 — Present',
    href: 'https://impulsolead.com',
  },
  {
    slug: 'craft',
    title: 'CRAFT',
    category: 'LLM research · Python',
    summary:
      'Causal Rationale Attribution Faithfulness Test — an open-source library that empirically checks whether an LLM agent’s stated reasoning actually drove its decision, using a randomized perturbation experiment with a placebo control. Zero runtime deps, mypy-clean, CI-ready CLI.',
    impact: 'Open-source library · randomized causal testing',
    year: '2026',
    href: 'https://github.com/AlexSouzaDev/craft',
  },
  {
    slug: 'red-agent',
    title: 'red-agent',
    category: 'AI safety · TypeScript',
    summary:
      'Adversarial stress-test harness that injects YAML-defined attacks into tool-using LLM agents and uses a Claude LLM-judge to classify compromise vs. safe refusal vs. detection. Covers 3 victim models, 5 attack categories, and 4 safety metrics, persisted via Prisma with a Next.js dashboard.',
    impact: 'Adversarial evaluation · multi-model benchmarking',
    year: '2026',
    href: 'https://github.com/AlexSouzaDev/red-agent',
  },
  {
    slug: 'treeport',
    title: 'treeport',
    category: 'Dev tooling · Python',
    summary:
      'Production CLI/library that runs AI coding agents (Claude Code, Aider, GPT-4o, Gemini) inside isolated Docker containers backed by git worktrees, then fast-forward merges the results. asyncio + Pydantic v2 + Typer, 5 backends, 48 passing tests.',
    impact: 'Open-source · 5 agent backends · most-starred repo',
    year: '2026',
    href: 'https://github.com/AlexSouzaDev/treeport',
  },
  {
    slug: 'cadre',
    title: 'CADRE',
    category: 'Multi-agent security · Python',
    summary:
      'Multi-agent SIEM testing whether LangGraph-orchestrated agents beat a monolithic LLM on threat-detection accuracy and cost. Ingests real intrusion datasets (CIC-IDS2017, UNSW-NB15), streams events over Redis, and gates response actions behind a tRPC human-approval UI.',
    impact: 'Research framework · agentic threat detection',
    year: '2026',
    href: 'https://github.com/AlexSouzaDev/CADRE',
  },
] as const

export const timeline = [
  {
    year: '2020',
    title: 'Started coding with a bias toward shipping',
    body: 'Moved quickly from fundamentals into real builds, learning by putting work under pressure instead of leaving it in tutorial mode.',
  },
  {
    year: '2022',
    title: 'Freelance software developer',
    body: 'Solo-delivered websites, full-stack apps, and REST APIs for local businesses and research projects across TypeScript, Python, PHP, and C# — from requirements through deployment and maintenance.',
  },
  {
    year: '2023',
    title: 'Computer programming at Universidade de Aveiro',
    body: 'Technical higher education (CTeSP) at ESTGA — systems & network programming, network security, algorithms, discrete mathematics, and databases.',
  },
  {
    year: '2025',
    title: 'Joined ImpulsoLead as founding engineer',
    body: 'Architected a multi-tenant B2B SaaS for the Brazilian real-estate market end to end — Next.js App Router, tRPC, Prisma, and PostgreSQL.',
  },
  {
    year: 'Now',
    title: 'Promoted to CTO within six months',
    body: 'Owning architecture, AI strategy, and infrastructure — including a LangGraph + Claude agent orchestration layer spanning 11 task types, on an async BullMQ + Redis pipeline.',
  },
] as const

export const counters = [
  { value: 7, suffix: '', label: 'Professional certifications across AI, security, and systems' },
  { value: 11, suffix: '', label: 'AI agent task types orchestrated in production at ImpulsoLead' },
  { value: 15, suffix: '+', label: 'Projects shipped across web, AI, ML, and systems' },
] as const

export const socialProof = [
  'Building from Portugal for a fast-moving Brazilian market.',
  'Founding engineer turned CTO — architecture, AI strategy, and infrastructure.',
  'Comfortable across interface, distributed systems, and multi-agent AI.',
] as const

export const workArchive = [
  {
    slug: 'impulsolead',
    title: 'ImpulsoLead',
    type: 'Fullstack AI SaaS · CTO',
    year: '2025 — Present',
    description:
      'Multi-tenant B2B SaaS for Brazilian real-estate teams. End-to-end architecture (Next.js, tRPC, Prisma, PostgreSQL), a LangGraph + Claude agent layer across 11 task types, dual payment gateway (Stripe + InfinitePay), and full i18n + LGPD compliance.',
    href: 'https://impulsolead.com',
    stack: ['Next.js', 'tRPC', 'Prisma', 'PostgreSQL', 'LangGraph', 'Claude', 'Stripe', 'InfinitePay'],
  },
  {
    slug: 'craft',
    title: 'CRAFT',
    type: 'LLM research library · Python',
    year: '2026',
    description:
      'Causal Rationale Attribution Faithfulness Test — empirically checks whether an LLM agent’s stated reasoning causally drove its decision via a randomized perturbation experiment with a placebo control. Zero runtime deps, mypy-clean, CI-ready CLI with a --fail-under gate.',
    href: 'https://github.com/AlexSouzaDev/craft',
    stack: ['Python', 'mypy', 'CLI'],
  },
  {
    slug: 'red-agent',
    title: 'red-agent',
    type: 'Adversarial LLM harness · TypeScript',
    year: '2026',
    description:
      'Stress-testing framework that injects YAML-defined attacks into tool-using agents and uses a Claude LLM-judge to classify compromise vs. safe refusal vs. detection. 3 victim models, 5 attack categories, 4 safety metrics, persisted via Prisma with a Next.js dashboard.',
    href: 'https://github.com/AlexSouzaDev/red-agent',
    stack: ['TypeScript', 'Claude', 'Prisma', 'Next.js', 'YAML'],
  },
  {
    slug: 'treeport',
    title: 'treeport',
    type: 'AI coding-agent orchestrator · Python',
    year: '2026',
    description:
      'Runs AI coding agents (Claude Code, Aider, GPT-4o, Gemini) inside isolated Docker containers backed by git worktrees, then fast-forward merges the results. asyncio + Pydantic v2 + Typer, 5 backends, 48 passing tests.',
    href: 'https://github.com/AlexSouzaDev/treeport',
    stack: ['Python', 'asyncio', 'Pydantic v2', 'Typer', 'Docker', 'git worktrees'],
  },
  {
    slug: 'cadre',
    title: 'CADRE',
    type: 'Multi-agent SIEM · Python',
    year: '2026',
    description:
      'Tests whether LangGraph-orchestrated agents outperform a monolithic LLM on threat-detection accuracy and cost. Ingests CIC-IDS2017 and UNSW-NB15, streams events over Redis, and gates response actions behind a sandboxed tRPC human-approval UI.',
    href: 'https://github.com/AlexSouzaDev/CADRE',
    stack: ['Python', 'LangGraph', 'Redis', 'tRPC'],
  },
  {
    slug: 'cardioml',
    title: 'cardioML',
    type: 'ML pipeline · Python',
    year: '2026',
    description:
      'Reproducible heart-disease classification benchmarking 5 classifiers with Optuna tuning, MLflow tracking, and SHAP explainability. Reaches 0.93 AUC-ROC with SMOTE applied correctly inside the training fold.',
    href: 'https://github.com/AlexSouzaDev/cardioML',
    stack: ['Python', 'Optuna', 'MLflow', 'SHAP', 'SMOTE'],
  },
  {
    slug: 'inventory-api',
    title: 'Inventory-API',
    type: 'Backend system design · FastAPI',
    year: '2025',
    description:
      'Enterprise inventory API with ACID-compliant stock transfers: deterministic row-locking, atomic decrements, and DB-trigger-enforced immutable audit logs. Clean Controller–Service–Repository architecture; full stack starts with one docker compose up.',
    href: 'https://github.com/AlexSouzaDev/Inventory-API',
    stack: ['FastAPI', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'applevault',
    title: 'AppleVault',
    type: 'Consumer product · TypeScript',
    year: '2025',
    description:
      'Instant iPhone resale valuation with a personal device vault. Next.js (App Router), Clerk auth, tRPC, Prisma, and Tailwind, with a real-time price formula gated behind authentication.',
    href: 'https://github.com/AlexSouzaDev/AppleVault',
    stack: ['Next.js', 'Clerk', 'tRPC', 'Prisma', 'Tailwind'],
  },
  {
    slug: 'n-body',
    title: 'n-body',
    type: 'Scientific computing · C++',
    year: '2026',
    description:
      'High-performance N-body gravitational simulator for the solar system, built in C++20 with symplectic integrators and real NASA ephemeris data.',
    href: 'https://github.com/AlexSouzaDev/n-body',
    stack: ['C++20', 'NASA ephemeris'],
  },
  {
    slug: 'impulsosearch',
    title: 'ImpulsoSearch',
    type: 'AI search infrastructure',
    year: '2024 — Present',
    description:
      'Search and discovery layer for sourcing high-intent opportunities from noisy, unstructured real-estate channels.',
    href: 'https://impulsosearch.com',
    stack: ['Search infrastructure'],
  },
  {
    slug: 'youralexandria',
    title: 'YourAlexandria',
    type: 'Personal library SaaS',
    year: '2025',
    description:
      'A tiered-subscription reading platform with EPUB and PDF rendering, annotation layers (quotes, bookmarks, notes), and per-user storage accounting. Built on Next.js 15, Drizzle ORM, Neon Postgres, Cloudflare R2, Clerk, and Stripe.',
    href: 'https://yoalexa-five.vercel.app',
    stack: ['Next.js 15', 'Drizzle ORM', 'Neon Postgres', 'Cloudflare R2', 'Clerk', 'Stripe'],
  },
] as const

export const education = {
  school: 'Universidade de Aveiro — ESTGA',
  program: 'Technical Higher Education (CTeSP), Computer Programming',
  location: 'Águeda, Portugal',
  period: '2023 — 2026',
  detail:
    'Coursework across systems & network programming, low-level systems, network security, algorithms, discrete mathematics, and databases.',
} as const

export const certifications = [
  { title: 'MLOps', issuer: 'Duke University' },
  { title: 'Generative AI for Growth Marketing', issuer: 'IBM' },
  { title: 'Full-Stack Developer', issuer: 'Microsoft' },
  { title: 'Cybersecurity Analyst', issuer: 'Microsoft' },
  { title: 'SQL', issuer: 'University of Colorado Boulder' },
  { title: 'Essential Mathematics for CS', issuer: 'University of London' },
  { title: 'Open Science 101', issuer: 'NASA' },
] as const

export const skillGroups = [
  {
    label: 'AI / ML',
    items: [
      'Anthropic Claude SDK',
      'LangGraph',
      'Multi-agent orchestration',
      'RAG',
      'Voyage AI embeddings',
      'pgvector',
      'MLOps',
      'SHAP',
      'Optuna',
      'MLflow',
    ],
  },
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'Java', 'C#', 'PHP', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'tRPC', 'FastAPI', 'Prisma', 'async SQLAlchemy', 'REST', 'BullMQ'],
  },
  {
    label: 'Frontend',
    items: ['Next.js (App Router)', 'React', 'Tailwind CSS'],
  },
  {
    label: 'Data & Infra',
    items: ['PostgreSQL', 'Redis', 'Docker', 'Nginx + PM2', 'Vercel', 'Clerk', 'Stripe'],
  },
] as const

export const usesGroups = [
  {
    title: 'Build stack',
    items: [
      'Next.js (App Router), TypeScript, React, and Tailwind for product-facing interfaces.',
      'tRPC and Prisma for end-to-end type safety; FastAPI and async SQLAlchemy for Python services.',
      'BullMQ + Redis for asynchronous pipelines, queues, and background AI tasks.',
    ],
  },
  {
    title: 'AI & LLM stack',
    items: [
      'Anthropic Claude SDK with LangGraph for multi-agent orchestration.',
      'RAG with Voyage AI embeddings and pgvector for semantic search.',
      'Evaluation harnesses for faithfulness, safety, and red-teaming before anything ships.',
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      'PostgreSQL and Redis for persistence, caching, and queues.',
      'Docker, Nginx + PM2, and Vercel for deployment.',
      'Clerk for authentication and Stripe for billing.',
    ],
  },
  {
    title: 'Operating principle',
    items: [
      'Tools matter less than reducing friction between idea, decision, and release.',
      'I optimize for leverage, not novelty for its own sake.',
    ],
  },
] as const

export const contactReasons = [
  'Senior or lead AI / full-stack engineering roles',
  'Product partnerships where engineering quality changes the outcome',
  'Selective freelance work with clear scope and meaningful ambition',
] as const

export const principles = [
  {
    title: 'Build for the real bottleneck',
    body: 'The right solution is rarely the flashiest one. I start with where time, trust, or decision quality is actually being lost.',
  },
  {
    title: 'Protect the system while moving quickly',
    body: 'Fast shipping matters. So does not creating future drag every time speed is required. I optimize for both.',
  },
  {
    title: 'Use AI with product logic',
    body: 'AI is valuable when it sharpens a workflow, qualifies intent, or increases operator leverage. Everything else is noise.',
  },
] as const
