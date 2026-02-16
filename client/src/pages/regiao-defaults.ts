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
          "O Pantanal ocupa cerca de 150.000 km² divididos entre dois estados brasileiros, e cada metade oferece experiencias distintas para o visitante. O Pantanal Norte (Mato Grosso), com base em Pocone e ao longo da Transpantaneira, e mais conhecido pelo turismo de onca-pintada e tem infraestrutura focada em safaris fotograficos, com lodges concentrados ao longo dos 145 km da estrada-parque. O Pantanal Sul (Mato Grosso do Sul), onde fica a Itaicy em Miranda, e mais procurado por pescadores esportivos e observadores de aves, com 166 especies catalogadas apenas na area da pousada. O Sul tambem se destaca pela maior acessibilidade: o Aeroporto Internacional de Campo Grande (CGR) fica a apenas 240 km, cerca de 3 horas de carro pela BR-262 asfaltada. Alem disso, a proximidade de 80 km com Bonito permite combinar Pantanal e rios cristalinos em um unico roteiro de 7 a 10 dias.",
      },
      {
        id: "regiao-2",
        number: "02",
        question: "Preciso de vacinas para visitar o Pantanal?",
        answer:
          "Antes de viajar ao Pantanal, e importante verificar suas vacinas e tomar algumas precaucoes basicas de saude, ja que a regiao e classificada como area endemica de febre amarela pelo Ministerio da Saude. A vacina contra febre amarela e altamente recomendada, embora nao seja obrigatoria por lei para viajantes nacionais. Recomenda-se toma-la pelo menos 10 dias antes da viagem para que a imunizacao esteja ativa. A dose unica confere protecao vitalicia segundo a Organizacao Mundial da Saude. Alem disso, e importante estar com o calendario vacinal em dia, incluindo tetano e hepatite A. O uso de repelente com DEET ou icaridina e roupas de manga longa ao entardecer ajuda na protecao contra mosquitos, que sao mais ativos entre outubro e marco. A Itaicy disponibiliza repelente nas areas comuns e orientacoes sobre saude durante toda a estadia.",
      },
      {
        id: "regiao-3",
        number: "03",
        question: "O que levar para uma viagem ao Pantanal?",
        answer:
          "Planejar a mala para o Pantanal exige atencao ao clima tropical e as atividades ao ar livre que voce fara durante a estadia na regiao. Leve roupas leves e de cores neutras (caqui, verde, cinza) que ajudam na camuflagem durante observacao de fauna, calcados fechados confortaveis para trilhas em terreno irregular, chinelos para a pousada, bone ou chapeu de aba larga, protetor solar fator 50+ e repelente de insetos com DEET. Binoculos sao essenciais para observacao de aves, e uma camera fotografica com zoom de pelo menos 200 mm fara diferenca nos registros de fauna. No inverno pantaneiro (junho a agosto), as temperaturas noturnas podem cair a 10-15°C, entao inclua um agasalho de fleece ou jaqueta leve. A Itaicy fornece todos os equipamentos de pesca, coletes salva-vidas, lanternas para passeios noturnos e guias especializados — voce nao precisa trazer equipamento esportivo.",
      },
      {
        id: "regiao-4",
        number: "04",
        question: "Tem internet e sinal de celular no Pantanal?",
        answer:
          "A conectividade no Pantanal e limitada em comparacao com centros urbanos, mas a Itaicy mantem infraestrutura suficiente para que voce se comunique quando necessario. O lodge oferece Wi-Fi via satelite nas areas comuns, incluindo recepcao, restaurante e varandas com vista para o rio. A conexao e adequada para mensagens de texto, e-mails, navegacao basica e envio de fotos em redes sociais, mas nao e ideal para streaming de video ou videochamadas longas. O sinal de celular 4G funciona de forma intermitente na regiao de Miranda, que fica a cerca de 30 minutos do lodge — as operadoras Vivo e Claro oferecem melhor cobertura na area. Recomendamos aproveitar a desconexao digital como parte da experiencia imersiva no Pantanal: muitos hospedes relatam que a pausa nas telas e um dos pontos altos da viagem. Mesmo assim, voce nao ficara completamente isolado em nenhum momento.",
      },
      {
        id: "regiao-5",
        number: "05",
        question: "O Pantanal e seguro para familias com criancas?",
        answer:
          "O Pantanal e uma regiao de natureza preservada e com infraestrutura turistica consolidada, o que o torna um destino seguro e muito recomendado para familias com criancas de todas as idades. A Itaicy recebe familias regularmente e adapta os roteiros conforme o perfil e a faixa etaria do grupo, oferecendo passeios de barco em ritmo tranquilo, trilhas curtas de ate 2 km e sessoes de observacao de animais que encantam os pequenos. A pousada conta com Suite Family que acomoda ate 4 pessoas confortavelmente em um unico ambiente. Guias nativos com mais de 15 anos de experiencia acompanham todas as atividades e conhecem profundamente a fauna e os caminhos da regiao, garantindo seguranca em cada saida. O contato direto com jacares, capivaras, tucanos e araras em habitat natural oferece uma experiencia educativa e transformadora que criancas lembram por toda a vida.",
      },
    ],
  },
};
