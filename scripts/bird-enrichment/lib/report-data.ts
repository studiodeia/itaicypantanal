import type { ReportMetadata, Tier } from "./types.js";

/**
 * Data extracted from relatorio-itaicy.pdf (João Andriola, jun/2024).
 * Hardcoded here to avoid runtime PDF parsing dependency.
 * Source: pages 3-7 of the report.
 */

/** Section 2.2.1 — Espécies ameaçadas de extinção (IUCN) */
export const threatenedSpecies: Record<string, string> = {
  "Crax fasciolata": "VU",
  "Pipile cujubi": "VU",        // CSV uses "Pipile cujubi", report mentions "Aburria cujubi" (synonym)
  "Penelope ochrogaster": "VU",
  "Amazona aestiva": "NT",
};

/** Section 2.2.2 — Espécies de distribuição restrita ao Pantanal */
export const pantanalRestrictedSpecies: string[] = [
  "Ortalis canicollis",
  "Phaethornis nattereri",
  "Celeus lugubris",
  "Cercomacra melanaria",
  "Pyriglena maura",
  "Pseudoseisura unirufa",
  "Synallaxis albilora",
  "Xiphocolaptes major",
];

/** Section 2.2.3 — Demais espécies notáveis */
export const notableSpecies: Record<string, string> = {
  "Nyctiprogne leucopyga": "Ocorrência restrita à Amazônia e planície pantaneira, dependente de áreas florestadas às margens de corpos d'água.",
  "Primolius auricollis": "Ocorrente na bacia do Araguaia e planície pantaneira, espécie com deficiência de dados sobre sua história natural.",
  "Pseudocolopteryx acutipennis": "Espécie migratória que chega à planície pantaneira durante os meses de inverno. Dinâmica migratória na região pouco conhecida.",
  "Pseudocolopteryx flaviventris": "Espécie migratória, segundo registro para o estado de Mato Grosso.",
};

/** Figure 07 (pages 19-23) — Photo labels mapped to species */
export const photoLabels: Record<string, string[]> = {
  "Columbina squammata": ["A"],
  "Podager nacunda": ["B"],
  "Jabiru mycteria": ["C"],
  "Nannopterum brasilianus": ["D"],
  "Egretta caerulea": ["E"],
  "Theristicus caudatus": ["F"],
  "Theristicus caerulescens": ["G"],
  "Eurypyga helias": ["H"],
  "Aramides cajaneus": ["I"],
  "Pandion haliaetus": ["J"],
  "Tyto furcata": ["K"],
  "Monasa nigrifrons": ["L"],
  "Megaceryle torquata": ["M"],
  "Piculus chrysochloros": ["N"],
  "Furnarius leucopus": ["O"],
  "Arundinicola leucocephala": ["P"],
  "Campylorhynchus turdinus": ["Q"],
  "Turdus rufiventris": ["R"],
  "Psarocolius decumanus": ["S"],
  "Icterus croconotus": ["T"],
  "Agelasticus cyanopus": ["U"],
  "Paroaria capitata": ["V"],
  "Eucometis penicillata": ["X"],
  "Sporophila collaris": ["Y"],
};

/** Figure 01 (page 4) — Threatened species photos */
export const threatenedPhotoLabels: Record<string, string[]> = {
  "Pipile cujubi": ["Fig01-A"],
  "Penelope ochrogaster": ["Fig01-B"],
};

/** Figure 02 (pages 5-6) — Pantanal-restricted species photos */
export const restrictedPhotoLabels: Record<string, string[]> = {
  "Ortalis canicollis": ["Fig02-A"],
  "Celeus lugubris": ["Fig02-B"],
  "Cercomacra melanaria": ["Fig02-C"],
  "Pyriglena maura": ["Fig02-D"],
  "Pseudoseisura unirufa": ["Fig02-E"],
  "Synallaxis albilora": ["Fig02-F"],
};

/** Figure 03 (page 7) — Notable species photos */
export const notablePhotoLabels: Record<string, string[]> = {
  "Nyctiprogne leucopyga": ["Fig03-A"],
  "Primolius auricollis": ["Fig03-B"],
  "Pseudocolopteryx acutipennis": ["Fig03-C"],
  "Pseudocolopteryx flaviventris": ["Fig03-D"],
};

/** Known CSV errors to fix during parsing */
export const csvFixes: Record<string, { commonNameEN: string }> = {
  // Phimosus infuscatus is Bare-faced Ibis, NOT Roseate Spoonbill
  "Phimosus infuscatus": { commonNameEN: "Bare-faced Ibis" },
};

/** Build report metadata for a species */
export function getReportMetadata(scientificName: string): ReportMetadata {
  const allPhotoLabels = [
    ...((photoLabels[scientificName] ?? [])),
    ...((threatenedPhotoLabels[scientificName] ?? [])),
    ...((restrictedPhotoLabels[scientificName] ?? [])),
    ...((notablePhotoLabels[scientificName] ?? [])),
  ];

  return {
    isThreatened: scientificName in threatenedSpecies,
    iucnFromReport: threatenedSpecies[scientificName] ?? null,
    isPantanalRestricted: pantanalRestrictedSpecies.includes(scientificName),
    isNotable: scientificName in notableSpecies,
    notableReason: notableSpecies[scientificName] ?? null,
    photoLabels: allPhotoLabels,
  };
}

/** Determine tier for a species */
export function getTier(scientificName: string): Tier {
  // Tier 1: threatened + restricted + notable
  if (
    scientificName in threatenedSpecies ||
    pantanalRestrictedSpecies.includes(scientificName) ||
    scientificName in notableSpecies
  ) {
    return 1;
  }

  // Tier 2: iconic/tourist species
  const tier2Species = [
    "Jabiru mycteria",        // Tuiuiú — symbol of Pantanal
    "Anodorhynchus hyacinthinus", // Arara-azul (not in CSV but in seed)
    "Ara ararauna",           // Arara-canindé
    "Ramphastos toco",        // Tucanuçu
    "Platalea ajaja",         // Colhereiro
    "Ardea alba",             // Garça-branca-grande
    "Anhinga anhinga",        // Biguatinga
    "Caracara plancus",       // Carcará
    "Jacana jacana",          // Jaçanã
    "Pandion haliaetus",      // Águia-pescadora
    "Megaceryle torquata",    // Martim-pescador-grande
    "Nyctibius griseus",      // Urutau
    "Aramus guarauna",        // Carão
    "Paroaria capitata",      // Cavalaria
    "Icterus croconotus",     // João-pinto
  ];

  if (tier2Species.includes(scientificName)) {
    return 2;
  }

  return 3;
}
