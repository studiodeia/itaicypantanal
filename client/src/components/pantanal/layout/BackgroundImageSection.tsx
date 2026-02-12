import { cn } from "@/lib/utils";

interface BackgroundImageSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  backgroundImage: string;
  overlayGradient?: string;
  as?: "section" | "div";
}

const defaultOverlay = "linear-gradient(270deg, rgba(21,34,24,0) 0%, rgba(21,34,24,0.64) 100%), linear-gradient(0deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%)";

export function BackgroundImageSection({
  children,
  backgroundImage,
  overlayGradient = defaultOverlay,
  as: Component = "section",
  className,
  style,
  ...props
}: BackgroundImageSectionProps) {
  return (
    <Component
      className={cn(
        "flex flex-col items-start justify-end md:justify-center w-full bg-cover bg-center",
        "min-h-[600px] md:min-h-[600px] lg:min-h-[740px]",
        className
      )}
      style={{
        backgroundImage: `${overlayGradient}, url(${backgroundImage})`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
