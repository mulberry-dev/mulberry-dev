import SiteIcon from "@/components/ui/SiteIcon"
import { ContactOption } from "@/data/contact"

const ContactCard = ({
  icon,
  title,
  description,
  cta,
  href,
  external,
  accent,
  featured
}: ContactOption) => (
  <a
    className={`contact-card contact-card--${accent}${featured ? " contact-card--featured" : ""}`}
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    <span className="contact-card__icon">
      <SiteIcon name={icon} />
    </span>
    <h3>{title}</h3>
    <p>{description}</p>
    <span className="contact-card__cta">
      {cta}
      <span className="contact-card__arrow" aria-hidden="true">
        →
      </span>
      {external ? (
        <span className="contact-card__sr"> (opens in a new tab)</span>
      ) : null}
    </span>
  </a>
)

export default ContactCard
