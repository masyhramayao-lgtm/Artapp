export interface StudentProfileContent {
  portfolioTitle: string;
  exhibitionSubtitle: string;
  studentName: string;
  courseYearSection: string;
  instructorName: string;
  academicTerm: string;
  institution: string;
  personalIntroduction: string;
  initialPerceptionOfArt: string;
  heroArtwork: {
    title: string;
    artist: string;
    year: string;
    medium: string;
    collection: string;
    imageUrl: string;
    fallbackSvgUrl: string;
    imageAlt: string;
    width: number;
    height: number;
  };
}

export interface ConceptVisualExample {
  artworkTitle: string;
  artist: string;
  year: string;
  origin: string;
  imageUrl: string;
  fallbackSvgUrl: string;
  imageAlt: string;
  caption: string;
  width: number;
  height: number;
}

export interface LearningConceptItem {
  id: string;
  catalogNumber: string;
  categoryTag: string;
  title: string;
  ownWordsExplanation: string;
  importanceExplanation: string;
  visualExample: ConceptVisualExample;
}

export interface GalleryArtworkItem {
  id: string;
  catalogCode: string;
  traditionWing: 'western' | 'asian';
  movementOrTradition: string;
  title: string;
  artist: string;
  originCivilization: string;
  historicalPeriod: string;
  dateCreated: string;
  dimensionsAndMedium: string;
  currentLocation: string;
  imageUrl: string;
  fallbackSvgUrl: string;
  imageAlt: string;
  width: number;
  height: number;
  artisticCharacteristics: {
    elementsAndPrinciples: string;
    styleMediumTechnique: string;
    studentAnalysis: string;
  };
  historicalAndCulturalSignificance: {
    historicalContext: string;
    studentSignificance: string;
  };
  personalAppreciation: {
    wordCountTarget: string;
    text: string;
    guidingQuestions: string[];
  };
  creditId: string;
}

export interface OriginalArtworkContent {
  exhibitionLabel: string;
  title: string;
  dateCompleted: string;
  dimensions: string;
  mediumAndMaterials: string;
  artisticInspiration: string;
  imageUrl: string;
  fallbackSvgUrl: string;
  imageAlt: string;
  artistStatement: {
    wordCountTarget: string;
    fullStatement: string;
    conceptBreakdown: string;
    creativeProcess: string;
    elementsAndPrinciplesApplied: string;
    intendedMeaningOrMessage: string;
  };
}

export interface FavoriteMasterpieceContent {
  exhibitionLabel: string;
  title: string;
  artist: string;
  dateCreated: string;
  movementOrPeriod: string;
  medium: string;
  currentCollection: string;
  imageUrl: string;
  fallbackSvgUrl: string;
  imageAlt: string;
  width: number;
  height: number;
  historicalBackground: string;
  subjectMatterDescription: string;
  elementsAndPrinciplesAnalysis: {
    lineAndBrushwork: string;
    colorAndLight: string;
    compositionAndBalance: string;
    movementAndRhythm: string;
  };
  meaningSymbolismInterpretation: string;
  personalAppreciation: {
    wordCountTarget: string;
    text: string;
  };
  creditId: string;
}

export interface ReflectionPromptSection {
  id: string;
  numeral: string;
  promptTitle: string;
  response: string;
}

export interface FinalReflectionContent {
  sectionTitle: string;
  wordCountTarget: string;
  unifiedEssay: string;
  structuredPrompts: ReflectionPromptSection[];
  closingStatement: {
    heading: string;
    statement: string;
  };
}

export interface ReferenceCreditItem {
  id: string;
  sectionUsed: string;
  artworkOrTopic: string;
  creatorAndDate: string;
  museumOrRepository: string;
  licenseOrAttribution: string;
  sourceUrl?: string;
}

export interface ClassicalTrackItem {
  id: string;
  title: string;
  composer: string;
  workSubtitle: string;
  durationLabel: string;
  audioUrl: string;
}

export interface LightboxPlateItem {
  label: string;
  title: string;
  artist: string;
  year: string;
  medium?: string;
  location?: string;
  imageUrl: string;
  fallbackSvgUrl: string;
  imageAlt: string;
  caption?: string;
  width?: number;
  height?: number;
}
