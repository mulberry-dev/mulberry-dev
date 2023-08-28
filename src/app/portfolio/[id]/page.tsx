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
      "eCommerce (with Chat) developed with Node.js (Layered Architecture), Socket.io, DAOS Factory (Multiple DB), MongoDB, Winston Logger, Nodemailer, Twilio, OAuth 2.0, Passport & Redis. ",
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
      "Pokedex app, developed with Node.js, Winston Logger, Nodemailer, OAuth 2.0, Passport & Redis.",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png",
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
    description: "Landing page of a tai chi school.",
    img: "/images/Webp/AbrazoDelArbol.webp",
    tech: [
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
    description: "Live chat app developed with Socket.io and Node.js.",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://socket.io/images/logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png",
    ],
    url: "https://live-chat-app3.glitch.me/",
  },
  {
    id: 4,
    name: "Tecno Shop",
    description:
      "Ecommerce developed with React.js, Firebase DB besides product categories and stock in database.",
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
    description: "Tour agency page developed with WordPress CMS.",
    img: "https://i.ibb.co/VTrr8C7/Natura-Tours.webp",
    tech: ["https://cdn-icons-png.flaticon.com/512/174/174881.png"],
    url: "https://naturatours.com.mx/",
  },
  {
    id: 6,
    name: "eCommerce Js",
    img: "/images/Webp/eCommerceJs.webp",
    description:
      "eCommerce developed with JavaScript Vanilla, dark mode theme.",
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
    description: "Wedding invitation with Google Form.",
    img: "/images/Webp/Invitation.webp",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://santiagomorera.github.io/DeliaYSantiagoInvi/",
  },
  /*   {
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
    url: "https://santiagomorera.github.io/DeliaYSantiagoInvi/",
  }, */
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
              {/* <Image
                src={`/images/Icons/loader.gif`}
                alt="loader"
                width={100}
                height={100}
                id={"loader"}
              /> */}

              <Image
                className="project-thumbnail transition-opacity opacity-0 duration-2s"
                /* onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                } */
                onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                }
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
                        key={`${project.id}`}
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
