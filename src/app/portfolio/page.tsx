"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { data as projects } from "@/data/projects"

const Portfolio = () => {
  const router = useRouter()

  useEffect(() => {
    document.title = "ThisIsSanti.dev | Portfolio"
  }, [])

  return (
    <>
      <section id='portfolio'>
        <div className='portfolio_container animate__animated animate__fadeIn'>
          <h2>Portfolio</h2>
          <p className='hover-me'>Click for details</p>
          <div className='projects-container'>
            {projects?.map((project) => (
              <div
                key={`${project.name}`}
                className={`project-item`}
                onClick={() => {
                  router.push(`/portfolio/${project.id}`)
                }}
              >
                <div className='preject-header'>
                  <h3>{project.name}</h3>
                </div>
                <figure className='project-image'>
                  <Image
                    src={project.thumbnail}
                    alt={`${project.thumbnail}-image`}
                    className='project-image transition-opacity duration-1s'
                    width={150}
                    height={135}
                  />
                </figure>
              </div>
            ))}
          </div>
          <div className='buttons_container'>
            <Link className='button smallest ' href={"/about"}>
              <Image
                src='/images/Icons/arrow-right-rounded.svg'
                alt='go-back'
                priority={true}
                className='go_back'
                width={40}
                height={40}
                title='Go back'
              />
            </Link>
            <Link className='button-generic' href='/skills'>
              Skills
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Portfolio
