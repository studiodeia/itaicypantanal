import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

type GoldButtonSize = "default" | "lg";

interface GoldButtonProps extends ButtonProps {
  children: React.ReactNode;
  buttonSize?: GoldButtonSize;
}

export function GoldButton({
  children,
  className,
  buttonSize = "default",
  ...props
}: GoldButtonProps) {
  const sizeClass = {
    default: "btn-gold",
    lg: "btn-gold h-auto lg:h-[56px] text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px] px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]",
  }[buttonSize];

  return (
    <Button
      className={cn(sizeClass, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
