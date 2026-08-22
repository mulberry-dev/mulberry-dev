"use client"

import ContactCard from "@/components/contact/ContactCard"
import ContactGraphic from "@/components/contact/ContactGraphic"
import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import CtaBanner from "@/components/ui/CtaBanner"
import IconBox from "@/components/ui/IconBox"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import PageTitle from "@/components/PageTitle"
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
    <section id="contact">
      <PageTitle title="Contact" />
      <Container className="contact-page">
        <div className="contact-hero">
          <RevealGroup className="contact-hero__copy" mode="fold" stagger={56}>
            <Reveal type="eyebrow">
              <Badge>{CONTACT_INTRO.badge}</Badge>
            </Reveal>
            <Reveal type="heading" as="h1">
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
          <Reveal type="decorative" mode="fold" delay={40}>
            <ContactGraphic />
          </Reveal>
        </div>

        <RevealGroup mode="scroll" stagger={48}>
          <Reveal type="heading">
            <header className="contact-options__header">
              <h2>{CONTACT_OPTIONS_COPY.heading}</h2>
              <p>{CONTACT_OPTIONS_COPY.supporting}</p>
            </header>
          </Reveal>
          <div className="contact-options">
            {CONTACT_OPTIONS.map((option) => (
              <Reveal key={option.id} type="card">
                <ContactCard {...option} />
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        <Reveal type="text" mode="scroll">
          <div className="contact-credibility">
            <p>{CONTACT_CREDIBILITY_COPY.label}</p>
            <ul>
              {CONTACT_TECH.map((tech) => (
                <li key={tech.name}>
                  <Image
                    src={tech.imageSrc}
                    alt=""
                    width={18}
                    height={18}
                  />
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

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
