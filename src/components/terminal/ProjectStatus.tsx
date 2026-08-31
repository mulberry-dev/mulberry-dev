"use client"

import StatusDot from "@/components/terminal/StatusDot"
import { useI18n } from "@/i18n/useI18n"
import { projectStatus } from "@/lib/projects"
import type { Project } from "@/lib/projects"

const ProjectStatus = ({ project }: { project: Project }) => {
  const { t } = useI18n()
  const status = projectStatus(project)
  const tone =
    status.id === "live" ? "success" : status.id === "ongoing" ? "info" : "muted"

  return (
    <span className={`term-status term-status--${status.id}`}>
      <StatusDot tone={tone} pulse={status.id === "live"} />
      {t.status[status.id]}
    </span>
  )
}

export default ProjectStatus
