import React, { useEffect, useMemo, useState } from 'react';
import {
  studentProfileContent,
  learningConceptsContent,
  westernGalleryArtworks,
  asianGalleryArtworks,
  originalArtworkContent,
  favoriteMasterpieceContent,
  finalReflectionContent,
  referencesAndCreditsContent,
  ambientMusicTrack,
} from './content';
import type { GalleryArtworkItem, LightboxPlateItem } from './types/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { NavigationHeader } from './components/NavigationHeader';
import { HeroProfileSection } from './components/HeroProfileSection';
import { ConceptSection } from './components/ConceptSection';
import { GallerySection } from './components/GallerySection';
import { CreativeExpressionSection } from './components/CreativeExpressionSection';
import { FavoriteMasterpieceSection } from './components/FavoriteMasterpieceSection';
import { FeaturedArtworkSection } from './components/FeaturedArtworkSection';
import { ReflectionSection } from './components/ReflectionSection';
import { ReferencesSection } from './components/ReferencesSection';
import { ArtworkModal } from './components/ArtworkModal';
import { PlateLightboxModal } from './components/PlateLightboxModal';
import { ChevronIcon } from './components/MuseumIcons';
import { AmbientMusicPlayer } from './components/AmbientMusicPlayer';

const EXHIBITION_SECTION_IDS = [
  'part-1-profile',
  'part-2-concepts',
  'part-3-galleries',
  'part-4-creative',
  'part-5-masterpiece',
  'part-6-reflection',
  'references-credits',
];

export const App: React.FC = () => {
  const activeSectionId = useActiveSection(EXHIBITION_SECTION_IDS);
  useRevealOnScroll();

  const [selectedGalleryArtwork, setSelectedGalleryArtwork] =
    useState<GalleryArtworkItem | null>(null);
  const [selectedLightboxPlate, setSelectedLightboxPlate] =
    useState<LightboxPlateItem | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // The page renders after the browser's own jump-to-#hash, so links like
  // /#part-6-reflection (opened directly or refreshed) would stay at the top.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const allGalleryArtworks = useMemo(
    () => [...westernGalleryArtworks, ...asianGalleryArtworks],
    []
  );

  return (
    <div className="museum-editorial-app">
      <NavigationHeader activeSectionId={activeSectionId} />

      <main id="main-exhibition">
        <HeroProfileSection profile={studentProfileContent} />

        <ConceptSection
          concepts={learningConceptsContent}
          onInspectPlate={(plate) => setSelectedLightboxPlate(plate)}
        />

        <GallerySection
          westernArtworks={westernGalleryArtworks}
          asianArtworks={asianGalleryArtworks}
          onSelectArtwork={(artwork) => setSelectedGalleryArtwork(artwork)}
        />

        <CreativeExpressionSection
          originalArtwork={originalArtworkContent}
          onInspectPlate={(plate) => setSelectedLightboxPlate(plate)}
        />

        <FavoriteMasterpieceSection
          masterpiece={favoriteMasterpieceContent}
          onInspectPlate={(plate) => setSelectedLightboxPlate(plate)}
        />

        <FeaturedArtworkSection
          artwork={studentProfileContent.heroArtwork}
          onInspectPlate={(plate) => setSelectedLightboxPlate(plate)}
        />

        <ReflectionSection reflection={finalReflectionContent} />

        <ReferencesSection references={referencesAndCreditsContent} />
      </main>

      <footer className="exhibition-footer">
        <div className="museum-frame-width">
          <p className="footer-wordmark">{studentProfileContent.portfolioTitle}</p>
          <div className="museum-fact-row">
            <p>
              {studentProfileContent.studentName}
              <br />
              <em>{studentProfileContent.courseYearSection}</em>
            </p>
            <p>
              {studentProfileContent.institution}
              <br />
              <em>{studentProfileContent.academicTerm}</em>
            </p>
            <p>
              Instructor <em>{studentProfileContent.instructorName}</em>
            </p>
            <nav className="footer-links" aria-label="Footer Exhibition Links">
              <a href="#part-1-profile">Back to Home</a>
              <a href="#part-3-galleries">Art Gallery</a>
              <a href="#references-credits">Sources &amp; Credits</a>
            </nav>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <a
          href="#part-1-profile"
          className="back-to-top-pill"
          aria-label="Return to top of exhibition"
        >
          <ChevronIcon direction="up" />
          <span>Top</span>
        </a>
      )}

      <AmbientMusicPlayer track={ambientMusicTrack} />

      <ArtworkModal
        artwork={selectedGalleryArtwork}
        allArtworks={allGalleryArtworks}
        onClose={() => setSelectedGalleryArtwork(null)}
        onSelectArtwork={(art) => setSelectedGalleryArtwork(art)}
      />

      <PlateLightboxModal
        plate={selectedLightboxPlate}
        onClose={() => setSelectedLightboxPlate(null)}
      />
    </div>
  );
};

export default App;
