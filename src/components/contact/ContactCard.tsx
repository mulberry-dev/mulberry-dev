"use client"

import SiteIcon from "@/components/ui/SiteIcon"
import { ContactOption } from "@/data/contact"
import { useEffect, useRef, useState } from "react"

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const input = document.createElement("textarea")
    input.value = text
    input.setAttribute("readonly", "")
    input.style.position = "fixed"
    input.style.left = "-9999px"
    document.body.appendChild(input)
    input.select()
    const copied = document.execCommand("copy")
    document.body.removeChild(input)
    return copied
  }
}

const ContactCard = ({
  icon,
  title,
  description,
  value,
  copyValue,
  cta,
  href,
  external,
  accent,
  featured
}: ContactOption) => {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number>(0)
  const textToCopy = copyValue ?? value

  useEffect(
    () => () => {
      window.clearTimeout(resetTimer.current)
    },
    []
  )

  const handleCopy = async () => {
    const ok = await copyText(textToCopy)

    if (!ok) {
      return
    }

    setCopied(true)
    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <article
      className={`contact-card contact-card--${accent}${featured ? " contact-card--featured" : ""}`}
    >
      <span className="contact-card__icon">
        <SiteIcon name={icon} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        type="button"
        className={`contact-card__copy${copied ? " is-copied" : ""}`}
        onClick={handleCopy}
      >
        <span className="contact-card__value">{value}</span>
        <span className="contact-card__copy-icon" aria-hidden="true">
          <SiteIcon name={copied ? "check" : "copy"} />
        </span>
        <span className="contact-card__sr">
          {copied ? `${title} copied` : `Copy ${title}`}
        </span>
      </button>
      <a
        className="contact-card__cta"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {cta}
        <span className="contact-card__arrow" aria-hidden="true">
          →
        </span>
        {external ? (
          <span className="contact-card__sr"> (opens in a new tab)</span>
        ) : null}
      </a>
    </article>
  )
}

export default ContactCard
