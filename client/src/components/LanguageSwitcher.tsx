import { cn } from "@/lib/utils";
import { useRef, useCallback, useEffect, type ReactNode } from "react";
import { useLanguage, type Lang } from "@/i18n/context";

const languages: { code: Lang; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

interface LanguageSwitcherProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function LanguageSwitcher({ open, onOpenChange, children }: LanguageSwitcherProps) {
  const { lang: activeLanguage, setLang } = useLanguage();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      onOpenChange(false);
    }, 250);
  }, [onOpenChange, clearCloseTimeout]);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimeout();
    onOpenChange(true);
  }, [onOpenChange, clearCloseTimeout]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  useEffect(() => clearCloseTimeout, [clearCloseTimeout]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={scheduleClose}
    >
      {children}

      <div
        className={cn(
          "absolute top-full right-0 mt-2 min-w-[180px] py-2 rounded-lg z-[60]",
          "glass-menu",
          "shadow-[0_8px_24px_-4px_rgba(10,19,12,0.5)]",
          "border border-[rgba(168,202,185,0.12)]",
          "transition-all duration-200 origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setLang(lang.code);
              onOpenChange(false);
            }}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-all duration-200",
              "font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)]",
              activeLanguage === lang.code
                ? "text-[#e3f7ec]"
                : "text-[#a8cab9] hover:text-[#e3f7ec] hover:bg-[rgba(168,202,185,0.08)]"
            )}
          >
            {activeLanguage === lang.code && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#ac8042] flex-shrink-0" />
            )}
            <span className={activeLanguage !== lang.code ? "ml-[18px]" : ""}>
              {lang.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
