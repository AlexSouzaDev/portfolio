# alexsouza.dev — Design Document

The site is a **stationery suite**. Every route is a different printed
document issued by the same house, set from the same case of type. The
source artefact is the Pierce & Pierce calling card from *American
Psycho* — bone stock, one ink, true small caps, oldstyle figures, and
about two thirds of the surface left empty.

---

## 1. Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router), `output: 'export'` |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Motion | CSS transitions + IntersectionObserver. **No animation library.** |
| Typefaces | EB Garamond (variable, self-hosted) · IBM Plex Mono (self-hosted) |
| Hosting | Apache, static files, `public/.htaccess` |

Runtime dependencies are `next`, `react`, `react-dom`, `clsx`,
`tailwind-merge`. Nothing else.

There are **no API routes** — the export is fully static.

---

## 2. Content model

Nearly all copy lives in [`content/site.ts`](content/site.ts) as typed
`as const` exports. Components are thin renderers over them. To change
what the site says, edit that file.

| Export | Feeds |
|--------|-------|
| `site` | metadata, schema, footer, card foot |
| `navItems` | running head |
| `featuredProjects` | home index (5 entries) |
| `workArchive` | `/work` index and every `/work/[slug]` case file (11 entries) |
| `capabilityPillars` | home "Practice" |
| `timeline` | "Record" register (home + about) |
| `counters` | "Figures" |
| `principles` | about — operating principles |
| `skillGroups`, `education`, `certifications` | about |
| `usesGroups` | `/uses` |
| `contactReasons` | reply card |

`heroMetrics` and `socialProof` are legacy and unused.

Each `workArchive` entry carries `slug`, `title`, `type`, `year`,
`description`, `href`, and `stack[]`. Case files are generated from
these via `generateStaticParams`.

---

## 3. Routes

| Route | Document |
|-------|----------|
| `/` | The calling card — one viewport, then index, practice, record, figures, reply |
| `/work` | The index — a ruled register of all 11 entries |
| `/work/[slug]` | The case file — a memo header over a typeset write-up |
| `/about` | Letterhead, then record, principles, case, education, certifications |
| `/uses` | The specification sheet |
| `/contact` | The reply card |

`/blog` was retired. If notes ship later, the route is `/notes` and it
launches with real content — never a "coming soon" plate.

---

## 4. The stock (palette)

Single committed theme. A letterpress card has no dark mode.

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | `#EAE4D8` | page ground |
| `--paper-lift` | `#F2EDE3` | card face |
| `--paper-shade` | `#DBD4C4` | impression, soft borders |
| `--rule` | `#C4BCA8` | hairlines |
| `--ink-soft` | `#665F53` | secondary text — 4.99:1 on paper (AA) |
| `--ink` | `#1E1C18` | body, headings — 13.4:1 (AAA) |
| `--seal` | `#6B2223` | rationed. four uses. |

**Seal is the only chromatic colour in the system.** It appears on the
availability dot, link hover, focus rings, and error text. Nowhere else.
If it starts showing up on buttons and headings, the system has failed.

---

## 5. The case (type)

Both families are **self-hosted from `assets/fonts/`**.

> Google Fonts' CDN subsets `smcp` and `onum` **out** of EB Garamond —
> verified against `v33`, whose GSUB carries only `dnom frac liga locl
> numr pnum rlig tnum`. The whole brand depends on those two features,
> so the fonts here are the full variable binaries from `google/fonts`,
> subset locally with the layout features preserved. Do not "simplify"
> this back to `next/font/google`.

| Role | Face | Notes |
|------|------|-------|
| Everything | EB Garamond variable 400–800 + italic | `smcp`, `onum`, `lnum`, `tnum`, `c2sc` |
| Technical strings | IBM Plex Mono 400 / 500 | file paths, stacks, dates, status |

### Rules

- **Small caps:** `font-variant-caps: small-caps` on **mixed-case** text.
  Never combine with `text-transform: uppercase` — the feature has
  nothing left to substitute and the effect is lost. Use `.sc`, which
  also applies the required `0.085em` tracking.
- **Figures:** oldstyle in running text (the `body` default); lining +
  tabular in anything that forms a column (`.figures-lining`, `table`).
- **Size floor:** nothing below 15px is set in Garamond — its x-height
  is small and its hairlines go fragile. Micro-labels are mono.
- **Body size:** `clamp(17.5px, 1.05vw, 19.5px)`. 16px is too small here.
- **Deboss:** `.deboss` only on display sizes on paper. Never on body
  copy, never on the mono face. One notch too far and it is 2008 emboss.

---

## 6. Layout

- Card format is **1.75:1** (3.5×2in) — used for the home hero and every
  case-file header. The format is a brand asset.
- Page gutter `clamp(1.5rem, 5vw, 5.5rem)`; sheet width `82rem`.
- Section padding `clamp(3.5rem, 8vw, 7rem)`.
- Body measure `68ch`, hard.
- Hairlines are 1px in `--rule`. **Nothing is rounded** — there are no
  rounded corners in letterpress — and there are no box shadows anywhere
  except the card itself.

---

## 7. Motion

Five named movements. **Governing rule: content is visible in the HTML
by default.** Animation adds to a rendered page; it never gates one.

| Movement | Mechanism |
|----------|-----------|
| Impression | `.press` — opacity + `scale(1.006)`, 720ms |
| Rule draw | `.rule-draw` — `scaleX(0→1)` from left origin, 620ms |
| Ink bleed | `.ink-bleed` — underline grows from centre, 320ms |
| Plate change | `.plate` on `app/template.tsx` — 380ms, pure CSS |
| Figure set | `Figure` — count in oldstyle figures, rAF, 1400ms |

`components/motion/Press.tsx` applies the `[data-press]` pre-state **on
the client, only to elements that start below the fold**, and always
releases it — via IntersectionObserver, or a 4-second failsafe. So:
nothing flashes, nothing scrolled past is stranded invisible, and a page
without JS is a page that reads.

One easing curve site-wide: `cubic-bezier(0.22, 0.61, 0.36, 1)`. Only
`transform` and `opacity` animate — never `filter`, never layout
properties. `prefers-reduced-motion` collapses everything to instant.

### Deliberately absent

Custom cursors, spotlight layers, magnetic buttons, marquees, scramble
text, tilt cards, gooey morphing, blur reveals, page-transition sweeps.
All of these were in the previous build. None belong here.

---

## 8. Components

```
components/
├── layout/     SiteChrome · SiteNav (running head) · SiteFooter (colophon)
├── print/      Card · SectionHead · Register/RegisterRow · PageHead · Figure
├── motion/     Press
└── sections/   HomeCard · WorkIndex · Disciplines · Journey · Numbers
                ReplyCard · ReplyForm
```

`SiteNav`, `SiteFooter` and every `print/` part except `Figure` are
server components. The only client components are `Press`, `Figure` and
`ReplyForm`.

---

## 9. The reply card

`ReplyCard` renders a real form when `NEXT_PUBLIC_FORM_ENDPOINT` is set
at build time (Formspree, Web3Forms, or similar), and the engraved
address block with a `mailto:` when it is not. Static export means there
is no server route to post to; this is the seam where one gets added.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_FORM_ENDPOINT` | No | Form POST endpoint. Unset → mailto. |

---

## 10. SEO & accessibility

- JSON-LD (Person, Organization, WebSite) in [`lib/schema.ts`](lib/schema.ts).
- `app/sitemap.ts` covers the five pages plus all 11 case files.
- Open Graph image is a static `public/og.jpg` (1200×630) — the calling
  card, rendered in the real typeface.
- Favicon `app/icon.png` — the Garamond `A`.
- Contrast verified: ink 13.4:1, ink-soft 4.99:1, seal 8.8:1 on paper.
- Focus rings are a 1px seal outline at 4px offset, on every interactive
  element.
- `scroll-padding-top: 5rem` keeps anchor targets clear of the running head.

---

## 11. Gotchas

- **Never run `next build` while `next dev` is running** on this repo —
  it rewrites `.next` underneath the dev server and every page loses its
  CSS until you restart.
- **Alpha modifiers do not work on the colour tokens.** They are
  `var(--x)` values, so `bg-paper/95` produces an invalid colour and
  renders transparent. Use the solid token. (This is how the running
  head shipped invisible during the rebuild.)
- `:where(main, header, footer)` sets `position: relative; z-index: 1`
  to lift content above the fixed grain overlay. It uses `:where()` so
  its zero specificity never fights a positioning utility like `sticky`.
