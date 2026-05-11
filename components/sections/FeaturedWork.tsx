'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FadeIn } from '@/components/motion/FadeIn'
import { featuredProjects } from '@/content/site'
import { cn } from '@/lib/utils'

export function FeaturedWork() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-0 flex items-end justify-between border-b border-[var(--line)] pb-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
            Selected Work
          </p>
          <span className="text-[11px] tracking-[0.18em] text-[var(--muted)]">
            0{featuredProjects.length} Projects
          </span>
        </FadeIn>

        <div>
          {featuredProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

type Project = (typeof featuredProjects)[number]

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <FadeIn delay={index * 0.07}>
      <Link
        href={project.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor-label="OPEN"
        className="group block border-b border-[var(--line)] py-8 transition-colors duration-300 hover:border-[var(--text)]/20"
      >
        <div className="flex items-start gap-5 sm:gap-10">
          <span className="mt-1 shrink-0 text-[11px] tracking-[0.18em] text-[var(--muted)]">
            {num}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--text)] transition-colors sm:text-3xl lg:text-4xl">
              {project.title}
            </h3>
            <div
              className={cn(
                'overflow-hidden transition-all duration-500',
                hovered ? 'max-h-24 mt-3 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="text-sm leading-7 text-[var(--muted)]">{project.summary}</p>
            </div>
          </div>

          <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              {project.category}
            </span>
            <span className="text-[11px] text-[var(--muted)]/50">{project.year}</span>
          </div>

          <span className="mt-1 shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </div>
      </Link>
    </FadeIn>
  )
}
