import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

type GoldButtonSize = "default" | "lg";

interface GoldButtonProps extends ButtonProps {
  children: React.ReactNode;
  buttonSize?: GoldButtonSize;
}

const baseClass =
  "bg-[#ac8042] hover:bg-[#8f6a35] text-[#f2fcf7] shadow-none rounded-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]";

const sizeClasses = {
  default:
    "font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] px-4 py-2",
  lg: "h-auto lg:h-[56px] text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px] px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]",
} as const;

export function GoldButton({
  children,
  className,
  buttonSize = "default",
  ...props
}: GoldButtonProps) {
  return (
    <Button
      className={cn(baseClass, sizeClasses[buttonSize], className)}
      {...props}
    >
      {children}
    </Button>
  );
}
