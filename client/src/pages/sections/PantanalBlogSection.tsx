import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRightIcon } from "@/lib/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";
import type { HomePageContent } from "@shared/cms-page-content";

const defaultBlogContent: HomePageContent["blog"] = {
  label: "BLOG",
  heading: "Diário do Pantanal",
  description:
    "O que nossos viajantes dizem sobre a experiência autêntica de se desconectar na natureza selvagem da Itaicy Ecoturismo.",
  buttonText: "Ver todos",
};

type Props = { content?: HomePageContent["blog"] };

const blogPosts = [
  {
    id: 1,
    href: "/blog/observacao-de-aves/guia-observacao-aves-pantanal-especies-epocas-tecnicas",
    category: "Observação de Aves",
    readTime: "12 minutos de leitura",
    title:
      "Guia Completo de Observação de Aves no Pantanal: Espécies, Épocas e Técnicas",
    author: {
      name: "Equipe Itaicy",
      avatar: "/images/home/blog-avatar.webp",
      initials: "EI",
    },
    date: "20 de Fevereiro, 2026",
    image: "/images/blog/birdwatching-pantanal-card.webp",
    imageFallback: "/images/home/blog-card.webp",
  },
  {
    id: 2,
    href: "/blog/pesca/guia-completo-pesca-esportiva-pantanal",
    category: "Pesca",
    readTime: "15 minutos de leitura",
    title: "Guia Completo de Pesca Esportiva no Pantanal",
    author: {
      name: "Equipe Itaicy",
      avatar: "/images/home/blog-avatar.webp",
      initials: "EI",
    },
    date: "20 de Fevereiro, 2026",
    image: "/images/blog/pesca-esportiva-pantanal-card.webp",
    imageFallback: "/images/home/blog-card.webp",
  },
  {
    id: 3,
    href: "/blog/gastronomia/gastronomia-all-inclusive-pantanal-descanso",
    category: "Gastronomia",
    readTime: "7 minutos de leitura",
    title:
      "Gastronomia All-Inclusive no Pantanal: Uma Experiência para Todos os Sentidos",
    author: {
      name: "Equipe Itaicy",
      avatar: "/images/home/blog-avatar.webp",
      initials: "EI",
    },
    date: "20 de Fevereiro, 2026",
    image: "/images/blog/gastronomia-pantanal-card.webp",
    imageFallback: "/images/home/blog-card.webp",
  },
];

export const PantanalBlogSection = ({ content: contentProp }: Props): JSX.Element => {
  const content = contentProp ?? defaultBlogContent;
  return (
    <section className="flex flex-col items-center justify-end gap-8 w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.header variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full">
          <motion.div variants={fadeIn} className="flex items-center w-full font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-blog-label">
            {content.label}
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-[100px] w-full">
            <motion.h2 variants={fadeUp} className="w-full lg:w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]" data-testid="text-blog-heading">
              {content.heading}
            </motion.h2>

            <motion.p variants={fadeUp} className="w-full lg:flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {content.description}
            </motion.p>
          </div>
        </motion.header>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex overflow-x-auto scrollbar-hide pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-[32px] w-full">
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={cardItem}>
            <Link href={post.href} className="no-underline block">
            <Card
              className="flex-col items-start rounded-lg overflow-hidden flex bg-transparent border-0 w-[350px] flex-shrink-0 md:w-auto md:flex-shrink lg:w-[416px] cursor-pointer"
              data-testid={`card-blog-${post.id}`}
            >
              <div
                className="relative w-full h-[200px] md:h-[220px] lg:h-[233.07px] bg-cover bg-center bg-no-repeat rounded-t-lg"
                style={{ backgroundImage: `url(${post.image}), url(${post.imageFallback})` }}
              >
                <Badge className="absolute top-4 left-4 bg-[#ac8042] text-[#f2fcf7] rounded-[999px] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] px-3 py-1 font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] no-default-hover-elevate no-default-active-elevate">
                  {post.category}
                </Badge>
              </div>

              <CardContent className="flex flex-col gap-3 md:gap-4 pt-4 pb-0 px-0 w-full">
                <div className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] text-[length:var(--body-xs-font-size)] tracking-[var(--body-xs-letter-spacing)] leading-[var(--body-xs-line-height)] whitespace-nowrap [font-style:var(--body-xs-font-style)]">
                  {post.readTime}
                </div>

                <h3 className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[22px] leading-[32px] md:text-[length:var(--heading-md-font-size)] md:leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] w-full [font-style:var(--heading-md-font-style)]">
                  {post.title}
                </h3>

                <div className="flex items-center gap-3 md:gap-4 w-full">
                  <Avatar className="w-9 h-9 md:w-11 md:h-11">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{post.author.initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start justify-center flex-1">
                    <div className="text-[length:var(--body-sm-font-size)] leading-[var(--body-sm-line-height)] w-fit font-body-sm font-[number:var(--body-sm-font-weight)] text-[#cfebdd] tracking-[var(--body-sm-letter-spacing)] whitespace-nowrap [font-style:var(--body-sm-font-style)]">
                      {post.author.name}
                    </div>

                    <div className="text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] w-fit font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] tracking-[var(--body-xs-letter-spacing)] whitespace-nowrap [font-style:var(--body-xs-font-style)]">
                      {post.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Link>
            </motion.div>
          ))}
        </motion.div>

        <Link
          href="/blog"
          className="flex items-center justify-center gap-4 px-0 py-3 md:py-4 w-full border-b border-[#f2fcf7] no-underline"
          data-testid="button-view-all-blog"
        >
          <div className="flex items-center justify-between flex-1">
            <span className="flex flex-1 font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] items-center [font-style:var(--functional-md-font-style)]">
              {content.buttonText}
            </span>

            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-[#e3f7ec]" />
          </div>
        </Link>
      </div>
    </section>
  );
};
