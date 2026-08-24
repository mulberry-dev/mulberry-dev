import { links } from "@/data/navegation"

export const SECTION_PATHS = links.map((link) => link.path)

export type SectionDirection = 1 | -1

type SlidePayload = {
  direction: SectionDirection
  frame: HTMLElement
  href: string
}

type ScrollAnchor = "start" | "end" | "history"

let viewEl: HTMLElement | null = null
let pushRoute: ((href: string) => void) | null = null
let pendingSlide: SlidePayload | null = null
let pendingAnchor: ScrollAnchor = "history"
let slideNav = false
let locked = false

export const isSectionPath = (pathname: string) =>
  SECTION_PATHS.includes(pathname)

export const getSectionIndex = (pathname: string) =>
  SECTION_PATHS.indexOf(pathname)

export const getNeighborPath = (pathname: string, direction: SectionDirection) => {
  const index = getSectionIndex(pathname)

  if (index < 0) {
    return null
  }

  return SECTION_PATHS[index + direction] ?? null
}

export const registerSectionView = (element: HTMLElement | null) => {
  viewEl = element
}

export const registerSectionPush = (push: (href: string) => void) => {
  pushRoute = push
}

export const isSectionNavLocked = () => locked

export const setSectionNavLocked = (value: boolean) => {
  locked = value
}

export const wasSlideNavigation = () => slideNav

export const clearSlideNavigation = () => {
  slideNav = false
  pendingAnchor = "history"
  document.documentElement.classList.remove("is-section-sliding")
  delete document.documentElement.dataset.navDir
}

export const peekScrollAnchor = () => pendingAnchor

export const peekPendingSlide = () => pendingSlide

export const consumePendingSlide = () => {
  const next = pendingSlide
  pendingSlide = null
  return next
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const captureViewportFrame = () => {
  if (!viewEl) {
    return null
  }

  const rect = viewEl.getBoundingClientRect()
  const frame = document.createElement("div")
  frame.className = "page-transition-ghost"
  frame.setAttribute("aria-hidden", "true")

  const clone = viewEl.cloneNode(true) as HTMLElement
  clone.classList.remove("is-covered", "is-sliding")
  clone.style.position = "absolute"
  clone.style.top = `${rect.top}px`
  clone.style.left = `${rect.left}px`
  clone.style.width = `${rect.width}px`
  clone.style.margin = "0"
  clone.style.transform = "none"
  clone.style.opacity = "1"
  clone.style.pointerEvents = "none"

  frame.appendChild(clone)
  return frame
}

export const settleSectionScroll = (direction: SectionDirection) => {
  const html = document.documentElement
  const scroller = document.scrollingElement || html
  const previousBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = "auto"

  if (direction < 0) {
    scroller.scrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
  } else {
    scroller.scrollTop = 0
  }

  html.style.scrollBehavior = previousBehavior
}

export const goToSection = (
  href: string,
  direction: SectionDirection,
  mode: "slide" | "jump"
) => {
  if (locked || !pushRoute || href === window.location.pathname) {
    return false
  }

  locked = true
  const reduced = prefersReducedMotion()
  const shouldSlide = mode === "slide" && !reduced
  const frame = shouldSlide ? captureViewportFrame() : null

  slideNav = Boolean(frame)
  pendingSlide = frame ? { direction, frame, href } : null
  pendingAnchor = direction < 0 ? "end" : "start"

  if (frame) {
    document.body.appendChild(frame)
    document.documentElement.dataset.navDir = direction > 0 ? "down" : "up"
    document.documentElement.classList.add("is-section-sliding")
  }

  pushRoute(href)
  return true
}
