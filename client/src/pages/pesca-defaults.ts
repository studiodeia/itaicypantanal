import type { PescaPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: PescaPageContent = {
  hero: {
    label: "PESCA ESPORTIVA",
    heading: "Pesca Esportiva Cota Zero no Coração do Pantanal",
    subtitle:
      "Pioneiros no pesque e solte no Pantanal desde 2010. Navegue pelo Rio Cuiabá com guias nativos que dominam cada corredeira, poção e ponto de emboscada do Dourado.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/pesca-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "A experiência de quem ", isHighlight: false },
      { text: "desbravou a Amazônia", isHighlight: true },
      {
        text: ", agora no Pantanal. Operamos com respeito absoluto ao peixe e foco total na sua ",
        isHighlight: false,
      },
      { text: "performance esportiva", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NOSSA FILOSOFIA",
    heading: "Alta Performance e Preservação",
    body: [
      "Trazemos ao Pantanal a expertise técnica de nossas 13 operações na Amazônia. Nossa estrutura é desenhada para o pescador esportivo que busca desafio técnico e troféus, em um ambiente onde os gigantes do rio são respeitados e a conservação é prioridade.",
      "Fomos pioneiros no pesque e solte no Pantanal em 2010, quando não havia legislação sobre o tema. Nossa atuação ajudou a definir os padrões atuais de conservação que protegem os rios da região até hoje.",
      "Todo o peixe consumido na Itaicy vem de piscicultura local parceira. Nunca retiramos peixes dos rios — um compromisso inegociável com o ecossistema pantaneiro.",
    ],
    image: "/images/pesca-about-1",
    features: [
      {
        number: "01",
        title: "Cota Zero (Pesque e Solte)",
        description:
          "Praticamos rigorosamente a conservação. O peixe é um troféu vivo que retorna ao rio, garantindo o equilíbrio do ecossistema e o futuro do esporte.",
      },
      {
        number: "02",
        title: "Piscicultura Responsável",
        description:
          "Todo o peixe servido na Itaicy vem de piscicultura local. Nunca retiramos peixes dos rios — respeito total ao ecossistema.",
      },
      {
        number: "03",
        title: "Guias de Pesca Nativos",
        description:
          "Nossos guias nasceram na região e dominam a leitura do rio. Eles conhecem os pontos de caça do Dourado e as técnicas para maximizar sua performance.",
      },
    ],
  },
  highlights: {
    heading: "Por que pescar na Itaicy?",
    items: [
      {
        iconName: "Star",
        title: "Expertise de 13 Operações",
        description:
          "Trazemos o know-how de nossa rede de 13 pousadas flutuantes na Amazônia para garantir uma logística impecável.",
      },
      {
        iconName: "Sailboat",
        title: "Rio Cuiabá Preservado",
        description:
          "Pescamos em rios onde a biodiversidade é monitorada e os peixes crescem em equilíbrio natural, com acesso facilitado a apenas 1h de Cuiabá.",
      },
      {
        iconName: "Fish",
        title: "O Reino do Dourado",
        description:
          "Nossa localização estratégica é o habitat ideal para o 'Rei do Rio', proporcionando batalhas inesquecíveis.",
      },
    ],
  },
  services: {
    label: "O SANTUÁRIO",
    heading: "Os Gigantes do Nosso Rio",
    description:
      "O Dourado é o rei, mas não reina sozinho. Nossas águas abrigam uma variedade incrível de desafios esportivos. Conheça seus adversários.",
    items: [
      {
        title: "Pintado",
        description:
          "O maior predador dos rios pantaneiros. O pintado (surubim) pode ultrapassar 20 quilos e é famoso por sua resistência e batalhas memoráveis nas profundezas do Rio Cuiabá.",
        image: "/images/pesca-fish-1",
      },
      {
        title: "Piraputanga",
        description:
          "Endêmica do Rio Cuiabá, a piraputanga é ágil, agressiva e desafiadora com iscas artificiais. Um troféu menor em tamanho, mas imbatível em adrenalina.",
        image: "/images/pesca-fish-2",
      },
      {
        title: "Pacu",
        description:
          "Um peixe de enorme resistência, o pacu é alvo de muitas pescarias e surpreende pela força e velocidade nos arranques.",
        image: "/images/pesca-fish-3",
      },
      {
        title: "Dourado",
        description:
          "Considerado o rei dos rios, o dourado é famoso por sua luta intensa, saltos acrobáticos e é o troféu mais procurado na pesca esportiva pantaneira.",
        image: "/images/pesca-fish-4",
      },
    ],
    buttonText: "Ver guia de espécies completo",
    buttonHref: "#",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Dúvidas sobre Pesca Esportiva",
    description: "Respondemos as principais perguntas sobre a operação de pesca no Pantanal da Itaicy.",
    items: [
      {
        id: "pesca-1",
        number: "01",
        question: "Qual é a melhor época para pescar no Pantanal?",
        answer: "O Pantanal possui uma sazonalidade bem definida que influencia diretamente a qualidade da pesca esportiva ao longo de todo o ano. A temporada de pesca vai de fevereiro a setembro, e o período de seca, entre junho e setembro, é amplamente reconhecido como o mais produtivo. Durante esses meses, o nível dos rios baixa consideravelmente, e os peixes se concentram em poções e confluências, tornando as capturas mais frequentes e as batalhas mais intensas. O pico de atividade do Dourado, nosso principal troféu, ocorre entre junho e agosto, quando a água atinge temperaturas ideais e os cardumes se agrupam em pontos estratégicos de caça. Para o Pintado e o Cachara, o melhor período se estende até agosto e setembro, quando esses predadores noturnos se tornam mais ativos nas águas rasas. Nossos guias ajustam as estratégias conforme a fase da temporada para maximizar sua experiência.",
      },
      {
        id: "pesca-2",
        number: "02",
        question: "O que significa pesca cota zero (pesque e solte)?",
        answer: "A política de cota zero é um pilar central da pesca esportiva responsável e representa o compromisso da Itaicy com a conservação do ecossistema pantaneiro. Cota zero significa que todo peixe capturado durante a pescaria é cuidadosamente manuseado e devolvido vivo ao rio. Não há retirada de peixes em nenhuma circunstância. Essa prática garante a manutenção saudável das populações de Dourado, Pintado, Pacu e demais espécies, preservando o equilíbrio ecológico das águas e assegurando a perpetuação da pesca esportiva para futuras gerações de pescadores. Nossos guias são treinados em técnicas de manuseio que minimizam o estresse no peixe, incluindo uso de anzóis sem farpa, alicates de soltura rápida e tempo controlado fora da água para registros fotográficos. Na Itaicy, o Projeto Cota Zero é rigorosamente cumprido e fiscalizado, reafirmando que o verdadeiro troféu é a experiência da batalha e o respeito ao rio.",
      },
      {
        id: "pesca-3",
        number: "03",
        question: "Quais espécies posso pescar na Itaicy?",
        answer: "Os rios que cercam a Itaicy estão entre os mais biodiversos do Pantanal, oferecendo ao pescador esportivo uma variedade impressionante de adversários aquáticos. As principais espécies-alvo são o Dourado, conhecido como o 'Rei do Rio' por sua força explosiva e saltos acrobáticos; o Pintado e o Cachara, grandes predadores de fundo que podem ultrapassar 20 quilos; o Pacu, famoso pela resistência e arranques potentes; a Piraputanga, ágil e desafiadora com iscas artificiais; e o Barbado, que proporciona brigas longas em águas profundas. No total, nossos rios abrigam mais de 260 espécies catalogadas de peixes, criando um ecossistema rico e equilibrado. Nossos guias adaptam as técnicas e equipamentos conforme a espécie desejada, garantindo que cada saída de pesca ofereça um desafio esportivo único e memorável para pescadores de todos os níveis.",
      },
      {
        id: "pesca-4",
        number: "04",
        question: "Preciso levar meu próprio equipamento de pesca?",
        answer: "Sabemos que cada pescador tem suas preferências pessoais de equipamento, e nossa operação é flexível para atender tanto quem viaja leve quanto quem traz seu próprio arsenal. Não é obrigatório trazer equipamento. Oferecemos um arsenal completo de alta performance que inclui varas de ação média e pesada, carretilhas de perfil baixo, linhas multifilamento e uma seleção variada de iscas artificiais como plugs de superfície, jerkbaits e colheres, todas escolhidas especificamente para as espécies da região. Porém, se você possui equipamento próprio e prefere utilizá-lo, é totalmente bem-vindo a trazê-lo. Muitos pescadores experientes preferem suas varas e carretilhas já ajustadas ao seu estilo de arremesso. Nossos guias podem orientar sobre o melhor setup para cada espécie alvo e condição do rio, recomendando ajustes de drag, tipo de linha e iscas ideais conforme o nível da água e o comportamento dos peixes naquele período.",
      },
      {
        id: "pesca-5",
        number: "05",
        question: "Os guias de pesca são locais?",
        answer: "A qualidade dos guias de pesca é um dos fatores que mais influenciam o sucesso de uma expedição esportiva, e na Itaicy esse é um diferencial inegociável. Sim, todos os nossos guias de pesca nasceram e cresceram na região pantaneira. Eles possuem um conhecimento profundo e transmitido por gerações sobre os rios, os hábitos alimentares e reprodutivos dos peixes e as melhores técnicas para cada situação. Dominam a leitura do rio com precisão, identificando correntezas, estruturas submersas e pontos de emboscada onde os grandes exemplares de Dourado, Pintado e Cachara se concentram em cada época do ano. Além da expertise técnica, nossos guias conhecem os ciclos sazonais de cheia e seca, ajustando rotas e estratégias diariamente. Essa combinação de vivência local e dedicação ao esporte garante que você esteja sempre no lugar certo, na hora certa, com a técnica adequada.",
      },
    ],
  },
};

const en: PescaPageContent = {
  hero: {
    label: "SPORT FISHING",
    heading: "Catch-and-Release Sport Fishing in the Heart of the Pantanal",
    subtitle:
      "Pioneers in catch-and-release in the Pantanal since 2010. Navigate the Rio Cuiabá with native guides who know every current, pool, and Dourado ambush point.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/pesca-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "The expertise of those who ", isHighlight: false },
      { text: "explored the Amazon", isHighlight: true },
      {
        text: ", now in the Pantanal. We operate with absolute respect for the fish and total focus on your ",
        isHighlight: false,
      },
      { text: "sporting performance", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "OUR PHILOSOPHY",
    heading: "High Performance and Preservation",
    body: [
      "We bring to the Pantanal the technical expertise from our 13 operations in the Amazon. Our setup is designed for the sport angler seeking technical challenge and trophy fish, in an environment where the river giants are respected and conservation is the priority.",
      "We were pioneers in catch-and-release fishing in the Pantanal in 2010, when no legislation on the subject existed. Our advocacy helped define the conservation standards that protect the region's rivers today.",
      "All fish consumed at Itaicy comes from local partner aquaculture farms. We never take fish from the rivers — a non-negotiable commitment to the Pantanal ecosystem.",
    ],
    image: "/images/pesca-about-1",
    features: [
      {
        number: "01",
        title: "Catch-and-Release (Zero Quota)",
        description:
          "We rigorously practice conservation. The fish is a living trophy that returns to the river, ensuring ecosystem balance and the future of the sport.",
      },
      {
        number: "02",
        title: "Responsible Aquaculture",
        description:
          "All fish served at Itaicy comes from local aquaculture. We never take fish from the rivers — total respect for the ecosystem.",
      },
      {
        number: "03",
        title: "Native Fishing Guides",
        description:
          "Our guides were born in the region and master reading the river. They know the Dourado's hunting spots and the techniques to maximize your performance.",
      },
    ],
  },
  highlights: {
    heading: "Why fish at Itaicy?",
    items: [
      {
        iconName: "Star",
        title: "Expertise from 13 Operations",
        description:
          "We bring the know-how from our network of 13 floating lodges in the Amazon to guarantee impeccable logistics.",
      },
      {
        iconName: "Sailboat",
        title: "Preserved Rio Cuiabá",
        description:
          "We fish in rivers where biodiversity is monitored and fish thrive in natural balance, with easy access just 1h from Cuiabá.",
      },
      {
        iconName: "Fish",
        title: "The Kingdom of the Dourado",
        description:
          "Our strategic location is the ideal habitat for the 'King of the River', providing unforgettable battles.",
      },
    ],
  },
  services: {
    label: "THE SANCTUARY",
    heading: "The Giants of Our River",
    description:
      "The Dourado is the king, but he does not reign alone. Our waters harbor an incredible variety of sporting challenges. Meet your adversaries.",
    items: [
      {
        title: "Pintado",
        description:
          "The largest predator of the Pantanal rivers. The pintado (surubim) can exceed 20 kilos and is famous for its endurance and memorable battles in the depths of the Rio Cuiabá.",
        image: "/images/pesca-fish-1",
      },
      {
        title: "Piraputanga",
        description:
          "Endemic to the Rio Cuiabá, the piraputanga is agile, aggressive, and thrilling on artificial lures. A smaller trophy in size, but unbeatable in adrenaline.",
        image: "/images/pesca-fish-2",
      },
      {
        title: "Pacu",
        description:
          "A fish of remarkable endurance, the pacu surprises with its strength and powerful bursts — a staple of Pantanal sport fishing.",
        image: "/images/pesca-fish-3",
      },
      {
        title: "Dourado",
        description:
          "Considered the king of rivers, the dourado is famous for its intense fight, acrobatic leaps, and is the most sought-after trophy in Pantanal sport fishing.",
        image: "/images/pesca-fish-4",
      },
    ],
    buttonText: "View full species guide",
    buttonHref: "#",
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about Sport Fishing",
    description: "We answer the main questions about the fishing operation in the Pantanal at Itaicy.",
    items: [
      {
        id: "pesca-1",
        number: "01",
        question: "What is the best time to fish in the Pantanal?",
        answer: "The Pantanal has a well-defined seasonality that directly influences the quality of sport fishing throughout the year. The fishing season runs from February to September, and the dry period, between June and September, is widely recognized as the most productive. During these months, river levels drop considerably, and fish concentrate in pools and confluences, making catches more frequent and battles more intense. The peak activity of the Dourado, our main trophy, occurs between June and August, when the water reaches ideal temperatures and schools gather at strategic hunting points. For pintado and cachara, the best period extends to August and September, when these nocturnal predators become more active in shallow waters. Our guides adjust strategies according to the season phase to maximize your experience.",
      },
      {
        id: "pesca-2",
        number: "02",
        question: "What does catch-and-release (zero quota) mean?",
        answer: "The catch-and-release policy is a central pillar of responsible sport fishing and represents Itaicy's commitment to conserving the Pantanal ecosystem. Catch-and-release means that every fish caught during a fishing trip is carefully handled and returned alive to the river. No fish are removed under any circumstances. This practice ensures the healthy maintenance of dourado, pintado, pacu, and other species populations, preserving the ecological balance of the waters and securing the perpetuation of sport fishing for future generations of anglers. Our guides are trained in handling techniques that minimize stress on the fish, including the use of barbless hooks, quick-release pliers, and controlled time out of the water for photographic records. At Itaicy, the catch-and-release project is rigorously upheld and monitored, reaffirming that the true trophy is the experience of the battle and respect for the river.",
      },
      {
        id: "pesca-3",
        number: "03",
        question: "What species can I fish at Itaicy?",
        answer: "The rivers surrounding Itaicy are among the most biodiverse in the Pantanal, offering the sport angler an impressive variety of aquatic adversaries. The main target species are the Dourado, known as the 'King of the River' for its explosive strength and acrobatic leaps; the pintado and cachara, large bottom predators that can exceed 20 kilos; the pacu, famous for its resistance and powerful bursts; the piraputanga, agile and challenging with artificial lures; and the barbado, which provides long battles in deep waters. In total, our rivers harbor over 260 catalogued fish species, creating a rich and balanced ecosystem. Our guides adapt techniques and equipment according to the desired species, ensuring that each fishing outing offers a unique and memorable sporting challenge for anglers of all levels.",
      },
      {
        id: "pesca-4",
        number: "04",
        question: "Do I need to bring my own fishing equipment?",
        answer: "We know that every angler has personal equipment preferences, and our operation is flexible to accommodate both those who travel light and those who bring their own arsenal. Bringing equipment is not mandatory. We offer a complete high-performance arsenal that includes medium and heavy action rods, low-profile baitcasting reels, braided lines, and a varied selection of artificial lures such as surface plugs, jerkbaits, and spoons, all chosen specifically for the species of the region. However, if you have your own equipment and prefer to use it, you are most welcome to bring it. Many experienced anglers prefer their own rods and reels already adjusted to their casting style. Our guides can advise on the best setup for each target species and river condition, recommending drag adjustments, line type, and ideal lures according to the water level and fish behavior at that time.",
      },
      {
        id: "pesca-5",
        number: "05",
        question: "Are the fishing guides locals?",
        answer: "The quality of fishing guides is one of the factors that most influences the success of a sport expedition, and at Itaicy this is a non-negotiable differentiator. Yes, all our fishing guides were born and raised in the Pantanal region. They possess deep knowledge passed down through generations about the rivers, the feeding and reproductive habits of the fish, and the best techniques for each situation. They master reading the river with precision, identifying currents, submerged structures, and ambush points where large specimens of dourado, pintado, and cachara concentrate at different times of the year. In addition to technical expertise, our guides know the seasonal flood and drought cycles, adjusting routes and strategies daily. This combination of local experience and dedication to the sport ensures you are always in the right place, at the right time, with the right technique.",
      },
    ],
  },
};

const es: PescaPageContent = {
  hero: {
    label: "PESCA DEPORTIVA",
    heading: "Pesca Deportiva Captura y Suelta en el Corazón del Pantanal",
    subtitle:
      "Pioneros en la pesca captura y suelta en el Pantanal desde 2010. Navega por el Río Cuiabá con guías nativos que conocen cada corriente, pozo y punto de emboscada del Dourado.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/pesca-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "La experiencia de quienes ", isHighlight: false },
      { text: "exploraron la Amazonia", isHighlight: true },
      {
        text: ", ahora en el Pantanal. Operamos con absoluto respeto al pez y foco total en tu ",
        isHighlight: false,
      },
      { text: "rendimiento deportivo", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NUESTRA FILOSOFÍA",
    heading: "Alto Rendimiento y Preservación",
    body: [
      "Traemos al Pantanal la pericia técnica de nuestras 13 operaciones en la Amazonia. Nuestra estructura está diseñada para el pescador deportivo que busca desafío técnico y trofeos, en un ambiente donde los gigantes del río son respetados y la conservación es prioridad.",
      "Fuimos pioneros en la pesca captura y suelta en el Pantanal en 2010, cuando no existía legislación al respecto. Nuestra actuación ayudó a definir los estándares de conservación que protegen los ríos de la región hasta hoy.",
      "Todo el pez consumido en Itaicy proviene de piscicultura local asociada. Nunca extraemos peces de los ríos — un compromiso innegociable con el ecosistema pantanero.",
    ],
    image: "/images/pesca-about-1",
    features: [
      {
        number: "01",
        title: "Cuota Cero (Pesca y Suelta)",
        description:
          "Practicamos rigurosamente la conservación. El pez es un trofeo vivo que regresa al río, garantizando el equilibrio del ecosistema y el futuro del deporte.",
      },
      {
        number: "02",
        title: "Acuicultura Responsable",
        description:
          "Todo el pez servido en Itaicy proviene de piscicultura local. Nunca extraemos peces de los ríos — respeto total al ecosistema.",
      },
      {
        number: "03",
        title: "Guías de Pesca Nativos",
        description:
          "Nuestros guías nacieron en la región y dominan la lectura del río. Conocen los puntos de caza del Dourado y las técnicas para maximizar tu rendimiento.",
      },
    ],
  },
  highlights: {
    heading: "¿Por qué pescar en Itaicy?",
    items: [
      {
        iconName: "Star",
        title: "Experiencia de 13 Operaciones",
        description:
          "Traemos el know-how de nuestra red de 13 posadas flotantes en la Amazonia para garantizar una logística impecable.",
      },
      {
        iconName: "Sailboat",
        title: "Río Cuiabá Preservado",
        description:
          "Pescamos en ríos donde la biodiversidad es monitoreada y los peces crecen en equilibrio natural, con acceso fácil a solo 1h de Cuiabá.",
      },
      {
        iconName: "Fish",
        title: "El Reino del Dourado",
        description:
          "Nuestra ubicación estratégica es el hábitat ideal para el 'Rey del Río', proporcionando batallas inolvidables.",
      },
    ],
  },
  services: {
    label: "EL SANTUARIO",
    heading: "Los Gigantes de Nuestro Río",
    description:
      "El Dourado es el rey, pero no reina solo. Nuestras aguas albergan una increíble variedad de desafíos deportivos. Conoce a tus adversarios.",
    items: [
      {
        title: "Pintado",
        description:
          "El mayor depredador de los ríos pantaneros. El pintado (surubim) puede superar los 20 kilos y es famoso por su resistencia y batallas memorables en las profundidades del Río Cuiabá.",
        image: "/images/pesca-fish-1",
      },
      {
        title: "Piraputanga",
        description:
          "Endémica del Río Cuiabá, la piraputanga es ágil, agresiva y desafiante con señuelos artificiales. Un trofeo menor en tamaño, pero insuperable en adrenalina.",
        image: "/images/pesca-fish-2",
      },
      {
        title: "Pacu",
        description:
          "Un pez de notable resistencia, el pacu sorprende con su fuerza y arranques potentes — un clásico de la pesca deportiva pantanera.",
        image: "/images/pesca-fish-3",
      },
      {
        title: "Dourado",
        description:
          "Considerado el rey de los ríos, el dourado es famoso por su intensa lucha, saltos acrobáticos y es el trofeo más buscado en la pesca deportiva del Pantanal.",
        image: "/images/pesca-fish-4",
      },
    ],
    buttonText: "Ver guía de especies completa",
    buttonHref: "#",
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Preguntas sobre Pesca Deportiva",
    description: "Respondemos las principales preguntas sobre la operación de pesca en el Pantanal de Itaicy.",
    items: [
      {
        id: "pesca-1",
        number: "01",
        question: "¿Cuál es la mejor época para pescar en el Pantanal?",
        answer: "El Pantanal tiene una estacionalidad bien definida que influye directamente en la calidad de la pesca deportiva a lo largo de todo el año. La temporada de pesca va de febrero a septiembre, y el período seco, entre junio y septiembre, es ampliamente reconocido como el más productivo. Durante estos meses, el nivel de los ríos baja considerablemente, y los peces se concentran en pozas y confluencias, haciendo que las capturas sean más frecuentes y las batallas más intensas. El pico de actividad del Dourado, nuestro principal trofeo, ocurre entre junio y agosto, cuando el agua alcanza temperaturas ideales y los cardúmenes se agrupan en puntos estratégicos de caza. Para el pintado y el cachara, el mejor período se extiende hasta agosto y septiembre, cuando estos predadores nocturnos se vuelven más activos en aguas poco profundas. Nuestros guías ajustan las estrategias según la fase de la temporada para maximizar tu experiencia.",
      },
      {
        id: "pesca-2",
        number: "02",
        question: "¿Qué significa pesca cuota cero (pesca y suelta)?",
        answer: "La política de cuota cero es un pilar central de la pesca deportiva responsable y representa el compromiso de Itaicy con la conservación del ecosistema pantanero. Cuota cero significa que todo pez capturado durante la pesca es manejado con cuidado y devuelto vivo al río. No se retiran peces bajo ninguna circunstancia. Esta práctica garantiza el mantenimiento saludable de las poblaciones de dourado, pintado, pacu y demás especies, preservando el equilibrio ecológico de las aguas y asegurando la perpetuación de la pesca deportiva para futuras generaciones de pescadores. Nuestros guías están entrenados en técnicas de manejo que minimizan el estrés en el pez, incluyendo el uso de anzuelos sin barba, alicates de suelta rápida y tiempo controlado fuera del agua para registros fotográficos. En Itaicy, el Proyecto Cuota Cero se cumple y fiscaliza rigurosamente, reafirmando que el verdadero trofeo es la experiencia de la batalla y el respeto al río.",
      },
      {
        id: "pesca-3",
        number: "03",
        question: "¿Qué especies puedo pescar en Itaicy?",
        answer: "Los ríos que rodean Itaicy se encuentran entre los más biodiversos del Pantanal, ofreciendo al pescador deportivo una impresionante variedad de adversarios acuáticos. Las principales especies objetivo son el Dourado, conocido como el 'Rey del Río' por su fuerza explosiva y saltos acrobáticos; el pintado y el cachara, grandes predadores de fondo que pueden superar los 20 kilos; el pacu, famoso por su resistencia y arranques potentes; la piraputanga, ágil y desafiante con señuelos artificiales; y el barbado, que proporciona largas batallas en aguas profundas. En total, nuestros ríos albergan más de 260 especies catalogadas de peces, creando un ecosistema rico y equilibrado. Nuestros guías adaptan las técnicas y equipos según la especie deseada, garantizando que cada salida de pesca ofrezca un desafío deportivo único y memorable para pescadores de todos los niveles.",
      },
      {
        id: "pesca-4",
        number: "04",
        question: "¿Necesito traer mi propio equipo de pesca?",
        answer: "Sabemos que cada pescador tiene sus preferencias personales de equipo, y nuestra operación es flexible para atender tanto a quienes viajan ligero como a quienes traen su propio arsenal. No es obligatorio traer equipo. Ofrecemos un arsenal completo de alto rendimiento que incluye cañas de acción media y pesada, carretillas de perfil bajo, líneas de multifilamento y una variada selección de señuelos artificiales como plugs de superficie, jerkbaits y cucharillas, todos elegidos específicamente para las especies de la región. Sin embargo, si tienes tu propio equipo y prefieres usarlo, eres bienvenido a traerlo. Muchos pescadores experimentados prefieren sus propias cañas y carretillas ya ajustadas a su estilo de lanzamiento. Nuestros guías pueden orientar sobre el mejor setup para cada especie objetivo y condición del río, recomendando ajustes de freno, tipo de línea y señuelos ideales según el nivel del agua y el comportamiento de los peces en ese período.",
      },
      {
        id: "pesca-5",
        number: "05",
        question: "¿Los guías de pesca son locales?",
        answer: "La calidad de los guías de pesca es uno de los factores que más influye en el éxito de una expedición deportiva, y en Itaicy esto es un diferencial innegociable. Sí, todos nuestros guías de pesca nacieron y crecieron en la región pantanera. Poseen un conocimiento profundo transmitido por generaciones sobre los ríos, los hábitos alimenticios y reproductivos de los peces y las mejores técnicas para cada situación. Dominan la lectura del río con precisión, identificando corrientes, estructuras sumergidas y puntos de emboscada donde los grandes ejemplares de dourado, pintado y cachara se concentran en cada época del año. Además de la pericia técnica, nuestros guías conocen los ciclos estacionales de crecida y seca, ajustando rutas y estrategias diariamente. Esta combinación de vivencia local y dedicación al deporte garantiza que siempre estés en el lugar correcto, en el momento correcto, con la técnica adecuada.",
      },
    ],
  },
};

export const pescaDefaults: LocalizedDefaults<"/pesca"> = { pt, en, es };
