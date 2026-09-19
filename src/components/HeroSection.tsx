import HeroGraphic from './HeroGraphic';
import { ArrowDown, FileText, Download, Github, Mail } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-10)' }}
    >
      <div className="section-container text-center" style={{ paddingBlock: 0 }}>
        {/* Name and headline render immediately — no animation dependency */}
        <h1
          style={{
            fontSize: 'var(--text-5xl)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-3)',
            lineHeight: 1.1,
          }}
        >
          Navin Singh
        </h1>

        <p
          style={{
            fontSize: 'var(--text-2xl)',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: 'var(--space-2)',
          }}
        >
          AI Engineer
        </p>

        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-6)',
            maxWidth: '36rem',
            marginInline: 'auto',
          }}
        >
          Generative AI · Agentic Workflows · Production Backend APIs
        </p>

        {/* Resume actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <a
            href="/Navin_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FileText size={18} aria-hidden="true" />
            View Resume
          </a>
          <a
            href="/Navin_resume.pdf"
            download="Navin_Singh_Resume.pdf"
            className="btn-outline"
          >
            <Download size={18} aria-hidden="true" />
            Download Resume
          </a>
        </div>

        {/* Contact links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <a
            href="https://github.com/Navin45"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <Github size={20} aria-hidden="true" />
          </a>
          <a
            href="mailto:navinsingh04523@gmail.com"
            className="social-link"
            aria-label="Email"
          >
            <Mail size={20} aria-hidden="true" />
          </a>
        </div>

        {/* Hero motion graphic */}
        <HeroGraphic />

        {/* Scroll hint */}
        <a
          href="#projects"
          style={{
            display: 'inline-flex',
            marginTop: 'var(--space-6)',
            color: 'var(--text-muted)',
            transition: `color var(--duration-fast) var(--easing-default)`,
          }}
          aria-label="Scroll to projects"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;