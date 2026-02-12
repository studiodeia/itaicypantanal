import { cn } from "@/lib/utils";
import { LeadText } from "../typography/LeadText";
import { HeadingLarge } from "../typography/HeadingLarge";
import { BodyText } from "../typography/BodyText";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  title: string;
  description?: string;
  layout?: "stacked" | "split";
  theme?: "dark" | "light";
}

export function SectionHeader({
  label,
  title,
  description,
  layout = "stacked",
  theme = "dark",
  className,
  ...props
}: SectionHeaderProps) {
  if (layout === "split") {
    return (
      <header
        className={cn("flex flex-col items-start gap-6 md:gap-8 lg:gap-8 w-full", className)}
        {...props}
      >
        <LeadText theme={theme}>{label}</LeadText>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-[100px] w-full">
          <HeadingLarge theme={theme} className="w-full lg:w-[664px]">
            {title}
          </HeadingLarge>

          {description && (
            <BodyText theme={theme} className="w-full lg:flex-1">
              {description}
            </BodyText>
          )}
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn("flex flex-col items-start gap-6 md:gap-8 lg:gap-8 w-full", className)}
      {...props}
    >
      <LeadText theme={theme}>{label}</LeadText>
      <HeadingLarge theme={theme}>{title}</HeadingLarge>
      {description && <BodyText theme={theme}>{description}</BodyText>}
    </header>
  );
}
