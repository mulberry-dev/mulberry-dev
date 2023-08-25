"use client";

import Image from "next/image";
import Link from "next/link";

const certificates = [
  {
    id: 0,
    url: "https://i.ibb.co/JthtvHF/Carrera-Desarrollo-Full-Stack.webp",
  },
  {
    id: 1,
    url: "https://i.ibb.co/vvr5Xtb/Carrera-Desarrollo-Front-End.webp",
  },
  {
    id: 2,
    url: "https://i.ibb.co/vmqp5Dm/Carrera-Desarrollo-De-Aplicaciones.webp",
  },
  {
    id: 3,
    url: "https://i.ibb.co/9q4fpXJ/Programacion-Backend.webp",
  },
  {
    id: 4,
    url: "https://i.ibb.co/KqHS32t/ReactJs.webp",
  },
  {
    id: 5,
    url: "https://i.ibb.co/tzSDNKf/Java-Script.webp",
  },
  {
    id: 6,
    url: "https://i.ibb.co/mS0Gc0V/Desarrollo-Web.webp",
  },
  {
    id: 7,
    url: "https://i.ibb.co/FYwGzJy/Ciberseguridad.webp",
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
                        width={600}
                        height={550}
                        style={{ objectFit: "contain" }}
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
                src="https://cdn.shopify.com/s/files/1/0343/2824/8459/files/arrow-right-rounded.svg"
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
