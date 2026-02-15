/** Raw species from CSV parsing */
export interface CsvSpecies {
  scientificName: string;
  commonNamePT: string;
  commonNameEN: string;
  order: string;
  family: string;
}

/** GBIF species match result */
export interface GbifMatch {
  usageKey: number;
  scientificName: string;
  canonicalName: string;
  order: string;
  family: string;
  genus: string;
  status: "ACCEPTED" | "SYNONYM" | string;
  confidence: number;
  matchType: "EXACT" | "FUZZY" | "HIGHERRANK" | "NONE" | string;
  synonym?: string;
  note?: string;
}

/** Wikidata enrichment result */
export interface WikidataResult {
  qid: string;
  iucnStatus: string | null;
  lengthCm: number | null;
  massG: number | null;
  wikimediaImage: string | null;
  wikipediaPT: string | null;
  wikipediaEN: string | null;
}

/** Tier classification */
export type Tier = 1 | 2 | 3;

/** Report-derived metadata */
export interface ReportMetadata {
  isThreatened: boolean;
  iucnFromReport: string | null;
  isPantanalRestricted: boolean;
  isNotable: boolean;
  notableReason: string | null;
  photoLabels: string[];
}

/** Consolidated species data (output of Camada 1+2) */
export interface EnrichedSpecies {
  // Source CSV
  scientificName: string;
  commonNamePT: string;
  commonNameEN: string;
  csvOrder: string;
  csvFamily: string;

  // GBIF
  gbif: GbifMatch | null;

  // Wikidata
  wikidata: WikidataResult | null;

  // Report
  report: ReportMetadata;

  // Tier
  tier: Tier;

  // Firecrawl raw text (paths to .md files, not inline)
  firecrawlFiles: {
    wikiPT?: string;
    wikiEN?: string;
    wikiAves?: string;
  };
}

/** LLM-generated editorial content */
export interface EditorialContent {
  description: string;
  overview: string;
  habitat: string;
  diet: string;
  behavior: string;
  bestTime: string;
  photographyTips: string[];
  size: string;
  conservationStatus: string;
}

/** Final seed format (compatible with importSeed.ts SeedBirdDetail) */
export interface SeedSpecies {
  slug: string;
  commonName: string;
  scientificName: string;
  description: string;
  category: string;
  tag: string;
  src: string;
  author: string;
  date: string;
}

export interface SeedSpeciesDetail extends SeedSpecies {
  heroImage: string;
  conservationStatus: string;
  size: string;
  habitat: string;
  overview: string;
  diet: string;
  behavior: string;
  bestTime: string;
  photographyTips: string[];
  relatedSlugs: string[];
}
