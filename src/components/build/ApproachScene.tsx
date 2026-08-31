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
        <p className="approach-scene__copy">
          {BUILD_APPROACH.copy.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </header>
      <ol className="approach-scene__grid">
        {BUILD_APPROACH.stages.map((stage) => (
          <li key={stage.letter}>
            <span className="approach-scene__letter" aria-hidden="true">
              {stage.letter}
            </span>
            <strong>{stage.title}</strong>
            <span className="approach-scene__text">{stage.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ApproachScene
