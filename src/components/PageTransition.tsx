"use client"

import { useParticles } from "@/components/particles"
import {
  clearSlideNavigation,
  consumePendingSlide,
  peekPendingSlide,
  peekScrollAnchor,
  registerSectionView,
  setSectionNavLocked,
  settleSectionScroll,
  wasSlideNavigation
} from "@/lib/sectionNav"
import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"

type ViewState = "normal" | "covered"

const SLIDE_MS = 800
const SLIDE_EASE = "cubic-bezier(0.45, 0, 0.1, 1)"

const finishAnimations = async (animations: Animation[]) => {
  await Promise.all(
    animations.map((animation) => animation.finished.catch(() => undefined))
  )
}

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const {
    canTransition,
    beginRouteTransition,
    completeRouteTransition,
    releaseContent
  } = useParticles()
  const [viewState, setViewState] = useState<ViewState>("normal")
  const viewRef = useRef<HTMLDivElement | null>(null)
  const prevPathRef = useRef(pathname)
  const generationRef = useRef(0)
  const apiRef = useRef({
    canTransition,
    beginRouteTransition,
    completeRouteTransition,
    releaseContent
  })

  apiRef.current = {
    canTransition,
    beginRouteTransition,
    completeRouteTransition,
    releaseContent
  }

  const setViewNode = (node: HTMLDivElement | null) => {
    viewRef.current = node
    registerSectionView(node)
  }

  useLayoutEffect(() => {
    const pathChanged = prevPathRef.current !== pathname
    const rawSlide = peekPendingSlide()
    const slide = rawSlide?.href === pathname ? rawSlide : null

    if (rawSlide && !slide) {
      consumePendingSlide()?.frame.remove()
    }

    if (!pathChanged && !slide) {
      return
    }

    const fromPath = prevPathRef.current
    prevPathRef.current = pathname
    const token = ++generationRef.current
    const view = viewRef.current
    const html = document.documentElement
    const anchor = peekScrollAnchor()
    let incoming: Animation | null = null
    let outgoing: Animation | null = null

    const unlock = () => {
      if (token !== generationRef.current) {
        return
      }

      view?.classList.remove("is-sliding")
      if (view) {
        view.style.transform = ""
        view.style.opacity = ""
      }

      html.classList.remove("is-section-sliding")
      delete html.dataset.navDir

      const nextAnchor = peekScrollAnchor()

      if (nextAnchor === "end") {
        settleSectionScroll(-1)
      } else if (nextAnchor === "start") {
        settleSectionScroll(1)
      }

      setSectionNavLocked(false)
      clearSlideNavigation()
    }

    if (slide?.frame && view) {
      apiRef.current.releaseContent()
      setViewState("normal")
      document.body.classList.remove("particles-route-transition")
      view.classList.add("is-sliding")

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (reduced) {
        consumePendingSlide()
        slide.frame.remove()
        unlock()
        return
      }

      if (!slide.frame.isConnected) {
        document.body.appendChild(slide.frame)
      }

      incoming = view.animate(
        [{ transform: "translate3d(0, 0, 0)" }],
        { duration: SLIDE_MS, easing: SLIDE_EASE, fill: "forwards" }
      )
      outgoing = slide.frame.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          {
            transform: `translate3d(0, ${slide.direction > 0 ? "-100vh" : "100vh"}, 0)`
          }
        ],
        { duration: SLIDE_MS, easing: SLIDE_EASE, fill: "forwards" }
      )

      void finishAnimations([incoming, outgoing]).then(() => {
        if (token !== generationRef.current) {
          return
        }

        try {
          incoming?.commitStyles()
          outgoing?.commitStyles()
        } catch {
          // Safari versions without commitStyles stay on fill: forwards
        }

        incoming?.cancel()
        outgoing?.cancel()
        consumePendingSlide()
        slide.frame.remove()
        unlock()
      })

      return () => {
        incoming?.cancel()
        outgoing?.cancel()
        view.style.transform = ""
        view.style.opacity = ""
        view.classList.remove("is-sliding")

        if (token === generationRef.current) {
          prevPathRef.current = fromPath
        }
      }
    }

    if (wasSlideNavigation()) {
      consumePendingSlide()?.frame.remove()
      apiRef.current.releaseContent()
      setViewState("normal")
      unlock()
      return
    }

    html.classList.remove("is-section-sliding")
    delete html.dataset.navDir
    view?.classList.remove("is-sliding")

    if (view) {
      view.style.transform = ""
      view.style.opacity = ""
    }

    setViewState("normal")
    document.body.classList.remove("particles-route-transition")
    apiRef.current.releaseContent()

    if (anchor === "end") {
      settleSectionScroll(-1)
    } else {
      settleSectionScroll(1)
    }

    if (apiRef.current.canTransition) {
      void apiRef.current.beginRouteTransition().then(() => {
        if (token !== generationRef.current) {
          return
        }

        apiRef.current.completeRouteTransition()
      })
    }

    setSectionNavLocked(false)
    clearSlideNavigation()
  }, [pathname])

  useEffect(() => {
    if (canTransition) {
      return
    }

    generationRef.current += 1
    setViewState("normal")
    document.body.classList.remove("particles-route-transition")
    document.documentElement.classList.remove("is-section-sliding")
    delete document.documentElement.dataset.navDir
    setSectionNavLocked(false)
  }, [canTransition])

  useEffect(
    () => () => {
      document.body.classList.remove("particles-route-transition")
      document.documentElement.classList.remove("is-section-sliding")
      delete document.documentElement.dataset.navDir
      registerSectionView(null)
    },
    []
  )

  return (
    <div
      ref={setViewNode}
      className={`page-transition-view is-${viewState}`}
    >
      {children}
    </div>
  )
}

export default PageTransition
