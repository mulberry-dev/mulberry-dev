import { SkillCategory } from "@/data/skills"

export const ABOUT_INTRO = {
  badge: "About me",
  greeting: "Hi, I'm",
  name: "Santiago",
  body: "I develop specialized, scalable technology — with an expert focus on Frontend, a passion for UX & UI, and a devoted enthusiasm for Backend."
}

export const PROFILE = [
  {
    title: "Frontend",
    label: "Expert focus",
    text: "The interface layer is where the focus is strongest — Frontend is the craft I know best."
  },
  {
    title: "Backend",
    label: "Devoted enthusiast",
    text: "APIs, data, and the systems that make those interfaces possible."
  },
  {
    title: "UX & UI",
    label: "Design passion",
    text: "Design stays in the work, not beside it. Clarity and usability are part of the build."
  },
  {
    title: "Learning",
    label: "Always exploring",
    text: "New technologies, specialized products, and a commitment to keeping the work current."
  }
]

export const WHAT_I_DO: {
  icon: "frontend" | "backend" | "fullstack" | "ux" | "api" | "performance"
  title: string
  text: string
}[] = [
  {
    icon: "frontend",
    title: "Frontend Development",
    text: "Interfaces, interaction, and the frontend stack I know best."
  },
  {
    icon: "backend",
    title: "Backend Development",
    text: "APIs, data, and the services that support the product."
  },
  {
    icon: "fullstack",
    title: "Full Stack Architecture",
    text: "Connecting both sides into one specialized, scalable system."
  },
  {
    icon: "ux",
    title: "UI / UX",
    text: "Usability and visual clarity as part of the engineering."
  },
  {
    icon: "api",
    title: "API & Integrations",
    text: "Connecting products, services, and platforms so they work together."
  },
  {
    icon: "performance",
    title: "Performance & Optimization",
    text: "Specialized technology that stays maintainable as it grows."
  }
]

export const HOW_I_WORK = [
  {
    step: "01",
    title: "Understand",
    text: "Start with the problem, the product, and the people who will use it."
  },
  {
    step: "02",
    title: "Design",
    text: "Shape the experience with UX & UI before the implementation takes over."
  },
  {
    step: "03",
    title: "Build",
    text: "Develop specialized, scalable technology across frontend and backend."
  },
  {
    step: "04",
    title: "Refine",
    text: "Keep learning, keep improving, keep the work maintainable."
  }
]

export const TECH_GROUPS: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "databases", label: "Database" },
  { id: "devops", label: "Cloud / Infrastructure" },
  { id: "tools", label: "Tools" }
]

export const FOCUS = [
  "Product development",
  "Scalable interfaces",
  "Complex business logic",
  "API integrations",
  "Performance",
  "UX",
  "Maintainable architecture"
]
