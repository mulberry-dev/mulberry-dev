"use client"

import Image from "next/image"
import Link from "next/link"
import PageTitle from "@/components/PageTitle"
import NavigationButtons from "@/components/NavigationButtons"

const Contact = () => {
  return (
    <section id="contacto">
      <PageTitle title="Contact" bodyClass="contact" />
      <div className="contact_container animate__animated animate__fadeIn">
        <div>
          {""}
        </div>
        <Link
          href="https://www.linkedin.com/in/santidev/"
          className="transition"
          target="_blank"
        >
          <Image
            src="/images/Icons/svg/linkedin.png"
            alt="Linkedin"
            priority={true}
            width={70}
            height={70}
            quality={100}
            className="linkedin animate__animated animate__fadeInUp"
            title="Linkedin"
          />
        </Link>
        <NavigationButtons
          backLink="/certifications"
          nextLink="/"
          nextText="Home"
        />
      </div>
    </section>
  )
}

export default Contact
