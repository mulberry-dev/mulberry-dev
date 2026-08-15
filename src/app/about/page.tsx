"use client"

import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import PageTitle from "@/components/PageTitle"
import {
  ABOUT_INTRO,
  FOCUS,
  HOW_I_WORK,
  PROFILE,
  TECH_GROUPS,
  WHAT_I_DO
} from "@/data/about"
import { skills } from "@/data/skills"
import Image from "next/image"
import { ReactNode, SVGProps, useEffect, useRef, useState } from "react"

const iconProps: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true
}

const LineIcon = ({ name }: { name: (typeof WHAT_I_DO)[number]["icon"] }) => {
  switch (name) {
    case "frontend":
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 8.5h18" />
        </svg>
      )
    case "backend":
      return (
        <svg {...iconProps}>
          <rect x="4" y="3.5" width="16" height="4.5" rx="1" />
          <rect x="4" y="9.75" width="16" height="4.5" rx="1" />
          <rect x="4" y="16" width="16" height="4.5" rx="1" />
        </svg>
      )
    case "fullstack":
      return (
        <svg {...iconProps}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
          <rect x="7.5" y="7.5" width="9" height="9" rx="1" />
        </svg>
      )
    case "ux":
      return (
        <svg {...iconProps}>
          <path d="M4 8.5V4h4.5" />
          <path d="M15.5 4H20v4.5" />
          <path d="M20 15.5V20h-4.5" />
          <path d="M8.5 20H4v-4.5" />
          <circle cx="12" cy="12" r="2.25" />
        </svg>
      )
    case "api":
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="12" r="2.25" />
          <circle cx="18" cy="6" r="2.25" />
          <circle cx="18" cy="18" r="2.25" />
          <path d="M8.1 10.7l5.8-3.4" />
          <path d="M8.1 13.3l5.8 3.4" />
        </svg>
      )
    case "performance":
      return (
        <svg {...iconProps}>
          <path d="M3.5 16.5 8 11l3.5 3.5 4.5-7 4.5 3" />
        </svg>
      )
  }
}

const Reveal = ({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(node)
    setEnabled(true)

    return () => observer.disconnect()
  }, [])

  const stateClass = [
    enabled ? "is-enabled" : "",
    visible ? "is-visible" : ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div ref={ref} className={`about-reveal ${stateClass} ${className}`.trim()}>
      {children}
    </div>
  )
}

const SectionKicker = ({
  kicker,
  title
}: {
  kicker: string
  title: string
}) => (
  <header className="about-kicker">
    <p>{kicker}</p>
    <h2>{title}</h2>
  </header>
)

const About = () => {
  return (
    <section id="about" className="page-fade">
      <PageTitle title="About Me" />
      <Container className="about-page">
        <div className="about-intro">
          <div className="about-intro__copy">
            <Badge>{ABOUT_INTRO.badge}</Badge>
            <h1>
              {ABOUT_INTRO.greeting}{" "}
              <span className="gradient-text">{ABOUT_INTRO.name}</span>
            </h1>
            <p className="about-intro__role">
              <span className="about-intro__bracket">&lt;</span>{" "}
              <span className="about-intro__teal">Full Stack</span>{" "}
              <span className="about-intro__purple">Developer</span>{" "}
              <span className="about-intro__bracket">/&gt;</span>
            </p>
            <p className="about-intro__body">{ABOUT_INTRO.body}</p>
          </div>

          <div className="about-portrait">
            <div className="about-portrait__ring" aria-hidden="true" />
            <div
              className="about-portrait__ring about-portrait__ring--inner"
              aria-hidden="true"
            />
            <Image
              src="/images/Webp/santi-dark-theme.webp"
              alt="Santiago"
              width={320}
              height={320}
              priority
              className="about-portrait__img about-portrait__img--dark"
            />
            <Image
              src="/images/Webp/santi-light-theme.webp"
              alt="Santiago"
              width={320}
              height={320}
              priority
              className="about-portrait__img about-portrait__img--light"
            />
          </div>
        </div>

        <Reveal className="about-profile">
          <SectionKicker kicker="Profile" title="How I show up in the work" />
          <ul className="about-profile__list">
            {PROFILE.map((item) => (
              <li key={item.title}>
                <p className="about-profile__title">{item.title}</p>
                <p className="about-profile__label">{item.label}</p>
                <p className="about-profile__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about-do">
          <SectionKicker kicker="What I do" title="The work, in practice" />
          <ul className="about-do__grid">
            {WHAT_I_DO.map((item) => (
              <li key={item.title} className="about-do__item">
                <span className="about-do__icon">
                  <LineIcon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about-process">
          <SectionKicker kicker="How I work" title="From problem to product" />
          <ol className="about-process__list">
            {HOW_I_WORK.map((item) => (
              <li key={item.step}>
                <span className="about-process__step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="about-tech">
          <SectionKicker kicker="Technology" title="The tools behind the work" />
          <ul className="about-tech__groups">
            {TECH_GROUPS.map((group) => (
              <li key={group.id}>
                <p className="about-tech__label">{group.label}</p>
                <p className="about-tech__items">
                  {skills
                    .filter((skill) => skill.category === group.id)
                    .map((skill) => skill.name)
                    .join(" · ")}
                </p>
              </li>
            ))}
          </ul>
          <Button href="/skills" variant="ghost" className="about-tech__link">
            See the full stack →
          </Button>
        </Reveal>

        <Reveal className="about-focus">
          <SectionKicker kicker="Focus" title="The problems I like to solve" />
          <ul className="about-focus__list">
            {FOCUS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about-close">
          <h2>Let's keep building.</h2>
          <p>See the work, or start a conversation.</p>
          <div className="about-close__actions">
            <Button href="/portfolio">View my work →</Button>
            <Button href="/contact" variant="secondary">
              Let's talk
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default About
