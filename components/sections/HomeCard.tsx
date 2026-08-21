import { Card } from '@/components/print/Card'
import { site } from '@/content/site'

/** The calling card. One viewport, corners and centre, nothing else. */
export function HomeCard() {
  return (
    <section className="grid min-h-[calc(100svh-4.5rem)] place-items-center px-[var(--gutter)] py-10">
      <div className="w-full max-w-[62rem]">
        <div className="press-in">
          <Card
            mark={<>Est.&nbsp;2020</>}
            firm={
              <>
                <span className="sc block text-[clamp(1.05rem,2.1vw,1.7rem)] font-medium leading-tight tracking-[0.055em]">
                  ImpulsoLead
                </span>
                <span className="sc mt-0.5 block text-[clamp(0.72rem,1.15vw,0.94rem)] tracking-[0.09em]">
                  Artificial Intelligence &amp; Platform Engineering
                </span>
              </>
            }
            foot={
              <>
                {site.location} &nbsp;&middot;&nbsp;
                <a href={`mailto:${site.email}`} className="ink-bleed">
                  {site.email}
                </a>{' '}
                &nbsp;&middot;&nbsp;
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="ink-bleed"
                >
                  github AlexSouzaDev
                </a>
              </>
            }
          >
            <h1 className="m-0 text-[clamp(1.65rem,4.6vw,3.6rem)] font-medium leading-[1.06] tracking-[0.012em]">
              <span className="sc tracking-[0.045em]">Alex</span> DE SOUZA
            </h1>
            <p className="sc m-0 mt-1 text-[clamp(1.05rem,2.4vw,1.85rem)] tracking-[0.07em]">
              Chief Technology Officer
            </p>
          </Card>
        </div>

        <p className="figures-lining mx-auto mt-6 flex max-w-[62rem] flex-wrap justify-between gap-4 font-mono text-micro uppercase text-ink-soft">
          <span>
            <span className="mr-2 inline-block h-[0.42em] w-[0.42em] rounded-full bg-seal align-[0.12em]" />
            Open to senior AI &amp; full-stack engineering work
          </span>
          <span>LLM systems &middot; multi-agent orchestration &middot; B2B SaaS</span>
        </p>
      </div>
    </section>
  )
}
