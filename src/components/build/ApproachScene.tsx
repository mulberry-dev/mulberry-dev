import SiteIcon from "@/components/ui/SiteIcon"
import { BUILD_APPROACH } from "@/data/whatIBuild"

const ApproachScene = () => (
  <div className="approach-scene">
    <ul className="approach-scene__grid">
      {BUILD_APPROACH.principles.map((item) => (
        <li key={item.title}>
          <span className="approach-scene__icon" aria-hidden="true">
            <SiteIcon name={item.icon} />
          </span>
          <strong>{item.title}</strong>
        </li>
      ))}
    </ul>
  </div>
)

export default ApproachScene
