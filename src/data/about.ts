export const ABOUT_INITIALS = "SM"
export const ABOUT_NAME = "Santiago Morera"
export const ABOUT_ROLE = "Senior Full Stack Engineer"
export const ABOUT_LOCATION_SHORT = "Mexico City"

export const ABOUT_INTRO = {
  command: "cat about-me.txt",
  headline: ["I BUILD_", "WHAT YOU SEE.", "AND WHAT", "MAKES IT WORK."],
  accentFrom: 2,
  body: ["I came to software through design."]
} as const

export const ABOUT_WHOAMI = {
  command: "whoami",
  name: ABOUT_NAME
} as const

export const ABOUT_HISTORY = {
  command: "git log --oneline",
  items: [
    {
      step: "01",
      title: "I care about how products feel",
      text: "Clear interfaces and details that make people feel confident."
    },
    {
      step: "02",
      title: "I want the work to last",
      text: "Decisions a team can keep building on."
    }
  ]
} as const

export const ABOUT_FOOTER = {
  action: "Contact",
  href: "/contact"
} as const

export const ABOUT_SECTIONS = [
  { id: "about-intro", index: "01", label: "INTRO" },
  { id: "about-identity", index: "02", label: "IDENTITY" },
  { id: "about-path", index: "03", label: "PATH" }
] as const
