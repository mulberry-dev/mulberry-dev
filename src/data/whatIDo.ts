import { SkillCategory } from "@/data/skills"

export const WHAT_I_DO_INTRO = {
  badge: "What I do",
  title: "What I can build",
  gradientText: "for your product",
  subtitle:
    "I help turn a product idea into software people can actually use — and keep using as the business grows."
}

export const SERVICES: {
  icon: "interface" | "systems" | "connect" | "modernize"
  title: string
  text: string
}[] = [
  {
    icon: "interface",
    title: "Product interfaces",
    text: "The screens your users live in: clear, fast, and consistent with how the product should feel."
  },
  {
    icon: "systems",
    title: "Systems behind them",
    text: "APIs, data, and services that stay reliable when more people start using the product."
  },
  {
    icon: "connect",
    title: "Integrations",
    text: "Payments, login, and third-party tools connected so the product feels like one system, not a pile of parts."
  },
  {
    icon: "modernize",
    title: "Modernizing what exists",
    text: "Moving an older product onto a foundation a team can keep shipping on — without losing what already works."
  }
]

export const OUTCOMES = [
  {
    title: "A first version for real users",
    text: "Not a prototype that stops at the design file."
  },
  {
    title: "An older product that needs a cleaner foundation",
    text: "Modern interface, healthier architecture, same business."
  },
  {
    title: "Flows that should feel simple",
    text: "Checkout, accounts, internal tools — complexity stays in the background."
  },
  {
    title: "Products that must talk to other systems",
    text: "Identity, payments, and APIs working as one experience."
  }
]

export const TECH_GROUPS: { id: SkillCategory; title: string; size: "large" | "small" }[] = [
  { id: "frontend", title: "Frontend", size: "large" },
  { id: "backend", title: "Backend", size: "large" },
  { id: "ai", title: "AI Models", size: "large" },
  { id: "databases", title: "Databases", size: "small" },
  { id: "devops", title: "Cloud & delivery", size: "small" },
  { id: "tools", title: "Tools", size: "small" }
]
