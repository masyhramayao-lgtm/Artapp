import React, { useState } from 'react';
import type { LearningConceptItem, LightboxPlateItem } from '../types/portfolio';
import { ArtworkImage } from './ArtworkImage';
import { ZoomLoupeIcon } from './MuseumIcons';
import { runWithViewTransition } from '../utils/viewTransition';

interface ConceptSectionProps {
  concepts: LearningConceptItem[];
  onInspectPlate: (plate: LightboxPlateItem) => void;
}

export const ConceptSection: React.FC<ConceptSectionProps> = ({
  concepts,
  onInspectPlate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', ...Array.from(new Set(concepts.map((c) => c.categoryTag)))];

  const filteredConcepts = concepts.filter((concept) => {
    const matchesCategory =
      selectedCategory === 'ALL' || concept.categoryTag === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      concept.title.toLowerCase().includes(q) ||
      concept.categoryTag.toLowerCase().includes(q) ||
      concept.visualExample.artworkTitle.toLowerCase().includes(q) ||
      concept.visualExample.artist.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const handleCategoryChange = (cat: string) => {
    runWithViewTransition(() => setSelectedCategory(cat));
  };

  const handleResetFilters = () => {
    runWithViewTransition(() => {
      setSelectedCategory('ALL');
      setSearchQuery('');
    });
  };

  return (
    <section
      id="part-2-concepts"
      tabIndex={-1}
      className="exhibition-section section-concepts"
      aria-labelledby="part-2-heading"
    >
      <div className="container">
        <div className="room-header-placard" data-reveal="">
          <span className="room-index-label">CLASS LEARNING HIGHLIGHTS</span>
          <div className="room-header-split">
            <div>
              <h2 id="part-2-heading" className="section-title">
                What I Learned in Art Appreciation
              </h2>
              <p className="section-lead">
                Five key topics we covered this semester. Each topic pairs a class lesson with a
                famous artwork example and my thoughts on why it helps us understand art.
              </p>
            </div>
            <div className="concept-filter-controls" role="region" aria-label="Filter learning topics">
              <div className="search-field-group">
                <label htmlFor="concept-search-input" className="field-label">
                  Search Topics or Artworks
                </label>
                <input
                  id="concept-search-input"
                  type="search"
                  className="search-input"
                  placeholder="Type a topic, artwork, or artist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-pill-row" role="group" aria-label="Filter by topic category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`btn-filter ${selectedCategory === cat ? 'is-active' : ''}`}
                    aria-pressed={selectedCategory === cat}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat === 'ALL' ? `All Topics (${concepts.length})` : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <nav className="concept-timeline-rail" aria-label="Jump to class topic timeline">
            {concepts.map((concept, idx) => (
              <a
                key={concept.id}
                href={`#${concept.id}-title`}
                onClick={(e) => {
                  if (selectedCategory !== 'ALL' || searchQuery) {
                    e.preventDefault();
                    handleResetFilters();
                    setTimeout(() => {
                      document.getElementById(`${concept.id}-title`)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }, 100);
                  }
                }}
                className="timeline-stop-link"
              >
                <span className="timeline-stop-num">{String(idx + 1).padStart(2, '0')}</span>
                <span className="timeline-stop-label">{concept.categoryTag}</span>
              </a>
            ))}
          </nav>
        </div>

        {filteredConcepts.length === 0 ? (
          <div className="empty-state-panel" role="status">
            <h3 className="empty-state-title">
              No topics match &ldquo;{searchQuery || selectedCategory}&rdquo;
            </h3>
            <p className="empty-state-body">
              Clear your search or filter to show all five class topics again.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleResetFilters}
            >
              Show All 5 Topics
            </button>
          </div>
        ) : (
          <div className="concepts-corridor-list">
            {filteredConcepts.map((concept, index) => {
              const isReversed = index % 2 === 1;
              const ownWords = concept.ownWordsExplanation.trim();
              const importance = concept.importanceExplanation.trim();
              const numeral = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={concept.id}
                  className={`concept-corridor-entry ${isReversed ? 'is-reversed' : ''}`}
                  style={{ viewTransitionName: `concept-${concept.id}` } as React.CSSProperties}
                  aria-labelledby={`${concept.id}-title`}
                >
                  <div className="concept-narrative-col">
                    <span className="concept-watermark-num" aria-hidden="true">
                      {numeral}
                    </span>
                    <div className="concept-meta-header">
                      <span className="concept-catalog-num">{concept.catalogNumber}</span>
                      <span className="concept-category-tag">{concept.categoryTag}</span>
                    </div>

                    <h3 id={`${concept.id}-title`} className="concept-title">
                      {concept.title}
                    </h3>

                    <div className="concept-analysis-block">
                      <h4 className="subblock-heading">In My Own Words</h4>
                      {ownWords ? (
                        <p className="essay-prose">{ownWords}</p>
                      ) : (
                        <div className="blank-answer-slot" />
                      )}
                    </div>

                    <div className="concept-analysis-block">
                      <h4 className="subblock-heading">
                        Why This Helps Us Understand and Appreciate Art
                      </h4>
                      {importance ? (
                        <p className="essay-prose">{importance}</p>
                      ) : (
                        <div className="blank-answer-slot" />
                      )}
                    </div>
                  </div>

                  <figure className="concept-visual-col">
                    <div className="museum-framed-plate">
                      <button
                        type="button"
                        className="plate-inspect-trigger"
                        onClick={() =>
                          onInspectPlate({
                            label: `${concept.catalogNumber} · EXAMPLE`,
                            title: concept.visualExample.artworkTitle,
                            artist: concept.visualExample.artist,
                            year: concept.visualExample.year,
                            location: concept.visualExample.origin,
                            imageUrl: concept.visualExample.imageUrl,
                            fallbackSvgUrl: concept.visualExample.fallbackSvgUrl,
                            imageAlt: concept.visualExample.imageAlt,
                            width: concept.visualExample.width,
                            height: concept.visualExample.height,
                            caption: concept.visualExample.caption,
                          })
                        }
                        aria-label={`View ${concept.visualExample.artworkTitle} in full view`}
                      >
                        <ArtworkImage
                          src={concept.visualExample.imageUrl}
                          fallbackSrc={concept.visualExample.fallbackSvgUrl}
                          alt={concept.visualExample.imageAlt}
                          aspectRatio={`${concept.visualExample.width} / ${concept.visualExample.height}`}
                          fit="contain"
                          width={concept.visualExample.width}
                          height={concept.visualExample.height}
                        />
                        <span className="plate-inspect-pill">
                          <ZoomLoupeIcon />
                          <span>View Closer</span>
                        </span>
                      </button>
                    </div>
                    <figcaption className="museum-placard-caption">
                      <div className="placard-title-line">
                        <strong>{concept.visualExample.artworkTitle}</strong> (
                        {concept.visualExample.year})
                      </div>
                      <div className="placard-meta-line">
                        {concept.visualExample.artist} · {concept.visualExample.origin}
                      </div>
                      <p className="placard-description">{concept.visualExample.caption}</p>
                    </figcaption>
                  </figure>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
