# Requirements Document

## Introduction

This document defines the requirements for redesigning Muhammad Zain's Next.js 15 portfolio website. The redesign repositions the portfolio from a generic developer showcase to a sharp, security-focused founder brand. Phish-Slayer — a production-deployed AI-powered SOC SaaS — becomes the narrative centerpiece. The aesthetic is dark, elegant, and minimal with deliberate cybersecurity DNA. The redesign restructures the page layout, removes unused sections, introduces a dedicated Phish-Slayer spotlight, and resolves all existing technical issues including missing API error/loading states and unused dependencies.

## Glossary

- **Portfolio**: The Next.js 15 single-page application at mzain.me representing Muhammad Zain's personal brand.
- **Phish-Slayer**: A production-deployed AI-powered SOC SaaS (Security Operations Center Software as a Service) built and owned by Muhammad Zain, deployed on Azure UAE North.
- **Navbar**: The top-level navigation component rendered on every viewport.
- **Hero**: The full-viewport-height opening section of the Portfolio.
- **About**: The section combining biographical information, education, and key credentials.
- **PhishSlayerSpotlight**: The dedicated full-width section showcasing Phish-Slayer's features and deployment details.
- **SelectedWork**: The project grid section listing projects other than Phish-Slayer.
- **LiveStats**: The section displaying live GitHub contribution statistics fetched from `/api/github`.
- **Contact**: The section providing communication links and a call-to-action.
- **Footer**: The single-line bottom bar of the Portfolio.
- **AuroraBackground**: The animated aurora visual effect component used in the Hero background.
- **ParticleNetwork**: The animated particle canvas component used in the Hero background.
- **CustomCursor**: The custom OS cursor replacement component.
- **MagneticButton**: The interactive button component with magnetic hover tracking.
- **GitHubAPI**: The internal Next.js API route at `/api/github` that fetches GitHub contribution data.
- **AccentColor**: The single accent color used for highlights, borders, and hover glows — either `#4ade80` (muted green) or `#67e8f9` (cyan).
- **MonospaceFont**: JetBrains Mono or Fira Code, used sparingly for labels, tags, and stat values.
- **FramerMotion**: The `motion` library used for all animations throughout the Portfolio.

---

## Requirements

### Requirement 1: Page Structure and Section Order

**User Story:** As a visitor, I want to navigate a logically ordered single-page portfolio, so that I can move from introduction to detailed work to contact without confusion.

#### Acceptance Criteria

1. THE Portfolio SHALL render sections in this exact order: Navbar, Hero, About, PhishSlayerSpotlight, SelectedWork, LiveStats, Contact, Footer.
2. THE Portfolio SHALL NOT render the Services, StrategicEducation, or OperationalHistory sections.
3. THE Portfolio SHALL remove the component files `Services.tsx`, `StrategicEducation.tsx`, and `OperationalHistory.tsx` from the codebase and all their imports.
4. WHEN a visitor clicks a Navbar anchor link, THE Portfolio SHALL scroll smoothly to the corresponding section using its `id` attribute.
5. THE Portfolio SHALL assign `id="about"` to the About section, `id="work"` to the SelectedWork section, and `id="contact"` to the Contact section.

---

### Requirement 2: Navbar

**User Story:** As a visitor, I want a minimal, always-accessible navigation bar, so that I can jump to any section from anywhere on the page.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport and remain visible during scroll.
2. WHEN the page is at the top, THE Navbar SHALL have a transparent background.
3. WHEN the visitor scrolls down, THE Navbar SHALL apply a `backdrop-blur` effect to its background.
4. THE Navbar SHALL display navigation links for About, Work, and Contact only.
5. THE Navbar SHALL display a "Visit Phish-Slayer" CTA button on the right side with a subtle border, no fill, and a faint glow on hover.
6. WHEN the viewport width is below the `md` breakpoint, THE Navbar SHALL replace the navigation links with a hamburger icon.
7. WHEN the hamburger icon is activated, THE Navbar SHALL display a slide-in drawer containing the navigation links and the "Visit Phish-Slayer" CTA.
8. WHEN the drawer is open and the visitor clicks outside it or presses Escape, THE Navbar SHALL close the drawer.

---

### Requirement 3: Hero Section

**User Story:** As a visitor, I want an impactful full-viewport hero that immediately communicates Zain's identity and Phish-Slayer's significance, so that I understand who he is within seconds.

#### Acceptance Criteria

1. THE Hero SHALL occupy 100% of the viewport height (`min-h-screen`).
2. THE Hero SHALL render a typographic headline composed of three lines:
   - Line 1: a small monospace label in `zinc-400` reading "Founder & Security Engineer"
   - Line 2: large white text reading "Building the future"
   - Line 3: large text with a gradient or AccentColor reading "of threat intelligence."
3. THE Hero SHALL render subtext in `zinc-300` with a maximum width of `max-w-lg` with the exact copy: "Phish-Slayer — an AI-powered SOC SaaS — is live in production on Azure, built solo from the ground up."
4. THE Hero SHALL render two CTA buttons: a primary "See My Work" button and a ghost "View Phish-Slayer" button.
5. THE Hero SHALL render AuroraBackground, ParticleNetwork, and a CSS grid pattern as layered background elements.
6. THE Hero SHALL render CustomCursor and MagneticButton components.
7. THE Hero SHALL render an animated scroll indicator at the bottom of the section (animated chevron or dot).
8. WHEN the visitor scrolls, THE Hero SHALL apply a parallax effect to the headline text using FramerMotion scroll transforms.

---

### Requirement 4: About Section

**User Story:** As a visitor, I want a concise, credible bio with key credentials, so that I can quickly assess Zain's background and expertise.

#### Acceptance Criteria

1. THE About section SHALL use a two-column layout on desktop (`md` and above) and a single-column layout on mobile.
2. THE About section's left column SHALL contain a short punchy bio mentioning age (20), Air University Multan, cybersecurity focus, founder mindset, and personal interests (history, cricket, cars, nature photography).
3. THE About section's right column SHALL display the following credential items, each prefixed with a monospace ordinal label (e.g., "01 /", "02 /"):
   - BS Cybersecurity — Air University Multan (Semester 4)
   - Founder — Phish-Slayer (Live in Production)
   - Oracle Cloud Infrastructure 2025 Certified
   - Location: Multan, Pakistan
4. WHEN the About section enters the viewport, THE About section SHALL animate its content into view using FramerMotion with staggered children.

---

### Requirement 5: Phish-Slayer Feature Spotlight

**User Story:** As a visitor, I want a dedicated section that deeply showcases Phish-Slayer, so that I understand the scale and sophistication of Zain's flagship product.

#### Acceptance Criteria

1. THE PhishSlayerSpotlight SHALL be a full-width section with a dark card or split layout.
2. THE PhishSlayerSpotlight's left panel SHALL describe Phish-Slayer as an AI threat intelligence and EDR SaaS, production-deployed on Azure UAE North, using Docker, Nginx, and SSL, built entirely on student and free-tier resources.
3. THE PhishSlayerSpotlight's right panel SHALL display the following feature highlights as icon-and-text rows using `lucide-react` icons:
   - AI-powered phishing detection
   - Real-time threat intelligence
   - EDR capabilities
   - Production Azure deployment
   - Built solo from scratch
4. THE PhishSlayerSpotlight SHALL render a "Visit Phish-Slayer →" link button at the bottom linking to `https://phishslayer.tech`. This URL SHALL be sourced from `config/site.ts` — the implementation SHALL read it from there rather than hardcoding it inline.
5. THE PhishSlayerSpotlight SHALL use `zinc-900` as the card background with a muted green or cyan AccentColor for borders and highlights — not neon fills.
6. WHEN the PhishSlayerSpotlight enters the viewport, THE PhishSlayerSpotlight SHALL animate the left and right panels separately using FramerMotion.

---

### Requirement 6: Selected Work Section

**User Story:** As a visitor, I want to browse Zain's other projects in a clean grid, so that I can evaluate the breadth of his technical work beyond Phish-Slayer.

#### Acceptance Criteria

1. THE SelectedWork section SHALL NOT include Phish-Slayer, as it has its own dedicated section.
2. THE SelectedWork section SHALL include the following projects: Lazy Logger, Port Patrol, and ReelSaver+.
3. FOR projects that are in active development and have no live demo (Lazy Logger, Port Patrol, ReelSaver+), EACH card SHALL link to the project's GitHub repository if available, or display an "In Development" badge instead of a broken or placeholder link. A `#` placeholder link SHALL NOT be used.
3. EACH project card SHALL display: project name, a one-line description, tech stack tags, and a link.
4. EACH project card SHALL use `zinc-900` background and SHALL lift slightly on hover using a FramerMotion transform.
5. THE SelectedWork section SHALL use a grid layout that adapts from one column on mobile to two or three columns on larger viewports.

---

### Requirement 7: Live Stats Section

**User Story:** As a visitor, I want to see Zain's GitHub activity metrics, so that I can gauge his coding consistency and output.

#### Acceptance Criteria

1. THE LiveStats section SHALL fetch data from the `/api/github` internal route.
2. WHILE the GitHubAPI request is in progress, THE LiveStats section SHALL display a skeleton loading state with animated placeholders.
3. IF the GitHubAPI request fails or returns a non-OK response, THEN THE LiveStats section SHALL display a user-facing error fallback message instead of crashing or showing empty content.
4. WHEN data loads successfully, THE LiveStats section SHALL display: total public repos and all-time commits. THE LiveStats section SHALL NOT display a "coding hours" metric, as GitHub's API does not provide this data natively — displaying an estimated or fabricated value is not acceptable.
5. THE LiveStats section SHALL only render the stats grid when data has loaded successfully — it SHALL NOT render partial or undefined data.

---

### Requirement 8: Contact Section

**User Story:** As a visitor, I want a clean, minimal contact section, so that I can reach Zain through the appropriate channel without friction.

#### Acceptance Criteria

1. THE Contact section SHALL display the heading "Let's build something."
2. THE Contact section SHALL display subtext indicating openness to collaborations, advisor roles, and serious conversations.
3. THE Contact section SHALL display links for Email, LinkedIn, and GitHub — each as an icon paired with a label.
4. THE Contact section SHALL NOT include a contact form.
5. WHEN a visitor hovers over a contact link, THE Contact section SHALL apply a subtle hover animation using FramerMotion.

---

### Requirement 9: Footer

**User Story:** As a visitor, I want a minimal footer that closes the page cleanly, so that the experience ends without clutter.

#### Acceptance Criteria

1. THE Footer SHALL display a single line of text where the year is rendered dynamically using `new Date().getFullYear()` — e.g. `"© {year} Muhammad Zain — Built with Next.js & too much caffeine."` — so it never goes stale.
2. THE Footer SHALL NOT display additional navigation links, social icons, or secondary content.

---

### Requirement 10: Design System — Colors and Typography

**User Story:** As a visitor, I want a consistent, premium dark aesthetic throughout the portfolio, so that the visual identity reinforces Zain's brand as a serious security founder.

#### Acceptance Criteria

1. THE Portfolio SHALL use `zinc-950` as the base background color throughout all sections.
2. THE Portfolio SHALL use `zinc-50` for primary text and `zinc-400` for secondary/subtext.
3. THE Portfolio SHALL use exactly one AccentColor — either `#4ade80` (muted green) or `#67e8f9` (cyan) — applied only to borders, highlights, and hover glows, not large fills.
4. THE Portfolio SHALL use `zinc-900/50` with `backdrop-blur-md` for card backgrounds.
5. THE Portfolio SHALL use `zinc-800/60` for card and section borders.
6. THE Portfolio SHALL load Inter, Barlow, Instrument Serif, and one MonospaceFont (JetBrains Mono or Fira Code).
7. THE Portfolio SHALL apply MonospaceFont only to section labels, code-like decorators, stat values, and tech stack tags — not to body text.
8. THE Portfolio SHALL apply a minimum section padding of `py-24` and a maximum content width of `max-w-6xl` centered on the page.

---

### Requirement 11: Animations

**User Story:** As a visitor, I want smooth, purposeful animations that enhance the experience without overwhelming it, so that the portfolio feels polished but not distracting.

#### Acceptance Criteria

1. THE Portfolio SHALL use FramerMotion for all animations.
2. WHEN a section enters the viewport, THE Portfolio SHALL animate its content in using `initial={{ opacity: 0, y: 40 }}` to `whileInView={{ opacity: 1, y: 0 }}` with spring transitions.
3. WHERE a section contains a list or grid of items, THE Portfolio SHALL apply staggered children animations.
4. THE Hero gradient text SHALL apply a subtle shimmer animation.
5. THE Portfolio SHALL apply a maximum of one animation per element — no stacking of multiple simultaneous transforms on the same node.

---

### Requirement 13: Open Graph and Page Metadata

**User Story:** As a visitor sharing the portfolio link, I want rich link previews on LinkedIn, Twitter, and other platforms, so that the portfolio looks professional when shared with investors or recruiters.

#### Acceptance Criteria

1. THE Portfolio's `app/layout.tsx` SHALL export a Next.js `metadata` object containing: `title`, `description`, `openGraph.title`, `openGraph.description`, `openGraph.url`, `openGraph.siteName`, `openGraph.images` (at minimum one image with `url`, `width`, `height`, `alt`), and `twitter.card`.
2. THE `title` SHALL be `"Muhammad Zain — Security Founder"` or equivalent sharp, non-generic copy.
3. THE `description` SHALL be a single punchy sentence suitable for a LinkedIn preview — no buzzwords.
4. THE `openGraph.url` SHALL be `"https://mzain.me"`.
5. THE OG image SHALL be a static asset in `/public/` with dimensions of at least 1200×630px.
6. THE `twitter.card` SHALL be set to `"summary_large_image"`.

---

**User Story:** As a developer, I want the codebase to be clean and free of unused dependencies and broken imports, so that the build passes without errors or warnings.

#### Acceptance Criteria

1. THE Portfolio SHALL remove the `@google/genai` dependency from `package.json` and all associated imports and usages throughout the codebase, unless it powers a visible, user-facing feature.
2. THE Portfolio SHALL remove all imports referencing `Services`, `StrategicEducation`, and `OperationalHistory` components from `page.tsx` and any other files.
3. WHEN `npm run build` is executed, THE Portfolio SHALL complete without TypeScript errors, ESLint errors, or build-blocking warnings.
4. THE Portfolio SHALL ensure all `<Image>` components from `next/image` include descriptive `alt` text for every image in `/public/projects/`.
5. THE Portfolio SHALL ensure all sections have the correct `id` attributes required for anchor navigation as defined in Requirement 1.
