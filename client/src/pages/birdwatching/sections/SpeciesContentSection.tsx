import { motion } from "framer-motion";
import { Shield, Ruler, MapPin, Camera } from "@/lib/icons";
import { fadeUp, scaleIn, viewport } from "@/lib/motion";
import type { BirdSpeciesDetail } from "../data";

interface SpeciesContentSectionProps {
  bird: BirdSpeciesDetail;
}

const PROSE_TEXT =
  "font-['Lato',Helvetica] font-normal text-[#263a30] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[1.6]";

function renderParagraph(text: string) {
  const paragraphs = text.split("\n\n");
  return paragraphs.map((p, i) => {
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

export const SpeciesContentSection = ({
  bird,
}: SpeciesContentSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#fcf4ed]">
      <div className="flex flex-col max-w-[1440px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <article className="flex flex-col gap-8 md:gap-10 lg:gap-12 max-w-[720px] mx-auto w-full">
          {/* Conservation Status Card */}
          <motion.div
            className="flex items-center gap-4 p-5 bg-[#f5e8db] rounded-lg"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <Shield className="w-6 h-6 text-[#ac8042] shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#446354] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                Status de Conservação
              </span>
              <span className="font-['Lato',Helvetica] font-bold text-[#263a30] text-base">
                {bird.conservationStatus}
              </span>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] mt-4 md:mt-6 lg:mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Visão Geral
          </motion.h2>
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {renderParagraph(bird.overview)}
          </motion.div>

          {/* Size + Habitat cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex flex-col gap-3 p-5 bg-[#f5e8db] rounded-lg">
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-[#ac8042]" />
                <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#446354] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                  Tamanho
                </span>
              </div>
              <span className="font-['Lato',Helvetica] font-normal text-[#263a30] text-sm leading-relaxed">
                {bird.size}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-[#f5e8db] rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#ac8042]" />
                <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#446354] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                  Habitat
                </span>
              </div>
              <span className="font-['Lato',Helvetica] font-normal text-[#263a30] text-sm leading-relaxed">
                {bird.habitat}
              </span>
            </div>
          </motion.div>

          {/* Diet */}
          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] mt-4 md:mt-6 lg:mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Dieta e Alimentação
          </motion.h2>
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {renderParagraph(bird.diet)}
          </motion.div>

          {/* Behavior */}
          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] mt-4 md:mt-6 lg:mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Comportamento
          </motion.h2>
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {renderParagraph(bird.behavior)}
          </motion.div>

          {/* Best Time */}
          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] mt-4 md:mt-6 lg:mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Melhor Época para Observação
          </motion.h2>
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {renderParagraph(bird.bestTime)}
          </motion.div>

          {/* Photography Tips Card */}
          <motion.div
            className="flex flex-col gap-4 p-6 bg-[#f5e8db] rounded-lg mt-4"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-[#ac8042]" />
              <span className="font-['Lato',Helvetica] font-bold text-[#263a30] text-base">
                Dicas de fotografia
              </span>
            </div>
            <ul className="list-disc ml-6 flex flex-col gap-2">
              {bird.photographyTips.map((tip, i) => (
                <li
                  key={i}
                  className="font-['Lato',Helvetica] font-normal text-[#263a30] text-sm leading-relaxed"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        </article>

        {/* Article footer — line + logo + line */}
        <motion.div
          className="flex items-center gap-8 md:gap-12 max-w-[720px] mx-auto w-full mt-12 md:mt-16 lg:mt-[100px]"
          variants={fadeUp}
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

