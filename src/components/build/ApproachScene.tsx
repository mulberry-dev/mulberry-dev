"use client"

import { BUILD_APPROACH } from "@/data/whatIBuild"
import { useHotScene } from "./useHotScene"

const ApproachScene = () => {
  const { ref, hot } = useHotScene(0.2)

  return (
    <div
      ref={ref}
      id="build-approach"
      className={`approach-scene${hot ? " is-hot" : ""}`}
      aria-label="STAR method: Situation, Task, Action, Result"
    >
      <header className="approach-scene__head">
        <h3 className="approach-scene__index">
          <span>{BUILD_APPROACH.index}</span>
          <span> / {BUILD_APPROACH.title}</span>
        </h3>
        <p className="approach-scene__kicker">{BUILD_APPROACH.kicker}</p>
      </header>
      <ol className="approach-scene__grid">
        {BUILD_APPROACH.stages.map((stage, index) => (
          <li
            key={stage.letter}
            className={`approach-scene__step is-${stage.letter.toLowerCase()}`}
            title={stage.text}
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
              <strong>{stage.title}</strong>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ApproachScene
