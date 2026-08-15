import { SkillCategory } from "@/data/skills"
import { ReactElement, SVGProps } from "react"

const svgProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false"
}

const FrontendMotif = () =>
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 8.5h18" />
    <path d="M6.5 6.4h.01M8.7 6.4h.01M10.9 6.4h.01" />
  </svg>

const BackendMotif = () =>
  <svg {...svgProps}>
    <rect x="4" y="3.5" width="16" height="5" rx="1.2" />
    <rect x="4" y="9.5" width="16" height="5" rx="1.2" />
    <rect x="4" y="15.5" width="16" height="5" rx="1.2" />
    <path d="M7 6h.01M7 12h.01M7 18h.01" />
  </svg>

const DatabaseMotif = () =>
  <svg {...svgProps}>
    <ellipse cx="12" cy="6.2" rx="7" ry="2.4" />
    <path d="M5 6.2v4.6c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6.2" />
    <path d="M5 10.8v4.6c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4v-4.6" />
  </svg>

const CloudMotif = () =>
  <svg {...svgProps}>
    <path d="M7.8 17H17a3.5 3.5 0 0 0 .2-7 5 5 0 0 0-9.6-1.4A3.6 3.6 0 0 0 7.8 17Z" />
    <path d="M8.5 20.2h2.6M12.7 20.2h2.6" />
  </svg>

const ToolsMotif = () =>
  <svg {...svgProps}>
    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6" />
    <rect x="13" y="13" width="7.5" height="7.5" rx="1.6" />
  </svg>

const AiMotif = () =>
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="3.1" />
    <circle cx="6.2" cy="6.4" r="1.5" />
    <circle cx="17.8" cy="6.4" r="1.5" />
    <circle cx="6.2" cy="17.6" r="1.5" />
    <circle cx="17.8" cy="17.6" r="1.5" />
    <path d="M9.4 10.1 7.2 7.4M14.6 10.1 16.8 7.4M9.4 13.9 7.2 16.6M14.6 13.9 16.8 16.6" />
  </svg>

const MOTIFS: Record<SkillCategory, () => ReactElement> = {
  frontend: FrontendMotif,
  backend: BackendMotif,
  databases: DatabaseMotif,
  devops: CloudMotif,
  tools: ToolsMotif,
  ai: AiMotif
}

const SkillCardMotif = ({ category }: { category: SkillCategory }) => {
  const Motif = MOTIFS[category]

  return (
    <span className="skill-card__icon" aria-hidden="true">
      <Motif />
    </span>
  )
}

export default SkillCardMotif
