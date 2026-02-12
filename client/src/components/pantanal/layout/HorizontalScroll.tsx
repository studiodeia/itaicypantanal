import { cn } from "@/lib/utils";

interface HorizontalScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: "sm" | "md" | "lg";
}

export function HorizontalScroll({
  children,
  gap = "md",
  className,
  ...props
}: HorizontalScrollProps) {
  const gapClass = {
    sm: "gap-3 md:gap-4",
    md: "gap-4 md:gap-6 lg:gap-8",
    lg: "gap-6 md:gap-8 lg:gap-[32px]",
  }[gap];

  return (
    <div
      className={cn(
        "flex overflow-x-auto scrollbar-hide pb-4",
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
