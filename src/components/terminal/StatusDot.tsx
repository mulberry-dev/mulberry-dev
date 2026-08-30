const StatusDot = ({
  tone = "success",
  pulse = false,
  className = ""
}: {
  tone?: "success" | "info" | "muted"
  pulse?: boolean
  className?: string
}) => (
  <span
    className={`term-dot term-dot--${tone}${pulse ? " is-pulse" : ""}${className ? ` ${className}` : ""}`}
    aria-hidden="true"
  />
)

export default StatusDot
