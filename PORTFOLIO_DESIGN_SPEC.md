# Portfolio Design Specification (PORTFOLIO_DESIGN_SPEC.md)

## 1. Project Structure

```
d:\Portfolio Overhaul
├── metadata.json
├── next-env.d.ts
├── next.config.mjs
├── package.json         # Project dependencies and scripts
├── postcss.config.mjs
├── README.md            # Project documentation
├── tsconfig.json        # TypeScript configuration
├── app/
│   ├── globals.css      # Global styles, fonts, and Tailwind utilities
│   ├── layout.tsx       # Root layout defining the core HTML document and metadata
│   ├── page.tsx         # Main landing page assembling the sections
│   └── api/
│       └── github/
│           └── route.ts # API route for fetching GitHub data
├── components/          # Reusable UI components and page sections
│   ├── AboutSection.tsx
│   ├── AuroraBackground.tsx
│   ├── Contact.tsx
│   ├── CustomCursor.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── LiveStats.tsx
│   ├── MagneticButton.tsx
│   ├── Navbar.tsx
│   ├── OperationalHistory.tsx
│   ├── ParticleNetwork.tsx
│   ├── SelectedWork.tsx
│   ├── Services.tsx
│   └── StrategicEducation.tsx
├── config/
│   └── site.ts          # Site-wide configurations (e.g., social links)
└── public/
    ├── favicon.svg
    └── projects/        # Static assets for projects
```

## 2. Layout & Structure

The overall structure of the main landing page follows a single-page scrolling layout wrapped in `<main>` with `.bg-zinc-950`.

**Global Structure:**
- **Navigation (`<Navbar />`)**: Top-level navigation with smooth scrolling to in-page anchors.
- **Background Ecosystem (`<AuroraBackground />`, `<ParticleNetwork />`, grid pattern)**: A multi-layered visual field spanning the viewport.
- **Hero Area (`<HeroSection />`)**: Impactful entry point capturing the user's attention.
- **Data Highlight (`<LiveStats />`)**: Highlights metrics in a constrained grid block.
- **Content Block Sections (`<AboutSection />`, `<SelectedWork />`, `<Services />`, `<OperationalHistory />`, `<StrategicEducation />`)**: Iterative vertical blocks that stack for presentation.
- **Bottom Footer (`<Contact />`, `<Footer />`)**: Conclusion and call-to-action areas.

**Responsive Layout:**
- **Mobile (`< sm`)**: Full-width content padding, single column layouts, larger typography relative to width.
- **Tablet (`md`)**: Split screen columns, adjustments in typography size, grid structures become 2 columns.
- **Desktop (`lg`, `xl`)**: Maximum width constraint at `max-w-7xl`, full grid layouts, complex interactive positioning logic. 

## 3. Design System

**Typography:**
- Primary Font: *Inter* (Sans-serif)
- Headers / Accent Font: *Barlow*
- Stylized Font: *Instrument Serif*
Defined globally in `globals.css`.

**Color Palette:**
- **Background Base**: `bg-zinc-950`
- **Text Primary**: `text-zinc-50` (White/Light Gray)
- **Soft Text / Subtext**: `text-zinc-300`, `text-zinc-400`
- **Borders & Dividers**: `border-zinc-800/50`
- **Subtle Backgrounds**: `bg-zinc-900/25` (typically with `backdrop-blur-md`)
- Selection state: `selection:bg-zinc-800 selection:text-white`

**Spacing & Elevation:**
- Padding/Margining adheres heavily to `p-8` / `p-10`.
- Shadows are generated using `backdrop-blur-md` mixed with subtle semi-transparent zinc background elements rather than heavy box shadows. `rounded-3xl`, `rounded-full`.
- Large decorative text utilities: `text-[10vw] md:text-[8vw]`.

**Gradients / Effects:**
- `.bg-grid-pattern`: Provides a radial-gradient grid overlay structure.
- Aurora and Particle generation overlays add visual depth.

## 4. UI Components

**Reusable Core Elements:**
- `<MagneticButton />`: Advanced interactive button featuring motion tracking using `motion/react`.
- `<CustomCursor />`: Replaces default OS cursor with interactive pointer states.

**One-Off Sections/Widgets:**
- `<AboutSection />`: Profile overview using `motion.div` viewport triggering.
- `<LiveStats />`, `<SelectedWork />`, `<Services />`, `<StrategicEducation />`, `<OperationalHistory />`: Core descriptive views displaying data chunks in grids and flex-containers.

## 5. UX & Interactions

- **Animations**: Driven fundamentally by `{ motion } from "motion/react"`.
  - Typical configs include spring transitions: `transition={{ type: "spring", stiffness: 100, damping: 20 }}`.
  - Reveal states: `initial={{ opacity: 0, y: 40 }}` to `whileInView={{ opacity: 1, y: 0 }}`.
- **Scroll Behavior**: Scroll-triggered animations via `viewport={{ once: false, amount: 0.2 }}` ensuring elements appear dynamically.
- **Cursor Tracking**: Specialized logic dictating hover/active events across the DOM context.

## 6. Pages & Sections Structure

- **`/` (Home)**: Composed via `<RootLayout>` and `<Page>`. It binds everything together into a streamlined flow from Hero to Footer. The API route `/api/github` feeds the Data Highlight section (`<LiveStats />`).

## 7. Tech Stack & Dependencies

- **Framework**: `Next.js 15.2.0`
- **Language**: `TypeScript`
- **Styling**: `Tailwind CSS 4.x` with structural PostCSS configuration.
- **Animations / UI**: `motion` (Framer Motion evolution).
- **Icons**: `lucide-react`, `react-icons`.
- **Generative AI**: `@google/genai` (Indicates intelligent generative back-end functionality).

## 8. Current Issues & Gaps

- Missing error/loading states for GitHub API data fetches.
- Needs complete testing suite implementation or End-to-End checks.
- Build system warnings output via Next v15 (noted ESLint version conflict missing flat config handling properly).
