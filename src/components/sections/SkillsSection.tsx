"use client"

import "@/styles/scss/sections/skills.scss"
import LazyOnView from "@/components/LazyOnView"
import TypeCopy from "@/components/terminal/TypeCopy"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import ScrollScene from "@/components/ui/ScrollScene"
import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"
import dynamic from "next/dynamic"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import {
  BUILD_CONNECTED,
  BUILD_INTERFACES,
  BUILD_MODERNIZATION,
  BUILD_SECTIONS,
  BUILD_SYSTEMS,
  type BuildAccent
} from "@/data/whatIBuild"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"

const PROOF_ICONS: SiteIconName[] = ["app", "globe", "rocket", "connect", "layers"]

const SceneFallback = () => (
  <div className="skills-scene-fallback" aria-hidden="true" />
)

const TITLE_MAX = 88
const TITLE_MIN = 16

const ProofTitle = ({ text }: { text: string }) => {
  const ref = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const fit = () => {
      const available = node.clientWidth

      if (available < 8) {
        return
      }

      node.style.whiteSpace = "nowrap"
      node.style.textWrap = "nowrap"

      const fits = (size: number) => {
        node.style.fontSize = `${size}px`
        return node.scrollWidth <= node.clientWidth + 1
      }

      if (fits(TITLE_MAX)) {
        return
      }

      let low = TITLE_MIN
      let high = TITLE_MAX
      let best = TITLE_MIN

      while (low <= high) {
        const mid = (low + high) >> 1

        if (fits(mid)) {
          best = mid
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      node.style.fontSize = `${best}px`

      if (node.scrollWidth > node.clientWidth + 1) {
        node.style.whiteSpace = "normal"
        node.style.textWrap = "wrap"
      }
    }

    fit()

    const parent = node.parentElement
    const observer = new ResizeObserver(fit)
    if (parent) {
      observer.observe(parent)
    }

    return () => observer.disconnect()
  }, [text])

  return (
    <h3 ref={ref} className="proof-scene__value gradient-text">
      {text}
    </h3>
  )
}

const ProductScene = dynamic(() => import("@/components/build/ProductScene"), {
  loading: SceneFallback
})
const ArchitectureScene = dynamic(
  () => import("@/components/build/ArchitectureScene"),
  { loading: SceneFallback }
)
const ConnectedScene = dynamic(
  () => import("@/components/build/ConnectedScene"),
  { loading: SceneFallback }
)
const ModernizeScene = dynamic(
  () => import("@/components/build/ModernizeScene"),
  { loading: SceneFallback }
)
const StackTerminal = dynamic(() => import("@/components/build/StackTerminal"), {
  loading: SceneFallback
})

const CopyBlock = ({
  index,
  title,
  kicker,
  copy = [],
  items,
  tech
}: {
  index: string
  title: string
  kicker?: string
  copy?: readonly string[]
  items?: readonly { icon: SiteIconName; label: string }[]
  tech?: readonly string[]
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
        <TypeCopy text={kicker} />
      </Reveal>
    ) : null}
    {copy.length ? (
      <Reveal type="text" as="p" className="skills-copy__body">
        {copy.map((line, index) => (
          <TypeCopy key={index} text={line} block />
        ))}
      </Reveal>
    ) : null}
    {items ? (
      <ul className="skills-copy__items">
        {items.map((item) => (
          <Reveal key={item.icon} as="li" type="chip">
            <span aria-hidden="true">
              <SiteIcon name={item.icon} />
            </span>
            <TypeCopy text={item.label} />
          </Reveal>
        ))}
      </ul>
    ) : null}
    {tech ? (
      <Reveal type="text" as="p" className="skills-copy__tech">
        {tech.join(" · ")}
      </Reveal>
    ) : null}
  </div>
)

const Capability = ({
  id,
  children,
  stage,
  accent
}: {
  id: string
  children: ReactNode
  stage: ReactNode
  accent?: BuildAccent
}) => (
  <RevealGroup
    className={
      accent ? `skills-capability skills-capability--${accent}` : "skills-capability"
    }
    mode="scroll"
    stagger={56}
  >
    <div id={id} className="skills-capability__copy">
      {children}
    </div>
    <Reveal type="image" className="skills-capability__stage">
      {stage}
    </Reveal>
  </RevealGroup>
)

const Skills = () => {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(BUILD_SECTIONS[0].id)
  const railLabels = [
    t.skills.rail.intro,
    t.skills.rail.frontend,
    t.skills.rail.backend,
    t.skills.rail.connected,
    t.skills.rail.modernize
  ]

  useEffect(() => {
    if (!open) {
      return
    }

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
  }, [open])

  useEffect(() => {
    const id = window.location.hash.replace("#", "")

    if (
      id &&
      BUILD_SECTIONS.some((section) => section.id === id && section.id !== "build-intro")
    ) {
      setOpen(true)
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
      aria-label={t.skills.ariaLabel}
      tabIndex={-1}
    >
      <Container className="skills-page">
        <WorkspaceHeader
          index={WORKSPACE.skills.index}
          path={WORKSPACE.skills.path}
          title={t.workspace.skills}
        />
        <div className="skills-terminal">
          <RevealGroup className="skills-intro" mode="auto" stagger={70}>
            <div id="build-intro">
              <Reveal type="heading" as="h3" className="skills-headline">
                <TypeCopy text={t.skills.headline} />
              </Reveal>
              <Reveal
                type="decorative"
                className="skills-intro__rule"
                aria-hidden="true"
              />
            </div>
          </RevealGroup>

          <ScrollScene
            frames={t.skills.capabilities.length}
            holdFrom={0}
            className="proof-scene"
          >
            {(activeFrame, _progress, held) => (
              <div className="proof-scene__panel">
                <div className="proof-scene__stage">
                  <svg className="proof-scene__defs" aria-hidden="true" focusable="false">
                    <defs>
                      <linearGradient
                        id="proof-icon-gradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="0"
                        x2="24"
                        y2="24"
                      >
                        <stop offset="0%" stopColor="var(--brand-cyan)" />
                        <stop offset="52%" stopColor="var(--brand-blue)" />
                        <stop offset="100%" stopColor="var(--brand-purple)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {t.skills.capabilities.map((item, index) => (
                    <div
                      key={item.title}
                      className={
                        !held || index === activeFrame
                          ? "proof-scene__frame is-on"
                          : "proof-scene__frame"
                      }
                      aria-hidden={held && index !== activeFrame ? true : undefined}
                    >
                      <ProofTitle text={item.title} />
                      <span className="proof-scene__icon" aria-hidden="true">
                        <SiteIcon name={PROOF_ICONS[index] ?? "puzzle"} />
                      </span>
                      <p className="proof-scene__label">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollScene>

          <div className={["skills-more", open ? "is-open" : ""].filter(Boolean).join(" ")}>
            <button
              type="button"
              id="skills-more-toggle"
              className="skills-more__toggle"
              aria-expanded={open}
              aria-controls="skills-more-panel"
              onClick={() => setOpen((current) => !current)}
            >
              <span className="skills-more__caret" aria-hidden="true" />
              {open ? t.skills.viewLess : t.skills.viewMore}
            </button>
            <section
              className="skills-more__panel"
              id="skills-more-panel"
              aria-labelledby="skills-more-toggle"
              aria-hidden={!open}
              inert={!open || undefined}
            >
              <div className="skills-more__clip">
                <div className="skills-more__body">
            <nav className="skills-rail" aria-label={t.nav.onThisPage}>
              {BUILD_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={[
                    "skills-rail__item",
                    "accent" in section ? `skills-rail__item--${section.accent}` : "",
                    active === section.id ? "is-active" : ""
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => goToBlock(section.id)}
                  aria-current={active === section.id ? "true" : undefined}
                >
                  <span className="skills-rail__index">{section.index}</span>
                  <span className="skills-rail__label">
                    <TypeCopy
                      text={railLabels[BUILD_SECTIONS.indexOf(section)] ?? section.label}
                      caret={false}
                    />
                  </span>
                </button>
              ))}
            </nav>

            <div className="skills-capability-board">
            <Capability
              id="build-interfaces"
              accent={BUILD_INTERFACES.accent}
              stage={
                <LazyOnView minHeight="18.25rem">
                  <ProductScene />
                </LazyOnView>
              }
            >
              <CopyBlock
                index={BUILD_INTERFACES.index}
                title={BUILD_INTERFACES.title}
                kicker={t.skills.interfaces.kicker}
                items={BUILD_INTERFACES.items.map((item, index) => ({
                  ...item,
                  label: t.skills.interfaces.items[index] ?? item.label
                }))}
                tech={BUILD_INTERFACES.tech}
              />
            </Capability>

            <Capability
              id="build-systems"
              accent={BUILD_SYSTEMS.accent}
              stage={
                <LazyOnView minHeight="18.25rem">
                  <ArchitectureScene />
                </LazyOnView>
              }
            >
              <CopyBlock
                index={BUILD_SYSTEMS.index}
                title={BUILD_SYSTEMS.title}
                kicker={t.skills.systems.kicker}
                items={BUILD_SYSTEMS.items.map((item, index) => ({
                  ...item,
                  label: t.skills.systems.items[index] ?? item.label
                }))}
                tech={BUILD_SYSTEMS.tech}
              />
            </Capability>

            <Capability
              id="build-connected"
              accent={BUILD_CONNECTED.accent}
              stage={
                <LazyOnView minHeight="18.25rem">
                  <ConnectedScene />
                </LazyOnView>
              }
            >
              <CopyBlock
                index={BUILD_CONNECTED.index}
                title={BUILD_CONNECTED.title}
                kicker={t.skills.connected.kicker}
                items={BUILD_CONNECTED.items.map((item, index) => ({
                  ...item,
                  label: t.skills.connected.items[index] ?? item.label
                }))}
              />
            </Capability>

            <Capability
              id="build-modernize"
              accent={BUILD_MODERNIZATION.accent}
              stage={
                <LazyOnView minHeight="18.25rem">
                  <ModernizeScene />
                </LazyOnView>
              }
            >
              <CopyBlock
                index={BUILD_MODERNIZATION.index}
                title={BUILD_MODERNIZATION.title}
                kicker={t.skills.modernization.kicker}
                copy={t.skills.modernization.copy}
              />
            </Capability>
          </div>

          <footer className="skills-foot">
            <p className="skills-foot__evidence">
              <TypeCopy text={t.skills.stackEvidence} />
            </p>
            <LazyOnView minHeight="12rem">
              <StackTerminal />
            </LazyOnView>
          </footer>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Skills
