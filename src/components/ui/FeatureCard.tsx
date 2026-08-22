import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"

const FeatureCard = ({
  icon,
  title,
  text,
  tags,
  index,
  variant = "default",
  className = ""
}: {
  icon: SiteIconName
  title: string
  text: string
  tags?: string[]
  index?: string
  variant?: "default" | "principle"
  className?: string
}) => (
  <article
    className={`feature-card${variant === "principle" ? " feature-card--principle" : ""} ${className}`.trim()}
  >
    {index ? <span className="feature-card__index">{index}</span> : null}
    <span className="feature-card__icon">
      <SiteIcon name={icon} />
    </span>
    <h3>{title}</h3>
    <p>{text}</p>
    {tags?.length ? (
      <ul className="feature-card__tags">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    ) : null}
  </article>
)

export default FeatureCard
