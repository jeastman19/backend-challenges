import { ProjectRepository } from '@domain/repositories/project-repository';
import { Project, Status } from '@domain/entities/project';

export interface CreateProjectRequest {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}

export class CreateProject {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(request: CreateProjectRequest): Promise<void> {
        const project = await Project.create(
            request.id,
            request.title,
            request.description,
            request.dueDate,
            request.status,
        );
        await this.projectRepository.save(project);
    }
}
