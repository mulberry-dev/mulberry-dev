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
  didLeaveHome,
  HOME_CHROME_REVEALED_EVENT,
  isHomeChromeRevealed,
  markHomeChromeRevealed,
  shouldRevealHomeChrome
} from "@/lib/siteSession"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

const ORBIT_HOVER_RATE = 0.35
const BEAT_COUNT = 3
const VALUE_ICONS: SiteIconName[] = ["ruler", "layers", "target", "route"]
const NEXT_SECTION_PATH = links.find((link) => link.path !== "/")?.path ?? "/skills"

const setOrbitRate = (node: HTMLDivElement, rate: number) => {
  node.getAnimations().forEach((animation) => {
    animation.playbackRate = rate
  })
}

const beatClass = (index: number, active: number, held: boolean) => {
  if (!held) {
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
  held,
  labels
}: {
  active: number
  held: boolean
  labels: string[]
}) => (
  <div
    className={held ? "home-progress is-held" : "home-progress"}
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
  held,
  introComplete,
  beatLabels
}: {
  active: number
  held: boolean
  introComplete: boolean
  beatLabels: string[]
}) => {
  const { t, href } = useI18n()

  return (
    <div className="home-hero">
      <HomeOrbit />

      <div className="home-hero__stage">
        <div
          className={beatClass(0, active, held)}
          aria-hidden={held && active !== 0 ? true : undefined}
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
          </div>
        </div>

        <div
          className={beatClass(1, active, held)}
          aria-hidden={held && active !== 1 ? true : undefined}
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
          className={beatClass(2, active, held)}
          aria-hidden={held && active !== 2 ? true : undefined}
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

      <HomeProgress active={active} held={held} labels={beatLabels} />

      <Link
        href={href(NEXT_SECTION_PATH)}
        scroll={false}
        className={
          introComplete || (held && active >= BEAT_COUNT - 1)
            ? "home-scroll is-ready"
            : held
              ? "home-scroll is-ready is-continue"
              : "home-scroll"
        }
      >
        <span>
          {held && active < BEAT_COUNT - 1 ? t.home.scrollContinue : t.home.scrollCue}
        </span>
      </Link>
    </div>
  )
}

const HomeSceneFrame = ({
  active,
  held,
  introComplete,
  beatLabels,
  onFrame
}: {
  active: number
  held: boolean
  introComplete: boolean
  beatLabels: string[]
  onFrame: (active: number, held: boolean) => void
}) => {
  useEffect(() => {
    onFrame(active, held)
  }, [active, held, onFrame])

  return (
    <Container className="home-page">
      <HomeBeats
        active={active}
        held={held}
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
  const chromeRevealedRef = useRef(false)
  const seenHeldRef = useRef(false)

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
    (active: number, held: boolean) => {
      // ScrollScene mounts with held=false until the first measure; ignore that flash.
      if (held) {
        seenHeldRef.current = true

        if (active >= 1 && !chromeRevealedRef.current) {
          revealChrome()
        }

        if (active >= BEAT_COUNT - 1) {
          setIntroComplete(true)
        }

        return
      }

      if (!seenHeldRef.current) {
        return
      }

      setIntroComplete(true)
      revealChrome()
    },
    [revealChrome]
  )

  useEffect(() => {
    const skip =
      didLeaveHome() ||
      shouldRevealHomeChrome() ||
      isHomeChromeRevealed() ||
      window.scrollY > 1 ||
      reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    setSequenceMode(skip ? "static" : "scene")

    if (skip) {
      setIntroComplete(true)
      revealChrome()
    }
  }, [reducedMotion, revealChrome])

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

  const introClass = [
    "home-intro",
    contentReady && sequenceMode !== "wait" ? "is-reveal-ready" : "is-reveal-wait",
    introComplete ? "is-complete" : "",
    sequenceMode === "static" ? "is-static" : ""
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
          {(active, _progress, held) => (
            <HomeSceneFrame
              active={active}
              held={held}
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
            held={sequenceMode === "wait"}
            introComplete={introComplete}
            beatLabels={beatLabels}
          />
        </Container>
      )}

      <Container className="home-page home-page--value">
        <RevealGroup className="home-value" mode="scroll" stagger={220}>
          <Reveal type="eyebrow" as="p" className="home-value__eyebrow">
            <TypeCopy text={t.home.valueEyebrow} />
          </Reveal>
          <ul className="home-value__grid">
            {t.home.value.map((item, index) => (
              <Reveal key={item.title} as="li" type="card" className="home-value__item">
                <span className="home-value__icon" aria-hidden="true">
                  <SiteIcon name={VALUE_ICONS[index] ?? "puzzle"} />
                </span>
                <h2>
                  <TypeCopy text={item.title} />
                </h2>
                <p>
                  <TypeCopy text={item.text} />
                </p>
              </Reveal>
            ))}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  )
}

export default IndexPage
