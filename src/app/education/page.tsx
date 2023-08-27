"use client";

import Image from "next/image";
import Link from "next/link";

const certificates = [
  {
    id: 0,
    url: "/images/Certificates/CarreraDesarrolloDeAplicaciones.webp",
  },
  {
    id: 1,
    url: "/images/Certificates/CarreraDesarrolloFrontEnd.webp",
  },
  {
    id: 2,
    url: "/images/Certificates/CarreraDesarrolloDeAplicaciones.webp",
  },
  {
    id: 3,
    url: "/images/Certificates/ProgramacionBackend.webp",
  },
  {
    id: 4,
    url: "/images/Certificates/ReactJs.webp",
  },
  {
    id: 5,
    url: "/images/Certificates/JavaScript.webp",
  },
  {
    id: 6,
    url: "/images/Certificates/DesarrolloWeb.webp",
  },
  {
    id: 7,
    url: "/images/Certificates/Ciberseguridad.webp",
  },
];

const Education = () => {
  return (
    <>
      <section>
        <div className="certificates_container animate__animated animate__fadeIn">
          <h2 className="h2">Certificates</h2>
          <div className="certificates_container">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {certificates.map((certificate, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                    ></button>
                  );
                })}
              </div>
              <div className="carousel-inner">
                {certificates.map((certificate, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        index === 0 ? "carousel-item active" : "carousel-item"
                      }
                      data-bs-interval="4000"
                    >
                      <Image
                        src={certificate.url}
                        alt={certificate.url}
                        className="d-block w-100 certificado"
                        width={718}
                        height={600}
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="buttons_container" style={{ marginTop: "-40px" }}>
            <Link className="button smallest " href={"/about"}>
              <Image
                src="/images/Icons/arrow-right-rounded.svg"
                alt="go-back"
                className="go_back"
                width={40}
                height={40}
                title="Go back"
              />
            </Link>
            <Link className="button-generic" href="/skills">
              Skills
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
