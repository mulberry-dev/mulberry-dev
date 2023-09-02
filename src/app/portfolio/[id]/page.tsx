"use client";

/* import "@/utils/preload"; */
import Image from "next/image";
import Link from "next/link";
/* import { useEffect, useState } from "react"; */

const projects = [
  {
    id: 0,
    name: "eCommerce",
    img: "/images/Webp/eCommerce.webp",
    /* img: "https://i.ibb.co/SnL2zkp/ezgif-com-gif-to-webp.webp", */
    description:
      "eCommerce that contains a chat, developed in Node.js, it allows you to add products to the shopping cart as well as delete them, it has a login and authentication, when you register you will receive an email, you can access your profile and see your data, if you complete a purchase, you will receive an email with the purchased products. (2023)",
    tech: [
      "/images/Icons/tech/node.webp",
      "https://handlebarsjs.com/images/handlebars_logo.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
      "https://static.cdnlogo.com/logos/p/79/passport.svg",
      "https://avatars.githubusercontent.com/u/1529926?s=200&v=4",
      "https://nodemailer.com/nm_logo_200x136.png",
      "https://i.ibb.co/4SBhGSn/pngwing-com.png",
      "https://socket.io/images/logo.svg",
    ],
    url: "https://ecommerce-backend-43495.fly.dev/",
  },
  {
    id: 1,
    name: "Pokedex",
    img: "/images/Webp/Pokedex.webp",
    description:
      "This Node.js application allows you to see a list of 1000 Pokemons and add your favorite pokemons to a list as well as eliminate them, you can search for any Pokemon and see all its characteristics, it has login and authentication. (2023)",
    tech: [
      "/images/Icons/tech/node.webp",
      "https://handlebarsjs.com/images/handlebars_logo.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://sass-lang.com/assets/img/logos/logo.svg",
      "https://static.cdnlogo.com/logos/p/79/passport.svg",
      "https://avatars.githubusercontent.com/u/1529926?s=200&v=4",
    ],
    url: "https://pokedex-santi-dev.fly.dev/",
  },
  {
    id: 2,
    name: "Abrazo del Arbol",
    description:
      "Landing page developed in Vanilla JavaScript, for a martial arts school, it allows you to make purchases of courses and products through Mercado Pago. (2023)",
    img: "/images/Webp/AbrazoDelArbol.webp",
    tech: [
      "/images/Icons/MercadoPago.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://abrazodelarbol.com",
  },
  {
    id: 3,
    name: "Live Chat App",
    img: "/images/Webp/LiveChatApp.webp",
    description:
      "Select a chat room, chat with the people who are inside the room, it will show you the time of the messages, when you decide you can leave the room and return to the home page, developed in Node.js. (2023)",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://socket.io/images/logo.svg",
      "/images/Icons/tech/node.webp",
    ],
    url: "https://live-chat-app3.glitch.me/",
  },
  {
    id: 4,
    name: "Tecno Shop",
    description:
      "This application is a computer ecommerce developed in React.js, where you can choose a category of products, add them to a shopping cart as well as delete them, at the end of the purchase, the stock of the available product decreases.",
    img: "/images/Webp/TecnoShop.webp",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/250px-React.svg.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
      "https://i.ibb.co/LCqHmyX/pngwing-com-1.png",
    ],
    url: "https://tecno-tienda.netlify.app/",
  },
  {
    id: 5,
    name: "Naturatours",
    description:
      "This website was developed with the CMS WordPress, for a tour agency in Puerto Vallarta, a landing page that allows you to publicize your products as well as make reservations and close sales. (2020)",
    img: "https://i.ibb.co/VTrr8C7/Natura-Tours.webp",
    tech: ["https://cdn-icons-png.flaticon.com/512/174/174881.png"],
    url: "https://naturatours.com.mx/",
  },
  {
    id: 6,
    name: "eCommerce Js",
    img: "/images/Webp/eCommerceJs.webp",
    description:
      "This is a web page developed with Vanilla JavaScript, it is an eCommerce that allows you to add the products to the cart, as well as finalize the purchase, it has a dark/light theme, it was the final project of a JavaScript course. (2022)",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://santiagomorera.github.io/proyectoJS/#index",
  },
  {
    id: 7,
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
  },
  {
    id: 8,
    name: "Account Statement Generator",
    description: "Account Statement Generator",
    img: "https://i.ibb.co/jDS8QD4/Captura-de-pantalla-2023-08-21-163247.png",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "#",
  },
];

const projectDetails = async ({ params }: any) => {
  /*  const [load, setLoaded] = useState(true); */
  const project = projects.find((project) => project.id == params.id);

  /*  useEffect(() => {
    return () => {
      const previewImage = document.getElementById("previewProject");
        window?.addEventListener("load", function () {
        var element = document.getElementById("loader");
        element!.style.display = "none !important";
      });
      window.addEventListener("load", function () {
        var element = document.getElementById("loader");
        element!.style.display = "none";
      });
    };
  }, []);
*/

  const loaded = (img: any) => {
    const previewImage = document.getElementById("loader");
    previewImage?.classList.add("display-none");
    img.classList.remove("display-none");
    img.classList.remove("opacity-0");
  };

  return (
    <>
      <section id="portfolio">
        <div className="main-container animate__animated animate__fadeIn">
          <h2>{project?.name}</h2>
          <p className="details">Details</p>
          <div className="project-detail-container">
            <div className="project-row">
              {
                <Image
                  src={`/images/svg-loaders/grid.svg`}
                  alt="loader"
                  width={300}
                  height={250}
                  id={"loader"}
                  style={{
                    position: "absolute",
                    opacity: ".5",
                    transform: "scale(.6)",
                  }}
                />
              }
              <Image
                className="project-thumbnail transition-opacity duration-2s opacity-0"
                onLoadingComplete={(image) => loaded(image)}
                src={`${project?.img}`}
                alt={`${project?.name}-img`}
                placeholder={"blur"}
                blurDataURL={"data:image/webp..."}
                priority={true}
                width={300}
                height={250}
                id={"previewProject"}
              />
            </div>
            <div className="project-row">
              <div className="project-card">
                <div className="tech-box">
                  <h3>Description:</h3>
                  <p>{project?.description}</p>
                  <h3>Used technology:</h3>
                  <div className="tech_container">
                    {project?.tech.map((e) => (
                      <Image
                        key={`${project.id}-${project.name}`}
                        src={e}
                        width={40}
                        height={40}
                        className="tech_ico"
                        style={{ objectFit: "contain" }}
                        alt="thumbnail"
                      />
                    ))}
                  </div>
                  <div className="buttons_container">
                    <Link className="button smallest " href={"/portfolio"}>
                      <Image
                        src="/images/Icons/arrow-right-rounded.svg"
                        alt="go-back"
                        className="go_back"
                        width={40}
                        height={40}
                        title="Go back"
                      />
                    </Link>
                    <Link
                      className="button-generic"
                      href={`${project?.url}`}
                      title={`Go to ${project?.name} site`}
                    >
                      Visit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default projectDetails;
