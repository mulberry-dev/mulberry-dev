import { STACK_BAR } from "@/data/workspace"
import { findSkillImage } from "@/data/whatIDo"
import TechBadge from "@/components/ui/TechBadge"

const TechStackBar = () => (
  <div className="stack-bar" aria-label="Tech stack">
    <span className="stack-bar__label">Tech stack</span>
    <div className="stack-bar__list">
      {STACK_BAR.map(name => (
        <TechBadge key={name} name={name} icon={findSkillImage(name)} />
      ))}
    </div>
  </div>
)

export default TechStackBar
