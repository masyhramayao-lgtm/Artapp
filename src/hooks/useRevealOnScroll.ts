import { useEffect } from 'react';

/**
 * Gently reveals `[data-reveal]` elements once as they enter the viewport,
 * defaulting immediately to visible when reduced motion is preferred.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      for (const el of targets) {
        el.classList.add('is-revealed');
      }
      return;
    }

    document.documentElement.classList.add('has-reveal-motion');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.05,
      }
    );

    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('has-reveal-motion');
    };
  }, []);
}
