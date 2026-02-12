import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeadingMedium } from "../typography/HeadingMedium";
import { BodyText } from "../typography/BodyText";

interface BlogCardAuthor {
  name: string;
  avatar: string;
  initials: string;
}

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  badge: string;
  readTime?: string;
  title: string;
  author: BlogCardAuthor;
  date: string;
}

export function BlogCard({
  image,
  badge,
  readTime,
  title,
  author,
  date,
  className,
  ...props
}: BlogCardProps) {
  return (
    <Card
      className={cn(
        "flex-col items-start rounded-lg overflow-hidden flex bg-transparent border-0",
        "w-[350px] flex-shrink-0 md:w-auto md:flex-shrink lg:w-[416px]",
        className
      )}
      {...props}
    >
      <div
        className="relative w-full h-[200px] md:h-[220px] lg:h-[233.07px] bg-cover bg-center bg-no-repeat rounded-t-lg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Badge className="absolute top-4 left-4 bg-pantanal-gold text-pantanal-light-secondary rounded-[999px] glass-card-hero px-3 py-1 text-functional-md">
          {badge}
        </Badge>
      </div>

      <CardContent className="flex flex-col gap-3 md:gap-4 pt-4 pb-0 px-0 w-full">
        {readTime && (
          <BodyText size="xs" variant="tertiary" as="span">
            {readTime}
          </BodyText>
        )}

        <HeadingMedium as="h3">{title}</HeadingMedium>

        <div className="flex items-center gap-3 md:gap-4 w-full">
          <Avatar className="w-9 h-9 md:w-11 md:h-11">
            <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start justify-center flex-1">
            <BodyText size="sm" variant="tertiary" as="span">{author.name}</BodyText>
            <BodyText size="xs" variant="tertiary" as="span">{date}</BodyText>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
