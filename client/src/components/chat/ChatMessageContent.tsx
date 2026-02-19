import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

/**
 * Lightweight chat-message renderer.
 * Converts a subset of markdown-like patterns to React elements:
 * - **bold** → <strong>
 * - • bullet\n → <li>
 * - URLs (http/https) → styled button-link (booking links → gold CTA)
 * - \n\n → paragraph break
 *
 * No external dependency — keeps the chat bundle tiny.
 */

type Locale = "pt" | "en" | "es";

const URL_RE = /https?:\/\/[^\s)]+/g;
const BOLD_RE = /\*\*(.+?)\*\*/g;

/** Detect if a URL is a booking engine deep-link */
function isBookingLink(url: string): boolean {
  return /cloudbeds\.com|booking|checkin=/i.test(url);
}

const bookingCta: Record<Locale, string> = { pt: "Reservar agora", en: "Book now", es: "Reservar ahora" };
const openLink: Record<Locale, string> = { pt: "Abrir link", en: "Open link", es: "Abrir enlace" };

/** Get a CTA label for known link types */
function getCtaLabel(url: string, locale: Locale): string {
  if (isBookingLink(url)) return bookingCta[locale];
  return url.replace(/^https?:\/\//, "").split("/")[0] ?? openLink[locale];
}

/** Parse inline bold and URLs inside a text line */
function parseInline(text: string, locale: Locale = "pt"): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  // Merge bold + URL patterns
  const combined = new RegExp(`(${BOLD_RE.source})|(${URL_RE.source})`, "g");
  let match: RegExpExecArray | null;

  while ((match = combined.exec(text)) !== null) {
    // Text before the match
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    if (match[1]) {
      // Bold: **text**
      nodes.push(<strong key={match.index}>{match[2]}</strong>);
    } else {
      // URL
      const url = match[0];
      if (isBookingLink(url)) {
        nodes.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("booking_link_clicked", { url })}
            className="mt-2 mb-1 flex items-center justify-center gap-2 rounded-lg bg-[#ac8042] px-4 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-[#9a7239] active:translate-y-px"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path
                d="M6.667 4H4a1.333 1.333 0 0 0-1.333 1.333v6.667A1.333 1.333 0 0 0 4 13.333h6.667A1.333 1.333 0 0 0 12 12V9.333M9.333 2.667h4m0 0v4m0-4L6.667 9.333"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {getCtaLabel(url, locale)}
          </a>,
        );
      } else {
        nodes.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-[#d1d5db] bg-white px-2 py-1 text-xs font-medium text-[#334155] no-underline transition hover:bg-[#f8fafc]"
          >
            {getCtaLabel(url, locale)}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path
                d="M6.667 4H4a1.333 1.333 0 0 0-1.333 1.333v6.667A1.333 1.333 0 0 0 4 13.333h6.667A1.333 1.333 0 0 0 12 12V9.333M9.333 2.667h4m0 0v4m0-4L6.667 9.333"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>,
        );
      }
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function parseLine(line: string, idx: number, locale: Locale): ReactNode {
  const trimmed = line.trimStart();

  // Bullet line: "• text" or "- text"
  if (/^[•\-]\s/.test(trimmed)) {
    return (
      <li key={idx} className="ml-4 list-disc">
        {parseInline(trimmed.slice(2), locale)}
      </li>
    );
  }

  return <span key={idx}>{parseInline(line, locale)}</span>;
}

export function ChatMessageContent({ text, locale = "pt" }: { text: string; locale?: Locale }) {
  // Split by double newline → paragraphs
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="flex flex-col gap-2.5">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n");
        const hasBullets = lines.some((l) => /^\s*[•\-]\s/.test(l));

        if (hasBullets) {
          return (
            <ul key={pIdx} className="flex flex-col gap-0.5 pl-0 list-none">
              {lines.map((line, lIdx) => parseLine(line, lIdx, locale))}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="m-0">
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {lIdx > 0 ? <br /> : null}
                {parseInline(line, locale)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
