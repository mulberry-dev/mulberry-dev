export const WORKSPACE_HOST = "santiago@dev"

export const WORKSPACE = {
  home: {
    path: "~",
    index: "",
    title: "Home"
  },
  about: {
    path: "~/about-me",
    index: "01",
    title: "About Me"
  },
  skills: {
    path: "~/what-i-do",
    index: "02",
    title: "What I Do"
  },
  work: {
    path: "~/work",
    index: "03",
    title: "Selected work"
  },
  certifications: {
    path: "~/certifications",
    index: "04",
    title: "Credentials"
  },
  contact: {
    path: "~/contact",
    index: "05",
    title: "Let's Connect"
  }
} as const

export const FEATURED_PROJECT_IDS = [
  "FuenteDeVidaResidencial",
  "MulberryMarketing",
  "SalonTarget"
] as const

export const STACK_BAR = [
  "React",
  "Next",
  "Node",
  "TypeScript",
  "SQL",
  "AWS",
  "Docker",
  "GitHub"
] as const
