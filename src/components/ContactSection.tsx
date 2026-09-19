import { useReveal } from '@/hooks/use-reveal';
import { Mail, Github, FileText, Download } from 'lucide-react';

const ContactSection = () => {
  const ref = useReveal();

  return (
    <section id="contact" className="section-container">
      <div ref={ref}>
        <header className="reveal" style={{ marginBottom: 'var(--space-6)' }}>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Open to opportunities and collaboration — reach out via email or GitHub.
          </p>
        </header>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: '32rem' }}>
          {/* Contact links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <a
              href="mailto:navinsingh04523@gmail.com"
              className="btn-primary"
            >
              <Mail size={18} aria-hidden="true" />
              navinsingh04523@gmail.com
            </a>
            <a
              href="https://github.com/Navin45"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
          </div>

          {/* Resume actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <a
              href="/Navin_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;