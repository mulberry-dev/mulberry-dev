import type { Messages } from "@/i18n/types"

export const es: Messages = {
  locale: "es",
  htmlLang: "es",
  skipToContent: "Saltar al contenido",
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    skills: "Qué hago",
    portfolio: "Trabajos",
    certifications: "Certificaciones",
    contact: "Contacto",
    primary: "Principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    onThisPage: "En esta página"
  },
  language: {
    label: "Idioma",
    en: "EN",
    es: "ES"
  },
  site: {
    title: "Santiago Morera — Ingeniero Full Stack Senior en Ciudad de México",
    description:
      "Ingeniero Full Stack Senior en Ciudad de México, especializado en React, TypeScript, Next.js y Node.js. Disponible para nuevas oportunidades y modernización de productos.",
    keywords: [
      "Santiago Morera",
      "Ingeniero Full Stack Senior",
      "Desarrollador web senior",
      "Desarrollador React Ciudad de México",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Ciudad de México",
      "CDMX",
      "disponible para contratar",
      "mulberry-dev"
    ],
    role: "Ingeniero Full Stack Senior",
    location: "Ciudad de México, México"
  },
  sections: {
    "/": {
      title: "Santiago Morera — Ingeniero Full Stack Senior en Ciudad de México",
      description:
        "Ingeniero Full Stack Senior en Ciudad de México, especializado en React, TypeScript, Next.js y Node.js. Disponible para nuevas oportunidades y modernización de productos."
    },
    "/about": {
      title: "Sobre mí",
      description:
        "Santiago Morera es Ingeniero Full Stack Senior en Ciudad de México. De diseño a código, bilingüe ES/EN, React, TypeScript, Next.js y Node.js."
    },
    "/skills": {
      title: "Qué hago",
      description:
        "Frontend, backend, datos e integraciones, y modernización de sistemas legacy con React, TypeScript, Next.js, Node.js y GraphQL."
    },
    "/portfolio": {
      title: "Trabajos",
      description:
        "Proyectos seleccionados de Santiago Morera: interfaces de producto, APIs, e-commerce y modernización de plataformas en México y más allá."
    },
    "/certifications": {
      title: "Certificaciones",
      description:
        "Certificados en desarrollo full stack, React, JavaScript, ciberseguridad e inglés."
    },
    "/contact": {
      title: "Contacto",
      description:
        "Disponible para nuevas oportunidades y briefs de proyecto. Ingeniero Full Stack Senior en Ciudad de México. Suelo responder en 24 horas."
    }
  },
  workspace: {
    home: "Inicio",
    about: "Sobre mí",
    skills: "Qué hago",
    work: "Trabajos seleccionado",
    certifications: "Certificaciones",
    contact: "Hablemos"
  },
  home: {
    ariaLabel: "Inicio",
    greeting: "¡Hola! Soy",
    name: "Santiago Morera",
    roleLead: "Ingeniero Full Stack",
    roleTrail: "Senior",
    bodyBefore: "Construyo ",
    bodySolutions: "soluciones digitales",
    bodyMid: " que ",
    bodyValue: "generan valor",
    ctaSr: "Empezar a Explorar",
    cta: "Empezar a Explorar"
  },
  about: {
    ariaLabel: "Sobre mí",
    command: "cat about-me.txt",
    headline: ["CONSTRUYO LO QUE SE VE.", "Y LO HAGO FUNCIONAR."],
    accentFrom: 1,
    body: [
      "Llegué al software desde el diseño.",
      "Ingeniero Full Stack Senior en Ciudad de México — React, TypeScript, Next.js y Node.js.",
      "Trabajo en español e inglés. Disponible para nuevas oportunidades."
    ],
    whoami: "whoami",
    passionsCommand: "passions",
    passions: ["Resolver problemas", "Interfaces intencionales"],
    historyCommand: "git log --oneline",
    history: [
      {
        title: "Me importa cómo se sienten los productos",
        text: "Interfaces claras, detalles pequeños y experiencias que dan confianza."
      },
      {
        title: "Quiero que el trabajo dure",
        text: "Decisiones sobre las que un equipo puede seguir construyendo — no un demo que se cae al año."
      }
    ],
    footerQuestion: "¿tienes un proyecto en mente?",
    footerAction: "mira qué hago",
    rail: { intro: "INTRO", identity: "IDENTIDAD", path: "CAMINO" }
  },
  skills: {
    ariaLabel: "Qué hago",
    headline: "Como desarrollador full stack, estas son las principales cosas que hago.",
    stackTitle: "Stack",
    stackLead: "Este es el stack en el que más soy experto.",
    capabilities: [
      {
        title: "Interfaces de producto",
        text: "Pantallas claras, rápidas y accesibles que la gente sí usa."
      },
      {
        title: "Sistemas backend",
        text: "APIs y servicios que se mantienen firmes cuando crece el uso."
      },
      {
        title: "Datos e integraciones",
        text: "Bases de datos, auth y servicios de terceros trabajando como un solo sistema."
      },
      {
        title: "Modernización",
        text: "Evolucionar lo que existe sin tirar lo que ya funciona."
      }
    ],
    interfaces: {
      kicker: "LO QUE LA GENTE VE",
      items: ["Componentes UI", "Interacciones", "UX y accesibilidad", "Rendimiento"]
    },
    systems: {
      kicker: "CÓMO FUNCIONA",
      items: ["APIs", "Servicios", "Bases de datos", "Arquitectura", "Lógica de negocio"]
    },
    connected: {
      kicker: "TODO CONECTADO",
      items: ["Identidad", "Pagos", "Datos", "APIs"]
    },
    modernization: {
      kicker: "EVOLUCIONAR SIN ROMPER",
      copy: [
        "No reemplazo negocios que ya funcionan.",
        "Modernizo los sistemas que hay detrás."
      ],
      legacyLabel: "LEGACY",
      modernLabel: "MODERNO",
      legacy: ["PHP", "UI antigua", "Monolito", "Desconectado", "Difícil de escalar"],
      modern: [
        "React / TypeScript",
        "Node.js / GraphQL",
        "Arquitectura modular",
        "Sistemas conectados",
        "Escalable y mantenible"
      ]
    },
    approach: {
      kicker: "ESTA ES MI METODOLOGÍA DE DESARROLLO",
      stages: [
        { title: "SITUACIÓN", text: "El contexto del que parto." },
        { title: "TAREA", text: "De qué me hago cargo." },
        { title: "ACCIÓN", text: "Las decisiones que tomo." },
        { title: "RESULTADO", text: "El impacto que entrego." }
      ]
    },
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      databases: "Datos",
      devops: "DevOps",
      tools: "Herramientas",
      ai: "IA"
    },
    rail: {
      intro: "INTRO",
      frontend: "FRONTEND",
      backend: "BACKEND",
      connected: "DATOS E INTEGRACIONES",
      modernize: "MODERNIZACIÓN",
      star: "STAR"
    }
  },
  portfolio: {
    ariaLabel: "Trabajos seleccionado",
    command: "ls ./selected-projects --sort=impact",
    archiveCommand: "ls ./archive",
    featured: "Destacado",
    year: "Año",
    type: "Tipo",
    stack: "Stack",
    viewCase: "Ver caso de estudio",
    view: "Ver",
    loading: "Cargando detalles del proyecto…",
    meta: "{all} proyectos encontrados · {featured} destacados · {archive} archivo",
    archiveMeta: "{count} proyectos en archivo",
    archiveNoAi: " · {count} hechos sin IA",
    filters: {
      all: "todos",
      web: "web",
      landing: "landing",
      api: "backend",
      ecommerce: "comercio"
    }
  },
  certifications: {
    ariaLabel: "Certificaciones",
    meta: "{count} certificados en seguridad, inglés y desarrollo.",
    view: "Ver {title} a pantalla completa",
    filters: {
      all: "Todos",
      security: "Seguridad",
      english: "Inglés",
      development: "Desarrollo"
    }
  },
  contact: {
    ariaLabel: "Contacto",
    command: "./start-conversation",
    checking: "comprobando disponibilidad...",
    statusPrefix: "estado:",
    availability: "Disponible para nuevas oportunidades",
    supporting: "Suelo responder en 24 horas.",
    startConversation: "empezar una conversación",
    selectChannel: "Elegir canal",
    opensTab: "(se abre en una pestaña nueva)",
    options: {
      email: {
        title: "Correo",
        description: "Ideal para briefs de proyecto.",
        cta: "Enviar correo"
      },
      linkedin: {
        title: "LinkedIn",
        description: "Trabajo y oportunidades.",
        cta: "Ver perfil"
      },
      github: {
        title: "GitHub",
        description: "Código y repos públicos.",
        cta: "Ver GitHub"
      },
      call: {
        title: "Llamada",
        description: "30 minutos para hablar de un proyecto.",
        cta: "Agendar llamada"
      }
    }
  },
  project: {
    notFound: "Proyecto no encontrado",
    back: "Volver a proyectos",
    kicker: "Proyecto",
    visit: "Visitar sitio",
    private: "Despliegue privado",
    github: "Ver en GitHub",
    year: "Año",
    type: "Tipo",
    about: "Sobre el proyecto",
    features: "Funciones clave",
    technologies: "Tecnologías",
    previous: "Anterior",
    next: "Siguiente",
    navLabel: "Proyectos",
    privateTitle: "Este despliegue es privado",
    privateText: "Si quieres saber más de este proyecto, contáctame.",
    privateConfirm: "Entendido",
    leaveTitle: "Esto te redirigirá a otra página",
    leaveText: "¿Seguro que quieres dejar mulberry-dev?",
    leaveStay: "Volver",
    leaveGo: "Irte",
    preview: "Vista previa",
    previewInteract: "Clic para recorrer",
    previewExit: "Salir de la vista previa"
  },
  footer: {
    systemOnline: "Sistema en línea"
  },
  notFound: {
    title: "Página no encontrada",
    heading: "Error 404",
    body: "La página que buscas no existe o se movió.",
    back: "Volver al inicio"
  },
  categories: {
    web: "App web",
    landing: "Landing page",
    api: "API",
    ecommerce: "eCommerce"
  },
  status: {
    live: "En vivo",
    ongoing: "En curso",
    private: "Privado",
    noAi: "Sin IA",
    noAiTitle: "Hecho sin IA"
  },
  jsonLd: {
    jobTitle: "Ingeniero Full Stack Senior",
    description:
      "Ingeniero Full Stack Senior en Ciudad de México, especializado en React, TypeScript, Next.js y Node.js. Disponible para contratar."
  },
  projects: {
    FuenteDeVidaResidencial: {
      teaser: "Sitio residencial bilingüe con reserva de visitas.",
      description:
        "Sitio de marketing para un desarrollo residencial en Comitán de Domínguez, Chiapas. (2026)",
      highlights: [
        { title: "Marca desde el paisaje", text: "Identidad visual inspirada en el entorno" },
        { title: "Experiencia bilingüe", text: "Contenido en español e inglés" },
        { title: "Agenda de visitas", text: "CTAs que convierten interés en citas" },
        { title: "Masterplan interactivo", text: "Recorrido en lightbox de lotes desde 1,000 m²" }
      ]
    },
    MulberryMarketing: {
      teaser: "Sitio de agencia para estrategia, contenido y web a medida.",
      description:
        "Sitio de agencia boutique que une estrategia, creatividad y tecnología. (2026)",
      highlights: [
        {
          title: "Servicios a fondo",
          text: "Social, contenido, ads, UX/UI, web y e-commerce"
        },
        { title: "Casos de estudio", text: "Trabajo presentado con resultados medibles" },
        { title: "Flujo de conversión", text: "Ruta de contacto con un momento 3D de marca" }
      ]
    },
    CeciliaRodriguez: {
      teaser: "Tarjeta digital mobile-first para una agente de eXp Realty en CDMX.",
      description:
        "Tarjeta de presentación digital para una agente de eXp Realty México en CDMX. (2026)",
      highlights: [
        { title: "Acciones de un toque", text: "Llamada, WhatsApp, correo y guardar contacto" },
        { title: "Rutas claras para el cliente", text: "Comprar, vender y rentar" },
        { title: "Señales de confianza", text: "Operaciones con respaldo internacional" }
      ]
    },
    ThisIsSantiOriginal: {
      teaser: "El portafolio original de ThisIsSanti.dev, todavía en línea.",
      description: "Portafolio personal original de ThisIsSanti.dev. (2024)",
      highlights: [
        { title: "Visual de firma", text: "Tipografía en degradado, cielo de partículas y tema" },
        { title: "Sigue en línea", text: "Versión pública anterior, mantenida activa" }
      ]
    },
    SalonTarget: {
      teaser: "Modernización de una plataforma all-in-one para salones y spas.",
      description:
        "Modernización en curso de la plataforma de gestión de salones y spas de SalonTarget. (2025–2026)",
      highlights: [
        { title: "Migración legacy", text: "De PHP y Node.js a React y GraphQL" },
        { title: "Stack mantenible", text: "Apollo GraphQL y TypeORM" },
        { title: "Pagos actualizados", text: "Nuevo procesador con terminales bancarias" }
      ]
    },
    SsoSamlOkta: {
      teaser: "API SSO SAML a medida integrada con Okta.",
      description: "API de autenticación y SSO SAML con Node.js y TypeScript. (2023)",
      highlights: [
        { title: "Integración Okta", text: "Identidad a través de una plataforma líder" },
        { title: "Acceso unificado", text: "Un solo inicio de sesión en varias aplicaciones" },
        { title: "Hecho de punta a punta", text: "Flujo SAML propio, no un wrapper de plugin" }
      ]
    },
    ManagerProxy: {
      teaser: "Puerta pública a ocho microservicios privados en AWS.",
      description: "API que expone ocho microservicios privados en AWS sin VPN. (2023)",
      highlights: [
        { title: "Sin VPN", text: "Llegar a servicios privados desde una red pública" },
        { title: "Dominio privado intacto", text: "Consulta sin exponer la red interna" },
        { title: "Alojado en AWS", text: "Orquestado en un dominio de nube privada" }
      ]
    },
    ElectronicBilling: {
      teaser: "Plataforma de facturación para Grupo Salinas, conectada al SAT.",
      description:
        "Plataforma de emisión de facturas para Grupo Salinas, conectada a la API del SAT. (2024)",
      highlights: [
        { title: "Más de 15 microservicios", text: "Backend Node.js en AWS" },
        { title: "SSO con Okta", text: "Inicio de sesión único para acceso autenticado" },
        { title: "React + Ant Design", text: "Interfaz de facturación para el equipo" }
      ]
    },
    MiBlog: {
      teaser: "Blog en Next.js con admin, auth y modo offline.",
      description: "Blog en Next.js con panel de administración y autenticación. (2023)",
      highlights: [
        { title: "Panel de admin", text: "Crear y borrar posts desde el dashboard" },
        { title: "Modo offline", text: "Local Storage cuando no hay red" }
      ]
    },
    eCommerce: {
      teaser: "Tienda en Node.js con carrito, chat y correos de confirmación.",
      description: "Tienda en Node.js con carrito, chat en vivo y correos de compra. (2023)",
      highlights: [
        { title: "Correo transaccional", text: "Registro y detalle de compra" },
        { title: "Cobertura con Mocha", text: "Flujos principales probados con Mocha" },
        { title: "Auth y perfiles", text: "Login, datos personales y correo de confirmación" }
      ]
    },
    TreeHug: {
      teaser: "Landing de escuela de artes marciales con Mercado Pago.",
      description:
        "Landing para una escuela de artes marciales con checkout de Mercado Pago. (2023)",
      highlights: [
        { title: "JavaScript vanilla", text: "Hecho sin framework de frontend" },
        { title: "Cursos y productos", text: "Ambos se pueden comprar en una sola página" }
      ]
    },
    TecnoShop: {
      teaser: "Tienda de cómputo en React con carrito y stock en vivo.",
      description: "Tienda de cómputo en React.js con carrito e inventario en vivo.",
      highlights: [
        { title: "Navegación por categoría", text: "Comprar por tipo de producto" },
        { title: "Stock en vivo", text: "El inventario baja después de cada compra" },
        { title: "Firebase", text: "Vitrina del lado del cliente con datos en vivo" }
      ]
    },
    eCommerceJs: {
      teaser: "Tienda en JavaScript vanilla con modo oscuro.",
      description: "Tienda en JavaScript vanilla hecha como proyecto final de curso. (2022)",
      highlights: [
        { title: "Carrito y checkout", text: "Agregar productos y completar la compra" },
        { title: "Cambio de tema", text: "Modos oscuro y claro incluidos" }
      ]
    },
    LiveChatApp: {
      teaser: "Salas de chat en tiempo real con Node.js.",
      description:
        "App de chat en Node.js donde eliges una sala y hablas en tiempo real. (2023)",
      highlights: [
        { title: "Marca de tiempo", text: "Cada mensaje muestra cuándo se envió" },
        { title: "Salida fácil", text: "Dejar una sala y volver al inicio" },
        { title: "Socket.io", text: "Salas en tiempo real sobre Node.js" }
      ]
    },
    Pokedex: {
      teaser: "Explora y guarda 1,000 Pokémon con autenticación.",
      description:
        "App en Node.js para explorar 1,000 Pokémon, buscar y guardar favoritos. (2023)",
      highlights: [
        { title: "Lista de favoritos", text: "Guardar y quitar Pokémon de una lista personal" },
        { title: "Búsqueda completa", text: "Buscar cualquier Pokémon y sus características" },
        { title: "Autenticación", text: "Experiencia protegida con login" }
      ]
    },
    Naturatours: {
      teaser: "Sitio WordPress para una agencia de tours en Puerto Vallarta.",
      description: "Sitio WordPress para una agencia de tours en Puerto Vallarta. (2020)",
      highlights: [
        { title: "Vitrina de productos", text: "Tours presentados en una landing dedicada" },
        { title: "Reservas", text: "Los visitantes pueden reservar desde el sitio" },
        { title: "Gutenberg", text: "Contenido gestionado en WordPress" }
      ]
    }
  }
}
