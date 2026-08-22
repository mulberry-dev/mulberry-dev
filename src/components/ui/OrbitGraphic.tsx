import SiteIcon from "@/components/ui/SiteIcon"

const OrbitGraphic = () => (
  <div className="orbit-graphic" aria-hidden="true">
    <div className="orbit-graphic__ring orbit-graphic__ring--outer">
      <span className="orbit-graphic__planet orbit-graphic__planet--teal" />
    </div>
    <div className="orbit-graphic__ring orbit-graphic__ring--mid">
      <span className="orbit-graphic__planet orbit-graphic__planet--purple" />
    </div>
    <div className="orbit-graphic__ring orbit-graphic__ring--inner">
      <span className="orbit-graphic__planet orbit-graphic__planet--cyan" />
    </div>
    <div className="orbit-graphic__core">
      <SiteIcon name="cursor" />
    </div>
  </div>
)

export default OrbitGraphic
