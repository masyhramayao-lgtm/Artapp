import React, { useState } from 'react';
import type { FavoriteMasterpieceContent, LightboxPlateItem } from '../types/portfolio';
import { ArtworkImage } from './ArtworkImage';
import { ZoomLoupeIcon } from './MuseumIcons';

interface FavoriteMasterpieceSectionProps {
  masterpiece: FavoriteMasterpieceContent;
  onInspectPlate: (plate: LightboxPlateItem) => void;
}

export const FavoriteMasterpieceSection: React.FC<FavoriteMasterpieceSectionProps> = ({
  masterpiece,
  onInspectPlate,
}) => {
  const [expandedPlate, setExpandedPlate] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<'spotlight' | 'daylight'>('spotlight');

  const handleInspectMasterpiece = () => {
    onInspectPlate({
      label: 'FAVORITE ARTWORK',
      title: masterpiece.title,
      artist: masterpiece.artist,
      year: masterpiece.dateCreated,
      medium: masterpiece.medium,
      location: masterpiece.currentCollection,
      imageUrl: masterpiece.imageUrl,
      fallbackSvgUrl: masterpiece.fallbackSvgUrl,
      imageAlt: masterpiece.imageAlt,
      width: masterpiece.width,
      height: masterpiece.height,
      caption: `${masterpiece.movementOrPeriod} featured painting.`,
    });
  };

  return (
    <section
      id="part-5-masterpiece"
      tabIndex={-1}
      className="exhibition-section section-favorite-masterpiece"
      aria-labelledby="part-5-heading"
    >
      <div className="container">
        <div className="room-header-placard" data-reveal="">
          <span className="room-index-label">{masterpiece.exhibitionLabel}</span>
          <h2 id="part-5-heading" className="section-title">
            My Favorite Masterpiece: A Closer Look
          </h2>
          <p className="section-lead">
            A closer look at the painting I picked as my favorite, covering its story, what appears
            in the scene, its art elements, symbolism, and why I connect with it.
          </p>
        </div>
      </div>

      <div
        className={`masterpiece-pavilion-band lighting-${lightingMode} ${expandedPlate ? 'is-expanded-view' : ''}`}
      >
        <div className="pavilion-overhead-wash" aria-hidden="true" />
        <div className="container">
          <div className="masterpiece-plate-stage pavilion-stage">
            <div className="museum-framed-plate masterpiece-large-plate">
              <button
                type="button"
                className="plate-inspect-trigger"
                onClick={handleInspectMasterpiece}
                aria-label={`View ${masterpiece.title} in full view`}
              >
                <ArtworkImage
                  src={masterpiece.imageUrl}
                  fallbackSrc={masterpiece.fallbackSvgUrl}
                  alt={masterpiece.imageAlt}
                  aspectRatio={`${masterpiece.width} / ${masterpiece.height}`}
                  fit="contain"
                  width={masterpiece.width}
                  height={masterpiece.height}
                />
                <span className="plate-inspect-pill">
                  <ZoomLoupeIcon />
                  <span>View Closer</span>
                </span>
              </button>
            </div>

            <div className="masterpiece-stage-bar pavilion-stage-bar">
              <div className="masterpiece-title-group">
                <h3 className="masterpiece-work-title">{masterpiece.title}</h3>
                <p className="masterpiece-work-meta">
                  <strong>{masterpiece.artist}</strong> · {masterpiece.dateCreated} ·{' '}
                  {masterpiece.movementOrPeriod} · {masterpiece.medium} (
                  {masterpiece.currentCollection})
                </p>
              </div>
              <div className="masterpiece-stage-actions">
                <button
                  type="button"
                  className={`btn-secondary btn-pavilion-control ${lightingMode === 'spotlight' ? 'is-active-control' : ''}`}
                  aria-pressed={lightingMode === 'spotlight'}
                  onClick={() =>
                    setLightingMode((prev) => (prev === 'spotlight' ? 'daylight' : 'spotlight'))
                  }
                >
                  {lightingMode === 'spotlight' ? 'Lighting: Spotlight' : 'Lighting: Daylight'}
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-pavilion-control"
                  aria-pressed={expandedPlate}
                  onClick={() => setExpandedPlate((prev) => !prev)}
                >
                  {expandedPlate ? 'Default Size' : 'Make Larger'}
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleInspectMasterpiece}
                  aria-haspopup="dialog"
                >
                  <ZoomLoupeIcon />
                  <span>Open Full View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="masterpiece-showcase-frame masterpiece-notes-stack">

          <div className="masterpiece-analysis-columns">
            <article className="masterpiece-analysis-card">
              <span className="essay-panel-kicker">BACKGROUND</span>
              <h4 className="analysis-card-title">History &amp; Background</h4>
              {masterpiece.historicalBackground.trim() ? (
                <p className="essay-prose">{masterpiece.historicalBackground}</p>
              ) : (
                <div className="blank-answer-slot" />
              )}
            </article>

            <article className="masterpiece-analysis-card">
              <span className="essay-panel-kicker">WHAT IS IN THE PAINTING</span>
              <h4 className="analysis-card-title">Description of the Subject</h4>
              {masterpiece.subjectMatterDescription.trim() ? (
                <p className="essay-prose">{masterpiece.subjectMatterDescription}</p>
              ) : (
                <div className="blank-answer-slot" />
              )}
            </article>
          </div>

          <div className="masterpiece-formal-matrix">
            <div className="matrix-header">
              <span className="essay-panel-kicker">ART ELEMENTS</span>
              <h4 className="analysis-card-title">
                Elements &amp; Principles of Art
              </h4>
            </div>
            <div className="matrix-quad-grid">
              <div className="matrix-cell">
                <h5 className="subblock-heading">Lines, Brushstrokes &amp; Texture</h5>
                {masterpiece.elementsAndPrinciplesAnalysis.lineAndBrushwork.trim() ? (
                  <p className="essay-prose">
                    {masterpiece.elementsAndPrinciplesAnalysis.lineAndBrushwork}
                  </p>
                ) : (
                  <div className="blank-answer-slot" />
                )}
              </div>

              <div className="matrix-cell">
                <h5 className="subblock-heading">Space, Layout &amp; Balance</h5>
                {masterpiece.elementsAndPrinciplesAnalysis.compositionAndBalance.trim() ? (
                  <p className="essay-prose">
                    {masterpiece.elementsAndPrinciplesAnalysis.compositionAndBalance}
                  </p>
                ) : (
                  <div className="blank-answer-slot" />
                )}
              </div>

              <div className="matrix-cell">
                <h5 className="subblock-heading">Colors, Light &amp; Contrast</h5>
                {masterpiece.elementsAndPrinciplesAnalysis.colorAndLight.trim() ? (
                  <p className="essay-prose">
                    {masterpiece.elementsAndPrinciplesAnalysis.colorAndLight}
                  </p>
                ) : (
                  <div className="blank-answer-slot" />
                )}
              </div>

              <div className="matrix-cell">
                <h5 className="subblock-heading">Movement &amp; Focal Point</h5>
                {masterpiece.elementsAndPrinciplesAnalysis.movementAndRhythm.trim() ? (
                  <p className="essay-prose">
                    {masterpiece.elementsAndPrinciplesAnalysis.movementAndRhythm}
                  </p>
                ) : (
                  <div className="blank-answer-slot" />
                )}
              </div>
            </div>
          </div>

          <div className="masterpiece-analysis-columns">
            <article className="masterpiece-analysis-card">
              <span className="essay-panel-kicker">MEANING &amp; SYMBOLISM</span>
              <h4 className="analysis-card-title">
                Message, Symbolism &amp; Meaning
              </h4>
              {masterpiece.meaningSymbolismInterpretation.trim() ? (
                <p className="essay-prose">{masterpiece.meaningSymbolismInterpretation}</p>
              ) : (
                <div className="blank-answer-slot" />
              )}
            </article>

            <article className="masterpiece-analysis-card appreciation-highlight-card">
              <span className="essay-panel-kicker">WHY I CHOSE IT</span>
              <h4 className="analysis-card-title">Personal Appreciation</h4>
              {masterpiece.personalAppreciation.text.trim() ? (
                <p className="essay-prose">{masterpiece.personalAppreciation.text}</p>
              ) : (
                <div className="blank-answer-slot" />
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
