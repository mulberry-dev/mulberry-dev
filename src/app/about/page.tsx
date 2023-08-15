import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <>
      <section id="about">
        <div className="about_wrapper animate__animated animate__fadeIn">
          <Image
            src="https://i.ibb.co/8sW46Qz/Avatar-Santi.webp"
            alt="Santi Avatar"
            width={150}
            height={150}
            title="Santi Avatar"
          />
          <p className="about_text">
            Hi! I´m Santiago, programmer who loves code and technology, taste
            for UX & UI design, constantly focused on learning new technologies,
            comitted to developing specialized and scalable technology in new
            projects.
          </p>
          <Link className="button-generic" href="/education">
            Education
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
