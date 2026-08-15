import { ReactNode } from "react"
import Button from "@/components/ui/Button"

const CtaBanner = ({
  icon,
  title,
  subtitle,
  actionHref,
  actionLabel,
  backHref,
  backLabel,
  external
}: {
  icon?: ReactNode
  title: string
  subtitle: string
  actionHref: string
  actionLabel: string
  backHref?: string
  backLabel?: string
  external?: boolean
}) =>
  <div className="ui-cta-banner">
    {icon}
    <div className="ui-cta-banner__copy">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
    <div className="ui-cta-banner__actions">
      {backHref && backLabel ? (
        <Button href={backHref} variant="ghost">
          {backLabel}
        </Button>
      ) : null}
      <Button href={actionHref} external={external}>
        {actionLabel}
      </Button>
    </div>
  </div>

export default CtaBanner
