import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface GoldButtonProps extends ButtonProps {
  children: React.ReactNode;
  buttonSize?: "sm" | "lg";
}

/** Classes para elementos <a> com estilo gold CTA (tamanho sm) */
export const goldButtonClass = [
  "bg-pantanal-gold hover:bg-pantanal-gold-hover text-pantanal-light-secondary",
  "font-functional-sm",
  "font-[number:var(--functional-sm-font-weight)]",
  "text-[length:var(--functional-sm-font-size)]",
  "tracking-[var(--functional-sm-letter-spacing)]",
  "leading-[var(--functional-sm-line-height)]",
  "[font-style:var(--functional-sm-font-style)]",
  "rounded px-4 py-2 h-auto",
  "inline-flex items-center justify-center whitespace-nowrap",
  "transition-all duration-300",
  "hover:-translate-y-0.5 active:translate-y-0 active:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]",
].join(" ");

/** Classes para elementos <a> com estilo gold CTA (tamanho lg) */
export const goldButtonLgClass = [
  "bg-pantanal-gold hover:bg-pantanal-gold-hover text-pantanal-light-secondary",
  "h-auto lg:h-[56px]",
  "font-functional-lg font-[number:var(--functional-lg-font-weight)] tracking-[0]",
  "text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px]",
  "px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]",
  "rounded-md inline-flex items-center justify-center whitespace-nowrap",
  "transition-all duration-300",
  "hover:-translate-y-0.5 active:translate-y-0 active:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]",
].join(" ");

export function GoldButton({
  children,
  className,
  buttonSize = "sm",
  ...props
}: GoldButtonProps) {
  return (
    <Button
      className={cn(buttonSize === "lg" ? goldButtonLgClass : goldButtonClass, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
