import { SiteIconName } from "@/components/ui/SiteIcon"
import { LOCATION_LABEL } from "@/data/site"

export const ABOUT_PROMPT = "santiago@dev:~/about-me$"
export const ABOUT_HOST = "santiago@dev"
export const ABOUT_PATH = "~/about-me"
export const ABOUT_INITIALS = "SM"
export const ABOUT_NAME = "Santiago Morera"
export const ABOUT_ROLE = "Full Stack Developer"
export const ABOUT_LOCATION = LOCATION_LABEL
export const ABOUT_LOCATION_SHORT = "MEXICO CITY, MX"

export const ABOUT_INTRO = {
  command: "cat about-me.txt",
  headline: ["I BUILD_", "WHAT YOU SEE.", "AND WHAT", "MAKES IT WORK."],
  accentFrom: 2,
  body: [
    "Full Stack Developer from Mexico.",
    "I came to software through design —",
    "interfaces people feel, systems that last."
  ]
} as const

export const ABOUT_WHOAMI = {
  command: "whoami",
  name: ABOUT_NAME,
  comment: `// ${ABOUT_ROLE}`,
  location: ABOUT_LOCATION
} as const

export const ABOUT_ORIGIN = {
  code: "MX",
  city: "Mexico City",
  coords: "19.43°N  99.13°W",
  caption: "Building from Mexico."
} as const

export const ABOUT_HISTORY = {
  command: "git log --oneline",
  items: [
    {
      step: "01",
      title: "I care about how products feel",
      text: "I'm drawn to thoughtful design: clear interfaces, small details, and experiences that make people feel confident using a product."
    },
    {
      step: "02",
      title: "I build the frontend people experience",
      text: "With React and TypeScript, I turn product ideas into interfaces that are intuitive, responsive, and useful."
    },
    {
      step: "03",
      title: "I enjoy building what powers it",
      text: "Backend work is what makes a great frontend possible: reliable APIs, secure authentication, clean data flows, and systems that perform under real use."
    },
    {
      step: "04",
      title: "I like connecting both worlds",
      text: "For me, frontend and backend are one craft: design guides the experience, and strong engineering makes that experience work."
    }
  ]
} as const

export const ABOUT_PASSIONS: {
  icon: SiteIconName
  label: string
}[] = [
  { icon: "cube", label: "Building products" },
  { icon: "puzzle", label: "Solving problems" },
  { icon: "frontend", label: "Intentional interfaces" },
  { icon: "backend", label: "Systems that hold" },
  { icon: "detail", label: "Details that matter" }
]

export const ABOUT_FOOTER = {
  question: "ready to build something great?",
  action: "let's talk",
  href: "/contact"
} as const

export const ABOUT_SECTIONS = [
  { id: "about-intro", index: "01", label: "INTRO" },
  { id: "about-identity", index: "02", label: "IDENTITY" },
  { id: "about-path", index: "03", label: "PATH" }
] as const
