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
  secondaryHref,
  secondaryLabel,
  external
}: {
  icon?: ReactNode
  title?: string
  subtitle?: string
  actionHref?: string
  actionLabel?: string
  backHref?: string
  backLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  external?: boolean
}) => {
  if (!title || !subtitle || !actionHref || !actionLabel) {
    return null
  }

  return (
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
        <Button href={actionHref} external={external} variant="primary">
          {actionLabel}
        </Button>
        {secondaryHref && secondaryLabel ? (
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default CtaBanner
