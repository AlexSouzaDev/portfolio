import { site } from '@/content/site'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Founder, Engineer & Product Builder',
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Aveiro',
    addressCountry: 'Portugal',
  },
  sameAs: [site.social.github, site.social.linkedin, site.social.x],
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
