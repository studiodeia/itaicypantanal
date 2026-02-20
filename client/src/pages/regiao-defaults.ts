import type { RegiaoPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: RegiaoPageContent = {
  hero: {
    label: "A REGIÃO",
    heading: "Pantanal Norte Matogrossense",
    subtitle:
      "A maior planície alagável do mundo, Patrimônio Natural da Humanidade pela UNESCO. Mais de 4.700 espécies de plantas e animais em 150.000 km² de biodiversidade exuberante.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/regiao-hero-bg.webp",
  },
  location: {
    label: "LOCALIZAÇÃO",
    heading: "Onde fica o Pantanal e como chegar à Itaicy",
    description:
      "O Itaicy Pantanal Eco Lodge está localizado em Santo Antônio do Leverger, no Mato Grosso (MT), dentro do Pantanal Norte Matogrossense. A pousada fica às margens do Rio Cuiabá, a 61 km do Aeroporto Internacional de Cuiabá (CGB) — cerca de 1 hora de carro. O aeroporto recebe voos diretos de São Paulo, Rio de Janeiro, Brasília e outras capitais. A estrada de acesso é asfaltada até a entrada da propriedade. Transfers do aeroporto até o lodge podem ser organizados pela equipe da Itaicy.",
    coordinates: "15°52'S, 56°05'W",
  },
  access: {
    label: "COMO CHEGAR",
    heading: "Rotas de acesso ao Pantanal",
    description:
      "O Pantanal Norte Matogrossense é acessível por via aérea e terrestre a partir das principais capitais brasileiras. O ponto de referência é Cuiabá (CGB), capital do Mato Grosso, com aeroporto internacional e voos diários. De Cuiabá, o trajeto até a Itaicy leva cerca de 1 hora (61 km), por estrada asfaltada. Para quem vem de carro de São Paulo ou Rio de Janeiro, a viagem é longa (acima de 1.700 km) — recomendamos o voo para Cuiabá. A Transpantaneira, saindo de Poconé, é uma das estradas mais cênicas do Brasil, com avistamento de fauna silvestre já no trajeto.",
    routes: [
      {
        from: "São Paulo (GRU/CGH)",
        distance: "~1.750 km",
        duration: "Voo 2h + transfer 1h",
        description:
          "Voos diretos para Cuiabá (CGB) com duração de aproximadamente 2 horas. De lá, transfer terrestre de 1 hora (61 km) até a pousada. Voos diários por Gol, LATAM e Azul.",
      },
      {
        from: "Rio de Janeiro (GIG/SDU)",
        distance: "~2.000 km",
        duration: "Voo 2h30 + transfer 1h",
        description:
          "Voos para Cuiabá com conexão ou diretos (dependendo da temporada). Transfer terrestre de Cuiabá até a pousada em aproximadamente 1 hora.",
      },
      {
        from: "Brasília (BSB)",
        distance: "~1.130 km",
        duration: "Voo 1h30 + transfer 1h",
        description:
          "Voos diretos para Cuiabá com duração de aproximadamente 1h30. Transfer terrestre de 1 hora até a pousada. Opção por rodovia de ~1.130 km (12 horas), não recomendada.",
      },
      {
        from: "Curitiba (CWB)",
        distance: "~2.200 km",
        duration: "Voo ~3h + transfer 1h",
        description:
          "Voos para Cuiabá com conexão via São Paulo (duração total ~3h). Transfer terrestre de 1 hora até a pousada. Opção por rodovia de ~2.200 km, não recomendada.",
      },
    ],
  },
  climate: {
    label: "CLIMA E MELHOR ÉPOCA",
    heading: "Quando visitar o Pantanal",
    description:
      "O Pantanal possui duas estações bem definidas que transformam completamente a paisagem e as experiências disponíveis. A estação seca (maio a setembro) é a mais procurada por turistas: os rios recuam, os animais se concentram próximo à água e a visibilidade para observação de fauna é máxima. É o período ideal para pesca esportiva (temporada aberta de março a outubro), birdwatching e safáris fotográficos. A estação cheia (outubro a abril) traz as chuvas que inundam até 80% da planície, criando um cenário dramático de águas. Neste período, passeios de barco revelam paisagens únicas e a vegetação explode em verde. Cada estação oferece experiências distintas e complementares — não há época ruim para visitar o Pantanal, apenas experiências diferentes.",
    seasons: [
      {
        period: "Maio a Setembro (Seca)",
        temperature: "15°C a 32°C",
        rainfall: "Baixa (20-60 mm/mês)",
        characteristics:
          "Céu aberto, noites frias, fauna concentrada. Melhor para pesca, birdwatching e safáris. Temporada alta.",
      },
      {
        period: "Outubro a Dezembro (Transição)",
        temperature: "22°C a 36°C",
        rainfall: "Moderada (80-150 mm/mês)",
        characteristics:
          "Chuvas começam, paisagem reverdece. Aves migratórias chegam. Bom para fotografia de paisagens.",
      },
      {
        period: "Janeiro a Março (Cheia)",
        temperature: "24°C a 35°C",
        rainfall: "Alta (150-250 mm/mês)",
        characteristics:
          "Planície alagada, passeios de barco por áreas inundadas. Onça-pintada mais visível em algumas regiões.",
      },
      {
        period: "Abril (Transição Seca)",
        temperature: "20°C a 33°C",
        rainfall: "Moderada (60-100 mm/mês)",
        characteristics:
          "Águas começam a recuar. Excelente para fotografia. Temporada de pesca abre em março.",
      },
    ],
  },
  nearby: {
    label: "ARREDORES",
    heading: "O que visitar próximo ao Pantanal",
    description:
      "A região de Santo Antônio do Leverger é privilegiada pela proximidade com Cuiabá e com a Chapada dos Guimarães — dois destinos que se complementam perfeitamente com a imersão no Pantanal. Cuiabá, a apenas 61 km, é a capital do Mato Grosso e ponto de partida para a viagem. A Chapada dos Guimarães, a ~120 km, é um dos destinos de ecoturismo mais belos do Brasil, com cânions, cachoeiras e sítios arqueológicos. A Transpantaneira, famosa pelos avistamentos de onça-pintada e jacarés, fica a poucas horas de carro da pousada.",
    places: [
      {
        name: "Chapada dos Guimarães",
        distance: "~120 km (~1h30 de carro)",
        description:
          "Um dos destinos de ecoturismo mais espetaculares do Brasil. Cânions, cachoeiras, mirantes panorâmicos, trilhas e sítios arqueológicos. Combina perfeitamente com o Pantanal em roteiros de 7 a 10 dias.",
      },
      {
        name: "Cuiabá",
        distance: "61 km (~1h de carro)",
        description:
          "Capital do Mato Grosso e ponto de chegada pelo Aeroporto Internacional CGB. Gastronomia regional, Museu do Rio, Praça da República e boa oferta de serviços para uma parada antes ou depois do lodge.",
      },
      {
        name: "Transpantaneira",
        distance: "~120 km (via Poconé)",
        description:
          "A estrada mais icônica do Pantanal Norte. 145 km de pontes de madeira sobre rios, com avistamentos garantidos de jacarés, capivaras, tuiuiús e onça-pintada. Uma das rotas de safari mais famosas da América do Sul.",
      },
      {
        name: "Rio Cuiabá",
        distance: "Acesso direto",
        description:
          "Rio que banha a propriedade da Itaicy. Pesca esportiva de pintado, pacu e dourado. Passeios de barco ao nascer e pôr do sol. Habitat de jacarés, capivaras e aves aquáticas.",
      },
    ],
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Dúvidas sobre a região do Pantanal",
    description:
      "Respondemos as perguntas mais comuns de quem planeja visitar o Pantanal Norte Matogrossense.",
    items: [
      {
        id: "regiao-1",
        number: "01",
        question: "Qual a diferença entre Pantanal Norte e Pantanal Sul?",
        answer:
          "O Pantanal ocupa cerca de 150.000 km² divididos entre dois estados brasileiros, e cada metade oferece experiências distintas. O Pantanal Norte (Mato Grosso), onde fica a Itaicy em Santo Antônio do Leverger, é referência em pesca esportiva e birdwatching, com 166 espécies catalogadas na área da pousada. É acessado pelo Aeroporto de Cuiabá (CGB, 1h de carro). A Transpantaneira, no mesmo estado, é a rota mais icônica para avistamento de onça-pintada. O Pantanal Sul (Mato Grosso do Sul, Miranda/Campo Grande) é mais procurado por turistas que combinam o bioma com Bonito. Cada região tem fauna e experiências distintas — e o Pantanal Norte oferece o diferencial de fácil acesso por Cuiabá.",
      },
      {
        id: "regiao-2",
        number: "02",
        question: "Preciso de vacinas para visitar o Pantanal?",
        answer:
          "Antes de viajar ao Pantanal, é importante verificar suas vacinas e tomar algumas precauções básicas de saúde, já que a região é classificada como área endêmica de febre amarela pelo Ministério da Saúde. A vacina contra febre amarela é altamente recomendada, embora não seja obrigatória por lei para viajantes nacionais. Recomenda-se tomá-la pelo menos 10 dias antes da viagem para que a imunização esteja ativa. A dose única confere proteção vitalícia segundo a Organização Mundial da Saúde. Além disso, é importante estar com o calendário vacinal em dia, incluindo tétano e hepatite A. O uso de repelente com DEET ou icaridina e roupas de manga longa ao entardecer ajuda na proteção contra mosquitos, que são mais ativos entre outubro e março. A Itaicy disponibiliza repelente nas áreas comuns e orientações sobre saúde durante toda a estadia.",
      },
      {
        id: "regiao-3",
        number: "03",
        question: "O que levar para uma viagem ao Pantanal?",
        answer:
          "Planejar a mala para o Pantanal exige atenção ao clima tropical e às atividades ao ar livre que você fará durante a estadia na região. Leve roupas leves e de cores neutras (caqui, verde, cinza) que ajudam na camuflagem durante observação de fauna, calçados fechados confortáveis para trilhas em terreno irregular, chinelos para a pousada, boné ou chapéu de aba larga, protetor solar fator 50+ e repelente de insetos com DEET. Binóculos são essenciais para observação de aves, e uma câmera fotográfica com zoom de pelo menos 200 mm fará diferença nos registros de fauna. No inverno pantaneiro (junho a agosto), as temperaturas noturnas podem cair a 10-15°C, então inclua um agasalho de fleece ou jaqueta leve. A Itaicy fornece todos os equipamentos de pesca, coletes salva-vidas, lanternas para passeios noturnos e guias especializados — você não precisa trazer equipamento esportivo.",
      },
      {
        id: "regiao-4",
        number: "04",
        question: "Tem internet e sinal de celular no Pantanal?",
        answer:
          "A conectividade no Pantanal é limitada em comparação com centros urbanos, mas a Itaicy mantém infraestrutura suficiente para que você se comunique quando necessário. O lodge oferece Wi-Fi via satélite nas áreas comuns, incluindo recepção, restaurante e varandas com vista para o rio. A conexão é adequada para mensagens de texto, e-mails, navegação básica e envio de fotos em redes sociais, mas não é ideal para streaming de vídeo ou videochamadas longas. O sinal de celular 4G funciona de forma intermitente na área de Santo Antônio do Leverger — as operadoras Vivo e Claro oferecem melhor cobertura na região. Recomendamos aproveitar a desconexão digital como parte da experiência imersiva no Pantanal: muitos hóspedes relatam que a pausa nas telas é um dos pontos altos da viagem. Mesmo assim, você não ficará completamente isolado em nenhum momento.",
      },
      {
        id: "regiao-5",
        number: "05",
        question: "O Pantanal é seguro para famílias com crianças?",
        answer:
          "O Pantanal é uma região de natureza preservada e com infraestrutura turística consolidada, o que o torna um destino seguro e muito recomendado para famílias com crianças de todas as idades. A Itaicy recebe famílias regularmente e adapta os roteiros conforme o perfil e a faixa etária do grupo, oferecendo passeios de barco em ritmo tranquilo, trilhas curtas de até 2 km e sessões de observação de animais que encantam os pequenos. A pousada conta com Suíte Family que acomoda até 4 pessoas confortavelmente em um único ambiente. Guias nativos com mais de 15 anos de experiência acompanham todas as atividades e conhecem profundamente a fauna e os caminhos da região, garantindo segurança em cada saída. O contato direto com jacarés, capivaras, tucanos e araras em habitat natural oferece uma experiência educativa e transformadora que crianças lembram por toda a vida.",
      },
    ],
  },
};

const en: RegiaoPageContent = {
  hero: {
    label: "THE REGION",
    heading: "Northern Pantanal",
    subtitle:
      "The largest floodplain in the world, a UNESCO Natural Heritage Site. Over 4,700 species of plants and animals across 150,000 km² of exuberant biodiversity.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/regiao-hero-bg.webp",
  },
  location: {
    label: "LOCATION",
    heading: "Where the Pantanal is and how to get to Itaicy",
    description:
      "Itaicy Pantanal Eco Lodge is located in Santo Antônio do Leverger, Mato Grosso (MT), within the Northern Pantanal. The lodge sits on the banks of the Rio Cuiabá, 61 km from Cuiabá International Airport (CGB) — approximately 1 hour by car. The airport receives direct flights from São Paulo, Rio de Janeiro, Brasília and other capitals. The access road is paved all the way to the property entrance. Transfers from the airport to the lodge can be arranged by the Itaicy team.",
    coordinates: "15°52'S, 56°05'W",
  },
  access: {
    label: "HOW TO GET THERE",
    heading: "Access routes to the Pantanal",
    description:
      "The Northern Pantanal is accessible by air and road from the main Brazilian state capitals. The reference point is Cuiabá (CGB), the capital of Mato Grosso, with an international airport and daily flights. From Cuiabá, the drive to Itaicy takes about 1 hour (61 km) along a paved road. For those driving from São Paulo or Rio de Janeiro, the journey exceeds 1,700 km — we recommend flying to Cuiabá. The Transpantaneira, departing from Poconé, is one of the most scenic roads in Brazil, with guaranteed wildlife sightings along the way.",
    routes: [
      {
        from: "São Paulo (GRU/CGH)",
        distance: "~1,750 km",
        duration: "2h flight + 1h transfer",
        description:
          "Direct flights to Cuiabá (CGB) of approximately 2 hours. From there, a 1-hour road transfer (61 km) to the lodge. Daily flights by Gol, LATAM and Azul.",
      },
      {
        from: "Rio de Janeiro (GIG/SDU)",
        distance: "~2,000 km",
        duration: "2h30 flight + 1h transfer",
        description:
          "Flights to Cuiabá with connection or direct (depending on the season). Road transfer from Cuiabá to the lodge in approximately 1 hour.",
      },
      {
        from: "Brasília (BSB)",
        distance: "~1,130 km",
        duration: "1h30 flight + 1h transfer",
        description:
          "Direct flights to Cuiabá of approximately 1h30. Road transfer of 1 hour to the lodge. Land option (~1,130 km, 12 hours), not recommended.",
      },
      {
        from: "Curitiba (CWB)",
        distance: "~2,200 km",
        duration: "~3h flight + 1h transfer",
        description:
          "Flights to Cuiabá via connection through São Paulo (total ~3 hours). Road transfer of 1 hour to the lodge. Land option (~2,200 km), not recommended.",
      },
    ],
  },
  climate: {
    label: "CLIMATE AND BEST TIME TO VISIT",
    heading: "When to visit the Pantanal",
    description:
      "The Pantanal has two well-defined seasons that completely transform the landscape and available experiences. The dry season (May to September) is the most sought after by tourists: the rivers recede, animals concentrate near water and visibility for wildlife observation is at its peak. It is the ideal period for sport fishing (open season from March to October), birdwatching and photographic safaris. The wet season (October to April) brings rains that flood up to 80% of the plain, creating a dramatic aquatic landscape. During this period, boat trips reveal unique scenery and the vegetation explodes in green. Each season offers distinct and complementary experiences — there is no bad time to visit the Pantanal, only different experiences.",
    seasons: [
      {
        period: "May to September (Dry Season)",
        temperature: "15°C to 32°C",
        rainfall: "Low (20-60 mm/month)",
        characteristics:
          "Clear skies, cold nights, concentrated wildlife. Best for fishing, birdwatching and safaris. High season.",
      },
      {
        period: "October to December (Transition)",
        temperature: "22°C to 36°C",
        rainfall: "Moderate (80-150 mm/month)",
        characteristics:
          "Rains begin, landscape turns green. Migratory birds arrive. Good for landscape photography.",
      },
      {
        period: "January to March (Wet Season)",
        temperature: "24°C to 35°C",
        rainfall: "High (150-250 mm/month)",
        characteristics:
          "Flooded plains, boat trips through inundated areas. Jaguar more visible in some regions.",
      },
      {
        period: "April (Dry Transition)",
        temperature: "20°C to 33°C",
        rainfall: "Moderate (60-100 mm/month)",
        characteristics:
          "Waters begin to recede. Excellent for photography. Fishing season opens in March.",
      },
    ],
  },
  nearby: {
    label: "SURROUNDINGS",
    heading: "What to visit near the Pantanal",
    description:
      "The Santo Antônio do Leverger region is privileged by its proximity to Cuiabá and Chapada dos Guimarães — two destinations that complement the Pantanal immersion perfectly. Cuiabá, just 61 km away, is the Mato Grosso state capital and the arrival hub. Chapada dos Guimarães, ~120 km away, is one of the most beautiful ecotourism destinations in Brazil, with canyons, waterfalls, and archaeological sites. The Transpantaneira, famous for jaguar and caiman sightings, is just a few hours' drive from the lodge.",
    places: [
      {
        name: "Chapada dos Guimarães",
        distance: "~120 km (~1h30 by car)",
        description:
          "One of the most spectacular ecotourism destinations in Brazil. Canyons, waterfalls, panoramic viewpoints, trails and archaeological sites. Pairs perfectly with the Pantanal on 7-10 day itineraries.",
      },
      {
        name: "Cuiabá",
        distance: "61 km (~1h by car)",
        description:
          "Capital of Mato Grosso and arrival point via CGB International Airport. Regional gastronomy, Museu do Rio, Praça da República and a great range of services for a stop before or after the lodge.",
      },
      {
        name: "Transpantaneira",
        distance: "~120 km (via Poconé)",
        description:
          "The most iconic road in the Northern Pantanal. 145 km of wooden bridges over rivers, with guaranteed sightings of caimans, capybaras, jabirus and jaguars. One of South America's most famous safari routes.",
      },
      {
        name: "Rio Cuiabá",
        distance: "Direct access",
        description:
          "River that flows through the Itaicy property. Sport fishing for pintado, pacu and dourado. Boat trips at sunrise and sunset. Habitat for caimans, capybaras and water birds.",
      },
    ],
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about the Pantanal Region",
    description:
      "We answer the most common questions from those planning to visit the Northern Pantanal.",
    items: [
      {
        id: "regiao-1",
        number: "01",
        question: "What is the difference between the Northern and Southern Pantanal?",
        answer:
          "The Pantanal covers approximately 150,000 km² divided between two Brazilian states, each offering distinct experiences. The Northern Pantanal (Mato Grosso), where Itaicy is located in Santo Antônio do Leverger, is a reference for sport fishing and birdwatching, with 166 species catalogued on the lodge property. It is accessed via Cuiabá airport (CGB, 1h away). The Transpantaneira, also in Mato Grosso, is the iconic jaguar-watching route. The Southern Pantanal (Mato Grosso do Sul, Miranda/Campo Grande) is better known by tourists who combine the biome with Bonito. Each region has distinct wildlife and experiences — and the Northern Pantanal stands out for its easy Cuiabá access.",
      },
      {
        id: "regiao-2",
        number: "02",
        question: "Do I need vaccines to visit the Pantanal?",
        answer:
          "Before traveling to the Pantanal, it is important to check your vaccines and take some basic health precautions, as the region is classified as a yellow fever endemic area by Brazil's Ministry of Health. The yellow fever vaccine is highly recommended, although it is not legally mandatory for domestic travelers. It is advisable to take it at least 10 days before the trip for immunization to be active. A single dose provides lifelong protection according to the World Health Organization. It is also important to be up to date on your vaccination schedule, including tetanus and hepatitis A. Using DEET or icaridin repellent and wearing long-sleeved clothing at dusk helps protect against mosquitoes, which are most active between October and March. Itaicy provides repellent in common areas and health guidance throughout the stay.",
      },
      {
        id: "regiao-3",
        number: "03",
        question: "What should I pack for a trip to the Pantanal?",
        answer:
          "Planning your bag for the Pantanal requires attention to the tropical climate and the outdoor activities you will do during your stay. Bring light clothing in neutral colors (khaki, green, gray) that help with camouflage during wildlife observation, comfortable closed-toe shoes for trails on uneven terrain, flip-flops for the lodge, a wide-brimmed cap or hat, SPF 50+ sunscreen and DEET insect repellent. Binoculars are essential for birdwatching, and a camera with at least 200mm zoom will make a real difference when photographing wildlife. During the Pantanal winter (June to August), nighttime temperatures can drop to 10-15°C, so pack a fleece or light jacket. Itaicy provides all fishing equipment, life jackets, flashlights for night tours and specialized guides — you do not need to bring sports gear.",
      },
      {
        id: "regiao-4",
        number: "04",
        question: "Is there internet and cell phone signal in the Pantanal?",
        answer:
          "Connectivity in the Pantanal is limited compared to urban centers, but Itaicy maintains sufficient infrastructure for you to communicate when needed. The lodge offers satellite Wi-Fi in common areas, including the reception, restaurant and balconies overlooking the river. The connection is adequate for text messages, emails, basic browsing and sharing photos on social media, but is not ideal for video streaming or long video calls. 4G mobile signal works intermittently in the Santo Antônio do Leverger area — the Vivo and Claro carriers offer the best coverage in the region. We recommend embracing the digital disconnection as part of the immersive Pantanal experience: many guests report that the break from screens is one of the highlights of the trip. Even so, you will not be completely isolated at any time.",
      },
      {
        id: "regiao-5",
        number: "05",
        question: "Is the Pantanal safe for families with children?",
        answer:
          "The Pantanal is a region of preserved nature with well-established tourism infrastructure, making it a safe and highly recommended destination for families with children of all ages. Itaicy regularly receives families and tailors itineraries to the group's profile and age range, offering gentle boat trips, short trails of up to 2 km and wildlife observation sessions that delight younger guests. The lodge has a Family Suite that comfortably accommodates up to 4 people. Native guides with over 15 years of experience accompany all activities and have deep knowledge of the region's wildlife and pathways, ensuring safety on every outing. Direct encounters with caimans, capybaras, toucans and parrots in their natural habitat provide an educational and transformative experience that children remember for a lifetime.",
      },
    ],
  },
};

const es: RegiaoPageContent = {
  hero: {
    label: "LA REGIÓN",
    heading: "Pantanal Norte Matogrossense",
    subtitle:
      "La mayor planicie inundable del mundo, Patrimonio Natural de la Humanidad por la UNESCO. Más de 4.700 especies de plantas y animales en 150.000 km² de exuberante biodiversidad.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/regiao-hero-bg.webp",
  },
  location: {
    label: "UBICACIÓN",
    heading: "Dónde está el Pantanal y cómo llegar a Itaicy",
    description:
      "Itaicy Pantanal Eco Lodge está ubicado en Santo Antônio do Leverger, Mato Grosso (MT), dentro del Pantanal Norte Matogrossense. El lodge está a orillas del Río Cuiabá, a 61 km del Aeropuerto Internacional de Cuiabá (CGB) — aproximadamente 1 hora en auto. El aeropuerto recibe vuelos directos desde São Paulo, Río de Janeiro, Brasilia y otras capitales. El camino de acceso está asfaltado hasta la entrada de la propiedad. Los transfers del aeropuerto al lodge pueden ser organizados por el equipo de Itaicy.",
    coordinates: "15°52'S, 56°05'W",
  },
  access: {
    label: "CÓMO LLEGAR",
    heading: "Rutas de acceso al Pantanal",
    description:
      "El Pantanal Norte Matogrossense es accesible por vía aérea y terrestre desde las principales capitales brasileñas. El punto de referencia es Cuiabá (CGB), capital de Mato Grosso, con aeropuerto internacional y vuelos diarios. Desde Cuiabá, el trayecto hasta Itaicy dura aproximadamente 1 hora (61 km) por carretera asfaltada. Para quienes viajan en auto desde São Paulo o Río de Janeiro, el viaje supera los 1.700 km — recomendamos volar a Cuiabá. La Transpantaneira, saliendo de Poconé, es una de las carreteras más escénicas de Brasil, con avistamiento de fauna silvestre ya en el camino.",
    routes: [
      {
        from: "São Paulo (GRU/CGH)",
        distance: "~1.750 km",
        duration: "Vuelo 2h + transfer 1h",
        description:
          "Vuelos directos a Cuiabá (CGB) de aproximadamente 2 horas. Desde allí, transfer vial de 1 hora (61 km) hasta el lodge. Vuelos diarios por Gol, LATAM y Azul.",
      },
      {
        from: "Río de Janeiro (GIG/SDU)",
        distance: "~2.000 km",
        duration: "Vuelo 2h30 + transfer 1h",
        description:
          "Vuelos a Cuiabá con conexión o directos (según la temporada). Transfer vial desde Cuiabá hasta el lodge en aproximadamente 1 hora.",
      },
      {
        from: "Brasilia (BSB)",
        distance: "~1.130 km",
        duration: "Vuelo 1h30 + transfer 1h",
        description:
          "Vuelos directos a Cuiabá de aproximadamente 1h30. Transfer vial de 1 hora hasta el lodge. Opción terrestre (~1.130 km, 12 horas), no recomendada.",
      },
      {
        from: "Curitiba (CWB)",
        distance: "~2.200 km",
        duration: "Vuelo ~3h + transfer 1h",
        description:
          "Vuelos a Cuiabá con conexión via São Paulo (total ~3h). Transfer vial de 1 hora hasta el lodge. Opción terrestre (~2.200 km), no recomendada.",
      },
    ],
  },
  climate: {
    label: "CLIMA Y MEJOR ÉPOCA",
    heading: "Cuándo visitar el Pantanal",
    description:
      "El Pantanal tiene dos estaciones bien definidas que transforman por completo el paisaje y las experiencias disponibles. La estación seca (mayo a septiembre) es la más buscada por los turistas: los ríos retroceden, los animales se concentran cerca del agua y la visibilidad para la observación de fauna es máxima. Es el período ideal para la pesca deportiva (temporada abierta de marzo a octubre), el aviturismo y los safaris fotográficos. La estación lluviosa (octubre a abril) trae las lluvias que inundan hasta el 80% de la planicie, creando un paisaje acuático dramático. En este período, los paseos en barco revelan escenarios únicos y la vegetación estalla en verde. Cada estación ofrece experiencias distintas y complementarias — no hay mala época para visitar el Pantanal, solo experiencias diferentes.",
    seasons: [
      {
        period: "Mayo a Septiembre (Seca)",
        temperature: "15°C a 32°C",
        rainfall: "Baja (20-60 mm/mes)",
        characteristics:
          "Cielo despejado, noches frías, fauna concentrada. Ideal para pesca, aviturismo y safaris. Temporada alta.",
      },
      {
        period: "Octubre a Diciembre (Transición)",
        temperature: "22°C a 36°C",
        rainfall: "Moderada (80-150 mm/mes)",
        characteristics:
          "Las lluvias comienzan, el paisaje reverdece. Llegan aves migratorias. Bueno para fotografía de paisajes.",
      },
      {
        period: "Enero a Marzo (Lluvias)",
        temperature: "24°C a 35°C",
        rainfall: "Alta (150-250 mm/mes)",
        characteristics:
          "Planicie inundada, paseos en barco por áreas anegadas. El jaguar es más visible en algunas regiones.",
      },
      {
        period: "Abril (Transición Seca)",
        temperature: "20°C a 33°C",
        rainfall: "Moderada (60-100 mm/mes)",
        characteristics:
          "Las aguas comienzan a retroceder. Excelente para fotografía. La temporada de pesca abre en marzo.",
      },
    ],
  },
  nearby: {
    label: "ALREDEDORES",
    heading: "Qué visitar cerca del Pantanal",
    description:
      "La región de Santo Antônio do Leverger es privilegiada por su cercanía a Cuiabá y la Chapada dos Guimarães — dos destinos que se complementan perfectamente con la inmersión en el Pantanal. Cuiabá, a solo 61 km, es la capital de Mato Grosso y el punto de llegada. La Chapada dos Guimarães, a ~120 km, es uno de los destinos de ecoturismo más bellos de Brasil, con cañones, cascadas y sitios arqueológicos. La Transpantaneira, famosa por el avistamiento de jaguares y caimanes, está a pocas horas en auto del lodge.",
    places: [
      {
        name: "Chapada dos Guimarães",
        distance: "~120 km (~1h30 en auto)",
        description:
          "Uno de los destinos de ecoturismo más espectaculares de Brasil. Cañones, cascadas, miradores panorámicos, senderos y sitios arqueológicos. Se combina perfectamente con el Pantanal en itinerarios de 7 a 10 días.",
      },
      {
        name: "Cuiabá",
        distance: "61 km (~1h en auto)",
        description:
          "Capital de Mato Grosso y punto de llegada por el Aeropuerto Internacional CGB. Gastronomía regional, Museu do Rio, Praça da República y amplia oferta de servicios para una parada antes o después del lodge.",
      },
      {
        name: "Transpantaneira",
        distance: "~120 km (via Poconé)",
        description:
          "La carretera más icónica del Pantanal Norte. 145 km de puentes de madera sobre ríos, con avistamientos garantizados de caimanes, capibaras, tuiuyús y jaguares. Una de las rutas de safari más famosas de América del Sur.",
      },
      {
        name: "Río Cuiabá",
        distance: "Acceso directo",
        description:
          "Río que fluye por la propiedad de Itaicy. Pesca deportiva de pintado, pacu y dourado. Paseos en barco al amanecer y al atardecer. Hábitat de caimanes, capibaras y aves acuáticas.",
      },
    ],
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Dudas sobre la Región del Pantanal",
    description:
      "Respondemos las preguntas más comunes de quienes planifican visitar el Pantanal Norte Matogrossense.",
    items: [
      {
        id: "regiao-1",
        number: "01",
        question: "¿Cuál es la diferencia entre el Pantanal Norte y el Pantanal Sur?",
        answer:
          "El Pantanal ocupa cerca de 150.000 km² divididos entre dos estados brasileños, y cada mitad ofrece experiencias distintas. El Pantanal Norte (Mato Grosso), donde está Itaicy en Santo Antônio do Leverger, es referencia en pesca deportiva y aviturismo, con 166 especies catalogadas en la propiedad del lodge. Se accede por el aeropuerto de Cuiabá (CGB, 1h en auto). La Transpantaneira, también en Mato Grosso, es la ruta icónica para el avistamiento de jaguares. El Pantanal Sur (Mato Grosso do Sul, Miranda/Campo Grande) es más conocido por turistas que combinan el bioma con Bonito. Cada región tiene fauna y experiencias distintas — y el Pantanal Norte destaca por su fácil acceso vía Cuiabá.",
      },
      {
        id: "regiao-2",
        number: "02",
        question: "¿Necesito vacunas para visitar el Pantanal?",
        answer:
          "Antes de viajar al Pantanal, es importante verificar sus vacunas y tomar algunas precauciones básicas de salud, ya que la región es clasificada como área endémica de fiebre amarilla por el Ministerio de Salud de Brasil. La vacuna contra la fiebre amarilla es muy recomendada, aunque no es obligatoria por ley para viajeros nacionales. Se aconseja tomarla al menos 10 días antes del viaje para que la inmunización esté activa. Una sola dosis confiere protección de por vida según la Organización Mundial de la Salud. Además, es importante estar al día con el calendario de vacunación, incluyendo tétanos y hepatitis A. El uso de repelente con DEET o icaridina y ropa de manga larga al anochecer ayuda en la protección contra mosquitos, que son más activos entre octubre y marzo. Itaicy dispone de repelente en las áreas comunes y orientaciones sobre salud durante toda la estadía.",
      },
      {
        id: "regiao-3",
        number: "03",
        question: "¿Qué debo llevar en un viaje al Pantanal?",
        answer:
          "Planificar el equipaje para el Pantanal requiere atención al clima tropical y las actividades al aire libre que realizará durante la estadía. Lleve ropa ligera en colores neutros (caqui, verde, gris) que ayudan al camuflaje durante la observación de fauna, calzado cerrado cómodo para senderos en terreno irregular, ojotas para el lodge, gorra o sombrero de ala ancha, protector solar factor 50+ y repelente de insectos con DEET. Los binoculares son esenciales para la observación de aves, y una cámara fotográfica con zoom de al menos 200 mm marcará la diferencia en los registros de fauna. En el invierno pantanero (junio a agosto), las temperaturas nocturnas pueden bajar a 10-15°C, por lo que incluya una polar o chaqueta liviana. Itaicy provee todo el equipo de pesca, chalecos salvavidas, linternas para paseos nocturnos y guías especializados — usted no necesita traer equipo deportivo.",
      },
      {
        id: "regiao-4",
        number: "04",
        question: "¿Hay internet y señal de celular en el Pantanal?",
        answer:
          "La conectividad en el Pantanal es limitada en comparación con los centros urbanos, pero Itaicy mantiene la infraestructura suficiente para que usted pueda comunicarse cuando lo necesite. El lodge ofrece Wi-Fi vía satélite en las áreas comunes, incluyendo recepción, restaurante y balcones con vista al río. La conexión es adecuada para mensajes de texto, correos, navegación básica y compartir fotos en redes sociales, pero no es ideal para streaming de video o videollamadas largas. La señal de celular 4G funciona de forma intermitente en el área de Santo Antônio do Leverger — las operadoras Vivo y Claro ofrecen mejor cobertura en la región. Recomendamos aprovechar la desconexión digital como parte de la experiencia inmersiva en el Pantanal: muchos huéspedes señalan que la pausa en las pantallas es uno de los puntos altos del viaje. Aun así, usted no estará completamente aislado en ningún momento.",
      },
      {
        id: "regiao-5",
        number: "05",
        question: "¿El Pantanal es seguro para familias con niños?",
        answer:
          "El Pantanal es una región de naturaleza preservada con infraestructura turística consolidada, lo que lo convierte en un destino seguro y muy recomendado para familias con niños de todas las edades. Itaicy recibe familias con regularidad y adapta los itinerarios según el perfil y el rango etario del grupo, ofreciendo paseos en barco tranquilos, senderos cortos de hasta 2 km y sesiones de observación de animales que encantan a los más pequeños. El lodge cuenta con una Suite Family que acomoda cómodamente hasta 4 personas en un solo ambiente. Guías nativos con más de 15 años de experiencia acompañan todas las actividades y conocen profundamente la fauna y los caminos de la región, garantizando seguridad en cada salida. El contacto directo con caimanes, capibaras, tucanes y loros en su hábitat natural ofrece una experiencia educativa y transformadora que los niños recuerdan toda la vida.",
      },
    ],
  },
};

export const regiaoDefaults: LocalizedDefaults<"/regiao"> = { pt, en, es };
