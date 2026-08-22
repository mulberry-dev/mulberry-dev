"use client"

import { useParticles } from "@/components/particles"
import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"

type ViewState = "normal" | "covered"

const waitForPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })

const waitForViewReady = async () => {
  await waitForPaint()

  if (document.fonts?.status === "loading") {
    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, 180)
      })
    ])
  }
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

  useLayoutEffect(() => {
    if (prevPathRef.current === pathname) {
      return
    }

    prevPathRef.current = pathname

    if (!apiRef.current.canTransition) {
      setViewState("normal")
      document.body.classList.remove("particles-route-transition")
      apiRef.current.releaseContent()
      return
    }

    const token = ++generationRef.current
    setViewState("covered")
    document.body.classList.add("particles-route-transition")

    let cancelled = false

    const run = async () => {
      await Promise.all([
        apiRef.current.beginRouteTransition(),
        waitForViewReady()
      ])

      if (cancelled || token !== generationRef.current) {
        return
      }

      setViewState("normal")
      document.body.classList.remove("particles-route-transition")
      apiRef.current.releaseContent()
      apiRef.current.completeRouteTransition()
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [pathname])

  useEffect(() => {
    if (canTransition) {
      return
    }

    generationRef.current += 1
    setViewState("normal")
    document.body.classList.remove("particles-route-transition")
  }, [canTransition])

  useEffect(
    () => () => {
      document.body.classList.remove("particles-route-transition")
    },
    []
  )

  return (
    <div className={`page-transition-view is-${viewState}`}>{children}</div>
  )
}

export default PageTransition
