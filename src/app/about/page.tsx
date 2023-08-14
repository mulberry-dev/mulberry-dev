import EducationModule from "@/components/education";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <>
      <section id="about">
        <div className="about-wrapper animate__animated animate__fadeIn">
          <Image
            src="https://i.ibb.co/8sW46Qz/Avatar-Santi.webp"
            alt="Santi Avatar"
            width={150}
            height={150}
            title="Santi Avatar"
          />
          <p className="about-text">
            Hi! i´m Santiago , 30 years old , born in México City, full stack
            developer JavaScript, programmer who loves code and technology,
            taste for experience and user interface design, constantly focused
            on learning new technologies, comitted to developing specialized and
            scalable technology in new projects.
            <Link className="button-generic" href="/education">
              Education
            </Link>
          </p>
        </div>
      </section>
      {/*  <EducationModule /> */}
    </>
  );
};

export default About;
