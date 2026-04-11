import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical writing and case studies by Alex De Souza.',
}

export default function BlogPage() {
  return (
    <main>
      <section className="w-full px-8 py-24">
        <div
          className="flex items-baseline justify-between mb-12 pb-4"
          style={{ borderBottom: '2px solid #2A2A2A' }}
        >
          <h1
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: '#F0EBE0' }}
          >
            BLOG
          </h1>
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-wider"
            style={{ color: '#888880' }}
          >
            ← BACK
          </Link>
        </div>

        <div
          className="flex flex-col items-center justify-center py-32 gap-4"
        >
          <p
            className="font-display font-extrabold text-6xl"
            style={{ color: '#2A2A2A' }}
          >
            COMING SOON
          </p>
          <p className="font-mono text-[13px]" style={{ color: '#888880' }}>
            Technical writing and case studies — in progress.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
