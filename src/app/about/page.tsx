"use client"

import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import FeatureCard from "@/components/ui/FeatureCard"
import PageCta from "@/components/ui/PageCta"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SectionKicker from "@/components/ui/SectionKicker"
import Timeline from "@/components/ui/Timeline"
import PageTitle from "@/components/PageTitle"
import { ABOUT_INTRO, IDENTITY, JOURNEY, PRINCIPLES } from "@/data/about"

const About = () => {
  return (
    <section id="about">
      <PageTitle title="About Me" />
      <Container className="about-page">
        <RevealGroup className="about-intro" mode="fold" stagger={56}>
          <Reveal type="eyebrow">
            <Badge>{ABOUT_INTRO.badge}</Badge>
          </Reveal>
          <Reveal type="heading" as="h1">
            More than <span className="gradient-text">code</span>
          </Reveal>
          <Reveal type="text" as="p" className="about-intro__body">
            {ABOUT_INTRO.body}
          </Reveal>
          <Reveal type="decorative" className="about-intro__rule" aria-hidden="true" />
          <div className="feature-grid">
            {IDENTITY.map((item) => (
              <Reveal key={item.title} type="card">
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                />
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        <Reveal type="heading" mode="scroll">
          <SectionKicker
            kicker="My journey"
            title="From curiosity to building products"
          />
          <Timeline items={JOURNEY} />
        </Reveal>

        <RevealGroup mode="scroll" stagger={48}>
          <Reveal type="heading">
            <SectionKicker
              kicker="How I think"
              title="Principles that guide my work"
            />
          </Reveal>
          <div className="feature-grid">
            {PRINCIPLES.map((item) => (
              <Reveal key={item.title} type="card">
                <FeatureCard
                  variant="principle"
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                  index={item.step}
                />
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        <PageCta />
      </Container>
    </section>
  )
}

export default About
