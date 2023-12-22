"use client"

import { skills } from "@/data/skills"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

const Skills = () => {
  useEffect(() => {
    document.title = "ThisIsSanti.dev | Skills"
  }, [])

  return (
    <section id='skills'>
      <div className='skills_container animate__animated animate__fadeIn'>
        <h2 className='h2'>Skills</h2>
        <p className='hover-me'>Move the mouse over the cubes.</p>

        <div className='cubes_container'>
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`skill-item transition menuitem-${skill.id} blur`}
            >
              <Image
                src={skill.imageSrc}
                alt={`${skill.name}-image`}
                width={90}
                priority={true}
                height={90}
                style={{ objectFit: "contain" }}
              />
              <p>{skill.name}</p>
              <div className='skill-hover-card'>
                <label htmlFor='skill'>
                  {skill.experience} {skill.unite}
                </label>
                <progress id='file' max='100' value={skill.progress}></progress>
                <label htmlFor='skill'>{skill.progress}%</label>
              </div>
            </div>
          ))}
        </div>
        <div className='buttons_container  menuitem-13'>
          <Link className='button smallest ' href={"/education"}>
            <Image
              src='/images/Icons/arrow-right-rounded.svg'
              alt='go-back'
              className='go_back'
              width={40}
              height={40}
              /* style={{ objectFit: "contain" }} */
              title='Go back'
            />
          </Link>
          <Link href='/portfolio' className='button-generic transition'>
            Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Skills
