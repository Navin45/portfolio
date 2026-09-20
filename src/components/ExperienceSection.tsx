import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

const EXPERIENCES: ExperienceItem[] = [
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
  institution: 'Chandigarh Engineering College',
  degree: 'B.Tech in Artificial Intelligence & Machine Learning (CGPA: 7.29 / 10.0)',
  period: '2021 – 2025',
  location: 'Mohali, Punjab',
};

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 70%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="editorial-section">
      <div className="editorial-container">
        {/* Section header */}
        <div className="section-mono-header">
          <span>03 // BACKGROUND</span>
        </div>
        <h2 className="section-headline">Experience & Education</h2>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10 max-w-4xl">
          {/* Background guide line */}
          <div
            className="absolute left-0 top-3 bottom-0 w-[2px] bg-[var(--border-subtle)]"
            aria-hidden="true"
          />

          {/* Active drawing line tied to scroll progress */}
          <m.div
            className="absolute left-0 top-3 w-[2px] bg-[var(--accent)] origin-top will-change-transform"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          {/* Experience entries */}
          <div className="space-y-16">
            {EXPERIENCES.map((exp, idx) => (
              <m.div
                key={exp.company}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline node marker */}
                <div
                  className="absolute -left-[30px] sm:-left-[46px] top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-[var(--accent)] z-10"
                  aria-hidden="true"
                />

                {/* Company & Role */}
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                      <Calendar size={13} aria-hidden="true" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-mono text-[var(--accent-subtle)]">
                    <span className="font-semibold">{exp.company}</span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                      <MapPin size={12} aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 mt-4">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-base text-[var(--text-secondary)] leading-relaxed pl-4 border-l border-[var(--border-subtle)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}

            {/* Education entry */}
            <m.div
              className="relative pt-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Timeline node marker */}
              <div
                className="absolute -left-[30px] sm:-left-[46px] top-5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-[var(--accent-subtle)] z-10"
                aria-hidden="true"
              />

              <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent-subtle)] mb-2">
                // Education
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  {EDUCATION.degree}
                </h3>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                  <Calendar size={13} aria-hidden="true" />
                  <span>{EDUCATION.period}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-mono text-[var(--text-secondary)]">
                <span>{EDUCATION.institution}</span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} aria-hidden="true" />
                  {EDUCATION.location}
                </span>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
