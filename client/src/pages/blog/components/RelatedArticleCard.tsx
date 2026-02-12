import { OptimizedImage } from "@/components/OptimizedImage";
import { getArticleUrl } from "../data";
import type { BlogArticle } from "../data";

interface RelatedArticleCardProps {
  article: BlogArticle;
}

export const RelatedArticleCard = ({
  article,
}: RelatedArticleCardProps): JSX.Element => {
  return (
    <a
      href={getArticleUrl(article)}
      className="flex flex-col items-start w-full group"
    >
      {/* Image */}
      <div className="relative aspect-[432/242] w-full rounded-lg overflow-hidden">
        <OptimizedImage
          src={article.src}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Tag overlay */}
        <div className="absolute top-4 left-4 bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
          {article.tag}
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-4 p-4 w-full">
        <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
          {article.readingTime}
        </span>
        <h3
          className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] [font-style:var(--heading-md-font-style)] overflow-hidden text-ellipsis"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
        >
          {article.title}
        </h3>
        {/* Author row */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#446354] overflow-hidden shrink-0" />
          <div className="flex flex-col">
            <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#cfebdd] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
              {article.author}
            </span>
            <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
              {article.date}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
