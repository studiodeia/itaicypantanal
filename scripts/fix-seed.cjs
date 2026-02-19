#!/usr/bin/env node
/**
 * Fix corrupted full-seed.json:
 * 1. Strip leading non-JSON bytes (U+FFFD / BOM / etc)
 * 2. Smart-replace U+FFFD based on context
 * 3. Fix PowerShell-style `r`n line endings → \n
 * 4. Strip NUL bytes and other illegal control chars inside string values
 * 5. Validate JSON
 */
const fs = require("fs");
const path = require("path");

const seedPath = path.resolve(
  __dirname,
  "..",
  "docs",
  "payload-seed",
  "full-seed.json"
);

const buf = fs.readFileSync(seedPath);
console.log("Original size:", buf.length, "bytes");

// Step 1: Work at byte level — strip leading bytes, fix `r`n, remove NUL
// Find first '{' or '[' byte
let start = 0;
for (let i = 0; i < Math.min(buf.length, 20); i++) {
  if (buf[i] === 0x7b || buf[i] === 0x5b) {
    start = i;
    break;
  }
}
console.log("Stripping", start, "leading bytes");

// Remove NUL bytes (0x00) from the buffer
const cleanBytes = [];
const slice = buf.subarray(start);
let nulCount = 0;
for (let i = 0; i < slice.length; i++) {
  if (slice[i] === 0x00) {
    nulCount++;
    continue;
  }
  cleanBytes.push(slice[i]);
}
if (nulCount > 0) console.log("Removed", nulCount, "NUL bytes");

let text = Buffer.from(cleanBytes).toString("utf8");

// Step 2: Fix PowerShell `r`n → \n
const rnCount = (text.match(/`r`n/g) || []).length;
text = text.replace(/`r`n/g, "\n");
if (rnCount > 0) console.log("Fixed", rnCount, "PowerShell `r`n sequences");

// Step 3: Smart FFFD replacement
const allFffd = text.match(/\uFFFD/g);
console.log("U+FFFD occurrences:", allFffd ? allFffd.length : 0);

let replaced = 0;

// Pattern 1: FFFD + "0 " → É (capital E-acute) + space
text = text.replace(/\uFFFD0 /g, () => { replaced++; return "\u00C9 "; });
// Pattern 1b: FFFD + "0," or "0." → É + punctuation
text = text.replace(/\uFFFD0([,.\n\r}"])/g, (_m, a) => { replaced++; return "\u00C9" + a; });

// Pattern 2: FFFD at start of word (followed by lowercase) → Ú
text = text.replace(/\uFFFD([a-z])/g, (_m, l) => { replaced++; return "\u00DA" + l; });

// Pattern 3: remaining FFFD → em-dash (—)
text = text.replace(/\uFFFD/g, () => { replaced++; return "\u2014"; });
console.log("FFFD replacements:", replaced);

// Step 4: Remove remaining problematic control chars (keep \t \n \r)
const ctrlBefore = (text.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g) || []).length;
text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
if (ctrlBefore > 0) console.log("Stripped", ctrlBefore, "control chars");

// Step 5: Validate JSON
try {
  JSON.parse(text);
  console.log("JSON validation: PASSED");
} catch (err) {
  // Try to show context around the error
  const posMatch = err.message.match(/position (\d+)/);
  if (posMatch) {
    const pos = parseInt(posMatch[1]);
    const context = text.substring(Math.max(0, pos - 50), pos + 50);
    console.error("Context around error:", JSON.stringify(context));
  }
  console.error("JSON validation: FAILED -", err.message);
  process.exit(1);
}

// Write clean file
fs.writeFileSync(seedPath, text, "utf8");
const newBuf = fs.readFileSync(seedPath);
console.log("New size:", newBuf.length, "bytes");
console.log(
  "New first 10 bytes hex:",
  [...newBuf.subarray(0, 10)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ")
);
console.log("Done!");
