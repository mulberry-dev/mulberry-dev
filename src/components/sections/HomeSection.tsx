"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import { useParticles } from "@/components/particles"
import { SITE_LOGO, SITE_NAME } from "@/data/site"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { isHomePath } from "@/lib/locale"
import Image from "next/image"
import { SECTION_CHANGE_EVENT } from "@/lib/sectionNav"
import {
  didLeaveHome,
  HOME_CHROME_REVEALED_EVENT,
  isHomeChromeRevealed,
  markHomeChromeRevealed,
  shouldRevealHomeChrome
} from "@/lib/siteSession"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const ORBIT_HOVER_RATE = 0.35
const INTRO_COMPLETE_MS = 1780

const setOrbitRate = (node: HTMLDivElement, rate: number) => {
  node.getAnimations().forEach((animation) => {
    animation.playbackRate = rate
  })
}

const IndexPage = () => {
  const pathname = usePathname()
  const { t, href } = useI18n()
  const { contentReady, reducedMotion } = useParticles()
  const [isFirstHome] = useState(() => !didLeaveHome())
  const [introComplete, setIntroComplete] = useState(false)

  const revealChrome = useCallback(() => {
    if (isHomeChromeRevealed()) {
      return false
    }

    markHomeChromeRevealed()
    window.dispatchEvent(new Event(HOME_CHROME_REVEALED_EVENT))
    return true
  }, [])

  useEffect(() => {
    if (!contentReady) {
      return
    }

    if (reducedMotion) {
      setIntroComplete(true)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIntroComplete(true)
    }, isFirstHome ? INTRO_COMPLETE_MS : 720)

    return () => window.clearTimeout(timeoutId)
  }, [contentReady, isFirstHome, reducedMotion])

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      const path = (event as CustomEvent<{ path?: string }>).detail?.path

      if (path && path !== "/") {
        revealChrome()
      }
    }

    window.addEventListener(SECTION_CHANGE_EVENT, onSectionChange)
    return () => window.removeEventListener(SECTION_CHANGE_EVENT, onSectionChange)
  }, [revealChrome])

  useEffect(() => {
    if (!isHomePath(pathname) || shouldRevealHomeChrome() || window.scrollY > 1) {
      revealChrome()
      return
    }

    let armed = false
    const armId = window.requestAnimationFrame(() => {
      armed = true
    })

    const onFirstScroll = (event: Event) => {
      if (!armed || !event.isTrusted) {
        return
      }

      revealAndDetach()
    }

    const onFirstKeyScroll = (event: KeyboardEvent) => {
      if (!armed || !event.isTrusted) {
        return
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "PageDown" ||
        event.key === "PageUp" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === " "
      ) {
        revealAndDetach()
      }
    }

    const revealAndDetach = () => {
      if (!revealChrome()) {
        return
      }

      window.removeEventListener("wheel", onFirstScroll)
      window.removeEventListener("touchmove", onFirstScroll)
      window.removeEventListener("scroll", onFirstScroll)
      window.removeEventListener("keydown", onFirstKeyScroll)
    }

    const scrollListener: AddEventListenerOptions = { passive: true }
    window.addEventListener("wheel", onFirstScroll, scrollListener)
    window.addEventListener("touchmove", onFirstScroll, scrollListener)
    window.addEventListener("scroll", onFirstScroll, scrollListener)
    window.addEventListener("keydown", onFirstKeyScroll)

    return () => {
      window.cancelAnimationFrame(armId)
      window.removeEventListener("wheel", onFirstScroll)
      window.removeEventListener("touchmove", onFirstScroll)
      window.removeEventListener("scroll", onFirstScroll)
      window.removeEventListener("keydown", onFirstKeyScroll)
    }
  }, [pathname, revealChrome])

  const introClass = [
    "home-intro",
    isFirstHome ? "" : "is-return",
    contentReady ? "is-reveal-ready" : "is-reveal-wait",
    introComplete ? "is-complete" : ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      id="index"
      className={introClass || undefined}
      data-section-path="/"
      aria-label={t.home.ariaLabel}
      tabIndex={-1}
    >
      <Container className="home-page">
        <div className="home-hero">
          <div className="home-hero__copy">
            <TerminalPrompt path={WORKSPACE.home.path} className="home-hero__prompt" />
            <div className="home-hero__brand">
              <Image
                className="home-hero__logo site-logo"
                src={SITE_LOGO}
                width={127}
                height={88}
                alt=""
                priority
                sizes="88px"
                quality={80}
              />
              <p className="home-hero__brand-name gradient-text">{SITE_NAME}</p>
            </div>
            <h1>
              {t.home.greeting}{" "}
              <span className="gradient-text home-hero__name">{t.home.name}</span>
            </h1>
            <p className="home-hero__role">
              <span className="home-hero__bracket">&lt;</span>{" "}
              <span className="home-hero__teal">{t.home.roleLead}</span>{" "}
              <span className="home-hero__purple">{t.home.roleTrail}</span>{" "}
              <span className="home-hero__bracket">/ &gt;</span>
            </p>
            <p className="home-hero__body">
              <span>{t.home.bodyBefore}</span>
              <span className="home-hero__solutions">{t.home.bodySolutions}</span>
              <span>{t.home.bodyMid}</span>
              <span className="gradient-text">{t.home.bodyValue}</span>
              <span className="home-hero__caret" aria-hidden="true">
                _
              </span>
            </p>
            <div className="home-hero__actions">
              <Button href={href("/about")} variant="terminal">
                <span className="sr-only">{t.home.ctaSr}</span>
                <span aria-hidden="true">{t.home.cta}</span>
              </Button>
            </div>
          </div>

          <div className="home-hero__visual" aria-hidden="true">
            <div
              className="home-orbit"
              onPointerEnter={(event) =>
                setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)
              }
              onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
            >
              <span className="home-orbit__node" />
            </div>
            <div
              className="home-orbit home-orbit--inner"
              onPointerEnter={(event) =>
                setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)
              }
              onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
            >
              <span className="home-orbit__node home-orbit__node--purple" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default IndexPage
