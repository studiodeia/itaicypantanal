import type { RegiaoPageContent } from "@shared/cms-page-content";

export const regiaoDefaults: RegiaoPageContent = {
  hero: {
    label: "A REGIAO",
    heading: "Pantanal Sul-Matogrossense",
    subtitle:
      "A maior planicie alagavel do mundo, Patrimonio Natural da Humanidade pela UNESCO. Mais de 4.700 especies de plantas e animais em 150.000 km² de biodiversidade exuberante.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/regiao-hero-bg.webp",
  },
  location: {
    label: "LOCALIZACAO",
    heading: "Onde fica o Pantanal e como chegar a Itaicy",
    description:
      "O Itaicy Pantanal Eco Lodge esta localizado em Miranda, no Mato Grosso do Sul, dentro do Pantanal Sul-Matogrossense. A regiao e considerada a porta de entrada do Pantanal pela Estrada Parque, um dos roteiros mais cenicos do Brasil. Miranda fica a 240 km de Campo Grande (capital do estado, com aeroporto internacional), a 80 km de Bonito (um dos principais destinos de ecoturismo do pais) e a aproximadamente 200 km da fronteira com a Bolivia. O acesso e feito por rodovia asfaltada ate Miranda, seguido por estrada de terra mantida ate a pousada. O aeroporto mais proximo e o Aeroporto Internacional de Campo Grande (CGR), que recebe voos diretos de Sao Paulo, Rio de Janeiro, Brasilia e Curitiba. Transfers do aeroporto ate o lodge podem ser organizados pela equipe da Itaicy.",
    coordinates: "19°50'S, 56°41'W",
  },
  access: {
    label: "COMO CHEGAR",
    heading: "Rotas de acesso ao Pantanal",
    description:
      "O Pantanal Sul-Matogrossense e acessivel por via aerea e terrestre a partir das principais capitais brasileiras. O ponto de referencia e Campo Grande (CGR), capital do Mato Grosso do Sul, que possui aeroporto internacional com voos diarios. De Campo Grande, o trajeto ate Miranda leva cerca de 3 horas pela BR-262, uma rodovia asfaltada e bem sinalizada que cruza a Serra de Maracaju antes de descer ao Pantanal. Outra opcao e voar ate Bonito (aeroporto regional) e seguir 80 km ate Miranda. Para quem vem de carro, a Estrada Parque (MS-262) e uma das rotas mais cenograficas do Brasil, com avistamento de fauna silvestre ja no trajeto.",
    routes: [
      {
        from: "Sao Paulo (GRU/CGH)",
        distance: "1.450 km",
        duration: "Voo 2h + transfer 3h",
        description:
          "Voos diretos para Campo Grande (CGR) com duracao de aproximadamente 2 horas. De la, transfer terrestre de 3 horas pela BR-262 ate Miranda. Voos diarios por Gol, LATAM e Azul.",
      },
      {
        from: "Rio de Janeiro (GIG/SDU)",
        distance: "1.600 km",
        duration: "Voo 2h30 + transfer 3h",
        description:
          "Voos para Campo Grande com conexao ou diretos (dependendo da temporada). Transfer terrestre de Campo Grande ate a pousada em aproximadamente 3 horas.",
      },
      {
        from: "Brasilia (BSB)",
        distance: "1.130 km",
        duration: "Voo 1h40 + transfer 3h",
        description:
          "Voos diretos para Campo Grande com duracao de 1h40. Opcao terrestre pela BR-060 ate Campo Grande (14 horas de carro), nao recomendada.",
      },
      {
        from: "Curitiba (CWB)",
        distance: "1.200 km",
        duration: "Voo 1h50 + transfer 3h",
        description:
          "Voos diretos para Campo Grande. Opcao terrestre pela BR-267 passando por Maringa e Dourados (aproximadamente 14 horas).",
      },
    ],
  },
  climate: {
    label: "CLIMA E MELHOR EPOCA",
    heading: "Quando visitar o Pantanal",
    description:
      "O Pantanal possui duas estacoes bem definidas que transformam completamente a paisagem e as experiencias disponiveis. A estacao seca (maio a setembro) e a mais procurada por turistas: os rios recuam, os animais se concentram proximo a agua e a visibilidade para observacao de fauna e maxima. E o periodo ideal para pesca esportiva (temporada aberta de marco a outubro), birdwatching e safaris fotograficos. A estacao cheia (outubro a abril) traz as chuvas que inundam ate 80% da planicie, criando um cenario dramatico de aguas. Neste periodo, passeios de barco revelam paisagens unicas e a vegetacao explode em verde. Cada estacao oferece experiencias distintas e complementares — nao ha epoca ruim para visitar o Pantanal, apenas experiencias diferentes.",
    seasons: [
      {
        period: "Maio a Setembro (Seca)",
        temperature: "15°C a 32°C",
        rainfall: "Baixa (20-60 mm/mes)",
        characteristics:
          "Ceu aberto, noites frias, fauna concentrada. Melhor para pesca, birdwatching e safaris. Temporada alta.",
      },
      {
        period: "Outubro a Dezembro (Transicao)",
        temperature: "22°C a 36°C",
        rainfall: "Moderada (80-150 mm/mes)",
        characteristics:
          "Chuvas comecam, paisagem reverdece. Aves migratorias chegam. Bom para fotografia de paisagens.",
      },
      {
        period: "Janeiro a Marco (Cheia)",
        temperature: "24°C a 35°C",
        rainfall: "Alta (150-250 mm/mes)",
        characteristics:
          "Planicie alagada, passeios de barco por areas inundadas. Onca-pintada mais visivel em algumas regioes.",
      },
      {
        period: "Abril (Transicao Seca)",
        temperature: "20°C a 33°C",
        rainfall: "Moderada (60-100 mm/mes)",
        characteristics:
          "Aguas comecam a recuar. Excelente para fotografia. Temporada de pesca abre em marco.",
      },
    ],
  },
  nearby: {
    label: "ARREDORES",
    heading: "O que visitar proximo ao Pantanal",
    description:
      "A regiao de Miranda e privilegiada pela proximidade com alguns dos principais destinos turisticos do Mato Grosso do Sul. Bonito, a apenas 80 km, e reconhecido internacionalmente por seus rios de aguas cristalinas, flutuacao e mergulho em grutas. Campo Grande, a 240 km, e a capital do estado e oferece gastronomia regional, o Mercado Municipal e o Bioparque Pantanal (o maior aquario de agua doce do mundo). A combinacao Pantanal + Bonito e um dos roteiros mais procurados por turistas nacionais e internacionais, permitindo experiencias complementares de ecoturismo em uma unica viagem.",
    places: [
      {
        name: "Bonito",
        distance: "80 km (1h30 de carro)",
        description:
          "Capital do ecoturismo brasileiro. Rios de aguas cristalinas para flutuacao, Gruta do Lago Azul, mergulho em cavernas e trilhas. Combina perfeitamente com o Pantanal em roteiros de 7 a 10 dias.",
      },
      {
        name: "Campo Grande",
        distance: "240 km (3h de carro)",
        description:
          "Capital do Mato Grosso do Sul com aeroporto internacional. Bioparque Pantanal (maior aquario de agua doce do mundo), Mercado Municipal, gastronomia regional com sobá e tererê.",
      },
      {
        name: "Estrada Parque (MS-262)",
        distance: "Acesso direto",
        description:
          "Uma das estradas mais cenicas do Brasil, com 120 km de terra batida cortando o Pantanal. Pontes de madeira sobre rios, fauna silvestre avistada do carro e paisagens de tirar o folego.",
      },
      {
        name: "Rio Negro",
        distance: "Acesso direto",
        description:
          "Rio que banha a propriedade da Itaicy. Pesca esportiva de pintado, pacu e dourado. Passeios de barco ao nascer e por do sol. Habitat de jacarés, capivaras e aves aquáticas.",
      },
    ],
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre a regiao do Pantanal",
    description:
      "Respondemos as perguntas mais comuns de quem planeja visitar o Pantanal Sul-Matogrossense.",
    items: [
      {
        id: "regiao-1",
        number: "01",
        question: "Qual a diferenca entre Pantanal Norte e Pantanal Sul?",
        answer:
          "O Pantanal Norte (Mato Grosso), com base em Pocone e na Transpantaneira, e mais conhecido pelo turismo de onca-pintada e tem uma infraestrutura focada em safaris. O Pantanal Sul (Mato Grosso do Sul), onde fica a Itaicy em Miranda, e mais procurado por pescadores esportivos e observadores de aves, com 166 especies catalogadas apenas na regiao da pousada. O Sul tambem e mais acessivel, com aeroporto internacional em Campo Grande a 3 horas de distancia, e oferece a proximidade com Bonito para roteiros combinados.",
      },
      {
        id: "regiao-2",
        number: "02",
        question: "Preciso de vacinas para visitar o Pantanal?",
        answer:
          "A vacina contra febre amarela e altamente recomendada para quem visita o Pantanal, embora nao seja obrigatoria por lei. Recomenda-se tomar a vacina pelo menos 10 dias antes da viagem para que a imunizacao esteja ativa. Alem disso, e importante estar com o calendario vacinal em dia, incluindo tetano. O uso de repelente e roupas de manga longa ao entardecer ajuda na protecao contra mosquitos. A Itaicy disponibiliza repelente e orientacoes sobre saude durante toda a estadia.",
      },
      {
        id: "regiao-3",
        number: "03",
        question: "O que levar para uma viagem ao Pantanal?",
        answer:
          "Para aproveitar o Pantanal ao maximo, leve roupas leves e de cores neutras (caqui, verde, cinza), calcados fechados confortaveis para trilhas, chinelos para a pousada, bone ou chapeu, protetor solar fator 50+, repelente de insetos, binoculos para observacao de aves e uma camera fotografica com zoom. No inverno pantaneiro (junho a agosto), as noites podem chegar a 10-15°C, entao leve um agasalho. A Itaicy fornece equipamentos de pesca, coletes salva-vidas e guias especializados — voce nao precisa trazer equipamento esportivo.",
      },
      {
        id: "regiao-4",
        number: "04",
        question: "Tem internet e sinal de celular no Pantanal?",
        answer:
          "A Itaicy Pantanal Eco Lodge oferece Wi-Fi nas areas comuns (recepcao, restaurante e varandas). O sinal e via satelite, adequado para mensagens, e-mails e navegacao basica, mas nao ideal para streaming ou videochamadas pesadas. O sinal de celular (4G) funciona de forma intermitente na regiao de Miranda — operadoras Vivo e Claro tem melhor cobertura. Recomendamos aproveitar a desconexao digital como parte da experiencia imersiva no Pantanal, mas voce nao ficara completamente isolado.",
      },
      {
        id: "regiao-5",
        number: "05",
        question: "O Pantanal e seguro para familias com criancas?",
        answer:
          "Sim, o Pantanal e um destino seguro e muito recomendado para familias. A Itaicy recebe familias com criancas de todas as idades e adapta roteiros conforme o perfil do grupo. Passeios de barco, trilhas curtas e observacao de animais sao atividades que encantam criancas. A pousada tem Suite Family com espaco para ate 4 pessoas. Guias nativos acompanham todas as atividades e conhecem a regiao profundamente, garantindo seguranca. O contato direto com a natureza e uma experiencia educativa e transformadora para criancas.",
      },
    ],
  },
};
