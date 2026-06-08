import { site } from '@/content/site'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'CTO & AI Engineer',
  email: site.email,
  worksFor: {
    '@type': 'Organization',
    name: 'ImpulsoLead',
    url: 'https://impulsolead.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universidade de Aveiro',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Large Language Models',
    'Multi-agent systems',
    'Retrieval-Augmented Generation',
    'Full-stack engineering',
    'TypeScript',
    'Python',
    'Next.js',
    'LangGraph',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Aveiro',
    addressCountry: 'Portugal',
  },
  sameAs: [site.social.github, site.social.linkedin],
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  founder: site.name,
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  description: site.description,
}
