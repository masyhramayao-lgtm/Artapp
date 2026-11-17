import React, { useState } from 'react';
import type { GalleryArtworkItem } from '../types/portfolio';
import { ArtworkCard } from './ArtworkCard';
import { runWithViewTransition } from '../utils/viewTransition';

interface GallerySectionProps {
  westernArtworks: GalleryArtworkItem[];
  asianArtworks: GalleryArtworkItem[];
  onSelectArtwork: (artwork: GalleryArtworkItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  westernArtworks,
  asianArtworks,
  onSelectArtwork,
}) => {
  const [activeWingFilter, setActiveWingFilter] = useState<'all' | 'western' | 'asian'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filterList = (items: GalleryArtworkItem[]) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.artist.toLowerCase().includes(q) ||
        art.originCivilization.toLowerCase().includes(q) ||
        art.historicalPeriod.toLowerCase().includes(q) ||
        art.movementOrTradition.toLowerCase().includes(q)
    );
  };

  const filteredWestern = filterList(westernArtworks);
  const filteredAsian = filterList(asianArtworks);

  const showWesternWing = activeWingFilter === 'all' || activeWingFilter === 'western';
  const showAsianWing = activeWingFilter === 'all' || activeWingFilter === 'asian';

  const totalVisible =
    (showWesternWing ? filteredWestern.length : 0) +
    (showAsianWing ? filteredAsian.length : 0);

  const handleWingChange = (wing: 'all' | 'western' | 'asian') => {
    runWithViewTransition(() => setActiveWingFilter(wing));
  };

  const handleResetGalleryFilter = () => {
    runWithViewTransition(() => {
      setActiveWingFilter('all');
      setSearchTerm('');
    });
  };

  const renderWall = (
    items: GalleryArtworkItem[],
    total: number,
    wing: 'western' | 'asian',
    wingName: string
  ) => (
    <div
      id={`wing-${wing}-gallery`}
      className={`gallery-room is-${wing}`}
      aria-labelledby={`wing-${wing}-heading`}
    >
      <div className="room-cornice" aria-hidden="true" />
      <div className="room-wall">
        <div className="museum-frame-width room-wall-head">
          <h3 id={`wing-${wing}-heading`} className="room-wall-title">
            {wingName}
          </h3>
          <p className="room-wall-note">
            {wing === 'western'
              ? 'Three famous European paintings showing how artists used depth and space in the Renaissance, dramatic lighting in the Baroque era, and changing light in Impressionism.'
              : 'Three important works from Asia showing Japanese woodblock prints, traditional Chinese mountain ink painting, and 19th-century Filipino historical painting.'}
          </p>
          <p className="room-wall-count">
            {items.length} of {total} Artworks
          </p>
        </div>

        {items.length === 0 ? (
          <p className="museum-frame-width room-wall-empty" role="status">
            No {wingName} works match &ldquo;{searchTerm}&rdquo;.
          </p>
        ) : (
          <div className="museum-frame-width room-hang" data-count={items.length}>
            {items.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onSelectArtwork={onSelectArtwork}
                featured={items.length === 3 && index === 1}
              />
            ))}
          </div>
        )}
      </div>
      <div className="room-wainscot" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="room-floor" aria-hidden="true" />
    </div>
  );

  return (
    <section
      id="part-3-galleries"
      tabIndex={-1}
      className="exhibition-section museum-gallery"
      aria-labelledby="part-3-heading"
    >
      <div className="museum-frame-width gallery-head" data-reveal="">
        <h2 id="part-3-heading" className="museum-split-heading">
          <span className="museum-split-line">
            <span>Art Across Cultures:</span>
            <span className="home-rule" aria-hidden="true" />
          </span>
          <span className="museum-split-line is-second">
            <span className="home-rule" aria-hidden="true" />
            <em>Western and Asian Art</em>
          </span>
        </h2>

        <div className="museum-fact-row gallery-fact-row">
          <p>
            <em>Art Around the World</em>
          </p>
          <p className="gallery-lead">
            Two gallery rooms comparing three well-known Western paintings (from the Renaissance,
            Baroque, and Impressionist periods) with three famous Asian works (from Japan, China,
            and the Philippines). Click any painting to view it larger and read the notes about it.
          </p>

          <div className="gallery-controls" role="region" aria-label="Gallery filter and search">
            <label htmlFor="gallery-search-input">Search Artworks</label>
            <input
              id="gallery-search-input"
              type="search"
              className="museum-search"
              placeholder="Type a title, artist, time period, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="museum-filter-row" role="group" aria-label="Select gallery section">
              <button
                type="button"
                className={`museum-filter ${activeWingFilter === 'all' ? 'is-active' : ''}`}
                aria-pressed={activeWingFilter === 'all'}
                onClick={() => handleWingChange('all')}
              >
                All Artworks ({westernArtworks.length + asianArtworks.length})
              </button>
              <button
                type="button"
                className={`museum-filter ${activeWingFilter === 'western' ? 'is-active' : ''}`}
                aria-pressed={activeWingFilter === 'western'}
                onClick={() => handleWingChange('western')}
              >
                Western Art ({westernArtworks.length})
              </button>
              <button
                type="button"
                className={`museum-filter ${activeWingFilter === 'asian' ? 'is-active' : ''}`}
                aria-pressed={activeWingFilter === 'asian'}
                onClick={() => handleWingChange('asian')}
              >
                Asian Art ({asianArtworks.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {totalVisible === 0 ? (
        <div className="museum-frame-width gallery-empty" role="status">
          <h3 className="gallery-empty-title">No artworks match &ldquo;{searchTerm}&rdquo;</h3>
          <p>Clear your search or switch back to All Artworks to see all six pieces again.</p>
          <button type="button" className="museum-btn is-solid" onClick={handleResetGalleryFilter}>
            Show All 6 Artworks
          </button>
        </div>
      ) : (
        <div className="gallery-rooms">
          {showWesternWing &&
            renderWall(filteredWestern, westernArtworks.length, 'western', 'Western Art Gallery')}
          {showAsianWing &&
            renderWall(filteredAsian, asianArtworks.length, 'asian', 'Asian Art Gallery')}
        </div>
      )}
    </section>
  );
};
