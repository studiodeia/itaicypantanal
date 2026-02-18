import { useCallback, Fragment } from "react";
import { motion } from "framer-motion";
import { fadeIn, fadeUp, viewport } from "@/lib/motion";
import type { CmsPrivacySection } from "@shared/cms-page-content";

type Props = { content: CmsPrivacySection[] };

/**
 * Renders a content string array, grouping consecutive ** items into <ul>.
 * - Strings starting with "**" become list items with bold prefix
 * - Other strings become <p> paragraphs
 */
function renderContentBlock(items: string[]) {
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`list-${key++}`} className="list-disc ml-9 flex flex-col gap-0">
        {listBuffer.map((item, i) => {
          const match = item.match(/^\*\*(.+?)\*\*\s*(.*)/);
          if (match) {
            return (
              <li key={i}>
                <strong className="font-semibold">{match[1]}</strong> {match[2]}
              </li>
            );
          }
          return <li key={i}>{item}</li>;
        })}
      </ul>,
    );
    listBuffer = [];
  };

  for (const item of items) {
    if (item.startsWith("**")) {
      listBuffer.push(item);
    } else {
      flushList();
      elements.push(
        <p key={`p-${key++}`} className="mb-6">
          {item}
        </p>,
      );
    }
  }
  flushList();

  return elements;
}

export const PrivacyContentSection = ({ content }: Props): JSX.Element => {
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-pantanal-cream w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[100px] max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] items-start">
        {/* Sidebar - Table of Contents */}
        <motion.aside
          className="w-full lg:w-[414px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="bg-[#f5e8db] rounded-lg p-5 flex flex-col gap-5">
            <h2
              className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[length:var(--heading-sm-font-size)] leading-[var(--heading-sm-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-sm-letter-spacing)] [font-style:var(--heading-sm-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Sessões
            </h2>

            <div className="w-full h-px bg-pantanal-border-muted" />

            <nav className="flex flex-col">
              {content.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center px-3 py-2.5 font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] leading-[var(--functional-md-line-height)] text-pantanal-darkText-primary tracking-[var(--functional-md-letter-spacing)] [font-style:var(--functional-md-font-style)] text-left transition-colors duration-200 hover:text-pantanal-gold rounded cursor-pointer"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={scrollToTop}
            className="bg-[#f5e8db] rounded-lg p-5 w-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] leading-[var(--functional-md-line-height)] text-pantanal-darkText-primary tracking-[var(--functional-md-letter-spacing)] [font-style:var(--functional-md-font-style)] text-center transition-colors duration-200 hover:text-pantanal-gold cursor-pointer"
          >
            Voltar ao topo
          </button>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-12 text-pantanal-darkText-primary min-w-0">
          {/* Intro */}
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-[var(--body-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="mb-6">
              A sua privacidade é uma prioridade para a Itaici Ecoturismo
              ("Nós", "Nosso"). Esta Política de Privacidade explica como
              coletamos, usamos, armazenamos e protegemos as informações
              pessoais de nossos visitantes e clientes ("Você") ao usar nosso
              site.
            </p>
            <p>
              Estamos comprometidos com a transparência e a proteção dos seus
              dados, em conformidade com a Lei Geral de Proteção de Dados
              (LGPD).
            </p>
          </motion.div>

          {/* Dynamic sections */}
          {content.map((section) => (
            <Fragment key={section.id}>
              <motion.h2
                id={section.id}
                className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] scroll-mt-8"
                style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {section.title}
              </motion.h2>
              <motion.div
                className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-[var(--body-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {renderContentBlock(section.content)}
              </motion.div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
