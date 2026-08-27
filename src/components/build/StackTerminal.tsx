import { BUILD_STACK } from "@/data/whatIBuild"
import { BuildPrompt, StackSession } from "./BuildChrome"

const StackTerminal = () => {
  const entries = Object.entries(BUILD_STACK.value)

  return (
    <div className="skills-stack">
      <div className="skills-stack__head">
        <StackSession />
        <BuildPrompt command={BUILD_STACK.command} />
      </div>
      <pre className="skills-stack__json">
        <code>
          {"{\n"}
          {entries.map(([key, values], index) => (
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
              {index < entries.length - 1 ? "," : ""}
              {"\n"}
            </span>
          ))}
          {"}"}
          <span className="skills-cursor skills-cursor--block" aria-hidden="true" />
        </code>
      </pre>
    </div>
  )
}

export default StackTerminal
