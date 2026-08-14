"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import CtaBanner from "@/components/ui/CtaBanner"
import IconBox from "@/components/ui/IconBox"
import PageTitle from "@/components/PageTitle"
import TechBadge from "@/components/ui/TechBadge"
import { data as projects } from "@/data/projects"
import { PrivateDeployment } from "@/utils/alerts"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

const categoryLabel: Record<string, string> = {
  web: "Web Application",
  api: "APIs & Backend",
  ecommerce: "eCommerce"
}

const ProjectDetails = () => {
  const params = useParams<{ id: string }>()
  const project = projects.find(item => String(item.id) === params.id)

  if (!project) {
    return (
      <section className="page-fade">
        <PageTitle title="Project" />
        <Container className="project-page">
          <h1>Project not found</h1>
          <Button href="/portfolio" variant="secondary">
            Back to portfolio
          </Button>
        </Container>
      </section>
    )
  }

  return (
    <section id="portfolio" className="page-fade">
      <PageTitle title={project.name} />
      <Container className="project-page">
        <Link href="/portfolio" className="project-back">
          ← Back to portfolio
        </Link>

        <div className="project-hero">
          <div>
            {project.category ? (
              <span className="ui-badge">{categoryLabel[project.category]}</span>
            ) : null}
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <div className="project-hero__actions">
              {project.url ? (
                <Button href={project.url} external>
                  Visit live site
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => PrivateDeployment(project.name)}
                >
                  Private deployment
                </Button>
              )}
              {project.github ? (
                <Button href={project.github} variant="secondary" external>
                  View on GitHub
                </Button>
              ) : null}
            </div>
          </div>
          <Image
            className="project-hero__image"
            src={project.img}
            alt={project.name}
            width={project.width || 640}
            height={project.height || 400}
            priority
          />
        </div>

        <div>
          <h2>Technology stack</h2>
          <div className="project-tech">
            {project.tech.map((tech, index) =>
              typeof tech === "string" ? (
                <TechBadge key={`${tech}-${index}`} name={tech} />
              ) : (
                <TechBadge key={tech.tech} name={tech.tech} icon={tech.icon} />
              )
            )}
          </div>
        </div>

        <CtaBanner
          icon={<IconBox round>↑</IconBox>}
          title="Like this project?"
          subtitle="Let's talk about how a similar approach could work for you."
          actionHref="/contact"
          actionLabel="Let's talk →"
        />
      </Container>
    </section>
  )
}

export default ProjectDetails
