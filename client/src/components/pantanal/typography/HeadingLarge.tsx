import { cn } from "@/lib/utils";

interface HeadingLargeProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  theme?: "dark" | "light";
}

export function HeadingLarge({
  children,
  className,
  as: Component = "h2",
  theme = "dark",
  ...props
}: HeadingLargeProps) {
  const colorClass = theme === "light"
    ? "text-pantanal-darkText-primary"
    : "text-pantanal-light-primary";

  return (
    <Component
      className={cn("text-heading-lg", colorClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
