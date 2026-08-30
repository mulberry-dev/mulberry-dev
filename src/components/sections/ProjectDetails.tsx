"use client"

import "@/styles/scss/sections/project-detail.scss"
import Button from "@/components/ui/Button"
import CommandLine from "@/components/terminal/CommandLine"
import Container from "@/components/ui/Container"
import ProjectFlags from "@/components/terminal/ProjectFlags"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import TechBadge from "@/components/ui/TechBadge"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import { projectHighlights } from "@/data/projectHighlights"
import { data as projects } from "@/data/projects"
import { WORKSPACE } from "@/data/workspace"
import {
  CATEGORY_LABEL,
  extractYear,
  padCount,
  projectSlug
} from "@/lib/projects"
import { PrivateDeployment } from "@/utils/alerts"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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

const ProjectDetails = ({ id }: { id: string }) => {
  const router = useRouter()
  const index = projects.findIndex(item => String(item.id) === id)
  const project = index >= 0 ? projects[index] : undefined
  const previous = index > 0 ? projects[index - 1] : null
  const next =
    index >= 0 && index < projects.length - 1 ? projects[index + 1] : null
  const highlights = project ? projectHighlights[String(project.id)] : undefined
  const github = project && "github" in project ? project.github : null
  const year = project ? extractYear(project.description) : undefined

  useEffect(() => {
    if (previous) {
      router.prefetch(`/portfolio/${previous.id}`)
    }

    if (next) {
      router.prefetch(`/portfolio/${next.id}`)
    }
  }, [next, previous, router])

  if (!project) {
    return (
      <section>
        <Container className="project-page">
          <RevealGroup mode="fold" stagger={24}>
            <Reveal type="heading" as="h1">
              Project not found
            </Reveal>
            <Reveal type="button">
              <Button href="/portfolio" variant="secondary">
                Back to projects
              </Button>
            </Reveal>
          </RevealGroup>
        </Container>
      </section>
    )
  }

  return (
    <section id="portfolio">
      <Container className="project-page">
        <div className="project-overview">
          <Reveal type="nav" mode="fold" className="project-context">
            <TerminalPrompt path={`${WORKSPACE.work.path}/${projectSlug(project.id)}`} />
            <Link href="/portfolio" className="project-back">
              ← Back to projects
            </Link>
          </Reveal>

          <div className="project-hero">
            <RevealGroup className="project-hero__copy" mode="fold" stagger={28}>
              <Reveal type="eyebrow" className="project-hero__kicker">
                <span>
                  {padCount(index + 1)} / Project
                </span>
                <ProjectFlags project={project} />
              </Reveal>
              <Reveal type="heading" as="h1">
                {project.name}
              </Reveal>
              <Reveal type="text" as="p" className="project-hero__lede">
                {project.teaser}
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

            <Reveal type="image" className="project-hero__visual" mode="fold">
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

        <dl className="project-facts">
          {year ? (
            <div>
              <dt>Year</dt>
              <dd>{year}</dd>
            </div>
          ) : null}
          {project.category ? (
            <div>
              <dt>Type</dt>
              <dd>{CATEGORY_LABEL[project.category]}</dd>
            </div>
          ) : null}
        </dl>

        <div className="project-story">
          <section>
            <h2>About the project</h2>
            <p>{project.description}</p>
          </section>
        </div>

        {highlights?.length ? (
          <section className="project-features">
            <h2>Key features</h2>
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
          </section>
        ) : null}

        <div className="project-stack">
          <Reveal type="text" mode="scroll" as="h2" className="project-stack__title">
            Technologies
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
                prefetch
                aria-label={`Previous project: ${previous.name}`}
              >
                <ProjectNavChevron direction="prev" />
                <span>
                  <span className="project-nav__dir">Previous</span>
                  <span className="project-nav__name">{previous.name}</span>
                </span>
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
                prefetch
                aria-label={`Next project: ${next.name}`}
              >
                <span>
                  <span className="project-nav__dir">Next</span>
                  <span className="project-nav__name">{next.name}</span>
                </span>
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
        <CommandLine command="" cursor className="project-eof" />
      </Container>
    </section>
  )
}

export default ProjectDetails
