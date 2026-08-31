"use client"

import "@/styles/scss/sections/contact.scss"
import Button from "@/components/ui/Button"
import CommandLine from "@/components/terminal/CommandLine"
import TypeCopy from "@/components/terminal/TypeCopy"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import StatusDot from "@/components/terminal/StatusDot"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import { CONTACT_OPTIONS } from "@/data/contact"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { padCount } from "@/lib/projects"
import { useState } from "react"

const Contact = () => {
  const { t } = useI18n()
  const [active, setActive] = useState(CONTACT_OPTIONS[0]?.id ?? "")
  const selected =
    CONTACT_OPTIONS.find(option => option.id === active) ?? CONTACT_OPTIONS[0]
  const primary = CONTACT_OPTIONS.find(option => option.featured) ?? CONTACT_OPTIONS[0]
  const optionCopy = (id: string) => {
    if (id === "email") return t.contact.options.email
    if (id === "phone") return t.contact.options.phone
    if (id === "linkedin") return t.contact.options.linkedin
    if (id === "github") return t.contact.options.github
    if (id === "call") return t.contact.options.call
    return t.contact.options.email
  }

  return (
    <section
      id="contact"
      data-section-path="/contact"
      aria-label={t.contact.ariaLabel}
      tabIndex={-1}
    >
      <Container className="contact-page">
        <WorkspaceHeader
          index={WORKSPACE.contact.index}
          path={WORKSPACE.contact.path}
          title={t.workspace.contact}
        />

        <div className="contact-workspace">
          <RevealGroup className="contact-log" mode="auto" stagger={48}>
            <CommandLine command={t.contact.command} />
            <p>
              <span className="contact-log__prefix">&gt;</span>{" "}
              <TypeCopy text={t.contact.checking} />
            </p>
            <p>
              <span className="contact-log__prefix">&gt;</span>{" "}
              <TypeCopy text={t.contact.statusPrefix} />{" "}
              <span className="contact-log__ok">
                <StatusDot pulse />
                <TypeCopy text={t.contact.availability} />
              </span>
            </p>
            <p>
              <span className="contact-log__prefix">&gt;</span>{" "}
              <TypeCopy text={t.contact.supporting} />
            </p>
            {primary ? (
              <Button href={primary.href} variant="terminal" external={primary.external}>
                <span className="sr-only">{optionCopy(primary.id).cta}</span>
                <span aria-hidden="true">
                  &gt; <TypeCopy text={t.contact.startConversation} />
                </span>
              </Button>
            ) : null}
          </RevealGroup>

          <div className="contact-channels">
            <h3>
              <TypeCopy text={t.contact.selectChannel} />
            </h3>
            <ul>
              {CONTACT_OPTIONS.map((option, index) => {
                const copy = optionCopy(option.id)

                return (
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
                    <span className="contact-channel__icon" aria-hidden="true">
                      <SiteIcon name={option.icon} />
                    </span>
                    <span className="contact-channel__copy">
                      <strong>
                        <TypeCopy text={copy.title} />
                      </strong>
                      {copy.description ? (
                        <TypeCopy text={copy.description} />
                      ) : null}
                    </span>
                    {option.external ? (
                      <span className="sr-only"> {t.contact.opensTab}</span>
                    ) : null}
                  </a>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Contact
