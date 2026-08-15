"use client"

import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import FilterPills from "@/components/ui/FilterPills"
import PageCta from "@/components/ui/PageCta"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import TechBadge from "@/components/ui/TechBadge"
import { data as projects } from "@/data/projects"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Applications" },
  { id: "landing", label: "Landing Page" },
  { id: "api", label: "APIs & Backend" },
  { id: "ecommerce", label: "eCommerce" }
]

const Portfolio = () => {
  const [active, setActive] = useState("all")

  const visible = useMemo(
    () =>
      projects.filter(project =>
        active === "all" ? true : project.category === active
      ),
    [active]
  )

  return (
    <section id="portfolio" className="page-fade">
      <PageTitle title="Portfolio" />
      <Container className="portfolio-page">
        <SectionHeader
          align="center"
          title="Portfolio"
          subtitle="Selected work that solved real problems and delivered impact."
        />
        <FilterPills options={filters} active={active} onChange={setActive} />
        <div className="portfolio-grid" key={active}>
          {visible.map(project =>
            <Link
              key={String(project.id)}
              href={`/portfolio/${project.id}`}
              className="portfolio-card-link"
            >
              <Card className="portfolio-card">
                <div className="portfolio-card__media">
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    width={400}
                    height={220}
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
                <span className="portfolio-card__cta">View case study →</span>
              </Card>
            </Link>
          )}
        </div>
        <PageCta />
      </Container>
    </section>
  )
}

export default Portfolio
