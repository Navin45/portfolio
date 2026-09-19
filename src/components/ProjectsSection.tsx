import { useReveal } from '@/hooks/use-reveal';

const PROJECTS = [
  {
    title: 'PFL Finance WhatsApp KPI Accountability Bot',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Claude API', 'OpenClaw', 'React'],
    bullets: [
      'Built an automated WhatsApp KPI monitoring pipeline for 22 groups that ingests, deduplicates, classifies, and extracts structured data from text, Excel, images, and PDFs.',
      'Implemented weighted scoring, MIS cross-validation, role-based dashboard controls, approval workflows, and an outbox/scheduler that generates and routes daily accountability reports.',
    ],
  },
  {
    title: 'SonoLabs AI Audio SaaS Backend',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
    bullets: [
      'Implemented a backend following Clean Architecture, separating domain entities, application use cases, infrastructure services, and presentation APIs for audio and AI generation workloads.',
      'Designed domain models and repository interfaces for users, payments, audio generation jobs, projects, and subscription plans to keep business logic independent of databases and providers.',
      'Integrated SQLAlchemy/PostgreSQL, Redis caching and rate limiting, Supabase storage, Stripe and PayPal payments, external AI providers, and versioned FastAPI endpoints with dependency injection.',
    ],
  },
  {
    title: 'GCOS Cloud & Workflow Infrastructure',
    stack: ['Terraform', 'AWS', 'PostgreSQL', 'Cognito', 'n8n', 'HubSpot'],
    bullets: [
      'Implemented Terraform infrastructure for VPC integration, RDS PostgreSQL, Cognito, KMS-backed Secrets Manager, CloudTrail, GuardDuty, Inspector, and optional private n8n compute.',
      'Created versioned SQL schema, row-level security, grants, seed, and retry utilities; prepared n8n workflows for intake, scoring, routing, assignment quotas, intelligence briefs, and HubSpot deal synchronization.',
    ],
  },
  {
    title: 'Stancold Document Scanner',
    stack: ['n8n', 'Pipedrive', 'Docker'],
    bullets: [
      'Built an end-to-end document-scanning workflow that listens to Pipedrive webhooks, reads deal details, and maps each deal to a configurable ruleset stored in Google Sheets.',
      'Implemented a title-based and folder-aware filtering engine in n8n Code nodes to select relevant files from a mounted projects drive, with exclusion logic, keyword statistics, and per-reason exclusion metrics.',
      'Orchestrated a deep-scan queue for PDF files, extracting text, sending it to an AI analyzer, and aggregating structured results back into Pipedrive notes and internal notification channels.',
    ],
  },
  {
    title: 'LeadBoxer n8n Community Node',
    stack: ['TypeScript', 'n8n', 'LeadBoxer API', 'Docker'],
    bullets: [
      'Developed an n8n community node (n8n-nodes-leadboxer) that exposes LeadBoxer lead-data and enrichment APIs as native n8n operations, eliminating manual HTTP nodes.',
      'Implemented domain and IP lookup operations to return enriched firmographic data, locations, technologies in use, and lead context directly inside n8n workflows.',
      'Packaged the node as an installable npm module and documented installation, credentials, and supported operations for self-hosted and cloud-compatible n8n setups.',
    ],
  },
];

const ProjectsSection = () => {
  const ref = useReveal();

  return (
    <section id="projects" className="section-container">
      <div ref={ref}>
        <header className="reveal" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Production systems spanning AI automation, backend infrastructure, and workflow orchestration.
          </p>
        </header>

        <div
          className="stagger"
          style={{
            display: 'grid',
            gap: 'var(--space-5)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 28rem), 1fr))',
          }}
        >
          {PROJECTS.map((project) => (
            <article key={project.title} className="card-surface reveal">
              <h3
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {project.title}
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {project.stack.map((tech) => (
                  <span key={tech} className="badge">{tech}</span>
                ))}
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                {project.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      paddingLeft: 'var(--space-4)',
                      position: 'relative',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.5em',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                        opacity: 0.6,
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;