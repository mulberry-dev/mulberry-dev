"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

const About = () => {
  useEffect(() => {
    document.title = "ThisIsSanti.dev | About"
  }, [])
  return (
    <>
      <section id='about'>
        <div className='about_wrapper square-animation animate__animated animate__fadeIn'>
          <Image
            src='/images/Icons/AvatarSanti.webp'
            alt='Santi Avatar'
            priority={true}
            width={150}
            height={150}
            quality={100}
            title='Santi Avatar'
            className='santi_avatar transition-opacity opacity-0 duration-2s'
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
          {
            <p className='about_text'>
              Programmer who loves code and technology, taste for UX & UI
              design, constantly focused on learning new technologies, comitted
              to developing specialized and scalable technology in new projects.
            </p>
          }
          <div className='buttons_container'>
            <Link className='button smallest ' href={"/"}>
              <Image
                src='/images/Icons/arrow-right-rounded.svg'
                alt='go-back'
                className='go_back'
                width={40}
                height={40}
                title='Go back'
              />
            </Link>
            <Link className='button-generic' href='/education'>
              Education
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
