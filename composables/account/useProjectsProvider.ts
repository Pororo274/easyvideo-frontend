import type { Project } from "~/interfaces/project/project.interface"

interface ProjectsProvider {
  projects: Readonly<Ref<Project[]>>;
  deleteProjectById: (id: number) => void
}

export const useProjectsProvider = () => {
  const { projects, deleteProjectById } = inject('projectsProvider') as ProjectsProvider;

  return {
    projects: readonly(projects),
    deleteProjectById
  }
}