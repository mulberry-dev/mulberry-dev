import type { SiteIconName } from "@/components/ui/SiteIcon"
import {
  BUILD_CONNECTED,
  BUILD_INTERFACES,
  BUILD_MODERNIZATION,
  BUILD_SYSTEMS,
  type BuildAccent
} from "@/data/whatIBuild"

export const CAPABILITIES: {
  icon: SiteIconName
  title: string
  text: string
  accent: BuildAccent
}[] = [
  {
    icon: "interface",
    title: "Product Interfaces",
    text: "Clear, fast, accessible screens people actually use.",
    accent: BUILD_INTERFACES.accent
  },
  {
    icon: "systems",
    title: "Backend Systems",
    text: "APIs and services that stay reliable as usage grows.",
    accent: BUILD_SYSTEMS.accent
  },
  {
    icon: "database",
    title: "Data & Integrations",
    text: "Databases, auth, and third-party services working as one system.",
    accent: BUILD_CONNECTED.accent
  },
  {
    icon: "rocket",
    title: "Modernization",
    text: "Evolve what exists without throwing away what already works.",
    accent: BUILD_MODERNIZATION.accent
  }
]
