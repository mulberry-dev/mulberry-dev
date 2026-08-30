import ProjectStatus from "@/components/terminal/ProjectStatus"
import { builtWithoutAi, type Project } from "@/lib/projects"

const ProjectFlags = ({ project }: { project: Project }) => (
  <span className="project-flags">
    <ProjectStatus project={project} />
    {builtWithoutAi(project) ? (
      <span
        className="term-status term-status--pre-ai"
        title="Built without AI"
      >
        No AI
      </span>
    ) : null}
  </span>
)

export default ProjectFlags
