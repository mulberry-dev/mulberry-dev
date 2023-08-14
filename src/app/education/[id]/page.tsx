import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 0,
    name: "eCommerce",
    img: "https://thisissanti.dev/src/img/Screenshot%202023-04-06%20083531.png",
    description: "e-commerce made with node.js, DAOS Factory, Login, passport",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png",
      "https://handlebarsjs.com/images/handlebars_logo.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
      "https://static.cdnlogo.com/logos/p/79/passport.svg",
    ],
    url: "https://ecommerce-backend-43495.fly.dev/",
  },
  {
    id: 1,
    name: "Pokedex",
    img: "https://thisissanti.dev/src/img/ScreenshotPokedex.webp",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png",
      "https://handlebarsjs.com/images/handlebars_logo.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
      "https://static.cdnlogo.com/logos/p/79/passport.svg",
    ],
    url: "https://pokedex-santi-dev.fly.dev/",
  },
  {
    id: 2,
    name: "Abrazo del Arbol",
    img: "https://i.ibb.co/hsT0RM6/www-abrazodelarbol-com.webp",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://logos-world.net/wp-content/uploads/2023/02/JavaScript-Logo.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://abrazodelarbol.com",
  },
  {
    id: 3,
    name: "Live Chat App",
    img: "https://thisissanti.dev/src/img/Screenshot%202023-04-06%20083531.png",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
    ],
    url: "https://live-chat-app3.glitch.me/",
  },
  {
    id: 4,
    name: "Tecno tienda",
    img: "https://i.ibb.co/BzLW7D1/tecnotienda.png",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/250px-React.svg.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://tecno-tienda.netlify.app/",
  },
  {
    id: 5,
    name: "Naturatours",
    img: "https://i.ibb.co/V9y1RRg/naturatours.webp",
    tech: ["https://cdn-icons-png.flaticon.com/512/174/174881.png"],
    url: "https://naturatours.com.mx/",
  },
  {
    id: 6,
    name: "eCommerce Js",
    img: "https://i.ibb.co/Bc0xLhH/santi-iztli-github-io-proyecto-JS-copia.webp",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://santiagomorera.github.io/proyectoJS/#index",
  },
  {
    id: 7,
    name: "Invitación ",
    img: "https://i.ibb.co/3fpgptn/invitacion-thumbnail.png",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://www.freepnglogos.com/uploads/javascript-png/png-javascript-badge-picture-8.png",
    ],
    url: "https://santiagomorera.github.io/proyectoJS/#index",
  },
];

const projectDetails = async ({ params }: any) => {
  const project = projects.find((project) => project.id == params.id);

  return (
    <>
      <section id="portfolio">
        <div className="main-container">
          <h2>{project?.name}</h2>
          <p className="details">Details</p>
          <div className="project-detail-container">
            <div className="project-row">
              <Image
                className="project-thumbnail"
                src={`${project?.url}`}
                alt="imagen"
                width={300}
                height={300}
              />
            </div>
            <div className="project-row">
              <div className="project-card">
                <div className="tech-box">
                  <p>Made with:</p>
                  <p>{project?.description}</p>
                  <div className="techContainer">
                    {/*            {project.tech.map((e) => (
                        <Image
                          key={e.id}
                          src={e}
                          width={50}
                          height={50}
                          alt="thumbnail"
                        />
                      ))} */}
                  </div>
                  <div className="button-box">
                    <Link className="button smallest " href={"/portfolio"}>
                      <Image
                        src="https://i.ibb.co/cFn92Y6/7etpgol5vni7a29jfbecupgimi.png"
                        alt="go-back"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link className="boton" href={`${project?.url}`}>
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
