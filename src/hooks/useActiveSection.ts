import { useEffect, useState } from 'react';

/**
 * Tracks which exhibition section currently occupies the visitor's primary reading zone.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const handleHashChange = () => {
      const hashId = window.location.hash.replace(/^#/, '');
      if (hashId && sectionIds.includes(hashId)) {
        setActiveId(hashId);
      }
    };

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // Pick the section closest to the upper reading band with visible intersection
        let bestId = '';
        let bestScore = 0;

        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          const ratio = ratios.get(el.id) ?? 0;
          if (ratio <= 0) continue;

          // Favor sections crossing the upper third of the viewport
          const targetLine = window.innerHeight * 0.28;
          const distancePenalty = Math.abs(rect.top - targetLine) / window.innerHeight;
          const score = ratio + Math.max(0, 1 - distancePenalty);
          if (score > bestScore) {
            bestScore = score;
            bestId = el.id;
          }
        }

        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: '-18% 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [sectionIds]);

  return activeId;
}
