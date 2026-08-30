"use client"

import { ParticlesEngine, type ParticlePhase } from "@/lib/particlesEngine"
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
  const [engine] = useState(() => new ParticlesEngine())
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
    engine.setPhaseListener(setPhase)
    engine.setContentRevealListener(releaseContent)

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => {
      setReducedMotion(media.matches)
      engine.setReducedMotion(media.matches)
    }

    syncMotion()
    media.addEventListener("change", syncMotion)

    return () => {
      engine.setPhaseListener(null)
      engine.setContentRevealListener(null)
      media.removeEventListener("change", syncMotion)
    }
  }, [engine, releaseContent])

  useEffect(() => {
    if (reducedMotion) {
      setPhase("active")
      setLayerMounted(false)
      return
    }

    const mount = () => setLayerMounted(true)
    const timeoutId = window.setTimeout(mount, 8000)

    window.addEventListener("pointerdown", mount, { once: true, passive: true })
    window.addEventListener("scroll", mount, { once: true, passive: true })
    window.addEventListener("keydown", mount, { once: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("pointerdown", mount)
      window.removeEventListener("scroll", mount)
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
    const canvas = canvasRef.current

    if (!layerMounted) {
      return
    }

    if (!canvas || !engine.mount(canvas)) {
      return () => engine.unmount()
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

    return () => engine.unmount()
  }, [engine, layerMounted])

  const beginRouteTransition = useCallback(
    () => engine.beginRouteTransition(),
    [engine]
  )

  const completeRouteTransition = useCallback(
    () => engine.completeRouteTransition(),
    [engine]
  )

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
