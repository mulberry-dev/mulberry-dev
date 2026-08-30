"use client"

import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import StatusDot from "@/components/terminal/StatusDot"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import {
  CONTACT_INTRO,
  CONTACT_OPTIONS,
  CONTACT_OPTIONS_COPY
} from "@/data/contact"
import { WORKSPACE } from "@/data/workspace"
import { padCount } from "@/lib/projects"
import { useState } from "react"

const Contact = () => {
  const [active, setActive] = useState(CONTACT_OPTIONS[0]?.id ?? "")
  const selected =
    CONTACT_OPTIONS.find(option => option.id === active) ?? CONTACT_OPTIONS[0]

  return (
    <section
      id="contact"
      data-section-path="/contact"
      aria-label="Contact"
      tabIndex={-1}
    >
      <Container className="contact-page">
        <WorkspaceHeader
          index={WORKSPACE.contact.index}
          path={WORKSPACE.contact.path}
          title={WORKSPACE.contact.title}
        />

        <RevealGroup className="contact-workspace" mode="auto" stagger={48}>
          <Reveal type="text" as="p" className="contact-status">
            <StatusDot pulse />
            <span>{CONTACT_INTRO.availability}</span>
            <span aria-hidden="true">·</span>
            <span>{CONTACT_OPTIONS_COPY.supporting}</span>
          </Reveal>
          <div className="contact-channels">
            <h3>Channels</h3>
            <ul>
              {CONTACT_OPTIONS.map((option, index) => (
                <li key={option.id}>
                  <a
                    className={`contact-channel${option.id === selected?.id ? " is-active" : ""}`}
                    href={option.href}
                    {...(option.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onFocus={() => setActive(option.id)}
                    onMouseEnter={() => setActive(option.id)}
                  >
                    <span className="contact-channel__index">
                      {padCount(index + 1)}
                    </span>
                    <span className="contact-channel__copy">
                      <strong>{option.title}</strong>
                      {option.description ? <span>{option.description}</span> : null}
                    </span>
                    {option.external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </RevealGroup>
      </Container>
    </section>
  )
}

export default Contact
