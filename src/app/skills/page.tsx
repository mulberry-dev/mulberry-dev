"use client"

import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import CtaBanner from "@/components/ui/CtaBanner"
import IconBox from "@/components/ui/IconBox"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import { certificates } from "@/data/certificates"
import { data as projects } from "@/data/projects"
import { Skill, SkillCategory, skills } from "@/data/skills"
import Image from "next/image"

const groups: { id: SkillCategory; title: string; size: "large" | "small" }[] = [
  { id: "frontend", title: "Frontend Development", size: "large" },
  { id: "backend", title: "Backend Development", size: "large" },
  { id: "databases", title: "Databases", size: "small" },
  { id: "devops", title: "DevOps & Cloud", size: "small" },
  { id: "tools", title: "Tools & Workflow", size: "small" }
]

const SkillCard = ({
  title,
  items,
  size
}: {
  title: string
  items: Skill[]
  size: "large" | "small"
}) =>
  <Card className={`skill-card skill-card--${size}`}>
    <h3>{title}</h3>
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
          badge="What I do"
          title="Technologies"
          gradientText="I work with"
          subtitle="I am always immersed in learning new technologies, driven by my commitment to developing specialized and scalable technology for new projects."
        />

        <div className="skills-overview">
          <h2>Skills overview</h2>
          <div className="skills-overview__grid">
            {groups.map(group =>
              <SkillCard
                key={group.id}
                title={group.title}
                size={group.size}
                items={skills.filter(skill => skill.category === group.id)}
              />
            )}
          </div>
        </div>

        <div className="skills-stats">
          <div>
            <strong>{projects.length}</strong>
            <span>Projects</span>
          </div>
          <div>
            <strong>{certificates.length}</strong>
            <span>Certifications</span>
          </div>
          <div>
            <strong>{skills.length}</strong>
            <span>Skills</span>
          </div>
        </div>

        <CtaBanner
          icon={<IconBox round>#</IconBox>}
          title="Want to see this in action?"
          subtitle="Explore the projects where these technologies were used."
          actionHref="/portfolio"
          actionLabel="View my work →"
        />
      </Container>
    </section>
  )
}

export default Skills
