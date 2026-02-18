import { cn } from "@/lib/utils";
import { HeadingSmall } from "../typography/HeadingSmall";
import { BodyText } from "../typography/BodyText";

interface NumberedFeatureItemProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  title: string;
  description: string;
  theme?: "dark" | "light";
  showBorder?: boolean;
}

export function NumberedFeatureItem({
  number,
  title,
  description,
  theme = "dark",
  showBorder = false,
  className,
  ...props
}: NumberedFeatureItemProps) {
  const borderColor = theme === "light"
    ? "border-pantanal-border-muted"
    : "border-pantanal-border-muted";

  const numberColor = theme === "light"
    ? "text-pantanal-light-numberMuted"
    : "text-pantanal-light-quarternary";

  return (
    <div
      className={cn(
        showBorder && `border-t ${borderColor} pt-6 lg:pt-[24px]`,
        "w-full",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4 md:gap-6 lg:gap-[24px]">
        <div className="flex w-8 pt-[6px]">
          <BodyText
            size="xs"
            as="span"
            className={cn("!text-inherit", numberColor)}
          >
            {number}
          </BodyText>
        </div>

        <div className="flex flex-col gap-2 lg:gap-[8px] flex-1">
          <HeadingSmall theme={theme}>{title}</HeadingSmall>
          <BodyText theme={theme}>{description}</BodyText>
        </div>
      </div>
    </div>
  );
}
