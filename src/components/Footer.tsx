import { ArrowUp, Github, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[#0a0a0a] py-12">
      <div className="editorial-container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Headline */}
        <div>
          <a
            href="#hero"
            className="font-mono text-base font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-subtle)] transition-colors duration-150"
          >
            NAVIN SINGH
          </a>
          <p className="font-mono text-xs text-[var(--accent-subtle)] mt-1">
            AI Engineer
          </p>
        </div>

        {/* Links with text labels */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--text-secondary)]">
          <a
            href="https://github.com/Navin45"
            target="_blank"
            rel="me noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1.5"
          >
            <Github size={14} aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <a
            href="mailto:navinsingh04523@gmail.com"
            className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1.5"
          >
            <Mail size={14} aria-hidden="true" />
            <span>Email</span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUp size={14} aria-hidden="true" />
            <span>Back to top</span>
          </button>
        </div>
      </div>

      <div className="editorial-container mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)]">
        <span>&copy; {currentYear} Navin Singh. All rights reserved.</span>
        <span>Built with React, TypeScript &amp; Motion</span>
      </div>
    </footer>
  );
}