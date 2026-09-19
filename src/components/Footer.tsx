import { Github, Mail, FileText, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-page)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Headline */}
        <div className="text-center md:text-left">
          <a
            href="#hero"
            className="text-lg font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            Navin Singh
          </a>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            AI Engineer
          </p>
        </div>

        {/* Navigation links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-4 text-sm text-[var(--text-secondary)]">
          <a href="#hero" className="hover:text-[var(--text-primary)] transition-colors duration-150 py-1">
            Home
          </a>
          <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors duration-150 py-1">
            Projects
          </a>
          <a href="#skills" className="hover:text-[var(--text-primary)] transition-colors duration-150 py-1">
            Skills
          </a>
          <a href="#experience" className="hover:text-[var(--text-primary)] transition-colors duration-150 py-1">
            Experience
          </a>
          <a href="#contact" className="hover:text-[var(--text-primary)] transition-colors duration-150 py-1">
            Contact
          </a>
          <a
            href="/Navin_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors duration-150 py-1 inline-flex items-center gap-1"
          >
            <FileText size={14} aria-hidden="true" />
            Resume
          </a>
        </nav>

        {/* Social & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Navin45"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub Profile"
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <a
            href="mailto:navinsingh04523@gmail.com"
            className="social-link"
            aria-label="Send Email"
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <button
            onClick={scrollToTop}
            className="social-link"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
        &copy; {currentYear} Navin Singh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;