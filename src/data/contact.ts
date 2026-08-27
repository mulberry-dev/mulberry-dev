import { SiteIconName } from "@/components/ui/SiteIcon"
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL
} from "@/data/site"

export const CONTACT_INTRO = {
  badge: "Let's Connect",
  title: "Let's build something",
  gradientText: "great together",
  subtitle:
    "I'm available for new opportunities, collaborations, and challenging projects. Let's discuss how I can help bring your ideas to life.",
  availability: "Available for new opportunities"
} as const

export const CONTACT_OPTIONS_COPY = {
  heading: "Best ways to reach me",
  supporting:
    "Choose the option that works best for you. I usually respond within 24 hours."
} as const

export type ContactAccent = "teal" | "cyan" | "purple" | "neutral"

export type ContactOption = {
  id: string
  icon: SiteIconName
  title: string
  description: string
  cta: string
  href: string
  external: boolean
  accent: ContactAccent
  featured?: boolean
}

const CALL_HREF =
  CALENDLY_URL ||
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Schedule a 30-min call")}`

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: "email",
    icon: "mail",
    title: "Email",
    description:
      "Send me an email anytime. Perfect for detailed project discussions.",
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
    description:
      "Connect with me for professional opportunities and networking.",
    cta: "View profile",
    href: LINKEDIN_URL,
    external: true,
    accent: "cyan"
  },
  {
    id: "call",
    icon: "calendar",
    title: "Schedule a call",
    description:
      "Book a 30-min call to discuss your project or explore opportunities.",
    cta: "Book a call",
    href: CALL_HREF,
    external: Boolean(CALENDLY_URL),
    accent: "purple"
  },
  {
    id: "github",
    icon: "github",
    title: "GitHub",
    description: "Explore my code, open-source projects and contributions.",
    cta: "View GitHub",
    href: GITHUB_URL,
    external: true,
    accent: "neutral"
  }
]
