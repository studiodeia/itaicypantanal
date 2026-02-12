import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: "primary" | "secondary" | "medium" | "cream" | "image";
  backgroundImage?: string;
  overlayGradient?: string;
  as?: "section" | "div" | "footer";
  padded?: boolean;
}

const defaultOverlay = "linear-gradient(0deg, rgba(21,34,24,0.5) 0%, rgba(21,34,24,0) 100%), linear-gradient(0deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%)";

export function SectionContainer({
  children,
  className,
  background = "primary",
  backgroundImage,
  overlayGradient = defaultOverlay,
  as: Component = "section",
  padded = true,
  ...props
}: SectionContainerProps) {
  const bgClass = {
    primary: "bg-pantanal-dark-primary",
    secondary: "bg-pantanal-dark-secondary",
    medium: "bg-pantanal-medium",
    cream: "bg-pantanal-cream",
    image: "",
  }[background];

  const imageStyle = background === "image" && backgroundImage
    ? {
        backgroundImage: `${overlayGradient}, url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <Component
      className={cn(
        "flex flex-col items-center w-full",
        bgClass,
        padded && "section-padding",
        className
      )}
      style={imageStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
