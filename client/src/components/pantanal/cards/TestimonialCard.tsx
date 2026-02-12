import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { HeadingMedium } from "../typography/HeadingMedium";
import { BodyText } from "../typography/BodyText";

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  quote: string;
  author: string;
  stars?: string[];
}

export function TestimonialCard({
  title,
  quote,
  author,
  stars = [],
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <Card
      className={cn("card-testimonial", className)}
      {...props}
    >
      <CardContent className="flex flex-col items-start justify-between h-full p-8 md:p-6 lg:p-8 gap-6 md:gap-8 lg:gap-8">
        <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-8 w-full">
          <HeadingMedium>{title}</HeadingMedium>

          <blockquote className="w-full text-body-lg text-pantanal-light-muted line-clamp-5">
            {quote}
          </blockquote>
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <BodyText>{author}</BodyText>

          {stars.length > 0 && (
            <div className="inline-flex items-center">
              {stars.map((star, index) => (
                <img
                  key={index}
                  className="w-4 h-4 md:w-5 md:h-5"
                  alt="Star"
                  src={star}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
