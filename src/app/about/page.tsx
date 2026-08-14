"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import Image from "next/image"

const About = () => {
  return (
    <section id="about" className="page-fade">
      <PageTitle title="About" />
      <Container className="about-page">
        <div className="about-hero">
          <div>
            <SectionHeader
              badge="About me"
              title="Get to know"
              gradientText="more about me"
              subtitle="I am a programmer who has a deep love for coding and technology. My passion extends to UX & UI design, I consider myself an expert in Frontend and a devoted enthusiast of Backend."
            />
            <p className="about-page__body">
              I am always immersed in learning new technologies, driven by my
              commitment to developing specialized and scalable technology for
              new projects.
            </p>
            <div className="about-facts">
              <div>
                <strong>Frontend</strong>
                <span>Expert focus</span>
              </div>
              <div>
                <strong>Backend</strong>
                <span>Devoted enthusiast</span>
              </div>
              <div>
                <strong>UX & UI</strong>
                <span>Design passion</span>
              </div>
              <div>
                <strong>Learning</strong>
                <span>Always exploring</span>
              </div>
            </div>
            <Button href="/skills" variant="secondary">
              Skills →
            </Button>
          </div>
          <div className="about-portrait">
            <Image
              src="/images/Webp/santi-light-theme.webp"
              alt="Santi avatar"
              width={360}
              height={360}
              priority
              className="about-portrait__img about-portrait__img--light"
            />
            <Image
              src="/images/Webp/santi-dark-theme.webp"
              alt="Santi avatar"
              width={360}
              height={360}
              priority
              className="about-portrait__img about-portrait__img--dark"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
