import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface OutlineButtonProps extends ButtonProps {
  children: React.ReactNode;
}

/** Classes para elementos <a> com estilo outline (ex: Link wouter) */
export const outlineButtonClass = [
  "h-auto lg:h-[56px] bg-transparent",
  "text-pantanal-light-primary border border-pantanal-border-primary",
  "text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px]",
  "font-[number:var(--functional-lg-font-weight)] tracking-[0]",
  "px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]",
  "rounded-md inline-flex items-center justify-center whitespace-nowrap",
  "transition-all duration-300",
  "hover:bg-pantanal-light-secondary hover:text-pantanal-dark-primary hover:-translate-y-0.5",
  "active:translate-y-0 active:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,252,247,0.3)]",
].join(" ");

export function OutlineButton({
  children,
  className,
  ...props
}: OutlineButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(outlineButtonClass, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
