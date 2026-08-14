import { ReactNode } from "react"
import Button from "@/components/ui/Button"

const CtaBanner = ({
  icon,
  title,
  subtitle,
  actionHref,
  actionLabel,
  external
}: {
  icon?: ReactNode
  title: string
  subtitle: string
  actionHref: string
  actionLabel: string
  external?: boolean
}) =>
  <div className="ui-cta-banner">
    {icon ? <div className="ui-icon-box ui-icon-box--round">{icon}</div> : null}
    <div className="ui-cta-banner__copy">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
    <Button href={actionHref} external={external}>
      {actionLabel}
    </Button>
  </div>

export default CtaBanner
