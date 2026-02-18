import { cn } from "@/lib/utils";

interface DividerProps {
  theme?: "dark" | "light";
  className?: string;
}

/**
 * Stroke-contrast separator line.
 * dark  → #F2FCF7 (light stroke on dark bg)
 * light → #344E41 (dark stroke on cream bg)
 */
export const Divider = ({ theme = "dark", className }: DividerProps) => (
  <div
    className={cn(
      "w-full h-px",
      theme === "dark" ? "bg-[#f2fcf7]" : "bg-[#344E41]",
      className
    )}
    role="separator"
  />
);
