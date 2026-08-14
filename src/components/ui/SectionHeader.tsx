import Badge from "@/components/ui/Badge"

const SectionHeader = ({
  badge,
  title,
  gradientText,
  subtitle,
  align = "left",
  as = "h1"
}: {
  badge?: string
  title: string
  gradientText?: string
  subtitle?: string
  align?: "left" | "center"
  as?: "h1" | "h2"
}) => {
  const Heading = as

  return (
    <header
      className={`ui-section-header${align === "center" ? " ui-section-header--center" : ""}`}
    >
      {badge ? <Badge>{badge}</Badge> : null}
      <Heading>
        {title}
        {gradientText ? <> <span className="gradient-text">{gradientText}</span></> : null}
      </Heading>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  )
}

export default SectionHeader
