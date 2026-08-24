"use client"

import Reveal from "@/components/ui/Reveal"

const SectionKicker = ({
  kicker,
  title
}: {
  kicker: string
  title: string
}) => (
  <header className="section-kicker">
    <Reveal type="eyebrow" as="p">
      {kicker}
    </Reveal>
    <Reveal type="heading" as="h2">
      {title}
    </Reveal>
  </header>
)

export default SectionKicker
