import React from 'react';
import type { LightboxPlateItem, OriginalArtworkContent } from '../types/portfolio';
import { splitParagraphs } from '../utils/paragraphs';
import { ArtworkImage } from './ArtworkImage';
import { ZoomLoupeIcon } from './MuseumIcons';

interface CreativeExpressionSectionProps {
  originalArtwork: OriginalArtworkContent;
  onInspectPlate: (plate: LightboxPlateItem) => void;
}

export const CreativeExpressionSection: React.FC<CreativeExpressionSectionProps> = ({
  originalArtwork,
  onInspectPlate,
}) => {
  const hasImage = Boolean(originalArtwork.imageUrl.trim());
  const statementParagraphs = splitParagraphs(originalArtwork.artistStatement.fullStatement);
  const hasStatement = statementParagraphs.length > 0;
  const hasBreakdown =
    Boolean(originalArtwork.artistStatement.conceptBreakdown.trim()) ||
    Boolean(originalArtwork.artistStatement.creativeProcess.trim()) ||
    Boolean(originalArtwork.artistStatement.elementsAndPrinciplesApplied.trim()) ||
    Boolean(originalArtwork.artistStatement.intendedMeaningOrMessage.trim());

  const sizeAndDate = [originalArtwork.dimensions.trim(), originalArtwork.dateCompleted.trim()]
    .filter(Boolean)
    .join(' · ');

  const metadataRows = [
    { label: 'Artwork Title', value: originalArtwork.title.trim() },
    { label: 'Materials Used', value: originalArtwork.mediumAndMaterials.trim() },
    { label: 'Inspiration', value: originalArtwork.artisticInspiration.trim() },
    ...(sizeAndDate ? [{ label: 'Size & Date', value: sizeAndDate }] : []),
  ];

  return (
    <section
      id="part-4-creative"
      tabIndex={-1}
      className="exhibition-section section-creative-expression"
      aria-labelledby="part-4-heading"
    >
      <div className="container">
        <div className="room-header-placard" data-reveal="">
          <span className="room-index-label">{originalArtwork.exhibitionLabel}</span>
          <h2 id="part-4-heading" className="section-title">
            My Creative Expression: Making My Own Art
          </h2>
          <p className="section-lead">
            A space featuring my own artwork, what materials I chose, what inspired it, and my
            artist statement.
          </p>
        </div>

        <div className="studio-exhibition-grid">
          <div className="studio-canvas-column">
            <div className="museum-framed-plate studio-featured-frame">
              {hasImage ? (
                <button
                  type="button"
                  className="plate-inspect-trigger"
                  onClick={() =>
                    onInspectPlate({
                      label: 'MY ARTWORK',
                      title: originalArtwork.title,
                      artist: 'Student Original Work',
                      year: originalArtwork.dateCompleted,
                      medium: originalArtwork.mediumAndMaterials,
                      imageUrl: originalArtwork.imageUrl,
                      fallbackSvgUrl: originalArtwork.fallbackSvgUrl,
                      imageAlt: originalArtwork.imageAlt,
                      caption: originalArtwork.artisticInspiration,
                    })
                  }
                  aria-label="View my artwork in full view"
                >
                  <ArtworkImage
                    src={originalArtwork.imageUrl}
                    fallbackSrc={originalArtwork.fallbackSvgUrl}
                    alt={originalArtwork.imageAlt}
                    aspectRatio="auto"
                    fit="contain"
                  />
                  <span className="plate-inspect-pill">
                    <ZoomLoupeIcon />
                    <span>View Closer</span>
                  </span>
                </button>
              ) : (
                <div className="studio-easel-empty" aria-hidden="true">
                  <span className="easel-corner easel-tl" />
                  <span className="easel-corner easel-tr" />
                  <span className="easel-corner easel-bl" />
                  <span className="easel-corner easel-br" />
                  <span className="easel-crosshair" />
                </div>
              )}
            </div>

            <div className="studio-placard-metadata">
              <h3 className="ledger-heading">Artwork Details</h3>
              <dl className="specimen-dl">
                {metadataRows.map((row) => (
                  <div key={row.label} className="specimen-row">
                    <dt>{row.label}</dt>
                    <dd className={row.value ? '' : 'blank-dd-slot'}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="studio-statement-column">
            <div className="statement-header-row">
              <div>
                <span className="essay-panel-kicker">ABOUT MY WORK</span>
                <h3 className="statement-main-heading">Artist Statement</h3>
              </div>
            </div>

            {hasStatement ? (
              statementParagraphs.map((paragraph, index) => (
                <p key={index} className="essay-prose">
                  {paragraph}
                </p>
              ))
            ) : (
              <div className="blank-answer-slot blank-statement-slot" />
            )}

            {hasBreakdown && (
              <div className="statement-pillars-grid">
                {originalArtwork.artistStatement.conceptBreakdown.trim() && (
                  <div className="statement-pillar-card">
                    <h4 className="subblock-heading">1. The Idea Behind It</h4>
                    <p className="essay-prose">
                      {originalArtwork.artistStatement.conceptBreakdown}
                    </p>
                  </div>
                )}

                {originalArtwork.artistStatement.creativeProcess.trim() && (
                  <div className="statement-pillar-card">
                    <h4 className="subblock-heading">2. How I Made It</h4>
                    <p className="essay-prose">
                      {originalArtwork.artistStatement.creativeProcess}
                    </p>
                  </div>
                )}

                {originalArtwork.artistStatement.elementsAndPrinciplesApplied.trim() && (
                  <div className="statement-pillar-card">
                    <h4 className="subblock-heading">
                      3. Art Elements &amp; Principles Used
                    </h4>
                    <p className="essay-prose">
                      {originalArtwork.artistStatement.elementsAndPrinciplesApplied}
                    </p>
                  </div>
                )}

                {originalArtwork.artistStatement.intendedMeaningOrMessage.trim() && (
                  <div className="statement-pillar-card">
                    <h4 className="subblock-heading">4. Message or Meaning</h4>
                    <p className="essay-prose">
                      {originalArtwork.artistStatement.intendedMeaningOrMessage}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
