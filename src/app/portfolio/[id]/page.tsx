import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 0,
    name: "eCommerce",
    img: "https://i.ibb.co/4FW5BKJ/Thumbnail-e-Commerce-Backend.webp",
    description: "E-commerce made with node.js, DAOS Factory, Login, passport.",
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
    img: "https://i.ibb.co/N7vn7HN/Thumbnail-Screenshot-Pokedex.webp",
    description:
      "Pokedex application made with node.js with auth2.0 pasport login.",
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
    description: "Landing page.",
    img: "https://i.ibb.co/hsT0RM6/www-abrazodelarbol-com.webp",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://abrazodelarbol.com",
  },
  {
    id: 3,
    name: "Live Chat App",
    img: "https://i.ibb.co/DGGCjmV/Thumbnail-Chat-App.webp",
    description: "Live chat app made with Socket.io and node.js.",
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
    name: "Tecno tienda",
    description: "E-commerce made with react and firebase.",
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
    description: "Tours page made with Wordpress CMS.",
    img: "https://i.ibb.co/V9y1RRg/naturatours.webp",
    tech: ["https://cdn-icons-png.flaticon.com/512/174/174881.png"],
    url: "https://naturatours.com.mx/",
  },
  {
    id: 6,
    name: "eCommerce Js",
    img: "https://i.ibb.co/Bc0xLhH/santi-iztli-github-io-proyecto-JS-copia.webp",
    description: "E-commerce made with JavaScript",
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
    name: "Invitación ",
    description: "Wedding invitation with google form.",
    img: "https://i.ibb.co/3fpgptn/invitacion-thumbnail.png",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://santiagomorera.github.io/DeliaYSantiagoInvi/",
  },
];

const projectDetails = async ({ params }: any) => {
  const project = projects.find((project) => project.id == params.id);

  return (
    <>
      <section id="portfolio">
        <div className="main-container animate__animated animate__fadeIn">
          <h2>{project?.name}</h2>
          <p className="details">Details</p>
          <div className="project-detail-container">
            <div className="project-row">
              <Image
                className="project-thumbnail"
                src={`${project?.img}`}
                alt="imagen"
                width={250}
                height={220}
                /* style={{ objectFit: "contain", borderRadius: "10px" }} */
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
                        src="https://cdn.shopify.com/s/files/1/0343/2824/8459/files/arrow-right-rounded.svg"
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
