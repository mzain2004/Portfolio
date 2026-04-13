# Design Document — Portfolio Redesign

## Overview

This document describes the technical design for redesigning Muhammad Zain's Next.js 15 portfolio. The redesign repositions the site as a security-founder brand with Phish-Slayer as the narrative centerpiece. The work involves restructuring the page layout, deleting three obsolete sections, creating one new component (`PhishSlayerSpotlight`), updating five existing components, and resolving all build/dependency issues.

The stack is unchanged: Next.js 15 (App Router), React 19, Tailwind CSS v4, `motion` (Framer Motion), `lucide-react`, TypeScript. No new dependencies are introduced.

---

## Architecture

The application is a single-page Next.js 15 app. All sections are rendered server-side in `app/page.tsx` and hydrated client-side. Client components are marked `"use client"` where they use hooks or browser APIs.

```mermaid
graph TD
  A[app/page.tsx] --> B[Navbar]
  A --> C[HeroSection]
  A --> D[AboutSection]
  A --> E[PhishSlayerSpotlight]
  A --> F[SelectedWork]
  A --> G[LiveStats]
  A --> H[Contact]
  A --> I[Footer]
  A --> J[AuroraBackground]
  A --> K[ParticleNetwork]
  A --> L[CustomCursor]
  E --> M[config/site.ts]
  H --> M
  G --> N[/api/github]
```

**Section render order** (matches DOM order in `page.tsx`):
1. `<CustomCursor />` — fixed overlay
2. `<AuroraBackground />` — fixed canvas
3. `<ParticleNetwork />` — fixed canvas
4. `<Navbar />` — fixed top bar
5. `<HeroSection />` — `id="hero"`
6. `<AboutSection />` — `id="about"`
7. `<PhishSlayerSpotlight />` — `id="phish-slayer"`
8. `<SelectedWork />` — `id="work"`
9. `<LiveStats />` — wrapped in a `<section>` with `id="stats"`
10. `<Contact />` — `id="contact"`
11. `<Footer />`

**Deleted components** (files removed, imports purged from `page.tsx`):
- `components/Services.tsx`
- `components/StrategicEducation.tsx`
- `components/OperationalHistory.tsx`

---

## Components and Interfaces

### `config/site.ts` (updated)

Adds `phishSlayerUrl` and an `email` field alongside existing socials.

```ts
export const siteConfig = {
  phishSlayerUrl: "https://phishslayer.tech",
  email: "mzain@phishslayer.tech",
  socials: [
    { name: "GitHub",     href: "https://github.com/mzain2004/",           iconName: "github"   },
    { name: "LinkedIn",   href: "https://www.linkedin.com/in/mzain-founder/", iconName: "linkedin" },
    { name: "X (Twitter)",href: "https://x.com/mzain2004",                 iconName: "twitter"  },
  ],
};
```

---

### `app/globals.css` (updated)

Adds JetBrains Mono import and a `--font-mono` theme variable. Accent color `#4ade80` is used via Tailwind's `green-400` utility class throughout components — no custom CSS variable needed.

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=Instrument+Serif:italic&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

@theme {
  --font-sans:  "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-barlow:"Barlow", ui-sans-serif, system-ui, sans-serif;
  --font-instrument: "Instrument Serif", ui-serif, Georgia, serif;
  --font-mono:  "JetBrains Mono", ui-monospace, monospace;
}
```

---

### `app/layout.tsx` (updated — OG metadata)

**Changes:**
- Export a Next.js `Metadata` object with the following fields:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Zain — Security Founder",
  description: "20-year-old solo founder building production AI security infrastructure. Creator of Phish-Slayer.",
  openGraph: {
    title: "Muhammad Zain — Security Founder",
    description: "20-year-old solo founder building production AI security infrastructure. Creator of Phish-Slayer.",
    url: "https://mzain.me",
    siteName: "mzain.me",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Zain — Security Founder",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zain — Security Founder",
    description: "20-year-old solo founder building production AI security infrastructure. Creator of Phish-Slayer.",
    images: ["/og-image.png"],
  },
};
```

- A static OG image (`/public/og-image.png`) at 1200×630px must exist. If one does not exist, create a simple dark-background image with the name and title as text — or use a placeholder that can be replaced later.

---

### `app/page.tsx` (updated)

Removes `Services`, `StrategicEducation`, `OperationalHistory` imports and JSX. Adds `PhishSlayerSpotlight`. Reorders sections per spec.

```tsx
// Removed imports: Services, StrategicEducation, OperationalHistory
// Added import: PhishSlayerSpotlight
```

---

### `components/Navbar.tsx` (updated)

**Changes:**
- Nav links updated to: `About` → `#about`, `Work` → `#work`, `Contact` → `#contact`
- Right-side CTA changes from "Contact" to "Visit Phish-Slayer" linking to `siteConfig.phishSlayerUrl` (opens in new tab)
- CTA style: ghost button — transparent fill, `border border-green-400/40`, `text-green-400`, `hover:shadow-[0_0_12px_rgba(74,222,128,0.3)]`
- Scroll-aware background: `useScrollY` hook — at `scrollY > 20` apply `bg-zinc-900/70 backdrop-blur-xl`, else `bg-transparent`
- Mobile: hamburger icon (`Menu` from lucide-react) replaces nav links below `md`
- Mobile drawer: slides in from right, contains nav links + CTA, closes on outside click or `Escape` key

**Props/State:**
```ts
const [scrolled, setScrolled] = useState(false);
const [drawerOpen, setDrawerOpen] = useState(false);
```

---

### `components/HeroSection.tsx` (updated)

**Changes:**
- Remove portrait image layout — replace with pure typographic hero
- Headline structure (three lines):
  - Line 1: `<span className="font-mono text-sm text-zinc-400 tracking-widest uppercase">Founder & Security Engineer</span>`
  - Line 2: large white text `"Building the future"`
  - Line 3: gradient/accent text `"of threat intelligence."` — `bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent`
- Subtext: exact copy `"Phish-Slayer — an AI-powered SOC SaaS — is live in production on Azure, built solo from the ground up."` — `text-zinc-300 max-w-lg`
- Two CTAs: `"See My Work"` (primary, conic-gradient border) scrolls to `#work`; `"View Phish-Slayer"` (ghost) links to `siteConfig.phishSlayerUrl`
- Scroll indicator: animated bouncing chevron-down at bottom center using `motion` `y` keyframes
- Parallax: `useScroll` + `useTransform` on headline `y` (existing pattern, kept)
- Remove `Download CV` button (not in requirements)
- Remove portrait `<img>` and right-side social links column

---

### `components/AboutSection.tsx` (updated)

**Changes:**
- Two-column layout on `md+`: left = bio paragraph, right = credential list
- Bio copy: age 20, Air University Multan, cybersecurity focus, founder mindset, interests (history, cricket, cars, nature photography)
- Credentials rendered as a list, each item prefixed with a monospace ordinal (`font-mono text-green-400`):
  ```
  01 / BS Cybersecurity — Air University Multan (Semester 4)
  02 / Founder — Phish-Slayer (Live in Production)
  03 / Oracle Cloud Infrastructure 2025 Certified
  04 / Location: Multan, Pakistan
  ```
- Staggered `whileInView` animation on credential items

---

### `components/PhishSlayerSpotlight.tsx` (new)

**Purpose:** Full-width section showcasing Phish-Slayer as the flagship product.

**Layout:** Dark card (`bg-zinc-900/50 border border-green-400/20 rounded-3xl`) with a split layout — left description panel, right feature highlights panel.

**Left panel content:**
- Section label: `"01 / Flagship Product"` in monospace green
- Heading: `"Phish-Slayer"` large, white
- Subheading: `"AI Threat Intelligence & EDR SaaS"`
- Description: production-deployed on Azure UAE North, Docker + Nginx + SSL, built entirely on student and free-tier resources
- CTA: `"Visit Phish-Slayer →"` — href sourced from `siteConfig.phishSlayerUrl`, opens in new tab, styled with green accent border

**Right panel content (feature highlights):**
Each row: lucide-react icon + label text

| Icon | Label |
|------|-------|
| `Shield` | AI-powered phishing detection |
| `Zap` | Real-time threat intelligence |
| `Monitor` | EDR capabilities |
| `Cloud` | Production Azure deployment |
| `User` | Built solo from scratch |

**Animation:** Left panel `x: -40 → 0`, right panel `x: 40 → 0`, both `opacity: 0 → 1`, `whileInView`, spring transition.

**Interface:**
```ts
// No props — self-contained, reads from siteConfig
export default function PhishSlayerSpotlight(): JSX.Element
```

---

### `components/SelectedWork.tsx` (updated)

**Changes:**
- Remove Phish-Slayer from the projects array
- Replace project list with:

```ts
const projects = [
  {
    title: "Lazy Logger",
    description: "Developer productivity tool for structured, low-friction logging across projects.",
    stack: ["TypeScript", "Node.js"],
    href: "https://github.com/mzain2004/lazy-logger",
    status: "in-development",
  },
  {
    title: "Port Patrol",
    description: "Network port scanner and service fingerprinting utility for security audits.",
    stack: ["Python", "Networking"],
    href: "https://github.com/mzain2004/port-patrol",
    status: "in-development",
  },
  {
    title: "ReelSaver+",
    description: "Browser extension for saving and organizing short-form video content.",
    stack: ["JavaScript", "Browser Extension API"],
    href: "https://github.com/mzain2004/reelsaver-plus",
    status: "in-development",
  },
];
```

- Cards with `status: "in-development"` render an `"In Development"` badge (`bg-green-400/10 text-green-400 border border-green-400/30 font-mono text-xs`) instead of a live link button. No `#` hrefs.
- Grid layout: 1 col mobile → 2 col `md` → 3 col `lg` (changed from alternating feature layout to uniform card grid for 4 items)
- Each card: `bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6`, lifts on hover via `whileHover={{ y: -4 }}`

**Type:**
```ts
type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  status: "live" | "in-development";
};
```

---

### `components/LiveStats.tsx` (updated)

**Changes:**
- Replace `framer-motion` import with `motion/react` (already correct in other components — this file uses the old import path)
- Skeleton state: already implemented — keep as-is (3 pulsing placeholder cards)
- Error fallback: already implemented — keep as-is
- Accent color update: swap `emerald-500/cyan-500` hover glow to `green-400` to match new accent

No structural changes needed — the component already satisfies requirements 7.1–7.5. The only fix is the import path.

---

### `components/Contact.tsx` (updated)

**Changes:**
- Remove the contact form entirely (no `<form>` element)
- Heading: `"Let's build something."` (updated from `"Let's Connect"`)
- Subtext: openness to collaborations, advisor roles, and serious conversations
- Display three contact links: Email, LinkedIn, GitHub — each as icon + label row
- Email link: `mailto:` using `siteConfig.email`
- LinkedIn and GitHub from `siteConfig.socials`
- Hover animation: `whileHover={{ x: 6 }}` (existing pattern, kept)
- Remove `MagneticButton` form submit button

---

### `components/Footer.tsx` (updated)

**Changes:**
- Render the year dynamically: `` `© ${new Date().getFullYear()} Muhammad Zain — Built with Next.js & too much caffeine.` ``
- Remove any extra navigation or social links

---

### `components/CustomCursor.tsx` (updated)

**Changes:**
- Update cursor color from `cyan-500/30` to `green-400/30` to match new accent

---

### `components/AuroraBackground.tsx` (updated)

**Changes:**
- Update blob colors to include `#4ade80` (green-400) alongside existing cyan/violet, to reinforce the new accent palette

---

## Data Models

### `SiteConfig`

```ts
type SiteConfig = {
  phishSlayerUrl: string;
  email: string;
  socials: Array<{
    name: string;
    href: string;
    iconName: "github" | "linkedin" | "twitter";
  }>;
};
```

### `Project` (SelectedWork)

```ts
type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  status: "live" | "in-development";
};
```

### `GitHubStats` (LiveStats / API)

```ts
type GitHubStats = {
  totalCommits: number;
  publicRepos: number;
  // codingHours removed — GitHub API does not provide this natively.
  // Displaying estimated/fabricated data is not acceptable on a security founder's portfolio.
};
```

### `LiveStatsState`

```ts
type LiveStatsState =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "success"; data: GitHubStats };
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Config-sourced Phish-Slayer URL

*For any* value of `siteConfig.phishSlayerUrl`, the "Visit Phish-Slayer" link rendered by `PhishSlayerSpotlight` SHALL have an `href` attribute equal to that value — it is never hardcoded inline.

**Validates: Requirements 5.4**

---

### Property 2: Project card data integrity

*For any* project in the `SelectedWork` projects array, the rendered card SHALL satisfy both: (a) the link `href` is not `"#"`, and (b) if the project has an associated image, the `<Image>` `alt` attribute is a non-empty string.

**Validates: Requirements 6.3, 12.4**

---

### Property 3: LiveStats renders exactly one UI state

*For any* combination of `(loading: boolean, error: boolean, data: GitHubStats | null)`, the `LiveStats` component SHALL render exactly one of: skeleton UI, error fallback, or stats grid — never two simultaneously, and never an empty/blank render.

**Validates: Requirements 7.2, 7.3, 7.5**

---

## Error Handling

### LiveStats API failure

- `fetch("/api/github")` throws or returns non-2xx → `setError(true)` → render error fallback card
- Error fallback: `"Failed to load live statistics."` in a styled `text-red-400` container
- No crash, no empty render

### `/api/github` route errors

- Missing `GITHUB_TOKEN` → returns `500` with JSON error body (existing behavior, kept)
- GitHub API non-OK → throws, caught, returns `500`
- GraphQL errors → throws, caught, returns `500`

### Missing GitHub repos for in-development projects

- If a GitHub repo URL for an in-development project is not yet public or doesn't exist, the card renders the `"In Development"` badge with no link rather than a broken href. This is handled at the data layer (the `status` field in the projects array) — no runtime fetch needed.

### Navbar drawer

- `Escape` key listener added in `useEffect`, cleaned up on unmount
- Outside-click handled via `ref` + `mousedown` listener

---

## Testing Strategy

This feature is primarily a UI restructuring and content update. The core logic under test is:

1. **Config-driven URL rendering** — pure data flow from `siteConfig` to rendered `href`
2. **Project card data integrity** — static data array validation
3. **LiveStats state machine** — conditional rendering logic

### Property-Based Testing

The property-based testing library for this project is **fast-check** (TypeScript-native, works with Jest/Vitest).

Each property test runs a minimum of **100 iterations**.

Tag format: `// Feature: portfolio-redesign, Property {N}: {property_text}`

**Property 1 test** — Generate arbitrary URL strings as `phishSlayerUrl`, render `PhishSlayerSpotlight` with a mocked `siteConfig`, assert the rendered anchor `href` equals the generated URL.

**Property 2 test** — Generate arbitrary project arrays (varying titles, descriptions, stacks, hrefs, statuses), render `SelectedWork`, assert no rendered link has `href="#"` and all rendered images have non-empty `alt`.

**Property 3 test** — Generate all combinations of `(loading, error, data)` states, render `LiveStats` in each state, assert exactly one of {skeleton, error, stats} is present in the output.

### Unit Tests (example-based)

- `Navbar`: assert nav links are `#about`, `#work`, `#contact`; assert "Visit Phish-Slayer" CTA href equals `siteConfig.phishSlayerUrl`
- `HeroSection`: assert exact subtext copy is present in rendered output
- `AboutSection`: assert all four credential items are rendered with correct ordinal prefixes
- `Contact`: assert no `<form>` element is rendered; assert email, LinkedIn, GitHub links are present
- `Footer`: assert the rendered text contains the current year from `new Date().getFullYear()` and the static suffix `"Muhammad Zain — Built with Next.js & too much caffeine."`

### Smoke Tests

- `npm run build` completes with zero TypeScript errors, zero ESLint errors, zero build-blocking warnings
- Files `Services.tsx`, `StrategicEducation.tsx`, `OperationalHistory.tsx` do not exist in `components/`
- No import of `@google/genai` exists anywhere in the codebase

### Integration Tests

- `GET /api/github` with a valid `GITHUB_TOKEN` returns a JSON body with `totalCommits`, `publicRepos`, `codingHours` as numbers
