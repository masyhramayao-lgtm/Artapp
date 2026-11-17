import React from 'react';
import type { StudentProfileContent } from '../types/portfolio';

interface HeroProfileSectionProps {
  profile: StudentProfileContent;
}

export const HeroProfileSection: React.FC<HeroProfileSectionProps> = ({ profile }) => {
  return (
    <>
      <section
        id="part-1-profile"
        tabIndex={-1}
        className="exhibition-section museum-home home-hero"
        aria-labelledby="part-1-heading"
      >
        <div className="museum-frame-width home-stage">
          <h1 id="part-1-heading" className="home-wordmark">
            <span className="home-wordmark-line">
              <span>Artistic</span>
              <span className="home-rule" aria-hidden="true" />
            </span>
            <span className="home-wordmark-line is-second">
              <span className="home-rule" aria-hidden="true" />
              <em>Journey</em>
            </span>
            <span className="visually-hidden">: My Art Appreciation Website Portfolio</span>
          </h1>

          <div className="museum-fact-row">
            <p>
              {profile.studentName}
              <br />
              <em>{profile.courseYearSection}</em>
            </p>
            <p>
              {profile.institution}
              <br />
              <em>{profile.academicTerm}</em>
            </p>
            <p>
              Instructor <em>{profile.instructorName}</em>
              <br />
              Art Appreciation <em>Website Portfolio</em>
            </p>
            <div className="home-fact-lead">
              <p>{profile.exhibitionSubtitle}</p>
              <div className="museum-action-row">
                <a href="#part-2-concepts" className="museum-btn is-solid">
                  Start Reading: Class Highlights
                </a>
                <a href="#part-3-galleries" className="museum-btn">
                  Jump to Art Gallery
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="part-1-about"
        className="exhibition-section museum-home"
        aria-labelledby="part-1-about-heading"
      >
        <div className="museum-frame-width home-about" data-reveal="">
          <figure className="home-portrait">
            <div className="gilt-frame">
              <img
                src="/images/profilepicture.png"
                alt={`Portrait of ${profile.studentName}, smiling, with auburn hair and a burgundy one-shoulder dress`}
                width={2048}
                height={1366}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="wall-label">
              <p className="wall-label-title">{profile.studentName}</p>
              <p className="wall-label-artist">{profile.courseYearSection}</p>
            </figcaption>
          </figure>
          <h2 id="part-1-about-heading" className="home-about-title">
            Personal Introduction &amp; First Impressions
          </h2>
          <article className="home-about-col">
            <h3>Personal Introduction</h3>
            <p>{profile.personalIntroduction}</p>
          </article>
          <article className="home-about-col">
            <h3>How I Viewed Art Before Taking This Subject</h3>
            <p>{profile.initialPerceptionOfArt}</p>
          </article>
        </div>
      </section>
    </>
  );
};
