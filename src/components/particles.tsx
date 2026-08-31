"use client"

import type { ParticlePhase, ParticlesEngine } from "@/lib/particlesEngine"
import { usePathname } from "next/navigation"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react"

type ParticlesContextValue = {
  phase: ParticlePhase
  reducedMotion: boolean
  canTransition: boolean
  contentReady: boolean
  beginRouteTransition: () => Promise<void>
  completeRouteTransition: () => void
  holdContent: () => void
  releaseContent: () => void
}

const ParticlesContext = createContext<ParticlesContextValue | null>(null)

export const useParticles = () => {
  const context = useContext(ParticlesContext)

  if (!context) {
    throw new Error("useParticles must be used within ParticlesProvider")
  }

  return context
}

export const useMotion = () => useContext(ParticlesContext)

export const ParticlesProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const engineRef = useRef<ParticlesEngine | null>(null)
  const [phase, setPhase] = useState<ParticlePhase>("idle")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [contentReady, setContentReady] = useState(true)
  const [layerMounted, setLayerMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prevPathRef = useRef(pathname)

  const holdContent = useCallback(() => {
    setContentReady(false)
  }, [])

  const releaseContent = useCallback(() => {
    setContentReady(true)
  }, [])

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => {
      const reduced = media.matches
      setReducedMotion(reduced)
      engineRef.current?.setReducedMotion(reduced)
    }

    syncMotion()
    media.addEventListener("change", syncMotion)

    return () => media.removeEventListener("change", syncMotion)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setPhase("active")
      setLayerMounted(false)
      return
    }

    const mount = () => setLayerMounted(true)
    const timeoutId = window.setTimeout(mount, 20000)

    window.addEventListener("pointerdown", mount, { once: true, passive: true })
    window.addEventListener("keydown", mount, { once: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("pointerdown", mount)
      window.removeEventListener("keydown", mount)
    }
  }, [reducedMotion])

  useLayoutEffect(() => {
    if (prevPathRef.current === pathname) {
      return
    }

    prevPathRef.current = pathname
    releaseContent()
  }, [pathname, releaseContent])

  useLayoutEffect(() => {
    if (!layerMounted) {
      return
    }

    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    let cancelled = false

    const attach = (engine: ParticlesEngine) => {
      engine.setPhaseListener(setPhase)
      engine.setContentRevealListener(releaseContent)
      engine.setReducedMotion(reducedMotion)

      if (!engine.mount(canvas)) {
        return
      }

      engine.setEmberMode(true, true)

      const currentPhase = engine.getPhase()

      if (currentPhase === "idle") {
        engine.startEnter()
      } else if (
        currentPhase === "active" ||
        currentPhase === "transitioning"
      ) {
        engine.startActive()
      } else {
        engine.armContentReveal()
      }
    }

    const existing = engineRef.current

    if (existing) {
      attach(existing)
    } else {
      void import("@/lib/particlesEngine").then(({ ParticlesEngine }) => {
        if (cancelled) {
          return
        }

        const engine = new ParticlesEngine()
        engineRef.current = engine
        attach(engine)
      })
    }

    return () => {
      cancelled = true
      engineRef.current?.setPhaseListener(null)
      engineRef.current?.setContentRevealListener(null)
      engineRef.current?.unmount()
    }
  }, [layerMounted, reducedMotion, releaseContent])

  const beginRouteTransition = useCallback(
    () => engineRef.current?.beginRouteTransition() ?? Promise.resolve(),
    []
  )

  const completeRouteTransition = useCallback(() => {
    engineRef.current?.completeRouteTransition()
  }, [])

  const canTransition =
    !reducedMotion &&
    (phase === "entering" || phase === "active" || phase === "transitioning")

  const value = useMemo(
    () => ({
      phase,
      reducedMotion,
      canTransition,
      contentReady,
      beginRouteTransition,
      completeRouteTransition,
      holdContent,
      releaseContent
    }),
    [
      beginRouteTransition,
      canTransition,
      completeRouteTransition,
      contentReady,
      holdContent,
      phase,
      reducedMotion,
      releaseContent
    ]
  )

  return (
    <ParticlesContext.Provider value={value}>
      {layerMounted ? (
        <div
          className="particles-layer"
          data-phase={phase}
          aria-hidden="true"
        >
          <canvas ref={canvasRef} className="particles-layer__canvas" />
        </div>
      ) : null}

      {children}
    </ParticlesContext.Provider>
  )
}
