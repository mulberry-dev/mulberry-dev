"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import PageTitle from "@/components/PageTitle"
import TechMarquee from "@/components/TechMarquee"
import { didLeaveHome } from "@/components/navigation"
import { LINKEDIN_URL } from "@/data/site"
import Image from "next/image"
import Link from "next/link"
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode
} from "react"

const ABOUT_SHORT =
  "I am a programmer who has a deep love for coding and technology. My passion extends to UX & UI design, I consider myself an expert in Frontend and a devoted enthusiast of Backend."

const ORBIT_HOVER_RATE = 0.35
const INTRO_COMPLETE_MS = 1780
const HOME_CHROME_NAV_MS = 620

let homeChromeRevealed = false

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
  const [introComplete, setIntroComplete] = useState(false)
  const [chromePhase, setChromePhase] = useState<HomeChromePhase>(() =>
    homeChromeRevealed || didLeaveHome() ? "shown" : "wait"
  )

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroComplete(true)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIntroComplete(true)
    }, INTRO_COMPLETE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (homeChromeRevealed || didLeaveHome()) {
      homeChromeRevealed = true
      setChromePhase("shown")
      return
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (window.scrollY > 1) {
      homeChromeRevealed = true
      setChromePhase("shown")
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

      revealChrome()
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
        revealChrome()
      }
    }

    const revealChrome = () => {
      if (homeChromeRevealed) {
        return
      }

      homeChromeRevealed = true
      window.removeEventListener("wheel", onFirstScroll)
      window.removeEventListener("touchmove", onFirstScroll)
      window.removeEventListener("scroll", onFirstScroll)
      window.removeEventListener("keydown", onFirstKeyScroll)
      setChromePhase(reducedMotion ? "shown" : "nav")
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
  }, [])

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
    introComplete ? "is-complete" : "",
    chromeClassName(chromePhase)
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section id="index" className={introClass || undefined}>
      <PageTitle title="Home" />
      <Container className="home-page">
        <div className="home-hero">
          <div className="home-hero__copy">
            <h1 aria-label="Hi! I am Santiago">
              <span aria-hidden="true">
                <RevealChars delay={0.1}>Hi! I am </RevealChars>
                <span className="gradient-text home-hero__name">Santiago</span>
              </span>
            </h1>
            <p className="home-hero__role" aria-label="< Full Stack Developer />">
              <span aria-hidden="true">
                <RevealChars delay={0.34}>
                  <span className="home-hero__bracket">&lt;</span>{" "}
                  <span className="home-hero__teal">Full Stack</span>{" "}
                  <span className="home-hero__purple">Developer</span>{" "}
                  <span className="home-hero__bracket">/&gt;</span>
                </RevealChars>
              </span>
            </p>
            <p className="home-hero__body">{ABOUT_SHORT}</p>
            <div className="home-hero__actions">
              <Button href="/portfolio">View my work →</Button>
              <Button href="/about" variant="secondary">
                About me
              </Button>
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="home-orbit-stage">
              <div
                className="home-orbit"
                aria-hidden="true"
                onPointerEnter={(event) =>
                  setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)
                }
                onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
              />
            </div>
            <div className="home-orbit-stage home-orbit-stage--inner">
              <div
                className="home-orbit home-orbit--inner"
                aria-hidden="true"
                onPointerEnter={(event) =>
                  setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)
                }
                onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
              />
            </div>
            <div className="home-hero__portrait">
              <Image
                src="/images/Webp/santi-dark-theme.webp"
                alt="Santiago"
                width={320}
                height={320}
                priority
                className="home-avatar home-avatar--dark"
              />
              <Image
                src="/images/Webp/santi-light-theme.webp"
                alt="Santiago"
                width={320}
                height={320}
                priority
                className="home-avatar home-avatar--light"
              />
            </div>
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="home-social"
              aria-label="LinkedIn"
            >
              in
            </Link>
          </div>
        </div>
      </Container>
      <TechMarquee />
    </section>
  )
}

export default IndexPage
