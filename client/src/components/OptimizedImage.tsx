import { type ComponentPropsWithoutRef } from "react";

interface OptimizedImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src"> {
  /** Base path without extension, e.g. "/images/culinaria-hero-bg" */
  src: string;
  /** Fallback format extension (default: "webp") */
  fallbackFormat?: "webp" | "avif";
}

/**
 * Renders a <picture> element with AVIF and WebP sources for optimized images.
 * Expects files at `{src}.avif` and `{src}.webp` in public/.
 *
 * Usage:
 *   <OptimizedImage src="/images/culinaria-hero-bg" alt="Hero" className="..." />
 */
export function OptimizedImage({
  src,
  fallbackFormat = "webp",
  alt = "",
  ...imgProps
}: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={`${src}.avif`} type="image/avif" />
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.${fallbackFormat}`} alt={alt} {...imgProps} />
    </picture>
  );
}
