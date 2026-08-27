import { SiteIconName } from "@/components/ui/SiteIcon"

export const BUILD_HOST = "santiago@dev"
export const BUILD_PATH = "~/what-i-build"
export const BUILD_STACK_PATH = "~/stack.json"

export const BUILD_INTRO = {
  headline: "I build products and the systems behind them."
} as const

export const BUILD_INTERFACES = {
  index: "01",
  title: "FRONTEND",
  kicker: "WHAT PEOPLE SEE",
  items: [
    { icon: "interface" as const, label: "UI components" },
    { icon: "cursor" as const, label: "Interactions" },
    { icon: "user" as const, label: "UX & accessibility" },
    { icon: "performance" as const, label: "Performance" }
  ],
  tech: ["React", "Next.js", "TypeScript"]
} as const

export const BUILD_SYSTEMS = {
  index: "02",
  title: "BACKEND",
  kicker: "HOW IT WORKS",
  items: [
    { icon: "systems" as const, label: "APIs" },
    { icon: "connect" as const, label: "Services" },
    { icon: "database" as const, label: "Databases" },
    { icon: "cube" as const, label: "Architecture" },
    { icon: "thinking" as const, label: "Business logic" }
  ],
  tech: ["Node.js", "Express", "GraphQL"]
} as const

export const BUILD_MODERNIZATION = {
  index: "04",
  title: "MODERNIZATION",
  kicker: "EVOLVE WITHOUT BREAKING",
  copy: [
    "I don't replace working businesses.",
    "I modernize the systems behind them."
  ],
  legacy: {
    label: "LEGACY",
    items: ["PHP", "Old UI", "Monolith", "Disconnected", "Hard to scale"]
  },
  modern: {
    label: "MODERN",
    items: [
      "React / TypeScript",
      "Node.js / GraphQL",
      "Modular Architecture",
      "Connected Systems",
      "Scalable & Maintainable"
    ]
  }
} as const

export const BUILD_CONNECTED = {
  index: "03",
  title: "FULL STACK",
  kicker: "EVERYTHING WORKS TOGETHER",
  copy: [
    "I connect the pieces that",
    "make a product reliable,",
    "useful and ready to grow."
  ]
} as const

export const BUILD_APPROACH = {
  index: "05",
  title: "THE WAY I BUILD",
  kicker: "THINK. DESIGN. BUILD. SHIP.",
  stages: [
    {
      icon: "idea" as const,
      title: "THINK",
      text: "Understand the problem."
    },
    {
      icon: "design" as const,
      title: "DESIGN",
      text: "Shape the experience."
    },
    {
      icon: "code" as const,
      title: "BUILD",
      text: "Make the system work."
    },
    {
      icon: "rocket" as const,
      title: "SHIP",
      text: "Put it in people's hands."
    }
  ],
  principles: [
    {
      icon: "user" as const,
      title: "START WITH THE PERSON."
    },
    {
      icon: "craft" as const,
      title: "DESIGN IS PART OF THE BUILD."
    },
    {
      icon: "clarity" as const,
      title: "CLARITY OVER CLEVERNESS."
    },
    {
      icon: "care" as const,
      title: "LEAVE IT IN GOOD HANDS."
    }
  ]
} as const

export const BUILD_STACK = {
  command: "cat stack.json"
} as const

export const ARCH_MAIN = [
  { id: "client", label: "CLIENT", icon: "frontend" as const },
  { id: "api", label: "API GRAPHQL", icon: "connect" as const },
  { id: "services", label: "SERVICES", icon: "cube" as const },
  { id: "logic", label: "BUSINESS LOGIC", icon: "gears" as const },
  { id: "database", label: "DATABASE", icon: "database" as const }
] as const

export const ARCH_SIDE = [
  { id: "auth", label: "AUTH", icon: "lock" as const, attaches: "api" },
  { id: "storage", label: "STORAGE S3", icon: "storage" as const, attaches: "logic" }
] as const

export const CONNECTED_NODES: {
  id: string
  label: string
  icon: SiteIconName
  slot: "n" | "w" | "e" | "s" | "ss"
}[] = [
  { id: "identity", label: "IDENTITY", icon: "lock", slot: "n" },
  { id: "payments", label: "PAYMENTS", icon: "payment", slot: "w" },
  { id: "apis", label: "APIs", icon: "connect", slot: "e" },
  { id: "data", label: "DATA", icon: "database", slot: "s" },
  { id: "notifications", label: "NOTIFICATIONS", icon: "bell", slot: "ss" }
]

export const PRODUCT_METRICS = [
  { label: "Appointments", value: "128", delta: "+12%" },
  { label: "New clients", value: "36", delta: "+8%" },
  { label: "Revenue", value: "$12,456", delta: "+18%" }
] as const

export const PRODUCT_ACTIVITY = [
  { title: "New booking", meta: "Ana R. · 10:30" },
  { title: "Payment received", meta: "$180 · card" },
  { title: "Client added", meta: "Luis M." },
  { title: "Reminder sent", meta: "Tomorrow 9:00" }
] as const

export const PRODUCT_NAV = [
  { icon: "gauge" as const, label: "Overview", active: true },
  { icon: "calendar" as const, label: "Appointments", active: false },
  { icon: "user" as const, label: "Clients", active: false },
  { icon: "payment" as const, label: "Payments", active: false },
  { icon: "systems" as const, label: "Settings", active: false }
] as const

export const PRODUCT_LAYERS = [
  { id: "structure", label: "01 STRUCTURE", active: false },
  { id: "components", label: "02 COMPONENTS", active: false },
  { id: "interaction", label: "03 INTERACTION", active: false },
  { id: "interface", label: "04 INTERFACE", active: true }
] as const

export const BUILD_SECTIONS = [
  { id: "build-intro", index: "00", label: "INTRO" },
  { id: "build-interfaces", index: "01", label: "FRONTEND" },
  { id: "build-systems", index: "02", label: "BACKEND" },
  { id: "build-connected", index: "03", label: "FULL STACK" },
  { id: "build-modernize", index: "04", label: "MODERNIZATION" },
  { id: "build-approach", index: "05", label: "APPROACH" }
] as const
