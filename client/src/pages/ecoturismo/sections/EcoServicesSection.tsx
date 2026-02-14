import { motion } from "framer-motion";
import { ChevronRight } from "@/lib/icons";
import { OptimizedImage } from "@/components/OptimizedImage";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";

const activities = [
  {
    title: "Passeio de Barco ao Pôr do Sol",
    subtitle: "Navegação & Pesca de Piranhas",
    description:
      "Navegação pelos canais e corixos do Rio Cuiabá, com o espetáculo do pôr do sol refletido nas águas e a tradicional pesca de piranhas.",
    tag: "Passeio",
    src: "/images/eco-activity-1",
    author: "Ana Clara",
    date: "15 de Setembro, 2025",
  },
  {
    title: "Safári Noturno",
    subtitle: "Expedição no Rio Cuiabá",
    description:
      "Aventure-se pelo rio à noite e observe jacarés, capivaras, ariranhas e corujas em seu habitat natural.",
    tag: "Safári",
    src: "/images/eco-activity-2",
    author: "Rafael Santos",
    date: "22 de Outubro, 2025",
  },
  {
    title: "Nascer do Sol Pantaneiro",
    subtitle: "Contemplação ao Amanhecer",
    description:
      "Saídas ao amanhecer para vivenciar o despertar da vida no Pantanal. Cores, sons e os primeiros movimentos dos animais.",
    tag: "Contemplação",
    src: "/images/eco-activity-3",
    author: "Mariana Lima",
    date: "30 de Novembro, 2025",
  },
  {
    title: "Trilhas Ecológicas",
    subtitle: "Caminhadas Guiadas",
    description:
      "Caminhadas pelos arredores da pousada, ideais para observação de aves, mamíferos e da exuberante flora nativa.",
    tag: "Trilha",
    src: "/images/eco-activity-4",
    author: "Carlos Henrique",
    date: "05 de Dezembro, 2025",
  },
];

export const EcoServicesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-6 md:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            variants={fadeIn}
          >
            AS EXPEDIÇÕES
          </motion.span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <motion.h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              variants={fadeUp}
            >
              Nossos Passeios
            </motion.h2>
            <motion.p
              className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
              variants={fadeUp}
            >
              Cada passeio é uma oportunidade de vivenciar o Pantanal de forma
              única. Nossos guias nativos garantem avistamentos memoráveis e
              segurança em cada expedição.
            </motion.p>
          </div>
        </motion.div>

        {/* Activity cards — 2x2 grid */}
        <div className="flex flex-col gap-8 md:gap-6 lg:gap-[32px]">
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {activities.slice(0, 2).map((activity, idx) => (
              <motion.div key={idx} variants={cardItem} className="w-full md:flex-1">
                <ActivityCard activity={activity} index={idx} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {activities.slice(2, 4).map((activity, idx) => (
              <motion.div key={idx + 2} variants={cardItem} className="w-full md:flex-1">
                <ActivityCard activity={activity} index={idx + 2} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <a
          href="#"
          className="flex items-center justify-between w-full py-4 border-b border-[#f2fcf7] transition-all duration-300 group"
        >
          <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            Ver todos os passeios disponíveis
          </span>
          <ChevronRight
            className="w-5 h-5 text-[#e3f7ec] transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </a>
      </div>
    </section>
  );
};

interface ActivityCardProps {
  activity: (typeof activities)[number];
  index: number;
}

const ActivityCard = ({ activity }: ActivityCardProps): JSX.Element => {
  return (
    <div className="relative flex flex-col justify-end w-full md:flex-1 h-[500px] md:h-[600px] lg:h-[910px] rounded-lg overflow-hidden group">
      {/* Background image */}
      <OptimizedImage
        src={activity.src}
        alt={activity.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(21,34,24,0.88) 32.8%, rgba(21,34,24,0) 75.5%)",
        }}
      />

      {/* Tag */}
      <div className="absolute top-6 left-6 bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
        {activity.tag}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-8 md:gap-10 p-5 md:p-6 lg:p-[32px]">
        {/* Text content */}
        <div className="flex flex-col gap-5">
          <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#a8cab9] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
            {activity.subtitle}
          </span>
          <h3
            className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] [font-style:var(--heading-md-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {activity.title}
          </h3>
          <p className="max-w-[648px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            {activity.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#446354] overflow-hidden" />
            <div className="flex flex-col">
              <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#cfebdd] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                {activity.author}
              </span>
              <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
                {activity.date}
              </span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 rounded text-[#f2fcf7] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90">
            <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
              Saiba mais
            </span>
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

