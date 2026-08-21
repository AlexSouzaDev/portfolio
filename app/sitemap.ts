import type { MetadataRoute } from 'next'
import { site, workArchive } from '@/content/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/work',
    '/about',
    '/uses',
    '/contact',
    ...workArchive.map((project) => `/work/${project.slug}`),
  ]

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route.startsWith('/work/') ? 0.6 : 0.8,
  }))
}
