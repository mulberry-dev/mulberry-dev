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
import { CONTACT_EMAIL } from "@/data/site"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { padCount } from "@/lib/projects"
import { FormEvent, useState } from "react"

type FormStatus = "idle" | "sending" | "success" | "error"

const mailtoHref = (name: string, email: string, company: string, project: string) => {
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    "",
    project
  ]
  const bodyText = lines.filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n")

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Project inquiry from ${name}`)}&body=${encodeURIComponent(bodyText)}`
}

const Contact = () => {
  const { t } = useI18n()
  const [active, setActive] = useState(CONTACT_OPTIONS[0]?.id ?? "")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [project, setProject] = useState("")
  const selected =
    CONTACT_OPTIONS.find(option => option.id === active) ?? CONTACT_OPTIONS[0]
  const optionCopy = (id: string) => {
    if (id === "email") return t.contact.options.email
    if (id === "phone") return t.contact.options.phone
    if (id === "linkedin") return t.contact.options.linkedin
    if (id === "github") return t.contact.options.github
    if (id === "call") return t.contact.options.call
    return t.contact.options.email
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, project })
      })
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; fallback?: boolean }
        | null

      if (payload?.fallback || response.status === 503) {
        window.location.assign(mailtoHref(name, email, company, project))
        setStatus("idle")
        return
      }

      if (!response.ok || !payload?.ok) {
        setStatus("error")
        return
      }

      setStatus("success")
      setName("")
      setEmail("")
      setCompany("")
      setProject("")
    } catch {
      setStatus("error")
    }
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
          <RevealGroup className="contact-lead" mode="auto" stagger={40}>
            <Reveal type="heading" as="h2" className="contact-headline">
              <TypeCopy text={t.contact.headline} />
            </Reveal>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <label className="contact-field">
                <span>{t.contact.form.name}</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </label>
              <label className="contact-field">
                <span>{t.contact.form.email}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </label>
              <label className="contact-field">
                <span>
                  {t.contact.form.company}{" "}
                  <em>({t.contact.form.companyOptional})</em>
                </span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={company}
                  onChange={event => setCompany(event.target.value)}
                />
              </label>
              <label className="contact-field contact-field--area">
                <span>{t.contact.form.project}</span>
                <textarea
                  name="project"
                  required
                  rows={5}
                  value={project}
                  onChange={event => setProject(event.target.value)}
                />
              </label>
              <p className="contact-form__next">
                <TypeCopy text={t.contact.form.next} />
              </p>
              {status === "success" ? (
                <output className="contact-form__status is-ok">
                  {t.contact.form.success}
                </output>
              ) : null}
              {status === "error" ? (
                <p className="contact-form__status is-error" role="alert">
                  {t.contact.form.error}
                </p>
              ) : null}
              <Button type="submit" variant="terminal" loading={status === "sending"}>
                <TypeCopy
                  text={
                    status === "sending"
                      ? t.contact.form.sending
                      : t.contact.form.submit
                  }
                  caret={false}
                />
              </Button>
            </form>
          </RevealGroup>

          <div className="contact-aside">
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
        </div>
      </Container>
    </section>
  )
}

export default Contact
