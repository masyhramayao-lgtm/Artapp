import React from 'react';
import type { LightboxPlateItem, StudentProfileContent } from '../types/portfolio';
import { ArtworkImage } from './ArtworkImage';

interface FeaturedArtworkSectionProps {
  artwork: StudentProfileContent['heroArtwork'];
  onInspectPlate: (plate: LightboxPlateItem) => void;
}

/** The School of Athens shown whole, placed right after My Favorite Masterpiece. */
export const FeaturedArtworkSection: React.FC<FeaturedArtworkSectionProps> = ({
  artwork: art,
  onInspectPlate,
}) => (
  <section
    id="featured-artwork"
    className="exhibition-section museum-home home-featured"
    aria-labelledby="featured-artwork-heading"
  >
    <h2 id="featured-artwork-heading" className="museum-frame-width home-featured-head">
      <span>Featured Artwork</span>
      <span className="home-rule" aria-hidden="true" />
    </h2>
    <figure className="museum-frame-width home-plate">
      <button
        type="button"
        className="home-plate-trigger"
        onClick={() =>
          onInspectPlate({
            label: 'FEATURED ARTWORK',
            title: art.title,
            artist: art.artist,
            year: art.year,
            medium: art.medium,
            location: art.collection,
            imageUrl: art.imageUrl,
            fallbackSvgUrl: art.fallbackSvgUrl,
            imageAlt: art.imageAlt,
            width: art.width,
            height: art.height,
            caption: 'Opening artwork introducing the Western focus on human thought and learning.',
          })
        }
        aria-label={`View ${art.title} in full view`}
      >
        <ArtworkImage
          src={art.imageUrl}
          fallbackSrc={art.fallbackSvgUrl}
          alt={art.imageAlt}
          fit="contain"
          width={art.width}
          height={art.height}
        />
      </button>
      <figcaption className="museum-fact-row home-plate-caption">
        <p>
          {art.title}
          <br />
          <em>{art.artist}</em>
        </p>
        <p>
          Painted <em>{art.year}</em>
        </p>
        <p>{art.medium}</p>
        <p>{art.collection}</p>
      </figcaption>
    </figure>
  </section>
);
