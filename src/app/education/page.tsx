"use client";

import Image from "next/image";
import Link from "next/link";

/* const certificates = [
  {
    id: 1,
    url: "https://i.ibb.co/4jPJSMd/carrera-De-Desarrollo-Full-Stack-INGTop10.png",
  },
  {
    id: 2,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 3,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
  {
    id: 4,
    url: "https://i.ibb.co/4jPJSMd/carrera-De-Desarrollo-Full-Stack-INGTop10.png",
  },
  {
    id: 5,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 6,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
  {
    id: 7,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 8,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
];
 */
const Education = () => {
  return (
    <>
      <section>
        <div className="certificates_container animate__animated animate__fadeIn">
          <h2 className="h2">Certificates</h2>
          <div className="certificates_container">
            <div
              id="carouselExampleDark"
              className="carousel carousel-light slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="2000">
                  <Image
                    src="https://i.ibb.co/4jPJSMd/carrera-De-Desarrollo-Full-Stack-INGTop10.png"
                    className="d-block w-100 certificado"
                    alt="carreraDesarrolloDeAplicacione-certificado"
                    width={600}
                    height={550}
                    style={{ objectFit: "contain" }}
                  />
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <Image
                    src="https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png"
                    className="d-block w-100 certificado"
                    alt="carreraFullStack-certificado"
                    width={600}
                    height={550}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <Image
                    src="https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png"
                    className="d-block w-100 certificado"
                    alt="carreraDesarrolloFront-certificado"
                    width={600}
                    height={550}
                    style={{ objectFit: "contain" }}
                  />
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
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
                data-bs-target="#carouselExampleDark"
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
