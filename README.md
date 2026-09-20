# Navin Singh — AI Engineer Portfolio

A production-grade, fast, accessible portfolio website for **Navin Singh**, AI Engineer.

Built with React 18, TypeScript, Vite, Tailwind CSS, Motion, and a custom editorial design token system. All personal and technical details are sourced directly and verbatim from Navin's official resume (`public/Navin_resume.pdf`).

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Animation**: [Motion](https://motion.dev/) (`motion/react`) using `LazyMotion` and `domAnimation` (adds < 35 KB gzipped)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with hand-crafted design tokens (`src/design-tokens.css`)
- **Typography**: Self-hosted variable fonts (`Space Grotesk` Display and `JetBrains Mono` Code)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) (configured via `vercel.json`)
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)

## 🎨 Design System & Tokens

The styling is governed strictly by tokens defined in [`src/design-tokens.css`](src/design-tokens.css):
- **Base Theme**: Neutral near-black (`#0a0a0a`) with off-white primary text (`#fafafa`) and secondary text (`#a3a3a3`, achieving 5.5:1 contrast against `#0a0a0a`).
- **Accents**: Violet tokens (`--accent: #a855f7`, `--accent-subtle: #c084fc`, `--accent-interactive: #9333ea`) used sparingly for interactions, active indicators, and SVG data pulses.
- **Layout**: 12-column grid container (`editorial-container`) with standardized section gaps (`--section-gap`).
- **Typography**: Fluid clamp scales for display headlines, body (≥ 16px), and monospace labels.

## ✨ Motion & Accessibility

- **Load Sequence**: Word-by-word masked slide-up of the name, followed by headline, action buttons, and hero SVG pipeline illustration. Hero text and buttons are readable within 300ms without blocking on animation scripts.
- **Hero Graphic**: SVG path-length draw-in with continuous edge data pulses; scale and opacity link with page scroll.
- **Interactive Projects**: Numbered editorial rows (01–05) with expandable details, animated height transitions, and desktop cursor spotlight.
- **Skills Marquee**: Two-row animated marquee for technologies that automatically pauses on hover and focus.
- **Scroll-Linked Timeline**: Experience & education vertical timeline where the line draws progressively with scroll position.
- **Accessibility**:
  - Full keyboard navigation and visible focus rings (`--focus-ring`)
  - Skip to main content link targeting `#main-content`
  - Strict compliance with `prefers-reduced-motion: reduce` (disables all scroll-linked animations and converts the marquee into a static wrapped list)
  - Minimum 44px touch targets on all interactive elements

## 📄 How to Update the Resume PDF

`public/Navin_resume.pdf` is the sole source of truth for personal and professional details on this site. To update it:

1. Replace `public/Navin_resume.pdf` with the new resume PDF file.
2. Verify that git tracks the updated PDF:
   ```bash
   git add public/Navin_resume.pdf
   git ls-files public/Navin_resume.pdf
   ```
3. If new projects or skills are added in the PDF, update `src/components/ProjectsSection.tsx` and `src/components/SkillsSection.tsx` to match the PDF text verbatim.
4. Run `npm run sync:github` to refresh GitHub repository metadata if applicable.

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- npm 10+

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/Navin45/portfolio.git

# Navigate into the project
cd portfolio

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `npm run dev` | Starts Vite development server at `http://localhost:8080` |
| `build` | `npm run build` | Compiles TypeScript and builds production bundle to `dist/` |
| `preview` | `npm run preview` | Starts local production preview server |
| `lint` | `npm run lint` | Runs ESLint across the codebase |
| `sync:github` | `npm run sync:github` | Fetches public GitHub repos for Navin45 into `src/data/github.json` |

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI pipeline
├── public/
│   ├── fonts/                 # Self-hosted variable woff2 fonts
│   ├── Navin_resume.pdf       # Official resume (source of truth)
│   ├── favicon.ico            # Site favicon
│   ├── og-image.png           # 1200x630 Open Graph preview image
│   └── robots.txt             # Crawler directives
├── scripts/
│   └── sync-github.mjs        # Script to sync GitHub repositories
├── src/
│   ├── components/
│   │   ├── ContactSection.tsx # Contact links with text labels
│   │   ├── ExperienceSection.tsx # Scroll-drawing vertical timeline
│   │   ├── Footer.tsx         # Minimal editorial footer
│   │   ├── HeroGraphic.tsx    # Responsive SVG pipeline illustration
│   │   ├── HeroSection.tsx    # Hero with masked word slide-up
│   │   ├── Navigation.tsx     # Header navigation & mobile menu
│   │   ├── ProjectsSection.tsx# Numbered expandable rows & GitHub repos
│   │   ├── ScrollSyncProvider.tsx # Scroll state provider
│   │   └── SkillsSection.tsx  # Typographic lists & 2-row marquee
│   ├── data/
│   │   └── github.json        # Pre-fetched GitHub repository data
│   ├── hooks/
│   │   ├── use-reveal.ts      # IntersectionObserver reveal hook
│   │   └── use-scroll-sync.ts # Scroll state context and hook
│   ├── pages/
│   │   ├── Index.tsx          # Single-page portfolio root
│   │   └── NotFound.tsx       # 404 page with noindex meta tag
│   ├── design-tokens.css      # Design tokens, font-faces & motion tokens
│   ├── index.css              # Base styles, marquee & reduced-motion rules
│   ├── main.tsx               # Application entrypoint
│   └── App.tsx                # App root with MotionConfig & LazyMotion
├── vercel.json                # Vercel SPA rewrites & security headers
├── tailwind.config.ts         # Tailwind CSS configuration
├── vite.config.ts             # Vite build configuration
└── package.json               # Project dependencies and scripts
```

## 📬 Contact

- **Name**: Navin Singh
- **Role**: AI Engineer
- **Email**: [navinsingh04523@gmail.com](mailto:navinsingh04523@gmail.com)
- **GitHub**: [@Navin45](https://github.com/Navin45)
- **Resume**: [`/Navin_resume.pdf`](public/Navin_resume.pdf)