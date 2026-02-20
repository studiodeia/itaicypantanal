import {
  defaultSharedCmsSections,
  type SharedCmsSections,
} from "@shared/cms-shared-content";
import type { Lang } from "@/i18n/context";

const enSharedCmsSections: SharedCmsSections = {
  immersionCta: {
    heading: "Your immersion in the wild Pantanal starts here.",
    description:
      "An authentic ecotourism, birdwatching or sport fishing experience awaits you. Select the dates of your expedition and secure your place in our refuge.",
    backgroundImage: "/images/culinaria-cta-bg.webp",
  },
  faq: {
    label: "FREQUENTLY ASKED QUESTIONS",
    heading: "Do you still have any questions?",
    description:
      "We answer the main questions so your only concern is enjoying the immersion in wild nature.",
    items: [
      {
        id: "item-1",
        number: "01",
        question: "Is the lodge only for fishing?",
        answer:
          "No. Itaicy offers sport fishing, birdwatching, ecotourism, and immersion experiences for families and couples.",
      },
      {
        id: "item-2",
        number: "02",
        question: "How does access to preserved areas work?",
        answer:
          "Our itineraries follow proprietary environmental and operational protocols to ensure safety and low impact on the biome.",
      },
      {
        id: "item-3",
        number: "03",
        question: "Are the experiences guided?",
        answer:
          "Yes. All activities are accompanied by specialized staff and guides with local knowledge.",
      },
      {
        id: "item-4",
        number: "04",
        question: "Is there an option for groups and families?",
        answer:
          "Yes. We have accommodation and itinerary configurations adapted for different traveler profiles.",
      },
      {
        id: "item-5",
        number: "05",
        question: "Can I customize my itinerary?",
        answer:
          "Yes. Our commercial team can adjust the package according to availability and the travel objective.",
      },
    ],
  },
  testimonials: {
    label: "TESTIMONIALS",
    heading: "Stories from those who lived the real immersion",
    description:
      "What our travelers say about the authentic experience of disconnecting in the wild nature of Itaicy Ecoturismo.",
    items: [
      {
        title: "Unforgettable experience",
        quote:
          '"Essential elegance in harmony with the biome. An authentic and deeply transformative experience."',
        author: "Lucas Vieira, BRA",
      },
      {
        title: "Impeccable service",
        quote:
          '"Prepared staff, excellent structure and itineraries with great environmental care. We will definitely return."',
        author: "Fernanda A., BRA",
      },
      {
        title: "Real connection with nature",
        quote:
          '"The birdwatching exceeded expectations. High-level organization, safety and curation."',
        author: "Rafael M., BRA",
      },
    ],
  },
  footer: {
    pousadaHeading: "LODGE",
    experienciasHeading: "EXPERIENCES",
    contactHeading: "CONTACT US",
    mobileNavLinks: [
      { label: "Lodge", href: "/" },
      { label: "Experiences", href: "/ecoturismo" },
      { label: "Contact us", href: "/contato" },
    ],
    pousadaLinks: [
      { label: "Home", href: "/" },
      { label: "Accommodations", href: "/acomodacoes" },
      { label: "Cuisine", href: "/culinaria" },
      { label: "Our Impact", href: "/nosso-impacto" },
      { label: "Blog", href: "/blog" },
    ],
    experienciasLinks: [
      { label: "Birdwatching", href: "/observacao-de-aves" },
      { label: "Sport Fishing", href: "/pesca" },
      { label: "Immersive Ecotourism", href: "/ecoturismo" },
    ],
    contactInfo: [
      { icon: "/images/icons/call.png", text: "+55 (65) 99999-9999" },
      { icon: "/images/icons/mail.png", text: "reservas@pousadaitaicy.com.br" },
      {
        icon: "/images/icons/location-on.png",
        text: "Santo Antônio do Leverger, Mato Grosso, Brazil",
      },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/politica-de-privacidade" },
      { label: "Cookie Policy", href: "/politica-de-privacidade" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Terms of Use", href: "/politica-de-privacidade" },
    ],
    heading: "The Pantanal as you have never felt it.",
    newsletterLabel: "Itaicy Field Journal",
    newsletterInterests: ["I want to Fish", "I want Nature", "Family Trip", "I want to Rest"],
    newsletterInputPlaceholder: "Your e-mail",
    newsletterButtonLabel: "Subscribe",
    bottomDescription:
      "A genuine and sophisticated refuge in the heart of the Pantanal. Authentic experiences for those who seek nature, comfort and authenticity.",
    copyright: "© 2026 Itaicy Pantanal Eco Lodge. All rights reserved.",
  },
  homeHero: {
    heading: "Live the Pantanal",
    headingAccent: "Authentic.",
    subtitle:
      "Essential elegance in harmony with the biome. An authentic immersion experience, without excess and without concessions.",
    bookingHeading: "Find a special date",
    bookingDescription:
      "Select your stay period to check availability.",
    bookingStep1Label: "Step 1:",
    bookingDisclaimer: "We guarantee the best price for direct bookings.",
    bookingDisclaimerPrefix: "Rates include",
    bookingDisclaimerHighlight: "Premium All-Inclusive",
  },
  homeManifesto: {
    label: "MANIFESTO",
    segments: [
      {
        text: "Where luxury is not what you see, but what you feel. A genuine connection with the ",
        color: "#e3f7ec",
      },
      { text: "real Pantanal", color: "#d6a35d" },
      { text: ". ", color: "#e3f7ec" },
      { text: "An ", color: "#e3f7ec" },
      { text: "authentic immersion", color: "#d6a35d" },
      { text: ", in the heart of the biome.", color: "#e3f7ec" },
    ],
    detailsButtonLabel: "More details",
  },
};

const esSharedCmsSections: SharedCmsSections = {
  immersionCta: {
    heading: "Tu inmersión en el Pantanal salvaje comienza aquí.",
    description:
      "Te espera una experiencia auténtica de ecoturismo, observación de aves o pesca deportiva. Selecciona las fechas de tu expedición y asegura tu lugar en nuestro refugio.",
    backgroundImage: "/images/culinaria-cta-bg.webp",
  },
  faq: {
    label: "PREGUNTAS FRECUENTES",
    heading: "¿Aún tienes alguna duda?",
    description:
      "Respondemos las principales preguntas para que tu única preocupación sea disfrutar de la inmersión en la naturaleza salvaje.",
    items: [
      {
        id: "item-1",
        number: "01",
        question: "¿La posada es solo para pesca?",
        answer:
          "No. Itaicy ofrece experiencias de pesca deportiva, observación de aves, ecoturismo e inmersiones para familias y parejas.",
      },
      {
        id: "item-2",
        number: "02",
        question: "¿Cómo funciona el acceso a las áreas preservadas?",
        answer:
          "Nuestros itinerarios siguen protocolos ambientales y operativos propios para garantizar seguridad y bajo impacto en el bioma.",
      },
      {
        id: "item-3",
        number: "03",
        question: "¿Las experiencias son guiadas?",
        answer:
          "Sí. Todas las actividades son acompañadas por personal especializado y guías con conocimiento local.",
      },
      {
        id: "item-4",
        number: "04",
        question: "¿Hay opción para grupos y familias?",
        answer:
          "Sí. Tenemos configuraciones de alojamiento e itinerario adaptadas para diferentes perfiles de viajeros.",
      },
      {
        id: "item-5",
        number: "05",
        question: "¿Puedo personalizar mi itinerario?",
        answer:
          "Sí. Nuestro equipo comercial puede ajustar el paquete según la disponibilidad y el objetivo del viaje.",
      },
    ],
  },
  testimonials: {
    label: "TESTIMONIOS",
    heading: "Relatos de quienes vivieron la inmersión real",
    description:
      "Lo que dicen nuestros viajeros sobre la experiencia auténtica de desconectarse en la naturaleza salvaje de Itaicy Ecoturismo.",
    items: [
      {
        title: "Experiencia inolvidable",
        quote:
          '"Elegancia esencial en armonía con el bioma. Una experiencia auténtica y profundamente transformadora."',
        author: "Lucas Vieira, BRA",
      },
      {
        title: "Atención impecable",
        quote:
          '"Personal preparado, estructura excelente e itinerarios con mucho cuidado ambiental. Definitivamente volveremos."',
        author: "Fernanda A., BRA",
      },
      {
        title: "Conexión real con la naturaleza",
        quote:
          '"La observación de aves superó las expectativas. Organización, seguridad y curaduría de alto nivel."',
        author: "Rafael M., BRA",
      },
    ],
  },
  footer: {
    pousadaHeading: "POSADA",
    experienciasHeading: "EXPERIENCIAS",
    contactHeading: "CONTÁCTENOS",
    mobileNavLinks: [
      { label: "Posada", href: "/" },
      { label: "Experiencias", href: "/ecoturismo" },
      { label: "Contáctenos", href: "/contato" },
    ],
    pousadaLinks: [
      { label: "Inicio", href: "/" },
      { label: "Alojamientos", href: "/acomodacoes" },
      { label: "Gastronomía", href: "/culinaria" },
      { label: "Nuestro Impacto", href: "/nosso-impacto" },
      { label: "Blog", href: "/blog" },
    ],
    experienciasLinks: [
      { label: "Observación de Aves", href: "/observacao-de-aves" },
      { label: "Pesca Deportiva", href: "/pesca" },
      { label: "Ecoturismo Inmersivo", href: "/ecoturismo" },
    ],
    contactInfo: [
      { icon: "/images/icons/call.png", text: "+55 (65) 99999-9999" },
      { icon: "/images/icons/mail.png", text: "reservas@pousadaitaicy.com.br" },
      {
        icon: "/images/icons/location-on.png",
        text: "Santo Antônio do Leverger, Mato Grosso, Brasil",
      },
    ],
    legalLinks: [
      { label: "Política de Privacidad", href: "/politica-de-privacidade" },
      { label: "Política de Cookies", href: "/politica-de-privacidade" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Términos de Uso", href: "/politica-de-privacidade" },
    ],
    heading: "El Pantanal como nunca lo has sentido.",
    newsletterLabel: "Diario de Campo Itaicy",
    newsletterInterests: ["Quiero Pescar", "Quiero Naturaleza", "Viaje en Familia", "Quiero Descansar"],
    newsletterInputPlaceholder: "Tu correo electrónico",
    newsletterButtonLabel: "Enviar",
    bottomDescription:
      "Un refugio genuino y sofisticado en el corazón del Pantanal. Experiencias auténticas para quienes buscan naturaleza, confort y autenticidad.",
    copyright: "© 2026 Itaicy Pantanal Eco Lodge. Todos los derechos reservados.",
  },
  homeHero: {
    heading: "Vive el Pantanal",
    headingAccent: "Auténtico.",
    subtitle:
      "Elegancia esencial en armonía con el bioma. Una experiencia de inmersión auténtica, sin excesos y sin concesiones.",
    bookingHeading: "Encuentra una fecha especial",
    bookingDescription:
      "Selecciona el período de tu estancia para verificar la disponibilidad.",
    bookingStep1Label: "Paso 1:",
    bookingDisclaimer: "Garantizamos el mejor precio para reservas directas.",
    bookingDisclaimerPrefix: "Las tarifas incluyen sistema",
    bookingDisclaimerHighlight: "Premium All-Inclusive",
  },
  homeManifesto: {
    label: "MANIFIESTO",
    segments: [
      {
        text: "Donde el lujo no es lo que se ve, sino lo que se siente. Conexión genuina con el ",
        color: "#e3f7ec",
      },
      { text: "Pantanal real", color: "#d6a35d" },
      { text: ". ", color: "#e3f7ec" },
      { text: "Una ", color: "#e3f7ec" },
      { text: "inmersión auténtica", color: "#d6a35d" },
      { text: ", en el corazón del bioma.", color: "#e3f7ec" },
    ],
    detailsButtonLabel: "Más detalles",
  },
};

export const sharedDefaults: Record<Lang, SharedCmsSections> = {
  pt: defaultSharedCmsSections,
  en: enSharedCmsSections,
  es: esSharedCmsSections,
};
