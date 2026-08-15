"use client"

import { useEffect, useState } from "react"

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const CountUp = ({
  value,
  duration = 2000,
  delay = 0
}: {
  value: number
  duration?: number
  delay?: number
}) => {
  const [display, setDisplay] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
  }, [value])

  useEffect(() => {
    if (!active) {
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }

    let frame = 0
    let start = 0
    const timeout = window.setTimeout(() => {
      start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        setDisplay(Math.round(easeOutCubic(progress) * value))
        if (progress < 1) {
          frame = window.requestAnimationFrame(tick)
        }
      }
      frame = window.requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
      window.cancelAnimationFrame(frame)
    }
  }, [active, delay, duration, value])

  return (
    <span
      className={`count-up${active ? " is-active" : ""}`}
      aria-label={String(value)}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  )
}

export default CountUp
