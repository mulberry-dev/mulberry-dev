import { SiteIconName } from "@/components/ui/SiteIcon"
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL
} from "@/data/site"

export const CONTACT_INTRO = {
  availability: "Available for new opportunities"
} as const

export const CONTACT_OPTIONS_COPY = {
  supporting: "Usually within 24 hours."
} as const

export type ContactAccent = "teal" | "cyan" | "purple" | "neutral"

export type ContactOption = {
  id: string
  icon: SiteIconName
  title: string
  description?: string
  value: string
  copyValue?: string
  cta: string
  href: string
  external: boolean
  accent: ContactAccent
  featured?: boolean
}

const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

const CALL_OPTION: ContactOption | null = CALENDLY_URL
  ? {
      id: "call",
      icon: "calendar",
      title: "Call",
      description: "30 minutes to talk through a project.",
      value: displayUrl(CALENDLY_URL),
      copyValue: CALENDLY_URL,
      cta: "Book a call",
      href: CALENDLY_URL,
      external: true,
      accent: "purple"
    }
  : null

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: "email",
    icon: "mail",
    title: "Email",
    description: "Best for project briefs.",
    value: CONTACT_EMAIL,
    cta: "Send email",
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
    accent: "teal",
    featured: true
  },
  {
    id: "linkedin",
    icon: "linkedin",
    title: "LinkedIn",
    description: "Work and opportunities.",
    value: displayUrl(LINKEDIN_URL),
    copyValue: LINKEDIN_URL,
    cta: "View profile",
    href: LINKEDIN_URL,
    external: true,
    accent: "cyan"
  },
  ...(CALL_OPTION ? [CALL_OPTION] : []),
  {
    id: "github",
    icon: "github",
    title: "GitHub",
    description: "Code and public repos.",
    value: displayUrl(GITHUB_URL),
    copyValue: GITHUB_URL,
    cta: "Open repos",
    href: GITHUB_URL,
    external: true,
    accent: "neutral"
  }
]
