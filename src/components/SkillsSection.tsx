import { useReveal } from '@/hooks/use-reveal';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Technologies',
    skills: [
      'PyTorch', 'LangChain', 'LangGraph', 'OpenClaw', 'Hermes Agent',
      'n8n', 'Claude API', 'Gemini API', 'FastAPI', 'Node.js', 'NestJS',
      'Next.js', 'SQLAlchemy', 'Alembic', 'React', 'Vite', 'Tailwind CSS',
      'PostgreSQL', 'Redis', 'MySQL', 'Supabase', 'NumPy', 'Pandas',
      'openpyxl', 'pdfplumber', 'Amazon Web Services (AWS)',
      'Google Cloud Platform (GCP)', 'Docker', 'Terraform', 'Git', 'GitHub',
      'GitHub Actions', 'Pipedrive', 'HubSpot', 'WhatsApp',
      'Claude Code', 'Cursor', 'OpenAI Codex', 'VS Code',
    ],
  },
  {
    category: 'Concepts',
    skills: [
      'Generative AI', 'Artificial Intelligence',
      'Retrieval-Augmented Generation (RAG) Pipelines', 'LoRA',
      'Model Context Protocol (MCP)', 'Backend Development',
      'API Integrations', 'Webhooks', 'CI/CD',
    ],
  },
];

const SkillsSection = () => {
  const ref = useReveal();

  return (
    <section id="skills" className="section-container">
      <div ref={ref}>
        <header className="reveal" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Tools, frameworks, and concepts used across production systems.
          </p>
        </header>

        <div
          className="stagger"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="reveal">
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--accent-subtle)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {group.category}
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)',
                }}
              >
                {group.skills.map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;