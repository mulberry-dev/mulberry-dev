"use client"

import ApproachScene from "@/components/build/ApproachScene"
import ArchitectureScene from "@/components/build/ArchitectureScene"
import ConnectedScene from "@/components/build/ConnectedScene"
import ModernizeScene from "@/components/build/ModernizeScene"
import ProductScene from "@/components/build/ProductScene"
import TechStackBar from "@/components/terminal/TechStackBar"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"
import { WORKSPACE } from "@/data/workspace"
import {
  BUILD_APPROACH,
  BUILD_CONNECTED,
  BUILD_INTERFACES,
  BUILD_MODERNIZATION,
  BUILD_SECTIONS,
  BUILD_SYSTEMS
} from "@/data/whatIBuild"
import { useEffect, useState, type ReactNode } from "react"

const CopyBlock = ({
  index,
  title,
  items
}: {
  index: string
  title: string
  items?: readonly { icon: SiteIconName; label: string }[]
}) => (
  <div className="skills-copy">
    <Reveal type="eyebrow">
      <h3 className="skills-copy__index">
        <span>{index}</span>
        <span> / {title}</span>
      </h3>
    </Reveal>
    {items ? (
      <ul className="skills-copy__items">
        {items.map((item) => (
          <Reveal key={item.label} as="li" type="chip">
            <span aria-hidden="true">
              <SiteIcon name={item.icon} />
            </span>
            <span>{item.label}</span>
          </Reveal>
        ))}
      </ul>
    ) : null}
  </div>
)

const Capability = ({
  id,
  children,
  stage
}: {
  id: string
  children: ReactNode
  stage: ReactNode
}) => (
  <RevealGroup className="skills-capability" mode="scroll" stagger={56}>
    <div id={id} className="skills-capability__copy">
      {children}
    </div>
    <Reveal type="image" className="skills-capability__stage">
      {stage}
    </Reveal>
  </RevealGroup>
)

const Skills = () => {
  const [active, setActive] = useState<string>(BUILD_SECTIONS[0].id)

  useEffect(() => {
    const nodes = BUILD_SECTIONS.map((section) =>
      document.getElementById(section.id)
    ).filter((node): node is HTMLElement => Boolean(node))

    if (!nodes.length) {
      return
    }

    const update = () => {
      const skills = document.getElementById("skills")

      if (skills && skills.getBoundingClientRect().top >= -24) {
        setActive(BUILD_SECTIONS[0].id)
        return
      }

      const marker = window.innerHeight * 0.34
      let current = nodes[0].id

      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= marker) {
          current = node.id
        }
      }

      setActive(current)
    }

    let frame = 0
    const schedule = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()

    const observer = new IntersectionObserver(schedule, {
      root: null,
      rootMargin: "-22% 0px -52% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1]
    })

    nodes.forEach((node) => observer.observe(node))
    window.addEventListener("resize", schedule)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", schedule)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  const goToBlock = (id: string) => {
    const node = document.getElementById(id)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start"
    })
    if (node) {
      node.classList.remove("is-targeted")
      void node.offsetWidth
      node.classList.add("is-targeted")
    }
    setActive(id)
  }

  return (
    <section
      id="skills"
      data-section-path="/skills"
      aria-label="What I Do"
      tabIndex={-1}
    >
      <Container className="skills-page">
        <WorkspaceHeader
          index={WORKSPACE.skills.index}
          path={WORKSPACE.skills.path}
          title={WORKSPACE.skills.title}
        />
        <div className="skills-terminal">
          <nav className="skills-rail" aria-label="On this page">
            {BUILD_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  active === section.id
                    ? "skills-rail__item is-active"
                    : "skills-rail__item"
                }
                onClick={() => goToBlock(section.id)}
                aria-current={active === section.id ? "true" : undefined}
              >
                <span className="skills-rail__index">{section.index}</span>
                <span className="skills-rail__label">{section.label}</span>
              </button>
            ))}
          </nav>

          <Reveal type="nav" mode="auto" className="skills-stackbar">
            <TechStackBar />
          </Reveal>

          <Capability id="build-interfaces" stage={<ProductScene />}>
            <CopyBlock {...BUILD_INTERFACES} />
          </Capability>

          <Capability id="build-systems" stage={<ArchitectureScene />}>
            <CopyBlock {...BUILD_SYSTEMS} />
          </Capability>

          <Capability id="build-connected" stage={<ConnectedScene />}>
            <CopyBlock {...BUILD_CONNECTED} />
          </Capability>

          <Capability id="build-modernize" stage={<ModernizeScene />}>
            <CopyBlock
              index={BUILD_MODERNIZATION.index}
              title={BUILD_MODERNIZATION.title}
            />
          </Capability>

          <Capability id="build-approach" stage={<ApproachScene />}>
            <CopyBlock
              index={BUILD_APPROACH.index}
              title={BUILD_APPROACH.title}
            />
          </Capability>
        </div>
      </Container>
    </section>
  )
}

export default Skills
