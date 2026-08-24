"use client"

import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"
import { findSkillImage } from "@/data/whatIDo"
import Image from "next/image"
import { useId, useState, type CSSProperties } from "react"

const TechItem = ({ name, index = 0 }: { name: string; index?: number }) => {
  const imageSrc = findSkillImage(name)

  return (
    <li style={{ "--chip-i": index } as CSSProperties}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={14}
          height={14}
          loading="eager"
          decoding="async"
        />
      ) : (
        <span className="tech-category__dot" aria-hidden="true" />
      )}
      {name}
    </li>
  )
}

const TechList = ({ items, offset = 0 }: { items: string[]; offset?: number }) => (
  <ul>
    {items.map((item, index) => (
      <TechItem key={item} name={item} index={offset + index} />
    ))}
  </ul>
)

const TechCategory = ({
  icon,
  title,
  items,
  extra = [],
  index = 0
}: {
  icon: SiteIconName
  title: string
  items: string[]
  extra?: string[]
  index?: number
}) => {
  const extraId = useId()
  const [open, setOpen] = useState(false)
  const hasExtra = extra.length > 0

  return (
    <article
      className={`tech-category${open ? " is-open" : ""}`}
      style={{ "--cat-i": index } as CSSProperties}
    >
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
              <TechList items={extra} offset={items.length} />
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
