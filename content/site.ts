import type { Metadata } from 'next'

export const site = {
  name: 'Alex De Souza',
  title: 'Alex De Souza — Founder, Engineer & Product Builder',
  description:
    'Founder-led product platform for Alex De Souza: engineered systems, AI products, and high-leverage execution for ambitious teams.',
  url: 'https://alexsouza.dev',
  ogImage: '/opengraph-image',
  email: 'alexandre@impulsolead.com',
  location: 'Aveiro, Portugal',
  social: {
    github: 'https://github.com/AlexSouzaDev',
    linkedin: 'https://www.linkedin.com',
    x: 'https://x.com',
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
  { value: '02', label: 'Products brought to market' },
  { value: '2024', label: 'Founder transition into full-time build mode' },
  { value: '06', label: 'Technical certifications completed' },
] as const

export const capabilityPillars = [
  {
    eyebrow: 'Product strategy',
    title: 'Founder-level judgment, not ticket-level execution.',
    body: 'I turn unclear product ambition into a roadmap, system architecture, and shipping cadence that compounds instead of fragmenting.',
  },
  {
    eyebrow: 'Engineering systems',
    title: 'Interfaces, APIs, automation, and the operational spine underneath.',
    body: 'From premium frontends to resilient backend workflows, I care about speed, maintainability, and leverage in equal measure.',
  },
  {
    eyebrow: 'AI integration',
    title: 'Models are useful when they sharpen workflow, not when they decorate the pitch.',
    body: 'I design AI features around business outcomes: qualification, retrieval, decision support, and automation with clear product logic.',
  },
] as const

export const featuredProjects = [
  {
    slug: 'impulsolead',
    title: 'ImpulsoLead',
    category: 'AI workflow platform',
    summary:
      'A founder-built SaaS platform helping Brazilian real estate teams qualify, organize, and act on leads faster.',
    impact: 'Founder, product strategy, frontend, backend, AI systems',
    year: '2024 — Present',
    href: 'https://impulsolead.com',
  },
  {
    slug: 'impulsosearch',
    title: 'ImpulsoSearch',
    category: 'Search intelligence layer',
    summary:
      'An AI-assisted search layer designed to surface high-intent opportunities from fragmented real estate data sources.',
    impact: 'Search experience, retrieval design, data workflow architecture',
    year: '2024 — Present',
    href: 'https://impulsosearch.com',
  },
  {
    slug: 'founder-systems',
    title: 'Founder Systems',
    category: 'Internal leverage stack',
    summary:
      'Custom tooling across automation, ops, and product infrastructure to reduce manual drag and increase decision speed.',
    impact: 'Automation, data pipelines, internal tools, delivery systems',
    year: 'Ongoing',
    href: '/contact',
  },
] as const

export const timeline = [
  {
    year: '2020',
    title: 'Started coding with a bias toward shipping',
    body: 'Moved quickly from fundamentals into real builds, learning by putting work under pressure instead of leaving it in tutorial mode.',
  },
  {
    year: '2024',
    title: 'Founded ImpulsoLead',
    body: 'Focused on a market with urgency, signal, and room for better software: Brazilian real estate.',
  },
  {
    year: 'Now',
    title: 'Building with founder discipline',
    body: 'Balancing product ambition, engineering quality, and operational reality with a preference for systems that scale cleanly.',
  },
] as const

export const counters = [
  { value: 2, suffix: '+', label: 'Products in active market deployment' },
  { value: 6, suffix: '', label: 'Certifications across AI, security, and systems' },
  { value: 4, suffix: '+', label: 'Years turning ideas into working software' },
] as const

export const socialProof = [
  'Built from Portugal for a fast-moving Brazilian market.',
  'Combines founder strategy with hands-on product engineering.',
  'Comfortable at the intersection of interface, system, and AI workflow.',
] as const

export const workArchive = [
  {
    title: 'ImpulsoLead',
    type: 'Founder-led SaaS',
    year: '2024 — Present',
    description:
      'Lead handling, qualification, and workflow software for real estate operators who need speed without losing control.',
    href: 'https://impulsolead.com',
  },
  {
    title: 'ImpulsoSearch',
    type: 'AI search infrastructure',
    year: '2024 — Present',
    description:
      'Search and discovery infrastructure for sourcing opportunities from noisy, unstructured channels.',
    href: 'https://impulsosearch.com',
  },
  {
    title: 'AppleVault',
    type: 'Consumer product experiment',
    year: '2024',
    description:
      'A product exploration around device valuation, ownership history, and a sharper resale experience.',
    href: 'https://github.com/AlexSouzaDev',
  },
  {
    title: 'Inventory API',
    type: 'Backend system design',
    year: '2024',
    description:
      'Inventory architecture with transactional integrity, auditability, and practical developer ergonomics.',
    href: 'https://github.com/AlexSouzaDev',
  },
] as const

export const usesGroups = [
  {
    title: 'Build stack',
    items: [
      'Next.js, TypeScript, and React for product-facing interfaces.',
      'Python for backend workflows, automation, and AI orchestration.',
      'PostgreSQL and Redis for persistence, caching, and queue-friendly system design.',
    ],
  },
  {
    title: 'Daily environment',
    items: [
      'VS Code, Zsh, and a terminal-first workflow.',
      'Figma, Notion, and lightweight systems for thinking in public and shipping in sequence.',
      'TablePlus, Bruno, and GitHub for operational clarity.',
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
  'Founding engineer or early technical leadership roles',
  'Product partnerships where engineering quality changes the outcome',
  'Selective freelance work with clear scope and meaningful ambition',
] as const
