"use client"

import {
  SECTION_PATHS,
  getNeighborPath,
  getSectionIndex,
  goToSection,
  isSectionNavLocked,
  isSectionPath,
  registerSectionPush
} from "@/lib/sectionNav"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const EDGE_PX = 2
const INTENT_PX = 88
const WHEEL_IDLE_MS = 96
const TOUCH_INTENT_PX = 72
const KEY_REPEAT_GUARD_MS = 520

const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const tag = target.tagName
  return (
    target.isContentEditable ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  )
}

const hasInnerScrollRoom = (target: EventTarget | null, dy: number) => {
  let node: HTMLElement | null =
    target instanceof HTMLElement
      ? target
      : target instanceof Node
        ? target.parentElement
        : null

  while (
    node &&
    node !== document.body &&
    node !== document.documentElement
  ) {
    const style = window.getComputedStyle(node)
    const overflowY = style.overflowY
    const canScroll =
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      node.scrollHeight - node.clientHeight > EDGE_PX

    if (canScroll) {
      if (dy > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - EDGE_PX) {
        return true
      }

      if (dy < 0 && node.scrollTop > EDGE_PX) {
        return true
      }
    }

    node = node.parentElement
  }

  return false
}

const getDocumentScroll = () => {
  const el = document.scrollingElement || document.documentElement
  const top = el.scrollTop
  const max = Math.max(0, el.scrollHeight - el.clientHeight)
  return {
    atTop: top <= EDGE_PX,
    atBottom: top >= max - EDGE_PX
  }
}

const normalizeDeltaY = (event: WheelEvent) => {
  if (event.deltaMode === 1) {
    return event.deltaY * 16
  }

  if (event.deltaMode === 2) {
    return event.deltaY * window.innerHeight
  }

  return event.deltaY
}

const homeChromeBlocking = () =>
  Boolean(document.getElementById("index")?.classList.contains("home-chrome-wait"))

const overlayBlocking = () =>
  document.body.classList.contains("nav-menu-open") ||
  Boolean(document.querySelector(".certs-lightbox"))

const SectionScrollNav = () => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    registerSectionPush((href) => {
      router.push(href, { scroll: false })
    })

    return () => registerSectionPush(() => undefined)
  }, [router])

  useEffect(() => {
    if (!isSectionPath(pathname)) {
      return
    }

    SECTION_PATHS.forEach((path) => {
      if (path !== pathname) {
        router.prefetch(path)
      }
    })
  }, [pathname, router])

  useEffect(() => {
    let overflow = 0
    let eatingMomentum = false
    let idleTimer = 0
    let lastKeyAt = 0
    let touchStartY = 0
    let touchActive = false

    const stopIdleTimer = () => {
      if (idleTimer) {
        window.clearTimeout(idleTimer)
        idleTimer = 0
      }
    }

    const releaseMomentum = () => {
      eatingMomentum = false
      overflow = 0
      stopIdleTimer()
    }

    const armMomentumEat = () => {
      eatingMomentum = true
      overflow = 0
      stopIdleTimer()
      idleTimer = window.setTimeout(releaseMomentum, WHEEL_IDLE_MS)
    }

    const bumpIdle = () => {
      stopIdleTimer()
      idleTimer = window.setTimeout(releaseMomentum, WHEEL_IDLE_MS)
    }

    const canNavigate = () =>
      !isSectionNavLocked() &&
      !overlayBlocking() &&
      !homeChromeBlocking() &&
      isSectionPath(window.location.pathname)

    const navigate = (direction: 1 | -1) => {
      const href = getNeighborPath(window.location.pathname, direction)

      if (!href) {
        return false
      }

      overflow = 0
      const moved = goToSection(href, direction, "slide")

      if (moved) {
        armMomentumEat()
      }

      return moved
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) {
        return
      }

      const dy = normalizeDeltaY(event)

      if (dy === 0) {
        return
      }

      if (eatingMomentum) {
        event.preventDefault()
        bumpIdle()
        return
      }

      if (!canNavigate() || isTypingTarget(event.target) || hasInnerScrollRoom(event.target, dy)) {
        overflow = 0
        return
      }

      const { atTop, atBottom } = getDocumentScroll()
      const goingDown = dy > 0
      const goingUp = dy < 0

      if (goingDown && atBottom && getNeighborPath(window.location.pathname, 1)) {
        event.preventDefault()
        overflow = Math.max(0, overflow) + dy

        if (overflow >= INTENT_PX) {
          navigate(1)
        }

        return
      }

      if (goingUp && atTop && getNeighborPath(window.location.pathname, -1)) {
        event.preventDefault()
        overflow = Math.max(0, overflow) - dy

        if (overflow >= INTENT_PX) {
          navigate(-1)
        }

        return
      }

      overflow = 0
    }

    const onTouchStart = (event: TouchEvent) => {
      if (!event.touches[0]) {
        return
      }

      touchActive = true
      touchStartY = event.touches[0].clientY
      overflow = 0
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!touchActive || !event.touches[0]) {
        return
      }

      if (eatingMomentum) {
        event.preventDefault()
        return
      }

      const dy = touchStartY - event.touches[0].clientY

      if (!canNavigate() || isTypingTarget(event.target) || hasInnerScrollRoom(event.target, dy)) {
        return
      }

      const { atTop, atBottom } = getDocumentScroll()

      if (dy > 0 && atBottom && getNeighborPath(window.location.pathname, 1)) {
        overflow = dy

        if (overflow >= TOUCH_INTENT_PX && event.cancelable) {
          event.preventDefault()
        }

        return
      }

      if (dy < 0 && atTop && getNeighborPath(window.location.pathname, -1)) {
        overflow = -dy

        if (overflow >= TOUCH_INTENT_PX && event.cancelable) {
          event.preventDefault()
        }
      }
    }

    const onTouchEnd = () => {
      if (!touchActive) {
        return
      }

      touchActive = false

      if (eatingMomentum || !canNavigate()) {
        overflow = 0
        return
      }

      const { atTop, atBottom } = getDocumentScroll()

      if (overflow >= TOUCH_INTENT_PX && atBottom) {
        navigate(1)
        return
      }

      if (overflow >= TOUCH_INTENT_PX && atTop) {
        navigate(-1)
        return
      }

      overflow = 0
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!canNavigate() || isTypingTarget(event.target) || event.defaultPrevented) {
        return
      }

      const { atTop, atBottom } = getDocumentScroll()
      const now = performance.now()
      let direction: 1 | -1 | 0 = 0

      if (
        (event.key === "PageDown" || event.key === "End" || event.key === "ArrowDown") &&
        atBottom
      ) {
        direction = 1
      } else if (
        (event.key === "PageUp" || event.key === "Home" || event.key === "ArrowUp") &&
        atTop
      ) {
        direction = -1
      } else if (event.key === " " && !event.shiftKey && atBottom) {
        direction = 1
      } else if (event.key === " " && event.shiftKey && atTop) {
        direction = -1
      }

      if (!direction || !getNeighborPath(window.location.pathname, direction)) {
        return
      }

      if (now - lastKeyAt < KEY_REPEAT_GUARD_MS) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      lastKeyAt = now
      navigate(direction)
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        isSectionNavLocked()
      ) {
        return
      }

      const target = event.target
      const anchor =
        target instanceof Element ? target.closest("a[href]") : null

      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("target") === "_blank"
      ) {
        return
      }

      let url: URL

      try {
        url = new URL(anchor.getAttribute("href") || "", window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) {
        return
      }

      const from = getSectionIndex(window.location.pathname)
      const to = getSectionIndex(url.pathname)

      if (from < 0 || to < 0 || from === to) {
        return
      }

      event.preventDefault()
      const direction = (to > from ? 1 : -1) as 1 | -1
      const mode = Math.abs(to - from) === 1 ? "slide" : "jump"
      goToSection(`${url.pathname}${url.search}${url.hash}`, direction, mode)
    }

    const onChromeRevealed = () => {
      armMomentumEat()
    }

    const wheelOpts: AddEventListenerOptions = { passive: false }
    const touchMoveOpts: AddEventListenerOptions = { passive: false }

    window.addEventListener("wheel", onWheel, wheelOpts)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, touchMoveOpts)
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("click", onClick, true)
    window.addEventListener("site:home-chrome-revealed", onChromeRevealed)

    return () => {
      stopIdleTimer()
      window.removeEventListener("wheel", onWheel, wheelOpts)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove, touchMoveOpts)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("site:home-chrome-revealed", onChromeRevealed)
    }
  }, [])

  return null
}

export default SectionScrollNav
