"use client"

import DeferredSection from "@/components/sections/DeferredSection"
import HomeSection from "@/components/sections/HomeSection"
import {
  announceSection,
  applySectionTitle,
  focusSection,
  isSectionPath,
  markProgrammaticSectionScroll,
  observeActiveSection,
  prefetchSectionPath,
  requiredSectionIds,
  scrollToSection,
  subscribeSectionPrefetch,
  waitForSections
} from "@/lib/sectionNav"
import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

const DeferredFallback = ({ id, path }: { id: string; path: string }) => (
  <section
    id={id}
    data-section-path={path}
    className="is-deferred"
    aria-hidden="true"
    tabIndex={-1}
  />
)

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <DeferredFallback id="about" path="/about" />
})

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <DeferredFallback id="skills" path="/skills" />
})

const PortfolioSection = dynamic(
  () => import("@/components/sections/PortfolioSection"),
  { loading: () => <DeferredFallback id="portfolio" path="/portfolio" /> }
)

const CertificationsSection = dynamic(
  () => import("@/components/sections/CertificationsSection"),
  { loading: () => <DeferredFallback id="certifications" path="/certifications" /> }
)

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { loading: () => <DeferredFallback id="contact" path="/contact" /> }
)

const LAZY_SECTIONS = [
  { id: "about", path: "/about", Component: AboutSection },
  { id: "skills", path: "/skills", Component: SkillsSection },
  { id: "portfolio", path: "/portfolio", Component: PortfolioSection },
  { id: "certifications", path: "/certifications", Component: CertificationsSection },
  { id: "contact", path: "/contact", Component: ContactSection }
] as const

const readSectionHref = (anchor: Element) => {
  if (
    anchor.hasAttribute("download") ||
    anchor.getAttribute("target") === "_blank"
  ) {
    return null
  }

  try {
    const url = new URL(anchor.getAttribute("href") || "", window.location.href)

    if (url.origin !== window.location.origin || url.hash) {
      return null
    }

    return isSectionPath(url.pathname) ? url.pathname : null
  } catch {
    return null
  }
}

const SiteExperience = () => {
  const pathname = usePathname()
  const router = useRouter()
  const ignorePathRef = useRef<string | null>(null)
  const readyRef = useRef(false)
  const revealTokenRef = useRef(0)
  const activePathRef = useRef(pathname)
  const pathnameRef = useRef(pathname)
  const offSiteRef = useRef(!isSectionPath(pathname))
  const [aligned, setAligned] = useState(pathname === "/")
  const [mountedIds, setMountedIds] = useState(
    () => new Set(requiredSectionIds(pathname))
  )
  const mountedKey = Array.from(mountedIds).join("|")

  pathnameRef.current = pathname

  const mountThrough = useCallback((path: string) => {
    const needed = requiredSectionIds(path)

    setMountedIds((current) => {
      let changed = false
      const next = new Set(current)

      for (const id of needed) {
        if (!next.has(id)) {
          next.add(id)
          changed = true
        }
      }

      return changed ? next : current
    })
  }, [])

  const revealPath = useCallback(
    async (path: string, behavior: ScrollBehavior, moveFocus = false) => {
      const token = ++revealTokenRef.current
      mountThrough(path)
      await waitForSections(requiredSectionIds(path))

      if (token !== revealTokenRef.current) {
        return false
      }

      if (document.body.style.position === "fixed") {
        await new Promise<void>((resolve) => {
          const started = performance.now()
          const tick = () => {
            if (
              document.body.style.position !== "fixed" ||
              performance.now() - started > 400
            ) {
              resolve()
              return
            }

            window.requestAnimationFrame(tick)
          }

          tick()
        })

        if (token !== revealTokenRef.current) {
          return false
        }
      }

      scrollToSection(path, behavior)

      if (moveFocus) {
        focusSection(path)
      }

      return true
    },
    [mountThrough]
  )

  useEffect(() => subscribeSectionPrefetch(mountThrough), [mountThrough])

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    if (!isSectionPath(pathname)) {
      offSiteRef.current = true
      return
    }

    const fromOffSite = offSiteRef.current
    offSiteRef.current = false
    let cancelled = false

    applySectionTitle(pathname)
    announceSection(pathname)
    activePathRef.current = pathname

    if (readyRef.current && fromOffSite) {
      mountThrough(pathname)
      scrollToSection(pathname, "auto")
      setAligned(true)
    }

    const run = async () => {
      if (!readyRef.current) {
        readyRef.current = true

        if (pathname !== "/") {
          await revealPath(pathname, "auto", true)
        }

        if (!cancelled) {
          setAligned(true)
        }

        return
      }

      if (fromOffSite) {
        await revealPath(pathname, "auto", true)
        return
      }

      if (ignorePathRef.current) {
        if (ignorePathRef.current === pathname) {
          ignorePathRef.current = null
        }

        return
      }

      await revealPath(pathname, "smooth")
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [mountThrough, pathname, revealPath])

  useEffect(() => {
    if (aligned) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setAligned(true)
    }, 700)

    return () => window.clearTimeout(timeoutId)
  }, [aligned])

  useEffect(() => {
    if (!isSectionPath(pathname)) {
      return
    }

    const syncFromScroll = (nextPath: string) => {
      if (nextPath === activePathRef.current) {
        return
      }

      activePathRef.current = nextPath
      ignorePathRef.current = nextPath
      applySectionTitle(nextPath)
      announceSection(nextPath)
      mountThrough(nextPath)
      router.replace(nextPath, { scroll: false })
    }

    return observeActiveSection(syncFromScroll)
  }, [mountedKey, mountThrough, pathname, router])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      const anchor =
        target instanceof Element ? target.closest("a[href]") : null

      if (!anchor) {
        return
      }

      const nextPath = readSectionHref(anchor)

      if (!nextPath) {
        return
      }

      event.preventDefault()
      markProgrammaticSectionScroll(1400)
      activePathRef.current = nextPath
      applySectionTitle(nextPath)
      announceSection(nextPath)

      if (pathnameRef.current !== nextPath) {
        ignorePathRef.current = nextPath
        router.push(nextPath, { scroll: false })
      }

      void revealPath(nextPath, "smooth")
    }

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target
      const anchor =
        target instanceof Element ? target.closest("a[href]") : null

      if (!anchor) {
        return
      }

      const nextPath = readSectionHref(anchor)

      if (nextPath) {
        prefetchSectionPath(nextPath)
      }
    }

    document.addEventListener("click", onClick, true)
    document.addEventListener("pointerover", onPointerOver)
    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("pointerover", onPointerOver)
    }
  }, [revealPath, router])

  return (
    <div className={`site-experience${aligned ? " is-aligned" : ""}`}>
      <HomeSection />
      {LAZY_SECTIONS.map(({ id, path, Component }) => (
        <DeferredSection
          key={id}
          id={id}
          path={path}
          mounted={mountedIds.has(id)}
          onApproach={mountThrough}
        >
          <Component />
        </DeferredSection>
      ))}
    </div>
  )
}

export default SiteExperience
