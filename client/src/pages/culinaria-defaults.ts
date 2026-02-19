import type { CulinariaPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: CulinariaPageContent = {
  hero: {
    label: "CULINÁRIA",
    heading: "Onde o Pantanal Vira Alimento",
    subtitle:
      "Ingredientes da terra e da horta, técnica internacional e alma pantaneira em cada prato.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/culinaria/hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "A ", isHighlight: false },
      { text: "alma do Pantanal", isHighlight: true },
      {
        text: ", a técnica do mundo. Ingredientes regionais colhidos no dia, ",
        isHighlight: false,
      },
      { text: "técnicas de alta gastronomia", isHighlight: true },
      {
        text: " e o tempo que cada prato merece — uma cozinha autoral que honra a terra e surpreende o paladar.",
        isHighlight: false,
      },
    ],
  },
  menu: {
    label: "NOSSO MENU",
    heading: "Galeria de experiências",
    body: [
      "Navegue pelas categorias e explore tudo o que espera por você. Conheça as carnes já inclusas na sua Pensão Completa. Descubra também os doces caseiros e nossa seleção especial de vinhos e drinks.",
    ],
    image: "",
    features: [
      { number: "01", title: "Carnes", description: "" },
      { number: "02", title: "Entradas", description: "" },
      { number: "03", title: "Massas", description: "" },
      { number: "04", title: "Doces", description: "" },
      { number: "05", title: "Bebidas", description: "" },
    ],
  },
  highlights: {
    heading: "Da Horta e da Terra à Sua Mesa",
    items: [
      {
        iconName: "UtensilsCrossed",
        title: "Cozinha Autoral",
        description:
          "Pratos únicos que combinam técnica internacional com sabores genuinamente pantaneiros.",
      },
      {
        iconName: "Sprout",
        title: "Produtores Locais",
        description:
          "Parceria com fazendas e comunidades vizinhas que sustentam a cadeia produtiva da região.",
      },
      {
        iconName: "Flower2",
        title: "Horta da Casa",
        description:
          "Temperos e vegetais frescos colhidos diariamente da nossa própria horta orgânica.",
      },
    ],
  },
  services: {
    label: "NOSSOS SERVIÇOS",
    heading: "O Ciclo da Sua Imersão Gastronômica",
    description:
      "Da alvorada ao anoitecer, sua experiência gastronômica está inclusa e conectada à sua expedição.",
    items: [
      {
        title: "Café da Manhã Regional",
        description:
          "Desfrute de um café regional com frutas, pães artesanais e tapiocas.",
        image: "/images/culinaria-services-1",
      },
      {
        title: "Almoço no Refúgio",
        description: "",
        image: "/images/culinaria-services-2",
      },
      {
        title: "Jantar à Luz de Velas",
        description: "",
        image: "/images/culinaria-services-3",
      },
    ],
    buttonText: "Fazer uma reserva",
  },
  experience: {
    heading: "Sabor e Aconchego",
    body: [
      "O calor do fogo, o vinho, os sabores autênticos e o conforto de um refúgio no coração do Pantanal.",
    ],
    image: "/images/culinaria-experience-bg.webp",
  },
  crossSell: {
    heading: "O refúgio completo",
    description:
      "Agora que conheceu nossa cozinha, encontre a acomodação perfeita para sua imersão no Pantanal.",
    buttonText: "Conhecer acomodações",
    buttonHref: "/acomodacoes",
    image: "/images/culinaria-crosssell-2",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Dúvidas sobre a Culinária Pantaneira",
    description: "Tudo o que você precisa saber sobre a gastronomia e as refeições na Itaicy.",
    items: [
      {
        id: "culinaria-1",
        number: "01",
        question: "As refeições estão inclusas na hospedagem?",
        answer: "A gastronomia é parte central da experiência no Itaicy, pensada para que o hóspede aproveite cada momento sem preocupações com custos extras de alimentação durante toda a estadia. Sim, todas as refeições estão inclusas no regime de Pensão Completa: café da manhã com frutas regionais, pães artesanais, tapiocas recheadas e sucos naturais; almoço com pratos autorais de carnes e ingredientes regionais servidos em mesa compartilhada; e jantar com menu degustação que varia a cada noite conforme a sazonalidade dos ingredientes. Além das três refeições principais, oferecemos lanches durante os passeios, como sanduíches naturais, barras de castanha e água fresca, garantindo energia ao longo de cada expedição. Dietas especiais como vegetariana, vegana, sem glúten ou sem lactose são atendidas com prazer, desde que informadas no momento da reserva para que nossa equipe de cozinha prepare opções personalizadas com ingredientes frescos e de origem local.",
      },
      {
        id: "culinaria-2",
        number: "02",
        question: "Quais pratos típicos do Pantanal são servidos?",
        answer: "O Pantanal possui uma tradição culinária rica e singular, moldada pela vida nas fazendas e pela influência das culturas indígena, paraguaia e dos tropeiros que cruzaram a região por séculos, criando uma identidade gastronômica única no Brasil. Nosso cardápio celebra essa herança com pratos como arroz carreteiro com carne seca desfiada e temperado com cebolinha da horta, farofa de banana-da-terra tostada na manteiga, picadinho pantaneiro com mandioca e temperos frescos e cortes nobres grelhados ao modo regional. Também servimos chipa caseira, inspirada na receita tradicional paraguaia, e sobremesas artesanais com frutas nativas do cerrado como bocaiuva, guavira e cumbaru. Cada prato é preparado com ingredientes colhidos no dia, muitos vindos de produtores locais de Miranda e Bonito, garantindo frescor absoluto e valorizando a economia da comunidade pantaneira.",
      },
      {
        id: "culinaria-3",
        number: "03",
        question: "Vocês servem bebidas alcoólicas?",
        answer: "O momento das refeições no Itaicy é também uma oportunidade para explorar sabores regionais na forma de bebidas exclusivas, pensadas para complementar e harmonizar com cada prato do cardápio ao longo do dia. Sim, oferecemos uma seleção cuidadosa de vinhos tintos e brancos de vinícolas brasileiras e sul-americanas, cervejas artesanais de microprodução regional e drinks autorais criados pela nossa equipe de bar. Entre os destaques estão caipirinhas de bocaiuva, gin tônicas com ervas frescas da horta e um drink especial de tereré com limão e hortelã, perfeito para tardes quentes. Sucos naturais de frutas como manga, acerola, caju e guavira estão sempre disponíveis e são inclusos na Pensão Completa sem nenhum custo adicional. O consumo de rótulos premium de vinhos importados e destilados especiais pode ter custo à parte, dependendo do pacote contratado. Nossa carta de bebidas é atualizada sazonalmente para acompanhar a disponibilidade dos ingredientes frescos da região.",
      },
      {
        id: "culinaria-4",
        number: "04",
        question: "De onde vêm os ingredientes usados na cozinha?",
        answer: "A procedência dos ingredientes é um dos pilares da nossa proposta gastronômica, porque acreditamos que um prato excepcional começa muito antes do preparo, na escolha cuidadosa da matéria-prima e no respeito à cadeia produtiva local que sustenta a região. Priorizamos ingredientes regionais e sazonais em todas as refeições servidas no lodge. As carnes bovinas são de fazendas da região de Miranda com certificação de boas práticas de manejo. Temperos frescos como cebolinha, salsinha, manjericão e pimenta-de-cheiro são colhidos diariamente da nossa própria horta orgânica mantida pela equipe do lodge. Frutas nativas como bocaiuva e guavira vêm de coletores comunitários da região. Essa rastreabilidade rigorosa garante frescor máximo, qualidade constante em cada prato e gera impacto econômico positivo e direto nas famílias da comunidade local.",
      },
      {
        id: "culinaria-5",
        number: "05",
        question: "A cozinha atende restrições alimentares?",
        answer: "Sabemos que cada hóspede tem necessidades alimentares diferentes, e a experiência gastronômica no Itaicy deve ser plenamente inclusiva para que todos possam desfrutar dos sabores autênticos do Pantanal com total tranquilidade e segurança. Sim, nossa equipe de cozinha é treinada para adaptar o cardápio completo a diversas restrições alimentares, incluindo vegetarianismo, veganismo, intolerância a glúten, intolerância a lactose, alergias a frutos do mar ou a oleaginosas e outras necessidades clínicas específicas. Preparamos versões alternativas dos pratos do dia utilizando ingredientes frescos e substituições criativas, como farinhas de mandioca e polvilho no lugar do trigo, leites vegetais de castanha da região e pratos proteicos elaborados à base de leguminosas e cogumelos. Basta nos informar no momento da reserva ou até 48 horas antes da chegada para que nossa brigada de cozinha organize um plano alimentar personalizado e seguro para cada refeição ao longo de toda a sua estadia no lodge.",
      },
    ],
  },
};

const en: CulinariaPageContent = {
  hero: {
    label: "CUISINE",
    heading: "Where the Pantanal Becomes Food",
    subtitle:
      "Ingredients from land and kitchen garden, international technique and pantanal soul in every dish.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/culinaria/hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "The ", isHighlight: false },
      { text: "soul of the Pantanal", isHighlight: true },
      {
        text: ", the technique of the world. Regionally sourced ingredients harvested daily, ",
        isHighlight: false,
      },
      { text: "haute cuisine techniques", isHighlight: true },
      {
        text: " and the time each dish deserves — an original cuisine that honors the land and surprises the palate.",
        isHighlight: false,
      },
    ],
  },
  menu: {
    label: "OUR MENU",
    heading: "Gallery of experiences",
    body: [
      "Browse the categories and explore everything that awaits you. Discover the meats already included in your Full Board plan. Also find our homemade desserts and special selection of wines and cocktails.",
    ],
    image: "",
    features: [
      { number: "01", title: "Meats", description: "" },
      { number: "02", title: "Starters", description: "" },
      { number: "03", title: "Pasta", description: "" },
      { number: "04", title: "Desserts", description: "" },
      { number: "05", title: "Beverages", description: "" },
    ],
  },
  highlights: {
    heading: "From Garden and Land to Your Table",
    items: [
      {
        iconName: "UtensilsCrossed",
        title: "Signature Cuisine",
        description:
          "Unique dishes that blend international technique with genuinely pantanal flavors.",
      },
      {
        iconName: "Sprout",
        title: "Local Producers",
        description:
          "A partnership with neighboring farms and communities that sustain the region's supply chain.",
      },
      {
        iconName: "Flower2",
        title: "Kitchen Garden",
        description:
          "Fresh herbs and vegetables harvested daily from our own organic garden.",
      },
    ],
  },
  services: {
    label: "OUR SERVICES",
    heading: "The Cycle of Your Gastronomic Immersion",
    description:
      "From dawn to dusk, your gastronomic experience is included and connected to your expedition.",
    items: [
      {
        title: "Regional Breakfast",
        description:
          "Enjoy a regional breakfast with fruits, artisan breads and tapiocas.",
        image: "/images/culinaria-services-1",
      },
      {
        title: "Lunch at the Lodge",
        description: "",
        image: "/images/culinaria-services-2",
      },
      {
        title: "Candlelit Dinner",
        description: "",
        image: "/images/culinaria-services-3",
      },
    ],
    buttonText: "Make a reservation",
  },
  experience: {
    heading: "Flavor and Comfort",
    body: [
      "The warmth of the fire, the wine, the authentic flavors and the comfort of a retreat in the heart of the Pantanal.",
    ],
    image: "/images/culinaria-experience-bg.webp",
  },
  crossSell: {
    heading: "The complete lodge",
    description:
      "Now that you've discovered our cuisine, find the perfect accommodation for your Pantanal immersion.",
    buttonText: "Explore accommodations",
    buttonHref: "/acomodacoes",
    image: "/images/culinaria-crosssell-2",
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Questions about Pantanal Cuisine",
    description: "Everything you need to know about gastronomy and meals at Itaicy.",
    items: [
      {
        id: "culinaria-1",
        number: "01",
        question: "Are meals included in the stay?",
        answer: "Gastronomy is a central part of the Itaicy experience, designed so guests can enjoy every moment without worrying about extra food costs throughout their stay. Yes, all meals are included in the Full Board plan: breakfast with regional fruits, artisan breads, stuffed tapiocas and natural juices; lunch with signature meat and regional ingredient dishes served at a shared table; and dinner with a tasting menu that varies each night according to seasonal ingredients. In addition to the three main meals, we offer snacks during excursions — natural sandwiches, Brazil nut bars and fresh water — ensuring energy throughout each expedition. Special diets such as vegetarian, vegan, gluten-free or lactose-free are gladly accommodated, provided they are informed at the time of booking so that our kitchen team can prepare personalized options with fresh, locally sourced ingredients.",
      },
      {
        id: "culinaria-2",
        number: "02",
        question: "What typical Pantanal dishes are served?",
        answer: "The Pantanal has a rich and singular culinary tradition, shaped by life on the farms and the influence of indigenous, Paraguayan and tropeiro cultures that crossed the region for centuries, creating a unique gastronomic identity in Brazil. Our menu celebrates this heritage with dishes such as arroz carreteiro with shredded dried beef seasoned with garden chives, banana-da-terra farofa toasted in butter, pantanal-style picadinho with cassava and fresh herbs, and premium cuts of beef grilled in the regional style. We also serve homemade chipa, inspired by the traditional Paraguayan recipe, and artisan desserts with native cerrado fruits such as bocaiuva, guavira and cumbaru. Each dish is prepared with ingredients harvested on the day, many sourced from local producers in Miranda and Bonito, ensuring absolute freshness and supporting the pantanal community's economy.",
      },
      {
        id: "culinaria-3",
        number: "03",
        question: "Do you serve alcoholic beverages?",
        answer: "Mealtimes at Itaicy are also an opportunity to explore regional flavors through exclusive beverages, crafted to complement and pair with each dish on the menu throughout the day. Yes, we offer a curated selection of red and white wines from Brazilian and South American wineries, craft beers from regional microbreweries, and signature cocktails created by our bar team. Highlights include bocaiuva caipirinhas, gin tonics with fresh herbs from the garden, and a special tereré cocktail with lemon and mint, perfect for hot afternoons. Natural fruit juices — mango, acerola, cajú and guavira — are always available and included in the Full Board plan at no extra charge. Premium imported wine labels and special spirits may carry an additional cost depending on the package booked. Our drinks menu is updated seasonally to follow the availability of fresh regional ingredients.",
      },
      {
        id: "culinaria-4",
        number: "04",
        question: "Where do the ingredients used in the kitchen come from?",
        answer: "The sourcing of ingredients is one of the pillars of our culinary philosophy, because we believe an exceptional dish begins long before preparation — in the careful selection of raw materials and in respect for the local supply chain that sustains the region. We prioritize regional and seasonal ingredients in all meals served at the lodge. Beef comes from farms in the Miranda region with certified good husbandry practices. Fresh herbs such as chives, parsley, basil and chili pepper are harvested daily from our own organic kitchen garden maintained by the lodge team. Native fruits such as bocaiuva and guavira come from community foragers in the region. This rigorous traceability ensures maximum freshness, consistent quality in every dish, and generates direct positive economic impact for local community families.",
      },
      {
        id: "culinaria-5",
        number: "05",
        question: "Does the kitchen accommodate dietary restrictions?",
        answer: "We know that every guest has different dietary needs, and the gastronomic experience at Itaicy must be fully inclusive so that everyone can enjoy the authentic flavors of the Pantanal with complete peace of mind and safety. Yes, our kitchen team is trained to adapt the full menu to a wide range of dietary restrictions, including vegetarianism, veganism, gluten intolerance, lactose intolerance, seafood or tree nut allergies, and other specific clinical needs. We prepare alternative versions of the daily dishes using fresh ingredients and creative substitutions, such as cassava flour and tapioca starch instead of wheat, plant-based milks made from regional nuts, and protein-rich dishes based on legumes and mushrooms. Simply inform us at the time of booking or up to 48 hours before arrival so that our kitchen brigade can organize a personalized and safe meal plan for every meal throughout your entire stay at the lodge.",
      },
    ],
  },
};

const es: CulinariaPageContent = {
  hero: {
    label: "GASTRONOMÍA",
    heading: "Donde el Pantanal se Convierte en Alimento",
    subtitle:
      "Ingredientes de la tierra y el huerto, técnica internacional y alma pantanera en cada plato.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/culinaria/hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "El ", isHighlight: false },
      { text: "alma del Pantanal", isHighlight: true },
      {
        text: ", la técnica del mundo. Ingredientes regionales cosechados cada día, ",
        isHighlight: false,
      },
      { text: "técnicas de alta gastronomía", isHighlight: true },
      {
        text: " y el tiempo que cada plato merece — una cocina autoral que honra la tierra y sorprende el paladar.",
        isHighlight: false,
      },
    ],
  },
  menu: {
    label: "NUESTRO MENÚ",
    heading: "Galería de experiencias",
    body: [
      "Navegue por las categorías y explore todo lo que le espera. Conozca las carnes ya incluidas en su Pensión Completa. Descubra también los dulces caseros y nuestra selección especial de vinos y cócteles.",
    ],
    image: "",
    features: [
      { number: "01", title: "Carnes", description: "" },
      { number: "02", title: "Entradas", description: "" },
      { number: "03", title: "Pastas", description: "" },
      { number: "04", title: "Postres", description: "" },
      { number: "05", title: "Bebidas", description: "" },
    ],
  },
  highlights: {
    heading: "Del Huerto y la Tierra a Su Mesa",
    items: [
      {
        iconName: "UtensilsCrossed",
        title: "Cocina Autoral",
        description:
          "Platos únicos que combinan técnica internacional con sabores genuinamente pantaneros.",
      },
      {
        iconName: "Sprout",
        title: "Productores Locales",
        description:
          "Una alianza con granjas y comunidades vecinas que sostienen la cadena productiva de la región.",
      },
      {
        iconName: "Flower2",
        title: "Huerto de la Casa",
        description:
          "Hierbas y vegetales frescos cosechados diariamente de nuestro propio huerto orgánico.",
      },
    ],
  },
  services: {
    label: "NUESTROS SERVICIOS",
    heading: "El Ciclo de Su Inmersión Gastronómica",
    description:
      "Del amanecer al anochecer, su experiencia gastronómica está incluida y conectada a su expedición.",
    items: [
      {
        title: "Desayuno Regional",
        description:
          "Disfrute de un desayuno regional con frutas, panes artesanales y tapiocas.",
        image: "/images/culinaria-services-1",
      },
      {
        title: "Almuerzo en el Refugio",
        description: "",
        image: "/images/culinaria-services-2",
      },
      {
        title: "Cena a la Luz de las Velas",
        description: "",
        image: "/images/culinaria-services-3",
      },
    ],
    buttonText: "Hacer una reserva",
  },
  experience: {
    heading: "Sabor y Calidez",
    body: [
      "El calor del fuego, el vino, los sabores auténticos y el confort de un refugio en el corazón del Pantanal.",
    ],
    image: "/images/culinaria-experience-bg.webp",
  },
  crossSell: {
    heading: "El refugio completo",
    description:
      "Ahora que conoció nuestra cocina, encuentre el alojamiento perfecto para su inmersión en el Pantanal.",
    buttonText: "Conocer alojamientos",
    buttonHref: "/acomodacoes",
    image: "/images/culinaria-crosssell-2",
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "Dudas sobre la Gastronomía Pantanera",
    description: "Todo lo que necesita saber sobre la gastronomía y las comidas en Itaicy.",
    items: [
      {
        id: "culinaria-1",
        number: "01",
        question: "¿Las comidas están incluidas en el alojamiento?",
        answer: "La gastronomía es parte central de la experiencia en Itaicy, pensada para que el huésped disfrute cada momento sin preocuparse por costos extras de alimentación durante toda la estadía. Sí, todas las comidas están incluidas en el régimen de Pensión Completa: desayuno con frutas regionales, panes artesanales, tapiocas rellenas y jugos naturales; almuerzo con platos autorales de carnes e ingredientes regionales servidos en mesa compartida; y cena con menú degustación que varía cada noche según la estacionalidad de los ingredientes. Además de las tres comidas principales, ofrecemos meriendas durante los paseos — sándwiches naturales, barras de castaña y agua fresca — garantizando energía a lo largo de cada expedición. Las dietas especiales como vegetariana, vegana, sin gluten o sin lactosa se atienden con gusto, siempre que se informen en el momento de la reserva para que nuestro equipo de cocina prepare opciones personalizadas con ingredientes frescos de origen local.",
      },
      {
        id: "culinaria-2",
        number: "02",
        question: "¿Qué platos típicos del Pantanal se sirven?",
        answer: "El Pantanal posee una tradición culinaria rica y singular, moldeada por la vida en las estancias y la influencia de las culturas indígena, paraguaya y de los troperos que cruzaron la región durante siglos, creando una identidad gastronómica única en Brasil. Nuestro menú celebra esta herencia con platos como arroz carreteiro con carne seca deshebrada y sazonado con cebollín del huerto, farofa de banana-da-terra tostada en mantequilla, picadinho pantanero con yuca y hierbas frescas y cortes nobles a la parrilla al modo regional. También servimos chipa casera, inspirada en la receta tradicional paraguaya, y postres artesanales con frutas nativas del cerrado como bocaiuva, guavira y cumbaru. Cada plato se prepara con ingredientes cosechados el mismo día, muchos provenientes de productores locales de Miranda y Bonito, garantizando frescura absoluta y valorando la economía de la comunidad pantanera.",
      },
      {
        id: "culinaria-3",
        number: "03",
        question: "¿Sirven bebidas alcohólicas?",
        answer: "El momento de las comidas en Itaicy es también una oportunidad para explorar sabores regionales en forma de bebidas exclusivas, pensadas para complementar y maridar con cada plato del menú a lo largo del día. Sí, ofrecemos una selección cuidadosa de vinos tintos y blancos de viñedos brasileños y sudamericanos, cervezas artesanales de microcervecerías regionales y cócteles autorales creados por nuestro equipo de bar. Entre los destacados están caipirinhas de bocaiuva, gin tonics con hierbas frescas del huerto y un cóctel especial de tereré con limón y hierbabuena, perfecto para las tardes calurosas. Los jugos naturales de frutas como mango, acerola, cajú y guavira siempre están disponibles e incluidos en la Pensión Completa sin costo adicional. El consumo de etiquetas premium de vinos importados y destilados especiales puede tener un costo adicional según el paquete contratado. Nuestra carta de bebidas se actualiza estacionalmente para acompañar la disponibilidad de los ingredientes frescos de la región.",
      },
      {
        id: "culinaria-4",
        number: "04",
        question: "¿De dónde provienen los ingredientes de la cocina?",
        answer: "La procedencia de los ingredientes es uno de los pilares de nuestra propuesta gastronómica, porque creemos que un plato excepcional comienza mucho antes de la preparación — en la selección cuidadosa de la materia prima y en el respeto a la cadena productiva local que sostiene la región. Priorizamos ingredientes regionales y estacionales en todas las comidas servidas en el lodge. Las carnes bovinas provienen de estancias de la región de Miranda con certificación de buenas prácticas de manejo. Las hierbas frescas como cebollín, perejil, albahaca y ají dulce se cosechan diariamente de nuestro propio huerto orgánico mantenido por el equipo del lodge. Las frutas nativas como bocaiuva y guavira provienen de recolectores comunitarios de la región. Esta rigurosa trazabilidad garantiza frescura máxima, calidad constante en cada plato y genera un impacto económico positivo y directo en las familias de la comunidad local.",
      },
      {
        id: "culinaria-5",
        number: "05",
        question: "¿La cocina atiende restricciones alimentarias?",
        answer: "Sabemos que cada huésped tiene necesidades alimentarias diferentes, y la experiencia gastronómica en Itaicy debe ser plenamente inclusiva para que todos puedan disfrutar de los sabores auténticos del Pantanal con total tranquilidad y seguridad. Sí, nuestro equipo de cocina está capacitado para adaptar el menú completo a diversas restricciones alimentarias, incluyendo vegetarianismo, veganismo, intolerancia al gluten, intolerancia a la lactosa, alergias a mariscos o frutos secos y otras necesidades clínicas específicas. Preparamos versiones alternativas de los platos del día utilizando ingredientes frescos y sustituciones creativas, como harinas de mandioca y almidón de tapioca en lugar de trigo, leches vegetales de castaña de la región y platos proteicos elaborados a base de legumbres y hongos. Basta con informarnos en el momento de la reserva o hasta 48 horas antes de la llegada para que nuestra brigada de cocina organice un plan alimentario personalizado y seguro para cada comida a lo largo de toda su estadía en el lodge.",
      },
    ],
  },
};

export const culinariaDefaults: LocalizedDefaults<"/culinaria"> = { pt, en, es };
