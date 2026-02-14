import { ChevronRight } from "@/lib/icons";
import { OptimizedImage } from "@/components/OptimizedImage";
import { getBlogArticleUrl } from "../cms";
import type { BlogArticle } from "../data";

interface BlogArticleCardProps {
  article: BlogArticle;
  showDescription?: boolean;
}

export const BlogArticleCard = ({
  article,
  showDescription = false,
}: BlogArticleCardProps): JSX.Element => {
  return (
    <a
      href={getBlogArticleUrl(article)}
      className="relative flex flex-col justify-end w-full h-[400px] md:h-[450px] lg:h-[510px] rounded-lg overflow-hidden group"
    >
      {/* Background image */}
      <OptimizedImage
        src={article.src}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background:
            "linear-gradient(0deg, rgba(21,34,24,0.88) 32.8%, rgba(21,34,24,0) 75.5%)",
        }}
      />

      {/* Tag */}
      <div className="absolute top-6 left-6 bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
        {article.tag}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-8 lg:gap-10 p-5 md:p-6 lg:p-[32px]">
        {/* Text content */}
        <div className="flex flex-col gap-4 lg:gap-5">
          <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#a8cab9] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
            {article.subtitle}
          </span>
          <h3
            className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] [font-style:var(--heading-md-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {article.title}
          </h3>
          {showDescription && article.description && (
            <p className="max-w-[648px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {article.description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#446354] overflow-hidden" />
            <div className="flex flex-col">
              <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#cfebdd] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                {article.author}
              </span>
              <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
                {article.date}
              </span>
            </div>
          </div>

          <span className="flex items-center gap-1.5 px-4 py-2 rounded text-[#f2fcf7] transition-all duration-300 group-hover:-translate-y-0.5">
            <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
              Saiba mais
            </span>
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </a>
  );
};

