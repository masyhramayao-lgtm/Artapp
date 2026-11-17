import React from 'react';
import type { GalleryArtworkItem } from '../types/portfolio';
import { ArtworkImage } from './ArtworkImage';

interface ArtworkCardProps {
  artwork: GalleryArtworkItem;
  onSelectArtwork: (artwork: GalleryArtworkItem) => void;
  /** The centre piece of a wall hangs larger, like the salon hang in the reference. */
  featured?: boolean;
}

// Every painting gets the same wall area (more when featured), so a wide and a
// tall painting carry equal weight while keeping their true proportions.
const WALL_AREA = 96000;
const FEATURED_AREA = WALL_AREA * 1.55;

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onSelectArtwork,
  featured = false,
}) => {
  const ratio = artwork.width / artwork.height;
  const paintedWidth = Math.round(Math.sqrt((featured ? FEATURED_AREA : WALL_AREA) * ratio));

  return (
    <article
      className={`wall-artwork ${featured ? 'is-featured' : ''}`}
      style={
        {
          '--painted-w': paintedWidth,
        } as React.CSSProperties
      }
      aria-labelledby={`card-title-${artwork.id}`}
    >
      <span className="wall-spot" aria-hidden="true" />
      <div
        className="gilt-frame"
        style={{ viewTransitionName: `gallery-card-${artwork.id}` } as React.CSSProperties}
      >
        <button
          type="button"
          className="wall-artwork-trigger"
          onClick={() => onSelectArtwork(artwork)}
          aria-label={`View ${artwork.title} by ${artwork.artist} and read the notes`}
          aria-haspopup="dialog"
        >
          <ArtworkImage
            src={artwork.imageUrl}
            fallbackSrc={artwork.fallbackSvgUrl}
            alt={artwork.imageAlt}
            fit="contain"
            width={artwork.width}
            height={artwork.height}
          />
        </button>
      </div>

      <div className="wall-label">
        <h4 id={`card-title-${artwork.id}`} className="wall-label-title">
          {artwork.title}
        </h4>
        <p className="wall-label-artist">{artwork.artist}</p>
        <p className="wall-label-meta">
          {artwork.originCivilization}, {artwork.dateCreated}
        </p>
        <p className="wall-label-meta">{artwork.movementOrTradition}</p>
      </div>
    </article>
  );
};
