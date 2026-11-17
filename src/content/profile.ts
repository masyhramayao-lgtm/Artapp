import type { StudentProfileContent } from '../types/portfolio';

export const studentProfileContent: StudentProfileContent = {
  portfolioTitle: 'Artistic Journey: My Art Appreciation Website Portfolio',
  exhibitionSubtitle:
    'A personal portfolio sharing what I learned in Art Appreciation, the artworks I studied, and my own thoughts about art.',
  studentName: 'Ma. Syhra Dl. Mayao',
  courseYearSection: 'AB Psychology 1st Year, 1579',
  instructorName: 'Ervin Oronan',
  academicTerm: '2026-2027 First Semester',
  institution: 'University of Nueva Caceres',
  personalIntroduction:
    'I am Ma. Syhra Dl. Mayao, currently a 1st Year AB Psychology student. I am not very fond of art, but I love showing my creativity through makeup because it helps me feel more confident and creative.',
  initialPerceptionOfArt:
    'To be honest, I was not interested in this subject at first. As time passed, though, I started to love it because it is actually fun and interesting. I enjoyed learning about the different kinds of art, seeing works by many artisans, learning why art matters, and studying art history.',
  heroArtwork: {
    title: 'The School of Athens (Scuola di Atene)',
    artist: 'Raphael (Raffaello Sanzio da Urbino)',
    year: '1509 to 1511',
    medium: 'Wall painting on plaster (500 cm x 770 cm)',
    collection: 'Apostolic Palace, Vatican City',
    imageUrl: '/images/school-of-athens.jpg',
    fallbackSvgUrl: '/images/archival-fallback.svg',
    imageAlt:
      'Raphael painting The School of Athens showing classical thinkers gathered inside a large arched hall',
    width: 960,
    height: 745,
  },
};
