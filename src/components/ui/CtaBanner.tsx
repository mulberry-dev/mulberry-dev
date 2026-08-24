import { ReactNode } from "react"
import Link from "next/link"
import Button from "@/components/ui/Button"

const NavChevron = ({ direction }: { direction: "prev" | "next" }) =>
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "prev" ? (
      <path d="M15 6 9 12l6 6" />
    ) : (
      <path d="M9 6l6 6-6 6" />
    )}
  </svg>

const CtaBanner = ({
  icon,
  title,
  subtitle,
  actionHref,
  actionLabel,
  backHref,
  backLabel,
  backName,
  nextName,
  secondaryHref,
  secondaryLabel,
  featured,
  external
}: {
  icon?: ReactNode
  title?: string
  subtitle?: string
  actionHref?: string
  actionLabel?: string
  backHref?: string
  backLabel?: string
  backName?: string
  nextName?: string
  secondaryHref?: string
  secondaryLabel?: string
  featured?: boolean
  external?: boolean
}) => {
  if (featured) {
    if (!backHref && !actionHref) {
      return null
    }

    return (
      <nav className="ui-cta-banner ui-cta-banner--featured" aria-label="Page">
        {backHref ? (
          <Link
            className="ui-cta-banner__dir ui-cta-banner__dir--prev"
            href={backHref}
            aria-label={backName ? `Previous: ${backName}` : "Previous"}
          >
            <NavChevron direction="prev" />
            <span>
              <span className="ui-cta-banner__dir-label">Previous</span>
              {backName ? (
                <span className="ui-cta-banner__dir-name">{backName}</span>
              ) : null}
            </span>
          </Link>
        ) : null}
        {actionHref ? (
          <Link
            className="ui-cta-banner__dir ui-cta-banner__dir--next"
            href={actionHref}
            aria-label={nextName ? `Next: ${nextName}` : "Next"}
          >
            <span>
              <span className="ui-cta-banner__dir-label">Next</span>
              {nextName ? (
                <span className="ui-cta-banner__dir-name">{nextName}</span>
              ) : null}
            </span>
            <NavChevron direction="next" />
          </Link>
        ) : null}
      </nav>
    )
  }

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
