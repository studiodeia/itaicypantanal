import type { BirdwatchingPageContent } from "@shared/cms-page-content";

export const birdwatchingDefaults: BirdwatchingPageContent = {
  hero: {
    label: "OBSERVAÇÃO DE AVES",
    heading: "Observação de Espécies Raras em Habitat Intocado",
    subtitle:
      "Uma experiência de observação única. Registre nossa avifauna em um dos santuários de aves mais ricos de todo o planeta.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/bird-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "Uma ", isHighlight: false },
      { text: "imersão contemplativa", isHighlight: true },
      {
        text: " que vai além do convencional. Guiamos com respeito em nosso santuário de ",
        isHighlight: false,
      },
      { text: "acesso exclusivo", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NOSSA FILOSOFIA",
    heading: "Observação Consciente e Imersiva",
    body: [
      "No coração do Pantanal, praticamos a observação de aves com respeito absoluto ao habitat natural.",
      "Cada expedição é planejada para minimizar o impacto ambiental, enquanto maximiza suas oportunidades de avistamento.",
    ],
    image: "/images/bird-about-1",
    features: [
      {
        number: "01",
        title: "Guias Experts",
        description:
          "Nossos guias possuem mais de 15 anos de experiência e conhecem intimamente os comportamentos e rotas de cada espécie.",
      },
      {
        number: "02",
        title: "Acesso Exclusivo",
        description:
          "Possuímos autorização do IBAMA para operar em áreas protegidas, longe do turismo convencional.",
      },
      {
        number: "03",
        title: "Imersão Contemplativa",
        description:
          "Oferecemos uma experiência que vai além do turismo, focada em uma imersão científica e verdadeiramente contemplativa.",
      },
    ],
  },
  highlights: {
    heading: "Por Que Escolher Nossa Expedição",
    items: [
      {
        iconName: "Bird",
        title: "166+ Espécies avistadas",
        description: "Registradas em apenas 5 dias de expedição",
      },
      {
        iconName: "ShieldCheck",
        title: "Acesso Exclusivo IBAMA",
        description: "Áreas protegidas com biodiversidade única",
      },
      {
        iconName: "Users",
        title: "Guias Especializados",
        description: "Ornitólogos certificados e fotógrafos experientes",
      },
    ],
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre Observacao de Aves",
    description: "Respondemos as principais perguntas sobre birdwatching no Pantanal da Itaicy.",
    items: [
      {
        id: "bird-1",
        number: "01",
        question: "Quantas especies de aves e possivel avistar na Itaicy?",
        answer: "O Pantanal e reconhecido internacionalmente como um dos maiores santuarios de aves do planeta, abrigando mais de 650 especies catalogadas ao longo de decadas de pesquisa ornitologica em todo o bioma. Nosso levantamento cientifico conduzido pelo ornitologo Joao Andriola em maio de 2024 registrou 166 especies distintas no entorno imediato do lodge em apenas 5 dias de expedicao sistematica, o que demonstra a densidade excepcional de avifauna nesta area. A regiao de Miranda, onde a Itaicy esta localizada, e considerada um dos pontos de maior concentracao de aves do Pantanal devido a convergencia de habitats variados como matas ciliares, campos inundaveis, baias e corixos. Dependendo da estacao, esse numero pode aumentar com a chegada de especies migratorias do hemisferio norte entre outubro e dezembro, elevando ainda mais a riqueza e diversidade observavel durante sua estadia.",
      },
      {
        id: "bird-2",
        number: "02",
        question: "Preciso ter experiencia em birdwatching para participar?",
        answer: "O birdwatching no Pantanal e uma atividade acessivel e recompensadora independentemente do seu nivel de experiencia, e muitos dos nossos hospedes realizam suas primeiras observacoes aqui mesmo na Itaicy. Nao e necessario nenhum conhecimento previo para participar das nossas expedicoes. Nossos guias especialistas, com mais de 15 anos de vivencia no bioma, conduzem cada saida de forma didatica, auxiliando na identificacao visual e sonora das especies, explicando comportamentos de nidificacao, alimentacao e voo, e indicando os melhores angulos e horarios para fotografia. Fornecemos binoculos de qualidade profissional e guias de campo ilustrados em portugues para uso durante toda a estadia. Para birders avancados com listas de vida, oferecemos roteiros especializados focados em especies endemicas e de ocorrencia restrita, como a Arara-Azul-Grande e o Gaviao-Real, maximizando suas chances de adicionar registros raros e ineditos a sua lista pessoal.",
      },
      {
        id: "bird-3",
        number: "03",
        question: "Qual a melhor epoca para observacao de aves no Pantanal?",
        answer: "Cada estacao no Pantanal oferece oportunidades distintas de observacao, e a escolha da melhor epoca depende das especies que voce deseja registrar e do tipo de experiencia que busca. A estacao seca, de maio a setembro, e considerada ideal para a maioria dos observadores porque o nivel da agua baixa e as aves se concentram em grande numero proximo as fontes remanescentes, como baias, corixos e lagoas. Nesse periodo, especies iconicas como o Tuiuiu, a Arara-Azul-Grande, o Tucano-Toco e diversas garcas sao avistadas com facilidade excepcional. Ja a estacao chuvosa, de outubro a marco, transforma a paisagem e atrai especies migratorias provenientes do hemisferio norte, como macaricos e trinta-reis. Para maximizar sua lista, recomendamos o periodo de transicao entre outubro e dezembro, quando residentes e migratorias coexistem, ou os meses de julho e agosto para a maior densidade de avistamentos concentrados.",
      },
      {
        id: "bird-4",
        number: "04",
        question: "Quais especies mais emblematicas posso avistar?",
        answer: "A regiao da Itaicy abriga uma concentracao notavel de especies emblematicas que representam o melhor da avifauna pantaneira, muitas delas visiveis diretamente das areas comuns do lodge ou em expedicoes curtas de barco. Entre as mais procuradas estao o Tuiuiu, ave-simbolo do Pantanal com envergadura de ate 2,8 metros, a Arara-Azul-Grande, a maior especie de psitacideo do mundo e ameacada de extincao, a Arara-Vermelha, o Tucano-Toco com seu bico alaranjado inconfundivel e o Gaviao-Real, maior aguia das Americas. Tambem sao frequentes o Martin-Pescador-Grande, diversas especies de garcas como a Garca-Branca-Grande e a Garca-Moca-Real, socos, falcoes e gavioes. Para observacoes noturnas, organizamos saidas especificas ao anoitecer para registrar a Coruja-Buraqueira, o Urutau-Comum com sua camuflagem extraordinaria e o misterioso Bacurau, aves de habitos crepusculares que revelam uma dimensao completamente diferente e fascinante da vida selvagem no Pantanal. No total, nosso levantamento cientifico ja catalogou 166 especies nesta regiao.",
      },
      {
        id: "bird-5",
        number: "05",
        question: "Que equipamento devo trazer para birdwatching?",
        answer: "Para aproveitar ao maximo sua experiencia de birdwatching no Pantanal, o equipamento adequado faz diferenca significativa tanto na qualidade dos registros fotograficos quanto no conforto durante as expedicoes em campo. Recomendamos trazer camera com teleobjetiva de pelo menos 300mm, idealmente 400mm ou superior para especies mais ariscas, e binoculos de boa qualidade nos modelos 8x42 ou 10x42 que oferecem o melhor equilibrio entre ampliacao e campo de visao. Para vestuario, escolha roupas em cores neutras como verde-oliva, marrom e bege que se integram ao ambiente e nao afugentam as aves. Chapeu de aba larga, protetor solar e repelente sao indispensaveis. Para quem nao possui equipamento proprio, oferecemos binoculos profissionais de emprestimo e guias de campo ilustrados. Nossos guias tambem compartilham tecnicas de fotografia de natureza, incluindo configuracoes de camera e posicionamento em relacao a luz natural.",
      },
    ],
  },
};
