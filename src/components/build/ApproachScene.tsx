"use client"

import TypeCopy from "@/components/terminal/TypeCopy"
import { BUILD_APPROACH } from "@/data/whatIBuild"
import { useI18n } from "@/i18n/useI18n"
import { useHotScene } from "./useHotScene"

const ApproachScene = () => {
  const { t } = useI18n()
  const { ref, hot } = useHotScene(0.2)

  return (
    <div
      ref={ref}
      id="build-approach"
      className={`approach-scene${hot ? " is-hot" : ""}`}
      aria-label={`${BUILD_APPROACH.title}: ${t.skills.approach.stages.map(stage => stage.title).join(", ")}`}
    >
      <header className="approach-scene__head">
        <h3 className="approach-scene__index">
          <span>{BUILD_APPROACH.index}</span>
          <span> / {BUILD_APPROACH.title}</span>
        </h3>
        <p className="approach-scene__kicker">
          <TypeCopy text={t.skills.approach.kicker} />
        </p>
      </header>
      <ol className="approach-scene__grid">
        {BUILD_APPROACH.stages.map((stage, index) => {
          const copy = t.skills.approach.stages[index]
          const title = copy?.title ?? stage.title
          const text = copy?.text ?? stage.text

          return (
            <li
              key={stage.letter}
              className={`approach-scene__step is-${stage.letter.toLowerCase()}`}
            >
              {index > 0 ? (
                <span className="approach-scene__arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M5 3.2 11 8 5 12.8"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
              <div
                className={`approach-scene__stage approach-scene__stage--${stage.tone}`}
              >
                <span className="approach-scene__letter" aria-hidden="true">
                  {stage.letter}
                </span>
                <span className="approach-scene__copy">
                  <strong>
                    <TypeCopy text={title} />
                  </strong>
                  <span className="approach-scene__text">
                    <TypeCopy text={text} />
                  </span>
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default ApproachScene
