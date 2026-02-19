import type { EcoturismoPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: EcoturismoPageContent = {
  hero: {
    label: "ECOTURISMO",
    heading: "Imersão Autêntica na Natureza Selvagem do Pantanal",
    subtitle:
      "Passeios guiados que revelam a essência do bioma mais biodiverso do planeta. Cada experiência é uma conexão profunda com a vida selvagem.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/eco-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "Uma experiência que vai além do ", isHighlight: false },
      { text: "turismo convencional", isHighlight: true },
      {
        text: ". Cada passeio é uma imersão guiada no coração de um dos ",
        isHighlight: false,
      },
      { text: "ecossistemas mais ricos", isHighlight: true },
      { text: " do planeta.", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NOSSA FILOSOFIA",
    heading: "Conexão Autêntica com o Bioma",
    body: [
      "Às margens do Rio Cuiabá, oferecemos uma seleção de passeios que proporcionam uma imersão completa na natureza do Pantanal.",
      "Todos os passeios são acompanhados por guias especializados, garantindo segurança, conforto e uma experiência autêntica neste bioma singular.",
    ],
    image: "/images/eco-about-1",
    features: [
      {
        number: "01",
        title: "Guias Nativos",
        description:
          "Nossos guias nasceram no Pantanal. Eles conhecem cada trilha, cada som e cada comportamento animal da região.",
      },
      {
        number: "02",
        title: "Baixo Impacto",
        description:
          "Operamos com grupos reduzidos e protocolos rigorosos para minimizar nossa presença no habitat natural.",
      },
      {
        number: "03",
        title: "Experiência Imersiva",
        description:
          "Do nascer ao pôr do sol, cada momento é pensado para conectar você de forma autêntica com a vida selvagem do Pantanal.",
      },
    ],
  },
  highlights: {
    heading: "Por Que Explorar com a Itaicy",
    items: [
      {
        iconName: "Compass",
        title: "Roteiros Guiados",
        description:
          "Acesso a áreas preservadas do Rio Cuiabá e seus afluentes, longe do turismo de massa.",
      },
      {
        iconName: "ShieldCheck",
        title: "Segurança Total",
        description:
          "Guias experientes e equipamentos de primeira linha em todas as expedições.",
      },
      {
        iconName: "Sunrise",
        title: "Experiências Únicas",
        description:
          "Do nascer ao pôr do sol, cada passeio revela uma face diferente do Pantanal.",
      },
    ],
  },
  services: {
    label: "AS EXPEDIÇÕES",
    heading: "Nossos Passeios",
    description:
      "Cada passeio é uma oportunidade de vivenciar o Pantanal de forma única. Nossos guias nativos garantem avistamentos memoráveis e segurança em cada expedição.",
    items: [
      {
        title: "Passeio de Barco ao Pôr do Sol",
        description:
          "Navegação pelos canais e corixos do Rio Cuiabá, com o espetáculo do pôr do sol refletido nas águas e a tradicional pesca de piranhas.",
        image: "/images/eco-activity-1",
      },
      {
        title: "Safári Noturno",
        description:
          "Aventure-se pelo rio à noite e observe jacarés, capivaras, ariranhas e corujas em seu habitat natural.",
        image: "/images/eco-activity-2",
      },
      {
        title: "Nascer do Sol Pantaneiro",
        description:
          "Saídas ao amanhecer para vivenciar o despertar da vida no Pantanal. Cores, sons e os primeiros movimentos dos animais.",
        image: "/images/eco-activity-3",
      },
      {
        title: "Trilhas Ecológicas",
        description:
          "Caminhadas pelos arredores da pousada, ideais para observação de aves, mamíferos e da exuberante flora nativa.",
        image: "/images/eco-activity-4",
      },
    ],
    buttonText: "Ver todos os passeios disponíveis",
    buttonHref: "#",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Dúvidas sobre Ecoturismo no Pantanal",
    description: "Tudo o que você precisa saber sobre nossas expedições e atividades de ecoturismo.",
    items: [
      {
        id: "eco-1",
        number: "01",
        question: "Quais atividades de ecoturismo estão inclusas no pacote?",
        answer: "Na Itaicy, cada pacote de ecoturismo é planejado para oferecer uma vivência completa do Pantanal, combinando atividades aquáticas, terrestres e contemplativas ao longo de toda a sua estadia nas margens do Rio Cuiabá. Os pacotes incluem passeios de barco pelo rio e seus corixos, safáris fotográficos com foco em aves como tuiuiús e araras-azuis, trilhas ecológicas guiadas pela mata ciliar, focagem noturna para observar jacarés e animais de hábitos crepusculares, e sessões de contemplação ao nascer e pôr do sol pantaneiro. Todas as atividades são conduzidas por guias nativos especializados que conhecem a região há décadas e dominam técnicas de rastreamento e identificação de espécies. A disponibilidade de cada passeio varia conforme a época do ano e as condições climáticas locais, garantindo que cada saída ocorra com segurança e máximo aproveitamento das oportunidades de avistamento da fauna silvestre.",
      },
      {
        id: "eco-2",
        number: "02",
        question: "É seguro fazer ecoturismo no Pantanal?",
        answer: "A segurança dos nossos hóspedes é prioridade absoluta em cada expedição que realizamos na Itaicy, e investimos continuamente em treinamento da equipe e atualização de equipamentos para manter esse padrão elevado durante todas as estações do ano. Sim, todas as expedições são acompanhadas por guias experientes com mais de dez anos de vivência no Pantanal, que conhecem profundamente os rios, trilhas e o comportamento da fauna local em diferentes épocas. Utilizamos embarcações com motores revisados periodicamente, coletes salva-vidas certificados, rádio comunicação via VHF e kit completo de primeiros socorros a bordo. Os roteiros seguem protocolos ambientais e operacionais rigorosos definidos em conjunto com órgãos de fiscalização regional. Além disso, monitoramos diariamente o nível do Rio Cuiabá e as condições meteorológicas para adaptar os horários e trajetos de cada saída, garantindo sua segurança sem comprometer a qualidade e a autenticidade da experiência no bioma.",
      },
      {
        id: "eco-3",
        number: "03",
        question: "Quais animais é possível avistar durante os passeios?",
        answer: "O Pantanal é reconhecido como um dos biomas mais ricos do planeta, abrigando mais de 4.700 espécies catalogadas entre mamíferos, aves, répteis, peixes e plantas, o que torna cada saída a campo uma oportunidade única e imprevisível de contato direto com a vida selvagem em estado puro. Durante as expedições da Itaicy ao longo do Rio Cuiabá, é comum avistar jacarés-do-pantanal tomando sol nas margens, capivaras em grandes grupos, ariranhas pescando nos corixos, tucanos, tuiuiús, araras-azuis, cervos-do-pantanal e, com sorte, onças-pintadas descansando à beira do rio ou atravessando os canais. Sucuris e diversas espécies de corujas também aparecem com frequência nos safáris noturnos. A diversidade varia entre as estações: na seca, os animais se concentram próximo aos rios, facilitando avistamentos; na cheia, aves migratórias como colhereiros e cabeças-secas, além da reprodução de peixes, ampliam o espetáculo natural.",
      },
      {
        id: "eco-4",
        number: "04",
        question: "Qual a melhor época para ecoturismo no Pantanal?",
        answer: "O Pantanal se transforma de forma marcante ao longo do ano, e cada estação oferece experiências únicas que atraem viajantes com interesses distintos, desde fotógrafos de natureza até observadores de aves e famílias em busca de aventura e conexão com o bioma. A estação seca, de maio a setembro, é a mais procurada: o nível dos rios baixa consideravelmente, os animais se concentram nos poucos pontos de água remanescentes e os avistamentos de jacarés, capivaras, ariranhas e onças-pintadas aumentam de forma significativa. A estação chuvosa, de outubro a março, revela paisagens dramáticas com campos inundados até o horizonte, floração intensa de piúvas e ipês e a reprodução de peixes e aves migratórias como o colhereiro e a cabeça-seca. Para fotografia de fauna, a seca é ideal. Para paisagens exuberantes e biodiversidade aquática em plena atividade, a transição entre estações oferece o cenário mais rico e surpreendente.",
      },
      {
        id: "eco-5",
        number: "05",
        question: "Preciso de preparo físico para as atividades?",
        answer: "Nossos passeios foram cuidadosamente desenhados para proporcionar conforto e acessibilidade ao maior número possível de hóspedes, desde crianças a partir de cinco anos acompanhadas por responsáveis até viajantes da terceira idade, sem abrir mão da autenticidade e profundidade da experiência no Pantanal. A maioria das atividades não exige nenhum preparo físico especial. Passeios de barco pelo Rio Cuiabá, safáris fotográficos e focagem noturna são acessíveis para todas as idades e condições físicas, pois o deslocamento é feito inteiramente em embarcações estáveis e confortáveis com assentos acolchoados. As trilhas ecológicas pela mata ciliar têm nível leve a moderado, com percursos de até três quilômetros em terreno predominantemente plano e sombreado. Sempre informamos o grau de dificuldade, a duração estimada e as condições do trajeto antes de cada atividade, para que você escolha com tranquilidade o roteiro que melhor se adapta ao seu perfil, ritmo e expectativas.",
      },
    ],
  },
};

const en: EcoturismoPageContent = {
  hero: {
    label: "ECOTOURISM",
    heading: "Authentic Immersion in the Wild Nature of the Pantanal",
    subtitle:
      "Guided tours that reveal the essence of the most biodiverse biome on the planet. Each experience is a deep connection with wildlife.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/eco-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "An experience that goes beyond ", isHighlight: false },
      { text: "conventional tourism", isHighlight: true },
      {
        text: ". Each tour is a guided immersion in the heart of one of the ",
        isHighlight: false,
      },
      { text: "richest ecosystems", isHighlight: true },
      { text: " on the planet.", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "OUR PHILOSOPHY",
    heading: "Authentic Connection with the Biome",
    body: [
      "On the banks of the Cuiabá River, we offer a selection of tours that provide a complete immersion in the Pantanal's nature.",
      "All tours are accompanied by specialized guides, ensuring safety, comfort and an authentic experience in this singular biome.",
    ],
    image: "/images/eco-about-1",
    features: [
      {
        number: "01",
        title: "Native Guides",
        description:
          "Our guides were born in the Pantanal. They know every trail, every sound and every animal behavior in the region.",
      },
      {
        number: "02",
        title: "Low Impact",
        description:
          "We operate with small groups and strict protocols to minimize our presence in the natural habitat.",
      },
      {
        number: "03",
        title: "Immersive Experience",
        description:
          "From sunrise to sunset, every moment is designed to connect you authentically with the wildlife of the Pantanal.",
      },
    ],
  },
  highlights: {
    heading: "Why Explore with Itaicy",
    items: [
      {
        iconName: "Compass",
        title: "Guided Routes",
        description:
          "Access to preserved areas of the Cuiabá River and its tributaries, away from mass tourism.",
      },
      {
        iconName: "ShieldCheck",
        title: "Total Safety",
        description:
          "Experienced guides and top-of-the-line equipment on every expedition.",
      },
      {
        iconName: "Sunrise",
        title: "Unique Experiences",
        description:
          "From sunrise to sunset, each tour reveals a different face of the Pantanal.",
      },
    ],
  },
  services: {
    label: "THE EXPEDITIONS",
    heading: "Our Tours",
    description:
      "Each tour is an opportunity to experience the Pantanal in a unique way. Our native guides ensure memorable wildlife sightings and safety on every expedition.",
    items: [
      {
        title: "Sunset Boat Tour",
        description:
          "Navigation through the channels and waterways of the Cuiabá River, with the spectacle of the sunset reflected in the waters and the traditional piranha fishing.",
        image: "/images/eco-activity-1",
      },
      {
        title: "Night Safari",
        description:
          "Venture out on the river at night and observe caimans, capybaras, giant otters and owls in their natural habitat.",
        image: "/images/eco-activity-2",
      },
      {
        title: "Pantanal Sunrise",
        description:
          "Early morning departures to experience the awakening of life in the Pantanal. Colors, sounds and the first movements of the animals.",
        image: "/images/eco-activity-3",
      },
      {
        title: "Ecological Trails",
        description:
          "Walks around the lodge, ideal for birdwatching, mammal spotting and the exuberant native flora.",
        image: "/images/eco-activity-4",
      },
    ],
    buttonText: "See all available tours",
    buttonHref: "#",
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about Ecotourism in the Pantanal",
    description: "Everything you need to know about our expeditions and ecotourism activities.",
    items: [
      {
        id: "eco-1",
        number: "01",
        question: "What ecotourism activities are included in the package?",
        answer: "At Itaicy, each ecotourism package is designed to offer a complete experience of the Pantanal, combining aquatic, land-based and contemplative activities throughout your stay on the banks of the Cuiabá River. Packages include boat trips along the river and its channels, photographic safaris focused on birds such as tuiuiús and araras-azuis, guided ecological trails through the gallery forest, night spotlighting to observe caimans and crepuscular animals, and contemplation sessions at Pantanal sunrise and sunset. All activities are led by specialized native guides who have known the region for decades and master tracking and species identification techniques. The availability of each tour varies according to the season and local weather conditions, ensuring that every outing takes place safely and maximizes wildlife sighting opportunities.",
      },
      {
        id: "eco-2",
        number: "02",
        question: "Is ecotourism in the Pantanal safe?",
        answer: "The safety of our guests is the absolute priority on every expedition we conduct at Itaicy, and we continually invest in staff training and equipment updates to maintain this high standard throughout all seasons. Yes, all expeditions are accompanied by experienced guides with over ten years of living in the Pantanal, who have deep knowledge of the rivers, trails and wildlife behavior at different times of year. We use boats with periodically serviced engines, certified life jackets, VHF radio communication and a full first-aid kit on board. All routes follow strict environmental and operational protocols defined in collaboration with regional oversight bodies. We also monitor the Cuiabá River level and weather conditions daily to adapt the schedules and routes of each outing, ensuring your safety without compromising the quality and authenticity of the biome experience.",
      },
      {
        id: "eco-3",
        number: "03",
        question: "What animals can be spotted during the tours?",
        answer: "The Pantanal is recognized as one of the richest biomes on the planet, home to more than 4,700 catalogued species of mammals, birds, reptiles, fish and plants, making every field outing a unique and unpredictable opportunity for direct contact with wildlife in its pure state. During Itaicy expeditions along the Cuiabá River, it is common to spot pantanal caimans sunbathing on the banks, large groups of capybaras, giant otters fishing in the channels, toucans, tuiuiús, araras-azuis, swamp deer, and — with luck — jaguars resting at the river's edge or crossing the channels. Anacondas and various owl species also appear frequently on night safaris. The diversity varies between seasons: in the dry season, animals concentrate near the rivers, facilitating sightings; in the wet season, migratory birds such as roseate spoonbills and jabirus, along with the reproduction of fish, amplify the natural spectacle.",
      },
      {
        id: "eco-4",
        number: "04",
        question: "What is the best season for ecotourism in the Pantanal?",
        answer: "The Pantanal transforms dramatically throughout the year, and each season offers unique experiences that attract travelers with different interests — from nature photographers to birdwatchers and families seeking adventure and connection with the biome. The dry season, from May to September, is the most sought after: river levels drop considerably, animals concentrate at the remaining water points, and sightings of caimans, capybaras, giant otters and jaguars increase significantly. The wet season, from October to March, reveals dramatic landscapes with flooded fields stretching to the horizon, intense flowering of piúvas and ipês, and the reproduction of fish and migratory birds such as the roseate spoonbill and jabiru. For wildlife photography, the dry season is ideal. For lush scenery and aquatic biodiversity in full swing, the transition between seasons offers the richest and most surprising setting.",
      },
      {
        id: "eco-5",
        number: "05",
        question: "Do I need to be physically fit for the activities?",
        answer: "Our tours have been carefully designed to provide comfort and accessibility to the widest possible range of guests — from children aged five and above accompanied by a guardian, to senior travelers — without sacrificing the authenticity and depth of the Pantanal experience. Most activities require no special physical preparation. Boat trips along the Cuiabá River, photographic safaris and night spotlighting are accessible for all ages and physical conditions, as transportation is done entirely in stable, comfortable boats with cushioned seats. The ecological trails through the gallery forest are at a light to moderate level, with routes of up to three kilometers on predominantly flat and shaded terrain. We always inform the difficulty level, estimated duration and trail conditions before each activity, so that you can comfortably choose the itinerary that best suits your profile, pace and expectations.",
      },
    ],
  },
};

const es: EcoturismoPageContent = {
  hero: {
    label: "ECOTURISMO",
    heading: "Inmersión Auténtica en la Naturaleza Salvaje del Pantanal",
    subtitle:
      "Recorridos guiados que revelan la esencia del bioma más biodiverso del planeta. Cada experiencia es una conexión profunda con la vida silvestre.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/eco-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "Una experiencia que va más allá del ", isHighlight: false },
      { text: "turismo convencional", isHighlight: true },
      {
        text: ". Cada paseo es una inmersión guiada en el corazón de uno de los ",
        isHighlight: false,
      },
      { text: "ecosistemas más ricos", isHighlight: true },
      { text: " del planeta.", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NUESTRA FILOSOFÍA",
    heading: "Conexión Auténtica con el Bioma",
    body: [
      "En las márgenes del Río Cuiabá, ofrecemos una selección de paseos que brindan una inmersión completa en la naturaleza del Pantanal.",
      "Todos los paseos son acompañados por guías especializados, garantizando seguridad, comodidad y una experiencia auténtica en este singular bioma.",
    ],
    image: "/images/eco-about-1",
    features: [
      {
        number: "01",
        title: "Guías Nativos",
        description:
          "Nuestros guías nacieron en el Pantanal. Conocen cada sendero, cada sonido y cada comportamiento animal de la región.",
      },
      {
        number: "02",
        title: "Bajo Impacto",
        description:
          "Operamos con grupos reducidos y protocolos rigurosos para minimizar nuestra presencia en el hábitat natural.",
      },
      {
        number: "03",
        title: "Experiencia Inmersiva",
        description:
          "Del amanecer al atardecer, cada momento está pensado para conectarlo de forma auténtica con la vida silvestre del Pantanal.",
      },
    ],
  },
  highlights: {
    heading: "Por Qué Explorar con Itaicy",
    items: [
      {
        iconName: "Compass",
        title: "Itinerarios Guiados",
        description:
          "Acceso a áreas preservadas del Río Cuiabá y sus afluentes, lejos del turismo masivo.",
      },
      {
        iconName: "ShieldCheck",
        title: "Seguridad Total",
        description:
          "Guías experimentados y equipos de primera línea en todas las expediciones.",
      },
      {
        iconName: "Sunrise",
        title: "Experiencias Únicas",
        description:
          "Del amanecer al atardecer, cada paseo revela una cara diferente del Pantanal.",
      },
    ],
  },
  services: {
    label: "LAS EXPEDICIONES",
    heading: "Nuestros Paseos",
    description:
      "Cada paseo es una oportunidad de vivir el Pantanal de forma única. Nuestros guías nativos garantizan avistamientos memorables y seguridad en cada expedición.",
    items: [
      {
        title: "Paseo en Barco al Atardecer",
        description:
          "Navegación por los canales y brazos del Río Cuiabá, con el espectáculo del atardecer reflejado en las aguas y la tradicional pesca de pirañas.",
        image: "/images/eco-activity-1",
      },
      {
        title: "Safari Nocturno",
        description:
          "Aventúrese por el río de noche y observe caimanes, capibaras, nutrias gigantes y búhos en su hábitat natural.",
        image: "/images/eco-activity-2",
      },
      {
        title: "Amanecer Pantanero",
        description:
          "Salidas al alba para vivir el despertar de la vida en el Pantanal. Colores, sonidos y los primeros movimientos de los animales.",
        image: "/images/eco-activity-3",
      },
      {
        title: "Senderos Ecológicos",
        description:
          "Caminatas por los alrededores del lodge, ideales para observación de aves, mamíferos y la exuberante flora nativa.",
        image: "/images/eco-activity-4",
      },
    ],
    buttonText: "Ver todos los paseos disponibles",
    buttonHref: "#",
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Dudas sobre Ecoturismo en el Pantanal",
    description: "Todo lo que necesita saber sobre nuestras expediciones y actividades de ecoturismo.",
    items: [
      {
        id: "eco-1",
        number: "01",
        question: "¿Qué actividades de ecoturismo están incluidas en el paquete?",
        answer: "En Itaicy, cada paquete de ecoturismo está planificado para ofrecer una vivencia completa del Pantanal, combinando actividades acuáticas, terrestres y contemplativas a lo largo de toda su estadía en las márgenes del Río Cuiabá. Los paquetes incluyen paseos en barco por el río y sus canales, safaris fotográficos enfocados en aves como tuiuiús y araras-azuis, senderos ecológicos guiados por la selva ciliar, safari nocturno para observar caimanes y animales de hábitos crepusculares, y sesiones de contemplación al amanecer y atardecer pantanero. Todas las actividades son conducidas por guías nativos especializados que conocen la región desde hace décadas y dominan técnicas de rastreo e identificación de especies. La disponibilidad de cada paseo varía según la época del año y las condiciones climáticas locales, garantizando que cada salida se realice con seguridad y máximo aprovechamiento de las oportunidades de avistamiento de fauna silvestre.",
      },
      {
        id: "eco-2",
        number: "02",
        question: "¿Es seguro hacer ecoturismo en el Pantanal?",
        answer: "La seguridad de nuestros huéspedes es la prioridad absoluta en cada expedición que realizamos en Itaicy, e invertimos continuamente en capacitación del equipo y actualización de equipos para mantener este alto estándar durante todas las estaciones del año. Sí, todas las expediciones son acompañadas por guías experimentados con más de diez años de convivencia en el Pantanal, que conocen profundamente los ríos, senderos y el comportamiento de la fauna local en diferentes épocas. Utilizamos embarcaciones con motores revisados periódicamente, chalecos salvavidas certificados, radiocomunicación por VHF y kit completo de primeros auxilios a bordo. Los recorridos siguen protocolos ambientales y operacionales rigurosos definidos en conjunto con organismos de fiscalización regional. Además, monitoreamos diariamente el nivel del Río Cuiabá y las condiciones meteorológicas para adaptar los horarios y trayectos de cada salida, garantizando su seguridad sin comprometer la calidad y autenticidad de la experiencia en el bioma.",
      },
      {
        id: "eco-3",
        number: "03",
        question: "¿Qué animales es posible avistar durante los paseos?",
        answer: "El Pantanal está reconocido como uno de los biomas más ricos del planeta, albergando más de 4.700 especies catalogadas entre mamíferos, aves, reptiles, peces y plantas, lo que hace de cada salida al campo una oportunidad única e impredecible de contacto directo con la vida silvestre en estado puro. Durante las expediciones de Itaicy a lo largo del Río Cuiabá, es común avistar caimanes del Pantanal tomando sol en las orillas, grandes grupos de capibaras, nutrias gigantes pescando en los canales, tucanes, tuiuiús, araras-azuis, venados del pantanal y, con suerte, jaguares descansando a orillas del río o cruzando los canales. Las anacondas y diversas especies de búhos también aparecen con frecuencia en los safaris nocturnos. La diversidad varía entre las estaciones: en la seca, los animales se concentran cerca de los ríos, facilitando los avistamientos; en la época de lluvias, aves migratorias como espátulas rosadas y jabirús, además de la reproducción de peces, amplían el espectáculo natural.",
      },
      {
        id: "eco-4",
        number: "04",
        question: "¿Cuál es la mejor época para el ecoturismo en el Pantanal?",
        answer: "El Pantanal se transforma de forma marcada a lo largo del año, y cada estación ofrece experiencias únicas que atraen a viajeros con intereses distintos, desde fotógrafos de naturaleza hasta observadores de aves y familias en busca de aventura y conexión con el bioma. La temporada seca, de mayo a septiembre, es la más buscada: el nivel de los ríos baja considerablemente, los animales se concentran en los pocos puntos de agua remanentes y los avistamientos de caimanes, capibaras, nutrias gigantes y jaguares aumentan de forma significativa. La temporada lluviosa, de octubre a marzo, revela paisajes dramáticos con campos inundados hasta el horizonte, floración intensa de piúvas e ipês y la reproducción de peces y aves migratorias como la espátula rosada y el jabirú. Para fotografía de fauna, la seca es ideal. Para paisajes exuberantes y biodiversidad acuática en plena actividad, la transición entre estaciones ofrece el escenario más rico y sorprendente.",
      },
      {
        id: "eco-5",
        number: "05",
        question: "¿Se necesita preparación física para las actividades?",
        answer: "Nuestros paseos fueron cuidadosamente diseñados para brindar comodidad y accesibilidad al mayor número posible de huéspedes — desde niños a partir de cinco años acompañados por responsables hasta viajeros de la tercera edad — sin renunciar a la autenticidad y profundidad de la experiencia en el Pantanal. La mayoría de las actividades no requiere ninguna preparación física especial. Los paseos en barco por el Río Cuiabá, los safaris fotográficos y el safari nocturno son accesibles para todas las edades y condiciones físicas, ya que el desplazamiento se realiza completamente en embarcaciones estables y cómodas con asientos acolchados. Los senderos ecológicos por la selva ciliar tienen un nivel leve a moderado, con recorridos de hasta tres kilómetros en terreno predominantemente plano y sombreado. Siempre informamos el grado de dificultad, la duración estimada y las condiciones del trayecto antes de cada actividad, para que usted elija con tranquilidad el itinerario que mejor se adapte a su perfil, ritmo y expectativas.",
      },
    ],
  },
};

export const ecoturismoDefaults: LocalizedDefaults<"/ecoturismo"> = { pt, en, es };
