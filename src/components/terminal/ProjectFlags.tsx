"use client"

import ProjectStatus from "@/components/terminal/ProjectStatus"
import { useI18n } from "@/i18n/useI18n"
import type { PreviewAvailability } from "@/lib/previewAvailability"
import { builtWithoutAi, type Project } from "@/lib/projects"

const ProjectFlags = ({
  project,
  availability
}: {
  project: Project
  availability?: PreviewAvailability
}) => {
  const { t } = useI18n()

  return (
    <span className="project-flags">
      <ProjectStatus project={project} availability={availability} />
      {builtWithoutAi(project) ? (
        <span
          className="term-status term-status--pre-ai"
          title={t.status.noAiTitle}
        >
          {t.status.noAi}
        </span>
      ) : null}
    </span>
  )
}

export default ProjectFlags
