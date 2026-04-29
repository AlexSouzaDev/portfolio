import type { Metadata } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { createMetadata } from '@/content/site'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { personSchema, organizationSchema, websiteSchema } from '@/lib/schema'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html lang="en" className={`${sora.variable} ${mono.variable}`}>
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
