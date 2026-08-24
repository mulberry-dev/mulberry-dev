"use client"

import Reveal from "@/components/ui/Reveal"
import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"

export type TimelineItem = {
  step: string
  icon: SiteIconName
  title: string
  text: string
}

const Timeline = ({ items }: { items: readonly TimelineItem[] }) => (
  <ol className="journey-timeline">
    {items.map((item) => (
      <Reveal key={item.step} as="li" type="card">
        <span className="journey-timeline__index">{item.step}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <span className="journey-timeline__node" aria-hidden="true">
          <SiteIcon name={item.icon} />
        </span>
      </Reveal>
    ))}
  </ol>
)

export default Timeline
