"use client"

import { Skill, skills } from "@/data/skills"
import Image from "next/image"
import type { CSSProperties, MouseEvent } from "react"

const ROW_COUNT = 3
const MIN_CHIPS_PER_ROW = 20
const DIRECTIONS = ["ltr", "rtl", "ltr"] as const
const DURATIONS = ["90s", "120s", "100s"] as const
const HOVER_PLAYBACK_RATE = 0.35

const buildRows = (items: Skill[]) => {
  const rows = Array.from({ length: ROW_COUNT }, () => [] as Skill[])

  items.forEach((skill, index) => {
    rows[index % ROW_COUNT].push(skill)
  })

  return rows.map(row => {
    const filled = [...row]
    while (filled.length > 0 && filled.length < MIN_CHIPS_PER_ROW) {
      filled.push(...row)
    }
    return filled
  })
}

const setRowPlaybackRate = (row: HTMLElement, rate: number) => {
  const track = row.querySelector<HTMLElement>(".tech-marquee__track")
  track?.getAnimations().forEach(animation => {
    animation.playbackRate = rate
  })
}

const ChipSet = ({
  items,
  hidden = false
}: {
  items: Skill[]
  hidden?: boolean
}) => (
  <ul className="tech-marquee__set" aria-hidden={hidden || undefined}>
    {items.map((skill, index) => (
      <li
        key={`${skill.id}-${index}`}
        className="tech-marquee__chip"
        style={{ "--chip-i": index } as CSSProperties}
      >
        <Image
          src={skill.imageSrc}
          alt=""
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          className="tech-marquee__icon"
        />
        <span>{skill.name}</span>
      </li>
    ))}
  </ul>
)

const TechMarquee = () => {
  const rows = buildRows(skills)

  const handleRowEnter = (event: MouseEvent<HTMLDivElement>) => {
    setRowPlaybackRate(event.currentTarget, HOVER_PLAYBACK_RATE)
  }

  const handleRowLeave = (event: MouseEvent<HTMLDivElement>) => {
    setRowPlaybackRate(event.currentTarget, 1)
  }

  return (
    <div
      className="tech-marquee"
      role="img"
      aria-label="Technologies I work with, including React, TypeScript, Next.js, Docker, and more"
    >
      {rows.map((items, index) => (
        <div
          key={DIRECTIONS[index] + index}
          className={`tech-marquee__row tech-marquee__row--${DIRECTIONS[index]}`}
          style={
            {
              "--marquee-duration": DURATIONS[index],
              "--row-i": index
            } as CSSProperties
          }
          onMouseEnter={handleRowEnter}
          onMouseLeave={handleRowLeave}
        >
          <div className="tech-marquee__track">
            <ChipSet items={items} />
            <ChipSet items={items} hidden />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechMarquee
