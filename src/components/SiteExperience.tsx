"use client"

import AboutSection from "@/components/sections/AboutSection"
import CertificationsSection from "@/components/sections/CertificationsSection"
import ContactSection from "@/components/sections/ContactSection"
import HomeSection from "@/components/sections/HomeSection"
import PortfolioSection from "@/components/sections/PortfolioSection"
import SkillsSection from "@/components/sections/SkillsSection"
import {
  announceSection,
  applySectionTitle,
  isProgrammaticSectionScroll,
  isSectionPath,
  readActiveSectionPath,
  scrollToSection
} from "@/lib/sectionNav"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const SiteExperience = () => {
  const pathname = usePathname()
  const router = useRouter()
  const ignorePathRef = useRef<string | null>(null)
  const readyRef = useRef(false)
  const activePathRef = useRef(pathname)
  const pathnameRef = useRef(pathname)
  const [aligned, setAligned] = useState(pathname === "/")

  pathnameRef.current = pathname

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    if (!isSectionPath(pathname)) {
      return
    }

    applySectionTitle(pathname)
    announceSection(pathname)
    activePathRef.current = pathname

    if (!readyRef.current) {
      readyRef.current = true

      if (pathname !== "/") {
        scrollToSection(pathname, "auto")
      }

      setAligned(true)
      return
    }

    if (ignorePathRef.current) {
      if (ignorePathRef.current === pathname) {
        ignorePathRef.current = null
      }

      return
    }

    scrollToSection(pathname, "smooth")
  }, [pathname])

  useEffect(() => {
    const syncFromScroll = () => {
      if (isProgrammaticSectionScroll()) {
        return
      }

      const nextPath = readActiveSectionPath()

      if (nextPath === activePathRef.current) {
        return
      }

      activePathRef.current = nextPath
      ignorePathRef.current = nextPath
      applySectionTitle(nextPath)
      announceSection(nextPath)
      router.replace(nextPath, { scroll: false })
    }

    let frame = 0
    const onScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        syncFromScroll()
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    syncFromScroll()

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }

      window.removeEventListener("scroll", onScroll)
    }
  }, [router])

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

      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("target") === "_blank"
      ) {
        return
      }

      let url: URL

      try {
        url = new URL(anchor.getAttribute("href") || "", window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) {
        return
      }

      const nextPath = url.pathname

      if (!isSectionPath(nextPath) || url.hash) {
        return
      }

      event.preventDefault()
      activePathRef.current = nextPath
      applySectionTitle(nextPath)
      announceSection(nextPath)
      scrollToSection(nextPath, "smooth")

      if (pathnameRef.current === nextPath) {
        return
      }

      ignorePathRef.current = nextPath
      router.push(nextPath, { scroll: false })
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [router])

  return (
    <div className={`site-experience${aligned ? " is-aligned" : ""}`}>
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  )
}

export default SiteExperience
