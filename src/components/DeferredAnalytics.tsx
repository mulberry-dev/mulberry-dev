"use client"

import { GoogleAnalytics } from "@next/third-parties/google"
import { useEffect, useState } from "react"

const IDLE_DELAY_MS = 8000

const DeferredAnalytics = ({ gaId }: { gaId: string }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) {
      return
    }

    const enable = () => setReady(true)
    const timeoutId = window.setTimeout(enable, IDLE_DELAY_MS)

    window.addEventListener("pointerdown", enable, { once: true, passive: true })
    window.addEventListener("scroll", enable, { once: true, passive: true })
    window.addEventListener("keydown", enable, { once: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("pointerdown", enable)
      window.removeEventListener("scroll", enable)
      window.removeEventListener("keydown", enable)
    }
  }, [ready])

  return ready ? <GoogleAnalytics gaId={gaId} /> : null
}

export default DeferredAnalytics
