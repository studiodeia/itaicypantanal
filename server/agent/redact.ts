/**
 * PII redaction — applied to all user input before persisting to logs.
 * LGPD/GDPR compliance: minimise data retention, mask sensitive identifiers.
 *
 * Patterns covered:
 *   - Email addresses
 *   - Brazilian phone numbers (various formats)
 *   - CPF (with or without formatting)
 *   - Credit / debit card numbers (16-digit groups)
 *   - Cloudbeds / hotel confirmation codes (CBxxxxxx, RES-xxxxx)
 */

type Pattern = () => RegExp;

const PATTERNS: Pattern[] = [
  // Email
  () => /\b[\w.+\-]+@[\w\-]+\.[\w.]{2,}\b/g,
  // Brazilian phone: +55 (11) 98765-4321 / (11) 98765-4321 / 11987654321
  () => /\b(?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?\d{4,5}[\s\-]?\d{4}\b/g,
  // CPF: 123.456.789-09 / 12345678909
  () => /\b\d{3}\.?\d{3}\.?\d{3}[\-\s]?\d{2}\b/g,
  // Card: 16 digits in groups of 4
  () => /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g,
  // Reservation codes (e.g. CB123456, RES-78901)
  () => /\b(?:CB|RES|RSV)[\-]?[A-Z0-9]{4,12}\b/gi,
];

/**
 * Returns a copy of `text` with PII replaced by `[REDACTED]`.
 * Safe to call with null/undefined — returns null in those cases.
 */
export function redactPii(text: string | null | undefined): string | null {
  if (text == null) return null;
  let result = text;
  for (const makePattern of PATTERNS) {
    result = result.replace(makePattern(), "[REDACTED]");
  }
  return result;
}
