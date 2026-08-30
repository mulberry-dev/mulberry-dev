import { CategoryIcon } from "@/components/ui/CategoryIcon"
import { CATEGORY_LABEL, type Project } from "@/lib/projects"

const ProjectType = ({ project }: { project: Project }) => (
  <span
    className={`project-type project-type--${project.category}`}
    title={CATEGORY_LABEL[project.category]}
  >
    <CategoryIcon variant={project.category} />
    {CATEGORY_LABEL[project.category]}
  </span>
)

export default ProjectType
