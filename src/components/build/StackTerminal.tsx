"use client"

import Image from "next/image"
import { BUILD_STACK } from "@/data/whatIBuild"
import { skills } from "@/data/skills"
import { useI18n } from "@/i18n/useI18n"
import { StackSession } from "./BuildChrome"

const STACK_GROUPS = BUILD_STACK.groups.map((group) => ({
  ...group,
  items: group.names
    .map((name) => skills.find((skill) => skill.name === name))
    .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
}))

const StackTerminal = () => {
  const { t } = useI18n()
  const groupLabels = t.skills.groups

  return (
  <div className="skills-stack">
    <div className="skills-stack__head">
      <StackSession />
      <p className="skills-stack__title">{t.skills.stackTitle}</p>
    </div>
    <ul className="skills-stack__groups">
      {STACK_GROUPS.map((group) => (
        <li
          key={group.key}
          className={`skills-stack__group skills-stack__group--${group.tone}`}
        >
          <span className="skills-stack__label">
            {groupLabels[group.key as keyof typeof groupLabels] ?? group.label}
          </span>
          <ul className="skills-stack__icons">
            {group.items.map((skill) => (
              <li key={skill.id} title={skill.name}>
                <Image
                  className="tech-logo"
                  src={skill.imageSrc}
                  alt=""
                  width={16}
                  height={16}
                  loading="lazy"
                  decoding="async"
                />
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default StackTerminal
