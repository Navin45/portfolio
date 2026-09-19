# Navin Singh — AI Engineer Portfolio

A production-grade, fast, accessible portfolio website for **Navin Singh**, AI Engineer.

Built with React 18, TypeScript, Vite, and Tailwind CSS with a custom design token system. All personal and technical details are sourced directly from Navin's resume.

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with hand-crafted design tokens (`src/design-tokens.css`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) (configured via `vercel.json`)
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)

## ✨ Highlights

- **Verbatim Resume Data**: Experience, education, projects, and technical skills align with the official resume (`public/Navin_resume.pdf`).
- **Accessibility & Motion**:
  - Full keyboard navigation and visible focus rings
  - Skip to main content link
  - Respects `prefers-reduced-motion` across all animations and transitions
  - Strict WCAG AA contrast compliance across all text/surface pairings
- **Zero External API Dependencies**: Fully self-contained, instant rendering, no third-party tracking or webhooks.
- **Scroll Synchronization**: IntersectionObserver-based active section tracking and reading progress bar with zero layout thrashing.
- **Production Hardened**:
  - Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
  - Open Graph and Twitter Card metadata with absolute URLs
  - 404 page with dynamic `noindex` tag

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/Navin45/navinportfolio.git

# Navigate into the project
cd navinportfolio

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `npm run dev` | Starts the local development server at `http://localhost:8080` |
| `build` | `npm run build` | Compiles and builds production assets to `dist/` |
| `preview` | `npm run preview` | Previews the production build locally |
| `lint` | `npm run lint` | Runs ESLint across the codebase |

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI pipeline
├── public/
│   ├── Navin_resume.pdf       # Official resume (source of truth)
│   ├── favicon.ico            # Site favicon
│   ├── og-image.png           # 1200x630 Open Graph preview image
│   └── robots.txt             # Search engine crawler directives
├── src/
│   ├── components/
│   │   ├── ContactSection.tsx # Contact links (Email, GitHub, Resume)
│   │   ├── ExperienceSection.tsx # Experience & Education from resume
│   │   ├── Footer.tsx         # Site footer
│   │   ├── HeroGraphic.tsx    # Responsive SVG pipeline illustration
│   │   ├── HeroSection.tsx    # Hero with resume headline & quick actions
│   │   ├── Navigation.tsx     # Header navigation & mobile menu
│   │   ├── ProjectsSection.tsx# 5 featured projects from resume
│   │   ├── ScrollSyncProvider.tsx # Passive scroll tracking provider
│   │   └── SkillsSection.tsx  # Categorized technical skills
│   ├── hooks/
│   │   ├── use-reveal.ts      # IntersectionObserver scroll reveal hook
│   │   └── use-scroll-sync.ts # Scroll state context and hook
│   ├── pages/
│   │   ├── Index.tsx          # Main single-page portfolio
│   │   └── NotFound.tsx       # 404 page with noindex meta tag
│   ├── design-tokens.css      # CSS design tokens & contrast ratios
│   ├── index.css              # Global styles & Tailwind layers
│   ├── main.tsx               # React application entrypoint
│   └── App.tsx                # App router
├── vercel.json                # Vercel SPA rewrites & security headers
├── tailwind.config.ts         # Tailwind CSS configuration
├── vite.config.ts             # Vite build configuration
└── package.json               # Project dependencies and scripts
```

## 📬 Contact

- **Name**: Navin Singh
- **Email**: [navinsingh04523@gmail.com](mailto:navinsingh04523@gmail.com)
- **GitHub**: [@Navin45](https://github.com/Navin45)
- **Resume**: Available at [`/Navin_resume.pdf`](public/Navin_resume.pdf)