"use client"

import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import PageCta from "@/components/ui/PageCta"
import PageTitle from "@/components/PageTitle"
import { ABOUT_INTRO, HOW_I_WORK, VALUES } from "@/data/about"
import Image from "next/image"
import { ReactNode, useEffect, useRef, useState } from "react"

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
            <p className="about-intro__aside">{ABOUT_INTRO.aside}</p>
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
              width={400}
              height={400}
              priority
              className="about-portrait__img about-portrait__img--dark"
            />
            <Image
              src="/images/Webp/santi-light-theme.webp"
              alt="Santiago"
              width={400}
              height={400}
              priority
              className="about-portrait__img about-portrait__img--light"
            />
          </div>
        </div>

        <Reveal className="about-values">
          <SectionKicker kicker="How I think" title="What I protect in the work" />
          <ul className="about-values__list">
            {VALUES.map((item) => (
              <li key={item.title}>
                <p className="about-values__title">{item.title}</p>
                <p className="about-values__label">{item.label}</p>
                <p className="about-values__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about-process">
          <SectionKicker kicker="How I work" title="A calm path from problem to product" />
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

        <PageCta />
      </Container>
    </section>
  )
}

export default About
