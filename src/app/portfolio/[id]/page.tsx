"use client"

import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import PageTitle from "@/components/PageTitle"
import SiteIcon from "@/components/ui/SiteIcon"
import TechBadge from "@/components/ui/TechBadge"
import { projectHighlights } from "@/data/projectHighlights"
import { data as projects } from "@/data/projects"
import { PrivateDeployment } from "@/utils/alerts"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

const categoryLabel: Record<string, string> = {
  web: "Web Application",
  landing: "Landing Page",
  api: "APIs & Backend",
  ecommerce: "eCommerce"
}

const ExternalIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6.2 3.5H3.6A1.6 1.6 0 0 0 2 5.1v7.3A1.6 1.6 0 0 0 3.6 14h7.3a1.6 1.6 0 0 0 1.6-1.6V9.4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M8.8 2.5h4.7V7.2M7.2 8.8 13.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProjectNavChevron = ({ direction }: { direction: "prev" | "next" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "prev" ? (
      <path d="M15 6 9 12l6 6" />
    ) : (
      <path d="M9 6l6 6-6 6" />
    )}
  </svg>
)

const ProjectDetails = () => {
  const params = useParams<{ id: string }>()
  const index = projects.findIndex(item => String(item.id) === params.id)
  const project = index >= 0 ? projects[index] : undefined
  const previous = index > 0 ? projects[index - 1] : null
  const next =
    index >= 0 && index < projects.length - 1 ? projects[index + 1] : null
  const highlights = project ? projectHighlights[String(project.id)] : undefined
  const github = project && "github" in project ? project.github : null

  if (!project) {
    return (
      <section>
        <PageTitle title="Project" />
        <Container className="project-page">
          <RevealGroup mode="fold" stagger={56}>
            <Reveal type="heading" as="h1">
              Project not found
            </Reveal>
            <Reveal type="button">
              <Button href="/portfolio" variant="secondary">
                Back to my work
              </Button>
            </Reveal>
          </RevealGroup>
        </Container>
      </section>
    )
  }

  return (
    <section id="portfolio">
      <PageTitle title={project.name} />
      <Container className="project-page">
        <div className="project-overview">
          <Reveal type="nav" mode="fold">
            <Link href="/portfolio" className="project-back">
              ← Back to my work
            </Link>
          </Reveal>

          <div className="project-hero">
            <RevealGroup className="project-hero__copy" mode="fold" stagger={48}>
              {project.category ? (
                <Reveal type="eyebrow">
                  <Badge variant={project.category}>
                    {categoryLabel[project.category]}
                  </Badge>
                </Reveal>
              ) : null}
              <Reveal type="heading" as="h1">
                {project.name}
              </Reveal>
              <Reveal type="text" as="p">
                {project.description}
              </Reveal>
              <Reveal type="button" className="project-hero__actions">
                {project.url ? (
                  <Button href={project.url} external>
                    Visit live site
                    <ExternalIcon />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => PrivateDeployment(project.name)}
                  >
                    Private deployment
                  </Button>
                )}
                {github ? (
                  <Button href={github} variant="secondary" external>
                    View on GitHub
                  </Button>
                ) : null}
              </Reveal>
            </RevealGroup>

            <Reveal type="image" className="project-hero__visual" mode="fold" delay={80}>
              <Image
                className="project-hero__image"
                src={project.img}
                alt={project.name}
                width={project.width || 1280}
                height={project.height || 800}
                sizes="(max-width: 899px) 100vw, 58vw"
                priority
              />
            </Reveal>
          </div>
        </div>

        {highlights?.length ? (
          <RevealGroup
            as="ul"
            className="project-highlights"
            mode="scroll"
            stagger={36}
          >
            {highlights.map(item => (
              <Reveal key={item.title} as="li" type="text">
                <span className="project-highlights__icon">
                  <SiteIcon name={item.icon} />
                </span>
                <span className="project-highlights__copy">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </span>
              </Reveal>
            ))}
          </RevealGroup>
        ) : null}

        <div className="project-stack">
          <Reveal type="text" mode="scroll" as="h2" className="project-stack__title">
            Technology stack
          </Reveal>
          <RevealGroup className="project-tech" mode="scroll" stagger={28}>
            {project.tech.map((tech, techIndex) =>
              typeof tech === "string" ? (
                <Reveal key={`${tech}-${techIndex}`} type="button">
                  <TechBadge name={tech} />
                </Reveal>
              ) : (
                <Reveal key={tech.tech} type="button">
                  <TechBadge name={tech.tech} icon={tech.icon} />
                </Reveal>
              )
            )}
          </RevealGroup>
        </div>

        <Reveal type="nav" mode="scroll">
          <nav className="project-nav" aria-label="Projects">
            {previous ? (
              <Link
                className="project-nav__link"
                href={`/portfolio/${previous.id}`}
                aria-label={`Previous project: ${previous.name}`}
              >
                <ProjectNavChevron direction="prev" />
                Previous project
              </Link>
            ) : (
              <span className="project-nav__link is-disabled">
                <ProjectNavChevron direction="prev" />
                Previous project
              </span>
            )}
            {next ? (
              <Link
                className="project-nav__link project-nav__link--next"
                href={`/portfolio/${next.id}`}
                aria-label={`Next project: ${next.name}`}
              >
                Next project
                <ProjectNavChevron direction="next" />
              </Link>
            ) : (
              <span className="project-nav__link project-nav__link--next is-disabled">
                Next project
                <ProjectNavChevron direction="next" />
              </span>
            )}
          </nav>
        </Reveal>
      </Container>
    </section>
  )
}

export default ProjectDetails
