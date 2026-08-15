"use client"

import Button from "@/components/ui/Button"
import { CONTACT_EMAIL } from "@/data/site"
import { FormEvent, useState } from "react"

type Status = "idle" | "loading" | "success" | "error"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const canSubmit =
    name.trim() &&
    EMAIL_PATTERN.test(email.trim()) &&
    subject.trim() &&
    message.trim() &&
    status !== "loading"

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      setStatus("error")
      setErrorMessage("Please complete every field with a valid email.")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      "",
      message.trim()
    ].join("\n")

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`

    window.setTimeout(() => {
      window.location.href = href
      setStatus("success")
    }, 280)
  }

  return (
    <form className="contact-form" id="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__intro">
        <h2>Send a message</h2>
        <p>A short note is enough. I read every message myself.</p>
      </div>

      <label className="contact-field">
        <span>Name</span>
        <input
          className="site-input"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            if (status !== "idle") {
              setStatus("idle")
            }
          }}
          required
          aria-invalid={status === "error" && !name.trim() ? true : undefined}
        />
      </label>

      <label className="contact-field">
        <span>Email</span>
        <input
          className="site-input"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={
            status === "error" && !EMAIL_PATTERN.test(email.trim())
              ? true
              : undefined
          }
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== "idle") {
              setStatus("idle")
            }
          }}
          required
        />
      </label>

      <label className="contact-field">
        <span>Subject</span>
        <input
          className="site-input"
          name="subject"
          autoComplete="off"
          aria-invalid={status === "error" && !subject.trim() ? true : undefined}
          value={subject}
          onChange={(event) => {
            setSubject(event.target.value)
            if (status !== "idle") {
              setStatus("idle")
            }
          }}
          required
        />
      </label>

      <label className="contact-field">
        <span>Message</span>
        <textarea
          className="site-textarea"
          name="message"
          rows={6}
          aria-invalid={status === "error" && !message.trim() ? true : undefined}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            if (status !== "idle") {
              setStatus("idle")
            }
          }}
          required
        />
      </label>

      <Button type="submit" disabled={!canSubmit} loading={status === "loading"}>
        {status === "loading" ? "Preparing message" : "Send message"}
      </Button>

      <p className="contact-form__privacy">
        Your information is only used to respond to your message.
      </p>

      <p
        className={`contact-form__status${status === "success" ? " is-success" : ""}${status === "error" ? " is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status === "success"
          ? "Your email app should open with the message ready to send. I'll reply to the address you entered."
          : null}
        {status === "error" ? errorMessage : null}
      </p>
    </form>
  )
}

export default ContactForm
