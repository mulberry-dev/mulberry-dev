import { SiteIconName } from "@/components/ui/SiteIcon"

export const ABOUT_HOST = "santiago@dev"
export const ABOUT_PATH = "~/about-me"
export const ABOUT_INITIALS = "SM"
export const ABOUT_NAME = "Santiago Morera"
export const ABOUT_ROLE = "Senior Full Stack Engineer"
export const ABOUT_LOCATION_SHORT = "MEXICO CITY, MX"

export const ABOUT_INTRO = {
  command: "cat about-me.txt",
  headline: ["I BUILD_", "WHAT YOU SEE.", "AND WHAT", "MAKES IT WORK."],
  accentFrom: 2,
  body: [
    "I came to software through design.",
    "Clear interfaces. Small details."
  ]
} as const

export const ABOUT_WHOAMI = {
  command: "whoami",
  name: ABOUT_NAME
} as const

export const ABOUT_ORIGIN = {
  code: "MX",
  coords: "19.43°N  99.13°W"
} as const

export const ABOUT_HISTORY = {
  command: "git log --oneline",
  items: [
    {
      step: "01",
      title: "I care about how products feel",
      text: "Clear interfaces, small details, and experiences that make people feel confident."
    },
    {
      step: "02",
      title: "I want the work to last",
      text: "Decisions a team can keep building on — not a demo that falls apart a year later."
    }
  ]
} as const

export const ABOUT_PASSIONS: {
  icon: SiteIconName
  label: string
}[] = [
  { icon: "puzzle", label: "Solving problems" },
  { icon: "frontend", label: "Intentional interfaces" }
]

export const ABOUT_FOOTER = {
  question: "have a project in mind?",
  action: "let's talk",
  href: "/contact"
} as const

export const ABOUT_SECTIONS = [
  { id: "about-intro", index: "01", label: "INTRO" },
  { id: "about-identity", index: "02", label: "IDENTITY" },
  { id: "about-path", index: "03", label: "PATH" }
] as const
