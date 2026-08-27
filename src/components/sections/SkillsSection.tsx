"use client"

import Badge from "@/components/ui/Badge"
import Container from "@/components/ui/Container"
import FeatureCard from "@/components/ui/FeatureCard"
import OrbitGraphic from "@/components/ui/OrbitGraphic"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SectionKicker from "@/components/ui/SectionKicker"
import SiteIcon from "@/components/ui/SiteIcon"
import TechCategory from "@/components/ui/TechCategory"
import { useMotion } from "@/components/particles"
import { useLayoutEffect, useRef, useState } from "react"
import {
  BUILD_TRAITS,
  CAPABILITIES,
  PROBLEMS,
  TECH_CATEGORIES,
  VALUE_BLOCKS,
  WHAT_I_DO_INTRO
} from "@/data/whatIDo"

const TechMap = () => {
  const motion = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [hot, setHot] = useState(false)
  const contentReady = motion?.contentReady ?? true
  const reducedMotion = motion?.reducedMotion ?? false

  useLayoutEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    if (reducedMotion) {
      setHot(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        observer.disconnect()
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setHot(true))
        })
      },
      { threshold: 0.08, rootMargin: "16% 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className={`tech-map${hot && contentReady ? " is-hot" : ""}`}
    >
      {TECH_CATEGORIES.map((group, index) => (
        <TechCategory
          key={group.title}
          icon={group.icon}
          title={group.title}
          items={group.items}
          extra={group.extra}
          index={index}
        />
      ))}
    </div>
  )
}

const Skills = () => {
  return (
    <section id="skills" data-section-path="/skills">
      <Container className="skills-page">
        <div className="skills-intro">
          <RevealGroup className="skills-intro__copy" mode="auto" stagger={56}>
            <Reveal type="eyebrow">
              <Badge>{WHAT_I_DO_INTRO.badge}</Badge>
            </Reveal>
            <Reveal type="heading" as="h2">
              {WHAT_I_DO_INTRO.title}{" "}
              <span className="gradient-text">{WHAT_I_DO_INTRO.gradientText}</span>
            </Reveal>
            <Reveal type="text" as="p">
              {WHAT_I_DO_INTRO.subtitle}
            </Reveal>
            <ul className="skills-intro__traits">
              {BUILD_TRAITS.map((trait) => (
                <Reveal key={trait.title} as="li" type="chip">
                  <span className="skills-intro__trait-icon" aria-hidden="true">
                    <SiteIcon name={trait.icon} />
                  </span>
                  <span>
                    <strong>{trait.title}</strong>
                    {trait.text}
                  </span>
                </Reveal>
              ))}
            </ul>
          </RevealGroup>
          <Reveal type="image" mode="auto" delay={80}>
            <OrbitGraphic />
          </Reveal>
        </div>

        <RevealGroup mode="scroll" stagger={48}>
          <SectionKicker kicker="What I build" title="Core capabilities" />
          <div className="feature-grid">
            {CAPABILITIES.map((item) => (
              <Reveal key={item.title} type="card">
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                  tags={item.tags}
                />
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        <RevealGroup mode="scroll" stagger={48}>
          <SectionKicker
            kicker="Problems I solve"
            title="Turning problems into products"
          />
          <div className="feature-grid">
            {PROBLEMS.map((item) => (
              <Reveal key={item.title} type="card">
                <article className="problem-card">
                  <span className="problem-card__icon">
                    <SiteIcon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="problem-card__arrow" aria-hidden="true">
                    →
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        <RevealGroup mode="scroll" stagger={56}>
          <SectionKicker kicker="Tech stack" title="The tools I use" />
          <Reveal type="card">
            <TechMap />
          </Reveal>
        </RevealGroup>

        <RevealGroup mode="scroll" stagger={64}>
          <SectionKicker kicker="How I add value" title="More than code" />
          <ul className="value-rows">
            {VALUE_BLOCKS.map((item) => (
              <Reveal key={item.title} as="li" type="card">
                <span className="value-rows__icon">
                  <SiteIcon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  )
}

export default Skills
