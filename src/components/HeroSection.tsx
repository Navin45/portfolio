import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import HeroGraphic from './HeroGraphic';
import { FileText, Download, Github, Mail, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-linked motion: graphic scales/translates subtly as user leaves hero
  const graphicScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const graphicOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);
  const graphicY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Split name for word-by-word masked slide-up
  const nameWords = ['Navin', 'Singh'];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-[100svh] w-full flex flex-col justify-center relative editorial-container pt-20 pb-12 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Left column: Text & CTA (55% width on desktop: cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          {/* Section index mono label */}
          <div className="section-mono-header">
            <span>00 // PORTFOLIO</span>
          </div>

          {/* Masked slide-up title: Name */}
          <h1
            className="font-bold tracking-tight text-[var(--text-primary)] leading-[0.95] mb-4 flex flex-wrap gap-x-4 overflow-hidden"
            style={{ fontSize: 'var(--text-display)' }}
          >
            {nameWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <m.span
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </m.span>
              </span>
            ))}
          </h1>

          {/* Headline */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xl sm:text-2xl font-mono text-[var(--accent-subtle)] font-medium mb-3">
              AI Engineer
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mb-8 leading-relaxed">
              Specializing in Python, TypeScript, FastAPI, PostgreSQL, LangGraph, and RAG pipelines.
              Building resilient agentic workflows and production-grade backend systems.
            </p>
          </m.div>

          {/* Action buttons — all have clear text labels */}
          <m.div
            className="flex flex-wrap items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="/Navin_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-primary"
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
            <a
              href="https://github.com/Navin45"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-secondary"
            >
              <Github size={16} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:navinsingh04523@gmail.com"
              className="btn-editorial-secondary"
            >
              <Mail size={16} aria-hidden="true" />
              <span>Email</span>
            </a>
          </m.div>
        </div>

        {/* Right column: Hero Graphic (at least 45% width on desktop: cols 8-12) */}
        <m.div
          className="lg:col-span-5 w-full h-full flex items-center justify-center min-h-[320px] lg:min-h-[440px]"
          style={{
            scale: graphicScale,
            opacity: graphicOpacity,
            y: graphicY,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroGraphic />
        </m.div>
      </div>

      {/* Scroll indicator with text label */}
      <div className="w-full pt-4 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}