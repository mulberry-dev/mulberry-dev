"use client"

import Image from "next/image"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export type LightboxOrigin = {
  top: number
  left: number
  width: number
  height: number
}

type LightboxProps = {
  src: string
  alt: string
  origin: LightboxOrigin
  getOrigin?: () => LightboxOrigin | null
  aspectRatio?: number
  onClose: () => void
}

const OPEN_MS = 540
const CLOSE_MS = 620
const OPEN_EASE = "cubic-bezier(0.4, 0, 0.2, 1)"
const CLOSE_EASE = "cubic-bezier(0.45, 0.02, 0.1, 1)"

const invertFromOrigin = (origin: LightboxOrigin, dest: DOMRect) => {
  const originX = origin.left + origin.width / 2
  const originY = origin.top + origin.height / 2
  const destX = dest.left + dest.width / 2
  const destY = dest.top + dest.height / 2
  const scaleX = origin.width / Math.max(dest.width, 1)
  const scaleY = origin.height / Math.max(dest.height, 1)

  return `translate(${originX - destX}px, ${originY - destY}px) scale(${scaleX}, ${scaleY})`
}

const fitFrame = (aspect: number) => {
  const maxW = Math.min(window.innerWidth * 0.92, 1280)
  const maxH = Math.min(window.innerHeight * 0.82, 860)
  let width = maxW
  let height = width / aspect

  if (height > maxH) {
    height = maxH
    width = height * aspect
  }

  return { width, height }
}

const Lightbox = ({
  src,
  alt,
  origin,
  getOrigin,
  aspectRatio = 1.5,
  onClose
}: LightboxProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [closing, setClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const playClose = useCallback(() => {
    if (closingRef.current) {
      return
    }

    closingRef.current = true
    setClosing(true)

    const frame = frameRef.current
    const reduced = reduceMotion()
    const target = getOrigin?.() ?? origin

    if (frame && !reduced && target) {
      const dest = frame.getBoundingClientRect()
      frame.style.transition = `transform ${CLOSE_MS}ms ${CLOSE_EASE}, opacity 140ms linear ${CLOSE_MS - 140}ms`
      frame.style.transform = invertFromOrigin(target, dest)
    }

    window.setTimeout(onClose, reduced ? 160 : CLOSE_MS)
  }, [getOrigin, onClose, origin])

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame || !mounted) {
      return
    }

    const size = fitFrame(aspectRatio)
    frame.style.width = `${size.width}px`
    frame.style.height = `${size.height}px`

    const dest = frame.getBoundingClientRect()
    const reduced = reduceMotion()

    if (!reduced) {
      frame.style.transition = "none"
      frame.style.opacity = "1"
      frame.style.transform = invertFromOrigin(origin, dest)
    }

    const openId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!reduced) {
          frame.style.transition = `transform ${OPEN_MS}ms ${OPEN_EASE}`
          frame.style.transform = "translate(0, 0) scale(1)"
        }
        setReady(true)
        closeRef.current?.focus()
      })
    })

    return () => window.cancelAnimationFrame(openId)
  }, [aspectRatio, mounted, origin])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        playClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [playClose])

  if (!mounted) {
    return null
  }

  const stateClass = [
    ready ? "is-ready" : "",
    closing ? "is-closing" : ""
  ]
    .filter(Boolean)
    .join(" ")

  return createPortal(
    <div
      className={`certs-lightbox ${stateClass}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        className="certs-lightbox__backdrop"
        onClick={playClose}
        aria-label="Close fullscreen certificate"
      />
      <button
        ref={closeRef}
        type="button"
        className="certs-lightbox__close"
        onClick={playClose}
        aria-label="Close fullscreen certificate"
      >
        ×
      </button>
      <div className="certs-lightbox__stage">
        <div ref={frameRef} className="certs-lightbox__frame">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="96vw"
            priority
            className="certs-lightbox__image"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Lightbox
