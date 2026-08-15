"use client"

import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import PageCta from "@/components/ui/PageCta"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import SkillCardMotif from "@/components/ui/SkillCardMotif"
import { Skill, SkillCategory, skills } from "@/data/skills"
import { ENGINEERING_DOMAINS, ENGINEERING_INTRO } from "@/data/engineering"
import { OUTCOMES, SERVICES, TECH_GROUPS, WHAT_I_DO_INTRO } from "@/data/whatIDo"
import Image from "next/image"
import { SVGProps } from "react"

const iconProps: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true
}

const ServiceIcon = ({ name }: { name: (typeof SERVICES)[number]["icon"] }) => {
  switch (name) {
    case "interface":
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 8.5h18" />
        </svg>
      )
    case "systems":
      return (
        <svg {...iconProps}>
          <rect x="4" y="3.5" width="16" height="4.5" rx="1" />
          <rect x="4" y="9.75" width="16" height="4.5" rx="1" />
          <rect x="4" y="16" width="16" height="4.5" rx="1" />
        </svg>
      )
    case "connect":
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="12" r="2.25" />
          <circle cx="18" cy="6" r="2.25" />
          <circle cx="18" cy="18" r="2.25" />
          <path d="M8.1 10.7l5.8-3.4" />
          <path d="M8.1 13.3l5.8 3.4" />
        </svg>
      )
    case "modernize":
      return (
        <svg {...iconProps}>
          <path d="M3.5 16.5 8 11l3.5 3.5 4.5-7 4.5 3" />
        </svg>
      )
  }
}

const SkillCard = ({
  category,
  title,
  items,
  size
}: {
  category: SkillCategory
  title: string
  items: Skill[]
  size: "large" | "small"
}) =>
  <Card className={`skill-card skill-card--${size} skill-card--${category}`}>
    <h3>
      <SkillCardMotif category={category} />
      {title}
    </h3>
    <div className="skill-card__grid">
      {items.map(skill =>
        <div
          key={skill.id}
          className="skill-tile"
          tabIndex={0}
          title={`${skill.experience} ${skill.unite} · ${skill.progress}%`}
        >
          <Image src={skill.imageSrc} alt="" width={36} height={36} />
          <span>{skill.name}</span>
          <div className="skill-bar" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, index) =>
              <i
                key={index}
                className={index < Math.round(skill.progress / 10) ? "is-filled" : ""}
              />
            )}
          </div>
          <div className="skill-tile__hover">
            <strong>{skill.experience} {skill.unite}</strong>
            <span>{skill.progress}%</span>
          </div>
        </div>
      )}
    </div>
  </Card>

const Skills = () => {
  return (
    <section id="skills" className="page-fade">
      <PageTitle title="What I Do" />
      <Container className="skills-page">
        <SectionHeader
          badge={WHAT_I_DO_INTRO.badge}
          title={WHAT_I_DO_INTRO.title}
          gradientText={WHAT_I_DO_INTRO.gradientText}
          subtitle={WHAT_I_DO_INTRO.subtitle}
        />

        <ul className="skills-offer">
          {SERVICES.map((item) => (
            <li key={item.title} className="skills-offer__item">
              <h2>
                <span className="skills-offer__icon">
                  <ServiceIcon name={item.icon} />
                </span>
                {item.title}
              </h2>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="skills-outcomes">
          <header className="skills-kicker">
            <p>Where this helps</p>
            <h2>Problems I take on</h2>
          </header>
          <ul className="skills-outcomes__list">
            {OUTCOMES.map((item) => (
              <li key={item.title}>
                <p className="skills-outcomes__title">{item.title}</p>
                <p className="skills-outcomes__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="skills-engineering">
          <header className="skills-kicker">
            <p>{ENGINEERING_INTRO.kicker}</p>
            <h2>{ENGINEERING_INTRO.title}</h2>
            <p className="skills-overview__lead">{ENGINEERING_INTRO.lead}</p>
          </header>
          <ol className="skills-engineering__list">
            {ENGINEERING_DOMAINS.map((domain) => (
              <li key={domain.index}>
                <span className="skills-engineering__index" aria-hidden="true">
                  {domain.index}
                </span>
                <h3>{domain.title}</h3>
                <p>{domain.text}</p>
                <p className="skills-engineering__topics">
                  {domain.topics.join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="skills-overview">
          <header className="skills-kicker">
            <p>Tools</p>
            <h2>What I build with</h2>
            <p className="skills-overview__lead">
              The stack is how I ship. These are the tools I use most — chosen to fit the product, not the other way around.
            </p>
          </header>
          <div className="skills-overview__grid">
            {TECH_GROUPS.map((group) =>
              <SkillCard
                key={group.id}
                category={group.id}
                title={group.title}
                size={group.size}
                items={skills.filter((skill) => skill.category === group.id)}
              />
            )}
          </div>
        </div>

        <PageCta />
      </Container>
    </section>
  )
}

export default Skills
