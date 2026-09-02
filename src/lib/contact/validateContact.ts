import { isLocale, type Locale } from "@/lib/locale"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME = 120
const MAX_COMPANY = 120
const MAX_PROJECT = 4000

export type ContactLead = {
  name: string
  email: string
  company: string
  project: string
  locale: Locale
  submittedAt: string
}

const resolveSubmittedAt = (value: unknown) => {
  if (typeof value !== "string" || value.length > 40) {
    return new Date().toISOString()
  }
  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) {
    return new Date().toISOString()
  }
  return new Date(parsed).toISOString()
}

export const validateContact = (
  raw: unknown
): { ok: true; data: ContactLead } | { ok: false; error: string } => {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "invalid_payload" }
  }

  const body = raw as Record<string, unknown>
  const name = String(body.name || "").trim()
  const email = String(body.email || "")
    .trim()
    .toLowerCase()
  const company = String(body.company || "").trim()
  const project = String(body.project || "").trim()
  const localeRaw = String(body.locale || "").trim()
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en"
  const submittedAt = resolveSubmittedAt(body.submittedAt)

  if (!name || name.length > MAX_NAME) {
    return { ok: false, error: "invalid_name" }
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "invalid_email" }
  }
  if (company.length > MAX_COMPANY) {
    return { ok: false, error: "invalid_company" }
  }
  if (!project || project.length > MAX_PROJECT) {
    return { ok: false, error: "invalid_project" }
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      project,
      locale,
      submittedAt
    }
  }
}
