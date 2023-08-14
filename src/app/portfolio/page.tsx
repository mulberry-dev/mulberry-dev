"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const projects = [
  {
    id: 0,
    name: "eCommerce",
    img: "https://i.ibb.co/4FW5BKJ/Thumbnail-e-Commerce-Backend.webp",
    tech: ["Node.js", "React.js", "HTML", "CSS3"],
    url: "https://ecommerce-backend-43495.fly.dev/",
  },
  {
    id: 1,
    name: "Pokedex",
    img: "https://i.ibb.co/N7vn7HN/Thumbnail-Screenshot-Pokedex.webp",
    tech: ["Node.js", "React.js", "HTML", "CSS3"],
    url: "https://pokedex-santi-dev.fly.dev/",
  },
  {
    id: 2,
    name: "Abrazodelarbol.com",
    img: "https://i.ibb.co/hsT0RM6/www-abrazodelarbol-com.webp",
    tech: ["Node.js", "React.js", "HTML", "CSS3"],
    url: "https://abrazodelarbol.com",
  },
  {
    id: 3,
    name: "Live Chat App",
    img: "https://i.ibb.co/4dfysC0/Thumbnail-Chat-App.webp",
    tech: ["Node.js", "React.js", "HTML", "CSS3"],
    url: "https://live-chat-app3.glitch.me/",
  },
  {
    id: 4,
    name: "Tecno tienda",
    img: "https://i.ibb.co/BzLW7D1/tecnotienda.png",
    tech: ["Node.js", "React.js", "HTML", "CSS3"],
    url: "https://tecno-tienda.netlify.app/",
  },
  {
    id: 5,
    name: "Naturatours",
    img: "https://i.ibb.co/j5x4fm4/Thumbnail-naturatours.webp",
    tech: ["WordPress"],
    url: "https://naturatours.com.mx/",
  },
  {
    id: 6,
    name: "eCommerce Js",
    img: "https://i.ibb.co/1R2FJR5/Thumbnail-e-Commerce-JS.webp",
    tech: ["Node.js", "React.js", "HTML", "CSS3"],
    url: "https://santiagomorera.github.io/proyectoJS/#index",
  },
];

const Portfolio = () => {
  const router = useRouter();

  return (
    <>
      <section id="portfolio">
        <div className="d-flex justify-content-center flex-column align-items-center animate__animated animate__fadeIn z-3 position-absolute p-5 rounded-3">
          <h2>Portfolio</h2>
          <p className="hover-me">Hover the cubes</p>
          <div className="projects-container">
            {projects?.map((project) => (
              <div key={project.id} className={`project-item`}>
                <div className="preject-header">
                  <h3>{project.name}</h3>
                </div>
                <figure className="project-image">
                  <Image
                    src={project.img}
                    alt={`${project.img}-image`}
                    width={135}
                    height={120}
                  />
                </figure>
                <div className="project-hover-card">
                  <p>{project.name}</p>
                  <div
                    className="boton"
                    onClick={() => {
                      router.push(`/portfolio/${project.id}`);
                    }}
                  >
                    Details
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link className="button-generic" href="/contact">
            Go contact
          </Link>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
