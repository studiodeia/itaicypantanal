import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";
import type { ArticleContentBlock } from "../data";
import { fadeUp, fadeIn, viewport } from "@/lib/motion";

interface ArticleContentSectionProps {
  content: ArticleContentBlock[];
}

/**
 * Article body paragraph typography:
 * - Font: Lato (body-lg) — 18px mobile / 20px tablet / 24px desktop
 * - Line-height: 1.6 (160%) — optimized for long-form reading (vs. 133% default)
 * - Max-width: 720px — keeps ~60-66 characters per line (the readability sweet spot)
 * - Paragraph gap: 32px — ~1.3× line-height for clear separation
 */
const PROSE_TEXT =
  "font-['Lato',Helvetica] font-normal text-[#263a30] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[1.6]";

function renderParagraph(text: string) {
  const paragraphs = text.split("\n\n");
  return paragraphs.map((p, i) => {
    // Handle **bold** inline markup
    const parts = p.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className={PROSE_TEXT}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-bold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });
}

export const ArticleContentSection = ({
  content,
}: ArticleContentSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#fcf4ed]">
      <div className="flex flex-col max-w-[1440px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Prose column — constrained for optimal readability */}
        <article className="flex flex-col gap-8 md:gap-10 lg:gap-12 max-w-[720px] mx-auto w-full">
          {content.map((block, idx) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <motion.div
                    key={idx}
                    className="flex flex-col gap-6 md:gap-8"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    {renderParagraph(block.text)}
                  </motion.div>
                );
              case "heading":
                return (
                  <motion.h2
                    key={idx}
                    className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] mt-4 md:mt-6 lg:mt-8"
                    style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    {block.text}
                  </motion.h2>
                );
              case "species":
                return (
                  <motion.div
                    key={idx}
                    className="flex flex-col gap-6 md:gap-8 mt-4 md:mt-6 lg:mt-8"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    <div className="flex flex-col gap-2">
                      <h3
                        className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
                        style={{
                          fontFeatureSettings: "'lnum' 1, 'pnum' 1",
                        }}
                      >
                        {block.name}
                      </h3>
                      <span
                        className={`${PROSE_TEXT} text-[#446354] italic`}
                      >
                        {block.scientificName}
                      </span>
                    </div>
                    <p className={PROSE_TEXT}>{block.description}</p>
                    <OptimizedImage
                      src={block.image}
                      alt={block.name}
                      className="w-full aspect-video object-cover rounded-2xl"
                    />
                  </motion.div>
                );
              case "orderedList":
                return (
                  <motion.ol
                    key={idx}
                    className={`list-decimal list-inside flex flex-col gap-6 ${PROSE_TEXT}`}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    {block.items.map((item, i) => (
                      <li key={i}>
                        <strong className="font-bold">{item.bold}</strong>
                        {item.text}
                      </li>
                    ))}
                  </motion.ol>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* Article footer — line + logo + line */}
        <motion.div
          className="flex items-center gap-8 md:gap-12 max-w-[720px] mx-auto w-full mt-12 md:mt-16 lg:mt-[100px]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="flex-1 h-px bg-[#263a30]/20" />
          <img
            src="/images/itaicy-logo-dark.svg"
            alt="Itaicy"
            className="h-10 w-auto"
          />
          <div className="flex-1 h-px bg-[#263a30]/20" />
        </motion.div>
      </div>
    </section>
  );
};
