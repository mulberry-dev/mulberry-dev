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
            className="santi_avatar"
          />
          {/*       <p className="about_text">
            Scuba diver, animal trainer & programmer{" "}
          </p> */}
          {
            <p className="about_text">
              Programmer who loves code and technology, taste for UX & UI
              design, constantly focused on learning new technologies, comitted
              to developing specialized and scalable technology in new projects.
            </p>
          }
          <div className="buttons_container">
            <Link className="button smallest " href={"/"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0343/2824/8459/files/arrow-right-rounded.svg"
                alt="go-back"
                className="go_back"
                width={40}
                height={40}
                title="Go back"
              />
            </Link>
            <Link className="button-generic" href="/education">
              Education
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
