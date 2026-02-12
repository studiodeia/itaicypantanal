import { cn } from "@/lib/utils";

interface LeadTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  theme?: "dark" | "light";
  as?: "p" | "span";
}

export function LeadText({
  children,
  className,
  theme = "dark",
  as: Component = "p",
  ...props
}: LeadTextProps) {
  const colorClass = theme === "light"
    ? "text-pantanal-darkText-muted"
    : "text-pantanal-light-muted";

  return (
    <Component
      className={cn("text-lead-md uppercase", colorClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
