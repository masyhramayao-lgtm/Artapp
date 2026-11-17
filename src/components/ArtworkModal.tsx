import React, { useEffect, useState } from 'react';
import type { GalleryArtworkItem } from '../types/portfolio';
import { useModalDialog } from '../hooks/useModalDialog';
import { ArtworkImage } from './ArtworkImage';
import { ChevronIcon, ZoomLoupeIcon } from './MuseumIcons';

interface ArtworkModalProps {
  artwork: GalleryArtworkItem | null;
  allArtworks: GalleryArtworkItem[];
  onClose: () => void;
  onSelectArtwork: (artwork: GalleryArtworkItem) => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  allArtworks,
  onClose,
  onSelectArtwork,
}) => {
  const [zoomDetail, setZoomDetail] = useState<boolean>(false);

  useEffect(() => {
    setZoomDetail(false);
  }, [artwork?.id]);

  const dialogRef = useModalDialog({
    isOpen: Boolean(artwork),
    onClose,
    scrollKey: artwork?.id ?? null,
  });

  const currentIndex = artwork
    ? allArtworks.findIndex((item) => item.id === artwork.id)
    : -1;
  const prevArtwork =
    currentIndex > 0
      ? allArtworks[currentIndex - 1]
      : allArtworks[allArtworks.length - 1];
  const nextArtwork =
    currentIndex >= 0 && currentIndex < allArtworks.length - 1
      ? allArtworks[currentIndex + 1]
      : allArtworks[0];

  useEffect(() => {
    if (!artwork || allArtworks.length < 2) return;

    const handleArrowNavigation = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onSelectArtwork(prevArtwork);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onSelectArtwork(nextArtwork);
      }
    };

    window.addEventListener('keydown', handleArrowNavigation);
    return () => window.removeEventListener('keydown', handleArrowNavigation);
  }, [artwork, allArtworks.length, nextArtwork, onSelectArtwork, prevArtwork]);

  return (
    <dialog
      ref={dialogRef}
      className="museum-modal-dialog details-dialog"
      aria-labelledby="artwork-modal-title"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      {artwork && (
        <div key={artwork.id} className="details-layout modal-artwork-transition">
          <div className="details-room">
            <div className="details-ceiling">
              <span className="details-track-light" aria-hidden="true" />
              <span className="details-track-light" aria-hidden="true" />
              <span className="details-track-light" aria-hidden="true" />
              <div className="details-toolbar">
                <button
                  type="button"
                  className={`museum-btn ${zoomDetail ? 'is-active' : ''}`}
                  aria-pressed={zoomDetail}
                  onClick={() => setZoomDetail((prev) => !prev)}
                >
                  <ZoomLoupeIcon />
                  <span>{zoomDetail ? 'Fit Full Image' : 'Zoom In'}</span>
                </button>
                <form method="dialog">
                  <button type="submit" value="close" autoFocus className="museum-btn is-solid">
                    Close (Esc)
                  </button>
                </form>
              </div>
            </div>

            <div className="details-wall">
              <figure className="details-hang">
                <div
                  className={`gilt-frame details-frame ${zoomDetail ? 'is-zoomed' : ''}`}
                  style={{ '--art-ratio': artwork.width / artwork.height } as React.CSSProperties}
                >
                  <div
                    className="details-zoom-viewport"
                    tabIndex={zoomDetail ? 0 : -1}
                    aria-label={zoomDetail ? 'Zoomed artwork, scroll to look around' : undefined}
                  >
                    <div className="details-zoom-inner">
                      <ArtworkImage
                        src={artwork.imageUrl}
                        fallbackSrc={artwork.fallbackSvgUrl}
                        alt={artwork.imageAlt}
                        width={artwork.width}
                        height={artwork.height}
                        fit="contain"
                      />
                    </div>
                  </div>
                </div>

                <figcaption className="wall-label details-wall-label">
                  <p className="wall-label-title">{artwork.title}</p>
                  <p className="wall-label-artist">{artwork.artist}</p>
                  <dl className="details-label-dl">
                    <div>
                      <dt>Gallery</dt>
                      <dd>
                        {artwork.traditionWing === 'western'
                          ? 'Gallery A: Western Art'
                          : 'Gallery B: Asian Art'}
                        , {artwork.catalogCode}
                      </dd>
                    </div>
                    <div>
                      <dt>Place of Origin</dt>
                      <dd>{artwork.originCivilization}</dd>
                    </div>
                    <div>
                      <dt>Time Period</dt>
                      <dd>{artwork.historicalPeriod}</dd>
                    </div>
                    <div>
                      <dt>Materials &amp; Size</dt>
                      <dd>{artwork.dimensionsAndMedium}</dd>
                    </div>
                    <div>
                      <dt>Where It Is Kept</dt>
                      <dd>{artwork.currentLocation}</dd>
                    </div>
                  </dl>
                </figcaption>
              </figure>
            </div>

            <nav className="details-floor" aria-label="Move between artworks">
              <button
                type="button"
                className="details-step"
                onClick={() => onSelectArtwork(prevArtwork)}
              >
                <ChevronIcon direction="left" />
                <span>
                  Previous
                  <em>{prevArtwork.title}</em>
                </span>
              </button>
              <span className="details-step-count">
                Artwork {currentIndex + 1} of {allArtworks.length}
              </span>
              <button
                type="button"
                className="details-step is-next"
                onClick={() => onSelectArtwork(nextArtwork)}
              >
                <span>
                  Next
                  <em>{nextArtwork.title}</em>
                </span>
                <ChevronIcon direction="right" />
              </button>
            </nav>
          </div>

          <div className="details-panel-bay">
            <article className="details-panel">
              <h2 id="artwork-modal-title" className="details-title">
                {artwork.title}
              </h2>
              <p className="details-byline">
                {artwork.artist}, {artwork.originCivilization} ({artwork.dateCreated})
              </p>

              <section className="details-section" aria-labelledby="modal-char-heading">
                <h3 id="modal-char-heading">Art Elements &amp; Style</h3>
                <p>
                  <strong>Elements &amp; Principles:</strong>{' '}
                  {artwork.artisticCharacteristics.elementsAndPrinciples}
                </p>
                <p>
                  <strong>Style, Medium &amp; Technique:</strong>{' '}
                  {artwork.artisticCharacteristics.styleMediumTechnique}
                </p>
                {artwork.artisticCharacteristics.studentAnalysis.trim() && (
                  <p>{artwork.artisticCharacteristics.studentAnalysis}</p>
                )}
              </section>

              <section className="details-section" aria-labelledby="modal-sig-heading">
                <h3 id="modal-sig-heading">History &amp; Cultural Meaning</h3>
                <p>{artwork.historicalAndCulturalSignificance.historicalContext}</p>
                {artwork.historicalAndCulturalSignificance.studentSignificance.trim() && (
                  <p>{artwork.historicalAndCulturalSignificance.studentSignificance}</p>
                )}
              </section>

              <section className="details-section" aria-labelledby="modal-apprec-heading">
                <h3 id="modal-apprec-heading">Personal Appreciation</h3>
                {artwork.personalAppreciation.text.trim() ? (
                  <p>{artwork.personalAppreciation.text}</p>
                ) : (
                  <div className="blank-answer-slot" />
                )}
              </section>

              <a
                href={`#${artwork.creditId}`}
                className="details-source-link"
                onClick={() => dialogRef.current?.close()}
              >
                View Source in Credits
              </a>
            </article>
          </div>
        </div>
      )}
    </dialog>
  );
};
