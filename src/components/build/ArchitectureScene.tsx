"use client"

import SiteIcon from "@/components/ui/SiteIcon"
import { ARCH_MAIN, ARCH_SIDE } from "@/data/whatIBuild"
import { useHotScene } from "./useHotScene"

const ArchitectureScene = () => {
  const { ref, hot } = useHotScene(0.22)

  return (
    <div
      ref={ref}
      className={`arch-scene${hot ? " is-hot" : ""}`}
      role="img"
      aria-label="Client to GraphQL API to services to business logic to database, with auth and S3 storage attached"
    >
      <div className="arch-scene__grid">
        <div className="arch-scene__branch arch-scene__branch--auth">
          <div className="arch-scene__node arch-scene__node--side">
            <SiteIcon name={ARCH_SIDE[0].icon} />
            <span>{ARCH_SIDE[0].label}</span>
          </div>
          <span className="arch-scene__vlink" />
        </div>

        <ol className="arch-scene__flow">
          {ARCH_MAIN.map((node, index) => (
            <li key={node.id} className={`arch-scene__step is-${node.id}`}>
              {index > 0 ? <span className="arch-scene__hlink" /> : null}
              <div className="arch-scene__node">
                <SiteIcon name={node.icon} />
                <span>{node.label}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="arch-scene__branch arch-scene__branch--storage">
          <span className="arch-scene__vlink" />
          <div className="arch-scene__node arch-scene__node--side">
            <SiteIcon name={ARCH_SIDE[1].icon} />
            <span>{ARCH_SIDE[1].label}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitectureScene
