import type { ProjectConfig } from "../project/project-config.interface";
import type { Project } from "../project/project.interface";

export interface Account {
  projects: Project[];
  projectConfigs: ProjectConfig[]
}