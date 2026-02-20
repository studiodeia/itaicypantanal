import type { AcomodacoesPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: AcomodacoesPageContent = {
  hero: {
    label: "ACOMODAÇÕES",
    heading: "Refúgios de Conforto Essencial",
    subtitle: "O seu ponto de partida para a imersão no Pantanal.",
    scrollHint: "Deslize para baixo",
    videoMp4: "/Vídeo_Pronto_e_Suave.mp4",
    videoWebm: "/video-pronto-suave.webm",
    videoMp4Low: "/video-pronto-suave-low.mp4",
    videoWebmLow: "/video-pronto-suave-low.webm",
    videoPoster: "/images/acomodacoes/suite-explorer.webp",
  },
  manifesto: {
    segments: [
      { text: "Nossos apartamentos são projetados para o ", isHighlight: false },
      { text: "conforto essencial", isHighlight: true },
      { text: ", garantindo que você tenha o ", isHighlight: false },
      { text: "refúgio perfeito", isHighlight: true },
      { text: " após um dia de expedição.", isHighlight: false },
    ],
  },
  highlights: {
    heading: "O Essencial da Sua Estadia",
    items: [
      { iconName: "UtensilsCrossed", title: "Gastronomia Full-Board", description: "Café da manhã, almoço com ingredientes regionais, lanche da tarde e jantar autoral — tudo incluso" },
      { iconName: "GlassWater", title: "Bebidas Inclusas", description: "Água, sucos naturais, café especial e refrigerantes disponíveis durante toda a estadia" },
      { iconName: "Compass", title: "Expedições Guiadas Inclusas", description: "Passeio de barco e cavalgada guiada inclusos — explore a fauna e flora com especialistas" },
      { iconName: "Fence", title: "Varanda Privativa", description: "Todas as suítes possuem varanda privativa para contemplação e descanso" },
      { iconName: "Snowflake", title: "Climatização Individual", description: "Ar-condicionado split em todas as suítes para conforto em qualquer estação" },
      { iconName: "Wifi", title: "Conectividade Essencial", description: "Wi-Fi via satélite nas áreas sociais — desconecte-se do mundo, conecte-se ao Pantanal" },
    ],
  },
  rooms: [
    {
      title: "Suíte Explorer",
      description: "O refúgio ideal para o viajante solo que busca imersão total. Privacidade, silêncio e conexão com a natureza no seu próprio ritmo.",
      image: "/images/acomodacoes/suite-explorer.webp",
      ctaText: "Verificar disponibilidade",
      features: [
        { iconName: "BedSingle", label: "Cama Individual Premium" },
        { iconName: "Bath", label: "Banheiro Privativo" },
        { iconName: "Fence", label: "Varanda Intimista" },
        { iconName: "User", label: "1 Pessoa" },
      ],
    },
    {
      title: "Suíte Adventure",
      description: "Projetada para casais que buscam uma experiência a dois no coração do Pantanal. Conforto, natureza e momentos inesquecíveis.",
      image: "/images/acomodacoes/suite-adventure.webp",
      ctaText: "Verificar disponibilidade",
      features: [
        { iconName: "BedDouble", label: "Cama de Casal Premium" },
        { iconName: "Bath", label: "Banheiro Privativo" },
        { iconName: "Fence", label: "Varanda Privativa" },
        { iconName: "Users", label: "2 Pessoas" },
      ],
    },
    {
      title: "Suíte Family",
      description: "A mais espaçosa das nossas suítes. Perfeita para famílias ou pequenos grupos, com cama de casal, solteiro e ampla área de convivência.",
      image: "/images/acomodacoes/suite-family.webp",
      ctaText: "Verificar disponibilidade",
      features: [
        { iconName: "BedDouble", label: "Cama Casal + Solteiro" },
        { iconName: "Bath", label: "Banheiro Privativo" },
        { iconName: "Fence", label: "Varanda Ampla" },
        { iconName: "Users", label: "3 Pessoas" },
      ],
    },
  ],
  culinary: {
    label: "CULINÁRIA",
    heading: "O Sabor Autêntico do Pantanal",
    description: "Nossa gastronomia é focada no essencial: ingredientes regionais frescos e um preparo cuidadoso, resultando em uma comida autêntica e reconfortante após um dia de expedição.",
    images: [
      { src: "/images/acomodacoes/culinaria-1.webp", alt: "Prato regional do Pantanal", tag: "Café da manhã" },
      { src: "/images/acomodacoes/culinaria-2.webp", alt: "Almoço preparado com ingredientes regionais", tag: "Almoço" },
      { src: "/images/acomodacoes/culinaria-3.webp", alt: "Jantar sofisticado na pousada", tag: "Jantar" },
      { src: "/images/acomodacoes/culinaria-4.webp", alt: "Lanche e petiscos regionais", tag: "Lanche" },
    ],
    ctaText: "Conheça nossa gastronomia",
    ctaHref: "/culinaria",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Dúvidas sobre Acomodações e Hospedagem",
    description: "Tudo o que você precisa saber sobre a estrutura, quartos e comodidades da Itaicy.",
    items: [
      {
        id: "acomod-1",
        number: "01",
        question: "Quais tipos de suíte estão disponíveis?",
        answer: "A Itaicy foi planejada para atender diferentes perfis de hóspede, desde o viajante solo até famílias que buscam uma experiência imersiva no Pantanal. Oferecemos três categorias de suíte, cada uma com personalidade própria. A Suíte Explorer é individual, pensada para quem viaja sozinho e quer privacidade e silêncio para se reconectar com a natureza. A Suíte Adventure foi desenhada para casais, com cama queen e varanda privativa ideal para momentos a dois. Já a Suíte Family é a mais ampla, com cama de casal e solteiro, acomodando até três pessoas com espaço de convivência generoso. Todas as suítes compartilham o mesmo padrão de conforto: ar-condicionado split individual, banheiro privativo com amenities completos, roupas de cama premium e varanda privativa para contemplação e descanso.",
      },
      {
        id: "acomod-2",
        number: "02",
        question: "O que está incluso na diária?",
        answer: "A proposta da Itaicy é oferecer uma estadia completa, onde o hóspede não precise se preocupar com custos adicionais ao longo do dia. A diária inclui hospedagem em suíte privativa com climatização individual, pensão completa com quatro refeições diárias — café da manhã regional, almoço com ingredientes frescos do Pantanal, lanche da tarde e jantar autoral preparado pela nossa cozinha. Além da alimentação, estão inclusos água filtrada, sucos naturais e café especial servidos ao longo do dia. No aspecto de experiências, cada diária contempla passeio de barco pelo Rio Cuiabá e cavalgada guiada pelas trilhas da propriedade, ambos conduzidos por guias locais experientes. O hóspede também tem acesso livre ao Wi-Fi via satélite nas áreas sociais e a todos os espaços de convivência do lodge, incluindo deck, restaurante e áreas de descanso. Bebidas alcoólicas e atividades extras sob consulta.",
      },
      {
        id: "acomod-3",
        number: "03",
        question: "Qual a capacidade total da pousada?",
        answer: "A Itaicy foi concebida como um lodge de baixa densidade, priorizando a experiência individual de cada hóspede e o respeito ao ecossistema local. Contamos com 10 suítes distribuídas em três categorias — Explorer, Adventure e Family — que juntas acomodam até 20 pessoas simultaneamente. Esse número reduzido de hóspedes é uma escolha deliberada, não uma limitação. Com grupos pequenos, cada passeio de barco, cavalgada e safári fotográfico se torna mais íntimo e produtivo, aumentando as chances de avistamento da fauna. O atendimento personalizado é outro benefício direto: a equipe conhece cada hóspede pelo nome e pode adaptar roteiros conforme preferências individuais. Do ponto de vista ambiental, a capacidade controlada reduz a pressão sobre as trilhas, margens do rio e habitats sensíveis, mantendo o equilíbrio essencial entre turismo responsável e conservação que define a identidade da Itaicy.",
      },
      {
        id: "acomod-4",
        number: "04",
        question: "A pousada tem Wi-Fi e sinal de celular?",
        answer: "Por estar localizada em uma região remota do Pantanal sul-mato-grossense, a conectividade na Itaicy é diferente do ambiente urbano, e isso faz parte da experiência. Oferecemos Wi-Fi via satélite disponível nas áreas sociais do lodge — restaurante, deck panorâmico e recepção. A conexão é estável o suficiente para enviar mensagens de texto, checar e-mails e compartilhar fotos nas redes sociais. No entanto, atividades de alto consumo de banda como videochamadas longas ou streaming de vídeo podem apresentar instabilidade. Em relação ao sinal de celular, as operadoras Vivo e Claro funcionam em pontos abertos da propriedade, especialmente próximo ao rio e nas áreas elevadas. Muitos hóspedes relatam que a desconexão parcial se torna um dos pontos altos da estadia, permitindo uma presença real no ambiente e maior apreciação dos sons, cores e ritmos do Pantanal ao redor.",
      },
      {
        id: "acomod-5",
        number: "05",
        question: "Como chego até a pousada?",
        answer: "A Itaicy está localizada no município de Santo Antônio do Leverger, no Mato Grosso (MT), às margens do Rio Cuiabá, no Pantanal Norte Matogrossense. O aeroporto mais próximo é o Aeroporto Internacional Marechal Rondon de Cuiabá (CGB), a 61 km da pousada — aproximadamente 1 hora de carro. Recebe voos diretos de São Paulo, Rio de Janeiro, Brasília e outras capitais. A partir do aeroporto, oferecemos serviço de transfer rodoviário sob consulta prévia, com horários coordenados aos voos. A estrada de acesso é pavimentada até a entrada da propriedade, o que torna a chegada confortável em qualquer época do ano, inclusive durante o período de chuvas.",
      },
    ],
  },
};

const en: AcomodacoesPageContent = {
  hero: {
    label: "ACCOMMODATIONS",
    heading: "Retreats of Essential Comfort",
    subtitle: "Your starting point for an immersion in the Pantanal.",
    scrollHint: "Scroll down",
    videoMp4: "/Vídeo_Pronto_e_Suave.mp4",
    videoWebm: "/video-pronto-suave.webm",
    videoMp4Low: "/video-pronto-suave-low.mp4",
    videoWebmLow: "/video-pronto-suave-low.webm",
    videoPoster: "/images/acomodacoes/suite-explorer.webp",
  },
  manifesto: {
    segments: [
      { text: "Our suites are designed for ", isHighlight: false },
      { text: "essential comfort", isHighlight: true },
      { text: ", ensuring you have the ", isHighlight: false },
      { text: "perfect retreat", isHighlight: true },
      { text: " after a day of expedition.", isHighlight: false },
    ],
  },
  highlights: {
    heading: "The Essentials of Your Stay",
    items: [
      { iconName: "UtensilsCrossed", title: "Full-Board Gastronomy", description: "Breakfast, lunch with regional ingredients, afternoon snack and original dinner — all included" },
      { iconName: "GlassWater", title: "Beverages Included", description: "Water, natural juices, specialty coffee and soft drinks available throughout the stay" },
      { iconName: "Compass", title: "Guided Expeditions Included", description: "Boat trip and guided horseback ride included — explore the fauna and flora with specialists" },
      { iconName: "Fence", title: "Private Balcony", description: "All suites have a private balcony for contemplation and rest" },
      { iconName: "Snowflake", title: "Individual Air Conditioning", description: "Split air conditioning in all suites for comfort in any season" },
      { iconName: "Wifi", title: "Essential Connectivity", description: "Satellite Wi-Fi in social areas — disconnect from the world, connect to the Pantanal" },
    ],
  },
  rooms: [
    {
      title: "Explorer Suite",
      description: "The ideal retreat for the solo traveler seeking total immersion. Privacy, silence and connection with nature at your own pace.",
      image: "/images/acomodacoes/suite-explorer.webp",
      ctaText: "Check availability",
      features: [
        { iconName: "BedSingle", label: "Premium Single Bed" },
        { iconName: "Bath", label: "Private Bathroom" },
        { iconName: "Fence", label: "Cozy Balcony" },
        { iconName: "User", label: "1 Person" },
      ],
    },
    {
      title: "Adventure Suite",
      description: "Designed for couples seeking a shared experience in the heart of the Pantanal. Comfort, nature and unforgettable moments.",
      image: "/images/acomodacoes/suite-adventure.webp",
      ctaText: "Check availability",
      features: [
        { iconName: "BedDouble", label: "Premium Double Bed" },
        { iconName: "Bath", label: "Private Bathroom" },
        { iconName: "Fence", label: "Private Balcony" },
        { iconName: "Users", label: "2 People" },
      ],
    },
    {
      title: "Family Suite",
      description: "The most spacious of our suites. Perfect for families or small groups, with a double bed, single bed and a generous living area.",
      image: "/images/acomodacoes/suite-family.webp",
      ctaText: "Check availability",
      features: [
        { iconName: "BedDouble", label: "Double + Single Beds" },
        { iconName: "Bath", label: "Private Bathroom" },
        { iconName: "Fence", label: "Spacious Balcony" },
        { iconName: "Users", label: "3 People" },
      ],
    },
  ],
  culinary: {
    label: "CUISINE",
    heading: "The Authentic Flavor of the Pantanal",
    description: "Our gastronomy is focused on the essentials: fresh regional ingredients and careful preparation, resulting in authentic and comforting food after a day of expedition.",
    images: [
      { src: "/images/acomodacoes/culinaria-1.webp", alt: "Regional Pantanal dish", tag: "Breakfast" },
      { src: "/images/acomodacoes/culinaria-2.webp", alt: "Lunch prepared with regional ingredients", tag: "Lunch" },
      { src: "/images/acomodacoes/culinaria-3.webp", alt: "Sophisticated dinner at the lodge", tag: "Dinner" },
      { src: "/images/acomodacoes/culinaria-4.webp", alt: "Regional snacks and bites", tag: "Snack" },
    ],
    ctaText: "Discover our cuisine",
    ctaHref: "/culinaria",
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about Accommodations and Lodging",
    description: "Everything you need to know about the facilities, rooms and amenities at Itaicy.",
    items: [
      {
        id: "acomod-1",
        number: "01",
        question: "What types of suites are available?",
        answer: "Itaicy was designed to accommodate different guest profiles, from solo travelers to families seeking an immersive experience in the Pantanal. We offer three suite categories, each with its own personality. The Explorer Suite is a single room designed for solo travelers who want privacy and silence to reconnect with nature. The Adventure Suite was designed for couples, with a queen bed and a private balcony ideal for intimate moments together. The Family Suite is the most spacious, with a double bed and a single bed, accommodating up to three people with a generous living area. All suites share the same comfort standard: individual split air conditioning, private bathroom with full amenities, premium bedding and a private balcony for contemplation and rest.",
      },
      {
        id: "acomod-2",
        number: "02",
        question: "What is included in the daily rate?",
        answer: "Itaicy's philosophy is to offer a complete stay where guests don't need to worry about additional costs throughout the day. The daily rate includes accommodation in a private suite with individual climate control, full board with four daily meals — regional breakfast, lunch with fresh Pantanal ingredients, afternoon snack and an original dinner prepared by our kitchen. In addition to meals, filtered water, natural juices and specialty coffee served throughout the day are included. In terms of experiences, each daily rate includes a boat trip along the Rio Cuiabá and a guided horseback ride along the property's trails, both led by experienced local guides. Guests also have free access to satellite Wi-Fi in the social areas and all communal spaces of the lodge, including the deck, restaurant and lounge areas. Alcoholic beverages and extra activities on request.",
      },
      {
        id: "acomod-3",
        number: "03",
        question: "What is the total capacity of the lodge?",
        answer: "Itaicy was conceived as a low-density lodge, prioritizing the individual experience of each guest and respect for the local ecosystem. We have 10 suites distributed across three categories — Explorer, Adventure and Family — which together accommodate up to 20 guests simultaneously. This reduced number of guests is a deliberate choice, not a limitation. With small groups, each boat trip, horseback ride and photographic safari becomes more intimate and productive, increasing the chances of wildlife sightings. Personalized service is another direct benefit: the staff knows every guest by name and can tailor itineraries to individual preferences. From an environmental perspective, controlled capacity reduces pressure on the trails, river banks and sensitive habitats, maintaining the essential balance between responsible tourism and conservation that defines Itaicy's identity.",
      },
      {
        id: "acomod-4",
        number: "04",
        question: "Does the lodge have Wi-Fi and cell phone signal?",
        answer: "Being located in a remote area of the northern Mato Grosso Pantanal, connectivity at Itaicy differs from an urban environment, and this is part of the experience. We offer satellite Wi-Fi available in the lodge's social areas — restaurant, panoramic deck and reception. The connection is stable enough for text messages, checking emails and sharing photos on social media. However, high-bandwidth activities such as long video calls or video streaming may be unstable. Regarding mobile phone signal, the Vivo and Claro carriers work at open points on the property, especially near the river and on elevated areas. Many guests report that the partial disconnection becomes one of the highlights of the stay, allowing genuine presence in the environment and greater appreciation of the sounds, colors and rhythms of the surrounding Pantanal.",
      },
      {
        id: "acomod-5",
        number: "05",
        question: "How do I get to the lodge?",
        answer: "Itaicy is located in Santo Antônio do Leverger, Mato Grosso (MT), on the banks of the Rio Cuiabá, in the Northern Pantanal. The nearest airport is Cuiabá's Marechal Rondon International Airport (CGB), 61 km from the lodge — approximately 1 hour by car. It receives direct flights from São Paulo, Rio de Janeiro, Brasília and other capitals. From the airport, we offer a road transfer service on prior request, with schedules coordinated with flights. The access road is paved up to the property entrance, making arrival comfortable at any time of year, including during the rainy season.",
      },
    ],
  },
};

const es: AcomodacoesPageContent = {
  hero: {
    label: "ALOJAMIENTO",
    heading: "Refugios de Confort Esencial",
    subtitle: "Su punto de partida para la inmersión en el Pantanal.",
    scrollHint: "Desliza hacia abajo",
    videoMp4: "/Vídeo_Pronto_e_Suave.mp4",
    videoWebm: "/video-pronto-suave.webm",
    videoMp4Low: "/video-pronto-suave-low.mp4",
    videoWebmLow: "/video-pronto-suave-low.webm",
    videoPoster: "/images/acomodacoes/suite-explorer.webp",
  },
  manifesto: {
    segments: [
      { text: "Nuestras suites están proyectadas para el ", isHighlight: false },
      { text: "confort esencial", isHighlight: true },
      { text: ", garantizando que tenga el ", isHighlight: false },
      { text: "refugio perfecto", isHighlight: true },
      { text: " después de un día de expedición.", isHighlight: false },
    ],
  },
  highlights: {
    heading: "Lo Esencial de Su Estadía",
    items: [
      { iconName: "UtensilsCrossed", title: "Gastronomía de Pensión Completa", description: "Desayuno, almuerzo con ingredientes regionales, merienda y cena autoral — todo incluido" },
      { iconName: "GlassWater", title: "Bebidas Incluidas", description: "Agua, jugos naturales, café especial y refrescos disponibles durante toda la estadía" },
      { iconName: "Compass", title: "Expediciones Guiadas Incluidas", description: "Paseo en barco y cabalgata guiada incluidos — explore la fauna y flora con especialistas" },
      { iconName: "Fence", title: "Balcón Privado", description: "Todas las suites tienen balcón privado para la contemplación y el descanso" },
      { iconName: "Snowflake", title: "Climatización Individual", description: "Aire acondicionado split en todas las suites para mayor confort en cualquier estación" },
      { iconName: "Wifi", title: "Conectividad Esencial", description: "Wi-Fi vía satélite en las áreas sociales — desconéctese del mundo, conéctese al Pantanal" },
    ],
  },
  rooms: [
    {
      title: "Suite Explorer",
      description: "El refugio ideal para el viajero solo que busca inmersión total. Privacidad, silencio y conexión con la naturaleza a su propio ritmo.",
      image: "/images/acomodacoes/suite-explorer.webp",
      ctaText: "Consultar disponibilidad",
      features: [
        { iconName: "BedSingle", label: "Cama Individual Premium" },
        { iconName: "Bath", label: "Baño Privado" },
        { iconName: "Fence", label: "Balcón Íntimo" },
        { iconName: "User", label: "1 Persona" },
      ],
    },
    {
      title: "Suite Adventure",
      description: "Diseñada para parejas que buscan una experiencia a dos en el corazón del Pantanal. Confort, naturaleza y momentos inolvidables.",
      image: "/images/acomodacoes/suite-adventure.webp",
      ctaText: "Consultar disponibilidad",
      features: [
        { iconName: "BedDouble", label: "Cama Doble Premium" },
        { iconName: "Bath", label: "Baño Privado" },
        { iconName: "Fence", label: "Balcón Privado" },
        { iconName: "Users", label: "2 Personas" },
      ],
    },
    {
      title: "Suite Family",
      description: "La más espaciosa de nuestras suites. Perfecta para familias o grupos pequeños, con cama doble, cama individual y amplia área de convivencia.",
      image: "/images/acomodacoes/suite-family.webp",
      ctaText: "Consultar disponibilidad",
      features: [
        { iconName: "BedDouble", label: "Cama Doble + Individual" },
        { iconName: "Bath", label: "Baño Privado" },
        { iconName: "Fence", label: "Balcón Amplio" },
        { iconName: "Users", label: "3 Personas" },
      ],
    },
  ],
  culinary: {
    label: "GASTRONOMÍA",
    heading: "El Sabor Auténtico del Pantanal",
    description: "Nuestra gastronomía está enfocada en lo esencial: ingredientes regionales frescos y una preparación cuidadosa, resultando en una comida auténtica y reconfortante después de un día de expedición.",
    images: [
      { src: "/images/acomodacoes/culinaria-1.webp", alt: "Plato regional del Pantanal", tag: "Desayuno" },
      { src: "/images/acomodacoes/culinaria-2.webp", alt: "Almuerzo preparado con ingredientes regionales", tag: "Almuerzo" },
      { src: "/images/acomodacoes/culinaria-3.webp", alt: "Cena sofisticada en el lodge", tag: "Cena" },
      { src: "/images/acomodacoes/culinaria-4.webp", alt: "Merienda y bocadillos regionales", tag: "Merienda" },
    ],
    ctaText: "Conoce nuestra gastronomía",
    ctaHref: "/culinaria",
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Dudas sobre Alojamiento y Hospedaje",
    description: "Todo lo que necesita saber sobre la estructura, habitaciones y comodidades de Itaicy.",
    items: [
      {
        id: "acomod-1",
        number: "01",
        question: "¿Qué tipos de suite están disponibles?",
        answer: "Itaicy fue planificada para atender diferentes perfiles de huéspedes, desde el viajero solo hasta familias que buscan una experiencia inmersiva en el Pantanal. Ofrecemos tres categorías de suite, cada una con personalidad propia. La Suite Explorer es individual, pensada para quien viaja solo y quiere privacidad y silencio para reconectarse con la naturaleza. La Suite Adventure fue diseñada para parejas, con cama queen y balcón privado ideal para momentos a dos. La Suite Family es la más amplia, con cama doble y cama individual, acomodando hasta tres personas con un generoso espacio de convivencia. Todas las suites comparten el mismo estándar de confort: aire acondicionado split individual, baño privado con amenities completos, ropa de cama premium y balcón privado para contemplación y descanso.",
      },
      {
        id: "acomod-2",
        number: "02",
        question: "¿Qué está incluido en la tarifa diaria?",
        answer: "La propuesta de Itaicy es ofrecer una estadía completa, donde el huésped no necesite preocuparse por costos adicionales a lo largo del día. La tarifa incluye alojamiento en suite privada con climatización individual, pensión completa con cuatro comidas diarias — desayuno regional, almuerzo con ingredientes frescos del Pantanal, merienda y cena autoral preparada por nuestra cocina. Además de la alimentación, están incluidos agua filtrada, jugos naturales y café especial servidos durante el día. En cuanto a experiencias, cada tarifa contempla paseo en barco por el Río Cuiabá y cabalgata guiada por los senderos de la propiedad, ambos conducidos por guías locales experimentados. El huésped también tiene acceso libre al Wi-Fi vía satélite en las áreas sociales y a todos los espacios de convivencia del lodge, incluidos deck, restaurante y áreas de descanso. Bebidas alcohólicas y actividades extras bajo consulta.",
      },
      {
        id: "acomod-3",
        number: "03",
        question: "¿Cuál es la capacidad total del lodge?",
        answer: "Itaicy fue concebido como un lodge de baja densidad, priorizando la experiencia individual de cada huésped y el respeto al ecosistema local. Contamos con 10 suites distribuidas en tres categorías — Explorer, Adventure y Family — que juntas acomodan hasta 20 personas simultáneamente. Este número reducido de huéspedes es una elección deliberada, no una limitación. Con grupos pequeños, cada paseo en barco, cabalgata y safari fotográfico se vuelve más íntimo y productivo, aumentando las posibilidades de avistamiento de fauna. La atención personalizada es otro beneficio directo: el equipo conoce a cada huésped por su nombre y puede adaptar los itinerarios según las preferencias individuales. Desde el punto de vista ambiental, la capacidad controlada reduce la presión sobre los senderos, las márgenes del río y los hábitats sensibles, manteniendo el equilibrio esencial entre turismo responsable y conservación que define la identidad de Itaicy.",
      },
      {
        id: "acomod-4",
        number: "04",
        question: "¿El lodge tiene Wi-Fi y señal de celular?",
        answer: "Por estar ubicado en una región remota del Pantanal Norte de Mato Grosso, la conectividad en Itaicy es diferente al ambiente urbano, y esto forma parte de la experiencia. Ofrecemos Wi-Fi vía satélite disponible en las áreas sociales del lodge — restaurante, deck panorámico y recepción. La conexión es suficientemente estable para enviar mensajes de texto, revisar correos y compartir fotos en redes sociales. Sin embargo, actividades de alto consumo de ancho de banda como videollamadas largas o streaming de video pueden presentar inestabilidad. En cuanto a señal de celular, las operadoras Vivo y Claro funcionan en los puntos abiertos de la propiedad, especialmente cerca del río y en las áreas elevadas. Muchos huéspedes señalan que la desconexión parcial se convierte en uno de los puntos altos de la estadía, permitiendo una presencia real en el entorno y mayor apreciación de los sonidos, colores y ritmos del Pantanal circundante.",
      },
      {
        id: "acomod-5",
        number: "05",
        question: "¿Cómo llego al lodge?",
        answer: "Itaicy está ubicado en Santo Antônio do Leverger, Mato Grosso (MT), a orillas del Río Cuiabá, en el Pantanal Norte Matogrossense. El aeropuerto más cercano es el Aeropuerto Internacional Marechal Rondon de Cuiabá (CGB), a 61 km del lodge — aproximadamente 1 hora en auto. Recibe vuelos directos desde São Paulo, Río de Janeiro, Brasilia y otras capitales. Desde el aeropuerto, ofrecemos servicio de transfer vial bajo consulta previa, con horarios coordinados con los vuelos. El camino de acceso está pavimentado hasta la entrada de la propiedad, lo que hace que la llegada sea cómoda en cualquier época del año, incluso durante el período de lluvias.",
      },
    ],
  },
};

export const acomodacoesDefaults: LocalizedDefaults<"/acomodacoes"> = { pt, en, es };
