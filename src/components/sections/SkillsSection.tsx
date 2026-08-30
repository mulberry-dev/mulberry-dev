"use client"

import ApproachScene from "@/components/build/ApproachScene"
import ArchitectureScene from "@/components/build/ArchitectureScene"
import { BuildSession } from "@/components/build/BuildChrome"
import ConnectedScene from "@/components/build/ConnectedScene"
import ModernizeScene from "@/components/build/ModernizeScene"
import ProductScene from "@/components/build/ProductScene"
import StackTerminal from "@/components/build/StackTerminal"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"
import {
  BUILD_APPROACH,
  BUILD_CONNECTED,
  BUILD_INTERFACES,
  BUILD_INTRO,
  BUILD_MODERNIZATION,
  BUILD_SECTIONS,
  BUILD_SYSTEMS
} from "@/data/whatIBuild"
import { useEffect, useState, type ReactNode } from "react"

const CopyBlock = ({
  index,
  title,
  kicker,
  copy = [],
  items,
  tech,
  stages
}: {
  index: string
  title: string
  kicker?: string
  copy?: readonly string[]
  items?: readonly { icon: SiteIconName; label: string }[]
  tech?: readonly string[]
  stages?: typeof BUILD_APPROACH.stages
}) => (
  <div className="skills-copy">
    <Reveal type="eyebrow">
      <h3 className="skills-copy__index">
        <span>{index}</span>
        <span> / {title}</span>
      </h3>
    </Reveal>
    {kicker ? (
      <Reveal type="text" as="p" className="skills-copy__kicker">
        {kicker}
      </Reveal>
    ) : null}
    {copy.length ? (
      <Reveal type="text" as="p" className="skills-copy__body">
        {copy.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </Reveal>
    ) : null}
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
    {tech ? (
      <Reveal type="text" as="p" className="skills-copy__tech">
        {tech.join(" · ")}
      </Reveal>
    ) : null}
    {stages ? (
      <ol className="skills-copy__stages">
        {stages.map((stage) => (
          <Reveal key={stage.title} as="li" type="chip">
            <span aria-hidden="true">
              <SiteIcon name={stage.icon} />
            </span>
            <span>
              <strong>{stage.title}</strong>
              {stage.text}
            </span>
          </Reveal>
        ))}
      </ol>
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
      aria-label="What I Build"
      tabIndex={-1}
    >
      <Container className="skills-page">
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

          <header className="skills-chrome">
            <BuildSession />
          </header>

          <RevealGroup className="skills-intro" mode="auto" stagger={70}>
            <div id="build-intro">
              <Reveal type="eyebrow">
                <BuildSession cursor />
              </Reveal>
              <Reveal type="heading" as="h2" className="skills-headline">
                {BUILD_INTRO.headline}
              </Reveal>
              <Reveal
                type="decorative"
                className="skills-intro__rule"
                aria-hidden="true"
              />
            </div>
          </RevealGroup>

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
              kicker={BUILD_MODERNIZATION.kicker}
              copy={BUILD_MODERNIZATION.copy}
            />
          </Capability>

          <Capability id="build-approach" stage={<ApproachScene />}>
            <CopyBlock
              index={BUILD_APPROACH.index}
              title={BUILD_APPROACH.title}
              stages={BUILD_APPROACH.stages}
            />
          </Capability>

          <footer className="skills-foot">
            <StackTerminal />
          </footer>
        </div>
      </Container>
    </section>
  )
}

export default Skills
