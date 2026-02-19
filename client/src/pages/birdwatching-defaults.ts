import type { BirdwatchingPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: BirdwatchingPageContent = {
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
      { text: "acesso privilegiado", isHighlight: true },
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
        title: "Áreas Preservadas",
        description:
          "Operamos em áreas preservadas com alta densidade de avifauna, longe do turismo convencional.",
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
        title: "Áreas Preservadas",
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
    heading: "Dúvidas sobre Observação de Aves",
    description: "Respondemos as principais perguntas sobre birdwatching no Pantanal da Itaicy.",
    items: [
      {
        id: "bird-1",
        number: "01",
        question: "Quantas espécies de aves é possível avistar na Itaicy?",
        answer: "O Pantanal é reconhecido internacionalmente como um dos maiores santuários de aves do planeta, abrigando mais de 650 espécies catalogadas ao longo de décadas de pesquisa ornitológica em todo o bioma. Nosso levantamento científico conduzido pelo ornitólogo João Andriola em maio de 2024 registrou 166 espécies distintas no entorno imediato do lodge em apenas 5 dias de expedição sistemática, o que demonstra a densidade excepcional de avifauna nesta área. A região de Miranda, onde a Itaicy está localizada, é considerada um dos pontos de maior concentração de aves do Pantanal devido à convergência de habitats variados como matas ciliares, campos inundáveis, baías e corixos. Dependendo da estação, esse número pode aumentar com a chegada de espécies migratórias do hemisfério norte entre outubro e dezembro, elevando ainda mais a riqueza e diversidade observável durante sua estadia.",
      },
      {
        id: "bird-2",
        number: "02",
        question: "Preciso ter experiência em birdwatching para participar?",
        answer: "O birdwatching no Pantanal é uma atividade acessível e recompensadora independentemente do seu nível de experiência, e muitos dos nossos hóspedes realizam suas primeiras observações aqui mesmo na Itaicy. Não é necessário nenhum conhecimento prévio para participar das nossas expedições. Nossos guias especialistas, com mais de 15 anos de vivência no bioma, conduzem cada saída de forma didática, auxiliando na identificação visual e sonora das espécies, explicando comportamentos de nidificação, alimentação e voo, e indicando os melhores ângulos e horários para fotografia. Fornecemos binóculos de qualidade profissional e guias de campo ilustrados em português para uso durante toda a estadia. Para birders avançados com listas de vida, oferecemos roteiros especializados focados em espécies endêmicas e de ocorrência restrita, como a Arara-Azul-Grande e o Gavião-Real, maximizando suas chances de adicionar registros raros e inéditos à sua lista pessoal.",
      },
      {
        id: "bird-3",
        number: "03",
        question: "Qual a melhor época para observação de aves no Pantanal?",
        answer: "Cada estação no Pantanal oferece oportunidades distintas de observação, e a escolha da melhor época depende das espécies que você deseja registrar e do tipo de experiência que busca. A estação seca, de maio a setembro, é considerada ideal para a maioria dos observadores porque o nível da água baixa e as aves se concentram em grande número próximo às fontes remanescentes, como baías, corixos e lagoas. Nesse período, espécies icônicas como o Tuiuiú, a Arara-Azul-Grande, o Tucano-Toco e diversas garças são avistadas com facilidade excepcional. Já a estação chuvosa, de outubro a março, transforma a paisagem e atrai espécies migratórias provenientes do hemisfério norte, como maçaricos e trinta-réis. Para maximizar sua lista, recomendamos o período de transição entre outubro e dezembro, quando residentes e migratórias coexistem, ou os meses de julho e agosto para a maior densidade de avistamentos concentrados.",
      },
      {
        id: "bird-4",
        number: "04",
        question: "Quais espécies mais emblemáticas posso avistar?",
        answer: "A região da Itaicy abriga uma concentração notável de espécies emblemáticas que representam o melhor da avifauna pantaneira, muitas delas visíveis diretamente das áreas comuns do lodge ou em expedições curtas de barco. Entre as mais procuradas estão o Tuiuiú, ave-símbolo do Pantanal com envergadura de até 2,8 metros, a Arara-Azul-Grande, a maior espécie de psitacídeo do mundo e ameaçada de extinção, a Arara-Vermelha, o Tucano-Toco com seu bico alaranjado inconfundível e o Gavião-Real, maior águia das Américas. Também são frequentes o Martim-Pescador-Grande, diversas espécies de garças como a Garça-Branca-Grande e a Garça-Moça-Real, socos, falcões e gaviões. Para observações noturnas, organizamos saídas específicas ao anoitecer para registrar a Coruja-Buraqueira, o Urutau-Comum com sua camuflagem extraordinária e o misterioso Bacurau, aves de hábitos crepusculares que revelam uma dimensão completamente diferente e fascinante da vida selvagem no Pantanal. No total, nosso levantamento científico já catalogou 166 espécies nesta região.",
      },
      {
        id: "bird-5",
        number: "05",
        question: "Que equipamento devo trazer para birdwatching?",
        answer: "Para aproveitar ao máximo sua experiência de birdwatching no Pantanal, o equipamento adequado faz diferença significativa tanto na qualidade dos registros fotográficos quanto no conforto durante as expedições em campo. Recomendamos trazer câmera com teleobjetiva de pelo menos 300mm, idealmente 400mm ou superior para espécies mais ariscas, e binóculos de boa qualidade nos modelos 8x42 ou 10x42 que oferecem o melhor equilíbrio entre ampliação e campo de visão. Para vestuário, escolha roupas em cores neutras como verde-oliva, marrom e bege que se integram ao ambiente e não afugentam as aves. Chapéu de aba larga, protetor solar e repelente são indispensáveis. Para quem não possui equipamento próprio, oferecemos binóculos profissionais de empréstimo e guias de campo ilustrados. Nossos guias também compartilham técnicas de fotografia de natureza, incluindo configurações de câmera e posicionamento em relação à luz natural.",
      },
    ],
  },
};

const en: BirdwatchingPageContent = {
  hero: {
    label: "BIRDWATCHING",
    heading: "Rare Species Sighting in Untouched Habitat",
    subtitle:
      "A unique birdwatching experience. Capture our avifauna in one of the planet's richest bird sanctuaries.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/bird-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "A ", isHighlight: false },
      { text: "contemplative immersion", isHighlight: true },
      {
        text: " that goes beyond the conventional. We guide with respect in our ",
        isHighlight: false,
      },
      { text: "privileged-access", isHighlight: true },
      { text: " sanctuary.", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "OUR PHILOSOPHY",
    heading: "Conscious and Immersive Birding",
    body: [
      "In the heart of the Pantanal, we practice birdwatching with absolute respect for the natural habitat.",
      "Each expedition is planned to minimize environmental impact while maximizing your spotting opportunities.",
    ],
    image: "/images/bird-about-1",
    features: [
      {
        number: "01",
        title: "Expert Guides",
        description:
          "Our guides have over 15 years of experience and are intimately familiar with the behaviors and routes of each species.",
      },
      {
        number: "02",
        title: "Preserved Areas",
        description:
          "We operate in preserved areas with high avifauna density, far from conventional tourism.",
      },
      {
        number: "03",
        title: "Contemplative Immersion",
        description:
          "We offer an experience that goes beyond tourism, focused on a scientific and truly contemplative immersion.",
      },
    ],
  },
  highlights: {
    heading: "Why Choose Our Expedition",
    items: [
      {
        iconName: "Bird",
        title: "166+ Species spotted",
        description: "Recorded in just 5 expedition days",
      },
      {
        iconName: "ShieldCheck",
        title: "Preserved Areas",
        description: "Protected areas with unique biodiversity",
      },
      {
        iconName: "Users",
        title: "Specialized Guides",
        description: "Certified ornithologists and experienced photographers",
      },
    ],
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about Birdwatching",
    description: "We answer the main questions about birdwatching in the Pantanal at Itaicy.",
    items: [
      {
        id: "bird-1",
        number: "01",
        question: "How many bird species can be spotted at Itaicy?",
        answer: "The Pantanal is internationally recognized as one of the greatest bird sanctuaries on the planet, harboring over 650 species catalogued over decades of ornithological research across the entire biome. Our scientific survey conducted by ornithologist João Andriola in May 2024 recorded 166 distinct species in the immediate surroundings of the lodge in just 5 days of systematic fieldwork, demonstrating the exceptional density of avifauna in this area. The Miranda region, where Itaicy is located, is considered one of the highest bird concentration points in the Pantanal due to the convergence of diverse habitats such as riparian forests, floodable fields, bays, and channels. Depending on the season, this number can increase with the arrival of migratory species from the northern hemisphere between October and December, further elevating the richness and diversity observable during your stay.",
      },
      {
        id: "bird-2",
        number: "02",
        question: "Do I need birdwatching experience to participate?",
        answer: "Birdwatching in the Pantanal is an accessible and rewarding activity regardless of your experience level, and many of our guests record their first sightings right here at Itaicy. No prior knowledge is required to join our expeditions. Our expert guides, with over 15 years of immersion in the biome, lead each outing didactically, assisting with visual and auditory species identification, explaining nesting, feeding, and flight behaviors, and indicating the best angles and times for photography. We provide professional-quality binoculars and illustrated field guides for use throughout your stay. For advanced birders with life lists, we offer specialized itineraries focused on endemic and restricted-range species, such as the Hyacinth Macaw and the Harpy Eagle, maximizing your chances of adding rare new records to your personal list.",
      },
      {
        id: "bird-3",
        number: "03",
        question: "What is the best time for birdwatching in the Pantanal?",
        answer: "Each season in the Pantanal offers distinct observation opportunities, and the best time depends on which species you wish to record and what type of experience you seek. The dry season, from May to September, is considered ideal for most birders because water levels drop and birds concentrate in large numbers near remaining water sources such as bays, channels, and lagoons. During this period, iconic species such as the Tuiuiú, the Hyacinth Macaw, the Toco Toucan, and various herons are spotted with exceptional ease. The rainy season, from October to March, transforms the landscape and attracts migratory species from the northern hemisphere, such as sandpipers and terns. To maximize your list, we recommend the transition period between October and December, when resident and migratory birds coexist, or the months of July and August for the highest density of concentrated sightings.",
      },
      {
        id: "bird-4",
        number: "04",
        question: "What are the most emblematic species I can spot?",
        answer: "The Itaicy region is home to a remarkable concentration of emblematic species representing the best of the Pantanal's avifauna, many visible directly from the lodge's common areas or on short boat excursions. Among the most sought-after are the Tuiuiú, the symbol bird of the Pantanal with a wingspan of up to 2.8 meters, the Hyacinth Macaw, the world's largest parrot and an endangered species, the Scarlet Macaw, the Toco Toucan with its unmistakable orange beak, and the Harpy Eagle, the largest eagle in the Americas. Also frequently seen are the Ringed Kingfisher, various heron species, tiger-herons, falcons, and hawks. For nocturnal observations, we organize specific dusk outings to record the Burrowing Owl, the Common Potoo with its extraordinary camouflage, and the mysterious Nightjar — crepuscular birds that reveal a completely different and fascinating dimension of wildlife in the Pantanal. In total, our scientific survey has catalogued 166 species in this region.",
      },
      {
        id: "bird-5",
        number: "05",
        question: "What equipment should I bring for birdwatching?",
        answer: "To make the most of your birdwatching experience in the Pantanal, the right equipment makes a significant difference in both the quality of photographic records and comfort during field expeditions. We recommend bringing a camera with a telephoto lens of at least 300mm, ideally 400mm or longer for shyer species, and quality binoculars in the 8x42 or 10x42 models that offer the best balance between magnification and field of view. For clothing, choose neutral colors such as olive green, brown, and beige that blend into the environment and do not startle the birds. A wide-brimmed hat, sunscreen, and insect repellent are essential. For those without their own equipment, we offer professional loaner binoculars and illustrated field guides. Our guides also share nature photography techniques, including camera settings and positioning relative to natural light.",
      },
    ],
  },
};

const es: BirdwatchingPageContent = {
  hero: {
    label: "OBSERVACIÓN DE AVES",
    heading: "Avistamiento de Especies Raras en Hábitat Intocado",
    subtitle:
      "Una experiencia de observación única. Registra nuestra avifauna en uno de los santuarios de aves más ricos del planeta.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/bird-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "Una ", isHighlight: false },
      { text: "inmersión contemplativa", isHighlight: true },
      {
        text: " que va más allá de lo convencional. Guiamos con respeto en nuestro santuario de ",
        isHighlight: false,
      },
      { text: "acceso privilegiado", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NUESTRA FILOSOFÍA",
    heading: "Observación Consciente e Inmersiva",
    body: [
      "En el corazón del Pantanal, practicamos la observación de aves con absoluto respeto por el hábitat natural.",
      "Cada expedición está planeada para minimizar el impacto ambiental mientras maximiza sus oportunidades de avistamiento.",
    ],
    image: "/images/bird-about-1",
    features: [
      {
        number: "01",
        title: "Guías Expertos",
        description:
          "Nuestros guías tienen más de 15 años de experiencia y conocen íntimamente los comportamientos y rutas de cada especie.",
      },
      {
        number: "02",
        title: "Áreas Preservadas",
        description:
          "Operamos en áreas preservadas con alta densidad de avifauna, lejos del turismo convencional.",
      },
      {
        number: "03",
        title: "Inmersión Contemplativa",
        description:
          "Ofrecemos una experiencia que va más allá del turismo, enfocada en una inmersión científica y verdaderamente contemplativa.",
      },
    ],
  },
  highlights: {
    heading: "Por Qué Elegir Nuestra Expedición",
    items: [
      {
        iconName: "Bird",
        title: "166+ Especies avistadas",
        description: "Registradas en solo 5 días de expedición",
      },
      {
        iconName: "ShieldCheck",
        title: "Áreas Preservadas",
        description: "Áreas protegidas con biodiversidad única",
      },
      {
        iconName: "Users",
        title: "Guías Especializados",
        description: "Ornitólogos certificados y fotógrafos experimentados",
      },
    ],
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Preguntas sobre Observación de Aves",
    description: "Respondemos las principales preguntas sobre birdwatching en el Pantanal de Itaicy.",
    items: [
      {
        id: "bird-1",
        number: "01",
        question: "¿Cuántas especies de aves se pueden avistar en Itaicy?",
        answer: "El Pantanal es reconocido internacionalmente como uno de los mayores santuarios de aves del planeta, albergando más de 650 especies catalogadas a lo largo de décadas de investigación ornitológica en todo el bioma. Nuestro relevamiento científico conducido por el ornitólogo João Andriola en mayo de 2024 registró 166 especies distintas en el entorno inmediato del lodge en solo 5 días de trabajo de campo sistemático, lo que demuestra la excepcional densidad de avifauna en esta área. La región de Miranda, donde se ubica Itaicy, es considerada uno de los puntos de mayor concentración de aves del Pantanal debido a la convergencia de hábitats variados como bosques de galería, campos inundables, bahías y canales. Dependiendo de la temporada, este número puede aumentar con la llegada de especies migratorias del hemisferio norte entre octubre y diciembre, elevando aún más la riqueza y diversidad observable durante su estadía.",
      },
      {
        id: "bird-2",
        number: "02",
        question: "¿Necesito experiencia en birdwatching para participar?",
        answer: "El birdwatching en el Pantanal es una actividad accesible y gratificante independientemente de su nivel de experiencia, y muchos de nuestros huéspedes realizan sus primeras observaciones aquí mismo en Itaicy. No se requiere ningún conocimiento previo para participar en nuestras expediciones. Nuestros guías expertos, con más de 15 años de vivencia en el bioma, conducen cada salida de forma didáctica, ayudando en la identificación visual y auditiva de las especies, explicando comportamientos de anidación, alimentación y vuelo, e indicando los mejores ángulos y horarios para fotografía. Proporcionamos binoculares de calidad profesional y guías de campo ilustradas para uso durante toda la estadía. Para birders avanzados con listas de vida, ofrecemos itinerarios especializados enfocados en especies endémicas y de ocurrencia restringida, como la Arara-Azul-Grande y el Gavião-Real, maximizando sus posibilidades de añadir registros raros a su lista personal.",
      },
      {
        id: "bird-3",
        number: "03",
        question: "¿Cuál es la mejor época para la observación de aves en el Pantanal?",
        answer: "Cada temporada en el Pantanal ofrece distintas oportunidades de observación, y la elección de la mejor época depende de las especies que desea registrar y del tipo de experiencia que busca. La temporada seca, de mayo a septiembre, es considerada ideal para la mayoría de los observadores porque el nivel del agua baja y las aves se concentran en gran número cerca de las fuentes de agua restantes, como bahías, canales y lagunas. En este período, especies icónicas como el Tuiuiú, la Arara-Azul-Grande, el Tucano-Toco y diversas garzas se avistan con facilidad excepcional. La temporada lluviosa, de octubre a marzo, transforma el paisaje y atrae especies migratorias provenientes del hemisferio norte. Para maximizar su lista, recomendamos el período de transición entre octubre y diciembre, cuando residentes y migratorias coexisten, o los meses de julio y agosto para la mayor densidad de avistamientos concentrados.",
      },
      {
        id: "bird-4",
        number: "04",
        question: "¿Qué especies más emblemáticas puedo avistar?",
        answer: "La región de Itaicy alberga una notable concentración de especies emblemáticas que representan lo mejor de la avifauna pantanera, muchas de ellas visibles directamente desde las áreas comunes del lodge o en cortas excursiones en bote. Entre las más buscadas están el Tuiuiú, ave símbolo del Pantanal con envergadura de hasta 2,8 metros, la Arara-Azul-Grande, la especie de loros más grande del mundo y en peligro de extinción, la Arara-Roja, el Tucano-Toco con su inconfundible pico naranja y el Gavião-Real, el águila más grande de las Américas. También son frecuentes el Martín Pescador Grande, diversas especies de garzas, tigrisomas, halcones y gavilanes. Para observaciones nocturnas, organizamos salidas específicas al anochecer para registrar la Lechuza de las Vizcacheras, el Urutaú Común con su extraordinario camuflaje y el misterioso Chotacabras — aves de hábitos crepusculares que revelan una dimensión completamente diferente y fascinante de la vida silvestre en el Pantanal. En total, nuestro relevamiento científico ha catalogado 166 especies en esta región.",
      },
      {
        id: "bird-5",
        number: "05",
        question: "¿Qué equipo debo traer para birdwatching?",
        answer: "Para aprovechar al máximo su experiencia de birdwatching en el Pantanal, el equipo adecuado marca una diferencia significativa tanto en la calidad de los registros fotográficos como en la comodidad durante las expediciones de campo. Recomendamos traer cámara con teleobjetivo de al menos 300 mm, idealmente 400 mm o superior para especies más esquivas, y binoculares de buena calidad en los modelos 8x42 o 10x42 que ofrecen el mejor equilibrio entre amplificación y campo de visión. Para la vestimenta, elija ropa en colores neutros como verde oliva, marrón y beige que se integran al ambiente y no asustan a las aves. Sombrero de ala ancha, protector solar y repelente de insectos son indispensables. Para quienes no tienen equipo propio, ofrecemos binoculares profesionales de préstamo y guías de campo ilustradas. Nuestros guías también comparten técnicas de fotografía de naturaleza, incluyendo configuraciones de cámara y posicionamiento respecto a la luz natural.",
      },
    ],
  },
};

export const birdwatchingDefaults: LocalizedDefaults<"/observacao-de-aves"> = { pt, en, es };
