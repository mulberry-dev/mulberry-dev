import { BUILD_STACK } from "@/data/whatIBuild"
import {
  skills,
  type SkillCategory
} from "@/data/skills"
import { BuildPrompt, StackSession } from "./BuildChrome"

const CATEGORY_ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "databases",
  "devops",
  "tools",
  "ai"
]

const STACK_ENTRIES = CATEGORY_ORDER.map((key) => [
  key,
  skills.filter((skill) => skill.category === key).map((skill) => skill.name)
] as const)

const StackTerminal = () => (
  <div className="skills-stack">
    <div className="skills-stack__head">
      <StackSession />
      <BuildPrompt command={BUILD_STACK.command} />
    </div>
    <pre className="skills-stack__json">
      <code>
        {"{\n"}
        {STACK_ENTRIES.map(([key, values], index) => (
          <span key={key}>
            {"  "}
            <span className="is-key">{`"${key}"`}</span>
            {": ["}
            {values.map((value, valueIndex) => (
              <span key={value}>
                <span className="is-str">{`"${value}"`}</span>
                {valueIndex < values.length - 1 ? ", " : ""}
              </span>
            ))}
            {"]"}
            {index < STACK_ENTRIES.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {"}"}
        <span className="skills-cursor skills-cursor--block" aria-hidden="true" />
      </code>
    </pre>
  </div>
)

export default StackTerminal
