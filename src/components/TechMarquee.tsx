"use client"

import { Skill, skills } from "@/data/skills"
import Image from "next/image"
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent
} from "react"

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
  const rootRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [active, setActive] = useState(false)
  const rows = buildRows(skills)

  useLayoutEffect(() => {
    const node = rootRef.current

    if (!node) {
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setRevealed(true)
      setActive(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          setActive(true)
          return
        }

        setActive(false)
      },
      { threshold: 0.18, rootMargin: "0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleRowEnter = (event: MouseEvent<HTMLDivElement>) => {
    setRowPlaybackRate(event.currentTarget, HOVER_PLAYBACK_RATE)
  }

  const handleRowLeave = (event: MouseEvent<HTMLDivElement>) => {
    setRowPlaybackRate(event.currentTarget, 1)
  }

  const className = [
    "tech-marquee",
    revealed ? "is-revealed" : "",
    active ? "is-active" : ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      ref={rootRef}
      className={className}
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
