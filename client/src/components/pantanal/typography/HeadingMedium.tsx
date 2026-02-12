import { cn } from "@/lib/utils";

interface HeadingMediumProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  theme?: "dark" | "light";
}

export function HeadingMedium({
  children,
  className,
  as: Component = "h3",
  theme = "dark",
  ...props
}: HeadingMediumProps) {
  const colorClass = theme === "light"
    ? "text-pantanal-darkText-primary"
    : "text-pantanal-light-primary";

  return (
    <Component
      className={cn("text-heading-md", colorClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
