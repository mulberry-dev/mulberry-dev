"use client"

import Badge from "@/components/ui/Badge"
import Reveal from "@/components/ui/Reveal"

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
      {badge ? (
        <Reveal type="eyebrow">
          <Badge>{badge}</Badge>
        </Reveal>
      ) : null}
      <Reveal type="heading" as={Heading}>
        {title}
        {gradientText ? (
          <>
            {" "}
            <span className="gradient-text">{gradientText}</span>
          </>
        ) : null}
      </Reveal>
      {subtitle ? (
        <Reveal type="text" as="p">
          {subtitle}
        </Reveal>
      ) : null}
    </header>
  )
}

export default SectionHeader
