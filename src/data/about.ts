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
      title: "Started in design",
      text: "Years of visual work taught me to notice what people feel before they can name it."
    },
    {
      step: "02",
      title: "Learned the interface",
      text: "I learned to build the screens people actually live in."
    },
    {
      step: "03",
      title: "Built the system",
      text: "I added the architecture behind those screens so the product could ship complete."
    },
    {
      step: "04",
      title: "Now I hold both",
      text: "Frontend and backend as one craft: something that looks right because it works right."
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
