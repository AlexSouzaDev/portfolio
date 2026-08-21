import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { createMetadata } from '@/content/site'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { personSchema, organizationSchema, websiteSchema } from '@/lib/schema'

/* EB Garamond, self-hosted.
   Google's CDN subsets `smcp` and `onum` out of this family — the
   whole brand depends on them, so these are the full variable files
   subset locally with the layout features preserved. */
const garamond = localFont({
  src: [
    {
      path: '../assets/fonts/EBGaramond.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EBGaramond-Italic.woff2',
      weight: '400 800',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Garamond', 'Times New Roman', 'serif'],
})

/* IBM Plex Mono — technical strings only. */
const plexMono = localFont({
  src: [
    {
      path: '../assets/fonts/IBMPlexMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/IBMPlexMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
})

export const metadata: Metadata = {
  ...createMetadata(),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${garamond.variable} ${plexMono.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  )
}
