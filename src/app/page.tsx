"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import IconBox from "@/components/ui/IconBox"
import PageTitle from "@/components/PageTitle"
import TechBadge from "@/components/ui/TechBadge"
import { LINKEDIN_URL } from "@/data/site"
import { skills } from "@/data/skills"
import Image from "next/image"
import Link from "next/link"

const ABOUT_SHORT =
  "I am a programmer who has a deep love for coding and technology. My passion extends to UX & UI design, I consider myself an expert in Frontend and a devoted enthusiast of Backend."

const ABOUT_FULL =
  "I am a programmer who has a deep love for coding and technology. My passion extends to UX & UI design, I consider myself an expert in Frontend and a devoted enthusiast of Backend. I am always immersed in learning new technologies, driven by my commitment to developing specialized and scalable technology for new projects."

const whatIDo = [
  {
    title: "Frontend Development",
    names: ["React", "Next", "TypeScript", "JavaScript"]
  },
  {
    title: "Backend Development",
    names: ["Apollo GraphQL", "TypeORM", "PHP"]
  },
  {
    title: "UI / UX Implementation",
    names: ["Material UI", "Sass", "TailwindCSS", "Photoshop"]
  },
  {
    title: "DevOps & Deployment",
    names: ["Docker", "AWS", "Jenkins", "Linux"]
  }
]

const IndexPage = () => {
  const previewSkills = skills.slice(0, 12)

  return (
    <section id="index" className="page-fade">
      <PageTitle title="Home" />
      <Container className="home-page">
        <div className="home-hero">
          <div className="home-hero__copy">
            <h1>
              Hi! I am <span className="gradient-text">Santiago</span>
            </h1>
            <p className="home-hero__role">
              <span className="home-hero__bracket">&lt;</span>{" "}
              <span className="home-hero__teal">Full Stack</span>{" "}
              <span className="home-hero__purple">Developer</span>{" "}
              <span className="home-hero__bracket">/&gt;</span>
            </p>
            <p className="home-hero__body">{ABOUT_SHORT}</p>
            <div className="home-hero__actions">
              <Button href="/portfolio">View my work →</Button>
              <Button href="/about" variant="secondary">
                About me
              </Button>
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="home-orbit" aria-hidden="true" />
            <div className="home-orbit home-orbit--inner" aria-hidden="true" />
            <Image
              src="/images/Webp/santi-dark-theme.webp"
              alt="Santiago"
              width={320}
              height={320}
              priority
              className="home-avatar home-avatar--dark"
            />
            <Image
              src="/images/Webp/santi-light-theme.webp"
              alt="Santiago"
              width={320}
              height={320}
              priority
              className="home-avatar home-avatar--light"
            />
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="home-social"
              aria-label="LinkedIn"
            >
              in
            </Link>
          </div>
        </div>

        <Card className="home-grid">
          <div>
            <h2>
              <IconBox>☺</IconBox> About me
            </h2>
            <p>{ABOUT_FULL}</p>
            <Button href="/about" variant="secondary">
              More about me →
            </Button>
          </div>
          <div>
            <h2>
              <IconBox tone="purple">&lt;/&gt;</IconBox> What I do
            </h2>
            <ul className="home-services">
              {whatIDo.map(item =>
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.names.join(" · ")}</span>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2>
              <IconBox>#</IconBox> Technologies
            </h2>
            <div className="home-tech">
              {previewSkills.map(skill =>
                <TechBadge
                  key={skill.id}
                  name={skill.name}
                  icon={skill.imageSrc}
                />
              )}
              <TechBadge name="More +" href="/skills" />
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default IndexPage
