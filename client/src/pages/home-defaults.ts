import type { HomePageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: HomePageContent = {
  aboutUs: {
    label: "SOBRE NÓS",
    heading: "Bem-vindo à Itaicy Pantanal Eco Lodge",
    body: [
      "Em Miranda, no coração do Pantanal Sul-Mato-Grossense — Patrimônio Natural da UNESCO — a Itaicy é o destino para quem busca aventura, contemplação e verdadeiro descanso. Para quem precisa sair do ritmo das cidades e simplesmente estar.",
      "Somos pioneiros no pesque e solte no Pantanal desde 2010, antes mesmo de existir legislação específica. Nossa filosofia equilibra alta performance esportiva, observação de aves e o raro privilégio de parar — sem agenda forçada, só natureza.",
    ],
    image: "/images/home/about-us.webp",
    features: [
      {
        number: "01",
        title: "Pioneirismo",
        description: "Os primeiros a adotar o pesque e solte no Pantanal, em 2010, ajudando a definir o padrão de conservação da região.",
      },
      {
        number: "02",
        title: "Excelência",
        description: "Guias nativos especializados com conhecimento profundo do bioma, dos rios e das espécies do Pantanal Sul.",
      },
      {
        number: "03",
        title: "Descanso Real",
        description: "Para quem precisa desconectar da cidade e reconectar com o que importa: silêncio, natureza e tempo livre.",
      },
    ],
  },
  expeditions: {
    label: "NOSSOS SERVIÇOS",
    heading: "Experiências no Coração do Pantanal",
    description:
      "Nossas atividades são desenhadas para uma conexão profunda com o ecossistema. Escolha a sua experiência.",
    items: [
      {
        title: "Pesca Esportiva Cota Zero",
        description:
          "Em águas bem conservadas, a pesca transcende — uma imersão tática com guias nativos que dominam o rio.",
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
        title: "Cota Zero Desde 2010",
        description:
          "Fomos pioneiros no pesque e solte no Pantanal antes de existir legislação. Nossa luta ajudou a definir o padrão de conservação que protege o Dourado hoje.",
      },
      {
        number: "02",
        title: "Piscicultura, Nunca Extração",
        description:
          "Todo o peixe servido na Itaicy vem de piscicultura local, nunca dos rios. Um compromisso concreto com o ecossistema que habitamos.",
      },
      {
        number: "03",
        title: "Silêncio como Experiência",
        description:
          "Para quem precisa sair do ritmo da cidade e simplesmente parar. O Pantanal oferece o que o mundo moderno não consegue vender: silêncio real e tempo que volta a ser seu.",
      },
    ],
    image: "/images/home/impact.webp",
  },
  blog: {
    label: "BLOG",
    heading: "Diário do Pantanal",
    description:
      "Histórias, descobertas e relatos do Pantanal: vida selvagem, pesca, aves e tudo o que acontece quando a cidade fica para trás.",
    buttonText: "Ver todos",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Dúvidas sobre o Pantanal e a Itaicy",
    description: "Respondemos as principais perguntas sobre a região, a pousada e as experiências que oferecemos.",
    items: [
      {
        id: "home-1",
        number: "01",
        question: "A pousada é destinada apenas para pesca?",
        answer: "Não. A Itaicy oferece três experiências principais: pesca esportiva cota zero (pesque e solte), observação de aves (birdwatching com 166 espécies catalogadas) e ecoturismo (trilhas, safáris fotográficos, passeios de barco). Também é o destino ideal para casais, famílias, fotógrafos de natureza e para quem simplesmente precisa de descanso e silêncio longe da rotina urbana.",
      },
      {
        id: "home-2",
        number: "02",
        question: "Onde fica a Itaicy Pantanal Eco Lodge?",
        answer: "Estamos localizados em Miranda, Mato Grosso do Sul, no coração do Pantanal Sul-Mato-Grossense (Patrimônio Natural da Humanidade — UNESCO). Ficamos a 240 km de Campo Grande (3h de carro) e a 80 km de Bonito (1h30). O acesso é por estrada asfaltada até a entrada da propriedade.",
      },
      {
        id: "home-3",
        number: "03",
        question: "Qual a melhor época para visitar o Pantanal?",
        answer: "Cada estação oferece experiências únicas. A seca (maio a setembro) é ideal para pesca esportiva e avistamento de fauna concentrada. A cheia (outubro a março) revela paisagens dramáticas e aves migratórias. Para birdwatching, a seca é imbatível; para paisagens e fotografia, a transição entre estações.",
      },
      {
        id: "home-4",
        number: "04",
        question: "As experiências são guiadas?",
        answer: "Sim. Todas as atividades são acompanhadas por guias nativos especializados que nasceram na região e conhecem profundamente o bioma, os rios, os hábitos da fauna e as melhores técnicas para cada experiência. Nossos guias são certificados e seguem protocolos ambientais rigorosos.",
      },
      {
        id: "home-5",
        number: "05",
        question: "Posso personalizar meu roteiro?",
        answer: "Sim. Nossa equipe pode ajustar o pacote de acordo com seus interesses (pesca, aves, fotografia, contemplação, descanso), a época do ano e a duração da estadia. Oferecemos roteiros de 3 a 7 noites, com combinações de atividades adaptadas ao seu perfil e objetivos de viagem.",
      },
      {
        id: "home-6",
        number: "06",
        question: "Como chegar ao Pantanal saindo de São Paulo?",
        answer: "De São Paulo, a forma mais rápida é voar para Campo Grande (aeroporto CGR), com voos diretos de aproximadamente 2 horas pela Gol, LATAM ou Azul. De Campo Grande, o transfer terrestre até a Itaicy leva cerca de 3 horas pela BR-262, uma rodovia asfaltada que cruza a Serra de Maracaju. A pousada pode organizar transfer com motorista desde o aeroporto. Para quem prefere dirigir, são aproximadamente 1.050 km por rodovia (13 horas).",
      },
      {
        id: "home-7",
        number: "07",
        question: "O lodge aceita crianças?",
        answer: "Sim, a Itaicy recebe famílias com crianças de todas as idades. Temos a Suíte Family com espaço para até 4 pessoas. Os roteiros são adaptados para incluir atividades seguras e educativas como passeios de barco tranquilos, observação de animais e trilhas curtas. Guias nativos acompanham todas as saídas e conhecem técnicas para manter crianças engajadas com a natureza do Pantanal.",
      },
      {
        id: "home-8",
        number: "08",
        question: "Tem Wi-Fi no meio do Pantanal?",
        answer: "Sim. A Itaicy oferece Wi-Fi via satélite nas áreas comuns (recepção, restaurante e varandas). A conexão é adequada para mensagens, e-mails e navegação básica, mas não é ideal para streaming ou videochamadas pesadas. O sinal de celular (4G) funciona de forma intermitente na região — operadoras Vivo e Claro têm melhor cobertura. Recomendamos aproveitar a desconexão como parte da experiência.",
      },
      {
        id: "home-9",
        number: "09",
        question: "Preciso de vacinas para visitar o Pantanal?",
        answer: "A vacina contra febre amarela é altamente recomendada, embora não obrigatória por lei. Tome-a pelo menos 10 dias antes da viagem. Mantenha o calendário vacinal em dia, incluindo tétano. O uso de repelente e roupas de manga longa ao entardecer é importante para proteção contra mosquitos. A Itaicy fornece repelente e orientações de saúde para todos os hóspedes durante a estadia.",
      },
      {
        id: "home-10",
        number: "10",
        question: "O que levar para o Pantanal?",
        answer: "Leve roupas leves de cores neutras (caqui, verde, cinza), calçados fechados confortáveis, chinelos, boné ou chapéu de aba larga, protetor solar fator 50+, repelente, binóculos e câmera com zoom. No inverno pantaneiro (junho a agosto), as noites podem chegar a 10–15°C, então um agasalho é essencial. A Itaicy fornece equipamentos de pesca, coletes salva-vidas e guias especializados — não é necessário trazer equipamento esportivo.",
      },
      {
        id: "home-11",
        number: "11",
        question: "Qual a diferença entre Pantanal Norte e Pantanal Sul?",
        answer: "O Pantanal Norte (Mato Grosso, Transpantaneira) é mais voltado para avistamento de onça-pintada. O Pantanal Sul (Mato Grosso do Sul, Miranda), onde fica a Itaicy, é referência em pesca esportiva e birdwatching, com 166 espécies catalogadas. O Sul é mais acessível (aeroporto internacional em Campo Grande a 3h) e permite combinar com Bonito (80 km). Cada região tem fauna e experiências distintas.",
      },
      {
        id: "home-12",
        number: "12",
        question: "É seguro pescar no Pantanal?",
        answer: "Sim. Todas as expedições de pesca da Itaicy são acompanhadas por guias locais experientes que conhecem os rios, os pontos seguros e os hábitos dos peixes. Fornecemos equipamentos de segurança (coletes salva-vidas) e barcos adequados. A pesca é exclusivamente cota zero (pesque e solte) — uma prática que adotamos desde 2010, antes mesmo de existir legislação específica no Brasil. Jacarés e piranhas são parte do ecossistema, mas não representam perigo nas atividades guiadas.",
      },
      {
        id: "home-13",
        number: "13",
        question: "Quantos dias são ideais para uma estadia no Pantanal?",
        answer: "Recomendamos um mínimo de 3 noites para uma experiência significativa, mas 5 a 7 noites é o ideal para explorar todas as atividades com calma: pesca, birdwatching, trilhas, safáris fotográficos e passeios de barco. Estadias mais longas permitem vivenciar diferentes horários (amanhecer, entardecer, noturno) e aumentam significativamente as chances de avistamentos raros.",
      },
      {
        id: "home-14",
        number: "14",
        question: "As refeições estão inclusas na diária?",
        answer: "Sim. A Itaicy opera em regime de pensão completa. Todas as refeições estão inclusas: café da manhã, almoço e jantar, preparados com ingredientes regionais pelo nosso chef. O peixe servido na mesa vem exclusivamente de piscicultura local — nunca dos rios. A culinária pantaneira inclui pratos como pacu assado, arroz carreteiro, sopa paraguaia e sobremesas com frutas do cerrado. Atendemos restrições alimentares (vegetariano, intolerâncias) com aviso prévio.",
      },
      {
        id: "home-15",
        number: "15",
        question: "Posso combinar Pantanal com Bonito na mesma viagem?",
        answer: "Sim, é um dos roteiros mais procurados. Bonito fica a apenas 80 km da Itaicy (1h30 de carro) e oferece experiências complementares: flutuação em rios cristalinos, mergulho na Gruta do Lago Azul, trilhas e rapel. Um roteiro ideal combina 4-5 noites no Pantanal com 2-3 noites em Bonito. Nossa equipe pode organizar transfer e indicar parceiros de confiança em Bonito.",
      },
    ],
  },
};

const en: HomePageContent = {
  aboutUs: {
    label: "ABOUT US",
    heading: "Welcome to Itaicy Pantanal Eco Lodge",
    body: [
      "In Miranda, in the heart of the Southern Pantanal — a UNESCO World Natural Heritage site — Itaicy is the destination for those seeking adventure, contemplation and real rest. For those who need to step away from city life and simply be.",
      "We pioneered catch-and-release fishing in the Pantanal since 2010, before any legislation existed. Our philosophy balances high-performance sport fishing, birdwatching, and the rare privilege of simply stopping — no forced agenda, just nature.",
    ],
    image: "/images/home/about-us.webp",
    features: [
      {
        number: "01",
        title: "Pioneers",
        description: "The first to adopt catch-and-release in the Pantanal, in 2010, helping define the conservation standard for the region.",
      },
      {
        number: "02",
        title: "Excellence",
        description: "Specialized native guides with deep knowledge of the biome, rivers, and species of the Southern Pantanal.",
      },
      {
        number: "03",
        title: "Real Rest",
        description: "For those who need to disconnect from the city and reconnect with what matters: silence, nature, and free time.",
      },
    ],
  },
  expeditions: {
    label: "OUR SERVICES",
    heading: "Experiences in the Heart of the Pantanal",
    description:
      "Our activities are designed for a deep connection with the ecosystem. Choose your experience.",
    items: [
      {
        title: "Catch-and-Release Sport Fishing",
        description:
          "In well-preserved waters, fishing transcends the ordinary — a tactical immersion with native guides who master the river.",
        backgroundImage: "/images/home/expedition-pesca.webp",
      },
      {
        title: "Birdwatching",
        description:
          "166 catalogued species in our sanctuary. Ornithologist guides lead immersive expeditions at dawn.",
        backgroundImage: "/images/home/expedition-birdwatching.webp",
      },
      {
        title: "Ecotourism",
        description:
          "Guided trails, boat trips and photographic safaris in the heart of the untouched Pantanal.",
        backgroundImage: "/images/home/expedition-ecoturismo.webp",
      },
    ],
    buttonText: "I want to explore",
  },
  stats: {
    items: [
      { target: 2000, suffix: "+", label: "SATISFIED GUESTS" },
      { target: 166, suffix: "+", label: "BIRD SPECIES SPOTTED" },
      { target: 15, suffix: "+", label: "YEARS OF EXPERIENCE" },
      { target: 4.9, suffix: "", label: "AVERAGE RATING", hasIcon: true },
    ],
  },
  accommodation: {
    label: "ACCOMMODATIONS",
    heading: "Authentic rest in the heart of the wilderness",
    body: "Our accommodations are designed for rest and immersion. Comfortable, air-conditioned and with views of untouched nature, they are the perfect starting point for your adventure in the Pantanal.",
    buttonReserve: "Reserve",
    buttonDetails: "More details",
    backgroundImage: "/images/home/accommodations-bg.webp",
  },
  impact: {
    label: "OUR IMPACT",
    heading: "Commitment to Nature, Impact on the Community",
    items: [
      {
        number: "01",
        title: "Catch-and-Release Since 2010",
        description:
          "We pioneered catch-and-release in the Pantanal before any legislation existed. Our advocacy helped define the conservation standard that protects the Dourado today.",
      },
      {
        number: "02",
        title: "Aquaculture, Never Extraction",
        description:
          "All fish served at Itaicy comes from local aquaculture, never from the rivers. A concrete commitment to the ecosystem we inhabit.",
      },
      {
        number: "03",
        title: "Silence as an Experience",
        description:
          "For those who need to step away from city pace and simply stop. The Pantanal offers what the modern world cannot sell: real silence and time that belongs to you again.",
      },
    ],
    image: "/images/home/impact.webp",
  },
  blog: {
    label: "BLOG",
    heading: "Pantanal Diary",
    description:
      "Stories, discoveries and accounts from the Pantanal: wildlife, fishing, birds, and everything that happens when the city is left behind.",
    buttonText: "View all",
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about the Pantanal and Itaicy",
    description: "We answer the main questions about the region, the lodge and the experiences we offer.",
    items: [
      {
        id: "home-1",
        number: "01",
        question: "Is the lodge only for fishing?",
        answer: "No. Itaicy offers three main experiences: catch-and-release sport fishing, birdwatching (with 166 catalogued species) and ecotourism (trails, photographic safaris, boat trips). It is also the ideal destination for couples, families, nature photographers, and those who simply need rest and silence away from the city routine.",
      },
      {
        id: "home-2",
        number: "02",
        question: "Where is Itaicy Pantanal Eco Lodge?",
        answer: "We are located in Miranda, Mato Grosso do Sul, in the heart of the Southern Pantanal (UNESCO World Natural Heritage). We are 240 km from Campo Grande (3h by car) and 80 km from Bonito (1h30). Access is via a paved road to the property entrance.",
      },
      {
        id: "home-3",
        number: "03",
        question: "What is the best time to visit the Pantanal?",
        answer: "Each season offers unique experiences. The dry season (May to September) is ideal for sport fishing and concentrated wildlife viewing. The wet season (October to March) reveals dramatic scenery and migratory birds. For birdwatching, the dry season is unbeatable; for scenery and photography, the transition between seasons.",
      },
      {
        id: "home-4",
        number: "04",
        question: "Are the experiences guided?",
        answer: "Yes. All activities are accompanied by specialized native guides who were born in the region and have deep knowledge of the biome, rivers, wildlife habits and the best techniques for each experience. Our guides are certified and follow strict environmental protocols.",
      },
      {
        id: "home-5",
        number: "05",
        question: "Can I customize my itinerary?",
        answer: "Yes. Our team can tailor the package to your interests (fishing, birdwatching, photography, contemplation, rest), the time of year and the length of stay. We offer itineraries from 3 to 7 nights, with activity combinations adapted to your profile and travel goals.",
      },
      {
        id: "home-6",
        number: "06",
        question: "How do I get to the Pantanal from São Paulo?",
        answer: "From São Paulo, the fastest way is to fly to Campo Grande (CGR airport), with direct flights of approximately 2 hours by Gol, LATAM or Azul. From Campo Grande, the road transfer to Itaicy takes about 3 hours via the BR-262, a paved highway that crosses the Serra de Maracaju. The lodge can arrange a transfer with a driver from the airport. For those who prefer to drive, it is approximately 1,050 km by road (13 hours).",
      },
      {
        id: "home-7",
        number: "07",
        question: "Does the lodge accept children?",
        answer: "Yes, Itaicy welcomes families with children of all ages. We have the Family Suite with space for up to 4 people. Itineraries are adapted to include safe and educational activities such as gentle boat trips, wildlife observation and short trails. Native guides accompany all outings and know techniques to keep children engaged with the Pantanal's nature.",
      },
      {
        id: "home-8",
        number: "08",
        question: "Is there Wi-Fi in the middle of the Pantanal?",
        answer: "Yes. Itaicy offers satellite Wi-Fi in common areas (reception, restaurant and balconies). The connection is adequate for messages, emails and basic browsing, but not ideal for streaming or heavy video calls. Mobile signal (4G) works intermittently in the area — Vivo and Claro carriers have better coverage. We recommend embracing the disconnection as part of the experience.",
      },
      {
        id: "home-9",
        number: "09",
        question: "Do I need vaccines to visit the Pantanal?",
        answer: "The yellow fever vaccine is highly recommended, although not legally mandatory. Take it at least 10 days before the trip. Keep your vaccination schedule up to date, including tetanus. Using repellent and long-sleeved clothing at dusk is important for protection against mosquitoes. Itaicy provides repellent and health guidance for all guests during the stay.",
      },
      {
        id: "home-10",
        number: "10",
        question: "What should I pack for the Pantanal?",
        answer: "Bring light clothing in neutral colors (khaki, green, gray), comfortable closed-toe shoes, flip-flops, a wide-brimmed cap or hat, SPF 50+ sunscreen, repellent, binoculars and a camera with zoom. During the Pantanal winter (June to August), nights can reach 10–15°C, so a jacket is essential. Itaicy provides fishing equipment, life jackets and specialized guides — you do not need to bring sports gear.",
      },
      {
        id: "home-11",
        number: "11",
        question: "What is the difference between the Northern and Southern Pantanal?",
        answer: "The Northern Pantanal (Mato Grosso, Transpantaneira) is more focused on jaguar sightings. The Southern Pantanal (Mato Grosso do Sul, Miranda), where Itaicy is located, is a reference for sport fishing and birdwatching, with 166 catalogued species. The South is more accessible (international airport in Campo Grande, 3h away) and can be combined with Bonito (80 km). Each region has distinct wildlife and experiences.",
      },
      {
        id: "home-12",
        number: "12",
        question: "Is it safe to fish in the Pantanal?",
        answer: "Yes. All of Itaicy's fishing expeditions are accompanied by experienced local guides who know the rivers, safe spots and fish habits. We provide safety equipment (life jackets) and adequate boats. Fishing is exclusively catch-and-release — a practice we adopted in 2010, before any specific legislation existed in Brazil. Caimans and piranhas are part of the ecosystem, but pose no danger in guided activities.",
      },
      {
        id: "home-13",
        number: "13",
        question: "How many days are ideal for a stay in the Pantanal?",
        answer: "We recommend a minimum of 3 nights for a meaningful experience, but 5 to 7 nights is ideal to explore all activities at a relaxed pace: fishing, birdwatching, trails, photographic safaris and boat trips. Longer stays allow you to experience different times of day (dawn, dusk, night) and significantly increase the chances of rare wildlife sightings.",
      },
      {
        id: "home-14",
        number: "14",
        question: "Are meals included in the daily rate?",
        answer: "Yes. Itaicy operates on a full board basis. All meals are included: breakfast, lunch and dinner, prepared with regional ingredients by our chef. The fish served at the table comes exclusively from local aquaculture — never from the rivers. Pantanal cuisine includes dishes such as roasted pacu, arroz carreteiro, Paraguayan soup and cerrado fruit desserts. Dietary restrictions (vegetarian, intolerances) are accommodated with advance notice.",
      },
      {
        id: "home-15",
        number: "15",
        question: "Can I combine the Pantanal with Bonito on the same trip?",
        answer: "Yes, it is one of the most sought-after itineraries. Bonito is only 80 km from Itaicy (1h30 by car) and offers complementary experiences: snorkeling in crystal-clear rivers, diving in the Gruta do Lago Azul, trails and rappelling. An ideal itinerary combines 4-5 nights in the Pantanal with 2-3 nights in Bonito. Our team can arrange transfers and recommend trusted partners in Bonito.",
      },
    ],
  },
};

const es: HomePageContent = {
  aboutUs: {
    label: "SOBRE NOSOTROS",
    heading: "Bienvenido a Itaicy Pantanal Eco Lodge",
    body: [
      "En Miranda, en el corazón del Pantanal Sur-Mato-Grossense — Patrimonio Natural de la UNESCO — Itaicy es el destino para quienes buscan aventura, contemplación y verdadero descanso. Para quienes necesitan salir del ritmo de la ciudad y simplemente estar.",
      "Somos pioneros en la pesca de captura y suelta en el Pantanal desde 2010, antes de que existiera ninguna legislación. Nuestra filosofía equilibra la pesca deportiva de alto rendimiento, el avistamiento de aves y el raro privilegio de detenerse — sin agenda forzada, solo naturaleza.",
    ],
    image: "/images/home/about-us.webp",
    features: [
      {
        number: "01",
        title: "Pioneros",
        description: "Los primeros en adoptar la captura y suelta en el Pantanal, en 2010, ayudando a definir el estándar de conservación de la región.",
      },
      {
        number: "02",
        title: "Excelencia",
        description: "Guías nativos especializados con profundo conocimiento del bioma, los ríos y las especies del Pantanal Sur.",
      },
      {
        number: "03",
        title: "Descanso Real",
        description: "Para quienes necesitan desconectarse de la ciudad y reconectarse con lo que importa: silencio, naturaleza y tiempo libre.",
      },
    ],
  },
  expeditions: {
    label: "NUESTROS SERVICIOS",
    heading: "Experiencias en el Corazón del Pantanal",
    description:
      "Nuestras actividades están diseñadas para una conexión profunda con el ecosistema. Elija su experiencia.",
    items: [
      {
        title: "Pesca Deportiva Cuota Cero",
        description:
          "En aguas bien conservadas, la pesca trasciende lo ordinario — una inmersión táctica con guías nativos que dominan el río.",
        backgroundImage: "/images/home/expedition-pesca.webp",
      },
      {
        title: "Aviturismo",
        description:
          "166 especies catalogadas en nuestro santuario. Guías ornitólogos conducen expediciones inmersivas al amanecer.",
        backgroundImage: "/images/home/expedition-birdwatching.webp",
      },
      {
        title: "Ecoturismo",
        description:
          "Senderos guiados, paseos en barco y safaris fotográficos en el corazón del Pantanal intocado.",
        backgroundImage: "/images/home/expedition-ecoturismo.webp",
      },
    ],
    buttonText: "Quiero conocer",
  },
  stats: {
    items: [
      { target: 2000, suffix: "+", label: "HUÉSPEDES SATISFECHOS" },
      { target: 166, suffix: "+", label: "AVES AVISTADAS" },
      { target: 15, suffix: "+", label: "AÑOS DE EXPERIENCIA" },
      { target: 4.9, suffix: "", label: "CALIFICACIÓN PROMEDIO", hasIcon: true },
    ],
  },
  accommodation: {
    label: "ALOJAMIENTO",
    heading: "Descanso auténtico en el corazón salvaje",
    body: "Nuestros alojamientos están proyectados para el descanso y la inmersión. Confortables, climatizados y con vista a la naturaleza intocada, son el punto de partida perfecto para su aventura en el Pantanal.",
    buttonReserve: "Reservar",
    buttonDetails: "Más detalles",
    backgroundImage: "/images/home/accommodations-bg.webp",
  },
  impact: {
    label: "NUESTRO IMPACTO",
    heading: "Compromiso con la Naturaleza, Impacto en la Comunidad",
    items: [
      {
        number: "01",
        title: "Cuota Cero Desde 2010",
        description:
          "Fuimos pioneros en la pesca y suelta en el Pantanal antes de que existiera ninguna legislación. Nuestra lucha ayudó a definir el estándar de conservación que protege al Dourado hoy.",
      },
      {
        number: "02",
        title: "Acuicultura, Nunca Extracción",
        description:
          "Todo el pescado servido en Itaicy proviene de acuicultura local, nunca de los ríos. Un compromiso concreto con el ecosistema que habitamos.",
      },
      {
        number: "03",
        title: "El Silencio como Experiencia",
        description:
          "Para quienes necesitan salir del ritmo de la ciudad y simplemente detenerse. El Pantanal ofrece lo que el mundo moderno no puede vender: silencio real y tiempo que vuelve a ser tuyo.",
      },
    ],
    image: "/images/home/impact.webp",
  },
  blog: {
    label: "BLOG",
    heading: "Diario del Pantanal",
    description:
      "Historias, descubrimientos y relatos del Pantanal: vida silvestre, pesca, aves y todo lo que ocurre cuando la ciudad queda atrás.",
    buttonText: "Ver todos",
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Dudas sobre el Pantanal y la Itaicy",
    description: "Respondemos las principales preguntas sobre la región, el lodge y las experiencias que ofrecemos.",
    items: [
      {
        id: "home-1",
        number: "01",
        question: "¿El lodge es solo para pesca?",
        answer: "No. Itaicy ofrece tres experiencias principales: pesca deportiva cuota cero (pesca y suelta), aviturismo (con 166 especies catalogadas) y ecoturismo (senderos, safaris fotográficos, paseos en barco). También es el destino ideal para parejas, familias, fotógrafos de naturaleza y quienes simplemente necesitan descanso y silencio fuera de la rutina urbana.",
      },
      {
        id: "home-2",
        number: "02",
        question: "¿Dónde está Itaicy Pantanal Eco Lodge?",
        answer: "Estamos ubicados en Miranda, Mato Grosso do Sul, en el corazón del Pantanal Sur-Matogrossense (Patrimonio Natural de la Humanidad — UNESCO). Estamos a 240 km de Campo Grande (3h en auto) y 80 km de Bonito (1h30). El acceso es por carretera asfaltada hasta la entrada de la propiedad.",
      },
      {
        id: "home-3",
        number: "03",
        question: "¿Cuál es la mejor época para visitar el Pantanal?",
        answer: "Cada estación ofrece experiencias únicas. La seca (mayo a septiembre) es ideal para la pesca deportiva y el avistamiento de fauna concentrada. La época de lluvias (octubre a marzo) revela paisajes dramáticos y aves migratorias. Para el aviturismo, la seca es insuperable; para paisajes y fotografía, la transición entre estaciones.",
      },
      {
        id: "home-4",
        number: "04",
        question: "¿Las experiencias son guiadas?",
        answer: "Sí. Todas las actividades son acompañadas por guías nativos especializados que nacieron en la región y conocen profundamente el bioma, los ríos, los hábitos de la fauna y las mejores técnicas para cada experiencia. Nuestros guías están certificados y siguen protocolos ambientales rigurosos.",
      },
      {
        id: "home-5",
        number: "05",
        question: "¿Puedo personalizar mi itinerario?",
        answer: "Sí. Nuestro equipo puede ajustar el paquete según sus intereses (pesca, aviturismo, fotografía, contemplación, descanso), la época del año y la duración de la estadía. Ofrecemos itinerarios de 3 a 7 noches, con combinaciones de actividades adaptadas a su perfil y objetivos de viaje.",
      },
      {
        id: "home-6",
        number: "06",
        question: "¿Cómo llego al Pantanal desde São Paulo?",
        answer: "Desde São Paulo, la forma más rápida es volar a Campo Grande (aeropuerto CGR), con vuelos directos de aproximadamente 2 horas por Gol, LATAM o Azul. Desde Campo Grande, el transfer vial hasta Itaicy dura unas 3 horas por la BR-262, una carretera asfaltada que cruza la Serra de Maracaju. El lodge puede organizar un transfer con conductor desde el aeropuerto. Para quienes prefieren manejar, son aproximadamente 1.050 km por carretera (13 horas).",
      },
      {
        id: "home-7",
        number: "07",
        question: "¿El lodge acepta niños?",
        answer: "Sí, Itaicy recibe familias con niños de todas las edades. Tenemos la Suite Family con espacio para hasta 4 personas. Los itinerarios se adaptan para incluir actividades seguras y educativas como paseos tranquilos en barco, observación de animales y senderos cortos. Guías nativos acompañan todas las salidas y conocen técnicas para mantener a los niños comprometidos con la naturaleza del Pantanal.",
      },
      {
        id: "home-8",
        number: "08",
        question: "¿Hay Wi-Fi en medio del Pantanal?",
        answer: "Sí. Itaicy ofrece Wi-Fi vía satélite en las áreas comunes (recepción, restaurante y balcones). La conexión es adecuada para mensajes, correos y navegación básica, pero no es ideal para streaming o videollamadas pesadas. La señal de celular (4G) funciona de forma intermitente en la zona — las operadoras Vivo y Claro tienen mejor cobertura. Recomendamos aprovechar la desconexión como parte de la experiencia.",
      },
      {
        id: "home-9",
        number: "09",
        question: "¿Necesito vacunas para visitar el Pantanal?",
        answer: "La vacuna contra la fiebre amarilla es muy recomendada, aunque no es obligatoria por ley. Tómela al menos 10 días antes del viaje. Mantenga su calendario de vacunación al día, incluyendo el tétanos. El uso de repelente y ropa de manga larga al anochecer es importante para la protección contra mosquitos. Itaicy provee repelente y orientaciones de salud para todos los huéspedes durante la estadía.",
      },
      {
        id: "home-10",
        number: "10",
        question: "¿Qué debo llevar al Pantanal?",
        answer: "Lleve ropa ligera en colores neutros (caqui, verde, gris), calzado cerrado cómodo, ojotas, gorra o sombrero de ala ancha, protector solar factor 50+, repelente, binoculares y una cámara con zoom. En el invierno pantanero (junio a agosto), las noches pueden llegar a 10–15°C, por lo que una chaqueta es esencial. Itaicy provee equipo de pesca, chalecos salvavidas y guías especializados — no es necesario traer equipo deportivo.",
      },
      {
        id: "home-11",
        number: "11",
        question: "¿Cuál es la diferencia entre el Pantanal Norte y el Pantanal Sur?",
        answer: "El Pantanal Norte (Mato Grosso, Transpantaneira) está más orientado al avistamiento de jaguares. El Pantanal Sur (Mato Grosso do Sul, Miranda), donde está Itaicy, es referencia en pesca deportiva y aviturismo, con 166 especies catalogadas. El Sur es más accesible (aeropuerto internacional en Campo Grande a 3h) y permite combinarse con Bonito (80 km). Cada región tiene fauna y experiencias distintas.",
      },
      {
        id: "home-12",
        number: "12",
        question: "¿Es seguro pescar en el Pantanal?",
        answer: "Sí. Todas las expediciones de pesca de Itaicy son acompañadas por guías locales experimentados que conocen los ríos, los puntos seguros y los hábitos de los peces. Proveemos equipos de seguridad (chalecos salvavidas) y botes adecuados. La pesca es exclusivamente cuota cero (pesca y suelta) — una práctica que adoptamos en 2010, antes de que existiera ninguna legislación específica en Brasil. Los caimanes y las pirañas son parte del ecosistema, pero no representan peligro en las actividades guiadas.",
      },
      {
        id: "home-13",
        number: "13",
        question: "¿Cuántos días son ideales para una estadía en el Pantanal?",
        answer: "Recomendamos un mínimo de 3 noches para una experiencia significativa, pero 5 a 7 noches es lo ideal para explorar todas las actividades con calma: pesca, aviturismo, senderos, safaris fotográficos y paseos en barco. Las estadías más largas permiten vivenciar diferentes horarios (amanecer, atardecer, nocturno) y aumentan significativamente las posibilidades de avistamientos raros.",
      },
      {
        id: "home-14",
        number: "14",
        question: "¿Las comidas están incluidas en la tarifa?",
        answer: "Sí. Itaicy opera en régimen de pensión completa. Todas las comidas están incluidas: desayuno, almuerzo y cena, preparados con ingredientes regionales por nuestro chef. El pescado servido en la mesa proviene exclusivamente de acuicultura local — nunca de los ríos. La gastronomía pantanera incluye platos como pacu asado, arroz carreteiro, sopa paraguaya y postres con frutas del cerrado. Las restricciones alimentarias (vegetariano, intolerancias) se atienden con aviso previo.",
      },
      {
        id: "home-15",
        number: "15",
        question: "¿Puedo combinar el Pantanal con Bonito en el mismo viaje?",
        answer: "Sí, es uno de los itinerarios más buscados. Bonito está a solo 80 km de Itaicy (1h30 en auto) y ofrece experiencias complementarias: flotación en ríos cristalinos, buceo en la Gruta do Lago Azul, senderos y rapel. Un itinerario ideal combina 4-5 noches en el Pantanal con 2-3 noches en Bonito. Nuestro equipo puede organizar el transfer y recomendar socios de confianza en Bonito.",
      },
    ],
  },
};

export const homeDefaults: LocalizedDefaults<"/"> = { pt, en, es };
