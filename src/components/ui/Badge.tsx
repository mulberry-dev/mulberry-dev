import { ReactNode } from "react"

const Badge = ({ children }: { children: ReactNode }) =>
  <span className="ui-badge">{children}</span>

export default Badge
