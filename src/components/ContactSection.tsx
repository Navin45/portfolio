import { m } from 'motion/react';
import { Mail, Github, FileText, Download } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="editorial-section">
      <div className="editorial-container">
        {/* Section header */}
        <div className="section-mono-header">
          <span>04 // CONTACT</span>
        </div>
        <h2 className="section-headline">Get In Touch</h2>

        <m.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            Interested in collaborating on AI engineering, agentic workflows, or backend infrastructure?
            Feel free to reach out directly via email or check out my work on GitHub.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:navinsingh04523@gmail.com"
              className="btn-editorial-primary"
            >
              <Mail size={16} aria-hidden="true" />
              <span>navinsingh04523@gmail.com</span>
            </a>

            <a
              href="https://github.com/Navin45"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-secondary"
            >
              <Github size={16} aria-hidden="true" />
              <span>GitHub / Navin45</span>
            </a>

            <a
              href="/Navin_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-secondary"
            >
              <FileText size={16} aria-hidden="true" />
              <span>View Resume</span>
            </a>

            <a
              href="/Navin_resume.pdf"
              download="Navin_Singh_Resume.pdf"
              className="btn-editorial-secondary"
            >
              <Download size={16} aria-hidden="true" />
              <span>Download PDF</span>
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}