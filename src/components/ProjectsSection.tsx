import { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import githubData from '@/data/github.json';

interface Project {
  num: string;
  title: string;
  stack: string[];
  bullets: string[];
}

interface RepoItem {
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  pushedAt: string;
}

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'PFL Finance WhatsApp KPI Accountability Bot',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Claude API', 'OpenClaw', 'React'],
    bullets: [
      'Built an automated WhatsApp KPI monitoring pipeline for 22 groups that ingests, deduplicates, classifies, and extracts structured data from text, Excel, images, and PDFs.',
      'Implemented weighted scoring, MIS cross-validation, role-based dashboard controls, approval workflows, and an outbox/scheduler that generates and routes daily accountability reports.',
    ],
  },
  {
    num: '02',
    title: 'SonoLabs AI Audio SaaS Backend',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
    bullets: [
      'Implemented a backend following Clean Architecture, separating domain entities, application use cases, infrastructure services, and presentation APIs for audio and AI generation workloads.',
      'Designed domain models and repository interfaces for users, payments, audio generation jobs, projects, and subscription plans to keep business logic independent of databases and providers.',
      'Integrated SQLAlchemy/PostgreSQL, Redis caching and rate limiting, Supabase storage, Stripe and PayPal payments, external AI providers, and versioned FastAPI endpoints with dependency injection.',
    ],
  },
  {
    num: '03',
    title: 'GCOS Cloud & Workflow Infrastructure',
    stack: ['Terraform', 'AWS', 'PostgreSQL', 'Cognito', 'n8n', 'HubSpot'],
    bullets: [
      'Implemented Terraform infrastructure for VPC integration, RDS PostgreSQL, Cognito, KMS-backed Secrets Manager, CloudTrail, GuardDuty, Inspector, and optional private n8n compute.',
      'Created versioned SQL schema, row-level security, grants, seed, and retry utilities; prepared n8n workflows for intake, scoring, routing, assignment quotas, intelligence briefs, and HubSpot deal synchronization.',
    ],
  },
  {
    num: '04',
    title: 'Stancold Document Scanner',
    stack: ['n8n', 'Pipedrive', 'Docker'],
    bullets: [
      'Built an end-to-end document-scanning workflow that listens to Pipedrive webhooks, reads deal details, and maps each deal to a configurable ruleset stored in Google Sheets.',
      'Implemented a title-based and folder-aware filtering engine in n8n Code nodes to select relevant files from a mounted projects drive, with exclusion logic, keyword statistics, and per-reason exclusion metrics.',
      'Orchestrated a deep-scan queue for PDF files, extracting text, sending it to an AI analyzer, and aggregating structured results back into Pipedrive notes and internal notification channels.',
    ],
  },
  {
    num: '05',
    title: 'LeadBoxer n8n Community Node',
    stack: ['TypeScript', 'n8n', 'LeadBoxer API', 'Docker'],
    bullets: [
      'Developed an n8n community node (n8n-nodes-leadboxer) that exposes LeadBoxer lead-data and enrichment APIs as native n8n operations, eliminating manual HTTP nodes.',
      'Implemented domain and IP lookup operations to return enriched firmographic data, locations, technologies in use, and lead context directly inside n8n workflows.',
      'Packaged the node as an installable npm module and documented installation, credentials, and supported operations for self-hosted and cloud-compatible n8n setups.',
    ],
  },
];

export default function ProjectsSection() {
  // First project open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number; index: number | null }>({
    x: 0,
    y: 0,
    index: null,
  });

  const toggleProject = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    // Only on desktop pointer
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      index,
    });
  };

  const handlePointerLeave = () => {
    setSpotlightPos({ x: 0, y: 0, index: null });
  };

  const projectMatches = (githubData && githubData.projectMatches) || {};
  const moreRepos = (githubData && githubData.moreRepos) || [];

  return (
    <section id="projects" className="editorial-section">
      <div className="editorial-container">
        {/* Section header */}
        <div className="section-mono-header">
          <span>01 // FEATURED WORK</span>
        </div>
        <h2 className="section-headline">Selected Projects</h2>

        {/* Editorial Numbered Rows */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {PROJECTS.map((project, idx) => {
            const isOpen = openIndex === idx;
            const githubMatch = projectMatches[project.title as keyof typeof projectMatches];
            const isSpotlighted = spotlightPos.index === idx;

            return (
              <m.div
                key={project.num}
                className="relative overflow-hidden group transition-colors duration-200"
                onPointerMove={(e) => handlePointerMove(e, idx)}
                onPointerLeave={handlePointerLeave}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subtle desktop cursor spotlight */}
                {isSpotlighted && (
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300 hidden md:block"
                    style={{
                      background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(168, 85, 247, 0.08), transparent 80%)`,
                    }}
                  />
                )}

                {/* Row Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleProject(idx)}
                  className="w-full text-left py-6 sm:py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4 cursor-pointer focus-visible:bg-[#141414]"
                  aria-expanded={isOpen}
                  aria-controls={`project-details-${project.num}`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 flex-1">
                    <span className="font-mono text-sm sm:text-base text-[var(--accent-subtle)] shrink-0 font-semibold">
                      {project.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-subtle)] transition-colors duration-150">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pl-10 md:pl-0">
                    <span className="font-mono text-xs sm:text-sm text-[var(--text-secondary)]">
                      {project.stack.slice(0, 3).join(' • ')}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[var(--accent-subtle)]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Expandable Details Container */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`project-details-${project.num}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-10 sm:pl-12 max-w-4xl">
                        {/* Tech stack full list */}
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                            Stack:
                          </span>
                          <span className="font-mono text-xs sm:text-sm text-[var(--text-secondary)]">
                            {project.stack.join(', ')}
                          </span>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-3 mb-6">
                          {project.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-base text-[var(--text-secondary)] leading-relaxed pl-4 border-l-2 border-[var(--border-subtle)]"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        {/* GitHub link if verified match exists */}
                        {githubMatch && (
                          <div className="pt-2">
                            <a
                              href={githubMatch.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-editorial-secondary !py-2 !px-4 text-xs inline-flex items-center gap-2"
                            >
                              <Github size={14} aria-hidden="true" />
                              <span>GitHub Repository</span>
                              <ExternalLink size={12} aria-hidden="true" />
                            </a>
                          </div>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </div>

        {/* "More on GitHub" row */}
        {moreRepos.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent-subtle)]">
                // More Open Source on GitHub
              </span>
              <a
                href="https://github.com/Navin45?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-subtle)] transition-colors inline-flex items-center gap-1"
              >
                <span>View all repositories</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {moreRepos.map((repo: RepoItem) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#121212] border border-[var(--border-subtle)] rounded hover:border-[var(--accent-subtle)] transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-subtle)] transition-colors">
                        {repo.name}
                      </span>
                      <Github size={14} className="text-[var(--text-muted)]" aria-hidden="true" />
                    </div>
                    {repo.description ? (
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                        {repo.description}
                      </p>
                    ) : (
                      <p className="text-xs text-[var(--text-muted)] italic mb-3">
                        Public repository
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--text-muted)]">
                    {repo.language && <span>{repo.language}</span>}
                    {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}