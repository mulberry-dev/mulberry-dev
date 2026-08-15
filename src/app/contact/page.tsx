"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import ContactForm from "@/components/contact/ContactForm"
import Container from "@/components/ui/Container"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import { CONTACT_CHANNELS } from "@/data/contact"
import { SVGProps } from "react"

const iconProps: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true
}

const ChannelIcon = ({ id }: { id: (typeof CONTACT_CHANNELS)[number]["id"] }) => {
  switch (id) {
    case "email":
      return (
        <svg {...iconProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      )
    case "linkedin":
      return (
        <svg {...iconProps}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
          <path d="M8 10.5V17" />
          <path d="M8 7.5h.01" />
          <path d="M12 17v-4.2a2.3 2.3 0 0 1 4.4.6V17" />
        </svg>
      )
    case "github":
      return (
        <svg {...iconProps}>
          <path d="M9 19c-4.3 1.4-4.3-2.1-6-2.5" />
          <path d="M15 22v-3.9a3.2 3.2 0 0 0-.9-2.5c3-.3 6.1-1.5 6.1-6.6A5 5 0 0 0 19 5.2 4.6 4.6 0 0 0 18.9 2S17.7 1.7 15 3.6a11.2 11.2 0 0 0-6 0C6.3 1.7 5.1 2 5.1 2A4.6 4.6 0 0 0 5 5.2 5 5 0 0 0 3.8 9c0 5.1 3.1 6.3 6.1 6.6a3.2 3.2 0 0 0-.9 2.5V22" />
        </svg>
      )
    case "location":
      return (
        <svg {...iconProps}>
          <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      )
  }
}

const EnvelopeMark = () => (
  <svg
    className="contact-graphic__mark"
    viewBox="0 0 160 120"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="18"
      y="28"
      width="124"
      height="76"
      rx="10"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M22 34l58 38 58-38" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const Contact = () => {
  return (
    <section id="contact" className="page-fade">
      <PageTitle title="Contact" />
      <Container className="contact-page">
        <div className="contact-hero">
          <div className="contact-hero__copy">
            <SectionHeader
              badge="Contact me"
              title="Let's talk about"
              gradientText="the next step"
              subtitle="I'm available for projects, professional opportunities, and collaborations. Tell me what you're working on and I'll reply personally."
            />
            <p className="contact-availability">
              <span className="contact-availability__dot" aria-hidden="true" />
              Available for new opportunities
            </p>
          </div>
          <div className="contact-graphic" aria-hidden="true">
            <EnvelopeMark />
          </div>
        </div>

        <div className="contact-layout">
          <Card className="contact-form-card">
            <ContactForm />
          </Card>

          <Card className="contact-info">
            <h2>Other ways to reach me</h2>
            <ul className="contact-info__list">
              {CONTACT_CHANNELS.map((channel) => {
                const content = (
                  <>
                    <span className="ui-icon-box">
                      <ChannelIcon id={channel.id} />
                    </span>
                    <span>
                      <strong>{channel.title}</strong>
                      <span className="contact-info__value">{channel.value}</span>
                      <span className="contact-info__hint">{channel.description}</span>
                    </span>
                  </>
                )

                return (
                  <li key={channel.id}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <div>{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </Card>
        </div>

        <div className="contact-close">
          <p>Have a project in mind?</p>
          <Button href="/portfolio" variant="ghost">
            View my work →
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default Contact
