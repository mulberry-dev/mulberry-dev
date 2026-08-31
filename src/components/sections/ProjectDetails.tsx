"use client"

import "@/styles/scss/sections/project-detail.scss"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import ProjectFlags from "@/components/terminal/ProjectFlags"
import ProjectType from "@/components/terminal/ProjectType"
import ProjectPreview from "@/components/sections/ProjectPreview"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import TechBadge from "@/components/ui/TechBadge"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import { projectHighlights } from "@/data/projectHighlights"
import { data as projects } from "@/data/projects"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { extractYear, hasLivePreview, localizeProject, padCount, projectSlug } from "@/lib/projects"
import { ConfirmLeaveSite, PrivateDeployment } from "@/utils/alerts"
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
  const { t, locale, href } = useI18n()
  const index = projects.findIndex(item => String(item.id) === id)
  const source = index >= 0 ? projects[index] : undefined
  const project = source ? localizeProject(source, locale) : undefined
  const previous = index > 0 ? projects[index - 1] : null
  const next =
    index >= 0 && index < projects.length - 1 ? projects[index + 1] : null
  const highlightSource = project ? projectHighlights[String(project.id)] : undefined
  const highlightCopy = project ? t.projects[String(project.id)]?.highlights : undefined
  const highlights = highlightSource?.map((item, highlightIndex) => ({
    ...item,
    title: highlightCopy?.[highlightIndex]?.title ?? item.title,
    text: highlightCopy?.[highlightIndex]?.text ?? item.text
  }))
  const github = project && "github" in project ? project.github : null
  const year = source ? extractYear(source.description) : undefined

  useEffect(() => {
    if (previous) {
      router.prefetch(href(`/portfolio/${previous.id}`))
    }

    if (next) {
      router.prefetch(href(`/portfolio/${next.id}`))
    }
  }, [href, next, previous, router])

  if (!project) {
    return (
      <section>
        <Container className="project-page">
          <RevealGroup mode="fold" stagger={24}>
            <Reveal type="heading" as="h1">
              {t.project.notFound}
            </Reveal>
            <Reveal type="button">
              <Button href={href("/portfolio")} variant="secondary">
                {t.project.back}
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
            <Link href={href("/portfolio")} className="project-back">
              ← {t.project.back}
            </Link>
          </Reveal>

          <div className="project-hero">
            <RevealGroup className="project-hero__copy" mode="fold" stagger={28}>
              <div className="project-hero__identity">
                <Reveal type="eyebrow" className="project-hero__kicker">
                  <span>
                    {padCount(index + 1)} / {t.project.kicker}
                  </span>
                  {year ? <span>{year}</span> : null}
                  <ProjectType project={project} />
                  <ProjectFlags project={project} />
                </Reveal>
                <Reveal type="heading" as="h1" className="project-hero__title">
                  {project.name}
                </Reveal>
              </div>
              <Reveal type="text" className="project-hero__about">
                <h2 className="project-hero__label">{t.project.about}</h2>
                <p>{project.description}</p>
              </Reveal>
              {highlights?.length ? (
                <Reveal type="text" className="project-hero__features">
                  <h2 className="project-hero__label">{t.project.features}</h2>
                  <ul className="project-highlights">
                    {highlights.map(item => (
                      <li key={item.title}>
                        <span className="project-highlights__icon">
                          <SiteIcon name={item.icon} />
                        </span>
                        <span className="project-highlights__copy">
                          <strong>{item.title}</strong>
                          <span>{item.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
              <Reveal type="button" className="project-hero__actions">
                {project.url ? (
                  <Button
                    type="button"
                    onClick={async () => {
                      const leave = await ConfirmLeaveSite(t.project)
                      if (leave) {
                        window.location.assign(project.url)
                      }
                    }}
                  >
                    {t.project.visit}
                    <ExternalIcon />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => PrivateDeployment(project.name, t.project)}
                  >
                    {t.project.private}
                  </Button>
                )}
                {github ? (
                  <Button href={github} variant="secondary" external>
                    {t.project.github}
                  </Button>
                ) : null}
              </Reveal>
            </RevealGroup>

            <Reveal type="image" className="project-hero__visual" mode="fold">
              {hasLivePreview(project) ? (
                <ProjectPreview
                  url={project.url}
                  poster={project.img}
                  name={project.name}
                  teaser={project.teaser}
                />
              ) : (
                <Image
                  className="project-hero__image"
                  src={project.img}
                  alt={`${project.name} — ${project.teaser}`}
                  width={project.width || 1280}
                  height={project.height || 800}
                  sizes="(max-width: 899px) 100vw, 58vw"
                  priority
                />
              )}
            </Reveal>
          </div>
        </div>

        <div className="project-stack">
          <Reveal type="text" mode="scroll" as="h2" className="project-stack__title">
            {t.project.technologies}
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

        <div className="project-nav-wrap">
          <Reveal type="nav" mode="fold">
            <nav className="project-nav" aria-label={t.project.navLabel}>
              {previous ? (
                <Link
                  className="project-nav__link"
                  href={href(`/portfolio/${previous.id}`)}
                  prefetch
                  aria-label={`${t.project.previous}: ${previous.name}`}
                >
                  <ProjectNavChevron direction="prev" />
                  <span className="project-nav__copy">
                    <span className="project-nav__dir">{t.project.previous}</span>
                    <span className="project-nav__name">{previous.name}</span>
                  </span>
                </Link>
              ) : (
                <span className="project-nav__link is-disabled">
                  <ProjectNavChevron direction="prev" />
                  {t.project.previous}
                </span>
              )}
              {next ? (
                <Link
                  className="project-nav__link project-nav__link--next"
                  href={href(`/portfolio/${next.id}`)}
                  prefetch
                  aria-label={`${t.project.next}: ${next.name}`}
                >
                  <span className="project-nav__copy">
                    <span className="project-nav__dir">{t.project.next}</span>
                    <span className="project-nav__name">{next.name}</span>
                  </span>
                  <ProjectNavChevron direction="next" />
                </Link>
              ) : (
                <span className="project-nav__link project-nav__link--next is-disabled">
                  {t.project.next}
                  <ProjectNavChevron direction="next" />
                </span>
              )}
            </nav>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default ProjectDetails
