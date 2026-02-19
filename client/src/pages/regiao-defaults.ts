import type { RegiaoPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: RegiaoPageContent = {
  hero: {
    label: "A REGIÃO",
    heading: "Pantanal Sul-Matogrossense",
    subtitle:
      "A maior planície alagável do mundo, Patrimônio Natural da Humanidade pela UNESCO. Mais de 4.700 espécies de plantas e animais em 150.000 km² de biodiversidade exuberante.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/regiao-hero-bg.webp",
  },
  location: {
    label: "LOCALIZAÇÃO",
    heading: "Onde fica o Pantanal e como chegar à Itaicy",
    description:
      "O Itaicy Pantanal Eco Lodge está localizado em Miranda, no Mato Grosso do Sul, dentro do Pantanal Sul-Matogrossense. A região é considerada a porta de entrada do Pantanal pela Estrada Parque, um dos roteiros mais cênicos do Brasil. Miranda fica a 240 km de Campo Grande (capital do estado, com aeroporto internacional), a 80 km de Bonito (um dos principais destinos de ecoturismo do país) e a aproximadamente 200 km da fronteira com a Bolívia. O acesso é feito por rodovia asfaltada até Miranda, seguido por estrada de terra mantida até a pousada. O aeroporto mais próximo é o Aeroporto Internacional de Campo Grande (CGR), que recebe voos diretos de São Paulo, Rio de Janeiro, Brasília e Curitiba. Transfers do aeroporto até o lodge podem ser organizados pela equipe da Itaicy.",
    coordinates: "19°50'S, 56°41'W",
  },
  access: {
    label: "COMO CHEGAR",
    heading: "Rotas de acesso ao Pantanal",
    description:
      "O Pantanal Sul-Matogrossense é acessível por via aérea e terrestre a partir das principais capitais brasileiras. O ponto de referência é Campo Grande (CGR), capital do Mato Grosso do Sul, que possui aeroporto internacional com voos diários. De Campo Grande, o trajeto até Miranda leva cerca de 3 horas pela BR-262, uma rodovia asfaltada e bem sinalizada que cruza a Serra de Maracaju antes de descer ao Pantanal. Outra opção é voar até Bonito (aeroporto regional) e seguir 80 km até Miranda. Para quem vem de carro, a Estrada Parque (MS-262) é uma das rotas mais cenográficas do Brasil, com avistamento de fauna silvestre já no trajeto.",
    routes: [
      {
        from: "São Paulo (GRU/CGH)",
        distance: "1.450 km",
        duration: "Voo 2h + transfer 3h",
        description:
          "Voos diretos para Campo Grande (CGR) com duração de aproximadamente 2 horas. De lá, transfer terrestre de 3 horas pela BR-262 até Miranda. Voos diários por Gol, LATAM e Azul.",
      },
      {
        from: "Rio de Janeiro (GIG/SDU)",
        distance: "1.600 km",
        duration: "Voo 2h30 + transfer 3h",
        description:
          "Voos para Campo Grande com conexão ou diretos (dependendo da temporada). Transfer terrestre de Campo Grande até a pousada em aproximadamente 3 horas.",
      },
      {
        from: "Brasília (BSB)",
        distance: "1.130 km",
        duration: "Voo 1h40 + transfer 3h",
        description:
          "Voos diretos para Campo Grande com duração de 1h40. Opção terrestre pela BR-060 até Campo Grande (14 horas de carro), não recomendada.",
      },
      {
        from: "Curitiba (CWB)",
        distance: "1.200 km",
        duration: "Voo 1h50 + transfer 3h",
        description:
          "Voos diretos para Campo Grande. Opção terrestre pela BR-267 passando por Maringá e Dourados (aproximadamente 14 horas).",
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
      "A região de Miranda é privilegiada pela proximidade com alguns dos principais destinos turísticos do Mato Grosso do Sul. Bonito, a apenas 80 km, é reconhecido internacionalmente por seus rios de águas cristalinas, flutuação e mergulho em grutas. Campo Grande, a 240 km, é a capital do estado e oferece gastronomia regional, o Mercado Municipal e o Bioparque Pantanal (o maior aquário de água doce do mundo). A combinação Pantanal + Bonito é um dos roteiros mais procurados por turistas nacionais e internacionais, permitindo experiências complementares de ecoturismo em uma única viagem.",
    places: [
      {
        name: "Bonito",
        distance: "80 km (1h30 de carro)",
        description:
          "Capital do ecoturismo brasileiro. Rios de águas cristalinas para flutuação, Gruta do Lago Azul, mergulho em cavernas e trilhas. Combina perfeitamente com o Pantanal em roteiros de 7 a 10 dias.",
      },
      {
        name: "Campo Grande",
        distance: "240 km (3h de carro)",
        description:
          "Capital do Mato Grosso do Sul com aeroporto internacional. Bioparque Pantanal (maior aquário de água doce do mundo), Mercado Municipal, gastronomia regional com sobá e tererê.",
      },
      {
        name: "Estrada Parque (MS-262)",
        distance: "Acesso direto",
        description:
          "Uma das estradas mais cênicas do Brasil, com 120 km de terra batida cortando o Pantanal. Pontes de madeira sobre rios, fauna silvestre avistada do carro e paisagens de tirar o fôlego.",
      },
      {
        name: "Rio Negro",
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
      "Respondemos as perguntas mais comuns de quem planeja visitar o Pantanal Sul-Matogrossense.",
    items: [
      {
        id: "regiao-1",
        number: "01",
        question: "Qual a diferença entre Pantanal Norte e Pantanal Sul?",
        answer:
          "O Pantanal ocupa cerca de 150.000 km² divididos entre dois estados brasileiros, e cada metade oferece experiências distintas para o visitante. O Pantanal Norte (Mato Grosso), com base em Poconé e ao longo da Transpantaneira, é mais conhecido pelo turismo de onça-pintada e tem infraestrutura focada em safáris fotográficos, com lodges concentrados ao longo dos 145 km da estrada-parque. O Pantanal Sul (Mato Grosso do Sul), onde fica a Itaicy em Miranda, é mais procurado por pescadores esportivos e observadores de aves, com 166 espécies catalogadas apenas na área da pousada. O Sul também se destaca pela maior acessibilidade: o Aeroporto Internacional de Campo Grande (CGR) fica a apenas 240 km, cerca de 3 horas de carro pela BR-262 asfaltada. Além disso, a proximidade de 80 km com Bonito permite combinar Pantanal e rios cristalinos em um único roteiro de 7 a 10 dias.",
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
          "A conectividade no Pantanal é limitada em comparação com centros urbanos, mas a Itaicy mantém infraestrutura suficiente para que você se comunique quando necessário. O lodge oferece Wi-Fi via satélite nas áreas comuns, incluindo recepção, restaurante e varandas com vista para o rio. A conexão é adequada para mensagens de texto, e-mails, navegação básica e envio de fotos em redes sociais, mas não é ideal para streaming de vídeo ou videochamadas longas. O sinal de celular 4G funciona de forma intermitente na região de Miranda, que fica a cerca de 30 minutos do lodge — as operadoras Vivo e Claro oferecem melhor cobertura na área. Recomendamos aproveitar a desconexão digital como parte da experiência imersiva no Pantanal: muitos hóspedes relatam que a pausa nas telas é um dos pontos altos da viagem. Mesmo assim, você não ficará completamente isolado em nenhum momento.",
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
    heading: "Southern Pantanal",
    subtitle:
      "The largest floodplain in the world, a UNESCO Natural Heritage Site. Over 4,700 species of plants and animals across 150,000 km² of exuberant biodiversity.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/regiao-hero-bg.webp",
  },
  location: {
    label: "LOCATION",
    heading: "Where the Pantanal is and how to get to Itaicy",
    description:
      "Itaicy Pantanal Eco Lodge is located in Miranda, in Mato Grosso do Sul, within the Southern Pantanal. The region is considered the gateway to the Pantanal via the Estrada Parque, one of the most scenic routes in Brazil. Miranda is 240 km from Campo Grande (the state capital, with an international airport), 80 km from Bonito (one of the country's leading ecotourism destinations) and approximately 200 km from the Bolivian border. Access is via a paved road to Miranda, followed by a maintained dirt road to the lodge. The nearest airport is Campo Grande International Airport (CGR), which receives direct flights from São Paulo, Rio de Janeiro, Brasília and Curitiba. Transfers from the airport to the lodge can be arranged by the Itaicy team.",
    coordinates: "19°50'S, 56°41'W",
  },
  access: {
    label: "HOW TO GET THERE",
    heading: "Access routes to the Pantanal",
    description:
      "The Southern Pantanal is accessible by air and road from the main Brazilian state capitals. The reference point is Campo Grande (CGR), the capital of Mato Grosso do Sul, which has an international airport with daily flights. From Campo Grande, the drive to Miranda takes about 3 hours along the BR-262, a well-signposted paved highway that crosses the Serra de Maracaju before descending into the Pantanal. Another option is to fly to Bonito (regional airport) and drive 80 km to Miranda. For those traveling by car, the Estrada Parque (MS-262) is one of the most scenic routes in Brazil, with wildlife sightings along the way.",
    routes: [
      {
        from: "São Paulo (GRU/CGH)",
        distance: "1,450 km",
        duration: "2h flight + 3h transfer",
        description:
          "Direct flights to Campo Grande (CGR) of approximately 2 hours. From there, a 3-hour road transfer via the BR-262 to Miranda. Daily flights by Gol, LATAM and Azul.",
      },
      {
        from: "Rio de Janeiro (GIG/SDU)",
        distance: "1,600 km",
        duration: "2h30 flight + 3h transfer",
        description:
          "Flights to Campo Grande with connection or direct (depending on the season). Road transfer from Campo Grande to the lodge in approximately 3 hours.",
      },
      {
        from: "Brasília (BSB)",
        distance: "1,130 km",
        duration: "1h40 flight + 3h transfer",
        description:
          "Direct flights to Campo Grande of 1h40. Land option via BR-060 to Campo Grande (14 hours by car), not recommended.",
      },
      {
        from: "Curitiba (CWB)",
        distance: "1,200 km",
        duration: "1h50 flight + 3h transfer",
        description:
          "Direct flights to Campo Grande. Land option via BR-267 through Maringá and Dourados (approximately 14 hours).",
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
      "The Miranda region is privileged by its proximity to some of the main tourist destinations in Mato Grosso do Sul. Bonito, just 80 km away, is internationally recognized for its crystal-clear rivers, snorkeling and cave diving. Campo Grande, 240 km away, is the state capital and offers regional gastronomy, the Municipal Market and the Bioparque Pantanal (the world's largest freshwater aquarium). The Pantanal + Bonito combination is one of the most popular itineraries among national and international tourists, offering complementary ecotourism experiences in a single trip.",
    places: [
      {
        name: "Bonito",
        distance: "80 km (1h30 by car)",
        description:
          "Capital of Brazilian ecotourism. Crystal-clear rivers for snorkeling, Gruta do Lago Azul, cave diving and trails. Pairs perfectly with the Pantanal on 7-10 day itineraries.",
      },
      {
        name: "Campo Grande",
        distance: "240 km (3h by car)",
        description:
          "Capital of Mato Grosso do Sul with international airport. Bioparque Pantanal (world's largest freshwater aquarium), Municipal Market, regional cuisine with sobá and tereré.",
      },
      {
        name: "Estrada Parque (MS-262)",
        distance: "Direct access",
        description:
          "One of the most scenic roads in Brazil, with 120 km of dirt road cutting through the Pantanal. Wooden bridges over rivers, wildlife spotted from the car and breathtaking scenery.",
      },
      {
        name: "Rio Negro",
        distance: "Direct access",
        description:
          "River that borders the Itaicy property. Sport fishing for pintado, pacu and dourado. Boat trips at sunrise and sunset. Habitat for caimans, capybaras and water birds.",
      },
    ],
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about the Pantanal Region",
    description:
      "We answer the most common questions from those planning to visit the Southern Pantanal.",
    items: [
      {
        id: "regiao-1",
        number: "01",
        question: "What is the difference between the Northern and Southern Pantanal?",
        answer:
          "The Pantanal covers approximately 150,000 km² divided between two Brazilian states, and each half offers distinct experiences. The Northern Pantanal (Mato Grosso), based around Poconé and along the Transpantaneira, is best known for jaguar tourism and has infrastructure focused on photographic safaris, with lodges concentrated along the 145 km of the park road. The Southern Pantanal (Mato Grosso do Sul), where Itaicy is located in Miranda, is more sought after by sport fishermen and birdwatchers, with 166 species catalogued in the lodge area alone. The South also stands out for its greater accessibility: Campo Grande International Airport (CGR) is only 240 km away, about 3 hours by car along the paved BR-262. Additionally, the 80 km proximity to Bonito allows you to combine the Pantanal and crystal-clear rivers in a single 7-10 day itinerary.",
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
          "Connectivity in the Pantanal is limited compared to urban centers, but Itaicy maintains sufficient infrastructure for you to communicate when needed. The lodge offers satellite Wi-Fi in common areas, including the reception, restaurant and balconies overlooking the river. The connection is adequate for text messages, emails, basic browsing and sharing photos on social media, but is not ideal for video streaming or long video calls. 4G mobile signal works intermittently in the Miranda area, which is about 30 minutes from the lodge — the Vivo and Claro carriers offer the best coverage in the area. We recommend embracing the digital disconnection as part of the immersive Pantanal experience: many guests report that the break from screens is one of the highlights of the trip. Even so, you will not be completely isolated at any time.",
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
    heading: "Pantanal Sur-Matogrossense",
    subtitle:
      "La mayor planicie inundable del mundo, Patrimonio Natural de la Humanidad por la UNESCO. Más de 4.700 especies de plantas y animales en 150.000 km² de exuberante biodiversidad.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/regiao-hero-bg.webp",
  },
  location: {
    label: "UBICACIÓN",
    heading: "Dónde está el Pantanal y cómo llegar a Itaicy",
    description:
      "Itaicy Pantanal Eco Lodge está ubicado en Miranda, en el Mato Grosso do Sul, dentro del Pantanal Sur-Matogrossense. La región es considerada la puerta de entrada al Pantanal por la Estrada Parque, uno de los recorridos más pintorescos de Brasil. Miranda está a 240 km de Campo Grande (capital del estado, con aeropuerto internacional), a 80 km de Bonito (uno de los principales destinos de ecoturismo del país) y a aproximadamente 200 km de la frontera con Bolivia. El acceso se realiza por carretera asfaltada hasta Miranda, seguido de un camino de tierra mantenido hasta el lodge. El aeropuerto más cercano es el Aeropuerto Internacional de Campo Grande (CGR), que recibe vuelos directos desde São Paulo, Río de Janeiro, Brasilia y Curitiba. Los transfers del aeropuerto al lodge pueden ser organizados por el equipo de Itaicy.",
    coordinates: "19°50'S, 56°41'W",
  },
  access: {
    label: "CÓMO LLEGAR",
    heading: "Rutas de acceso al Pantanal",
    description:
      "El Pantanal Sur-Matogrossense es accesible por vía aérea y terrestre desde las principales capitales brasileñas. El punto de referencia es Campo Grande (CGR), capital del Mato Grosso do Sul, con aeropuerto internacional y vuelos diarios. Desde Campo Grande, el trayecto hasta Miranda dura unas 3 horas por la BR-262, una carretera asfaltada y bien señalizada que cruza la Serra de Maracaju antes de bajar al Pantanal. Otra opción es volar a Bonito (aeropuerto regional) y recorrer 80 km hasta Miranda. Para quienes viajan en auto, la Estrada Parque (MS-262) es una de las rutas más escénicas de Brasil, con avistamiento de fauna silvestre ya en el camino.",
    routes: [
      {
        from: "São Paulo (GRU/CGH)",
        distance: "1.450 km",
        duration: "Vuelo 2h + transfer 3h",
        description:
          "Vuelos directos a Campo Grande (CGR) de aproximadamente 2 horas. Desde allí, transfer vial de 3 horas por la BR-262 hasta Miranda. Vuelos diarios por Gol, LATAM y Azul.",
      },
      {
        from: "Río de Janeiro (GIG/SDU)",
        distance: "1.600 km",
        duration: "Vuelo 2h30 + transfer 3h",
        description:
          "Vuelos a Campo Grande con conexión o directos (según la temporada). Transfer vial desde Campo Grande hasta el lodge en aproximadamente 3 horas.",
      },
      {
        from: "Brasilia (BSB)",
        distance: "1.130 km",
        duration: "Vuelo 1h40 + transfer 3h",
        description:
          "Vuelos directos a Campo Grande de 1h40. Opción terrestre por la BR-060 hasta Campo Grande (14 horas en auto), no recomendada.",
      },
      {
        from: "Curitiba (CWB)",
        distance: "1.200 km",
        duration: "Vuelo 1h50 + transfer 3h",
        description:
          "Vuelos directos a Campo Grande. Opción terrestre por la BR-267 pasando por Maringá y Dourados (aproximadamente 14 horas).",
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
      "La región de Miranda es privilegiada por su cercanía a algunos de los principales destinos turísticos del Mato Grosso do Sul. Bonito, a apenas 80 km, es reconocido internacionalmente por sus ríos de aguas cristalinas, flotación y buceo en cuevas. Campo Grande, a 240 km, es la capital del estado y ofrece gastronomía regional, el Mercado Municipal y el Bioparque Pantanal (el mayor acuario de agua dulce del mundo). La combinación Pantanal + Bonito es uno de los itinerarios más buscados por turistas nacionales e internacionales, permitiendo experiencias complementarias de ecoturismo en un solo viaje.",
    places: [
      {
        name: "Bonito",
        distance: "80 km (1h30 en auto)",
        description:
          "Capital del ecoturismo brasileño. Ríos de aguas cristalinas para flotación, Gruta do Lago Azul, buceo en cuevas y senderos. Se combina perfectamente con el Pantanal en itinerarios de 7 a 10 días.",
      },
      {
        name: "Campo Grande",
        distance: "240 km (3h en auto)",
        description:
          "Capital del Mato Grosso do Sul con aeropuerto internacional. Bioparque Pantanal (mayor acuario de agua dulce del mundo), Mercado Municipal, gastronomía regional con sobá y tereré.",
      },
      {
        name: "Estrada Parque (MS-262)",
        distance: "Acceso directo",
        description:
          "Una de las carreteras más escénicas de Brasil, con 120 km de camino de tierra atravesando el Pantanal. Puentes de madera sobre ríos, fauna silvestre avistada desde el auto y paisajes que quitan el aliento.",
      },
      {
        name: "Rio Negro",
        distance: "Acceso directo",
        description:
          "Río que bordea la propiedad de Itaicy. Pesca deportiva de pintado, pacu y dourado. Paseos en barco al amanecer y al atardecer. Hábitat de caimanes, capibaras y aves acuáticas.",
      },
    ],
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Dudas sobre la Región del Pantanal",
    description:
      "Respondemos las preguntas más comunes de quienes planifican visitar el Pantanal Sur-Matogrossense.",
    items: [
      {
        id: "regiao-1",
        number: "01",
        question: "¿Cuál es la diferencia entre el Pantanal Norte y el Pantanal Sur?",
        answer:
          "El Pantanal ocupa cerca de 150.000 km² divididos entre dos estados brasileños, y cada mitad ofrece experiencias distintas. El Pantanal Norte (Mato Grosso), con base en Poconé y a lo largo de la Transpantaneira, es más conocido por el turismo de jaguar y tiene infraestructura enfocada en safaris fotográficos, con lodges concentrados a lo largo de los 145 km de la carretera-parque. El Pantanal Sur (Mato Grosso do Sul), donde está Itaicy en Miranda, es más buscado por pescadores deportivos y observadores de aves, con 166 especies catalogadas solo en el área del lodge. El Sur también destaca por su mayor accesibilidad: el Aeropuerto Internacional de Campo Grande (CGR) está a solo 240 km, unas 3 horas en auto por la BR-262 asfaltada. Además, la cercanía de 80 km con Bonito permite combinar el Pantanal y los ríos cristalinos en un único itinerario de 7 a 10 días.",
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
          "La conectividad en el Pantanal es limitada en comparación con los centros urbanos, pero Itaicy mantiene la infraestructura suficiente para que usted pueda comunicarse cuando lo necesite. El lodge ofrece Wi-Fi vía satélite en las áreas comunes, incluyendo recepción, restaurante y balcones con vista al río. La conexión es adecuada para mensajes de texto, correos, navegación básica y compartir fotos en redes sociales, pero no es ideal para streaming de video o videollamadas largas. La señal de celular 4G funciona de forma intermitente en la región de Miranda, que está a unos 30 minutos del lodge — las operadoras Vivo y Claro ofrecen mejor cobertura en la zona. Recomendamos aprovechar la desconexión digital como parte de la experiencia inmersiva en el Pantanal: muchos huéspedes señalan que la pausa en las pantallas es uno de los puntos altos del viaje. Aun así, usted no estará completamente aislado en ningún momento.",
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
