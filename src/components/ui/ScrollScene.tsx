"use client"

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from "react"

const MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const ScrollScene = ({
  frames,
  className = "",
  holdFrom = 1024,
  children
}: {
  frames: number
  className?: string
  holdFrom?: number
  children: (active: number, progress: number, held: boolean) => ReactNode
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const heldRef = useRef(false)
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)

  const measure = useCallback(() => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const canHold =
      frames > 1 &&
      window.matchMedia(`(min-width: ${holdFrom}px)`).matches &&
      !window.matchMedia(MOTION_QUERY).matches

    if (heldRef.current !== canHold) {
      heldRef.current = canHold
      setHeld(canHold)
    }

    if (!canHold) {
      track.style.setProperty("--scene-progress", "1")

      if (activeRef.current !== 0) {
        activeRef.current = 0
        setActive(0)
      }

      return
    }

    const rect = track.getBoundingClientRect()
    const travel = Math.max(rect.height - window.innerHeight, 1)
    const scrolled = Math.min(Math.max(-rect.top, 0), travel)
    const next = scrolled / travel
    const index = Math.min(frames - 1, Math.floor(next * frames))

    track.style.setProperty("--scene-progress", next.toFixed(4))

    if (activeRef.current !== index) {
      activeRef.current = index
      setActive(index)
    }
  }, [frames, holdFrom])

  useLayoutEffect(() => {
    measure()

    let frame = 0
    const onScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        measure()
      })
    }

    const desktop = window.matchMedia(`(min-width: ${holdFrom}px)`)
    const motion = window.matchMedia(MOTION_QUERY)

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    desktop.addEventListener("change", measure)
    motion.addEventListener("change", measure)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      desktop.removeEventListener("change", measure)
      motion.removeEventListener("change", measure)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [measure])

  return (
    <div
      ref={trackRef}
      className={["scroll-scene", held ? "is-held" : "is-flat", className]
        .filter(Boolean)
        .join(" ")}
      style={{ "--scene-frames": frames } as CSSProperties}
    >
      <div className="scroll-scene__sticky">
        {children(active, held ? active / Math.max(frames - 1, 1) : 1, held)}
      </div>
    </div>
  )
}

export default ScrollScene
