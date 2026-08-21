import { SectionHead } from '@/components/print/SectionHead'
import { Register, RegisterRow } from '@/components/print/Register'
import { featuredProjects } from '@/content/site'

/** The index. A ruled register — year in the margin, entry beside it. */
export function WorkIndex() {
  return (
    <section className="mx-auto max-w-sheet px-[var(--gutter)] py-[clamp(3.5rem,8vw,7rem)]">
      <SectionHead
        mark="01 — Index"
        title="Selected work"
        sub={`${featuredProjects.length} entries`}
      />

      <Register>
        {featuredProjects.map((project, i) => (
          <RegisterRow
            key={project.slug}
            entry={project.year}
            href={`/work/${project.slug}`}
            delay={i * 60}
          >
            <h3 className="sc m-0 text-[clamp(1.15rem,2.4vw,1.6rem)] font-medium">
              {project.title}
            </h3>
            <p className="sc mt-0.5 text-[0.82rem] text-ink-soft">
              {project.category}
            </p>
            <p className="mt-2 text-[0.94em] leading-relaxed text-ink-soft">
              {project.summary}
            </p>
          </RegisterRow>
        ))}
      </Register>
    </section>
  )
}
