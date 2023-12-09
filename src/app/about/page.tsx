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
            src='/images/Icons/avatar-santi-git.svg'
            alt='Santi Avatar'
            priority={true}
            width={250}
            height={250}
            quality={100}
            title='Santi Avatar'
            className='santi_avatar transition-opacity opacity-0 duration-2s'
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
          {
            <p className='about_text'>
              Programmer who loves coding and technology, with a penchant for UX
              & UI design. Constantly focused on learning new technologies,
              committed to developing specialized and scalable technology in new
              projects.
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
