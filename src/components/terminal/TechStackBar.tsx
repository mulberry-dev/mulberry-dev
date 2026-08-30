import { STACK_BAR } from "@/data/workspace"
import { findSkillImage } from "@/data/whatIDo"
import Image from "next/image"

const TechStackBar = () => (
  <div className="stack-bar" aria-label="Tech stack">
    <span className="stack-bar__label">Tech stack</span>
    {STACK_BAR.map(name => {
      const icon = findSkillImage(name)

      return (
        <span key={name} className="stack-bar__item">
          {icon ? (
            <Image src={icon} alt="" width={16} height={16} aria-hidden="true" />
          ) : null}
          {name}
        </span>
      )
    })}
  </div>
)

export default TechStackBar
