export type ProjectCategory = "web" | "landing" | "api" | "ecommerce"

export const data = [
  {
    id: "FuenteDeVidaResidencial",
    name: "Fuente de Vida Residencial",
    category: "landing",
    description:
      "Marketing website for a residential development in Comitán de Domínguez, Chiapas. The experience presents lots from 1,000 m² with a nature-first brand, bilingual content, an interactive masterplan lightbox, animated stats, and visit-scheduling CTAs designed to convert interest into on-site appointments. (2025)",
    img: "/images/Webp/fuente-de-vida.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Material UI",
        icon: "/images/Icons/svg/mui.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://fuente-de-vida-residencial.vercel.app/",
    thumbnail: "/images/thumbnails/fuente-de-vida.webp",
    github: null
  },
  {
    id: "MulberryMarketing",
    name: "Mulberry Marketing",
    category: "web",
    description:
      "Boutique agency site that unifies strategy, creativity, and technology. It includes service deep-dives (social, content, ads, UX/UI, custom web, and e-commerce), case studies with measurable outcomes, resource content, and a conversion-focused contact flow with a 3D brand moment in the hero. (2025)",
    img: "/images/Webp/mulberry-marketing.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://mulberry-marketing.vercel.app/",
    thumbnail: "/images/thumbnails/mulberry-marketing.webp",
    github: null
  },
  {
    id: "CeciliaRodriguez",
    name: "Digital Business Card & Landing Page",
    category: "landing",
    description:
      "Digital business card and landing page for an eXp Realty México agent in CDMX. One-tap actions for call, WhatsApp, email, and contact saving, plus clear buy/sell/rent paths and trust signals for international-backed transactions. Built as a fast, mobile-first presentation site. (2025)",
    img: "/images/Webp/cecilia-rodriguez.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://cecilia-rodriguez.vercel.app/",
    thumbnail: "/images/thumbnails/cecilia-rodriguez.webp",
    github: null
  },
  {
    id: "MulberryDrone",
    name: "Mulberry Drone",
    category: "landing",
    description:
      "Portfolio site for certified aerial photography and videography in CDMX. It showcases 4K cinematic work, commercial services for marketing and inspections, a photo gallery, and WhatsApp-first contact so clients can brief a shoot quickly. (2025)",
    img: "/images/Webp/mulberry-drone.webp",
    tech: [
      {
        tech: "Next.js",
        icon: "/images/Icons/svg/Next.js.svg"
      },
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://mulberry-drone.vercel.app/",
    thumbnail: "/images/thumbnails/mulberry-drone.webp",
    github: null
  },
  {
    id: "SalonTarget",
    name: "SalonTarget",
    category: "web",
    description:
      "I contribute to the ongoing modernization of SalonTarget's all-in-one salon and spa management platform. I help migrate legacy systems from PHP and Node.js to a modern stack using React, Apollo GraphQL, and TypeORM, enhancing performance and maintainability. I also support the integration of a new payment processor with banking terminals to streamline checkout and improve the user experience for salon staff and clients. (2025-2026)",
    img: "/images/Webp/salon-target.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Apollo GraphQL",
        icon: "/images/Icons/svg/grapql.svg"
      },
      {
        tech: "TypeORM",
        icon: "/images/Icons/svg/typeorm-seeklogo.svg"
      },
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "Material UI",
        icon: "/images/Icons/svg/mui.svg"
      }
    ],
    url: "https://salontarget.com/",
    thumbnail: "/images/thumbnails/salon-target.webp",
    github: null
  },
  {
    id: "SsoSamlOkta",
    name: "SSO SAML Okta API",
    category: "api",
    description:
      "I designed and developed an authentication and Single Sign-On (SSO) Security Assertion Markup Language (SAML) API from the ground up using Node.js with TypeScript. The implementation includes seamless integration with OKTA, a leading identity management platform. This custom API facilitates secure and efficient user authentication, allowing seamless access to multiple applications through a unified sign-on process. The use of TypeScript ensures a robust and maintainable codebase. (2023)",
    img: "/images/thumbnails/sso-saml-okta.png",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "Okta",
        icon: "/images/Icons/svg/okta.svg"
      },
      {
        tech: "Amazon Web Services",
        icon: "/images/Icons/svg/aws.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/auth0-okta.png",
    width: 1024,
    height: 561
  },
  {
    id: "ManagerProxy",
    name: "Proxy Manager API",
    category: "api",
    description:
      "I built a Manager Proxy API from scratch that consumed data from 8 microservices hosted on the private AWS domain. The primary purpose of this API was to enable access to the microservices from a public network without the need for a VPN. By orchestrating communication between the private microservices and the public network, the Manager Proxy API enhances security and ensures seamless data retrieval without compromising the integrity of the private domain. This solution optimizes accessibility while maintaining a secure and efficient data exchange between the private AWS domain and the external public network. (2023)",
    img: "/images/thumbnails/proxy-manager-aws.png",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "Amazon Web Services",
        icon: "/images/Icons/svg/aws.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/proxy-manager-api.png",
    width: 1024,
    height: 682
  },
  {
    id: "ElectronicBilling",
    name: "Electronic Billing GS",
    category: "api",
    description:
      "This application, developed for Grupo Salinas, features a React-based frontend and a Node.js backend comprising over 15 microservices. Authentication is implemented through OKTA single sign-on, and the user interface is built using Ant Design. The application serves as an invoice issuance platform, connected to the SAT API for efficient data exchange and compliance with tax regulations, built in AWS. (2024)",
    img: "/images/Webp/FacturacionElectronica.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Okta",
        icon: "/images/Icons/svg/okta.svg"
      },
      {
        tech: "Redux",
        icon: "/images/Icons/svg/redux.svg"
      },
      {
        tech: "Amazon Web Services",
        icon: "/images/Icons/svg/aws.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      },
      {
        tech: "Ant Design",
        icon: "/images/Icons/svg/ant.svg"
      },
      {
        tech: "Docker",
        icon: "/images/Icons/svg/docker.svg"
      }
    ],
    thumbnail: "/images/thumbnails/Thumbnail-PIFE.webp",
    url: null,
    github: null
  },
  {
    id: "MiBlog",
    name: "Mi Blog",
    category: "web",
    description:
      "A blog developed in Next.js includes an admin panel that allows users to add or delete posts. The platform features a login and authentication system and supports an Offline Mode with Local Storage. (2023)",
    img: "/images/Webp/mi-blog.webp",

    tech: [
      {
        tech: "Next.js",
        icon: "/images/Icons/svg/Next.js.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "MongoDB",
        icon: "/images/Icons/svg/mongo.svg"
      },
      {
        tech: "SQL",
        icon: "/images/Icons/svg/sql.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/mi-blog.webp",
    github: "https://github.com/oneriddle/My-Blog"
  },
  {
    id: "eCommerce",
    name: "eCommerce",
    category: "ecommerce",
    img: "/images/thumbnails/ecommerce-backend.png",
    description:
      "An eCommerce platform, developed in Node.js, features a chat functionality. It enables users to add and delete products from the shopping cart, incorporates a login and authentication system, and sends a confirmation email upon registration. Users can access their profiles, view personal data, and upon completing a purchase, receive an email containing details of the purchased products. The platform is tested using Mocha. (2023)",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Handlebars",
        icon: "/images/Icons/svg/handlebars.svg"
      },
      {
        tech: "Socket.io",
        icon: "/images/Icons/svg/socket-io.svg"
      },
      {
        tech: "MongoDB",
        icon: "/images/Icons/svg/mongo.svg"
      },
      {
        tech: "Redis",
        icon: "/images/Icons/svg/redis.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      },
      {
        tech: "Node Mailer",
        icon: "https://nodemailer.com/nm_logo_200x136.png"
      },
      {
        tech: "Mocha testing",
        icon: "/images/Icons/svg/mocha.svg"
      },
      {
        tech: "Twilio",
        icon: "/images/Icons/svg/twilio.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "Bootstrap",
        icon: "/images/Icons/svg/bootstrap.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    thumbnail: "/images/thumbnails/ecommerce-backend.png",
    url: null,
    github: null,
    width: 1024,
    height: 682
  },
  {
    id: "TreeHug",
    name: "Tree Hug",
    category: "landing",
    description:
      "A landing page developed in Vanilla JavaScript for a martial arts school. It facilitates course and product purchases through Mercado Pago. (2023)",
    img: "/images/Webp/AbrazoDelArbol.webp",
    tech: [
      {
        tech: "Mercado pago",
        icon: "/images/Icons/svg/mercado-pago.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      }
    ],
    url: "https://landing-page-pi-lemon.vercel.app",
    thumbnail: "/images/thumbnails/www-abrazodelarbol-com.webp",
    github: null
  },
  {
    id: "TecnoShop",
    name: "Tecno Shop",
    category: "ecommerce",
    description:
      "This application is a computer e-commerce platform developed in React.js. Users can select a category of products, add items to a shopping cart, and remove them. Upon completing a purchase, the available product stock decreases.",
    img: "/images/Webp/TecnoShop.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "Firebase",
        icon: "/images/Icons/svg/firebase.svg"
      }
    ],
    url: "https://tech-shop-tau.vercel.app",
    thumbnail: "/images/thumbnails/tecnotienda.webp",
    github: null
  },
  {
    id: "eCommerceJs",
    name: "eCommerce Js",
    category: "ecommerce",
    img: "/images/Webp/eCommerceJs.webp",
    description:
      "This web page, developed with Vanilla JavaScript, is an eCommerce platform that enables users to add products to the cart and complete purchases. It includes a dark/light theme and served as the final project for a JavaScript course. (2022)",
    tech: [
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      },
      {
        tech: "Bootstrap",
        icon: "/images/Icons/svg/bootstrap.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      }
    ],
    url: "https://proyecto-js-mu.vercel.app",
    thumbnail: "/images/thumbnails/Thumbnail-e-Commerce-JS.webp",
    github: null
  },
  /* {
    id: 5,
    name: "Invitation",
    description:
    "This is an invitation for a wedding, where guests can confirm attendance, as well as know all the details of the event. (2023)",
    img: "/images/Webp/Invitation.webp",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://santiagomorera.github.io/DeliaYSantiagoInvi/",
    thumbnail: "/images/thumbnails/invitacion-thumbnail.webp",
  }, */
  {
    id: "LiveChatApp",
    name: "Live Chat App",
    category: "web",
    img: "/images/Webp/LiveChatApp.webp",
    description:
      "Choose a chat room, engage in conversations with participants inside, and view message timestamps. When ready, you can exit the room and return to the home page. Developed in Node.js. (2023)",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Socket.io",
        icon: "/images/Icons/svg/socket-io.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://livechat-by-santi-dev.fly.dev",
    thumbnail: "/images/thumbnails/Thumbnail-Chat-App.webp",
    github: "https://github.com/oneriddle/LiveChat"
  },
  {
    id: "Pokedex",
    name: "Pokedex",
    category: "web",
    img: "/images/Webp/Pokedex.webp",
    description:
      "This Node.js application enables users to view a list of 1000 Pokémon, add their favorite Pokémon to a list, and remove them. Users can search for any Pokémon and access all its characteristics. The application includes a login and authentication feature. (2023)",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Handlebars",
        icon: "/images/Icons/svg/handlebars.svg"
      },
      {
        tech: "Socket.io",
        icon: "/images/Icons/svg/socket-io.svg"
      },
      {
        tech: "MongoDB",
        icon: "/images/Icons/svg/mongo.svg"
      },
      {
        tech: "Redis",
        icon: "/images/Icons/svg/redis.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      },
      {
        tech: "Node Mailer",
        icon: "https://nodemailer.com/nm_logo_200x136.png"
      },
      {
        tech: "Mocha testing",
        icon: "/images/Icons/svg/mocha.svg"
      },
      {
        tech: "Bootstrap",
        icon: "/images/Icons/svg/bootstrap.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/Thumbnail-Screenshot-Pokedex.webp",
    github: null
  },
  {
    id: "Naturatours",
    name: "Naturatours",
    category: "landing",
    description:
      "This website was developed using the CMS WordPress for a tour agency in Puerto Vallarta. It features a landing page that allows you to showcase products, make reservations, and complete sales. (2020)",
    img: "https://i.ibb.co/VTrr8C7/Natura-Tours.webp",
    tech: [
      {
        tech: "WordPress",
        icon: "/images/Icons/svg/WordPress.svg"
      },
      {
        tech: "Gutenberg",
        icon: "/images/Icons/svg/gutenberg.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/Thumbnail-naturatours.webp"
  }
]
