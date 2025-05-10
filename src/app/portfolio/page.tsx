"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { data as projects } from "@/data/projects"
import PageTitle from "@/components/PageTitle"
import NavigationButtons from "@/components/NavigationButtons"

const ProjectItem = ({ project, onClick }: { project: any; onClick: () => void }) => (
  <div
    key={project.name}
    title={`Go to ${project.name}`}
    className='project-item'
    onClick={onClick}
  >
    <div className='preject-header'>
      <h3>{project.name}</h3>
    </div>
    <figure className='project-image'>
      <Image
        src={project.thumbnail}
        alt={`${project.thumbnail}-image`}
        className='project-image transition-opacity duration-1s'
        width={145}
        height={135}
      />
    </figure>
  </div>
)

const Portfolio = () => {
  const router = useRouter()

  return (
    <section id='portfolio'>
      <PageTitle title="Portfolio" bodyClass="portfolio" />
      <div className='portfolio_container animate__animated animate__fadeIn'>
        <h2>Portfolio</h2>
        <p className='hover-me'>Click for details</p>
        <div className='projects-container'>
          {projects?.map((project) => (
            <ProjectItem
              key={project.name}
              project={project}
              onClick={() => router.push(`/portfolio/${project.id}`)}
            />
          ))}
        </div>
        <NavigationButtons 
          backLink="/skills"
          nextLink="/certifications"
          nextText="Certifications"
        />
      </div>
    </section>
  )
}

export default Portfolio
