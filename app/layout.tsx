import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { createMetadata } from '@/content/site'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { personSchema, organizationSchema, websiteSchema } from '@/lib/schema'

const hemingway = localFont({
  src: '../assets/fonts/Heming Variable.ttf',
  variable: '--font-sans',
  display: 'swap',
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
    <html lang="en" className={hemingway.variable}>
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
