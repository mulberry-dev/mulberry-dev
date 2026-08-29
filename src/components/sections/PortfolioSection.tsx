"use client"

import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import FilterPills from "@/components/ui/FilterPills"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SectionHeader from "@/components/ui/SectionHeader"
import TechBadge from "@/components/ui/TechBadge"
import { data as projects } from "@/data/projects"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState, type MouseEvent } from "react"

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Applications" },
  { id: "landing", label: "Landing Page" },
  { id: "api", label: "APIs & Backend" },
  { id: "ecommerce", label: "eCommerce" }
]

type Project = (typeof projects)[number]

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

const PortfolioCard = ({ project }: { project: Project }) => {
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

  return (
    <Link
      href={href}
      prefetch
      className={
        loading ? "portfolio-card-link is-loading" : "portfolio-card-link"
      }
      aria-busy={loading || undefined}
      onPointerEnter={prefetchProject}
      onFocus={prefetchProject}
      onClick={handleClick}
    >
      <Card className="portfolio-card">
        <div className="portfolio-card__media">
          <Image
            src={project.thumbnail}
            alt={project.name}
            width={400}
            height={220}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
            className="portfolio-card__image"
          />
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="portfolio-card__tech">
          {project.tech.slice(0, 4).map(tech =>
            typeof tech === "string" ? (
              <TechBadge key={tech} name={tech} />
            ) : (
              <TechBadge
                key={tech.tech}
                name={tech.tech}
                icon={tech.icon}
              />
            )
          )}
        </div>
        <span className="portfolio-card__cta">View Project Details</span>
        {loading ? (
          <span className="portfolio-card__loader" role="status">
            <span className="portfolio-card__spinner" aria-hidden="true" />
            Loading project details…
          </span>
        ) : null}
      </Card>
    </Link>
  )
}

const Portfolio = () => {
  const router = useRouter()
  const [active, setActive] = useState("all")

  const visible = useMemo(
    () =>
      projects.filter(project =>
        active === "all" ? true : project.category === active
      ),
    [active]
  )

  useEffect(() => {
    visible.forEach(project => {
      router.prefetch(`/portfolio/${project.id}`)
    })
  }, [router, visible])

  return (
    <section
      id="portfolio"
      data-section-path="/portfolio"
      aria-label="My Work"
      tabIndex={-1}
    >
      <Container className="portfolio-page">
        <RevealGroup mode="auto" stagger={64}>
          <SectionHeader
            as="h2"
            align="center"
            title="My Work"
            subtitle="Selected work that solved real problems and delivered impact."
          />
          <Reveal type="nav">
            <FilterPills options={filters} active={active} onChange={setActive} />
          </Reveal>
        </RevealGroup>
        <RevealGroup className="portfolio-grid" mode="auto" stagger={56} key={active}>
          {visible.map(project =>
            <Reveal key={String(project.id)} type="image">
              <PortfolioCard project={project} />
            </Reveal>
          )}
        </RevealGroup>
      </Container>
    </section>
  )
}

export default Portfolio
