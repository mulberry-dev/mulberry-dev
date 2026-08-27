"use client"

import AboutPortrait from "@/components/about/AboutPortrait"
import PageTitle from "@/components/PageTitle"
import Container from "@/components/ui/Container"
import PageCta from "@/components/ui/PageCta"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon, { SiteIconName } from "@/components/ui/SiteIcon"
import {
  ABOUT_APPROACH,
  ABOUT_BACKEND,
  ABOUT_BRIDGE,
  ABOUT_FOOTER,
  ABOUT_FRONTEND,
  ABOUT_HOST,
  ABOUT_INITIALS,
  ABOUT_INTRO,
  ABOUT_LOCATION_SHORT,
  ABOUT_PASSIONS,
  ABOUT_PATH,
  ABOUT_SECTIONS,
  ABOUT_WHOAMI
} from "@/data/about"
import Link from "next/link"
import { useEffect, useState } from "react"

const Prompt = ({
  command,
  cursor = false
}: {
  command: string
  cursor?: boolean
}) => (
  <p className="about-prompt">
    <span className="about-prompt__cash">$</span>
    <span> {command}</span>
    {cursor ? <span className="about-cursor" aria-hidden="true" /> : null}
  </p>
)

const SessionPrompt = ({ cursor = false }: { cursor?: boolean }) => (
  <p className="about-session">
    <span className="about-session__host">{ABOUT_HOST}</span>
    <span className="about-session__colon">:</span>
    <span className="about-session__path">{ABOUT_PATH}</span>
    <span className="about-session__cash">$</span>
    {cursor ? <span className="about-cursor" aria-hidden="true" /> : null}
  </p>
)

const FocusList = ({
  items
}: {
  items: { icon: SiteIconName; label: string }[]
}) => (
  <ul className="about-focus">
    {items.map((item) => (
      <li key={item.label}>
        <span className="about-focus__icon" aria-hidden="true">
          <SiteIcon name={item.icon} />
        </span>
        <span>{item.label}</span>
      </li>
    ))}
  </ul>
)

const About = () => {
  const [active, setActive] = useState<string>(ABOUT_SECTIONS[0].id)

  useEffect(() => {
    const nodes = ABOUT_SECTIONS.map((section) =>
      document.getElementById(section.id)
    ).filter((node): node is HTMLElement => Boolean(node))

    if (!nodes.length) {
      return
    }

    const update = () => {
      if (window.scrollY < 20) {
        setActive(ABOUT_SECTIONS[0].id)
        return
      }

      const marker = window.innerHeight * 0.34
      let current = nodes[0].id

      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= marker) {
          current = node.id
        }
      }

      setActive(current)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const goToSection = (id: string) => {
    const node = document.getElementById(id)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start"
    })
    if (node) {
      node.classList.remove("is-targeted")
      void node.offsetWidth
      node.classList.add("is-targeted")
    }
    setActive(id)
  }

  return (
    <section id="about">
      <PageTitle title="About Me" />
      <Container className="about-page">
        <div className="about-terminal">
          <nav className="about-rail" aria-label="On this page">
            {ABOUT_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  active === section.id
                    ? "about-rail__item is-active"
                    : "about-rail__item"
                }
                onClick={() => goToSection(section.id)}
                aria-current={active === section.id ? "true" : undefined}
              >
                <span className="about-rail__index">{section.index}</span>
                <span className="about-rail__label">{section.label}</span>
              </button>
            ))}
          </nav>

          <header className="about-chrome">
            <SessionPrompt />
            <p className="about-chrome__place">
              <span className="about-chrome__dot" aria-hidden="true" />
              {ABOUT_LOCATION_SHORT}
            </p>
          </header>

          <div className="about-identity">
            <RevealGroup className="about-intro" mode="fold" stagger={70}>
              <div id="about-intro" data-about-section="intro">
                <Reveal type="eyebrow">
                  <Prompt command={ABOUT_INTRO.command} cursor />
                </Reveal>
                <Reveal type="heading" as="h1" className="about-headline">
                  {ABOUT_INTRO.headline.map((line, index) => (
                    <span
                      key={line}
                      className={
                        index >= ABOUT_INTRO.accentFrom
                          ? "about-headline__line is-accent"
                          : "about-headline__line"
                      }
                    >
                      {line}
                    </span>
                  ))}
                </Reveal>
                <Reveal type="text" className="about-intro__body" as="p">
                  {ABOUT_INTRO.body.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </Reveal>
              </div>
            </RevealGroup>

            <Reveal type="image" mode="fold" delay={120} className="about-photo">
              <AboutPortrait />
            </Reveal>

            <RevealGroup className="about-meta" mode="fold" stagger={56}>
              <div id="about-identity" data-about-section="identity">
                <Reveal type="eyebrow">
                  <Prompt command={ABOUT_WHOAMI.command} cursor />
                </Reveal>
                <Reveal type="text" as="p" className="about-whoami__name">
                  {ABOUT_WHOAMI.name}
                </Reveal>
                <Reveal type="text" as="p" className="about-whoami__role">
                  {ABOUT_WHOAMI.comment}
                </Reveal>
                <Reveal type="text" as="p" className="about-whoami__place">
                  <span aria-hidden="true">
                    <SiteIcon name="pin" />
                  </span>
                  {ABOUT_WHOAMI.location}
                </Reveal>
              </div>

              <div className="about-passions">
                <Reveal type="eyebrow">
                  <Prompt command="passions" />
                </Reveal>
                <ul>
                  {ABOUT_PASSIONS.map((item) => (
                    <Reveal key={item.label} as="li" type="chip">
                      <span className="about-passions__icon" aria-hidden="true">
                        <SiteIcon name={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </RevealGroup>
          </div>

          <RevealGroup className="about-bridge" mode="scroll" stagger={64}>
            <div id="about-frontend" className="about-pane about-pane--front">
              <Reveal type="card">
              <Prompt command={ABOUT_FRONTEND.command} />
              <div className="about-pane__body">
                <div className="about-wire" aria-hidden="true">
                  <div className="about-wire__bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="about-wire__hero" />
                  <div className="about-wire__grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div>
                  <p className="about-pane__kicker">{ABOUT_FRONTEND.kicker}</p>
                  <FocusList items={ABOUT_FRONTEND.items} />
                  <p className="about-pane__context">
                    {ABOUT_FRONTEND.context.join(" · ")}
                  </p>
                </div>
              </div>
              </Reveal>
            </div>

            <Reveal type="decorative" className="about-core">
              <span className="about-core__line about-core__line--left" />
              <div className="about-core__copy">
                <span>{ABOUT_BRIDGE.overline}</span>
                <span>{ABOUT_BRIDGE.title}</span>
                <span className="about-core__mark">&lt;/&gt;</span>
                <strong>{ABOUT_BRIDGE.label}</strong>
              </div>
              <span className="about-core__line about-core__line--right" />
            </Reveal>

            <div id="about-backend" className="about-pane about-pane--back">
              <Reveal type="card">
              <Prompt command={ABOUT_BACKEND.command} />
              <div className="about-pane__body about-pane__body--back">
                <div>
                  <p className="about-pane__kicker">{ABOUT_BACKEND.kicker}</p>
                  <FocusList items={ABOUT_BACKEND.items} />
                  <p className="about-pane__context">
                    {ABOUT_BACKEND.context.join(" · ")}
                  </p>
                </div>
                <div className="about-code" aria-hidden="true">
                  <div className="about-code__bar">
                    <span>service.ts</span>
                  </div>
                  <pre>
                    <code>
                      <span className="is-comment">
                        {ABOUT_BACKEND.snippet[0].text}
                      </span>
                      {"\n"}
                      <span className="is-kw">const </span>
                      <span className="is-fn">ship</span>
                      {" = "}
                      <span className="is-kw">async </span>
                      {"(req) => {\n"}
                      {"  const data = await service.run(req)\n"}
                      {"  return db.save(data)\n"}
                      {"}"}
                    </code>
                  </pre>
                  <p className="about-flow">
                    {ABOUT_BACKEND.flow.map((step, index) => (
                      <span key={step}>
                        {index > 0 ? (
                          <span className="about-flow__arrow">→</span>
                        ) : null}
                        {step}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              </Reveal>
            </div>
          </RevealGroup>

          <RevealGroup className="about-approach" mode="scroll" stagger={56}>
            <div id="about-approach" data-about-section="approach">
              <Reveal type="eyebrow">
                <Prompt command={ABOUT_APPROACH.command} cursor />
              </Reveal>
              <Reveal type="heading" as="blockquote" className="about-quote">
                {ABOUT_APPROACH.quote.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </Reveal>
            </div>
            <Reveal type="card" className="about-ritual">
              {ABOUT_APPROACH.ritual.map((item) => (
                <p key={item.label} className="about-ritual__item">
                  <span className="about-ritual__icon" aria-hidden="true">
                    <SiteIcon name={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </p>
              ))}
            </Reveal>
          </RevealGroup>

          <footer className="about-foot">
            <span className="about-foot__mark">{ABOUT_INITIALS}</span>
            <SessionPrompt cursor />
            <Link href={ABOUT_FOOTER.href} className="about-talk">
              <span>{ABOUT_FOOTER.question}</span>
              <span className="about-talk__arrow" aria-hidden="true">
                -&gt;
              </span>
              <span className="about-talk__cmd">[ {ABOUT_FOOTER.action} ]</span>
            </Link>
          </footer>
        </div>

        <PageCta />
      </Container>
    </section>
  )
}

export default About
