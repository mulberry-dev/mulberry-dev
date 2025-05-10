"use client"

import Image from "next/image"
import PageTitle from "@/components/PageTitle"
import NavigationButtons from "@/components/NavigationButtons"

const AvatarImage = ({ src, className }: { src: string; className: string }) =>
  <Image
    src={src}
    alt="Santi Avatar"
    priority={true}
    width={250}
    height={250}
    quality={100}
    title="Santi Avatar"
    className={`${className} transition-opacity opacity-0 duration-2s`}
    onLoad={image => image.currentTarget.classList.remove("opacity-0")}
  />

const About = () => {
  return (
    <section id="about">
      <PageTitle title="About" bodyClass="about" />
      <div className="about_wrapper square-animation animate__animated">
        <AvatarImage
          src="/images/Webp/santi-light-theme.webp"
          className="santi_avatar_light_theme"
        />
        <AvatarImage
          src="/images/Webp/santi-dark-theme.webp"
          className="santi_avatar_dark_theme"
        />
        <p className="about_text animate__fadeIn">
          I am a programmer who has a deep love for coding and technology. My
          passion extends to UX & UI design, I consider myself an expert in
          Frontend and a devoted enthusiast of Backend. I am always immersed in
          learning new technologies, driven by my commitment to developing
          specialized and scalable technology for new projects.
        </p>
        <NavigationButtons backLink="/" nextLink="/skills" nextText="Skills" />
      </div>
    </section>
  )
}

export default About
