import { useReveal } from '@/hooks/use-reveal';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

const EXPERIENCE = [
  {
    company: 'Expandimo Technology Pvt. Ltd.',
    role: 'Automation Developer',
    period: 'Oct 2025 – Present',
    location: 'Mohali, Punjab',
    bullets: [
      'Developed a cleanly architected Audio SaaS backend with FastAPI, SQLAlchemy, and PostgreSQL, using layered domain–application–infrastructure separation, Redis caching, and Dockerized services wired into GitHub Actions for automated testing and deployment.',
      'Built multi-tenant automation features around client CRMs and marketing tools, including custom data models, webhooks, and deployment scripts using Docker and GitHub Actions to ship changes safely and repeatably.',
      'Engineered an n8n-based Stancold Document Scanner pipeline that listens to Pipedrive deals, scans mounted project drives, classifies construction documents, and triggers AI-powered deep analysis only for relevant files, with detailed logging and monitoring for operations teams.',
    ],
  },
  {
    company: 'Swaran Soft',
    role: 'AI Intern',
    period: 'Jun 2025 – Sep 2025',
    location: 'Gurgaon, Haryana',
    bullets: [
      'Designed a Retrieval-Augmented Generation (RAG) chatbot using LangChain to efficiently retrieve and synthesize information from internal knowledge sources.',
      'Automated the HR hiring process with an AI-powered system leveraging LangGraph for complex workflows and n8n for integrations with ATS and communication tools.',
      'Built an automated lead-generation and outreach system, from scraping and data cleaning to sending targeted email campaigns with UTM tracking for performance measurement.',
    ],
  },
];

const EDUCATION = {
  school: 'Chandigarh Engineering College',
  degree: 'B.Tech in Artificial Intelligence & Machine Learning',
  cgpa: 'CGPA: 7.29 / 10.0',
  period: '2021 – 2025',
  location: 'Mohali, Punjab',
};

const ExperienceSection = () => {
  const ref = useReveal();

  return (
    <section id="experience" className="section-container">
      <div ref={ref}>
        {/* Experience */}
        <header className="reveal" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Experience</h2>
        </header>

        <div
          className="stagger"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {EXPERIENCE.map((job) => (
            <article key={job.company} className="card-surface reveal">
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Briefcase size={18} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {job.role}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--accent-subtle)',
                      fontWeight: 500,
                    }}
                  >
                    {job.company}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-4)',
                      marginTop: 'var(--space-1)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      <Calendar size={14} aria-hidden="true" />
                      {job.period}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      <MapPin size={14} aria-hidden="true" />
                      {job.location}
                    </span>
                  </div>
                </div>
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
                {job.bullets.map((bullet, i) => (
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

        {/* Education */}
        <header className="reveal" style={{ marginBottom: 'var(--space-5)' }}>
          <h2 className="section-title">Education</h2>
        </header>

        <article className="card-surface reveal">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
            }}
          >
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GraduationCap size={18} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                {EDUCATION.degree}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--accent-subtle)',
                  fontWeight: 500,
                }}
              >
                {EDUCATION.school}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginTop: 'var(--space-1)',
                }}
              >
                {EDUCATION.cgpa}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                  marginTop: 'var(--space-1)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <Calendar size={14} aria-hidden="true" />
                  {EDUCATION.period}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <MapPin size={14} aria-hidden="true" />
                  {EDUCATION.location}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ExperienceSection;
