import React, { useEffect, useState } from 'react';
import type { LightboxPlateItem } from '../types/portfolio';
import { useModalDialog } from '../hooks/useModalDialog';
import { ArtworkImage } from './ArtworkImage';
import { ZoomLoupeIcon } from './MuseumIcons';

interface PlateLightboxModalProps {
  plate: LightboxPlateItem | null;
  onClose: () => void;
}

export const PlateLightboxModal: React.FC<PlateLightboxModalProps> = ({ plate, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [plate]);

  const dialogRef = useModalDialog({
    isOpen: Boolean(plate),
    onClose,
    scrollKey: plate?.imageUrl ?? null,
  });

  return (
    <dialog
      ref={dialogRef}
      className="museum-modal-dialog lightbox-modal-dialog"
      aria-labelledby="plate-lightbox-title"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      {plate && (
        <div className="modal-inner-sheet">
          <div className="modal-top-bar">
            <div className="modal-catalog-breadcrumbs">
              <span className="catalog-code-badge">{plate.label}</span>
              <span className="modal-wing-tag">Full Artwork View</span>
            </div>

            <div className="modal-top-actions">
              <button
                type="button"
                className={`btn-secondary btn-compact ${zoomed ? 'is-active-control' : ''}`}
                aria-pressed={zoomed}
                onClick={() => setZoomed((prev) => !prev)}
              >
                <ZoomLoupeIcon />
                <span>{zoomed ? 'Fit Full Image' : 'Zoom In'}</span>
              </button>

              <form method="dialog">
                <button
                  type="submit"
                  value="close"
                  autoFocus
                  className="btn-secondary modal-close-btn"
                >
                  Close (Esc)
                </button>
              </form>
            </div>
          </div>

          <figure className="lightbox-figure">
            <div className={`lightbox-stage ${zoomed ? 'is-zoomed' : ''}`}>
              <div className="lightbox-zoom-inner">
                <ArtworkImage
                  src={plate.imageUrl}
                  fallbackSrc={plate.fallbackSvgUrl}
                  alt={plate.imageAlt}
                  aspectRatio={
                    plate.width && plate.height ? `${plate.width} / ${plate.height}` : 'auto'
                  }
                  width={plate.width}
                  height={plate.height}
                  fit="contain"
                  className="lightbox-artwork-frame"
                />
              </div>
            </div>
            <figcaption className="museum-placard-caption lightbox-caption">
              <h2 id="plate-lightbox-title" className="lightbox-title">
                {plate.title}{' '}
                {plate.year && <span className="lightbox-year">({plate.year})</span>}
              </h2>
              <p className="placard-meta-line">
                {plate.artist}
                {plate.medium ? ` · ${plate.medium}` : ''}
                {plate.location ? ` · ${plate.location}` : ''}
              </p>
              {plate.caption && <p className="placard-description">{plate.caption}</p>}
            </figcaption>
          </figure>
        </div>
      )}
    </dialog>
  );
};
