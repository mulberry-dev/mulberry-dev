import { links } from "@/data/navegation"

export const SECTION_PATHS = links.map((link) => link.path)
export const SECTION_CHANGE_EVENT = "site:section-change"

export type SectionDirection = 1 | -1

type SlidePayload = {
  direction: SectionDirection
  frame: HTMLElement
  href: string
}

type ScrollAnchor = "start" | "end" | "history"

type GoToSectionOptions = {
  fromTop?: boolean
  force?: boolean
}

let viewEl: HTMLElement | null = null
let pushRoute: ((href: string) => void) | null = null
let pendingSlide: SlidePayload | null = null
let pendingAnchor: ScrollAnchor = "history"
let slideNav = false
let locked = false
let historyPop = false
let memoryLocked = false
const scrollMemory = new Map<string, number>()

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
  memoryLocked = false
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

export const rememberScroll = (path = window.location.pathname) => {
  if (memoryLocked) {
    return
  }

  const scroller = document.scrollingElement || document.documentElement
  scrollMemory.set(path, scroller.scrollTop)
}

export const lockScrollMemory = () => {
  memoryLocked = true
}

export const markHistoryPop = () => {
  historyPop = true
}

export const consumeHistoryPop = () => {
  const next = historyPop
  historyPop = false
  return next
}

const pinScroll = (top: number) => {
  const html = document.documentElement
  const scroller = document.scrollingElement || html
  const previousBehavior = html.style.scrollBehavior
  html.classList.add("is-pinning-scroll")
  html.style.scrollBehavior = "auto"
  scroller.scrollTop = Math.max(0, top)
  html.style.scrollBehavior = previousBehavior
  html.classList.remove("is-pinning-scroll")
}

export const settleSectionScroll = (direction: SectionDirection) => {
  const scroller = document.scrollingElement || document.documentElement

  if (direction < 0) {
    pinScroll(Math.max(0, scroller.scrollHeight - scroller.clientHeight))
    return
  }

  pinScroll(0)
}

export const restoreRememberedScroll = (path: string) => {
  pinScroll(scrollMemory.get(path) ?? 0)
}

export const applyIncomingScroll = (path: string) => {
  if (consumeHistoryPop()) {
    restoreRememberedScroll(path)
    return "history" as const
  }

  if (pendingAnchor === "end") {
    settleSectionScroll(-1)
    return "end" as const
  }

  settleSectionScroll(1)
  return "start" as const
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

const discardPendingSlide = () => {
  pendingSlide?.frame.remove()
  pendingSlide = null
  slideNav = false
  document.documentElement.classList.remove("is-section-sliding")
  delete document.documentElement.dataset.navDir
}

export const announceSection = (href: string) => {
  window.dispatchEvent(
    new CustomEvent(SECTION_CHANGE_EVENT, {
      detail: { path: href.split(/[?#]/)[0] }
    })
  )
}

export const goToSection = (
  href: string,
  direction: SectionDirection,
  mode: "slide" | "jump",
  options?: GoToSectionOptions
) => {
  if (!pushRoute || href === window.location.pathname) {
    return false
  }

  if (locked && !options?.force) {
    return false
  }

  if (options?.force) {
    discardPendingSlide()
    locked = false
    memoryLocked = false
  }

  rememberScroll()
  lockScrollMemory()
  locked = true
  const reduced = prefersReducedMotion()
  const shouldSlide = mode === "slide" && !reduced
  const frame = shouldSlide ? captureViewportFrame() : null
  const fromTop = Boolean(options?.fromTop)

  slideNav = Boolean(frame)
  pendingSlide = frame ? { direction, frame, href } : null
  pendingAnchor = fromTop || direction > 0 ? "start" : "end"

  if (frame) {
    document.body.appendChild(frame)
    document.documentElement.dataset.navDir = direction > 0 ? "down" : "up"
    document.documentElement.classList.add("is-section-sliding")
  }

  if (fromTop) {
    settleSectionScroll(1)
  }

  announceSection(href)
  pushRoute(href)
  return true
}
