import { SiteIconName } from "@/components/ui/SiteIcon"
import { SkillCategory, skills } from "@/data/skills"
import {
  BUILD_CONNECTED,
  BUILD_INTERFACES,
  BUILD_MODERNIZATION,
  BUILD_SYSTEMS,
  type BuildAccent
} from "@/data/whatIBuild"

export const WHAT_I_DO_INTRO = {
  badge: "What I Do",
  title: "What I",
  gradientText: "build",
  subtitle: "Digital products, interfaces and systems designed to ship."
}

export const BUILD_TRAITS = [
  {
    icon: "bolt",
    title: "End to end",
    text: "From idea to production"
  },
  {
    icon: "user",
    title: "User focused",
    text: "Experience that matters"
  },
  {
    icon: "code",
    title: "Clean & scalable",
    text: "Built for the long run"
  },
  {
    icon: "shield",
    title: "Reliable",
    text: "A foundation that holds"
  }
] as const

export const CAPABILITIES: {
  icon: SiteIconName
  title: string
  text: string
  tags: string[]
  accent: BuildAccent
}[] = [
  {
    icon: "interface",
    title: "Product Interfaces",
    text: "Clear, fast, accessible screens people actually use.",
    tags: ["React", "Next.js", "TypeScript"],
    accent: BUILD_INTERFACES.accent
  },
  {
    icon: "systems",
    title: "Backend Systems",
    text: "APIs and services that stay reliable as usage grows.",
    tags: ["Node.js", "Express", "GraphQL"],
    accent: BUILD_SYSTEMS.accent
  },
  {
    icon: "database",
    title: "Data & Integrations",
    text: "Databases, auth, and third-party services working as one system.",
    tags: ["SQL", "MongoDB", "Firebase"],
    accent: BUILD_CONNECTED.accent
  },
  {
    icon: "rocket",
    title: "Modernization",
    text: "Evolve what exists without throwing away what already works.",
    tags: ["React", "PHP", "Docker"],
    accent: BUILD_MODERNIZATION.accent
  }
]

export const PROBLEMS = [
  {
    icon: "idea",
    title: "From idea to product",
    text: "A first version people can actually use — not a prototype that stops at the design file."
  },
  {
    icon: "swap",
    title: "Legacy → Modern",
    text: "A cleaner foundation and a modern interface. Same business."
  },
  {
    icon: "gauge",
    title: "Slow → Fast",
    text: "Find the friction — in the interface or the system — and make the product feel lighter to use."
  },
  {
    icon: "puzzle",
    title: "Disconnected → Integrated",
    text: "Identity, payments, and APIs working as one experience."
  }
] as const

export const VALUE_BLOCKS = [
  {
    icon: "thinking",
    title: "Product thinking",
    text: "I start with the shape of the problem, then choose an approach — not a library first."
  },
  {
    icon: "system",
    title: "System design",
    text: "I design for load, growth, and failure — not only the happy path."
  },
  {
    icon: "performance",
    title: "Performance",
    text: "The product should stay fast when more people start using it."
  },
  {
    icon: "shield",
    title: "Maintainability",
    text: "Structure a team can keep building on a year later, without tribal knowledge."
  }
] as const

const compact = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "")

const SKILL_ALIASES: Record<string, string> = {
  nodejs: "node",
  nextjs: "next",
  graphql: "apollographql",
  github: "gitgithub",
  premiere: "premierepro",
  tailwind: "tailwindcss",
  mui: "materialui",
  grok: "cursorgrok46",
  claude: "opus5",
  gpt: "gpt55",
  composer: "composer25",
  kimi: "kimik3"
}

export const skillKey = (value: string) => {
  const key = compact(value)
  return SKILL_ALIASES[key] || key
}

export const findSkillImage = (name: string) => {
  const key = skillKey(name)
  return skills.find((skill) => skillKey(skill.name) === key)?.imageSrc
}

const extraItems = (category: SkillCategory, items: string[]) => {
  const shown = new Set(items.map(skillKey))
  return skills
    .filter((skill) => skill.category === category)
    .map((skill) => skill.name)
    .filter((name) => !shown.has(skillKey(name)))
}

export const TECH_CATEGORIES: {
  icon: SiteIconName
  title: string
  items: string[]
  extra: string[]
}[] = [
  {
    icon: "frontend",
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Sass", "Material UI"],
    extra: extraItems("frontend", [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Sass",
      "Material UI"
    ])
  },
  {
    icon: "backend",
    title: "Backend",
    items: ["Node.js", "Express", "GraphQL", "TypeORM", "PHP"],
    extra: extraItems("backend", ["Node.js", "Express", "GraphQL", "TypeORM", "PHP"])
  },
  {
    icon: "database",
    title: "Databases",
    items: ["SQL", "MongoDB", "Firebase"],
    extra: extraItems("databases", ["SQL", "MongoDB", "Firebase"])
  },
  {
    icon: "rocket",
    title: "Cloud & delivery",
    items: ["AWS", "Docker", "GitHub", "Jenkins", "Linux"],
    extra: extraItems("devops", ["AWS", "Docker", "GitHub", "Jenkins", "Linux"])
  },
  {
    icon: "craft",
    title: "Tools",
    items: ["Cursor", "Visual Studio", "Photoshop", "Premiere", "WordPress"],
    extra: extraItems("tools", [
      "Cursor",
      "Visual Studio",
      "Photoshop",
      "Premiere",
      "WordPress"
    ])
  },
  {
    icon: "thinking",
    title: "AI",
    items: ["Grok", "Claude", "GPT", "Composer", "Kimi"],
    extra: []
  }
]
