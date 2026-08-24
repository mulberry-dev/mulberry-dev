"use client"

import {
  ParticlesEngine,
  type ParticlePhase
} from "@/lib/particlesEngine"
import { Tooltip } from "antd"
import { usePathname } from "next/navigation"
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react"

const STORAGE_KEY = "particles-preference"

const readEmberPreference = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored !== "original" && stored !== "on"
  } catch {
    return true
  }
}

type ParticlesContextValue = {
  enabled: boolean
  phase: ParticlePhase
  reducedMotion: boolean
  canTransition: boolean
  contentReady: boolean
  toggle: () => void
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

const FlameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z" />
  </svg>
)

const SnowflakeIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth={filled ? 2 : 1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2v20M4.2 7l15.6 10M4.2 17 19.8 7" />
    <path d="M12 2 9.6 5.2M12 2l2.4 3.2M12 22l-2.4-3.2M12 22l2.4-3.2" />
    <path d="M4.2 7 7.6 6.2M4.2 7l.9 3.4M19.8 7l-3.4-.8M19.8 7l-.9 3.4" />
    <path d="M4.2 17l3.4.8M4.2 17l.9-3.4M19.8 17l-3.4.8M19.8 17l-.9-3.4" />
  </svg>
)

export const ParticlesProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [engine] = useState(() => new ParticlesEngine())
  const [enabled, setEnabled] = useState(false)
  const [phase, setPhase] = useState<ParticlePhase>("idle")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prevPathRef = useRef(pathname)
  const layerMounted = phase !== "idle"

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

    const ember = readEmberPreference()
    setEnabled(!ember)
    setPhase(media.matches ? "active" : "entering")

    return () => {
      engine.setPhaseListener(null)
      engine.setContentRevealListener(null)
      media.removeEventListener("change", syncMotion)
    }
  }, [engine, releaseContent])

  useLayoutEffect(() => {
    if (prevPathRef.current === pathname) {
      return
    }

    prevPathRef.current = pathname
    releaseContent()
  }, [pathname, releaseContent])

  useLayoutEffect(() => {
    const canvas = canvasRef.current

    if (!layerMounted || !canvas) {
      return
    }

    engine.mount(canvas)
    engine.setEmberMode(readEmberPreference(), true)

    if (engine.getPhase() === "idle") {
      if (reducedMotion) {
        engine.startActive()
      } else {
        engine.startEnter()
      }
    }

    return () => engine.unmount()
  }, [engine, layerMounted, reducedMotion])

  const toggle = useCallback(() => {
    if (phase === "falling") {
      localStorage.setItem(STORAGE_KEY, "original")
      setEnabled(true)
      engine.cancelFallAndResume()
      engine.setEmberMode(false)
      return
    }

    const nextEnabled = !enabled
    localStorage.setItem(STORAGE_KEY, nextEnabled ? "original" : "ember")
    setEnabled(nextEnabled)
    engine.setEmberMode(!nextEnabled)

    if (phase === "idle") {
      setPhase(reducedMotion ? "active" : "entering")
    }
  }, [enabled, engine, phase, reducedMotion])

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
      enabled,
      phase,
      reducedMotion,
      canTransition,
      contentReady,
      toggle,
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
      enabled,
      holdContent,
      phase,
      reducedMotion,
      releaseContent,
      toggle
    ]
  )

  const emberMode = !enabled
  const label = emberMode
    ? "Switch to original particles"
    : "Switch to ember particles"

  const toggleClassName = [
    "particles-toggle",
    enabled ? "is-on" : "",
    emberMode ? "is-ember" : ""
  ]
    .filter(Boolean)
    .join(" ")

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

      <Tooltip title={label} placement="left" trigger="hover">
        <span className="particles-toggle-wrap">
          <button
            type="button"
            className={toggleClassName}
            onClick={toggle}
            aria-pressed={enabled || emberMode}
            aria-label={label}
          >
            <span
              className={`particles-toggle__icon${emberMode ? " is-visible" : ""}`}
            >
              <FlameIcon />
            </span>
            <span
              className={`particles-toggle__icon${!emberMode ? " is-visible" : ""}`}
            >
              <SnowflakeIcon filled={enabled} />
            </span>
          </button>
        </span>
      </Tooltip>

      {children}
    </ParticlesContext.Provider>
  )
}
