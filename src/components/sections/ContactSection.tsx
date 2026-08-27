"use client"

import ContactCard from "@/components/contact/ContactCard"
import ContactGraphic from "@/components/contact/ContactGraphic"
import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import {
  CONTACT_INTRO,
  CONTACT_OPTIONS,
  CONTACT_OPTIONS_COPY
} from "@/data/contact"

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
      </Container>
    </section>
  )
}

export default Contact
