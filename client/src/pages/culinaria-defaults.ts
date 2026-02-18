import type { CulinariaPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: CulinariaPageContent = {
  hero: {
    label: "CULINÁRIA",
    heading: "Onde o Pantanal Vira Alimento",
    subtitle:
      "Ingredientes do rio e da terra, técnica internacional e alma pantaneira em cada prato.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/culinaria/hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "A ", isHighlight: false },
      { text: "alma do Pantanal", isHighlight: true },
      {
        text: ", a técnica do mundo. Ingredientes locais colhidos no dia, ",
        isHighlight: false,
      },
      { text: "técnicas de alta gastronomia", isHighlight: true },
      {
        text: " e o tempo que cada prato merece — uma cozinha autoral que honra a terra e surpreende o paladar.",
        isHighlight: false,
      },
    ],
  },
  menu: {
    label: "NOSSO MENU",
    heading: "Galeria de experiências",
    body: [
      "Navegue pelas categorias e explore tudo o que espera por você. Conheça os peixes e carnes já inclusos na sua Pensão Completa. Descubra também os doces caseiros e nossa seleção especial de vinhos e drinks.",
    ],
    image: "",
    features: [
      { number: "01", title: "Carnes", description: "" },
      { number: "02", title: "Peixes", description: "" },
      { number: "03", title: "Massas", description: "" },
      { number: "04", title: "Doces", description: "" },
      { number: "05", title: "Bebidas", description: "" },
    ],
  },
  highlights: {
    heading: "Do Rio e da Horta à Sua Mesa",
    items: [
      {
        iconName: "Fish",
        title: "Peixes do Rio",
        description:
          "Destaque para o Dourado e outros peixes frescos, garantindo a rastreabilidade.",
      },
      {
        iconName: "Sprout",
        title: "Produtores Locais",
        description:
          "Uma breve menção ao apoio à comunidade e fazendas vizinhas.",
      },
      {
        iconName: "Flower2",
        title: "Horta da Casa",
        description:
          "(Se existir) Menção aos temperos e vegetais frescos colhidos no dia.",
      },
    ],
  },
  services: {
    label: "NOSSOS SERVIÇOS",
    heading: "O Ciclo da Sua Imersão Gastronômica",
    description:
      "Da alvorada ao anoitecer, sua experiência gastronômica está inclusa e conectada à sua expedição.",
    items: [
      {
        title: "Café da Manhã com Vista",
        description:
          "Desfrute do seu café observando o despertar do Pantanal.",
        image: "/images/culinaria-services-1",
      },
      {
        title: "Almoço no Refúgio",
        description: "",
        image: "/images/culinaria-services-2",
      },
      {
        title: "Jantar à Luz de Velas",
        description: "",
        image: "/images/culinaria-services-3",
      },
    ],
    buttonText: "Fazer uma reserva",
  },
  experience: {
    heading: "Sabor e Aconchego",
    body: [
      "O calor do fogo, o vinho, os sabores autênticos e o conforto de um refúgio no coração do Pantanal.",
    ],
    image: "/images/culinaria-experience-bg.webp",
  },
  crossSell: {
    heading: "O refúgio completo",
    description:
      "Agora que conheceu nossa cozinha, encontre a acomodação perfeita para sua imersão no Pantanal.",
    buttonText: "Conhecer acomodações",
    buttonHref: "/acomodacoes",
    image: "/images/culinaria-crosssell-2",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre a Culinaria Pantaneira",
    description: "Tudo o que voce precisa saber sobre a gastronomia e as refeicoes na Itaicy.",
    items: [
      {
        id: "culinaria-1",
        number: "01",
        question: "As refeicoes estao inclusas na hospedagem?",
        answer: "A gastronomia e parte central da experiencia no Itaicy, pensada para que o hospede aproveite cada momento sem preocupacoes com custos extras de alimentacao durante toda a estadia. Sim, todas as refeicoes estao inclusas no regime de Pensao Completa: cafe da manha com frutas regionais, paes artesanais, tapiocas recheadas e sucos naturais; almoco com pratos autorais de peixes e carnes da regiao servidos em mesa compartilhada; e jantar com menu degustacao que varia a cada noite conforme a sazonalidade dos ingredientes. Alem das tres refeicoes principais, oferecemos lanches durante os passeios, como sanduiches naturais, barras de castanha e agua fresca, garantindo energia ao longo de cada expedição. Dietas especiais como vegetariana, vegana, sem gluten ou sem lactose sao atendidas com prazer, desde que informadas no momento da reserva para que nossa equipe de cozinha prepare opcoes personalizadas com ingredientes frescos e de origem local.",
      },
      {
        id: "culinaria-2",
        number: "02",
        question: "Quais pratos tipicos do Pantanal sao servidos?",
        answer: "O Pantanal possui uma tradicao culinaria rica e singular, moldada pela abundancia dos rios e pela influencia das culturas indigena, paraguaia e dos tropeiros que cruzaram a regiao por seculos, criando uma identidade gastronomica unica no Brasil. Nosso cardapio celebra essa heranca com pratos como pacu assado na brasa com crosta de ervas frescas, caldo de piranha servido bem quente como entrada revigorante, arroz carreteiro com carne seca desfiada e temperado com cebolinha da horta, farofa de banana-da-terra tostada na manteiga e mojica de pintado cozida lentamente com mandioca e temperos frescos. Tambem servimos chipa caseira, inspirada na receita tradicional paraguaia, e sobremesas artesanais com frutas nativas do cerrado como bocaiuva, guavira e cumbaru. Cada prato e preparado com ingredientes colhidos no dia, muitos vindos de produtores locais de Miranda e Bonito, garantindo frescor absoluto e valorizando a economia da comunidade pantaneira.",
      },
      {
        id: "culinaria-3",
        number: "03",
        question: "Voces servem bebidas alcoolicas?",
        answer: "O momento das refeicoes no Itaicy e tambem uma oportunidade para explorar sabores regionais na forma de bebidas exclusivas, pensadas para complementar e harmonizar com cada prato do cardapio ao longo do dia. Sim, oferecemos uma selecao cuidadosa de vinhos tintos e brancos de vinicolas brasileiras e sul-americanas, cervejas artesanais de microproducao regional e drinks autorais criados pela nossa equipe de bar. Entre os destaques estao caipirinhas de bocaiuva, gin tonicas com ervas frescas da horta e um drink especial de tereré com limao e hortela, perfeito para tardes quentes. Sucos naturais de frutas como manga, acerola, caju e guavira estao sempre disponiveis e sao inclusos na Pensao Completa sem nenhum custo adicional. O consumo de rotulos premium de vinhos importados e destilados especiais pode ter custo a parte, dependendo do pacote contratado. Nossa carta de bebidas e atualizada sazonalmente para acompanhar a disponibilidade dos ingredientes frescos da regiao.",
      },
      {
        id: "culinaria-4",
        number: "04",
        question: "De onde vem os ingredientes usados na cozinha?",
        answer: "A procedencia dos ingredientes e um dos pilares da nossa proposta gastronomica, porque acreditamos que um prato excepcional comeca muito antes do preparo, na escolha cuidadosa da materia-prima e no respeito a cadeia produtiva local que sustenta a regiao. Priorizamos ingredientes locais e sazonais em todas as refeicoes servidas no lodge. Os peixes como pintado, pacu e dourado vem exclusivamente de fornecedores autorizados pelo IBAMA, nunca da pesca esportiva dos hospedes, assegurando a sustentabilidade dos rios. As carnes bovinas sao de fazendas da regiao de Miranda com certificacao de boas praticas de manejo. Temperos frescos como cebolinha, salsinha, manjericao e pimenta-de-cheiro sao colhidos diariamente da nossa propria horta organica mantida pela equipe do lodge. Frutas nativas como bocaiuva e guavira vem de coletores comunitarios da regiao. Essa rastreabilidade rigorosa garante frescor maximo, qualidade constante em cada prato e gera impacto economico positivo e direto nas familias da comunidade local.",
      },
      {
        id: "culinaria-5",
        number: "05",
        question: "A cozinha atende restricoes alimentares?",
        answer: "Sabemos que cada hospede tem necessidades alimentares diferentes, e a experiencia gastronomica no Itaicy deve ser plenamente inclusiva para que todos possam desfrutar dos sabores autenticos do Pantanal com total tranquilidade e seguranca. Sim, nossa equipe de cozinha e treinada para adaptar o cardapio completo a diversas restricoes alimentares, incluindo vegetarianismo, veganismo, intolerancia a gluten, intolerancia a lactose, alergias a frutos do mar ou a oleaginosas e outras necessidades clinicas especificas. Preparamos versoes alternativas dos pratos do dia utilizando ingredientes frescos e substituicoes criativas, como farinhas de mandioca e polvilho no lugar do trigo, leites vegetais de castanha da regiao e pratos proteicos elaborados a base de leguminosas e cogumelos. Basta nos informar no momento da reserva ou ate 48 horas antes da chegada para que nossa brigada de cozinha organize um plano alimentar personalizado e seguro para cada refeicao ao longo de toda a sua estadia no lodge.",
      },
    ],
  },
};

export const culinariaDefaults: LocalizedDefaults<"/culinaria"> = { pt, en: pt, es: pt };
