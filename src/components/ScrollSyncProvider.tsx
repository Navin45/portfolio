import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ScrollContext, type ScrollState } from '@/hooks/use-scroll-sync';

const SECTIONS = ['hero', 'projects', 'skills', 'experience', 'contact'];

export function ScrollSyncProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    activeSection: 'hero',
    sectionVisibility: new Map(),
  });

  // Cached visibility ratios from IntersectionObserver (no layout reads in scroll handler)
  const visibilityRef = useRef(new Map<string, number>());
  const rafRef = useRef<number>(0);
  const scrollingRef = useRef(false);

  // Passive scroll listener throttled with rAF — NO layout reads here
  useEffect(() => {
    const onScroll = () => {
      if (scrollingRef.current) return;
      scrollingRef.current = true;

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

        // Determine active section from cached IO data
        let activeSection = 'hero';
        let maxRatio = 0;
        visibilityRef.current.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeSection = id;
          }
        });

        setState({
          progress,
          activeSection,
          sectionVisibility: new Map(visibilityRef.current),
        });

        scrollingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // IntersectionObserver to cache section positions (all layout reads happen here)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityRef.current.set(entry.target.id, entry.intersectionRatio);
        });
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    // Observe after mount
    const timer = setTimeout(() => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <ScrollContext.Provider value={state}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollSyncProvider;
