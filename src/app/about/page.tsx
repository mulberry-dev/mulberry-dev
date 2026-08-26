"use client"

import CraftSplit from "@/components/about/CraftSplit"
import MexicoMark from "@/components/about/MexicoMark"
import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import PageCta from "@/components/ui/PageCta"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import PageTitle from "@/components/PageTitle"
import { ABOUT_CRAFT, ABOUT_INTRO, ABOUT_PATH, ABOUT_SIGN } from "@/data/about"

const About = () => {
  return (
    <section id="about">
      <PageTitle title="About Me" />
      <Container className="about-page">
        <div className="about-hero">
          <RevealGroup className="about-hero__copy" mode="fold" stagger={64}>
            <Reveal type="eyebrow">
              <Badge>{ABOUT_INTRO.badge}</Badge>
            </Reveal>
            <Reveal type="heading" as="h1">
              <span className="about-hero__identity">{ABOUT_INTRO.identity}</span>
              <span className="about-hero__see">{ABOUT_INTRO.frontendLine}</span>
              <span className="about-hero__work">{ABOUT_INTRO.backendLine}</span>
            </Reveal>
            <Reveal type="text" as="p" className="about-hero__body">
              {ABOUT_INTRO.body}
            </Reveal>
            <Reveal type="decorative" className="about-hero__rule" aria-hidden="true" />
          </RevealGroup>
          <Reveal type="image" mode="fold" delay={90}>
            <MexicoMark />
          </Reveal>
        </div>

        <RevealGroup className="about-craft" mode="scroll" stagger={72}>
          <header className="about-craft__header">
            <Reveal type="heading" as="h2">
              {ABOUT_CRAFT.heading}
            </Reveal>
            <Reveal type="text" as="p">
              {ABOUT_CRAFT.lede}
            </Reveal>
          </header>
          <Reveal type="card">
            <CraftSplit />
          </Reveal>
        </RevealGroup>

        <RevealGroup className="about-path" mode="scroll" stagger={56}>
          <header className="about-path__header">
            <Reveal type="eyebrow" as="p">
              {ABOUT_PATH.kicker}
            </Reveal>
            <Reveal type="heading" as="h2">
              {ABOUT_PATH.title}
            </Reveal>
          </header>
          <ol className="about-path__list">
            {ABOUT_PATH.items.map((item) => (
              <Reveal key={item.step} as="li" type="card" className="about-path__item">
                <span className="about-path__step">{item.step}</span>
                <div className="about-path__copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </RevealGroup>

        <Reveal type="text" mode="scroll" className="about-sign">
          {ABOUT_SIGN}
        </Reveal>

        <PageCta />
      </Container>
    </section>
  )
}

export default About
