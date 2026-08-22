"use client"

import { useMotion } from "@/components/particles"
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode
} from "react"

export type RevealType =
  | "page"
  | "hero"
  | "eyebrow"
  | "heading"
  | "text"
  | "button"
  | "card"
  | "image"
  | "nav"
  | "decorative"

export type RevealMode = "auto" | "fold" | "scroll"

type RevealGroupValue = {
  take: () => number
  stagger: number
  mode: RevealMode
}

const RevealGroupContext = createContext<RevealGroupValue | null>(null)

export const RevealGroup = ({
  as: Tag,
  className = "",
  stagger = 56,
  mode = "auto",
  children
}: {
  as?: ElementType
  className?: string
  stagger?: number
  mode?: RevealMode
  children: ReactNode
}) => {
  const counter = useRef(0)
  counter.current = 0

  const value = useMemo(
    () => ({
      take: () => counter.current++,
      stagger,
      mode
    }),
    [mode, stagger]
  )

  const Wrapper = Tag ?? (className ? "div" : null)

  return (
    <RevealGroupContext.Provider value={value}>
      {Wrapper ? (
        <Wrapper className={className}>{children}</Wrapper>
      ) : (
        children
      )}
    </RevealGroupContext.Provider>
  )
}

const Reveal = ({
  as: Tag = "div",
  type = "text",
  mode,
  delay = 0,
  index,
  className = "",
  children
}: {
  as?: ElementType
  type?: RevealType
  mode?: RevealMode
  delay?: number
  index?: number
  className?: string
  children: ReactNode
}) => {
  const group = useContext(RevealGroupContext)
  const motion = useMotion()
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  const [entered, setEntered] = useState(false)
  const assignedIndex = useRef<number | null>(index ?? null)

  if (assignedIndex.current === null) {
    assignedIndex.current = group ? group.take() : 0
  }

  const resolvedMode = mode ?? group?.mode ?? "auto"
  const resolvedIndex = assignedIndex.current
  const stagger = group?.stagger ?? 56
  const contentReady = motion?.contentReady ?? true
  const reducedMotion = motion?.reducedMotion ?? false
  const delayMs = delay + resolvedIndex * stagger

  useLayoutEffect(() => {
    const node = ref.current

    if (reducedMotion) {
      setInView(true)
      return
    }

    if (resolvedMode === "fold") {
      setInView(true)
      return
    }

    if (!node) {
      return
    }

    const isNearFold = () => {
      const rect = node.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0
    }

    if (resolvedMode === "auto" && isNearFold()) {
      setInView(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion, resolvedMode])

  useLayoutEffect(() => {
    if (reducedMotion) {
      setEntered(true)
      return
    }

    if (!contentReady) {
      setEntered(false)
      return
    }

    if (!inView) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      setEntered(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [contentReady, inView, reducedMotion])

  const classNames = [
    "reveal",
    `reveal--${type}`,
    entered ? "is-visible" : "",
    className
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Tag
      ref={ref}
      className={classNames}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

export default Reveal
