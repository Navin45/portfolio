import { m } from 'motion/react';

const LANGUAGES = ['Python', 'TypeScript', 'JavaScript', 'SQL'];

const TECHNOLOGIES_ROW_1 = [
  'PyTorch',
  'LangChain',
  'LangGraph',
  'OpenClaw',
  'Hermes Agent',
  'n8n',
  'Claude API',
  'Gemini API',
  'FastAPI',
  'Node.js',
  'NestJS',
  'Next.js',
  'SQLAlchemy',
  'Alembic',
  'React',
  'Vite',
  'Tailwind CSS',
  'PostgreSQL',
  'Redis',
  'MySQL',
];

const TECHNOLOGIES_ROW_2 = [
  'Supabase',
  'NumPy',
  'Pandas',
  'openpyxl',
  'pdfplumber',
  'Amazon Web Services (AWS)',
  'Google Cloud Platform (GCP)',
  'Docker',
  'Terraform',
  'Git',
  'GitHub',
  'GitHub Actions',
  'Pipedrive',
  'HubSpot',
  'WhatsApp',
  'Claude Code',
  'Cursor',
  'OpenAI Codex',
  'VS Code',
];

const CONCEPTS = [
  'Generative AI',
  'Artificial Intelligence',
  'Retrieval-Augmented Generation (RAG) Pipelines',
  'LoRA',
  'Model Context Protocol (MCP)',
  'Backend Development',
  'API Integrations',
  'Webhooks',
  'CI/CD',
];

export default function SkillsSection() {
  return (
    <section id="skills" className="editorial-section">
      <div className="editorial-container">
        {/* Section header */}
        <div className="section-mono-header">
          <span>02 // CAPABILITIES</span>
        </div>
        <h2 className="section-headline">Technical Skills</h2>

        {/* Group 1: Languages — Inline Typographic List */}
        <m.div
          className="mb-12 pb-8 border-b border-[var(--border-subtle)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-subtle)] mb-4">
            // Languages
          </h3>
          <p className="text-xl sm:text-2xl font-mono text-[var(--text-primary)] leading-relaxed">
            {LANGUAGES.map((lang, idx) => (
              <span key={lang} className="inline-block">
                <span className="hover:text-[var(--accent-subtle)] transition-colors duration-150">
                  {lang}
                </span>
                {idx < LANGUAGES.length - 1 && (
                  <span className="text-[var(--text-muted)] mx-3 select-none">•</span>
                )}
              </span>
            ))}
          </p>
        </m.div>

        {/* Group 2: Technologies — Two-Row Marquee (pauses on hover and focus) */}
        <m.div
          className="mb-12 pb-8 border-b border-[var(--border-subtle)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-subtle)]">
              // Technologies
            </h3>
            <span className="font-mono text-[11px] text-[var(--text-muted)] hidden sm:inline">
              [PAUSES ON HOVER]
            </span>
          </div>

          {/* Row 1 */}
          <div className="marquee-container mb-3" tabIndex={0} aria-label="Technologies row 1">
            <div className="marquee-track">
              {TECHNOLOGIES_ROW_1.map((tech, idx) => (
                <span key={`r1-${idx}`} className="marquee-item">
                  {tech}
                </span>
              ))}
              {/* Duplicate copy for seamless infinite scroll */}
              {TECHNOLOGIES_ROW_1.map((tech, idx) => (
                <span key={`r1-dup-${idx}`} className="marquee-item" aria-hidden="true">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 (Reverse direction) */}
          <div className="marquee-container" tabIndex={0} aria-label="Technologies row 2">
            <div className="marquee-track-reverse">
              {TECHNOLOGIES_ROW_2.map((tech, idx) => (
                <span key={`r2-${idx}`} className="marquee-item">
                  {tech}
                </span>
              ))}
              {/* Duplicate copy for seamless infinite scroll */}
              {TECHNOLOGIES_ROW_2.map((tech, idx) => (
                <span key={`r2-dup-${idx}`} className="marquee-item" aria-hidden="true">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </m.div>

        {/* Group 3: Concepts — Inline Typographic List */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-subtle)] mb-4">
            // Core Concepts
          </h3>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {CONCEPTS.map((concept, idx) => (
              <span key={concept} className="inline-block my-1">
                <span className="text-[var(--text-primary)] hover:text-[var(--accent-subtle)] transition-colors duration-150 font-medium">
                  {concept}
                </span>
                {idx < CONCEPTS.length - 1 && (
                  <span className="text-[var(--text-muted)] mx-3 select-none">•</span>
                )}
              </span>
            ))}
          </p>
        </m.div>
      </div>
    </section>
  );
}