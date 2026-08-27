"use client"

import { SECTION_PREFETCH_MARGIN } from "@/lib/sectionNav"
import { useEffect, useRef, type ReactNode } from "react"

const DeferredSection = ({
  id,
  path,
  mounted,
  onApproach,
  children
}: {
  id: string
  path: string
  mounted: boolean
  onApproach: (path: string) => void
  children: ReactNode
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (mounted) {
      return
    }

    const node = ref.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        observer.disconnect()
        onApproach(path)
      },
      { root: null, rootMargin: SECTION_PREFETCH_MARGIN, threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [mounted, onApproach, path])

  if (mounted) {
    return children
  }

  return (
    <section
      ref={ref}
      id={id}
      data-section-path={path}
      className="is-deferred"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}

export default DeferredSection
