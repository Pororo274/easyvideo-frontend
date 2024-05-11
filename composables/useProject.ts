import type { Project } from "~/interfaces/project/project.interface";

export const useProject = () => {
  const project = useState<Project>("project", () => ({} as Project));

  const setProject = (newProject: Project) => {
    project.value = newProject
  }

  return {
    project: readonly(project),
    setProject
  }
}