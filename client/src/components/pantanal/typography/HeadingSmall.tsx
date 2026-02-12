import { cn } from "@/lib/utils";

interface HeadingSmallProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h3" | "h4" | "h5" | "h6" | "span";
  theme?: "dark" | "light";
}

export function HeadingSmall({
  children,
  className,
  as: Component = "h4",
  theme = "dark",
  ...props
}: HeadingSmallProps) {
  const colorClass = theme === "light"
    ? "text-pantanal-darkText-primary"
    : "text-pantanal-light-primary";

  return (
    <Component
      className={cn("text-heading-sm", colorClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
