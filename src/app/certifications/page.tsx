"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { certificates } from "@/data/certificates"

const Education = () => {
  useEffect(() => {
    document.title = "Certifications | ThisIsSanti.dev"
  }, [])

  return (
    <section>
      <div className='certificates_container animate__animated animate__fadeIn'>
        <h2 className='h2'>9 Certifications</h2>
        <div className='certificates_container'>
          <div
            id='carouselExampleIndicators'
            className='carousel slide'
            data-bs-ride='carousel'
          >
            <div className='carousel-indicators'>
              {certificates.map((certificate, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    data-bs-target='#carouselExampleIndicators'
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                  ></button>
                )
              })}
            </div>
            <div className='carousel-inner'>
              {certificates.map((certificate, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                    data-bs-interval='3000'
                  >
                    <Image
                      src={certificate.url}
                      alt={certificate.url}
                      priority={true}
                      className='d-block w-100 certificado transition-opacity opacity-0 duration-2s'
                      onLoadingComplete={(image) =>
                        image.classList.remove("opacity-0")
                      }
                      width={718}
                      height={550}
                    />
                  </div>
                )
              })}
            </div>
            <button
              className='carousel-control-prev'
              type='button'
              data-bs-target='#carouselExampleIndicators'
              data-bs-slide='prev'
            >
              <span
                className='carousel-control-prev-icon'
                aria-hidden='true'
              ></span>
              <span className='visually-hidden'>Previous</span>
            </button>
            <button
              className='carousel-control-next'
              type='button'
              data-bs-target='#carouselExampleIndicators'
              data-bs-slide='next'
            >
              <span
                className='carousel-control-next-icon'
                aria-hidden='true'
              ></span>
              <span className='visually-hidden'>Next</span>
            </button>
          </div>
        </div>
        <div className='buttons_container' style={{ marginTop: "-40px" }}>
          <Link className='button smallest ' href={"/skills"}>
            <Image
              src='/images/Icons/arrow-right-rounded.svg'
              alt='go-back'
              className='go_back'
              width={40}
              height={40}
              title='Go back'
            />
          </Link>
          <Link className='button-generic' href='/contact'>
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Education
