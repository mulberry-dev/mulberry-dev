"use client"

import CommandLine from "@/components/terminal/CommandLine"
import ProjectStatus from "@/components/terminal/ProjectStatus"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import Container from "@/components/ui/Container"
import FilterPills from "@/components/ui/FilterPills"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import { WORKSPACE } from "@/data/workspace"
import {
  archiveProjects,
  categoryCounts,
  extractYear,
  featuredProjects,
  padCount,
  techNames,
  type Project
} from "@/lib/projects"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState, type MouseEvent } from "react"

const filters = [
  { id: "all", label: "all" },
  { id: "web", label: "web" },
  { id: "landing", label: "landing" },
  { id: "api", label: "backend" },
  { id: "ecommerce", label: "commerce" }
]

const preloadedImages = new Set<string>()

const preloadProjectImage = (src: string) => {
  if (preloadedImages.has(src) || typeof window === "undefined") {
    return
  }

  preloadedImages.add(src)
  const image = new window.Image()
  image.decoding = "async"
  image.src = src
}

const useProjectLink = (project: Project) => {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const href = `/portfolio/${project.id}`

  useEffect(() => {
    setLoading(false)
  }, [pathname])

  const prefetchProject = () => {
    router.prefetch(href)
    preloadProjectImage(project.img)
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    setLoading(true)
    prefetchProject()
  }

  return { href, loading, prefetchProject, handleClick }
}

const FeaturedCard = ({
  project,
  index,
  featured
}: {
  project: Project
  index: number
  featured?: boolean
}) => {
  const { href, loading, prefetchProject, handleClick } = useProjectLink(project)
  const year = extractYear(project.description)
  const stack = techNames(project.tech).slice(0, 4)

  return (
    <Link
      href={href}
      prefetch
      className={`work-card-link${featured ? " is-featured" : ""}${loading ? " is-loading" : ""}`}
      aria-busy={loading || undefined}
      onPointerEnter={prefetchProject}
      onFocus={prefetchProject}
      onClick={handleClick}
    >
      <article className={`work-card${featured ? " work-card--featured" : ""}`}>
        <div className="work-card__copy">
          <header className="work-card__meta">
            <span className="work-card__index">
              {padCount(index + 1)} / Featured
            </span>
            <ProjectStatus project={project} />
          </header>
          <h3>{project.name}</h3>
          <p className="work-card__teaser">{project.teaser}</p>
          <dl className="work-card__facts">
            {year ? (
              <div>
                <dt>Year</dt>
                <dd>{year}</dd>
              </div>
            ) : null}
            <div>
              <dt>Stack</dt>
              <dd>{stack.join(" · ")}</dd>
            </div>
          </dl>
          <span className="work-card__cta">
            View case study
            <span aria-hidden="true"> →</span>
          </span>
          {loading ? (
            <span className="portfolio-card__loader" role="status">
              <span className="portfolio-card__spinner" aria-hidden="true" />
              Loading project details…
            </span>
          ) : null}
        </div>
        <div className="work-card__media">
          <Image
            src={project.img}
            alt={project.name}
            width={project.width || 1280}
            height={project.height || 800}
            sizes={
              featured
                ? "(max-width: 899px) 100vw, 52vw"
                : "(max-width: 767px) 100vw, 40vw"
            }
            className="work-card__image"
            priority={featured}
          />
        </div>
      </article>
    </Link>
  )
}

const ArchiveCard = ({ project }: { project: Project }) => {
  const { href, loading, prefetchProject, handleClick } = useProjectLink(project)
  const stack = techNames(project.tech).slice(0, 3)

  return (
    <Link
      href={href}
      prefetch
      className={`archive-card-link${loading ? " is-loading" : ""}`}
      aria-busy={loading || undefined}
      onPointerEnter={prefetchProject}
      onFocus={prefetchProject}
      onClick={handleClick}
    >
      <article className="archive-card">
        <div className="archive-card__media">
          <Image
            src={project.thumbnail}
            alt=""
            width={400}
            height={220}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
            className="archive-card__image"
          />
        </div>
        <h3>{project.name}</h3>
        <p>{project.teaser}</p>
        <p className="archive-card__stack">{stack.join(" · ")}</p>
        <span className="archive-card__cta">
          View
          <span aria-hidden="true"> →</span>
        </span>
        {loading ? (
          <span className="portfolio-card__loader" role="status">
            <span className="portfolio-card__spinner" aria-hidden="true" />
            Loading project details…
          </span>
        ) : null}
      </article>
    </Link>
  )
}

const Portfolio = () => {
  const router = useRouter()
  const [active, setActive] = useState("all")

  const featuredVisible = useMemo(
    () =>
      featuredProjects.filter(project =>
        active === "all" ? true : project.category === active
      ),
    [active]
  )

  const archiveVisible = useMemo(
    () =>
      archiveProjects.filter(project =>
        active === "all" ? true : project.category === active
      ),
    [active]
  )

  const filterOptions = filters.map(filter => ({
    ...filter,
    count: categoryCounts[filter.id] || 0
  }))

  useEffect(() => {
    ;[...featuredVisible, ...archiveVisible].forEach(project => {
      router.prefetch(`/portfolio/${project.id}`)
    })
  }, [archiveVisible, featuredVisible, router])

  return (
    <section
      id="portfolio"
      data-section-path="/portfolio"
      aria-label="Selected Work"
      tabIndex={-1}
    >
      <Container className="portfolio-page">
        <WorkspaceHeader
          index={WORKSPACE.work.index}
          path={WORKSPACE.work.path}
          title={WORKSPACE.work.title}
          command="ls ./selected-projects --sort=impact"
          meta={`${padCount(categoryCounts.all)} projects found · ${padCount(featuredProjects.length)} featured · ${padCount(archiveProjects.length)} archive`}
        />

        <Reveal type="nav">
          <FilterPills
            options={filterOptions}
            active={active}
            onChange={setActive}
            variant="command"
          />
        </Reveal>

        {featuredVisible.length ? (
          <div className="work-featured">
            <FeaturedCard
              project={featuredVisible[0]}
              index={0}
              featured
            />
            {featuredVisible.length > 1 ? (
              <RevealGroup className="work-featured__grid" mode="auto" stagger={56}>
                {featuredVisible.slice(1).map((project, index) => (
                  <Reveal key={String(project.id)} type="image">
                    <FeaturedCard project={project} index={index + 1} />
                  </Reveal>
                ))}
              </RevealGroup>
            ) : null}
          </div>
        ) : null}

        <div className="work-archive">
          <CommandLine command="ls ./archive" />
          <p className="workspace-header__meta">
            {padCount(archiveVisible.length)} projects in archive
          </p>
          <RevealGroup className="archive-grid" mode="auto" stagger={48} key={active}>
            {archiveVisible.map(project => (
              <Reveal key={String(project.id)} type="image">
                <ArchiveCard project={project} />
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}

export default Portfolio
