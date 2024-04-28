"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

const About = () => {
  useEffect(() => {
    document.title = "About | ThisIsSanti.dev"

    document.body.classList.add('about');
  
    return () => {
      document.body.classList.remove('about');
    };
  }, [])
  return (
    <>
      <section id='about'>
        <div className='about_wrapper square-animation animate__animated'>
          <Image
            src='/images/Icons/avatar-santi-git.svg'
            //src='/images/Icons/AvatarSanti.webp'  
            alt='Santi Avatar'
            priority={true}
            width={250}
            height={250}
            quality={100}
            title='Santi Avatar'
            className='santi_avatar transition-opacity opacity-0 duration-2s'
            onLoad={(image) => image.currentTarget.classList.remove("opacity-0")}
          />
          {
            <p className='about_text animate__fadeIn'>
              I am a programmer who has a deep love for coding and technology. My
              passion extends to UX & UI design, I consider myself an expert
              in Frontend and a devoted enthusiast of Backend. I am always
              immersed in learning new technologies, driven by my commitment to
              developing specialized and scalable technology for new projects.
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
            <Link className='button-generic' href='/skills'>
              Skills
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
