import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Menu, X, FileText } from 'lucide-react';
import { useScrollSync } from '@/hooks/use-scroll-sync';

const NAV_ITEMS = [
  { href: '#hero', id: 'hero', label: 'Home' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { progress, activeSection } = useScrollSync();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Thin scroll-progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[60] origin-left will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading progress"
      />

      {/* Sticky nav header */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[var(--border-subtle)]'
            : 'bg-transparent'
        }`}
      >
        <div className="editorial-container flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="font-mono text-base font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-subtle)] transition-colors duration-150"
          >
            NAVIN SINGH
          </a>

          {/* Desktop nav links: ONLY from 1024px up (lg:flex), NO hamburger */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-1 relative"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-editorial-link relative"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <m.span
                      layoutId="active-nav-indicator"
                      className="absolute bottom-1 left-3 right-3 h-[2px] bg-[var(--accent)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Resume button with text label */}
            <a
              href="/Navin_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 btn-editorial-secondary !py-1.5 !px-3 text-xs"
            >
              <FileText size={14} aria-hidden="true" />
              <span>Resume</span>
            </a>
          </nav>

          {/* Mobile hamburger button: ONLY below 1024px (lg:hidden) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] rounded hover:border-[var(--accent-subtle)] transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu with staggered motion */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-navigation"
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-8 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-6 max-w-sm">
              <span className="text-xs font-mono text-[var(--accent-subtle)] tracking-wider uppercase">
                // Navigation
              </span>
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <m.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-3xl font-bold tracking-tight transition-colors ${
                      isActive ? 'text-[var(--accent-subtle)]' : 'text-[var(--text-primary)] hover:text-[var(--accent-subtle)]'
                    }`}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.label}
                  </m.a>
                );
              })}

              <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-3">
                <a
                  href="/Navin_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-primary justify-start"
                >
                  <FileText size={16} aria-hidden="true" />
                  <span>View Resume</span>
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}