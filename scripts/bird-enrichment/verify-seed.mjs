import { readFileSync } from "fs";
import { resolve } from "path";

const seed = JSON.parse(readFileSync(resolve(import.meta.dirname, "../../docs/payload-seed/full-seed.json"), "utf8"));
const species = seed.birdwatching.species;

const local = species.filter(s => s.src.startsWith("/images/birds/"));
const wiki = species.filter(s => s.src.startsWith("http"));
const empty = species.filter(s => !s.src);

console.log("Local paths:", local.length);
console.log("Wikimedia URLs:", wiki.length);
console.log("Empty src:", empty.length);
console.log("Total:", species.length);
console.log("\nSample local:", local[0]?.slug, local[0]?.src);
console.log("Sample wiki:", wiki[0]?.slug, wiki[0]?.src);
