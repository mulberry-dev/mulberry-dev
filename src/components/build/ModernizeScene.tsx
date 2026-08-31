"use client"

import { BUILD_MODERNIZATION } from "@/data/whatIBuild"
import { useHotScene } from "./useHotScene"

const ARROWS = [0, 1, 2] as const

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

      <div className="modern-scene__bridge" aria-hidden="true">
        {ARROWS.map((index) => (
          <span key={index} className="modern-scene__arrow">
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
        ))}
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
