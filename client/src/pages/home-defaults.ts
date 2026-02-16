import type { HomePageContent } from "@shared/cms-page-content";

export const homeDefaults: HomePageContent = {
  aboutUs: {
    label: "SOBRE NÓS",
    heading: "Bem-vindo ao Nosso Refúgio Natural",
    body: [
      "Localizada no coração de uma das regiões mais biodiversas do mundo, nossa pousada oferece uma experiência única de conexão com a natureza.",
      "Com mais de 15 anos de experiência em ecoturismo, nos dedicamos a proporcionar momentos inesquecíveis enquanto preservamos e protegemos nosso ambiente natural.",
    ],
    image: "/images/home/about-us.webp",
    features: [
      {
        number: "01",
        title: "Sustentabilidade",
        description: "Práticas eco-friendly em todas as nossas operações",
      },
      {
        number: "02",
        title: "Excelência",
        description: "Guias especializados e equipamentos de primeira linha",
      },
      {
        number: "03",
        title: "Hospitalidade",
        description: "Atendimento personalizado para cada hóspede",
      },
    ],
  },
  expeditions: {
    label: "NOSSOS SERVIÇOS",
    heading: "Expedições Exclusivas no Coração do Pantanal",
    description:
      "Nossas atividades são desenhadas para uma conexão profunda com o ecossistema. Escolha a sua expedição.",
    items: [
      {
        title: "Pesca Esportiva Cota Zero",
        description:
          "Em águas privativas, a pesca transcende, uma imersão tática com guias que leem o rio.",
        backgroundImage: "/images/home/expedition-pesca.webp",
      },
      {
        title: "Birdwatching",
        description:
          "166 espécies catalogadas em nosso santuário. Guias ornitólogos conduzem expedições imersivas ao amanhecer.",
        backgroundImage: "/images/home/expedition-birdwatching.webp",
      },
      {
        title: "Ecoturismo",
        description:
          "Trilhas guiadas, passeios de barco e safáris fotográficos no coração do Pantanal intocado.",
        backgroundImage: "/images/home/expedition-ecoturismo.webp",
      },
    ],
    buttonText: "Quero conhecer",
  },
  stats: {
    items: [
      { target: 2000, suffix: "+", label: "HÓSPEDES SATISFEITOS" },
      { target: 166, suffix: "+", label: "AVES AVISTADAS" },
      { target: 15, suffix: "+", label: "ANOS DE EXPERIÊNCIA" },
      { target: 4.9, suffix: "", label: "AVALIAÇÃO MÉDIA", hasIcon: true },
    ],
  },
  accommodation: {
    label: "ACOMODAÇÕES",
    heading: "Descanso autêntico no coração selvagem",
    body: "Nossas acomodações são projetadas para o descanso e a imersão. Confortáveis, climatizadas e com vista para a natureza intocada, elas são o ponto de partida perfeito para sua aventura no Pantanal.",
    buttonReserve: "Reservar",
    buttonDetails: "Mais detalhes",
    backgroundImage: "/images/home/accommodations-bg.webp",
  },
  impact: {
    label: "NOSSO IMPACTO",
    heading: "Compromisso com a Natureza, Impacto na Comunidade",
    items: [
      {
        number: "01",
        title: "Biodiversidade Exclusiva",
        description:
          "Acesso a áreas protegidas onde 166 espécies de aves foram catalogadas.",
      },
      {
        number: "02",
        title: "Apoio Comunitário",
        description:
          "Parte de nossa receita é revertida diretamente para as comunidades indígenas locais.",
      },
      {
        number: "03",
        title: "Preservação Oficial",
        description:
          "Somos os únicos com autorização do IBAMA para operar em milhões de hectares protegidos.",
      },
    ],
    image: "/images/home/impact.webp",
  },
  paraQuem: {
    label: "PARA QUEM",
    heading: "Experiencias para cada perfil de viajante",
    description:
      "O Pantanal recebe visitantes do mundo inteiro com interesses diversos. Na Itaicy, cada hospede encontra atividades e roteiros adaptados ao seu perfil.",
    segments: [
      {
        iconName: "Fish",
        title: "Pescadores Esportivos",
        description:
          "Expedicoes de pesca catch-and-release no Rio Negro com guias locais. Pintado, pacu, dourado e mais de 260 especies. Equipamento profissional fornecido, barcos exclusivos e conhecimento dos melhores pontos por estacao. Temporada de marco a outubro.",
      },
      {
        iconName: "Bird",
        title: "Observadores de Aves",
        description:
          "166 especies catalogadas na regiao do lodge (survey Joao Andriola, 2024). Tuiuiu, arara-azul, tucanos, gavioes e aves migratorias. Roteiros guiados ao amanhecer e entardecer, hides fotograficos e checklists personalizados. Binoculos e guias de campo disponiveis.",
      },
      {
        iconName: "Camera",
        title: "Fotografos de Natureza",
        description:
          "Safaris fotograficos com guias que conhecem os melhores pontos e horarios para luz natural. Paisagens do Pantanal ao nascer e por do sol, fauna silvestre em habitat natural e macro de flora. Passeios de barco silenciosos para aproximacao sem perturbar os animais.",
      },
      {
        iconName: "Heart",
        title: "Casais e Lua de Mel",
        description:
          "Suite Adventure com privacidade e vista para o rio. Jantares a luz de velas com culinaria pantaneira, passeios de barco ao entardecer e trilhas a dois. Uma experiencia romantica em meio a natureza mais exuberante do Brasil, longe da rotina urbana.",
      },
      {
        iconName: "Users",
        title: "Familias com Criancas",
        description:
          "Suite Family para ate 4 pessoas. Atividades adaptadas para todas as idades: observacao de animais, trilhas curtas, passeios de barco e contato direto com a natureza. Guias nativos tornam cada saida uma aula ao ar livre. Pensao completa com cardapio infantil.",
      },
      {
        iconName: "Compass",
        title: "Ecoturistas e Aventureiros",
        description:
          "Trilhas ecologicas, safaris diurnos e noturnos, canoagem pelo Rio Negro e imersao completa no bioma Pantanal. Para quem busca experiencias autenticas de ecoturismo sustentavel, longe dos roteiros turisticos tradicionais. Nivel de dificuldade adaptavel.",
      },
    ],
  },
  blog: {
    label: "BLOG",
    heading: "Diário do Pantanal",
    description:
      "O que nossos viajantes dizem sobre a experiência autêntica de se desconectar na natureza selvagem da Itaicy Ecoturismo.",
    buttonText: "Ver todos",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre o Pantanal e a Itaicy",
    description: "Respondemos as principais perguntas sobre a regiao, a pousada e as experiencias que oferecemos.",
    items: [
      {
        id: "home-1",
        number: "01",
        question: "A pousada e destinada apenas para pesca?",
        answer: "Nao. A Itaicy oferece tres experiencias principais: pesca esportiva cota zero (catch-and-release), observacao de aves (birdwatching com 166 especies catalogadas) e ecoturismo (trilhas, safaris fotograficos, passeios de barco). Tambem e ideal para casais, familias e fotografos de natureza que buscam imersao no Pantanal.",
      },
      {
        id: "home-2",
        number: "02",
        question: "Onde fica a Itaicy Pantanal Eco Lodge?",
        answer: "Estamos localizados em Miranda, Mato Grosso do Sul, no coracao do Pantanal Sul-Matogrossense (Patrimonio Natural da Humanidade - UNESCO). Ficamos a 240 km de Campo Grande (3h de carro) e 80 km de Bonito (1h30). O acesso e por estrada asfaltada ate a entrada da propriedade.",
      },
      {
        id: "home-3",
        number: "03",
        question: "Qual a melhor epoca para visitar o Pantanal?",
        answer: "Cada estacao oferece experiencias unicas. A seca (maio a setembro) e ideal para pesca esportiva e avistamento de fauna concentrada. A cheia (outubro a marco) revela paisagens dramaticas e aves migratorias. Para birdwatching, a seca e imbativel; para paisagens e fotografia, a transicao entre estacoes.",
      },
      {
        id: "home-4",
        number: "04",
        question: "As experiencias sao guiadas?",
        answer: "Sim. Todas as atividades sao acompanhadas por guias nativos especializados que nasceram na regiao e conhecem profundamente o bioma, os rios, os habitos da fauna e as melhores tecnicas para cada experiencia. Nossos guias sao certificados e seguem protocolos ambientais rigorosos.",
      },
      {
        id: "home-5",
        number: "05",
        question: "Posso personalizar meu roteiro?",
        answer: "Sim. Nossa equipe pode ajustar o pacote de acordo com seus interesses (pesca, aves, fotografia, contemplacao), a epoca do ano e a duracao da estadia. Oferecemos roteiros de 3 a 7 noites, com combinacoes de atividades adaptadas ao seu perfil e objetivos de viagem.",
      },
      {
        id: "home-6",
        number: "06",
        question: "Como chegar ao Pantanal saindo de Sao Paulo?",
        answer: "De Sao Paulo, a forma mais rapida e voar para Campo Grande (aeroporto CGR), com voos diretos de aproximadamente 2 horas por Gol, LATAM ou Azul. De Campo Grande, o transfer terrestre ate a Itaicy leva cerca de 3 horas pela BR-262, uma rodovia asfaltada que cruza a Serra de Maracaju. A pousada pode organizar transfer com motorista desde o aeroporto. Para quem prefere dirigir, sao aproximadamente 1.050 km por rodovia (13 horas).",
      },
      {
        id: "home-7",
        number: "07",
        question: "O lodge aceita criancas?",
        answer: "Sim, a Itaicy recebe familias com criancas de todas as idades. Temos a Suite Family com espaco para ate 4 pessoas. Os roteiros sao adaptados para incluir atividades seguras e educativas como passeios de barco tranquilos, observacao de animais e trilhas curtas. Guias nativos acompanham todas as saidas e conhecem tecnicas para manter criancas engajadas com a natureza do Pantanal.",
      },
      {
        id: "home-8",
        number: "08",
        question: "Tem Wi-Fi no meio do Pantanal?",
        answer: "Sim. A Itaicy oferece Wi-Fi via satelite nas areas comuns (recepcao, restaurante e varandas). A conexao e adequada para mensagens, e-mails e navegacao basica, mas nao ideal para streaming ou videochamadas pesadas. O sinal de celular (4G) funciona de forma intermitente na regiao — operadoras Vivo e Claro tem melhor cobertura. Recomendamos aproveitar a desconexao como parte da experiencia.",
      },
      {
        id: "home-9",
        number: "09",
        question: "Preciso de vacinas para visitar o Pantanal?",
        answer: "A vacina contra febre amarela e altamente recomendada, embora nao obrigatoria por lei. Tome-a pelo menos 10 dias antes da viagem. Mantenha o calendario vacinal em dia, incluindo tetano. O uso de repelente e roupas de manga longa ao entardecer e importante para protecao contra mosquitos. A Itaicy fornece repelente e orientacoes de saude para todos os hospedes durante a estadia.",
      },
      {
        id: "home-10",
        number: "10",
        question: "O que levar para o Pantanal?",
        answer: "Leve roupas leves de cores neutras (caqui, verde, cinza), calcados fechados confortaveis, chinelos, bone ou chapeu, protetor solar fator 50+, repelente, binoculos e camera com zoom. No inverno pantaneiro (junho a agosto), noites podem chegar a 10-15°C, entao um agasalho e essencial. A Itaicy fornece equipamentos de pesca, coletes salva-vidas e guias especializados — nao e necessario trazer equipamento esportivo.",
      },
      {
        id: "home-11",
        number: "11",
        question: "Qual a diferenca entre Pantanal Norte e Pantanal Sul?",
        answer: "O Pantanal Norte (Mato Grosso, Transpantaneira) e mais voltado para avistamento de onca-pintada. O Pantanal Sul (Mato Grosso do Sul, Miranda), onde fica a Itaicy, e referencia em pesca esportiva e birdwatching, com 166 especies catalogadas. O Sul e mais acessivel (aeroporto internacional em Campo Grande a 3h) e permite combinar com Bonito (80 km). Cada regiao tem fauna e experiencias distintas.",
      },
      {
        id: "home-12",
        number: "12",
        question: "E seguro pescar no Pantanal?",
        answer: "Sim. Todas as expedicoes de pesca da Itaicy sao acompanhadas por guias locais experientes que conhecem os rios, os pontos seguros e os habitos dos peixes. Fornecemos equipamentos de seguranca (coletes salva-vidas) e barcos adequados. A pesca e exclusivamente catch-and-release (cota zero), seguindo protocolos ambientais rigorosos. Jacarés e piranhas sao parte do ecossistema, mas nao representam perigo nas atividades guiadas.",
      },
      {
        id: "home-13",
        number: "13",
        question: "Quantos dias sao ideais para uma estadia no Pantanal?",
        answer: "Recomendamos um minimo de 3 noites para uma experiencia significativa, mas 5 a 7 noites e o ideal para explorar todas as atividades com calma: pesca, birdwatching, trilhas, safaris fotograficos e passeios de barco. Estadias mais longas permitem vivenciar diferentes horarios (amanhecer, entardecer, noturno) e aumentam significativamente as chances de avistamentos raros.",
      },
      {
        id: "home-14",
        number: "14",
        question: "As refeicoes estao inclusas na diaria?",
        answer: "Sim. A Itaicy opera em regime de pensao completa. Todas as refeicoes estao inclusas: cafe da manha, almoco e jantar, preparados com ingredientes regionais pelo nosso chef. A culinaria pantaneira inclui pratos como pacu assado, arroz carreteiro, sopa paraguaia e sobremesas com frutas do cerrado. Atendemos restricoes alimentares (vegetariano, intolerancia) com aviso previo.",
      },
      {
        id: "home-15",
        number: "15",
        question: "Posso combinar Pantanal com Bonito na mesma viagem?",
        answer: "Sim, e um dos roteiros mais procurados. Bonito fica a apenas 80 km da Itaicy (1h30 de carro) e oferece experiencias complementares: flutuacao em rios cristalinos, mergulho na Gruta do Lago Azul, trilhas e rapel. Um roteiro ideal combina 4-5 noites no Pantanal com 2-3 noites em Bonito. Nossa equipe pode organizar transfer e indicar parceiros de confianca em Bonito.",
      },
    ],
  },
};
