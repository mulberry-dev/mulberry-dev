"use client"

import StatusDot from "@/components/terminal/StatusDot"
import { useI18n } from "@/i18n/useI18n"
import type { PreviewAvailability } from "@/lib/previewAvailability"
import { projectStatus } from "@/lib/projects"
import type { Project } from "@/lib/projects"

const ProjectStatus = ({
  project,
  availability
}: {
  project: Project
  availability?: PreviewAvailability
}) => {
  const { t } = useI18n()
  const status = projectStatus(project)
  const id = availability === "offline" ? "offline" : status.id
  const tone =
    id === "live" ? "success" : id === "ongoing" ? "info" : id === "offline" ? "warning" : "muted"

  return (
    <span className={`term-status term-status--${id}`}>
      <StatusDot tone={tone} pulse={id === "live"} />
      {t.status[id]}
    </span>
  )
}

export default ProjectStatus
