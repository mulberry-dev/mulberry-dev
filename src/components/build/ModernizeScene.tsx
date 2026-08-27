"use client"

import { BUILD_MODERNIZATION } from "@/data/whatIBuild"
import { useHotScene } from "./useHotScene"

const ModernizeScene = () => {
  const { ref, hot } = useHotScene(0.2)

  return (
    <div
      ref={ref}
      className={`modern-scene${hot ? " is-hot" : ""}`}
      role="img"
      aria-label="Legacy PHP, old UI, and monolith compared with React, TypeScript, Node.js, GraphQL, and a modular architecture"
    >
      <div className="modern-scene__pane modern-scene__pane--legacy">
        <p>{BUILD_MODERNIZATION.legacy.label}</p>
        <ul>
          {BUILD_MODERNIZATION.legacy.items.map((item) => (
            <li key={item}>
              <span>×</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="modern-scene__bridge">
        <span className="modern-scene__arrow" />
      </div>

      <div className="modern-scene__pane modern-scene__pane--modern">
        <p>{BUILD_MODERNIZATION.modern.label}</p>
        <ul>
          {BUILD_MODERNIZATION.modern.items.map((item) => (
            <li key={item}>
              <span>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ModernizeScene
