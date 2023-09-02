"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const skills = [
  {
    id: 0,
    name: "HTML5",
    imageSrc: "/images/Icons/tech/HTML.webp",
    experience: 5,
    unite: "Years",
    progress: 85,
  },
  {
    id: 1,
    name: "CSS3",
    imageSrc: "/images/Icons/tech/CSS3.webp",
    experience: 5,
    unite: "Years",
    progress: 85,
  },
  {
    id: 2,
    name: "JavaScript",
    imageSrc: "/images/Icons/tech/JavaScript.webp",
    experience: 4,
    unite: "Years",
    progress: 60,
  },
  {
    id: 3,
    name: "TypeScript",
    imageSrc: "/images/Icons/tech/TypeScript.webp",
    experience: 2,
    unite: "Years",
    progress: 60,
  },
  {
    id: 4,
    name: "React",
    imageSrc: "/images/Icons/tech/Ico-react.webp",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 5,
    name: "Next.js",
    imageSrc: "/images/Icons/tech/NextJs.webp",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 6,
    name: "Node.js",
    imageSrc: "/images/Icons/tech/node.webp",
    experience: 2,
    unite: "Years",
    progress: 75,
  },
  {
    id: 7,
    name: "Nest.js",
    imageSrc: "/images/Icons/tech/Nest.svg",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 8,
    name: "React Native",
    imageSrc: "/images/Icons/tech/Ico-react.webp",
    experience: 1,
    unite: "Year",
    progress: 40,
  },
  {
    id: 9,
    name: "Bootstrap",
    imageSrc: "/images/Icons/tech/Bootstrap.webp",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 10,
    name: "Redux",
    imageSrc: "/images/Icons/tech/Redux.webp",
    experience: 1,
    unite: "Year",
    progress: 50,
  },
  {
    id: 11,
    name: "Sass",
    imageSrc: "/images/Icons/tech/Sass.svg",
    experience: 3,
    unite: "Years",
    progress: 90,
  },
  {
    id: 12,
    name: "Material UI",
    imageSrc: "/images/Icons/tech/MUI.webp",
    experience: 3,
    unite: "Years",
    progress: 90,
  },
  {
    id: 13,
    name: "TailwindCSS",
    imageSrc: "/images/Icons/tech/Tailwind-CSS.webp",
    experience: 3,
    unite: "Months",
    style: { width: "120%" },
    progress: 40,
  },
  {
    id: 14,
    name: "WordPress",
    imageSrc: "/images/Icons/tech/WordPress.webp",
    experience: 3,
    unite: "Years",
    style: { width: "120%" },
    progress: 75,
  },
  {
    id: 15,
    name: "C#",
    imageSrc: "/images/Icons/tech/c.svg",
    experience: 3,
    unite: "Months",
    style: { width: "120%" },
    progress: 10,
  },
  {
    id: 16,
    name: ".NET Core",
    imageSrc: "/images/Icons/tech/NET_Core_Logo.svg",
    experience: 3,
    unite: "Months",
    style: { width: "120%" },
    progress: 10,
  },
  {
    id: 17,
    name: "Java",
    imageSrc: "/images/Icons/tech/java.svg",
    experience: 3,
    unite: "Months",
    style: { width: "120%" },
    progress: 5,
  },
  {
    id: 18,
    name: "Spring",
    imageSrc: "/images/Icons/tech/spring.svg",
    experience: 3,
    unite: "Months",
    style: { width: "120%" },
    progress: 5,
  },
  {
    id: 19,
    name: "PostgresSQL",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968342.png",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
];

const dataBases = [
  {
    id: 0,
    name: "MongoDB",
    imageSrc: "/images/Icons/tech/MongoDb.webp",
    experience: 5,
    unite: "Years",
    progress: 85,
  },
  {
    id: 1,
    name: "PostgreSQL",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    experience: 5,
    unite: "Years",
    progress: 85,
  },
  {
    id: 2,
    name: "MySQL",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    experience: 4,
    unite: "Years",
    progress: 60,
  },
  {
    id: 3,
    name: "SQLite",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png",
    experience: 2,
    unite: "Years",
    progress: 60,
  },
];

function Skills() {
  const [selected, setSelected] = useState("");

  const onChange = (e: any) => {
    console.log(e.target.innerText);
    /* setSelected(); */
  };

  return (
    <section id="skills">
      <div className="skills_container animate__animated animate__fadeIn">
        <h2 className="h2">Skills</h2>
        {/* <div className="d-flex ">
          <button className="button-generic" onClick={onChange}>
            Languajes
          </button>
          <button className="button-generic" onClick={onChange}>
            DataBases
          </button>
          <button className="button-generic" onClick={onChange}>
            UI
          </button>
        </div> */}
        <p className="hover-me">Click the cubes</p>

        <div className="cubes_container">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`skill-item transition menuitem-${skill.id} blur`}
            >
              <Image
                src={skill.imageSrc}
                alt={`${skill.name}-image`}
                width={90}
                priority={true}
                height={90}
                style={{ objectFit: "contain" }}
                /* className="transition-opacity opacity-0 duration-1s"
                onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                } */
              />
              <p>{skill.name}</p>
              <div className="skill-hover-card">
                <label htmlFor="skill">
                  {skill.experience} {skill.unite}
                </label>
                <progress id="file" max="100" value={skill.progress}></progress>
                <label htmlFor="skill">{skill.progress}%</label>
              </div>
            </div>
          ))}
        </div>
        <div className="buttons_container  menuitem-13">
          <Link className="button smallest " href={"/education"}>
            <Image
              src="/images/Icons/arrow-right-rounded.svg"
              alt="go-back"
              className="go_back"
              width={40}
              height={40}
              /* style={{ objectFit: "contain" }} */
              title="Go back"
            />
          </Link>
          <Link href="/portfolio" className="button-generic transition">
            Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Skills;
