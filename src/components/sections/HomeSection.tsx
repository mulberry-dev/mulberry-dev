"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import { useParticles } from "@/components/particles"
import { SECTION_CHANGE_EVENT } from "@/lib/sectionNav"
import {
  didLeaveHome,
  isHomeChromeRevealed,
  markHomeChromeRevealed,
  shouldRevealHomeChrome
} from "@/lib/siteSession"
import { usePathname } from "next/navigation"
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode
} from "react"

const ABOUT_SHORT =
  "I build thoughtful digital products across frontend, backend, and everything in between."

const ORBIT_HOVER_RATE = 0.35
const INTRO_COMPLETE_MS = 1780
const HOME_CHROME_NAV_MS = 480

type HomeChromePhase = "wait" | "nav" | "shown"

const chromeClassName = (phase: HomeChromePhase) => {
  if (phase === "wait") {
    return "home-chrome-wait"
  }

  if (phase === "nav") {
    return "home-chrome-nav"
  }

  return ""
}

const RevealChars = ({
  children,
  delay = 0
}: {
  children: ReactNode
  delay?: number
}) => {
  let index = 0

  const paint = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return Array.from(String(child)).map((char) => {
          const i = index++
          return (
            <span
              key={i}
              className="home-hero__char"
              style={
                {
                  "--i": i,
                  "--reveal-delay": `${delay}s`
                } as CSSProperties
              }
            >
              {char}
            </span>
          )
        })
      }

      if (isValidElement(child)) {
        const element = child as ReactElement<{ children?: ReactNode }>
        return cloneElement(element, undefined, paint(element.props.children))
      }

      return child
    })

  return <>{paint(children)}</>
}

const setOrbitRate = (node: HTMLDivElement, rate: number) => {
  node.getAnimations().forEach((animation) => {
    animation.playbackRate = rate
  })
}

const IndexPage = () => {
  const pathname = usePathname()
  const { contentReady, reducedMotion } = useParticles()
  const [isFirstHome] = useState(() => !didLeaveHome())
  const [introComplete, setIntroComplete] = useState(false)
  const [chromePhase, setChromePhase] = useState<HomeChromePhase>(() => {
    if (!shouldRevealHomeChrome()) {
      return "wait"
    }

    markHomeChromeRevealed()
    return "shown"
  })

  const revealChrome = useCallback(() => {
    if (isHomeChromeRevealed()) {
      return false
    }

    markHomeChromeRevealed()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setChromePhase(reduced ? "shown" : "nav")
    window.dispatchEvent(new Event("site:home-chrome-revealed"))
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
    if (pathname !== "/" || shouldRevealHomeChrome() || window.scrollY > 1) {
      if (!isHomeChromeRevealed()) {
        markHomeChromeRevealed()
      }

      setChromePhase((current) => (current === "wait" ? "shown" : current))
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

  useEffect(() => {
    if (chromePhase !== "nav") {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setChromePhase("shown")
    }, HOME_CHROME_NAV_MS)

    return () => window.clearTimeout(timeoutId)
  }, [chromePhase])

  const introClass = [
    "home-intro",
    isFirstHome ? "" : "is-return",
    contentReady ? "is-reveal-ready" : "is-reveal-wait",
    introComplete ? "is-complete" : "",
    chromeClassName(chromePhase)
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      id="index"
      className={introClass || undefined}
      data-section-path="/"
      aria-label="Home"
      tabIndex={-1}
    >
      <Container className="home-page">
        <div className="home-hero">
          <div className="home-hero__copy">
            <h1 aria-label="Hi! I am Santiago">
              <span aria-hidden="true">
                <RevealChars delay={0.1}>Hi! I am </RevealChars>
                <span className="gradient-text home-hero__name">Santiago</span>
              </span>
            </h1>
            <p className="home-hero__role" aria-label="< Senior Full Stack Engineer />">
              <span aria-hidden="true">
                <RevealChars delay={0.34}>
                  <span className="home-hero__bracket">&lt;</span>{" "}
                  <span className="home-hero__teal">Senior Full Stack</span>{" "}
                  <span className="home-hero__purple">Engineer</span>{" "}
                  <span className="home-hero__bracket">/&gt;</span>
                </RevealChars>
              </span>
            </p>
            <p className="home-hero__body">{ABOUT_SHORT}</p>
            <div className="home-hero__actions">
              {/* <Button href="/portfolio">View my work →</Button> */}
              <Button href="/about" variant="secondary">
                About me
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
