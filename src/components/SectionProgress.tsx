"use client"

import { navLabel } from "@/i18n"
import { useI18n } from "@/i18n/useI18n"
import { stripLocale } from "@/lib/locale"
import { markProgrammaticSectionScroll, SECTIONS } from "@/lib/sectionNav"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type CSSProperties } from "react"

const SERVICES_PATH = "/skills"
const PROCESS_PATH = "/process"
const DESKTOP_PROGRESS_QUERY = "(min-width: 1100px)"
const COLLAPSE_MS = 680

type SceneGroup = {
  scene: string
  item: string
}

const SCENE_GROUPS: Record<string, SceneGroup> = {
  [SERVICES_PATH]: { scene: ".proof-scene", item: ".proof-scene__frame" },
  [PROCESS_PATH]: { scene: ".process-scene", item: ".process-step" }
}

const readSceneIndex = (
  previous: number,
  count: number,
  sceneSelector: string,
  itemSelector: string
) => {
  if (count < 1) {
    return 0
  }

  const scene = document.querySelector<HTMLElement>(sceneSelector)

  if (!scene) {
    return Math.min(previous, count - 1)
  }

  if (scene.classList.contains("is-held")) {
    const value = Number(scene.dataset.sceneFrame)

    if (!Number.isInteger(value)) {
      return Math.min(previous, count - 1)
    }

    return Math.max(0, Math.min(count - 1, value))
  }

  const frames = scene.querySelectorAll<HTMLElement>(itemSelector)

  if (!frames.length) {
    return Math.min(previous, count - 1)
  }

  const marker = Math.min(window.innerHeight * 0.4, 260)
  const slack = 32
  let next = 0

  for (let index = 0; index < frames.length; index += 1) {
    if (frames[index].getBoundingClientRect().top <= marker) {
      next = index
    }
  }

  next = Math.max(0, Math.min(count - 1, next))

  if (next === previous) {
    return previous
  }

  if (next > previous) {
    const entered = marker - frames[next].getBoundingClientRect().top

    if (entered < slack) {
      return previous
    }
  } else if (frames[previous]) {
    const passed = frames[previous].getBoundingClientRect().top - marker

    if (passed < slack) {
      return previous
    }
  }

  return next
}

const scrollToSceneItem = (
  index: number,
  count: number,
  sceneSelector: string,
  itemSelector: string
) => {
  const scene = document.querySelector<HTMLElement>(sceneSelector)

  if (!scene || count < 1) {
    return
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth"
  markProgrammaticSectionScroll(reduced ? 240 : 1100)

  if (!scene.classList.contains("is-held")) {
    scene.querySelectorAll<HTMLElement>(itemSelector)[index]?.scrollIntoView({
      behavior,
      block: "center"
    })
    return
  }

  const rect = scene.getBoundingClientRect()
  const travel = Math.max(rect.height - window.innerHeight, 1)
  const docTop = window.scrollY + rect.top
  const next = (index + 0.5) / count
  const top = Math.max(0, Math.round(docTop + next * travel))
  const scroller = document.scrollingElement || document.documentElement

  scroller.scrollTo({ top, behavior })
}

const SectionProgress = () => {
  const pathname = usePathname()
  const { t, href } = useI18n()
  const current = stripLocale(pathname)
  const groups = {
    [SERVICES_PATH]: {
      label: t.skills.ariaLabel,
      items: t.skills.capabilities.map((item) => item.title)
    },
    [PROCESS_PATH]: {
      label: t.process.ariaLabel,
      items: t.process.steps.map((item) => item.title)
    }
  }
  const activePath =
    current in groups && groups[current as keyof typeof groups].items.length > 0
      ? current
      : ""
  const activeGroup = activePath ? groups[activePath as keyof typeof groups] : null
  const [shownPath, setShownPath] = useState(activePath)
  const [open, setOpen] = useState(Boolean(activePath))
  const [activeItem, setActiveItem] = useState(0)
  const openRef = useRef(open)
  const lockRef = useRef<number | null>(null)
  const lockTimer = useRef(0)
  const syncRef = useRef<() => void>(() => {})
  const countRef = useRef(activeGroup?.items.length ?? 0)
  const sceneRef = useRef<SceneGroup | null>(
    activePath ? SCENE_GROUPS[activePath] : null
  )

  openRef.current = open
  countRef.current = activeGroup?.items.length ?? 0
  sceneRef.current = activePath ? SCENE_GROUPS[activePath] : null

  if (activePath && shownPath !== activePath) {
    setShownPath(activePath)
  }

  useEffect(() => {
    if (activePath) {
      setShownPath(activePath)

      if (openRef.current) {
        return
      }

      let inner = 0
      const outer = window.requestAnimationFrame(() => {
        inner = window.requestAnimationFrame(() => setOpen(true))
      })

      return () => {
        window.cancelAnimationFrame(outer)
        window.cancelAnimationFrame(inner)
      }
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setOpen(false)

    if (reduced) {
      setShownPath("")
      return
    }

    const id = window.setTimeout(() => setShownPath(""), COLLAPSE_MS)
    return () => window.clearTimeout(id)
  }, [activePath])

  useEffect(() => {
    const target = sceneRef.current

    if (!activePath || !target) {
      return
    }

    const desktop = window.matchMedia(DESKTOP_PROGRESS_QUERY)
    let mode: "held" | "flat" | "none" = "none"
    let scene: HTMLElement | null = null
    let attrObserver: MutationObserver | null = null
    let frameObserver: IntersectionObserver | null = null
    let waitObserver: MutationObserver | null = null

    lockRef.current = null

    const apply = () => {
      if (lockRef.current !== null || !desktop.matches) {
        return
      }

      const currentScene = sceneRef.current

      if (!currentScene) {
        return
      }

      setActiveItem((previous) =>
        readSceneIndex(
          previous,
          countRef.current,
          currentScene.scene,
          currentScene.item
        )
      )
    }

    syncRef.current = apply

    const detachReaders = () => {
      attrObserver?.disconnect()
      attrObserver = null
      frameObserver?.disconnect()
      frameObserver = null
    }

    const attach = () => {
      const next = document.querySelector<HTMLElement>(target.scene)
      const nextMode: "held" | "flat" | "none" =
        !next || !desktop.matches
          ? "none"
          : next.classList.contains("is-held")
            ? "held"
            : "flat"

      if (next === scene && nextMode === mode) {
        apply()
        return
      }

      detachReaders()
      scene = next
      mode = nextMode

      if (!scene || mode === "none") {
        return
      }

      attrObserver = new MutationObserver(() => {
        const heldNow = scene?.classList.contains("is-held") ?? false
        const drifted =
          (heldNow && mode !== "held") || (!heldNow && mode !== "flat")

        if (drifted) {
          attach()
          return
        }

        apply()
      })
      attrObserver.observe(scene, {
        attributes: true,
        attributeFilter: ["class", "data-scene-frame"]
      })

      if (mode === "flat") {
        frameObserver = new IntersectionObserver(apply, {
          root: null,
          rootMargin: "-32% 0px -48% 0px",
          threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
        })
        scene.querySelectorAll(target.item).forEach((node) => {
          frameObserver?.observe(node)
        })
      }

      apply()
    }

    const root = document.querySelector(".site-experience") ?? document.body
    waitObserver = new MutationObserver(() => {
      const next = document.querySelector(target.scene)

      if (next !== scene) {
        attach()
      }
    })
    waitObserver.observe(root, { childList: true, subtree: true })

    const onMedia = () => attach()
    const onResize = () => apply()
    const onIntent = () => {
      if (lockRef.current === null) {
        return
      }

      lockRef.current = null
      window.clearTimeout(lockTimer.current)
      apply()
    }

    attach()
    desktop.addEventListener("change", onMedia)
    window.addEventListener("resize", onResize)
    window.addEventListener("wheel", onIntent, { passive: true })
    window.addEventListener("touchmove", onIntent, { passive: true })

    return () => {
      detachReaders()
      waitObserver?.disconnect()
      desktop.removeEventListener("change", onMedia)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("wheel", onIntent)
      window.removeEventListener("touchmove", onIntent)
      window.clearTimeout(lockTimer.current)
      syncRef.current = () => {}
    }
  }, [activePath])

  const goToItem = (index: number) => {
    const target = sceneRef.current
    const count = countRef.current

    if (!target || count < 1) {
      return
    }

    const next = Math.max(0, Math.min(count - 1, index))
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    lockRef.current = next
    setActiveItem(next)
    scrollToSceneItem(next, count, target.scene, target.item)
    window.clearTimeout(lockTimer.current)
    lockTimer.current = window.setTimeout(() => {
      lockRef.current = null
      syncRef.current()
    }, reduced ? 80 : 1100)
  }

  const shownGroup = shownPath ? groups[shownPath as keyof typeof groups] : null

  return (
    <nav className="section-progress" aria-label={t.nav.onThisPage}>
      {SECTIONS.map((section) => {
        const active = current === section.path

        if (section.path === shownPath && shownGroup) {
          const clusterClass = [
            "section-progress__cluster",
            open ? "is-open" : "",
            activePath === shownPath ? "is-current" : ""
          ]
            .filter(Boolean)
            .join(" ")

          return (
            <div
              key={section.path}
              className={clusterClass}
              role="group"
              aria-label={shownGroup.label}
              aria-hidden={open ? undefined : true}
            >
              {shownGroup.items.map((title, index) => {
                const currentItem = index === activeItem
                const indexLabel = String(index + 1).padStart(2, "0")

                return (
                  <button
                    key={`${title}-${index}`}
                    type="button"
                    className={
                      currentItem
                        ? "section-progress__service is-active"
                        : "section-progress__service"
                    }
                    style={
                      {
                        "--i": index,
                        "--n": shownGroup.items.length
                      } as CSSProperties
                    }
                    aria-label={title}
                    aria-current={open && currentItem ? "true" : undefined}
                    tabIndex={open ? 0 : -1}
                    onClick={() => goToItem(index)}
                  >
                    <span className="section-progress__index" aria-hidden="true">
                      {indexLabel}
                    </span>
                    <span className="section-progress__tip" aria-hidden="true">
                      <span>{indexLabel}</span>
                      {title}
                    </span>
                  </button>
                )
              })}
            </div>
          )
        }

        return (
          <Link
            key={section.path}
            href={href(section.path)}
            scroll={false}
            className={
              active
                ? "section-progress__link is-active"
                : "section-progress__link"
            }
            aria-label={navLabel(t, section.path)}
            aria-current={active ? "true" : undefined}
          />
        )
      })}
    </nav>
  )
}

export default SectionProgress
