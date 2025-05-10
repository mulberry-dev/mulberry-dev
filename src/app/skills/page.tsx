"use client"

import { skills } from "@/data/skills"
import Image from "next/image"
import PageTitle from "@/components/PageTitle"
import NavigationButtons from "@/components/NavigationButtons"

const SkillItem = ({ skill }: { skill: any }) =>
  <div key={skill.id} className={`skill-item transition menuitem-${skill.id}`}>
    <Image
      src={skill.imageSrc}
      alt={`${skill.name}-image`}
      width={90}
      priority={true}
      height={90}
      style={{ objectFit: "contain" }}
    />
    <p>
      {skill.name}
    </p>
    <div className="skill-hover-card">
      <label htmlFor="skill">
        {skill.experience} {skill.unite}
      </label>
      <progress id="file" max="100" value={skill.progress} />
      <label htmlFor="skill">
        {skill.progress}%
      </label>
    </div>
  </div>

const Skills = () => {
  return (
    <section id="skills">
      <PageTitle title="Skills" bodyClass="skills" />
      <div className="skills_container animate__animated animate__fadeIn">
        <h2 className="h2">Skills</h2>
        <p className="hover-me">Move the mouse over the cubes.</p>

        <div className="cubes_container">
          {skills.map(skill => <SkillItem key={skill.id} skill={skill} />)}
        </div>
        <NavigationButtons
          backLink="/about"
          nextLink="/portfolio"
          nextText="Portfolio"
        />
      </div>
    </section>
  )
}

export default Skills
