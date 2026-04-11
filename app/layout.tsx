import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { CursorProvider } from '@/components/CursorProvider'
import { ScrollProgress } from '@/components/ScrollProgress'
import { PageTransition } from '@/components/PageTransition'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Alex De Souza — Founder & CTO | ImpulsoLead',
    template: 'Alex De Souza — %s | Founder & CTO',
  },
  description:
    'Alex De Souza is a Founder, CTO, and full-stack AI engineer based in Portugal building AI-powered SaaS products for the real estate market.',
  metadataBase: new URL('https://alexsouza.dev'),
  openGraph: {
    title: 'Alex De Souza — Founder & CTO',
    description:
      'Alex De Souza is a Founder, CTO, and full-stack AI engineer based in Portugal building AI-powered SaaS products for the real estate market.',
    url: 'https://alexsouza.dev',
    siteName: 'Alex De Souza',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex De Souza — Founder & CTO',
    description:
      'Alex De Souza is a Founder, CTO, and full-stack AI engineer based in Portugal building AI-powered SaaS products for the real estate market.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <CursorProvider />
        <ScrollProgress />
        <Nav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
