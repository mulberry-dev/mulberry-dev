"use client"

import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import FeatureCard from "@/components/ui/FeatureCard"
import PageCta from "@/components/ui/PageCta"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SectionKicker from "@/components/ui/SectionKicker"
import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"
import Timeline from "@/components/ui/Timeline"
import PageTitle from "@/components/PageTitle"
import {
  ABOUT_INTRO,
  ABOUT_TAGS,
  IDENTITY,
  JOURNEY,
  PRINCIPLES
} from "@/data/about"
import Image from "next/image"

const About = () => {
  return (
    <section id="about">
      <PageTitle title="About Me" />
      <Container className="about-page">
        <div className="about-intro">
          <RevealGroup className="about-intro__copy" mode="fold" stagger={56}>
            <Reveal type="eyebrow">
              <Badge>{ABOUT_INTRO.badge}</Badge>
            </Reveal>
            <Reveal type="heading" as="h1">
              {ABOUT_INTRO.greeting}{" "}
              <span className="gradient-text">{ABOUT_INTRO.name}</span>
            </Reveal>
            <Reveal type="text" as="p" className="about-intro__role">
              {ABOUT_INTRO.role}
            </Reveal>
            <Reveal type="text" as="p" className="about-intro__body">
              {ABOUT_INTRO.body}
            </Reveal>
            <Reveal type="text" as="ul" className="about-intro__tags">
              {ABOUT_TAGS.map((tag) => (
                <li key={tag.label}>
                  {"imageSrc" in tag && tag.imageSrc ? (
                    <Image src={tag.imageSrc} alt="" width={14} height={14} />
                  ) : (
                    <SiteIcon name={tag.icon as SiteIconName} />
                  )}
                  {tag.label}
                </li>
              ))}
            </Reveal>
          </RevealGroup>

          <Reveal type="image" className="about-portrait" mode="fold" delay={40}>
            <div className="about-portrait__ring" aria-hidden="true">
              <span className="about-portrait__node" />
            </div>
            <div
              className="about-portrait__ring about-portrait__ring--inner"
              aria-hidden="true"
            >
              <span className="about-portrait__node about-portrait__node--purple" />
            </div>
            <Image
              src="/images/Webp/santi-dark-theme.webp"
              alt="Santiago"
              width={960}
              height={960}
              unoptimized
              priority
              className="about-portrait__img about-portrait__img--dark"
            />
            <Image
              src="/images/Webp/santi-light-theme.webp"
              alt="Santiago"
              width={960}
              height={960}
              unoptimized
              priority
              className="about-portrait__img about-portrait__img--light"
            />
            <p className="about-portrait__chip">
              <span className="about-portrait__chip-icon" aria-hidden="true">
                <SiteIcon name="bolt" />
              </span>
              {ABOUT_INTRO.chip}
            </p>
          </Reveal>
        </div>

        <RevealGroup mode="scroll" stagger={48}>
          <Reveal type="heading">
            <SectionKicker kicker="Who I am" title="More than code" />
          </Reveal>
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
