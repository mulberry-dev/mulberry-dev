import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION_LABEL
} from "@/data/site"

export const CONTACT_CHANNELS = [
  {
    id: "email",
    title: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    description: "The most direct way to reach me.",
    external: false
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    value: "linkedin.com/in/santidev",
    href: LINKEDIN_URL,
    description: "Connect for professional conversations.",
    external: true
  },
  {
    id: "github",
    title: "GitHub",
    value: "github.com/SantiProgrammer",
    href: GITHUB_URL,
    description: "See how I work in code.",
    external: true
  },
  {
    id: "location",
    title: "Location",
    value: LOCATION_LABEL,
    href: null,
    description: "Open to remote collaboration.",
    external: false
  }
] as const
