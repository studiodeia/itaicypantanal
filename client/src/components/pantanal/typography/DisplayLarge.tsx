import { cn } from "@/lib/utils";

interface DisplayLargeProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  theme?: "dark" | "light";
}

export function DisplayLarge({
  children,
  className,
  as: Component = "h1",
  theme = "dark",
  ...props
}: DisplayLargeProps) {
  const colorClass = theme === "light"
    ? "text-pantanal-darkText-primary"
    : "text-pantanal-light-primary";

  return (
    <Component
      className={cn("text-display-lg", colorClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
