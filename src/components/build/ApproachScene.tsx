"use client"

import { BUILD_APPROACH } from "@/data/whatIBuild"
import { useHotScene } from "./useHotScene"

const ApproachScene = () => {
  const { ref, hot } = useHotScene(0.2)

  return (
    <div
      ref={ref}
      className={`approach-scene${hot ? " is-hot" : ""}`}
      role="img"
      aria-label="STAR method: Situation, Task, Action, Result"
    >
      <p className="approach-scene__kicker">STAR</p>
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
