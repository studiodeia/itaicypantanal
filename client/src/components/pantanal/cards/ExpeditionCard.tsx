import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeadingMedium } from "../typography/HeadingMedium";
import { BodyText } from "../typography/BodyText";
import { ChevronRightIcon } from "@/lib/icons";

interface ExpeditionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  backgroundImage: string;
  size?: "default" | "large";
  onAction?: () => void;
}

export function ExpeditionCard({
  title,
  description,
  backgroundImage,
  size = "default",
  onAction,
  className,
  ...props
}: ExpeditionCardProps) {
  const sizeClasses = {
    default: "w-full md:flex-1 lg:w-[330px]",
    large: "w-full md:w-[55%] lg:w-[664px]",
  }[size];

  return (
    <Card
      className={cn(
        "card-expedition rounded-lg overflow-hidden border-0",
        "bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,rgba(21,34,24,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%)]",
        "bg-center bg-cover",
        sizeClasses,
        className
      )}
      style={{ backgroundImage: `linear-gradient(0deg, rgba(21,34,24,0.5) 0%, rgba(21,34,24,0) 100%), linear-gradient(0deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%), url(${backgroundImage})` }}
      {...props}
    >
      <CardContent className="flex flex-col justify-end h-full p-5 md:p-6 lg:p-8">
        <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col items-start gap-3 md:gap-5 lg:gap-5 w-full">
            <HeadingMedium className="text-pantanal-light-primary">
              {title}
            </HeadingMedium>

            {description && (
              <BodyText className="max-w-[355px]">
                {description}
              </BodyText>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={onAction}
            className="flex items-center justify-between w-full py-3 md:py-4 lg:h-14 lg:py-3 px-0 lg:px-6 border-b lg:border-b-0 border-pantanal-border-primary rounded-none lg:rounded-md h-auto"
          >
            <span className="text-functional-md text-pantanal-light-primary lg:text-pantanal-light-secondary lg:text-functional-lg">
              Quero conhecer
            </span>
            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-pantanal-light-primary lg:text-pantanal-light-secondary" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

