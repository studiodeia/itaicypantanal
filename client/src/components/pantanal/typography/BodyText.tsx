import { cn } from "@/lib/utils";

interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "primary" | "secondary" | "muted" | "tertiary" | "highlight" | "quarternary";
  theme?: "dark" | "light";
  as?: "p" | "span" | "div";
}

export function BodyText({
  children,
  className,
  size = "md",
  variant = "muted",
  theme = "dark",
  as: Component = "p",
  ...props
}: BodyTextProps) {
  const sizeClass = {
    lg: "text-body-lg",
    md: "text-body-md",
    sm: "text-body-sm",
    xs: "text-body-xs",
  }[size];

  const darkVariants = {
    primary: "text-pantanal-light-primary",
    secondary: "text-pantanal-light-secondary",
    muted: "text-pantanal-light-muted",
    tertiary: "text-pantanal-light-tertiary",
    highlight: "text-pantanal-light-highlight",
    quarternary: "text-pantanal-light-quarternary",
  };

  const lightVariants = {
    primary: "text-pantanal-darkText-primary",
    secondary: "text-pantanal-darkText-secondary",
    muted: "text-pantanal-darkText-muted",
    tertiary: "text-pantanal-darkText-secondary",
    highlight: "text-pantanal-light-highlight",
    quarternary: "text-pantanal-light-numberMuted",
  };

  const variantClass = (theme === "light" ? lightVariants : darkVariants)[variant];

  return (
    <Component
      className={cn(sizeClass, variantClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
