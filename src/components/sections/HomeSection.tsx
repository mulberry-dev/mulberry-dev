"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import ScrollScene from "@/components/ui/ScrollScene"
import SiteIcon, { type SiteIconName } from "@/components/ui/SiteIcon"
import TypeCopy from "@/components/terminal/TypeCopy"
import { useParticles } from "@/components/particles"
import { links } from "@/data/navegation"
import { SITE_LOGO, SITE_NAME } from "@/data/site"
import { useI18n } from "@/i18n/useI18n"
import { isHomePath } from "@/lib/locale"
import Image from "next/image"
import Link from "next/link"
import { SECTION_CHANGE_EVENT } from "@/lib/sectionNav"
import {
  HOME_CHROME_REVEALED_EVENT,
  isHomeChromeRevealed,
  markHomeChromeRevealed
} from "@/lib/siteSession"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"

const ORBIT_HOVER_RATE = 0.35
const BEAT_COUNT = 3
const VALUE_ICONS: SiteIconName[] = ["ruler", "layers", "target", "route"]
const NEXT_SECTION_PATH = links.find((link) => link.path !== "/")?.path ?? "/skills"
const MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const setOrbitRate = (node: HTMLDivElement, rate: number) => {
  node.getAnimations().forEach((animation) => {
    if ((animation as CSSAnimation).animationName === "orbitSpin") {
      animation.playbackRate = rate
    }
  })
}

const beatClass = (index: number, active: number, layered: boolean) => {
  if (!layered) {
    return "home-beat is-flat"
  }

  if (index === active) {
    return "home-beat is-on"
  }

  if (index < active) {
    return "home-beat is-past"
  }

  return "home-beat is-next"
}

const HomeOrbit = () => (
  <div className="home-hero__visual" aria-hidden="true">
    <div
      className="home-orbit"
      onPointerEnter={(event) => setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)}
      onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
    >
      <span className="home-orbit__node" />
    </div>
    <div
      className="home-orbit home-orbit--inner"
      onPointerEnter={(event) => setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)}
      onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
    >
      <span className="home-orbit__node home-orbit__node--purple" />
    </div>
  </div>
)

const HomeProgress = ({
  active,
  visible,
  labels
}: {
  active: number
  visible: boolean
  labels: string[]
}) => (
  <div
    className={visible ? "home-progress is-held" : "home-progress"}
    role="group"
    aria-label={labels[0]}
  >
    {Array.from({ length: BEAT_COUNT }, (_, index) => (
      <span
        key={labels[index + 1] ?? index}
        className={
          index === active
            ? "home-progress__dot is-active"
            : index < active
              ? "home-progress__dot is-done"
              : "home-progress__dot"
        }
        aria-current={index === active ? "step" : undefined}
        title={labels[index + 1]}
      />
    ))}
  </div>
)

const HomeBeats = ({
  active,
  layered,
  showProgress,
  introComplete,
  beatLabels
}: {
  active: number
  layered: boolean
  showProgress: boolean
  introComplete: boolean
  beatLabels: string[]
}) => {
  const { t, href } = useI18n()

  return (
    <div className="home-hero">
      <HomeOrbit />

      <div className="home-hero__stage">
        <div
          className={beatClass(0, active, layered)}
          aria-hidden={layered && active !== 0 ? true : undefined}
        >
          <div className="home-beat__inner home-beat__inner--brand">
            <Image
              className="home-hero__logo home-hero__logo--hero site-logo"
              src={SITE_LOGO}
              width={254}
              height={176}
              alt={SITE_NAME}
              sizes="(max-width: 767px) 42vw, 220px"
              quality={80}
              priority
            />
            <p
              className="home-hero__wordmark"
              aria-hidden="true"
              style={{ "--wordmark-chars": SITE_NAME.length } as CSSProperties}
            >
              <span className="home-hero__wordmark-text">{SITE_NAME}</span>
              <span className="home-hero__wordmark-caret" />
            </p>
          </div>
        </div>

        <div
          className={beatClass(1, active, layered)}
          aria-hidden={layered && active !== 1 ? true : undefined}
        >
          <div className="home-beat__inner home-beat__inner--identity">
            <p className="home-hero__hello">
              <TypeCopy
                parts={[
                  { text: `${t.home.greeting} ` },
                  { text: t.home.name, className: "gradient-text home-hero__name" }
                ]}
              />
            </p>
            <p className="home-hero__role">
              <span className="home-hero__bracket">&lt;</span>{" "}
              <TypeCopy
                parts={[
                  { text: t.home.roleLead, className: "home-hero__teal" },
                  { text: " " },
                  { text: t.home.roleTrail, className: "home-hero__purple" }
                ]}
              />{" "}
              <span className="home-hero__bracket">/ &gt;</span>
            </p>
          </div>
        </div>

        <div
          className={beatClass(2, active, layered)}
          aria-hidden={layered && active !== 2 ? true : undefined}
        >
          <div className="home-beat__inner home-beat__inner--offer">
            <h1 className="home-hero__headline">
              <TypeCopy text={t.home.headline} block />
            </h1>
            <p className="home-hero__body">
              <TypeCopy text={t.home.body} />
              <span className="home-hero__caret" aria-hidden="true">
                _
              </span>
            </p>
            <div className="home-hero__actions">
              <Button href={href(NEXT_SECTION_PATH)} variant="terminal">
                <TypeCopy text={t.home.cta} />
              </Button>
              <Button href={href("/portfolio")} variant="secondary">
                <TypeCopy text={t.home.ctaSecondary} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <HomeProgress active={active} visible={showProgress} labels={beatLabels} />

      <Link
        href={href(NEXT_SECTION_PATH)}
        scroll={false}
        className={
          introComplete || (layered && active >= BEAT_COUNT - 1)
            ? "home-scroll is-ready"
            : layered
              ? "home-scroll is-ready is-continue"
              : "home-scroll is-ready"
        }
      >
        <span>
          {layered && active < BEAT_COUNT - 1 ? t.home.scrollContinue : t.home.scrollCue}
        </span>
      </Link>
    </div>
  )
}

const VALUE_VISIBLE_RATIO = 0.3
const VALUE_FAILSAFE_MS = 1800

const HomeValueGrid = ({
  items,
  ready,
  reducedMotion
}: {
  items: { title: string; text: string }[]
  ready: boolean
  reducedMotion: boolean
}) => {
  const ref = useRef<HTMLUListElement | null>(null)
  const [inView, setInView] = useState(false)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (played || !node) {
      return
    }

    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    // A tall grid on short screens may never reach 30% of its own height, so also accept 30% of the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting &&
          (entry.intersectionRatio >= VALUE_VISIBLE_RATIO ||
            entry.intersectionRect.height >= window.innerHeight * VALUE_VISIBLE_RATIO)
        setInView(visible)
      },
      { threshold: [0, 0.1, 0.2, VALUE_VISIBLE_RATIO, 0.5] }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [played])

  useEffect(() => {
    if (played) {
      return
    }

    if (reducedMotion || (inView && ready)) {
      setPlayed(true)
      return
    }

    if (!inView) {
      return
    }

    // The grid is on screen but the intro gate never opened; never leave the cards hidden.
    const failsafe = window.setTimeout(() => setPlayed(true), VALUE_FAILSAFE_MS)
    return () => window.clearTimeout(failsafe)
  }, [inView, played, ready, reducedMotion])

  return (
    <ul ref={ref} className={played ? "home-value__grid is-played" : "home-value__grid"}>
      {items.map((item, index) => (
        <li key={item.title} className="home-value__item">
          <span className="home-value__icon" aria-hidden="true">
            <SiteIcon name={VALUE_ICONS[index] ?? "puzzle"} />
          </span>
          <h2>
            <TypeCopy text={item.title} />
          </h2>
          <p>
            <TypeCopy text={item.text} />
          </p>
        </li>
      ))}
    </ul>
  )
}

const HomeSceneFrame = ({
  active,
  introComplete,
  beatLabels,
  onFrame
}: {
  active: number
  introComplete: boolean
  beatLabels: string[]
  onFrame: (active: number) => void
}) => {
  useEffect(() => {
    onFrame(active)
  }, [active, onFrame])

  return (
    <Container className="home-page">
      <HomeBeats
        active={active}
        layered
        showProgress
        introComplete={introComplete}
        beatLabels={beatLabels}
      />
    </Container>
  )
}

const IndexPage = () => {
  const pathname = usePathname()
  const { t } = useI18n()
  const { contentReady, reducedMotion } = useParticles()
  const [sequenceMode, setSequenceMode] = useState<"wait" | "scene" | "static">("wait")
  const [introComplete, setIntroComplete] = useState(false)
  const [introPlay, setIntroPlay] = useState(false)
  const chromeRevealedRef = useRef(false)

  const revealChrome = useCallback(() => {
    if (isHomeChromeRevealed()) {
      chromeRevealedRef.current = true
      return false
    }

    markHomeChromeRevealed()
    chromeRevealedRef.current = true
    window.dispatchEvent(new Event(HOME_CHROME_REVEALED_EVENT))
    return true
  }, [])

  const onFrame = useCallback(
    (active: number) => {
      if (active >= 1 && !chromeRevealedRef.current) {
        revealChrome()
      }

      if (active >= BEAT_COUNT - 1) {
        setIntroComplete(true)
      }
    },
    [revealChrome]
  )

  useEffect(() => {
    const prefersReduced =
      reducedMotion || window.matchMedia(MOTION_QUERY).matches

    // Keep the scroll-held beat scene for every motion visit — including
    // return trips and scroll-back — so reverse scroll never collapses into
    // a stacked dump of all beats.
    setSequenceMode(prefersReduced ? "static" : "scene")

    if (prefersReduced) {
      setIntroComplete(true)
      revealChrome()
    }
  }, [reducedMotion, revealChrome])

  // Wait two frames so the held scene settles while hidden before the intro plays.
  useEffect(() => {
    if (sequenceMode !== "scene") {
      return
    }

    let inner = 0
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setIntroPlay(true))
    })

    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
    }
  }, [sequenceMode])

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      const path = (event as CustomEvent<{ path?: string }>).detail?.path

      if (path && path !== "/") {
        revealChrome()
        setIntroComplete(true)
      }
    }

    window.addEventListener(SECTION_CHANGE_EVENT, onSectionChange)
    return () => window.removeEventListener(SECTION_CHANGE_EVENT, onSectionChange)
  }, [revealChrome])

  useEffect(() => {
    if (!isHomePath(pathname)) {
      setIntroComplete(true)
      revealChrome()
    }
  }, [pathname, revealChrome])

  const beatLabels = [
    t.home.beatProgress,
    t.home.beatBrand,
    t.home.beatIdentity,
    t.home.beatOffer
  ]

  const revealReady =
    contentReady &&
    (sequenceMode === "static" || (sequenceMode === "scene" && introPlay))

  const introClass = [
    "home-intro",
    revealReady ? "is-reveal-ready" : "is-reveal-wait",
    revealReady && sequenceMode === "scene" ? "is-intro-play" : "",
    introComplete ? "is-complete" : "",
    sequenceMode === "static" ? "is-static" : "is-sequenced"
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
      {sequenceMode === "scene" ? (
        <ScrollScene frames={BEAT_COUNT} holdFrom={0} className="home-intro-scene">
          {(active) => (
            <HomeSceneFrame
              active={active}
              introComplete={introComplete}
              beatLabels={beatLabels}
              onFrame={onFrame}
            />
          )}
        </ScrollScene>
      ) : (
        <Container className="home-page">
          <HomeBeats
            active={sequenceMode === "static" ? BEAT_COUNT - 1 : 0}
            layered
            showProgress={false}
            introComplete={introComplete}
            beatLabels={beatLabels}
          />
        </Container>
      )}

      <Container className="home-page home-page--value">
        <RevealGroup className="home-value" mode="scroll">
          <Reveal type="eyebrow" as="p" className="home-value__eyebrow">
            <TypeCopy text={t.home.valueEyebrow} />
          </Reveal>
          <HomeValueGrid
            items={t.home.value}
            ready={revealReady && introComplete}
            reducedMotion={reducedMotion}
          />
        </RevealGroup>
      </Container>
    </section>
  )
}

export default IndexPage
