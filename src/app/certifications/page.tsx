"use client"

import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import CtaBanner from "@/components/ui/CtaBanner"
import FilterPills from "@/components/ui/FilterPills"
import IconBox from "@/components/ui/IconBox"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import { certificates } from "@/data/certificates"
import { data as projects } from "@/data/projects"
import { skills } from "@/data/skills"
import Image from "next/image"
import { useMemo, useState } from "react"

const filters = [
  { id: "all", label: "All" },
  { id: "development", label: "Development" },
  { id: "security", label: "Security" },
  { id: "other", label: "Other" }
]

const Certifications = () => {
  const [active, setActive] = useState("all")
  const visible = useMemo(
    () =>
      certificates.filter(item =>
        active === "all" ? true : item.category === active
      ),
    [active]
  )

  return (
    <section className="page-fade">
      <PageTitle title="Certifications" />
      <Container className="certs-page">
        <SectionHeader
          align="center"
          title="Certifications"
          subtitle="Continuously learning and validating my knowledge to deliver better solutions."
        />
        <div className="certs-metrics">
          <div>
            <strong>{certificates.length}</strong>
            <span>Certifications</span>
          </div>
          <div>
            <strong>{projects.length}</strong>
            <span>Projects</span>
          </div>
          <div>
            <strong>{skills.length}</strong>
            <span>Skills</span>
          </div>
        </div>
        <FilterPills options={filters} active={active} onChange={setActive} />
        <div className="certs-grid" key={active}>
          {visible.map(certificate =>
            <Card key={certificate.id} className="certs-card">
              <Image
                src={certificate.url}
                alt={certificate.title}
                width={640}
                height={420}
                className="certs-card__image"
              />
              <span className="ui-badge">{certificate.category}</span>
              <h3>{certificate.title}</h3>
            </Card>
          )}
        </div>
        <CtaBanner
          icon={<IconBox round>→</IconBox>}
          title="Always learning"
          subtitle="See the technologies I use every day."
          actionHref="/skills"
          actionLabel="View my skills →"
        />
      </Container>
    </section>
  )
}

export default Certifications
