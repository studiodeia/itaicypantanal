/**
 * wikidata-fixes.ts — Manual Wikidata corrections for species with
 * taxonomic reclassifications (CBRO 2024) or spelling differences.
 *
 * Problem: Wikidata indexes species under old genus names, so searches
 * for the current CBRO name return wrong/empty entities.
 *
 * Sources:
 * - Chionomesa fimbriata: was Amazilia fimbriata (genus reclassified)
 * - Nannopterum brasilianus: was Phalacrocorax brasilianus (genus reclassified)
 * - Bubulcus ibis: Wikidata split into Western/Eastern; Q106447604 is Western
 * - Vanellus chilensis: Wikidata search returned subspecies (Q6159514), not species (Q855348)
 * - Arremon polionotus: split from A. flavirostris; Wikidata still under old name
 * - Campephilus melanoleucus: CSV spelling vs canonical "melanoleucos"
 * - Tachycineta albiventris: CSV spelling vs canonical "albiventer"
 * - Procacicus solitarius: was Cacicus solitarius (genus reclassified)
 */

import type { WikidataResult } from "./types.js";

/**
 * Maps CSV scientific names → Wikidata-searchable synonym/old name.
 * Used when the initial search returns no result or wrong entity.
 */
export const synonymMap: Record<string, string> = {
  "Chionomesa fimbriata": "Amazilia fimbriata",
  "Nannopterum brasilianus": "Phalacrocorax brasilianus",
  "Arremon polionotus": "Arremon flavirostris",
  "Campephilus melanoleucus": "Campephilus melanoleucos",
  "Tachycineta albiventris": "Tachycineta albiventer",
  "Procacicus solitarius": "Cacicus solitarius",
};

/**
 * Hard-coded Wikidata overrides for species where automated search
 * returns incorrect, incomplete, or no data.
 *
 * Each entry was manually verified against Wikidata entity pages.
 */
export const wikidataOverrides: Record<string, WikidataResult> = {
  // Chionomesa fimbriata (Beija-flor-de-garganta-verde)
  // Was Amazilia fimbriata — genus reclassified. Q873437 has full data.
  "Chionomesa fimbriata": {
    qid: "Q873437",
    iucnStatus: "LC",
    lengthCm: null,
    massG: 520,
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Amazilia_fimbriata.jpg",
    wikipediaPT:
      "https://pt.wikipedia.org/wiki/Beija-flor-de-garganta-verde",
    wikipediaEN:
      "https://en.wikipedia.org/wiki/Glittering-throated_emerald",
  },

  // Nannopterum brasilianus (Biguá)
  // Was Phalacrocorax brasilianus. Q849173 is the old species entry (empty sitelinks).
  // Q117254632 has the Wikipedia links and image.
  "Nannopterum brasilianus": {
    qid: "Q117254632",
    iucnStatus: "LC",
    lengthCm: null,
    massG: null, // Q849173 had 42000g which is clearly wrong for a cormorant (~1.2kg)
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Phalacrocorax_brasilianus_(Costa_Rica).jpg",
    wikipediaPT: "https://pt.wikipedia.org/wiki/Bigu%C3%A1",
    wikipediaEN: "https://en.wikipedia.org/wiki/Neotropic_cormorant",
  },

  // Bubulcus ibis (Garça-vaqueira)
  // Wikidata has Q132669 (generic) and Q106447604 (Western Cattle Egret).
  // Q106447604 has the correct Wikipedia PT link.
  "Bubulcus ibis": {
    qid: "Q106447604",
    iucnStatus: "LC",
    lengthCm: null,
    massG: null,
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/H%C3%A9ron_garde_boeufs_%C3%A0_Oued_Mejerda.jpg",
    wikipediaPT: "https://pt.wikipedia.org/wiki/Bubulcus_ibis",
    wikipediaEN: "https://en.wikipedia.org/wiki/Western_cattle_egret",
  },

  // Vanellus chilensis (Quero-quero)
  // Wikidata search returned subspecies Q6159514 (V. c. chilensis).
  // Correct species entity is Q855348.
  "Vanellus chilensis": {
    qid: "Q855348",
    iucnStatus: "LC",
    lengthCm: null,
    massG: 27800,
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Southern_lapwing_(Vanellus_chilensis_chilensis)_Chiloe.jpg",
    wikipediaPT: "https://pt.wikipedia.org/wiki/Quero-quero",
    wikipediaEN: "https://en.wikipedia.org/wiki/Southern_lapwing",
  },

  // Arremon polionotus (Tico-tico-de-bico-amarelo)
  // Split from A. flavirostris. Wikidata still has Q1588810 under old name.
  "Arremon polionotus": {
    qid: "Q1588810",
    iucnStatus: "LC",
    lengthCm: null,
    massG: 2900,
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Arremon_flavirostris_-Piraju%2C_Sao_Paulo%2C_Brazil-8.jpg",
    wikipediaPT:
      "https://pt.wikipedia.org/wiki/Tico-tico-de-bico-amarelo",
    wikipediaEN:
      "https://en.wikipedia.org/wiki/Saffron-billed_sparrow",
  },

  // Campephilus melanoleucus (Pica-pau-de-topete-vermelho)
  // CSV has "melanoleucus" but canonical is "melanoleucos". No Wikidata hit.
  // Correct entity: Q1269588.
  "Campephilus melanoleucus": {
    qid: "Q1269588",
    iucnStatus: "LC",
    lengthCm: null,
    massG: null,
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Crimson-crested_Woodpecker_(Campephilus_melanoleucus)_female_investigating_a_possible_nesting_site_..._(27874788734).jpg",
    wikipediaPT:
      "https://pt.wikipedia.org/wiki/Pica-pau-de-topete-vermelho",
    wikipediaEN:
      "https://en.wikipedia.org/wiki/Crimson-crested_woodpecker",
  },

  // Tachycineta albiventris (Andorinha-do-rio)
  // CSV has "albiventris" but canonical is "albiventer". No Wikidata hit.
  // Correct entity: Q3136328.
  "Tachycineta albiventris": {
    qid: "Q3136328",
    iucnStatus: "LC",
    lengthCm: null,
    massG: null,
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/White-winged_Swallow_1052.jpg",
    wikipediaPT: "https://pt.wikipedia.org/wiki/Andorinha-do-rio",
    wikipediaEN:
      "https://en.wikipedia.org/wiki/White-winged_swallow",
  },

  // Procacicus solitarius (Iraúna-de-bico-branco)
  // Was Cacicus solitarius — genus reclassified. No Wikidata hit under new name.
  // Correct entity: Q944938.
  "Procacicus solitarius": {
    qid: "Q944938",
    iucnStatus: "LC",
    lengthCm: null,
    massG: 80,
    wikimediaImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cacicus_solitarius_-Argentina-8.jpg",
    wikipediaPT:
      "https://pt.wikipedia.org/wiki/Ira%C3%BAna-de-bico-branco",
    wikipediaEN: "https://en.wikipedia.org/wiki/Solitary_cacique",
  },
};
