"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type PreviewAvailability = "checking" | "live" | "offline" | "unknown"

type ProbeResult = Exclude<PreviewAvailability, "checking">

export async function fetchPreviewAvailability(
  url: string
): Promise<ProbeResult> {
  try {
    const response = await fetch(
      `/api/preview-status?url=${encodeURIComponent(url)}`
    )
    const data = await response.json()

    if (data.live) {
      return "live"
    }

    if (data.uncertain) {
      return "unknown"
    }

    return "offline"
  } catch {
    return "unknown"
  }
}

export function usePreviewAvailability(url?: string | null) {
  const [status, setStatus] = useState<PreviewAvailability>(
    url ? "checking" : "offline"
  )
  const pendingRef = useRef<Promise<ProbeResult> | null>(null)

  useEffect(() => {
    if (!url) {
      setStatus("offline")
      pendingRef.current = Promise.resolve("offline")
      return
    }

    let cancelled = false
    setStatus("checking")

    const request = fetchPreviewAvailability(url)
    pendingRef.current = request
    request.then(next => {
      if (!cancelled) {
        setStatus(next)
      }
    })

    return () => {
      cancelled = true
    }
  }, [url])

  const resolve = useCallback(async (): Promise<ProbeResult> => {
    if (status !== "checking") {
      return status
    }

    return (await pendingRef.current) ?? "unknown"
  }, [status])

  return { status, resolve }
}
