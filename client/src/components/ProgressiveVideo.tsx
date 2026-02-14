import {
  type ComponentPropsWithoutRef,
  type SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
};

interface ProgressiveVideoProps
  extends Omit<ComponentPropsWithoutRef<"video">, "src" | "poster"> {
  src: string;
  lowSrc?: string;
  webmSrc?: string;
  lowWebmSrc?: string;
  poster: string;
  startDelayMs?: number;
  preferLowOnSlowConnection?: boolean;
}

function isSlowConnection(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as NavigatorWithConnection;
  const connection = nav.connection;
  if (!connection) return false;

  return Boolean(
    connection.saveData ||
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g",
  );
}

export function ProgressiveVideo({
  src,
  lowSrc,
  webmSrc,
  lowWebmSrc,
  poster,
  startDelayMs = 1200,
  preferLowOnSlowConnection = true,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  className,
  onError,
  ...videoProps
}: ProgressiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [useLowQuality, setUseLowQuality] = useState(
    preferLowOnSlowConnection && isSlowConnection(),
  );

  const selectedSources = useMemo(() => {
    const mp4 = useLowQuality ? lowSrc ?? src : src;
    const webm = useLowQuality ? lowWebmSrc ?? webmSrc : webmSrc;
    return { mp4, webm };
  }, [lowSrc, lowWebmSrc, src, useLowQuality, webmSrc]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const baseDelay = isSlowConnection() ? startDelayMs * 2 : startDelayMs;
    const timer = window.setTimeout(() => {
      setShouldLoad(true);
    }, baseDelay);

    return () => window.clearTimeout(timer);
  }, [isVisible, startDelayMs]);

  useEffect(() => {
    if (!shouldLoad || !autoPlay) return;
    void videoRef.current?.play().catch(() => {
      // Browser autoplay restrictions can block play; poster remains visible.
    });
  }, [autoPlay, shouldLoad, useLowQuality]);

  const handleError = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (useLowQuality && (lowSrc || lowWebmSrc)) {
      // If low-quality asset is missing/corrupted, fallback to primary source.
      setUseLowQuality(false);
    }

    onError?.(event);
  };

  return (
    <video
      ref={videoRef}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="none"
      poster={poster}
      className={className}
      onError={handleError}
      {...videoProps}
    >
      {shouldLoad && selectedSources.webm ? (
        <source src={selectedSources.webm} type="video/webm" />
      ) : null}
      {shouldLoad ? <source src={selectedSources.mp4} type="video/mp4" /> : null}
    </video>
  );
}
