import { type ComponentPropsWithoutRef, useState } from "react";

const PLACEHOLDER = "/images/bird-placeholder.webp";

function isExternalUrl(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

interface BirdImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src"> {
  /** Local path without extension OR external URL */
  src: string;
}

/**
 * Image component for bird species that handles:
 * - Local paths (uses OptimizedImage-style <picture> with avif/webp)
 * - External URLs (Wikimedia Commons etc — uses <img> directly)
 * - Missing/broken images (falls back to placeholder)
 */
export function BirdImage({ src, alt = "", ...imgProps }: BirdImageProps) {
  const [errored, setErrored] = useState(false);
  const loading = imgProps.loading ?? "lazy";
  const decoding = imgProps.decoding ?? "async";

  const handleError = () => {
    if (!errored) setErrored(true);
  };

  // No src or already errored → placeholder
  if (!src || errored) {
    return (
      <img
        src={PLACEHOLDER}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...imgProps}
      />
    );
  }

  // External URL → use directly
  if (isExternalUrl(src)) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onError={handleError}
        {...imgProps}
      />
    );
  }

  // Local path → picture with avif/webp sources
  return (
    <picture>
      <source srcSet={`${src}.avif`} type="image/avif" />
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.webp`}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onError={handleError}
        {...imgProps}
      />
    </picture>
  );
}
