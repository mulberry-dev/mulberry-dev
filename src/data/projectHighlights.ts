import { SiteIconName } from "@/components/ui/SiteIcon"

export type ProjectHighlight = {
  icon: SiteIconName
  title: string
  text: string
}

export const projectHighlights: Record<string, ProjectHighlight[]> = {
  FuenteDeVidaResidencial: [
    {
      icon: "leaf",
      title: "Nature-first brand",
      text: "Visual identity inspired by the landscape"
    },
    {
      icon: "globe",
      title: "Bilingual experience",
      text: "Content available in ES / EN"
    },
    {
      icon: "calendar",
      title: "Visit scheduling",
      text: "CTAs designed to convert interest"
    },
    {
      icon: "devices",
      title: "Fully responsive",
      text: "Optimized for all devices and screen sizes"
    }
  ],
  MulberryMarketing: [
    {
      icon: "design",
      title: "Unified brand site",
      text: "Strategy, creativity, and technology in one place"
    },
    {
      icon: "interface",
      title: "Service deep-dives",
      text: "Social, content, ads, UX/UI, web, and e-commerce"
    },
    {
      icon: "performance",
      title: "Measurable case studies",
      text: "Work presented with clear outcomes"
    },
    {
      icon: "cube",
      title: "Conversion-focused",
      text: "Contact flow with a 3D brand moment"
    }
  ],
  CeciliaRodriguez: [
    {
      icon: "bolt",
      title: "One-tap actions",
      text: "Call, WhatsApp, email, and contact saving"
    },
    {
      icon: "compass",
      title: "Clear client paths",
      text: "Buy, sell, and rent journeys"
    },
    {
      icon: "shield",
      title: "Trust signals",
      text: "International-backed transactions"
    },
    {
      icon: "devices",
      title: "Mobile-first",
      text: "Fast presentation site for the field"
    }
  ],
  ThisIsSantiOriginal: [
    {
      icon: "user",
      title: "Personal brand landing",
      text: "Hero intro and multi-page portfolio for ThisIsSanti.dev"
    },
    {
      icon: "interface",
      title: "Full site map",
      text: "Home, About, Skills, Portfolio, Certifications, and Contact"
    },
    {
      icon: "design",
      title: "Signature visual",
      text: "Gradient type, particle sky, and dark/light accents"
    },
    {
      icon: "devices",
      title: "Live original",
      text: "Still available as the previous public version"
    }
  ],
  MulberryDrone: [
    {
      icon: "cursor",
      title: "Cinematic work",
      text: "4K aerial photography and videography"
    },
    {
      icon: "craft",
      title: "Commercial services",
      text: "Marketing and inspection coverage"
    },
    {
      icon: "frontend",
      title: "Photo gallery",
      text: "Selected aerial work in one place"
    },
    {
      icon: "connect",
      title: "WhatsApp-first contact",
      text: "Clients can brief a shoot quickly"
    }
  ],
  SalonTarget: [
    {
      icon: "modernize",
      title: "Platform modernization",
      text: "Legacy PHP and Node.js moving to a modern stack"
    },
    {
      icon: "code",
      title: "React and GraphQL",
      text: "Apollo GraphQL and TypeORM for maintainability"
    },
    {
      icon: "swap",
      title: "Payments upgrade",
      text: "New processor with banking terminals"
    },
    {
      icon: "systems",
      title: "Salon operations",
      text: "All-in-one management for staff and clients"
    }
  ],
  SsoSamlOkta: [
    {
      icon: "shield",
      title: "SSO from scratch",
      text: "Authentication and SAML built end to end"
    },
    {
      icon: "connect",
      title: "Okta integration",
      text: "Identity management through a leading platform"
    },
    {
      icon: "puzzle",
      title: "Unified access",
      text: "One sign-on across multiple applications"
    },
    {
      icon: "code",
      title: "TypeScript API",
      text: "A robust, maintainable Node.js codebase"
    }
  ],
  ManagerProxy: [
    {
      icon: "systems",
      title: "Eight microservices",
      text: "Orchestrated data from a private AWS domain"
    },
    {
      icon: "globe",
      title: "Public access",
      text: "Reach private services without a VPN"
    },
    {
      icon: "shield",
      title: "Secure exchange",
      text: "Public retrieval without exposing the private network"
    },
    {
      icon: "database",
      title: "AWS-hosted",
      text: "Built for a private cloud domain"
    }
  ],
  ElectronicBilling: [
    {
      icon: "frontend",
      title: "Invoice platform",
      text: "React frontend with Ant Design"
    },
    {
      icon: "systems",
      title: "15+ microservices",
      text: "Node.js backend on AWS"
    },
    {
      icon: "shield",
      title: "Okta SSO",
      text: "Single sign-on for authenticated access"
    },
    {
      icon: "connect",
      title: "SAT integration",
      text: "Tax-compliant data exchange"
    }
  ],
  MiBlog: [
    {
      icon: "frontend",
      title: "Admin panel",
      text: "Add and delete posts from the dashboard"
    },
    {
      icon: "shield",
      title: "Authentication",
      text: "Login-protected publishing"
    },
    {
      icon: "database",
      title: "Offline mode",
      text: "Local Storage when the network is down"
    },
    {
      icon: "code",
      title: "Next.js",
      text: "App built on a modern React stack"
    }
  ],
  eCommerce: [
    {
      icon: "connect",
      title: "Live chat",
      text: "Conversation built into the store"
    },
    {
      icon: "cube",
      title: "Cart and checkout",
      text: "Add, remove, and complete purchases"
    },
    {
      icon: "mail",
      title: "Transactional email",
      text: "Confirmation and purchase details"
    },
    {
      icon: "gauge",
      title: "Mocha coverage",
      text: "Flows tested with Mocha"
    }
  ],
  TreeHug: [
    {
      icon: "interface",
      title: "School landing",
      text: "Martial arts courses and products in one page"
    },
    {
      icon: "cube",
      title: "Direct purchases",
      text: "Courses and products available to buy"
    },
    {
      icon: "connect",
      title: "Mercado Pago",
      text: "Payments handled through Mercado Pago"
    },
    {
      icon: "code",
      title: "Vanilla JavaScript",
      text: "Built without a frontend framework"
    }
  ],
  TecnoShop: [
    {
      icon: "compass",
      title: "Category browsing",
      text: "Shop by product type"
    },
    {
      icon: "cube",
      title: "Shopping cart",
      text: "Add and remove items before checkout"
    },
    {
      icon: "swap",
      title: "Live stock",
      text: "Inventory decreases after each purchase"
    },
    {
      icon: "code",
      title: "React.js",
      text: "Client-side storefront with Firebase"
    }
  ],
  eCommerceJs: [
    {
      icon: "cube",
      title: "Cart and checkout",
      text: "Add products and complete a purchase"
    },
    {
      icon: "design",
      title: "Theme switch",
      text: "Dark and light modes included"
    },
    {
      icon: "code",
      title: "Vanilla JavaScript",
      text: "Built as a JavaScript course final project"
    },
    {
      icon: "interface",
      title: "Storefront UI",
      text: "HTML, Sass, and Bootstrap layout"
    }
  ],
  LiveChatApp: [
    {
      icon: "connect",
      title: "Chat rooms",
      text: "Choose a room and join the conversation"
    },
    {
      icon: "calendar",
      title: "Message timestamps",
      text: "Every message shows when it was sent"
    },
    {
      icon: "cursor",
      title: "Easy exit",
      text: "Leave a room and return to home"
    },
    {
      icon: "code",
      title: "Node.js",
      text: "Realtime chat with Socket.io"
    }
  ],
  Pokedex: [
    {
      icon: "frontend",
      title: "1,000 Pokémon",
      text: "Browse a large catalog in one app"
    },
    {
      icon: "detail",
      title: "Favorites list",
      text: "Save and remove Pokémon from a personal list"
    },
    {
      icon: "clarity",
      title: "Full search",
      text: "Look up any Pokémon and its characteristics"
    },
    {
      icon: "shield",
      title: "Authentication",
      text: "Login-protected experience"
    }
  ],
  Naturatours: [
    {
      icon: "compass",
      title: "Tour agency site",
      text: "Built for a Puerto Vallarta operator"
    },
    {
      icon: "frontend",
      title: "Product showcase",
      text: "Landing page that presents tours clearly"
    },
    {
      icon: "calendar",
      title: "Reservations",
      text: "Visitors can book directly from the site"
    },
    {
      icon: "cube",
      title: "WordPress CMS",
      text: "Content managed in Gutenberg"
    }
  ]
}
