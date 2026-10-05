"use client"

import "@/styles/scss/sections/skills.scss"
import LazyOnView from "@/components/LazyOnView"
import TypeCopy from "@/components/terminal/TypeCopy"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import ScrollScene, { sceneViewport } from "@/components/ui/ScrollScene"
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
import { markProgrammaticSectionScroll } from "@/lib/sectionNav"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"

const PROOF_ICONS: SiteIconName[] = ["app", "globe", "rocket", "connect", "layers"]
// Landscape phones are too short to pin the scene without clipping it.
const HOLD_QUERY = "(min-width: 1024px), (min-height: 500px)"

const SceneFallback = () => (
  <div className="skills-scene-fallback" aria-hidden="true" />
)

const TITLE_MAX = 88
const TITLE_MIN = 16
const LABEL_MAX = 24
const LABEL_MIN = 14

const useFitLine = <T extends HTMLElement>(text: string, max: number, min: number) => {
  const ref = useRef<T>(null)
  const fittedWidth = useRef(0)

  useLayoutEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const fit = (force = false) => {
      const frame = node.parentElement

      if (!frame || frame.clientWidth < 8) {
        return
      }

      const available = frame.clientWidth

      if (!force && Math.abs(available - fittedWidth.current) < 2) {
        return
      }

      fittedWidth.current = available
      node.style.whiteSpace = "nowrap"
      node.style.textWrap = "nowrap"
      node.style.width = "max-content"
      node.style.fontSize = `${max}px`

      const textWidth = node.scrollWidth
      let size = max

      if (textWidth > available) {
        size = Math.max(min, Math.floor((max * available) / textWidth))
      }

      node.style.fontSize = `${size}px`

      while (size > min && node.scrollWidth > available) {
        size -= 1
        node.style.fontSize = `${size}px`
      }

      node.style.width = "100%"

      if (size <= min && node.scrollWidth > node.clientWidth + 1) {
        node.style.whiteSpace = "normal"
        node.style.textWrap = "wrap"
      }
    }

    let alive = true
    const refit = () => {
      if (alive) {
        fit()
      }
    }

    fittedWidth.current = 0
    fit(true)

    const parent = node.parentElement
    const observer = new ResizeObserver(refit)
    if (parent) {
      observer.observe(parent)
    }

    document.fonts?.ready.then(refit)

    return () => {
      alive = false
      observer.disconnect()
    }
  }, [text, max, min])

  return ref
}

const ProofTitle = ({ text }: { text: string }) => {
  const ref = useFitLine<HTMLParagraphElement>(text, TITLE_MAX, TITLE_MIN)

  return (
    <p ref={ref} className="proof-scene__value gradient-text">
      {text}
    </p>
  )
}

const ProofLabel = ({ text }: { text: string }) => {
  const ref = useFitLine<HTMLParagraphElement>(text, LABEL_MAX, LABEL_MIN)

  return (
    <p ref={ref} className="proof-scene__label">
      {text}
    </p>
  )
}

const padIndex = (value: number) => String(value).padStart(2, "0")

const useProofReveal = (count: number) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [seen, setSeen] = useState<boolean[]>(() => Array(count).fill(false))

  useEffect(() => {
    const stage = stageRef.current

    if (!stage) {
      return
    }

    let visible = false
    // Hysteresis keeps the held frame from flickering at the viewport edge.
    const stageObserver = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.isIntersecting ? entry.intersectionRatio : 0
        const next = visible ? ratio > 0.12 : ratio >= 0.32

        if (next !== visible) {
          visible = next
          setInView(next)
        }
      },
      { threshold: [0, 0.12, 0.32, 0.6, 1] }
    )
    stageObserver.observe(stage)

    const frames = Array.from(
      stage.querySelectorAll<HTMLElement>(".proof-scene__frame")
    )
    const frameObserver = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => frames.indexOf(entry.target as HTMLElement))
          .filter((index) => index >= 0)

        if (!hits.length) {
          return
        }

        hits.forEach((index) => frameObserver.unobserve(frames[index]))
        setSeen((previous) => {
          if (hits.every((index) => previous[index])) {
            return previous
          }

          const next = [...previous]
          hits.forEach((index) => {
            next[index] = true
          })
          return next
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 }
    )
    frames.forEach((node) => frameObserver.observe(node))

    return () => {
      stageObserver.disconnect()
      frameObserver.disconnect()
    }
  }, [count])

  return { stageRef, inView, seen }
}

const scrollToProofFrame = (index: number, count: number, held: boolean) => {
  const scene = document.querySelector<HTMLElement>(".proof-scene")

  if (!scene || count < 1) {
    return
  }

  const next = Math.max(0, Math.min(count - 1, index))
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth"
  markProgrammaticSectionScroll(reduced ? 240 : 1100)

  if (!held) {
    const target = scene.querySelectorAll<HTMLElement>(".proof-scene__frame")[next]

    if (!target) {
      return
    }

    const top =
      window.scrollY +
      target.getBoundingClientRect().top -
      Math.round(window.innerHeight * 0.22)
    const scroller = document.scrollingElement || document.documentElement
    scroller.scrollTo({ top: Math.max(0, top), behavior })
    return
  }

  const rect = scene.getBoundingClientRect()
  const travel = Math.max(rect.height - sceneViewport(scene), 1)
  const docTop = window.scrollY + rect.top
  const top = Math.max(0, Math.round(docTop + ((next + 0.5) / count) * travel))
  const scroller = document.scrollingElement || document.documentElement
  scroller.scrollTo({ top, behavior })
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
        {copy.map((line, lineIndex) => (
          <TypeCopy key={lineIndex} text={line} block />
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

const ProofPager = ({
  items,
  active,
  held,
  label,
  onSelect
}: {
  items: readonly { title: string }[]
  active: number
  held: boolean
  label: string
  onSelect: (index: number) => void
}) => {
  const current = items[active] ?? items[0]

  return (
    <div className="proof-scene__pager">
      <p className="proof-scene__pager-status" aria-live="polite">
        <span className="proof-scene__pager-count">
          <span className="proof-scene__pager-index">{padIndex(active + 1)}</span>
          {" / "}
          {padIndex(items.length)}
        </span>
        <span key={active} className="proof-scene__pager-current">
          {current?.title}
        </span>
      </p>
      <nav className="proof-scene__pager-nav" aria-label={label}>
        {items.map((item, index) => {
          const on = index === active
          const state = on ? " is-active" : index < active ? " is-done" : ""

          return (
            <button
              key={index}
              type="button"
              className={`proof-scene__pager-dot${state}`}
              aria-label={item.title}
              aria-current={on ? "true" : undefined}
              onClick={() => {
                onSelect(index)
                scrollToProofFrame(index, items.length, held)
              }}
            />
          )
        })}
      </nav>
    </div>
  )
}

const Skills = () => {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(BUILD_SECTIONS[0].id)
  const [flatActive, setFlatActive] = useState(0)
  const [armed, setArmed] = useState(false)
  const { stageRef, inView, seen } = useProofReveal(t.skills.capabilities.length)
  const railLabels = [
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
    setArmed(true)
  }, [])

  useEffect(() => {
    const id = window.location.hash.replace("#", "")

    if (id && BUILD_SECTIONS.some((section) => section.id === id)) {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    let scene: HTMLElement | null = null
    let frameObserver: IntersectionObserver | null = null
    let attrObserver: MutationObserver | null = null
    let waitObserver: MutationObserver | null = null
    let frame = 0

    const clearFrameObserver = () => {
      frameObserver?.disconnect()
      frameObserver = null
    }

    const readFlatIndex = () => {
      if (!scene || scene.classList.contains("is-held")) {
        return
      }

      const frames = scene.querySelectorAll<HTMLElement>(".proof-scene__frame")

      if (!frames.length) {
        return
      }

      const marker = Math.min(window.innerHeight * 0.4, 260)
      let next = 0

      for (let index = 0; index < frames.length; index += 1) {
        if (frames[index].getBoundingClientRect().top <= marker) {
          next = index
        }
      }

      setFlatActive((previous) => (previous === next ? previous : next))
    }

    const schedule = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        readFlatIndex()
      })
    }

    const watchFlat = () => {
      clearFrameObserver()

      if (!scene || scene.classList.contains("is-held")) {
        return
      }

      const frames = scene.querySelectorAll<HTMLElement>(".proof-scene__frame")

      if (!frames.length) {
        return
      }

      frameObserver = new IntersectionObserver(schedule, {
        root: null,
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      })
      frames.forEach((node) => frameObserver?.observe(node))
      readFlatIndex()
    }

    const attach = () => {
      const next = document.querySelector<HTMLElement>(".proof-scene")

      if (!next) {
        return
      }

      if (next !== scene) {
        attrObserver?.disconnect()
        scene = next
        attrObserver = new MutationObserver(() => {
          watchFlat()
          schedule()
        })
        attrObserver.observe(scene, {
          attributes: true,
          attributeFilter: ["class"]
        })
      }

      watchFlat()
    }

    attach()
    const root = document.querySelector(".site-experience") ?? document.body
    waitObserver = new MutationObserver(attach)
    waitObserver.observe(root, { childList: true, subtree: true })
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      clearFrameObserver()
      attrObserver?.disconnect()
      waitObserver?.disconnect()
      window.removeEventListener("scroll", schedule)
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
              <Reveal type="heading" as="h2" className="skills-headline">
                <TypeCopy text={t.skills.headline} block />
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
            holdQuery={HOLD_QUERY}
            className={armed ? "proof-scene is-armed" : "proof-scene"}
          >
            {(activeFrame, _progress, held) => {
              const pagerActive = held ? activeFrame : flatActive

              return (
                <div className="proof-scene__panel">
                  <div ref={stageRef} className="proof-scene__stage">
                    <svg
                      className="proof-scene__defs"
                      aria-hidden="true"
                      focusable="false"
                    >
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
                    {t.skills.capabilities.map((item, index) => {
                      const current = index === activeFrame
                      const on = held ? current && inView : (seen[index] ?? true)

                      return (
                        <div
                          key={index}
                          className={on ? "proof-scene__frame is-on" : "proof-scene__frame"}
                          aria-hidden={held && !current ? true : undefined}
                        >
                          <span className="proof-scene__step" aria-hidden="true">
                            {padIndex(index + 1)}
                          </span>
                          <ProofTitle text={item.title} />
                          <span className="proof-scene__icon" aria-hidden="true">
                            <SiteIcon name={PROOF_ICONS[index] ?? "puzzle"} />
                          </span>
                          <ProofLabel text={item.text} />
                        </div>
                      )
                    })}
                  </div>
                  <ProofPager
                    items={t.skills.capabilities}
                    active={pagerActive}
                    held={held}
                    label={t.skills.proofProgress}
                    onSelect={setFlatActive}
                  />
                </div>
              )
            }}
          </ScrollScene>

          <div className={["skills-more", open ? "is-open" : ""].filter(Boolean).join(" ")}>
            <p className="skills-more__lead">
              <TypeCopy text={t.skills.deliveryLead} />
            </p>
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
                    {BUILD_SECTIONS.map((section, sectionIndex) => (
                      <button
                        key={section.id}
                        type="button"
                        className={[
                          "skills-rail__item",
                          "accent" in section
                            ? `skills-rail__item--${section.accent}`
                            : "",
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
                            text={railLabels[sectionIndex] ?? section.label}
                            caret={false}
                          />
                        </span>
                      </button>
                    ))}
                  </nav>

                  <nav className="skills-jump" aria-label={t.nav.onThisPage}>
                    {BUILD_SECTIONS.map((section, sectionIndex) => (
                      <button
                        key={`jump-${section.id}`}
                        type="button"
                        className={[
                          "skills-jump__item",
                          "accent" in section
                            ? `skills-jump__item--${section.accent}`
                            : "",
                          active === section.id ? "is-active" : ""
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => goToBlock(section.id)}
                        aria-current={active === section.id ? "true" : undefined}
                      >
                        <span aria-hidden="true">{section.index}</span>
                        {railLabels[sectionIndex] ?? section.label}
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
