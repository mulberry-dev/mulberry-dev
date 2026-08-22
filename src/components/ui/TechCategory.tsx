"use client"

import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"
import { findSkillImage } from "@/data/whatIDo"
import Image from "next/image"
import { useId, useState } from "react"

const TechItem = ({ name }: { name: string }) => {
  const imageSrc = findSkillImage(name)

  return (
    <li>
      {imageSrc ? (
        <Image src={imageSrc} alt="" width={14} height={14} />
      ) : (
        <span className="tech-category__dot" aria-hidden="true" />
      )}
      {name}
    </li>
  )
}

const TechList = ({ items }: { items: string[] }) => (
  <ul>
    {items.map((item) => (
      <TechItem key={item} name={item} />
    ))}
  </ul>
)

const TechCategory = ({
  icon,
  title,
  items,
  extra = []
}: {
  icon: SiteIconName
  title: string
  items: string[]
  extra?: string[]
}) => {
  const extraId = useId()
  const [open, setOpen] = useState(false)
  const hasExtra = extra.length > 0

  return (
    <article className={`tech-category${open ? " is-open" : ""}`}>
      <h3>
        <span className="tech-category__icon">
          <SiteIcon name={icon} />
        </span>
        {title}
      </h3>
      <div className="tech-category__items">
        <TechList items={items} />
        {hasExtra ? (
          <div
            className="tech-category__extra"
            id={extraId}
            role="region"
            aria-labelledby={`${extraId}-trigger`}
          >
            <div className="tech-category__extra-inner">
              <TechList items={extra} />
            </div>
          </div>
        ) : null}
      </div>
      {hasExtra ? (
        <button
          type="button"
          id={`${extraId}-trigger`}
          className="tech-category__more"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={extraId}
        >
          <span>{open ? "Show less" : `+ ${extra.length} more`}</span>
          <svg
            className="tech-category__chevron"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
    </article>
  )
}

export default TechCategory
