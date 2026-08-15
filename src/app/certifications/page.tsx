"use client"

import Badge from "@/components/ui/Badge"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import CountUp from "@/components/ui/CountUp"
import FilterPills from "@/components/ui/FilterPills"
import Lightbox, { LightboxOrigin } from "@/components/ui/Lightbox"
import PageCta from "@/components/ui/PageCta"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import { certificates } from "@/data/certificates"
import { data as projects } from "@/data/projects"
import { skills } from "@/data/skills"
import Image from "next/image"
import { MouseEvent, useCallback, useMemo, useRef, useState } from "react"

const filters = [
  { id: "all", label: "All" },
  { id: "development", label: "Development" },
  { id: "security", label: "Security" },
  { id: "english", label: "English" }
]

const Certifications = () => {
  const [active, setActive] = useState("all")
  const [viewer, setViewer] = useState<{
    id: number
    origin: LightboxOrigin
  } | null>(null)
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map())
  const visible = useMemo(
    () =>
      certificates.filter(item =>
        active === "all" ? true : item.category === active
      ),
    [active]
  )
  const openCertificate = certificates.find(item => item.id === viewer?.id)
  const sourceImage = openCertificate
    ? imageRefs.current.get(openCertificate.id)
    : undefined
  const aspectRatio =
    sourceImage && sourceImage.naturalWidth
      ? sourceImage.naturalWidth / sourceImage.naturalHeight
      : 640 / 420

  const readOrigin = (node: Element | null): LightboxOrigin | null => {
    if (!node) {
      return null
    }

    const rect = node.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  }

  const getOrigin = useCallback(() => {
    if (!viewer) {
      return null
    }

    return readOrigin(imageRefs.current.get(viewer.id) ?? null)
  }, [viewer])

  const openViewer = (
    id: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const image = imageRefs.current.get(id) ?? event.currentTarget.querySelector("img")
    const origin = readOrigin(image)
    if (!origin) {
      return
    }

    setViewer({ id, origin })
  }

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
            <strong>
              <CountUp value={certificates.length} duration={2000} delay={60} />
            </strong>
            <span>Certifications</span>
          </div>
          <div>
            <strong>
              <CountUp value={projects.length} duration={2000} delay={180} />
            </strong>
            <span>Projects shipped</span>
          </div>
          <div>
            <strong>
              <CountUp value={skills.length} duration={2000} delay={300} />
            </strong>
            <span>Tools in daily use</span>
          </div>
        </div>
        <FilterPills options={filters} active={active} onChange={setActive} />
        <div className="certs-grid" key={active}>
          {visible.map(certificate =>
            <Card
              key={certificate.id}
              className={`certs-card${viewer?.id === certificate.id ? " is-expanded" : ""}`}
            >
              <button
                type="button"
                className="certs-card__open"
                onClick={event => openViewer(certificate.id, event)}
                aria-label={`View ${certificate.title} fullscreen`}
              >
                <Image
                  ref={node => {
                    if (node) {
                      imageRefs.current.set(certificate.id, node)
                    } else {
                      imageRefs.current.delete(certificate.id)
                    }
                  }}
                  src={certificate.url}
                  alt={certificate.title}
                  width={640}
                  height={420}
                  className="certs-card__image"
                />
                <Badge variant={certificate.category}>
                  {certificate.category}
                </Badge>
                <h3>{certificate.title}</h3>
              </button>
            </Card>
          )}
        </div>
        <PageCta />
      </Container>
      {openCertificate && viewer ? (
        <Lightbox
          src={openCertificate.url}
          alt={openCertificate.title}
          origin={viewer.origin}
          getOrigin={getOrigin}
          aspectRatio={aspectRatio}
          onClose={() => setViewer(null)}
        />
      ) : null}
    </section>
  )
}

export default Certifications
