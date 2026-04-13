# Implementation Plan: Portfolio Redesign

## Overview

Restructure Muhammad Zain's Next.js 15 portfolio from a generic developer showcase to a security-founder brand. The work is purely additive/destructive UI surgery: delete three obsolete components, create one new component (`PhishSlayerSpotlight`), update ten existing files, fix the `@google/genai` dependency, and wire everything together so `npm run build` passes clean.

Stack: Next.js 15, React 19, Tailwind CSS v4, `motion` (Framer Motion), `lucide-react`, TypeScript. No new runtime dependencies.

---

## Tasks

- [x] 1. Dependency and dead-code cleanup
  - Remove `@google/genai` from `package.json` dependencies and run `npm install` to update `package-lock.json`
  - Search the entire codebase for any `@google/genai` import and delete those lines
  - Delete `components/Services.tsx`, `components/StrategicEducation.tsx`, and `components/OperationalHistory.tsx`
  - _Requirements: 12.1, 12.2, 1.3_

- [x] 2. Update `config/site.ts` and `app/globals.css`
  - [x] 2.1 Update `config/site.ts` — add `phishSlayerUrl: "https://phishslayer.tech"` and `email: "mzain@phishslayer.tech"` fields alongside the existing `socials` array; type the object as `SiteConfig`
    - _Requirements: 5.4, 8.3, 10.3_
  - [x] 2.2 Update `app/globals.css` — add JetBrains Mono to the Google Fonts `@import` URL and add `--font-mono: "JetBrains Mono", ui-monospace, monospace` to the `@theme` block
    - _Requirements: 10.6, 10.7_

- [x] 3. Update `app/page.tsx` — section order and imports
  - **NOTE: Task 5 (PhishSlayerSpotlight) MUST be completed before this task — `page.tsx` imports it**
  - Remove imports for `Services`, `StrategicEducation`, `OperationalHistory` and their JSX usage
  - Add import for `PhishSlayerSpotlight` (created in task 5)
  - Reorder sections to: `CustomCursor`, `AuroraBackground`, `ParticleNetwork`, `Navbar`, `HeroSection` (`id="hero"`), `AboutSection` (`id="about"`), `PhishSlayerSpotlight` (`id="phish-slayer"`), `SelectedWork` (`id="work"`), `LiveStats` (wrapped in `<section id="stats">`), `Contact` (`id="contact"`), `Footer`
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 12.2_

- [x] 4. Update `components/AuroraBackground.tsx` and `components/CustomCursor.tsx`
  - [ ] 4.1 In `AuroraBackground.tsx` replace one of the existing blob colors with `[74, 222, 128]` (green-400 `#4ade80`) to reinforce the new accent palette
    - _Requirements: 10.3_
  - [ ] 4.2 In `CustomCursor.tsx` change the className from `bg-cyan-500/30` to `bg-green-400/30`
    - _Requirements: 10.3_

- [ ] 5. Create `components/PhishSlayerSpotlight.tsx` ← **do this before task 3**
  - Full-width section with `id="phish-slayer"`, dark card `bg-zinc-900/50 border border-green-400/20 rounded-3xl`, split layout (left description panel, right feature highlights panel)
  - Left panel: monospace section label `"01 / Flagship Product"` in `text-green-400 font-mono`, heading `"Phish-Slayer"`, subheading `"AI Threat Intelligence & EDR SaaS"`, description paragraph (Azure UAE North, Docker + Nginx + SSL, student/free-tier resources), CTA `"Visit Phish-Slayer →"` with `href={siteConfig.phishSlayerUrl}` and `target="_blank"`
  - Right panel: five feature rows using `lucide-react` icons (`Shield`, `Zap`, `Monitor`, `Cloud`, `User`) each paired with a label string
  - Animate left panel `x: -40 → 0` and right panel `x: 40 → 0`, both `opacity: 0 → 1`, `whileInView`, spring transition
  - No props — reads `siteConfig.phishSlayerUrl` directly
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 6. Update `components/Navbar.tsx`
  - Replace nav items array with: `About → #about`, `Work → #work`, `Contact → #contact`
  - Add `useEffect`/`useState` scroll listener: at `scrollY > 20` apply `bg-zinc-900/70 backdrop-blur-xl`, else `bg-transparent`; change layout from floating pill to fixed full-width bar
  - Replace right-side "Contact" CTA with "Visit Phish-Slayer" button: `href={siteConfig.phishSlayerUrl}`, `target="_blank"`, ghost style — `border border-green-400/40 text-green-400 hover:shadow-[0_0_12px_rgba(74,222,128,0.3)]`
  - Add mobile hamburger (`Menu` icon from `lucide-react`) below `md` breakpoint; implement slide-in drawer with nav links + CTA; close on outside click (`mousedown` ref listener) and `Escape` key (`useEffect` cleanup)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [ ] 7. Update `components/HeroSection.tsx`
  - Remove portrait `<img>`, right-side social links column, "Download CV" button, and stats row
  - Replace with pure typographic hero centered layout:
    - Line 1: `<span className="font-mono text-sm text-zinc-400 tracking-widest uppercase">Founder & Security Engineer</span>`
    - Line 2: large white text `"Building the future"`
    - Line 3: `bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent` — `"of threat intelligence."`
  - Subtext: exact copy `"Phish-Slayer — an AI-powered SOC SaaS — is live in production on Azure, built solo from the ground up."` — `text-zinc-300 max-w-lg`
  - Two CTAs: primary `"See My Work"` (conic-gradient border, scrolls to `#work`); ghost `"View Phish-Slayer"` (`href={siteConfig.phishSlayerUrl}`, `target="_blank"`, green accent border)
  - Animated scroll indicator: bouncing `ChevronDown` at bottom center using `motion` `y` keyframes (`[0, 8, 0]` loop)
  - Keep existing `useScroll` + `useTransform` parallax on headline `y`
  - Apply subtle shimmer animation to gradient text via a CSS `@keyframes` or `motion` animate
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 11.4_

- [ ] 8. Update `components/AboutSection.tsx`
  - Two-column layout on `md+` (`grid grid-cols-1 md:grid-cols-2 gap-12`), single column on mobile
  - Left column: bio paragraph — age 20, Air University Multan, cybersecurity focus, founder mindset, interests (history, cricket, cars, nature photography)
  - Right column: credential list, each item prefixed with monospace ordinal in `text-green-400 font-mono`:
    - `01 /` BS Cybersecurity — Air University Multan (Semester 4)
    - `02 /` Founder — Phish-Slayer (Live in Production)
    - `03 /` Oracle Cloud Infrastructure 2025 Certified
    - `04 /` Location: Multan, Pakistan
  - Staggered `whileInView` animation on credential items using `variants` with `staggerChildren`
  - Ensure section has `id="about"`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 11.3_

- [ ] 9. Update `components/SelectedWork.tsx`
  - Replace `Project` type: add `status: "live" | "in-development"` field; remove `image`/`imageAlt` fields (no project images in new card grid)
  - Replace projects array with three in-development projects only (mzain.me is removed — listing the portfolio itself is circular): `Lazy Logger`, `Port Patrol`, `ReelSaver+` — all `status: "in-development"`, use GitHub repo hrefs from design doc; no `#` hrefs
  - Replace alternating feature layout with uniform card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Each card: `bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6`, `whileHover={{ y: -4 }}` lift
  - Cards with `status: "in-development"` render `"In Development"` badge (`bg-green-400/10 text-green-400 border border-green-400/30 font-mono text-xs rounded-full px-2 py-0.5`) instead of a link button
  - Tech stack tags: `font-mono text-xs`
  - Ensure section has `id="work"`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 12.4_

- [ ] 10. Update `components/LiveStats.tsx`
  - Fix import: change `from "framer-motion"` to `from "motion/react"`
  - Remove `codingHours` from the displayed stats — GitHub's API does not provide this natively; displaying estimated data is not acceptable. Display only `publicRepos` and `totalCommits`.
  - Update the `GitHubStats` type to remove the `codingHours` field; update the `/api/github` route to stop returning it if present
  - Update hover glow gradient from `from-emerald-500/10 to-cyan-500/10` to `from-green-400/10 to-green-400/5`
  - Wrap the component's return in a `<section id="stats">` (or confirm the wrapper is in `page.tsx` per task 3)
  - Verify skeleton, error fallback, and success states are all present and mutually exclusive
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 10.3_

- [ ] 11. Update `components/Contact.tsx`
  - Remove the entire `<form>` element and `MagneticButton` submit button
  - Update heading to `"Let's build something."`
  - Update subtext to reflect openness to collaborations, advisor roles, and serious conversations
  - Display three contact links: Email (`mailto:${siteConfig.email}` with a `Mail` icon from `lucide-react`), LinkedIn, GitHub — sourced from `siteConfig.socials`; each as icon + label row
  - Keep `whileHover={{ x: 6 }}` animation on each link; update hover color from `hover:text-cyan-400` to `hover:text-green-400`
  - Ensure section has `id="contact"`
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 12. Update `components/Footer.tsx`
  - Render the year dynamically: `` `© ${new Date().getFullYear()} Muhammad Zain — Built with Next.js & too much caffeine.` ``
  - Remove any extra navigation links or social icons if present
  - _Requirements: 9.1, 9.2_

- [ ] 12b. Add OG and page metadata to `app/layout.tsx`
  - Export a `metadata` object of type `Metadata` from `next` with: `title`, `description`, `openGraph` (title, description, url, siteName, images array, type), and `twitter` (card, title, description, images)
  - `title`: `"Muhammad Zain — Security Founder"`
  - `description`: `"20-year-old solo founder building production AI security infrastructure. Creator of Phish-Slayer."`
  - `openGraph.url`: `"https://mzain.me"`
  - `openGraph.images[0].url`: `"/og-image.png"`, `width: 1200`, `height: 630`
  - `twitter.card`: `"summary_large_image"`
  - Create `/public/og-image.png` at 1200×630px — a dark background with name and title as text (can be a simple placeholder to be replaced later)
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

- [ ] 13. Checkpoint — verify build integrity
  - Run `npm run build` and confirm zero TypeScript errors, zero ESLint errors, zero build-blocking warnings
  - Confirm files `Services.tsx`, `StrategicEducation.tsx`, `OperationalHistory.tsx` no longer exist in `components/`
  - Confirm no `@google/genai` import exists anywhere in the codebase
  - Confirm all `<Image>` components have non-empty `alt` text
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Add fast-check property-based tests
  - Install `fast-check` as a dev dependency and set up a minimal test runner (Vitest or Jest — whichever is already present, else add Vitest)
  - [ ] 14.1 Write property test for Property 1 — Config-sourced Phish-Slayer URL
    - Generate arbitrary URL strings as `phishSlayerUrl` via `fc.webUrl()` or `fc.string()`
    - Render `PhishSlayerSpotlight` with a mocked `siteConfig` using that URL
    - Assert every rendered anchor with text matching `/phish-slayer/i` has `href` equal to the generated URL — never hardcoded
    - Tag: `// Feature: portfolio-redesign, Property 1: Config-sourced Phish-Slayer URL`
    - Minimum 100 iterations
    - **Validates: Requirements 5.4**
  - [ ] 14.2 Write property test for Property 2 — Project card data integrity
    - Generate arbitrary project arrays using `fc.array(fc.record({ title: fc.string(), description: fc.string(), stack: fc.array(fc.string()), href: fc.webUrl(), status: fc.constantFrom("live", "in-development") }))`
    - Render `SelectedWork` with the generated projects array
    - Assert no rendered `<a>` has `href="#"` and all rendered `<img>` / `next/image` elements have a non-empty `alt` attribute
    - Tag: `// Feature: portfolio-redesign, Property 2: Project card data integrity`
    - Minimum 100 iterations
    - **Validates: Requirements 6.3, 12.4**
  - [ ] 14.3 Write property test for Property 3 — LiveStats renders exactly one UI state
    - Generate all combinations of `(loading: boolean, error: boolean, data: GitHubStats | null)` using `fc.record({ loading: fc.boolean(), error: fc.boolean(), data: fc.option(fc.record({ totalCommits: fc.nat(), publicRepos: fc.nat() })) })`
    - Render `LiveStats` with each generated state (mock `fetch` accordingly)
    - Assert exactly one of {skeleton, error fallback, stats grid} is present in the output — never two simultaneously, never blank
    - Tag: `// Feature: portfolio-redesign, Property 3: LiveStats renders exactly one UI state`
    - Minimum 100 iterations
    - **Validates: Requirements 7.2, 7.3, 7.5**

- [x] 15. Final checkpoint — full build and test pass
  - Run `npm run build` one final time confirming a clean build
  - Run property tests confirming all three properties pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Tasks 1–13 are pure implementation; task 14 adds the property-based test suite
- Accent color throughout is `#4ade80` (Tailwind `green-400`) — replace any remaining `cyan-400`/`cyan-500` references in updated components
- `font-mono` (JetBrains Mono) is used only for labels, ordinals, stat values, and tech stack tags — never body text
- All section `id` attributes must be set as specified in task 3 for anchor navigation to work
- The `PhishSlayerSpotlight` component (task 5) must exist before `page.tsx` (task 3) can import it — create task 5 before running the build in task 13
