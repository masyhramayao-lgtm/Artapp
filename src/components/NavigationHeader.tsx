import React, { useEffect, useRef, useState } from 'react';


interface NavigationHeaderProps {
  activeSectionId: string;
}

export const exhibitionNavLinks = [
  { id: 'part-1-profile', href: '#part-1-profile', roomLabel: '1', title: 'Home' },
  { id: 'part-2-concepts', href: '#part-2-concepts', roomLabel: '2', title: 'Highlights' },
  { id: 'part-3-galleries', href: '#part-3-galleries', roomLabel: '3', title: 'Gallery' },
  { id: 'part-4-creative', href: '#part-4-creative', roomLabel: '4', title: 'My Artwork' },
  { id: 'part-5-masterpiece', href: '#part-5-masterpiece', roomLabel: '5', title: 'Masterpiece' },
  { id: 'part-6-reflection', href: '#part-6-reflection', roomLabel: '6', title: 'Reflection' },
  { id: 'references-credits', href: '#references-credits', roomLabel: 'Ref', title: 'Credits' },
];

function getDefaultScheme(): 'light' | 'dark' {
  return 'light';
}

function getStoredScheme(): 'light' | 'dark' | null {
  try {
    const val = localStorage.getItem('color-scheme');
    if (val === 'light' || val === 'dark') return val;
  } catch {
    // Ignore storage block errors
  }
  return null;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeSectionId,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [renderedScheme, setRenderedScheme] = useState<'light' | 'dark'>(() => {
    return getStoredScheme() ?? getDefaultScheme();
  });

  const progressRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const syncMetaAndState = () => {
      const stored = getStoredScheme();
      const target = stored ?? getDefaultScheme();
      const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
      if (meta) {
        meta.content = target;
      }
      setRenderedScheme(target);
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'color-scheme' || e.key === null) {
        syncMetaAndState();
      }
    };

    syncMetaAndState();
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sentinel = document.getElementById('header-sticky-sentinel');
    if (sentinel && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsStuck(!entry.isIntersecting);
        },
        { threshold: [0] }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (
      CSS.supports('animation-timeline', 'scroll()') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let rafId = 0;
    const updateProgress = () => {
      rafId = 0;
      const el = progressRef.current;
      if (!el) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleToggleTheme = () => {
    const currentRendered = getStoredScheme() ?? renderedScheme;
    const targetScheme: 'light' | 'dark' = currentRendered === 'dark' ? 'light' : 'dark';

    try {
      localStorage.setItem('color-scheme', targetScheme);
    } catch {
      // Ignore storage failures
    }

    const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (meta) {
      meta.content = targetScheme;
    }
    setRenderedScheme(targetScheme);
  };

  return (
    <>
      <div id="header-sticky-sentinel" className="sticky-sentinel" aria-hidden="true" />
      <header ref={headerRef} className={`site-header museum-nav ${isStuck ? 'is-stuck' : ''}`}>
        <a href="#main-exhibition" className="skip-link">
          Skip to exhibition content
        </a>

        <div className="museum-nav-row">
          <a
            href="#part-1-profile"
            className="museum-nav-wordmark"
            onClick={() => setMobileMenuOpen(false)}
          >
            Artistic Journey
          </a>

          <nav
            id="primary-exhibition-nav"
            aria-label="Exhibition Rooms Navigation"
            className={`museum-nav-links ${mobileMenuOpen ? 'is-open' : ''}`}
          >
            <ul>
              {exhibitionNavLinks.map((item) => {
                const isActive = item.id === activeSectionId;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`museum-nav-link ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="museum-nav-tools">
            <button
              type="button"
              className="museum-scheme-switch"
              onClick={handleToggleTheme}
              aria-label={
                renderedScheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'
              }
            >
              <span className={renderedScheme === 'light' ? 'is-current' : ''}>Light</span>/
              <span className={renderedScheme === 'dark' ? 'is-current' : ''}>Dark</span>
            </button>

            <button
              type="button"
              className="museum-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-controls="primary-exhibition-nav"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        <div ref={progressRef} className="exhibition-scroll-progress" aria-hidden="true" />
      </header>
    </>
  );
};
