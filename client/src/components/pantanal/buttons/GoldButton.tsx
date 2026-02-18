import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface GoldButtonProps extends ButtonProps {
  children: React.ReactNode;
}

/**
 * GoldButton — CTA principal do Design System Itaicy.
 *
 * Estilo único e consistente em todo o site, idêntico ao "Reservar" do header:
 * - bg: #ac8042 → hover #8f6a35
 * - tipografia: functional-sm (Lato 16px/24px, weight 400)
 * - border-radius: 4px (rounded)
 * - padding: 8px 16px
 * - shadow padrão do shadcn
 * - hover: translate-y -2px
 */
/** Classes reutilizáveis para elementos <a> que precisam do estilo gold CTA */
export const goldButtonClass = [
  // cor e fundo
  "bg-pantanal-gold hover:bg-pantanal-gold-hover text-pantanal-light-secondary",
  // tipografia functional-sm
  "font-functional-sm",
  "font-[number:var(--functional-sm-font-weight)]",
  "text-[length:var(--functional-sm-font-size)]",
  "tracking-[var(--functional-sm-letter-spacing)]",
  "leading-[var(--functional-sm-line-height)]",
  "[font-style:var(--functional-sm-font-style)]",
  // forma
  "rounded px-4 py-2 h-auto",
  // layout inline
  "inline-flex items-center justify-center whitespace-nowrap",
  // interação
  "transition-all duration-300",
  "hover:-translate-y-0.5 active:translate-y-0 active:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]",
].join(" ");

export function GoldButton({
  children,
  className,
  ...props
}: GoldButtonProps) {
  return (
    <Button
      className={cn(goldButtonClass, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
