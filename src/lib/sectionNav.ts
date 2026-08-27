import { links } from "@/data/navegation"
import { SITE_NAME } from "@/data/site"

export const SECTION_PATHS = links.map((link) => link.path)
export const SECTION_CHANGE_EVENT = "site:section-change"

export type SiteSection = {
  path: string
  name: string
  id: string
}

export const SECTIONS: SiteSection[] = links.map((link) => ({
  path: link.path,
  name: link.name,
  id: link.path === "/" ? "index" : link.path.replace(/^\//, "")
}))

export const isSectionPath = (pathname: string) =>
  SECTION_PATHS.includes(pathname)

export const getSectionIndex = (pathname: string) =>
  SECTION_PATHS.indexOf(pathname)

export const getSectionByPath = (pathname: string) =>
  SECTIONS.find((section) => section.path === pathname) ?? null

export const sectionDocumentTitle = (pathname: string) => {
  const section = getSectionByPath(pathname)

  if (!section || section.path === "/") {
    return `${SITE_NAME} | Web Programmer`
  }

  return `${section.name} | ${SITE_NAME}`
}

export const applySectionTitle = (pathname: string) => {
  document.title = sectionDocumentTitle(pathname)
}

export const announceSection = (href: string) => {
  window.dispatchEvent(
    new CustomEvent(SECTION_CHANGE_EVENT, {
      detail: { path: href.split(/[?#]/)[0] }
    })
  )
}

let programmaticUntil = 0

export const isProgrammaticSectionScroll = () =>
  performance.now() < programmaticUntil

export const markProgrammaticSectionScroll = (ms = 900) => {
  programmaticUntil = Math.max(programmaticUntil, performance.now() + ms)
}

const pinInstantScroll = (run: () => void) => {
  const html = document.documentElement
  const previous = html.style.scrollBehavior
  html.classList.add("is-pinning-scroll")
  html.style.scrollBehavior = "auto"
  run()
  html.style.scrollBehavior = previous
  html.classList.remove("is-pinning-scroll")
}

export const scrollToSection = (
  pathname: string,
  behavior: ScrollBehavior = "smooth"
) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const nextBehavior: ScrollBehavior = reduced ? "auto" : behavior
  markProgrammaticSectionScroll(nextBehavior === "smooth" ? 1100 : 160)

  const run = () => {
    if (pathname === "/") {
      const scroller = document.scrollingElement || document.documentElement
      scroller.scrollTo({ top: 0, behavior: nextBehavior })
      return
    }

    const section = getSectionByPath(pathname)
    const node = section ? document.getElementById(section.id) : null
    node?.scrollIntoView({ behavior: nextBehavior, block: "start" })
  }

  if (nextBehavior === "auto") {
    pinInstantScroll(run)
    return
  }

  run()
}

export const readActiveSectionPath = () => {
  const line = Math.min(window.innerHeight * 0.3, 200)
  let current = SECTIONS[0]?.path ?? "/"

  for (const section of SECTIONS) {
    const node = document.getElementById(section.id)

    if (!node) {
      continue
    }

    if (node.getBoundingClientRect().top <= line) {
      current = section.path
    }
  }

  const scroller = document.scrollingElement || document.documentElement
  const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight)

  if (max > 0 && scroller.scrollTop >= max - 4) {
    return SECTIONS[SECTIONS.length - 1]?.path ?? current
  }

  return current
}
