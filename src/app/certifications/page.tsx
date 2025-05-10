"use client"

import Image from "next/image"
import { certificates } from "@/data/certificates"
import PageTitle from "@/components/PageTitle"
import NavigationButtons from "@/components/NavigationButtons"

const CertificateItem = ({
  certificate,
  index
}: {
  certificate: any
  index: number
}) =>
  <div
    key={index}
    className={index === 0 ? "carousel-item active" : "carousel-item"}
    data-bs-interval="3000"
  >
    <Image
      src={certificate.url}
      alt={certificate.url}
      priority={true}
      className="d-block w-100 certificado transition-opacity opacity-0 duration-2s"
      onLoad={image => image.currentTarget.classList.remove("opacity-0")}
      width={718}
      height={550}
    />
  </div>

const Education = () => {
  return (
    <section>
      <PageTitle title="Certifications" bodyClass="certifications" />
      <div className="certificates_container animate__animated animate__fadeIn">
        <h2 className="h2">9 Certifications</h2>
        <div className="certificates_container square-animation-vertical">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {certificates.map((_, index) =>
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                />
              )}
            </div>
            <div className="carousel-inner">
              {certificates.map((certificate, index) =>
                <CertificateItem
                  key={index}
                  certificate={certificate}
                  index={index}
                />
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <NavigationButtons
          backLink="/portfolio"
          nextLink="/contact"
          nextText="Contact"
        />
      </div>
    </section>
  )
}

export default Education
