import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import HeroGraphic from './HeroGraphic';
import { FileText, Github, Mail, ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-linked motion: graphic scales/translates smoothly as user leaves hero
  const graphicScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const graphicOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.45]);
  const graphicY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-[100svh] w-full flex flex-col justify-center relative editorial-container pt-24 pb-12 overflow-hidden"
    >
      {/* Ambient background depth orbs */}
      <div
        className="absolute right-[-5%] top-[15%] w-[550px] h-[550px] bg-[#a855f7]/12 rounded-full blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute left-[-10%] top-[25%] w-[450px] h-[450px] bg-[#38bdf8]/6 rounded-full blur-[110px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 relative z-10">
        {/* Left column: Name, Headline & Actions (cols 1-6 on desktop) */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Section index mono label with live beacon */}
          <div className="section-mono-header items-center gap-2 mb-4">
            <span className="text-[var(--accent-subtle)]">00 // PORTFOLIO</span>
            <span className="text-[var(--border-default)]">•</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              AI SYSTEMS ARCHITECT
            </span>
          </div>

          {/* Masked slide-up title: Name with metallic gradient sheen */}
          <h1
            className="font-bold tracking-tight text-[var(--text-primary)] leading-[0.92] mb-5 flex flex-wrap gap-x-4 overflow-hidden"
            style={{ fontSize: 'var(--text-display)' }}
          >
            <span className="inline-block overflow-hidden py-1">
              <m.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Navin
              </m.span>
            </span>

            <span className="inline-block overflow-hidden py-1">
              <m.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-[#f3e8ff] to-[#c084fc]"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Singh
              </m.span>
            </span>
          </h1>

          {/* Headline & Description */}
          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[var(--accent-subtle)]" aria-hidden="true" />
              <h2 className="text-xl sm:text-2xl font-mono text-[var(--accent-subtle)] font-medium">
                AI Engineer
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mb-8 leading-relaxed">
              Specializing in Python, TypeScript, FastAPI, PostgreSQL, LangGraph, and RAG pipelines.
              Building resilient agentic workflows and production-grade backend systems.
            </p>
          </m.div>

          {/* Action buttons: Single prominent Resume button + GitHub (rel="me") + Email */}
          <m.div
            className="flex flex-wrap items-center gap-3.5 mb-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="/Navin_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-primary !px-6 !py-3.5 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_-2px_rgba(168,85,247,0.7)] transition-all duration-200"
            >
              <FileText size={16} aria-hidden="true" />
              <span>View Resume</span>
            </a>

            <a
              href="https://github.com/Navin45"
              target="_blank"
              rel="me noopener noreferrer"
              className="btn-editorial-secondary !px-5 !py-3.5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08]"
            >
              <Github size={16} aria-hidden="true" />
              <span>GitHub / Navin45</span>
            </a>

            <a
              href="mailto:navinsingh04523@gmail.com"
              className="btn-editorial-secondary !px-5 !py-3.5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08]"
            >
              <Mail size={16} aria-hidden="true" />
              <span>Email</span>
            </a>
          </m.div>
        </div>

        {/* Right column: High-Motion Cybernetic Pipeline Terminal (cols 7-12 on desktop) */}
        <m.div
          className="lg:col-span-6 w-full h-full flex items-center justify-center min-h-[350px] lg:min-h-[480px]"
          style={{
            scale: graphicScale,
            opacity: graphicOpacity,
            y: graphicY,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroGraphic />
        </m.div>
      </div>

      {/* Scroll indicator with text label */}
      <div className="w-full pt-4 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] z-10">
        <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
        <span>SCROLL TO EXPLORE ARCHITECTURE &amp; PROJECTS</span>
      </div>
    </section>
  );
}