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
  supporting: "I usually respond within 24 hours."
} as const

export type ContactOption = {
  id: string
  title: string
  description?: string
  cta: string
  href: string
  external: boolean
  featured?: boolean
}

const CALL_OPTION: ContactOption | null = CALENDLY_URL
  ? {
      id: "call",
      title: "Call",
      description: "30 minutes to talk through a project.",
      cta: "Book a call",
      href: CALENDLY_URL,
      external: true
    }
  : null

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: "email",
    title: "Email",
    description: "Best for project briefs.",
    cta: "Send email",
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
    featured: true
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Work and opportunities.",
    cta: "View profile",
    href: LINKEDIN_URL,
    external: true
  },
  ...(CALL_OPTION ? [CALL_OPTION] : []),
  {
    id: "github",
    title: "GitHub",
    description: "Code and public repos.",
    cta: "View GitHub",
    href: GITHUB_URL,
    external: true
  }
]
