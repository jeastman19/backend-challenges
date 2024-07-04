import { Project } from '@src/domain/entities/project';
import { ProjectRepository } from '@src/domain/repositories/project-repository';
import ProjectModel from '../models/project-model';

export class ProjectRepositoryImpl implements ProjectRepository {
    async save(project: Project): Promise<Project> {
        const projectDoc = new ProjectModel({
            id: project.id,
            title: project.title,
            description: project.description,
            dueDate: project.dueDate,
            status: project.status,
        });
        const savedProject = await projectDoc.save();
        return Project.create(
            savedProject.id,
            savedProject.title,
            savedProject.description,
            savedProject.dueDate,
            savedProject.status,
        );
    }
}
