# Portfolio — Front-End Design Document

## 1. Stack Overview

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4 + custom CSS |
| Animations | Framer Motion 12 |
| Fonts | Syne (display) + JetBrains Mono (mono) |
| AI | Anthropic Claude SDK (`claude-sonnet-4-6`) |
| Email | Resend |
| Deployment | Vercel |

---

## 2. Directory Structure

```
portfolio/
├── app/
│   ├── layout.tsx               # Root layout — providers, fonts, metadata
│   ├── page.tsx                 # Home page (/)
│   ├── about/page.tsx           # About page
│   ├── work/page.tsx            # Work/projects page
│   ├── blog/page.tsx            # Blog placeholder
│   ├── uses/page.tsx            # Tools & setup page
│   ├── contact/page.tsx         # Contact page
│   ├── api/
│   │   ├── chat/route.ts        # Claude AI chat endpoint
│   │   └── contact/route.ts     # Contact form email endpoint
│   ├── globals.css              # Global styles, CSS variables, utilities
│   ├── robots.ts                # SEO robots.txt
│   ├── sitemap.ts               # Dynamic sitemap
│   └── opengraph-image.tsx      # Dynamic OG image (1200×630)
├── components/
│   ├── Nav.tsx                  # Responsive navigation
│   ├── CursorProvider.tsx       # Custom cursor
│   ├── PageTransition.tsx       # Route-change overlay animation
│   ├── ScrollProgress.tsx       # Top scroll progress bar
│   └── sections/
│       ├── Hero.tsx             # Split hero with rotating headline
│       ├── Marquee.tsx          # Infinite scrolling banner
│       ├── SelectedWork.tsx     # Project showcase grid
│       ├── AboutStrip.tsx       # Two-column about section
│       ├── Skills.tsx           # Three-column tech stack
│       ├── Certifications.tsx   # Three-column certifications
│       ├── TerminalChat.tsx     # AI chat terminal (server)
│       ├── TerminalChatClient.tsx # Client wrapper (dynamic import)
│       ├── Contact.tsx          # Contact form + channels
│       └── Footer.tsx           # Footer with last-commit info
├── lib/
│   └── utils.ts                 # clsx + tailwind-merge helper
└── public/
    ├── photo.jpg                # Hero photo
    └── icon.jpg                 # Favicon
```

---

## 3. Routes & Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Hero → Marquee → SelectedWork → AboutStrip → Skills → Certifications → TerminalChat → Contact → Footer |
| `/about` | `app/about/page.tsx` | Full bio: origin, journey, build philosophy, location, academics |
| `/work` | `app/work/page.tsx` | Project archive with 4 entries |
| `/blog` | `app/blog/page.tsx` | "Coming soon" placeholder |
| `/uses` | `app/uses/page.tsx` | Editor, terminal, machine, AI tools, apps, infrastructure |
| `/contact` | `app/contact/page.tsx` | Standalone contact form page |

---

## 4. Design System

### Color Palette

| Token | Variable | Hex | Use |
|-------|----------|-----|-----|
| Background | `--bg` | `#0D0D0D` | Page background |
| Surface | `--surface` | `#141414` | Cards, secondary backgrounds |
| Primary | `--primary` | `#F0EBE0` | Body text, headings |
| Secondary | `--secondary` | `#888880` | Muted labels, captions |
| Accent | `--accent` | `#FFE500` | CTAs, highlights, active states |
| Border | `--border` | `#2A2A2A` | Dividers, outlines |
| Danger | `--danger` | `#FF2D00` | Error states |
| Success | `--success` | `#00C853` | Success states |

### Typography

| Role | Font | Weights | Variable |
|------|------|---------|----------|
| Display / Headings | Syne | 400, 500, 700, 800 | `--font-syne` |
| Mono / Labels / Body | JetBrains Mono | 400, 500 | `--font-jetbrains` |

Both fonts are loaded from Google Fonts with `display: swap`.

### Custom Tailwind Extensions

```
colors: bg, surface, primary, secondary, accent, border, danger, success
fontFamily: display (Syne), mono (JetBrains Mono)
fontSize: label → 11px / letter-spacing: 0.12em
borderWidth: 3 → 3px
```

### Custom CSS Utilities (`globals.css`)

| Class | Purpose |
|-------|---------|
| `.custom-cursor` | 18px circular cursor, yellow border |
| `.scroll-progress` | 2px fixed top bar |
| `.noise-overlay` | SVG noise texture at 4% opacity |
| `.terminal-scroll` | Yellow scrollbar thumb on dark track |
| `.shadow-hard-accent` | Yellow-offset box shadow |
| `.card-hover` | Lift on hover (−3px + shadow) |
| `.cursor-blink` | Blinking text cursor |
| `.nav-link` | Clip-path underline slide animation |

---

## 5. Components

### Global UI

**`Nav.tsx`** — Client component, always mounted in layout.
- Desktop: fixed header with monogram, nav links, availability pill.
- Mobile: bottom drawer menu with slide-up animation.
- Active route highlighted with yellow underline.
- Availability status driven by `NEXT_PUBLIC_AVAILABLE` env var ("AVAILABLE FOR PROJECTS" or "BUSY BUILDING").

**`CursorProvider.tsx`** — Client component.
- Replaces OS cursor (`cursor: none` on `<html>`).
- 18px circle, yellow border, expands to 32px on `<a>` / `<button>` hover.
- Shows `+` symbol on link hover.
- Uses `MutationObserver` to track dynamically added elements.
- `aria-hidden="true"`.

**`PageTransition.tsx`** — Client component.
- Full-viewport yellow (`#FFE500`) stripe that slides in from left on route change and exits right.
- Duration: 0.4s, easing `[0.16, 1, 0.3, 1]`.

**`ScrollProgress.tsx`** — Client component.
- Fixed 2px yellow bar at top of viewport.
- Width interpolated from scroll position (passive listener).

---

### Home Page Sections (render order)

**`Hero.tsx`** — Client.
- 58/42 split: text left, photo right.
- Rotating headline words: "BUILDS." → "SHIPS." → "ARCHITECTS." → "SOLVES." (2.2s interval, Framer Motion fade-up/fade-down).
- CTAs: "SEE MY WORK" (yellow fill) + "GET IN TOUCH" (outlined).
- Data pills: links to live products and GitHub.
- Photo: grayscale + contrast by default, reverts to color on hover.
- Noise texture SVG overlay.
- Mobile: stacks vertically.

**`Marquee.tsx`**
- Yellow banner, dark text.
- Infinite horizontal scroll (25s CSS animation loop).
- Content: skills, certifications, locations, availability.

**`SelectedWork.tsx`** — Client.
- 4-project showcase: ImpulsoLead, ImpulsoSearch, AppleVault, Inventory-API.
- Alternating left/right image layout with 58/42 grid split.
- Tech badge pills per project.
- Scroll-triggered entry animations (`whileInView`, `once: true`).
- "VIEW ALL PROJECTS" CTA at bottom.

**`AboutStrip.tsx`** — Client.
- 50/50 split: pull quote left, 4 paragraphs right.
- Quote: *"I don't ship features. I ship products. There's a difference."*
- Staggered scroll-reveal animations.
- Mobile: stacks vertically with top border divider.

**`Skills.tsx`** — Client.
- 3-column grid: Core Stack / Infrastructure & AI / Currently Studying.
- 8–9 items per column.
- Staggered reveal on viewport entry.
- Section counter: `[04]`.

**`Certifications.tsx`** — Client.
- 3-column grid: AI/ML / Full-Stack & Data / Security.
- 6 certifications from Duke, IBM, Microsoft, UoL, CU Boulder.
- Each entry: institution + name + motivational quote.
- Section counter: `[03]`.

**`TerminalChat.tsx`** / **`TerminalChatClient.tsx`** — Client (dynamic import, `ssr: false`).
- Custom terminal UI with 3px border.
- macOS-style title bar (yellow, gray, dark dots).
- Initial "command" lines revealed with 80ms stagger.
- User types → sends to `/api/chat` → Claude replies in character.
- Blinking cursor during loading state.
- Max input: 500 characters.
- Custom yellow scrollbar.
- `aria-label="Terminal input — ask Alex anything"`.

**`Contact.tsx`** — Client.
- 50/50 split: form left, channels right.
- Fields: Name, Email, Message (500 char limit).
- States: idle → sending → sent / error.
- Live Lisbon time (WET timezone) displayed in real time.
- External channels: Email, LinkedIn, GitHub, ImpulsoLead.
- Submit button label updates on completion; error text in `--danger`.
- Mobile: stacks vertically.

**`Footer.tsx`** — Client.
- 3-column grid: brand info / sitemap links / build info.
- Dynamic copyright year.
- Last commit fetched from GitHub API: shows "X days ago" or "X hours ago".
- Links highlight to `--accent` on hover.
- Mobile: single column.

---

### UI / Experimental

**`ui/gooey-text-morphing.tsx`**
- Text morphing effect using SVG blur + threshold filter.
- Dual-layer animation: one text fades in while the other fades out for a "gooey" blend.
- Currently unused — placeholder for future enhancement.

---

## 6. Animations

| Effect | Mechanism | Details |
|--------|-----------|---------|
| Page transitions | Framer Motion | Yellow stripe, 0.4s, custom easing |
| Section reveals | Framer Motion `whileInView` | Opacity + Y-axis, `once: true` |
| Hero word rotation | Framer Motion | Fade-up swap, 2.2s interval |
| Marquee scroll | CSS `@keyframes marquee` | 25s linear infinite |
| Custom cursor | `requestAnimationFrame` | Smooth position tracking |
| Card lift | CSS | `translateY(-3px)` + box shadow |
| Nav underline | CSS `clip-path` | Slide-in on hover |
| Cursor blink | CSS `@keyframes blink` | 1s step-end infinite |
| Dot pulse | CSS `@keyframes pulse_dot` | Scale + opacity, 1.5s |
| Fade-up | CSS `@keyframes fade-up` | Opacity + Y, 0.3s cubic-bezier |

---

## 7. API Endpoints

### `POST /api/chat`

```
Body:    { message: string }   // max 500 chars
Returns: { reply: string }
Model:   claude-sonnet-4-6
Tokens:  200 max
```

Streams a response from Claude configured with a system prompt that describes Alex as the assistant's persona.

### `POST /api/contact`

```
Body:    { name: string, email: string, message: string }
Returns: { ok: true } | { error: string }
Service: Resend
To:      CONTACT_EMAIL env var (default: alexandre@impulsolead.com)
```

Validates field lengths (name/email: 200, message: 500) and email format before sending.

---

## 8. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_AVAILABLE` | No | `"true"` or `"false"` — nav availability status |
| `CONTACT_EMAIL` | No | Recipient for contact form emails |
| `RESEND_API_KEY` | Yes (contact form) | Resend service API key |
| `ANTHROPIC_API_KEY` | Yes (chat) | Claude API key |

---

## 9. Data Sources

All content is **hardcoded** in component files. There is no CMS or external data layer.

| Content | Location |
|---------|----------|
| Projects (home) | `SelectedWork.tsx` |
| Projects (archive) | `work/page.tsx` |
| Skills | `Skills.tsx` |
| Certifications | `Certifications.tsx` |
| About bio | `about/page.tsx` |
| Tools & uses | `uses/page.tsx` |
| Nav links | `Nav.tsx` |
| Contact channels | `Contact.tsx` |

**Dynamic data:**
- AI chat replies — Claude API at runtime.
- Last commit date — GitHub API fetched in `Footer.tsx`.
- Live clock — Lisbon WET timezone in `Contact.tsx`.
- OG image — generated at `/opengraph-image.tsx`.

---

## 10. Responsive Design

- Single breakpoint: `768px` (`md` in Tailwind).
- Layouts shift from 2–3 column grids to single column.
- Border dividers shift from left/right to top/bottom.
- Nav switches from fixed header to bottom drawer.
- Font sizes use `clamp()` for fluid scaling.
- Spacing: `px-8` → `px-6`, `py-24` → `py-12`.

---

## 11. SEO & Accessibility

- Dynamic sitemap (`sitemap.ts`) with `lastModified`, `changeFrequency`, `priority`.
- OpenGraph image dynamically generated (`opengraph-image.tsx`, 1200×630).
- Title template: `"Alex De Souza — %s | Founder & CTO"`.
- Custom cursor: `aria-hidden="true"`.
- Logo: `aria-label="Alex De Souza — Home"`.
- Terminal input: `aria-label="Terminal input — ask Alex anything"`.
- Marquee: `aria-label="Skills and identity marquee"`.
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<footer>`.
- External links: `rel="noopener noreferrer"`.

---

## 12. Performance

- `next/image` with `fill`, `sizes`, and `priority` for hero image.
- Google Fonts with `display: swap` to avoid FOIT.
- `TerminalChat` dynamically imported with `ssr: false` to avoid hydration overhead.
- Scroll listeners use `{ passive: true }`.
- Custom cursor updates via `requestAnimationFrame`.
- No runtime CSS-in-JS — all styles are statically extracted at build time.
