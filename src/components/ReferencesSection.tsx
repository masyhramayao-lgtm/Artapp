import React from 'react';
import type { ReferenceCreditItem } from '../types/portfolio';

interface ReferencesSectionProps {
  references: ReferenceCreditItem[];
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ references }) => {
  return (
    <section
      id="references-credits"
      tabIndex={-1}
      className="exhibition-section section-references"
      aria-labelledby="references-heading"
    >
      <div className="container">
        <div className="room-header-placard" data-reveal="">
          <span className="room-index-label">SOURCES &amp; CREDITS</span>
          <h2 id="references-heading" className="section-title">
            References and Media Credits
          </h2>
          <p className="section-lead">
            Sources, museums, and credits for the artworks, background music, and information used
            in this portfolio.
          </p>
        </div>

        <div className="references-ledger-list">
          {references.map((ref, idx) => (
            <article key={ref.id} id={ref.id} className="reference-citation-entry">
              <div className="reference-index-row">
                <span className="reference-entry-num">{String(idx + 1).padStart(2, '0')}</span>
                <span className="reference-license-badge">{ref.licenseOrAttribution}</span>
              </div>
              <span className="reference-section-tag">{ref.sectionUsed}</span>
              <h3 className="reference-work-title">{ref.artworkOrTopic}</h3>
              <p className="reference-creator">{ref.creatorAndDate}</p>
              <p className="reference-repository">
                <strong>Museum / Source:</strong> {ref.museumOrRepository}
              </p>
              {ref.sourceUrl && (
                <div className="reference-link-row">
                  <a
                    href={ref.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-inline-link"
                  >
                    Open Source Link
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
