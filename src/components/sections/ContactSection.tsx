"use client"

import ContactCard from "@/components/contact/ContactCard"
import ContactGraphic from "@/components/contact/ContactGraphic"
import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import CtaBanner from "@/components/ui/CtaBanner"
import IconBox from "@/components/ui/IconBox"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import {
  CONTACT_CLOSE_CTA,
  CONTACT_CREDIBILITY_COPY,
  CONTACT_INTRO,
  CONTACT_OPTIONS,
  CONTACT_OPTIONS_COPY,
  CONTACT_TECH
} from "@/data/contact"
import Image from "next/image"

const Contact = () => {
  return (
    <section
      id="contact"
      data-section-path="/contact"
      aria-label="Contact"
      tabIndex={-1}
    >
      <Container className="contact-page">
        <div className="contact-hero">
          <RevealGroup className="contact-hero__copy" mode="auto" stagger={56}>
            <Reveal type="eyebrow">
              <Badge>{CONTACT_INTRO.badge}</Badge>
            </Reveal>
            <Reveal type="heading" as="h2">
              <span>{CONTACT_INTRO.title}</span>
              <span className="gradient-text">{CONTACT_INTRO.gradientText}</span>
            </Reveal>
            <Reveal type="text" as="p" className="contact-hero__lede">
              {CONTACT_INTRO.subtitle}
            </Reveal>
            <Reveal type="text" as="p" className="contact-availability">
              <span className="contact-availability__dot" aria-hidden="true" />
              {CONTACT_INTRO.availability}
            </Reveal>
          </RevealGroup>
          <Reveal type="image" mode="auto" delay={80}>
            <ContactGraphic />
          </Reveal>
        </div>

        <RevealGroup mode="scroll" stagger={52}>
          <header className="contact-options__header">
            <Reveal type="heading" as="h2">
              {CONTACT_OPTIONS_COPY.heading}
            </Reveal>
            <Reveal type="text" as="p">
              {CONTACT_OPTIONS_COPY.supporting}
            </Reveal>
          </header>
          <div className="contact-options">
            {CONTACT_OPTIONS.map((option) => (
              <Reveal key={option.id} type="card">
                <ContactCard {...option} />
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        <RevealGroup className="contact-credibility" mode="scroll" stagger={36}>
          <Reveal type="text" as="p">
            {CONTACT_CREDIBILITY_COPY.label}
          </Reveal>
          <ul>
            {CONTACT_TECH.map((tech) => (
              <Reveal key={tech.name} as="li" type="chip">
                <Image
                  src={tech.imageSrc}
                  alt=""
                  width={18}
                  height={18}
                  loading="lazy"
                  decoding="async"
                />
                <span>{tech.name}</span>
              </Reveal>
            ))}
          </ul>
        </RevealGroup>

        <Reveal type="button" mode="scroll">
          <CtaBanner
            icon={
              <IconBox round>
                <SiteIcon name="cursor" />
              </IconBox>
            }
            title={CONTACT_CLOSE_CTA.title}
            subtitle={CONTACT_CLOSE_CTA.subtitle}
            actionHref={CONTACT_CLOSE_CTA.actionHref}
            actionLabel={CONTACT_CLOSE_CTA.actionLabel}
          />
        </Reveal>
      </Container>
    </section>
  )
}

export default Contact
