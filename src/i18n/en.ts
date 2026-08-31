import type { Messages } from "@/i18n/types"

export const en: Messages = {
  locale: "en",
  htmlLang: "en",
  skipToContent: "Skip to content",
  nav: {
    home: "Home",
    about: "About",
    skills: "What I Do",
    portfolio: "Works",
    certifications: "Certifications",
    contact: "Contact",
    primary: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    onThisPage: "On this page"
  },
  language: {
    label: "Language",
    en: "EN",
    es: "ES"
  },
  site: {
    title: "Santiago Morera — Senior Full Stack Engineer in Mexico City",
    description:
      "Senior Full Stack Engineer in Mexico City specializing in React, TypeScript, Next.js, and Node.js. Available for new opportunities and product modernization.",
    keywords: [
      "Santiago Morera",
      "Senior Full Stack Engineer",
      "Senior Web Developer",
      "React developer Mexico City",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Mexico City",
      "CDMX",
      "available for hire",
      "mulberry-dev"
    ],
    role: "Senior Full Stack Engineer",
    location: "Mexico City, Mexico"
  },
  sections: {
    "/": {
      title: "Santiago Morera — Senior Full Stack Engineer in Mexico City",
      description:
        "Senior Full Stack Engineer in Mexico City specializing in React, TypeScript, Next.js, and Node.js. Available for new opportunities and product modernization."
    },
    "/about": {
      title: "About",
      description:
        "Santiago Morera is a Senior Full Stack Engineer in Mexico City. Design-to-code background, bilingual EN/ES, React, TypeScript, Next.js, and Node.js."
    },
    "/skills": {
      title: "What I Do",
      description:
        "Frontend, backend, data and integrations, and legacy modernization with React, TypeScript, Next.js, Node.js, and GraphQL. My development method."
    },
    "/portfolio": {
      title: "Works",
      description:
        "Selected work by Santiago Morera: product UIs, APIs, e-commerce, and platform modernization for teams in Mexico and beyond."
    },
    "/certifications": {
      title: "Certifications",
      description:
        "Certificates in full stack development, React, JavaScript, cybersecurity, and English."
    },
    "/contact": {
      title: "Contact",
      description:
        "Available for new opportunities and project briefs. Senior Full Stack Engineer in Mexico City. I usually respond within 24 hours."
    }
  },
  workspace: {
    home: "Home",
    about: "About Me",
    skills: "What I Do",
    work: "Selected Works",
    certifications: "Certifications",
    contact: "Let's Connect"
  },
  home: {
    ariaLabel: "Home",
    greeting: "Hi! I am",
    name: "Santiago Morera",
    roleLead: "Senior Full Stack",
    roleTrail: "Engineer",
    bodyBefore: "I build ",
    bodySolutions: "digital solutions",
    bodyMid: " that ",
    bodyValue: "deliver value",
    ctaSr: "Start Exploring",
    cta: "Start Exploring"
  },
  about: {
    ariaLabel: "About Me",
    command: "cat about-me.txt",
    headline: ["I BUILD WHAT YOU SEE.", "AND I MAKE IT WORK."],
    accentFrom: 1,
    body: [
      "I came to software through design.",
      "Senior Full Stack Engineer in Mexico City — React, TypeScript, Next.js, and Node.js.",
      "I work in English and Spanish. Available for new opportunities."
    ],
    whoami: "whoami",
    passionsCommand: "passions",
    passions: ["Solving problems", "Interface design", "Mobile apps & PWAs"],
    historyCommand: "git log --oneline",
    history: [
      {
        title: "I care about how products feel",
        text: "Clear interfaces, small details, and experiences that make people feel confident."
      },
      {
        title: "I want the work to last",
        text: "Decisions a team can keep building on — not a demo that falls apart a year later."
      }
    ],
    footerQuestion: "have a project in mind?",
    footerAction: "check what i do",
    rail: { intro: "INTRO", identity: "IDENTITY", path: "PATH" }
  },
  skills: {
    ariaLabel: "What I Do",
    headline: "As a full-stack developer, these are the main things I do.",
    stackTitle: "Stack",
    stackLead: "This is the stack I know best.",
    capabilities: [
      {
        title: "Product Interfaces",
        text: "Clear, fast, accessible screens people actually use."
      },
      {
        title: "Backend Systems",
        text: "APIs and services that stay reliable as usage grows."
      },
      {
        title: "Data & Integrations",
        text: "Databases, auth, and third-party services working as one system."
      },
      {
        title: "Modernization",
        text: "Evolve what exists without throwing away what already works."
      }
    ],
    interfaces: {
      kicker: "WHAT PEOPLE SEE",
      items: ["UI components", "Interactions", "UX & accessibility", "Performance"]
    },
    systems: {
      kicker: "HOW IT WORKS",
      items: ["APIs", "Services", "Databases", "Architecture", "Business logic"]
    },
    connected: {
      kicker: "EVERYTHING WORKS TOGETHER",
      items: ["Identity", "Payments", "Data", "APIs"]
    },
    modernization: {
      kicker: "EVOLVE WITHOUT BREAKING",
      copy: [
        "I don't replace working businesses.",
        "I modernize the systems behind them."
      ],
      legacyLabel: "LEGACY",
      modernLabel: "MODERN",
      legacy: ["PHP", "Old UI", "Monolith", "Disconnected", "Hard to scale"],
      modern: [
        "React / TypeScript",
        "Node.js / GraphQL",
        "Modular Architecture",
        "Connected Systems",
        "Scalable & Maintainable"
      ]
    },
    approach: {
      kicker: "THIS IS MY DEVELOPMENT METHOD",
      stages: [
        { title: "SITUATION", text: "The context I start from." },
        { title: "TASK", text: "What I take on." },
        { title: "ACTION", text: "The decisions I make." },
        { title: "RESULT", text: "The impact I deliver." }
      ]
    },
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      databases: "Data",
      devops: "DevOps",
      tools: "Tools",
      ai: "AI"
    },
    rail: {
      intro: "INTRO",
      frontend: "FRONTEND",
      backend: "BACKEND",
      connected: "DATA & INTEGRATIONS",
      modernize: "MODERNIZATION",
      star: "STAR"
    }
  },
  portfolio: {
    ariaLabel: "Selected Works",
    command: "ls ./selected-projects --sort=impact",
    archiveCommand: "ls ./archive",
    featured: "Featured",
    year: "Year",
    type: "Type",
    stack: "Stack",
    viewCase: "View case study",
    view: "View",
    loading: "Loading project details…",
    meta: "{all} projects found · {featured} featured · {archive} archive",
    archiveMeta: "{count} projects in archive",
    archiveNoAi: " · {count} built without AI",
    filters: {
      all: "all",
      web: "web",
      landing: "landing",
      api: "backend",
      ecommerce: "commerce"
    }
  },
  certifications: {
    ariaLabel: "Certifications",
    meta: "{count} certificates in security, English, and development.",
    view: "View {title} fullscreen",
    filters: {
      all: "All",
      security: "Security",
      english: "English",
      development: "Development"
    }
  },
  contact: {
    ariaLabel: "Contact",
    command: "./start-conversation",
    checking: "checking availability...",
    statusPrefix: "status:",
    availability: "Available for new opportunities",
    supporting: "I usually respond within 24 hours.",
    startConversation: "start a conversation",
    selectChannel: "Select channel",
    opensTab: "(opens in a new tab)",
    options: {
      email: {
        title: "Email",
        description: "Best for project briefs.",
        cta: "Send email"
      },
      phone: {
        title: "Phone",
        description: "+52 55-12-30-88-11",
        cta: "Call"
      },
      linkedin: {
        title: "LinkedIn",
        description: "Work and opportunities.",
        cta: "View profile"
      },
      github: {
        title: "GitHub",
        description: "Code and public repos.",
        cta: "View GitHub"
      },
      call: {
        title: "Call",
        description: "30 minutes to talk through a project.",
        cta: "Book a call"
      }
    }
  },
  project: {
    notFound: "Project not found",
    back: "Back to projects",
    kicker: "Project",
    visit: "Visit live site",
    private: "Private deployment",
    offline: "Site offline",
    github: "View on GitHub",
    year: "Year",
    type: "Type",
    about: "About the project",
    features: "Key features",
    technologies: "Technologies",
    previous: "Previous",
    next: "Next",
    navLabel: "Projects",
    privateTitle: "This deployment is private",
    privateText: "If you want to know more about this project, please contact me.",
    privateConfirm: "Great!",
    offlineTitle: "This site is offline",
    offlineText: "The live deployment is not available right now.",
    leaveTitle: "This will take you to another page",
    leaveText: "Are you sure you want to leave mulberry-dev?",
    leaveStay: "Stay",
    leaveGo: "Leave",
    preview: "Preview",
    previewInteract: "Click to walk through",
    previewExit: "Exit preview"
  },
  footer: {
    systemOnline: "System online"
  },
  notFound: {
    title: "Page not found",
    heading: "Error 404",
    body: "The page you're looking for doesn't exist or has been moved.",
    back: "Back Home"
  },
  categories: {
    web: "Web App",
    landing: "Landing Page",
    api: "API",
    ecommerce: "eCommerce"
  },
  status: {
    live: "Live",
    ongoing: "Ongoing",
    private: "Private",
    offline: "Offline",
    noAi: "No AI",
    noAiTitle: "Built without AI"
  },
  jsonLd: {
    jobTitle: "Senior Full Stack Engineer",
    description:
      "Senior Full Stack Engineer in Mexico City specializing in React, TypeScript, Next.js, and Node.js. Available for hire."
  },
  projects: {
    FuenteDeVidaResidencial: {
      teaser: "Residential marketing site with bilingual content and visit booking.",
      description:
        "Marketing website for a residential development in Comitán de Domínguez, Chiapas. (2026)",
      highlights: [
        { title: "Nature-first brand", text: "Visual identity inspired by the landscape" },
        { title: "Bilingual experience", text: "Content in Spanish and English" },
        { title: "Visit scheduling", text: "CTAs that convert interest into appointments" },
        { title: "Interactive masterplan", text: "Lightbox tour of lots from 1,000 m²" }
      ]
    },
    MulberryMarketing: {
      teaser: "Agency site for strategy, content, and custom web.",
      description:
        "Boutique agency site that unifies strategy, creativity, and technology. (2026)",
      highlights: [
        { title: "Service deep-dives", text: "Social, content, ads, UX/UI, web, and e-commerce" },
        { title: "Case studies", text: "Work presented with measurable outcomes" },
        { title: "Conversion flow", text: "Contact path with a 3D brand moment" }
      ]
    },
    CeciliaRodriguez: {
      teaser: "Mobile-first digital card for an eXp Realty agent in CDMX.",
      description: "Digital business card for an eXp Realty México agent in CDMX. (2026)",
      highlights: [
        { title: "One-tap actions", text: "Call, WhatsApp, email, and contact saving" },
        { title: "Clear client paths", text: "Buy, sell, and rent journeys" },
        { title: "Trust signals", text: "International-backed transactions" }
      ]
    },
    ThisIsSantiOriginal: {
      teaser: "The original ThisIsSanti.dev portfolio, still live.",
      description: "Original personal portfolio for ThisIsSanti.dev. (2024)",
      highlights: [
        { title: "Signature visual", text: "Gradient type, particle sky, and theme toggle" },
        { title: "Still live", text: "Previous public version, kept online" }
      ]
    },
    SalonTarget: {
      teaser: "Modernizing an all-in-one salon and spa platform.",
      description:
        "Ongoing modernization of SalonTarget's salon and spa management platform. (2025–2026)",
      highlights: [
        { title: "Legacy migration", text: "PHP and Node.js moving to React and GraphQL" },
        { title: "Maintainable stack", text: "Apollo GraphQL and TypeORM" },
        { title: "Payments upgrade", text: "New processor with banking terminals" }
      ]
    },
    SsoSamlOkta: {
      teaser: "Custom SAML SSO API integrated with Okta.",
      description: "Authentication and SAML SSO API built with Node.js and TypeScript. (2023)",
      highlights: [
        { title: "Okta integration", text: "Identity through a leading platform" },
        { title: "Unified access", text: "One sign-on across multiple applications" },
        { title: "Built end to end", text: "Custom SAML flow, not a plugin wrapper" }
      ]
    },
    ManagerProxy: {
      teaser: "Public gateway to eight private AWS microservices.",
      description: "API that exposes eight private AWS microservices without a VPN. (2023)",
      highlights: [
        { title: "No VPN required", text: "Reach private services from a public network" },
        { title: "Private domain intact", text: "Retrieval without exposing the internal network" },
        { title: "AWS-hosted", text: "Orchestrated on a private cloud domain" }
      ]
    },
    ElectronicBilling: {
      teaser: "Invoice platform for Grupo Salinas, connected to SAT.",
      description:
        "Invoice issuance platform for Grupo Salinas, connected to the SAT API. (2024)",
      highlights: [
        { title: "15+ microservices", text: "Node.js backend on AWS" },
        { title: "Okta SSO", text: "Single sign-on for authenticated access" },
        { title: "React + Ant Design", text: "Staff-facing invoice interface" }
      ]
    },
    MiBlog: {
      teaser: "Next.js blog with admin, auth, and offline mode.",
      description: "Next.js blog with an admin panel and authentication. (2023)",
      highlights: [
        { title: "Admin panel", text: "Add and delete posts from the dashboard" },
        { title: "Offline mode", text: "Local Storage when the network is down" }
      ]
    },
    eCommerce: {
      teaser: "Node.js store with cart, chat, and email confirmations.",
      description: "Node.js store with cart, live chat, and purchase emails. (2023)",
      highlights: [
        { title: "Transactional email", text: "Registration and purchase details" },
        { title: "Mocha coverage", text: "Core flows tested with Mocha" },
        { title: "Auth and profiles", text: "Login, personal data, and confirmation mail" }
      ]
    },
    TreeHug: {
      teaser: "Martial arts school landing with Mercado Pago.",
      description: "Landing page for a martial arts school with Mercado Pago checkout. (2023)",
      highlights: [
        { title: "Vanilla JavaScript", text: "Built without a frontend framework" },
        { title: "Courses and products", text: "Both available to buy on one page" }
      ]
    },
    TecnoShop: {
      teaser: "React computer store with cart and live stock.",
      description: "React.js computer store with cart and live inventory.",
      highlights: [
        { title: "Category browsing", text: "Shop by product type" },
        { title: "Live stock", text: "Inventory decreases after each purchase" },
        { title: "Firebase", text: "Client-side storefront with live data" }
      ]
    },
    eCommerceJs: {
      teaser: "Vanilla JavaScript storefront with dark mode.",
      description: "Vanilla JavaScript storefront built as a course final project. (2022)",
      highlights: [
        { title: "Cart and checkout", text: "Add products and complete a purchase" },
        { title: "Theme switch", text: "Dark and light modes included" }
      ]
    },
    LiveChatApp: {
      teaser: "Realtime chat rooms built with Node.js.",
      description: "Node.js chat app where you pick a room and talk in realtime. (2023)",
      highlights: [
        { title: "Message timestamps", text: "Every message shows when it was sent" },
        { title: "Easy exit", text: "Leave a room and return to home" },
        { title: "Socket.io", text: "Realtime rooms on Node.js" }
      ]
    },
    Pokedex: {
      teaser: "Browse and favorite 1,000 Pokémon with auth.",
      description: "Node.js app to browse 1,000 Pokémon, search, and save favorites. (2023)",
      highlights: [
        { title: "Favorites list", text: "Save and remove Pokémon from a personal list" },
        { title: "Full search", text: "Look up any Pokémon and its characteristics" },
        { title: "Authentication", text: "Login-protected experience" }
      ]
    },
    Naturatours: {
      teaser: "WordPress site for a Puerto Vallarta tour agency.",
      description: "WordPress site for a tour agency in Puerto Vallarta. (2020)",
      highlights: [
        { title: "Product showcase", text: "Tours presented on a dedicated landing" },
        { title: "Reservations", text: "Visitors can book directly from the site" },
        { title: "Gutenberg", text: "Content managed in WordPress" }
      ]
    }
  }
}
