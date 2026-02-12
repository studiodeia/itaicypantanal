import { cn } from "@/lib/utils";

interface FunctionalTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  theme?: "dark" | "light";
  as?: "span" | "p" | "div" | "label";
}

export function FunctionalText({
  children,
  className,
  size = "md",
  theme = "dark",
  as: Component = "span",
  ...props
}: FunctionalTextProps) {
  const sizeClass = {
    sm: "text-functional-sm",
    md: "text-functional-md",
    lg: "text-functional-lg",
  }[size];

  const colorClass = theme === "light"
    ? "text-pantanal-darkText-primary"
    : "text-pantanal-light-primary";

  return (
    <Component
      className={cn(sizeClass, colorClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
