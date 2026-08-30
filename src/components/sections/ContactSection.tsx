"use client"

import Button from "@/components/ui/Button"
import CommandLine from "@/components/terminal/CommandLine"
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
  const primary = CONTACT_OPTIONS.find(option => option.featured) ?? CONTACT_OPTIONS[0]

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

        <div className="contact-workspace">
          <RevealGroup className="contact-log" mode="auto" stagger={48}>
            <CommandLine command="./start-conversation" />
            <p>
              <span className="contact-log__prefix">&gt;</span> checking availability...
            </p>
            <p>
              <span className="contact-log__prefix">&gt;</span> status:{" "}
              <span className="contact-log__ok">
                <StatusDot pulse />
                {CONTACT_INTRO.availability}
              </span>
            </p>
            <p>
              <span className="contact-log__prefix">&gt;</span> {CONTACT_OPTIONS_COPY.supporting}
            </p>
            {primary ? (
              <Button href={primary.href} variant="terminal" external={primary.external}>
                <span className="sr-only">{primary.cta}</span>
                <span aria-hidden="true">&gt; start a conversation</span>
              </Button>
            ) : null}
          </RevealGroup>

          <div className="contact-channels">
            <h3>Select channel</h3>
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
        </div>
      </Container>
    </section>
  )
}

export default Contact
