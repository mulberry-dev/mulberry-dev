import StatusDot from "@/components/terminal/StatusDot"
import { projectStatus } from "@/lib/projects"
import type { Project } from "@/lib/projects"

const ProjectStatus = ({ project }: { project: Project }) => {
  const status = projectStatus(project)
  const tone =
    status.id === "live" ? "success" : status.id === "ongoing" ? "info" : "muted"

  return (
    <span className={`term-status term-status--${status.id}`}>
      <StatusDot tone={tone} pulse={status.id === "live"} />
      {status.label}
    </span>
  )
}

export default ProjectStatus
