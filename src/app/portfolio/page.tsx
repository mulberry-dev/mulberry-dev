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
    name: "Abrazodelarbol",
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
    name: "Tecno Shop",
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
  {
    id: 7,
    name: "Invitation",
    description: "Wedding invitation with google form.",
    img: "https://i.ibb.co/3fpgptn/invitacion-thumbnail.png",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://www.freepnglogos.com/uploads/javascript-png/png-javascript-badge-picture-8.png",
    ],
    url: "https://santiagomorera.github.io/proyectoJS/#index",
  },
];

const Portfolio = () => {
  const router = useRouter();

  return (
    <>
      <section id="portfolio">
        <div className="portfolio_container animate__animated animate__fadeIn">
          <h2>Portfolio</h2>
          <p className="hover-me">Click for details</p>
          <div className="projects-container">
            {projects?.map((project) => (
              <div
                key={project.id}
                className={`project-item`}
                onClick={() => {
                  router.push(`/portfolio/${project.id}`);
                }}
              >
                <div className="preject-header">
                  <h3>{project.name}</h3>
                </div>
                <figure className="project-image">
                  <Image
                    src={project.img}
                    alt={`${project.img}-image`}
                    className="project-image"
                    width={135}
                    height={120}
                  />
                </figure>
              </div>
            ))}
          </div>
          <div className="buttons_container">
            <Link className="button smallest " href={"/skills"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0343/2824/8459/files/arrow-right-rounded.svg"
                alt="go-back"
                className="go_back"
                width={40}
                height={40}
                title="Go back"
              />
            </Link>
            <Link className="button-generic" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
