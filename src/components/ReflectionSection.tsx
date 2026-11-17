import React from 'react';
import type { FinalReflectionContent } from '../types/portfolio';
import { splitParagraphs } from '../utils/paragraphs';

interface ReflectionSectionProps {
  reflection: FinalReflectionContent;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({ reflection }) => {
  const essayParagraphs = splitParagraphs(reflection.unifiedEssay);
  const hasEssay = essayParagraphs.length > 0;
  const hasAnyPromptResponse = reflection.structuredPrompts.some((p) => p.response.trim());
  const hasClosing = Boolean(reflection.closingStatement.statement.trim());

  return (
    <section
      id="part-6-reflection"
      tabIndex={-1}
      className="exhibition-section section-final-reflection"
      aria-labelledby="part-6-heading"
    >
      <div className="container">
        <div className="room-header-placard reflection-head" data-reveal="">
          <div>
            <span className="room-index-label">FINAL REFLECTION</span>
            <h2 id="part-6-heading" className="section-title">
              {reflection.sectionTitle}
            </h2>
          </div>
          <p className="section-lead">
            My final thoughts on how my view of art grew this semester, which artworks stood out to
            me most, and how art appreciation connects to everyday life and my future career.
          </p>
        </div>

        {(hasEssay || !hasAnyPromptResponse) && (
          <article className="reflection-main-essay-card reflection-monograph-folio">
            <div className="monograph-corner-rule" aria-hidden="true" />
            <span className="essay-panel-kicker">MAIN ESSAY</span>
            <h3 className="essay-panel-title">My Semester Reflection</h3>
            {hasEssay ? (
              essayParagraphs.map((paragraph, index) => (
                <p key={index} className="essay-prose reflection-reading-prose">
                  {paragraph}
                </p>
              ))
            ) : (
              <div className="blank-answer-slot blank-statement-slot" />
            )}
          </article>
        )}

        {/* Inverted pyramid on desktop: 3 answers, 2 centred answers, then the closing thought */}
        <div className="reflection-grid">
          {reflection.structuredPrompts.map((item) => (
            <article key={item.id} className="reflection-card">
              <span className="prompt-numeral">{item.numeral}</span>
              <h3 className="prompt-title">{item.promptTitle}</h3>
              {item.response.trim() ? (
                <p className="essay-prose reflection-reading-prose">{item.response}</p>
              ) : (
                <div className="blank-answer-slot" />
              )}
            </article>
          ))}

          {hasClosing && (
            <aside
              className="reflection-card is-closing"
              aria-labelledby="closing-statement-title"
            >
              <h3 id="closing-statement-title" className="closing-monument-heading">
                {reflection.closingStatement.heading}
              </h3>
              <blockquote className="closing-blockquote">
                {reflection.closingStatement.statement}
              </blockquote>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};
