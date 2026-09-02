import { CONTACT_EMAIL } from "@/data/site"
import { getMessages } from "@/i18n"
import type { Locale } from "@/lib/locale"

export type ContactPayload = {
  name: string
  email: string
  company: string
  project: string
  locale: Locale
  website?: string
  formOpenedAt?: string
}

export type ContactSendResult = "sent" | "fallback" | "error" | "rate_limited"

/**
 * Posts the contact form to the Resend-backed API (same pattern as Fuente de Vida).
 */
export const sendContactMails = async (
  payload: ContactPayload
): Promise<ContactSendResult> => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        company: payload.company,
        project: payload.project,
        locale: payload.locale,
        website: payload.website ?? "",
        formOpenedAt: payload.formOpenedAt ?? "",
        submittedAt: new Date().toISOString()
      })
    })

    if (response.status === 503) return "fallback"
    if (response.status === 429) return "rate_limited"
    if (!response.ok) return "error"
    return "sent"
  } catch {
    return "error"
  }
}

export const contactMailtoHref = (payload: ContactPayload) => {
  const t = getMessages(payload.locale).contact.mail
  const subject = t.owner.subject.replace("{name}", payload.name)
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : "",
    "",
    payload.project
  ]
  const bodyText = lines
    .filter((line, index, all) => line !== "" || all[index - 1] !== "")
    .join("\n")

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
}
